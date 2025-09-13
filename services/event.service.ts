import { db } from '@/firebaseConfig';
import { Event } from '@/models/event';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';

class EventService {
  private getUserEventsCollection(userId: string) {
    return collection(db, 'events', userId, 'userEvents');
  }

  async addEvent(userId: string, event: Event): Promise<void> {
    const eventRef = doc(this.getUserEventsCollection(userId), event.id);
    await setDoc(eventRef, event);
  }

  async removeEvent(userId: string, eventId: string): Promise<void> {
    const eventRef = doc(this.getUserEventsCollection(userId), eventId);
    await deleteDoc(eventRef);
  }

  async updateEvent(userId: string, eventId: string, updates: Partial<Event>): Promise<void> {
    const eventRef = doc(this.getUserEventsCollection(userId), eventId);
    await updateDoc(eventRef, updates);
  }

  async getEvent(userId: string, eventId: string): Promise<Event | null> {
    const eventRef = doc(this.getUserEventsCollection(userId), eventId);
    const eventDoc = await getDoc(eventRef);
    if (!eventDoc.exists()) return null;

    const data = eventDoc.data();
    return {
      ...data,
      id: eventDoc.id,
      date: data.date?.toDate ? data.date.toDate() : data.date, // normalize
    } as Event;
  }

  async getAllEvents(userId: string): Promise<Event[]> {
    const eventsSnapshot = await getDocs(this.getUserEventsCollection(userId));
    return eventsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        date: data.date?.toDate ? data.date.toDate() : data.date, // normalize
        modifications: data.modifications?.map((m: any) => ({
          ...m,
          date: m.date?.toDate ? m.date.toDate() : m.date,
        })) || []
      } as Event;
    });
  }
}

export default new EventService();
