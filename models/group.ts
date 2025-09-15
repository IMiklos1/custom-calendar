import { Timestamp } from "firebase/firestore";

export interface GroupMember {
  userId: string;
  role: "admin" | "member"; // can extend later with "moderator", etc.
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdBy: string; // userId
  members: GroupMember[];
  createdAt: Timestamp;
  inviteCode?: string; // optional for joining
}
