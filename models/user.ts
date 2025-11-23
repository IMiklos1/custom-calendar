export interface User {
  id: string;                     // Firestore document ID
  displayName: string;
  email: string;
  profilePhotoUrl?: string;

  groups: string[];               // List of group IDs the user belongs to
  createdEvents?: string[];       // Optional list of created event IDs

  createdAt: Date;
  updatedAt?: Date;
}

