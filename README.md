# Teacher Session Booking API

REST API for a platform where users can book sessions with teachers. Teachers create available sessions, users book them, and completed sessions appear in the user's history.

## Tech stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- A running [MongoDB](https://www.mongodb.com/) instance (local or hosted)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example file and adjust values if needed:
   ```bash
   cp .env.example .env
   ```

   `.env` variables:

   | Variable | Description | Default |
   | --- | --- | --- |
   | `NODE_ENV` | Runtime environment (`development` / `production`) | `development` |
   | `PORT` | Port the server listens on | `5000` |
   | `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/teacher-session-booking` |

3. **Run the server**

   - Development (watch mode):
     ```bash
     npm run dev
     ```
   - Production build + start:
     ```bash
     npm run build
     npm start
     ```

   The API will be available at `http://localhost:<PORT>` (default `http://localhost:5000`). All routes are prefixed with `/api`.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start in watch mode with `tsx` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server from `dist/` |
| `npm run typecheck` | Type-check without emitting files |

## API endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `POST` | `/users` | Create a user (email must be unique) |
| `POST` | `/teachers` | **Helper:** create a teacher (for testing/session setup) |
| `POST` | `/sessions` | Create a session for a teacher (`AVAILABLE` by default) |
| `GET` | `/sessions/available?dateTimestamp={timestamp}` | List available sessions for a UTC calendar day *(aggregation pipeline)* |
| `POST` | `/sessions/:id/book` | Book an available session for a user |
| `PATCH` | `/sessions/:id/complete` | Mark a booked session as completed |
| `GET` | `/users/:id/sessions` | List a user's upcoming and completed sessions *(aggregation pipeline)* |

### Request details

- **Create User** — `POST /users`
  ```json
  { "fullName": "Jane Doe", "email": "jane@example.com", "phone": "+1234567890" }
  ```

- **Create Teacher (helper)** — `POST /teachers`
  ```json
  { "fullName": "Dr. Smith", "email": "smith@example.com", "specialization": "Mathematics", "experience": 10 }
  ```

- **Create Session** — `POST /sessions`
  ```json
  {
    "teacherId": "<teacher ObjectId>",
    "startTime": "2026-11-20T10:00:00.000Z",
    "endTime": "2026-11-20T11:00:00.000Z"
  }
  ```
  - `teacherId` must reference an existing teacher.
  - `startTime`/`endTime` must be ISO 8601 date-times with a timezone.
  - `endTime` must be greater than `startTime`.

- **Available Sessions** — `GET /sessions/available?dateTimestamp={timestamp}`
  - `dateTimestamp` accepts an ISO 8601 date-time or epoch milliseconds.
  - Returns sessions whose `startTime` falls on the same **UTC calendar day** as the supplied timestamp.

- **Book Session** — `POST /sessions/:id/book`
  ```json
  { "userId": "<user ObjectId>" }
  ```
  - User and session must exist; only `AVAILABLE` sessions can be booked.

- **Complete Session** — `PATCH /sessions/:id/complete`
  - Session must exist and be `BOOKED`. Sets `status` to `COMPLETED` and `completedAt`.

- **User Session List** — `GET /users/:id/sessions`
  - Returns `{ upcomingSessions, completedSessions }` for the user.

## Response format

Successful responses follow a consistent shape:

```json
{
  "success": true,
  "message": "...",
  "data": { }
}
```

Errors are handled centrally and return an appropriate HTTP status code with:

```json
{
  "success": false,
  "message": "..."
}
```

Common status codes: `400` (validation/invalid id), `404` (not found), `409` (conflict, e.g. duplicate email or invalid state transition), `500` (server error).

## Postman collection

A ready-to-use Postman collection is included at:

- `postman/Teacher_Session_Booking.postman_collection.json`

See [`postman/README.md`](postman/README.md) for import and usage instructions.
