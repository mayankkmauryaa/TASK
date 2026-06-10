export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface CreateNotificationPayload {
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}
