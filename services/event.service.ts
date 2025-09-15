import firebase from "firebase/compat/app";
import { Dispatch, SetStateAction } from "react";
import { firestore } from "../firebase";
import { CalendarEvent } from "../models/event";

export class EventService {
  // static onEventsSnapshot(groupId: string, setEvents: Dispatch<SetStateAction<CalendarEvent[]>>) {
  //     throw new Error("Method not implemented.");
  // }
  private getCollection(groupId: string): firebase.firestore.CollectionReference {
    return firestore.collection("groups").doc(groupId).collection("events");
  }

  public async getEvent(groupId: string, eventId: string): Promise<CalendarEvent | null> {
    const doc = await this.getCollection(groupId).doc(eventId).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as CalendarEvent) : null;
  }

  async getEvents(groupId: string): Promise<CalendarEvent[]> {
    const snapshot = await this.getCollection(groupId).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CalendarEvent));
  }

  async createEvent(groupId: string, event: Omit<CalendarEvent, "id">): Promise<string> {
    const docRef = await this.getCollection(groupId).add(event);
    return docRef.id;
  }

  async updateEvent(groupId: string, eventId: string, data: Partial<CalendarEvent>): Promise<void> {
    await this.getCollection(groupId).doc(eventId).update(data);
  }

  async deleteEvent(groupId: string, eventId: string): Promise<void> {
    await this.getCollection(groupId).doc(eventId).delete();
  }

  onEventsSnapshot(groupId: string, callback: Dispatch<SetStateAction<CalendarEvent[]>>) {
    return this.getCollection(groupId).onSnapshot((snapshot) => {
      const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CalendarEvent));
      callback(events);
    });
  }
}
