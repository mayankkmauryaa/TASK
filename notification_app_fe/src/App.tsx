import { useState, useEffect, useCallback } from "react";
import { Container, AppBar, Toolbar, Typography, Badge, CircularProgress, Alert, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Log } from "logging-middleware";
import NotificationList from "./components/NotificationList";
import { fetchNotifications, markAsRead, Notification } from "./api/notifications";

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      Log("frontend", "info", "component", "Loading notifications");
      const data = await fetchNotifications();
      setNotifications(data);
    } catch {
      Log("frontend", "error", "component", "Failed to load notifications");
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleMarkRead = async (id: string) => {
    try {
      Log("frontend", "info", "component", `Marking notification ${id} as read`);
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch {
      Log("frontend", "error", "component", `Failed to mark notification ${id} as read`);
      setError("Failed to mark notification as read");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Notifications
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <NotificationList notifications={notifications} onMarkRead={handleMarkRead} />
        )}
      </Container>
    </>
  );
}

