# Notification System Design

## Overview

A real-time notification system that allows users to view, manage, and acknowledge notifications from various application events. The system supports multiple notification types (info, success, warning, error) with read/unread tracking.

## Architecture

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────┐
│  React Frontend  │─────>│  Express Backend │─────>│  In-Memory   │
│  (notification   │<─────│  (notification   │<─────│  Store       │
│   app_fe)        │      │   app_be)        │      │              │
└──────────────────┘      └──────────────────┘      └──────────────┘
         │                        │
         │                        │
         ▼                        ▼
┌──────────────────┐      ┌──────────────────┐
│  Logging         │      │  Logging         │
│  Middleware      │      │  Middleware      │
│  (browser fetch) │      │  (server fetch)  │
└──────────────────┘      └──────────────────┘
         │                        │
         └──────────┬─────────────┘
                    ▼
         ┌──────────────────┐
         │  Test Server     │
         │  /evaluation-    │
         │  service/logs    │
         └──────────────────┘
```

## Components

### 1. Backend (notification_app_be)
- **Framework:** Express.js with TypeScript
- **API Endpoints:**
  - `GET /api/notifications` — List all notifications
  - `POST /api/notifications` — Create a new notification
  - `PATCH /api/notifications/:id/read` — Mark notification as read
- **Storage:** In-memory array (for evaluation; replaceable with a database)

### 2. Frontend (notification_app_fe)
- **Framework:** React 18 with TypeScript + Vite
- **UI Library:** Material UI (MUI v5)
- **Components:**
  - `App` — Root component with state management
  - `NotificationList` — Renders notification list with icons and read/unread styling
- **Features:**
  - Display unread badge count in AppBar
  - Mark individual notifications as read
  - Responsive design (mobile + desktop)

### 3. Logging Middleware
- **Type:** Reusable TypeScript package
- **Function:** `Log(stack, level, package, message)`
- **Integration:** Used in both backend (route handlers, services) and frontend (API calls, components)
- **Target:** Test server `/evaluation-service/logs`

## Data Flow

1. User opens the frontend → `GET /api/notifications` → notifications displayed
2. User clicks mark-as-read → `PATCH /api/notifications/:id/read` → UI updates
3. Each API call is logged via the Logging Middleware → Test Server

## Design Decisions

- **In-memory store** simplifies evaluation; production would use PostgreSQL/Redis
- **Material UI** for consistent, responsive design out of the box
- **Vite proxy** for development to avoid CORS issues
- **TypeScript** across all layers for type safety
