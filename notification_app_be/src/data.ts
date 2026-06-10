import { Notification } from "./types";

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Welcome",
    message: "Your account has been created successfully.",
    type: "success",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "System Update",
    message: "Scheduled maintenance at 2:00 AM tomorrow.",
    type: "info",
    read: false,
    createdAt: new Date().toISOString(),
  },
];
