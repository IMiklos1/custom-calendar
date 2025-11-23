import { z } from "zod";

// -------------------- Notification --------------------

export const notificationSchema = z.object({
  id: z.string(),                               // required in your model
  method: z.enum(["popup", "email", "push"]),
  time: z.date(),                                // absolute fire time
  relativeMinutes: z.number().int().optional(),  // optional
  message: z.string().optional(),
  isRead: z.boolean().optional(),
});

// Type export
export type Notification = z.infer<typeof notificationSchema>;

// -------------------- Event --------------------

export const eventSchema = z.object({
  id: z.string(),                 // required in your model
  title: z.string(),
  description: z.string().optional(),

  date: z.date(),
  location: z.string().optional(),

  creatorId: z.string(),
  groupId: z.string().optional(),

  isGroupEvent: z.boolean(),
  participants: z.array(z.string()),
  invitedUserIds: z.array(z.string()),

  notifications: z.array(notificationSchema).optional(),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

// Type export
export type Event = z.infer<typeof eventSchema>;

// -------------------- Group --------------------

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),

  createdBy: z.string(),
  members: z.array(z.string()),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
export type Group = z.infer<typeof groupSchema>;

// -------------------- User --------------------

export const userSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string().email(),
  profilePhotoUrl: z.string().optional(),

  groups: z.array(z.string()),
  createdEvents: z.array(z.string()).optional(),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
export type User = z.infer<typeof userSchema>;
