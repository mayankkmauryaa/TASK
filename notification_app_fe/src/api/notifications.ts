import { Log } from "logging-middleware";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

const BASE_URL = "/api/notifications";

export async function fetchNotifications(): Promise<Notification[]> {
  Log("frontend", "info", "api", "Fetching all notifications");
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    Log("frontend", "error", "api", `Fetch notifications failed: ${res.status}`);
    throw new Error("Failed to fetch notifications");
  }

  const body = await res.json();
  const count = (body.data as Notification[]).length;
  Log("frontend", "info", "api", `Fetched ${count} notifications`);
  return body.data as Notification[];
}

export async function markAsRead(id: string): Promise<Notification> {
  Log("frontend", "info", "api", `Marking notification ${id} as read`);
  const res = await fetch(`${BASE_URL}/${id}/read`, { method: "PATCH" });

  if (!res.ok) {
    Log("frontend", "error", "api", `Mark-as-read failed for ${id}: ${res.status}`);
    throw new Error("Failed to mark notification as read");
  }

  const body = await res.json();
  Log("frontend", "info", "api", `Notification ${id} marked as read`);
  return body.data as Notification;
}
