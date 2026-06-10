import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Log } from "logging-middleware";
import { notifications } from "../data";
import { CreateNotificationPayload } from "../types";

export const notificationRouter = Router();

notificationRouter.get("/", (_req: Request, res: Response) => {
  Log("backend", "info", "route", `Fetched ${notifications.length} notifications`);
  res.json({ data: notifications });
});

notificationRouter.post("/", (req: Request, res: Response) => {
  const { title, message, type } = req.body as CreateNotificationPayload;

  if (!title || !message || !type) {
    Log("backend", "warn", "route", "Create notification failed: missing fields");
    res.status(400).json({ error: "title, message, and type are required" });
    return;
  }

  const notification = {
    id: uuidv4(),
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
  };

  notifications.push(notification);
  Log("backend", "info", "route", `Notification created: ${notification.id}`);
  res.status(201).json({ data: notification });
});

notificationRouter.patch("/:id/read", (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = notifications.find((n) => n.id === id);

  if (!notification) {
    Log("backend", "warn", "route", `Mark-read failed: notification ${id} not found`);
    res.status(404).json({ error: "Notification not found" });
    return;
  }

  notification.read = true;
  Log("backend", "info", "route", `Notification ${id} marked as read`);
  res.json({ data: notification });
});
