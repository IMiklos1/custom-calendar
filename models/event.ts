import { Notification } from "./notification";

export interface Event {
  id: string;                     
  title: string;
  description?: string;
  date: Date;
  location?: string;

  creatorId: string;              
  groupId?: string;               

  isGroupEvent: boolean;
  participants: string[];         
  invitedUserIds: string[];       

  notifications?: Notification[];

  createdAt: Date;
  updatedAt?: Date;
}
