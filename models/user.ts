import { Timestamp } from 'firebase/firestore';

export interface User {
  id?: string; // Firebase Auth UID
  name: string;
  email: string;
  photoUrl?: string;
  groups?: string[]; // optional, list of group IDs
  createdAt: Timestamp;
}
