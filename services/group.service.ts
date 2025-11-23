import { createConverter } from "@/helper/createConverter";
import { Group } from "@/models/group";
import {
    addDoc, collection,
    deleteDoc,
    doc, getDoc, updateDoc
} from "firebase/firestore";
import { db } from "../firebase/firestore";

const groupRef = collection(db, "groups").withConverter(createConverter<Group>());

export class GroupService {
  static async create(group: Omit<Group, "id" | "createdAt">): Promise<string> {
    const docRef = await addDoc(groupRef, {
      ...group,
      createdAt: new Date()
    } as Group);
    return docRef.id;
  }

  static async getById(id: string): Promise<Group | null> {
    const snap = await getDoc(doc(groupRef, id));
    return snap.exists() ? snap.data() : null;
  }

  static async update(id: string, data: Partial<Group>): Promise<void> {
    await updateDoc(doc(groupRef, id), { ...data, updatedAt: new Date() });
  }

  static async delete(id: string): Promise<void> {
    await deleteDoc(doc(groupRef, id));
  }

  static async addMember(groupId: string, userId: string): Promise<void> {
    const group = await this.getById(groupId);
    if (!group) return;

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await this.update(groupId, { members: group.members });
    }
  }

  static async removeMember(groupId: string, userId: string): Promise<void> {
    const group = await this.getById(groupId);
    if (!group) return;

    group.members = group.members.filter(id => id !== userId);
    await this.update(groupId, { members: group.members });
  }
}
