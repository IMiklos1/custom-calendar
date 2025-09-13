import { User } from "./user";

export interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
  createdBy: User;
  isCompleted: boolean;
  modifications:Modification[];
  isPublic: boolean;
  participants: User[];
  isShared: boolean;
  isCancelled: boolean;
  isFavorite: boolean;
  isPinned: boolean;
  isHidden: boolean;
  isBlocked: boolean;
  isReported: boolean;
  isFlagged: boolean;
}

export interface Modification {
  id?: string;
  eventId?: string;
  title?: string;
  date?: Date;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}