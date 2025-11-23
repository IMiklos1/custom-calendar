export type NotificationMethod = "popup" | "email" | "push";

export interface Notification {
  id: string;                 // Unique notification ID
  method: NotificationMethod; // How to notify the user
  time: Date;                 // Absolute time for notification
  relativeMinutes?: number;   // Optional: minutes before event
  message?: string;           // Optional custom message
  isRead?: boolean;           // Optional: track if user acknowledged
}
