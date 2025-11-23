import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";
import { Event } from "@/types/zodSchemas";

// ---------------------------------------------------------
// 🛠️ Firestore <-> JS Date Conversion
// ---------------------------------------------------------
function convertDatesToTimestamps(event: Event) {
  const convertDate = (d?: Date) =>
    d instanceof Date ? Timestamp.fromDate(d) : d;

  return {
    ...event,
    date: convertDate(event.date),
    createdAt: convertDate(event.createdAt),
    updatedAt: convertDate(event.updatedAt),

    notifications: event.notifications?.map(n => ({
      ...n,
      time: convertDate(n.time),
    })),
  };
}

function convertTimestampsToDates(event: any): Event {
  const convert = (t: any) =>
    t instanceof Timestamp ? t.toDate() : t;

  return {
    ...event,
    date: convert(event.date),
    createdAt: convert(event.createdAt),
    updatedAt: convert(event.updatedAt),

    notifications: event.notifications?.map((n: any) => ({
      ...n,
      time: convert(n.time),
    })),
  };
}

// ---------------------------------------------------------
// 🚀 EventService
// ---------------------------------------------------------
export class EventService {
  private static collectionRef = collection(db, "events");

  // ---------------------------------------------
  // CREATE
  // ---------------------------------------------
  static async create(event: Event): Promise<Event> {
    const docRef = doc(this.collectionRef);

    const completeEvent: Event = {
      ...event,
      id: docRef.id,                 // overwrite placeholder id
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fireData = convertDatesToTimestamps(completeEvent);

    await setDoc(docRef, fireData);

    // Optionally: store reference under /users/{uid}/events
    // await setDoc(
    //   doc(db, "users", event.creatorId, "events", docRef.id),
    //   { id: docRef.id }
    // );

    return completeEvent;
  }

  // ---------------------------------------------
  // GET BY ID
  // ---------------------------------------------
  static async getById(id: string): Promise<Event | null> {
    const snap = await getDoc(doc(db, "events", id));
    if (!snap.exists()) return null;

    return convertTimestampsToDates({ id: snap.id, ...snap.data() });
  }

  // ---------------------------------------------
  // GET EVENTS BY USER
  // ---------------------------------------------
  static async getAllForUser(userId: string): Promise<Event[]> {
    const q = query(this.collectionRef, where("creatorId", "==", userId));
    const snap = await getDocs(q);

    return snap.docs.map(d => {
      return convertTimestampsToDates({ id: d.id, ...d.data() });
    });
  }

  // ---------------------------------------------
  // GET EVENTS BY GROUP
  // ---------------------------------------------
  static async getAllForGroup(groupId: string): Promise<Event[]> {
    const q = query(this.collectionRef, where("groupId", "==", groupId));
    const snap = await getDocs(q);

    return snap.docs.map(d =>
      convertTimestampsToDates({ id: d.id, ...d.data() })
    );
  }

  // ---------------------------------------------
  // UPDATE
  // ---------------------------------------------
  static async update(id: string, partial: Partial<Event>): Promise<void> {
    const updateData: any = {
      ...partial,
      updatedAt: new Date(),
    };

    const fire = convertDatesToTimestamps(updateData);

    await updateDoc(doc(db, "events", id), fire);
  }

  // ---------------------------------------------
  // DELETE
  // ---------------------------------------------
  static async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, "events", id));
  }
}