export interface Group {
  id: string;                     // Firestore document ID
  name: string;
  description?: string;

  createdBy: string;              // User ID of the creator
  members: string[];              // User IDs inside the group

  createdAt: Date;
  updatedAt?: Date;
}
