import { db } from "@/firebase/firestore";
import { createConverter } from "@/helper/createConverter";
import { User } from "firebase/auth";
import {
    addDoc, collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
} from "firebase/firestore";

const userRef = collection(db, "users").withConverter(createConverter<User>());

export class UserService {
  static async create(user: Omit<User, "id" | "createdAt">): Promise<string> {
    const docRef = await addDoc(userRef, {
      ...user,
      createdAt: new Date(),
    } as User);
    return docRef.id;
  }

  static async getById(id: string): Promise<User | null> {
    const snap = await getDoc(doc(userRef, id));
    return snap.exists() ? snap.data() : null;
  }

  static async update(id: string, data: Partial<User>): Promise<void> {
    await updateDoc(doc(userRef, id), { ...data, updatedAt: new Date() });
  }

  static async delete(id: string): Promise<void> {
    await deleteDoc(doc(userRef, id));
  }

  static async getUsersByGroup(groupId: string): Promise<User[]> {
    const q = query(userRef, where("groups", "array-contains", groupId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
  }
}
