import { z } from "zod";

/**
 * Notification (Apple Calendar style)
 */
export const notificationSchema = z.object({
  id: z.string().optional(),                       // Notification ID (optional)
  offsetMinutes: z.number().int().nonnegative(),   // Example: 5, 15, 60, 1440
  method: z.enum(["alert", "email"]).default("alert"),
});

/**
 * Event Schema
 */
export const eventSchema = z.object({
  id: z.string().optional(),        // Firestore doc ID (added after fetch)
  title: z.string().min(1),
  description: z.string().optional(),

  startDate: z.date(),
  endDate: z.date(),

  ownerId: z.string(),              // creator userId

  sharedWith: z.array(z.string()),  // userIds
  groupIds: z.array(z.string()),    // groups that can see this

  notifications: z.array(notificationSchema),
});

/**
 * Export TypeScript types
 */
export type Notification = z.infer<typeof notificationSchema>;
export type Event = z.infer<typeof eventSchema>;
