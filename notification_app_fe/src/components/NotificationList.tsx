import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Log } from "logging-middleware";
import { Notification } from "../api/notifications";

const iconMap = {
  info: <InfoIcon color="info" />,
  success: <CheckCircleIcon color="success" />,
  warning: <WarningIcon color="warning" />,
  error: <ErrorIcon color="error" />,
};

interface Props {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkRead }: Props) {
  Log("frontend", "debug", "component", `NotificationList rendered with ${notifications.length} items`);
  if (notifications.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
        No notifications yet.
      </Typography>
    );
  }

  return (
    <List>
      {notifications.map((n) => (
        <ListItem
          key={n.id}
          sx={{
            bgcolor: n.read ? "transparent" : "action.hover",
            borderRadius: 1,
            mb: 1,
          }}
          secondaryAction={
            !n.read && (
              <IconButton edge="end" onClick={() => onMarkRead(n.id)}>
                <MarkEmailReadIcon />
              </IconButton>
            )
          }
        >
          <ListItemIcon>{iconMap[n.type]}</ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {n.title}
                {!n.read && <Chip label="new" size="small" color="primary" />}
              </Box>
            }
            secondary={n.message}
          />
        </ListItem>
      ))}
    </List>
  );
}
