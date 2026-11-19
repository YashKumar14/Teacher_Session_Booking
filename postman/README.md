# Postman collection

This folder contains a Postman collection for testing the Teacher Session Booking API.

## Import

1. Open Postman.
2. Click **Import** and select `Teacher_Session_Booking.postman_collection.json`.

## Setup

The collection defines these variables:

| Variable | Default | Notes |
| --- | --- | --- |
| `baseUrl` | `http://localhost:5000/api` | Change if your server runs on a different host/port |
| `userId` | *(empty)* | Auto-filled by **Create User** test script |
| `teacherId` | *(empty)* | Auto-filled by **Create Teacher (Helper)** test script |
| `sessionId` | *(empty)* | Auto-filled by **Create Session** test script |
| `dateTimestamp` | `2026-11-20T00:00:00.000Z` | Used by **Get Available Sessions** |

## Suggested flow

1. **Health Check** – verify the server is running.
2. **Create User** – saves the new user's id to `userId`.
3. **Create Teacher (Helper)** – saves the new teacher's id to `teacherId`.
4. **Create Session** – creates an `AVAILABLE` session and saves its id to `sessionId`.
5. **Get Available Sessions** – lists available sessions for the UTC day of `dateTimestamp` (ensure `dateTimestamp` matches the session's `startTime` day).
6. **Book Session** – books the session for `userId`.
7. **Complete Session** – marks the booked session as `COMPLETED`.
8. **Get User Sessions** – returns the user's `upcomingSessions` and `completedSessions`.

> **Note:** Create requests with unique emails may need different values if you re-run them, since user emails must be unique.
