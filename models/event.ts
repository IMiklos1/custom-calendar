import { Timestamp } from "firebase/firestore";

export interface CalendarEvent {
  id?: string;
  title: string;
  description?: string;
  location?: string;
  startTime: Timestamp;
  endTime: Timestamp;
  allDay?: boolean;
  createdBy: string; // userId
  participants: string[]; // userIds
  reminders?: number[]; // minutes before event
  createdAt: Timestamp;
}
