# Student Internship Job Tracker API

This is a standalone Express and MongoDB backend. Demo jobs inserted by the seed script are sample records only, not verified live vacancies.

## Setup

Install Node.js, npm, and a reachable MongoDB instance. The supplied `.env` uses a local MongoDB database; replace `MONGODB_URI` with your own connection string when needed. Never commit `.env` or place its contents in frontend code. The database name is selected by the URI.

```powershell
cd backend
npm install
npm run seed
npm run dev
```

Use `npm start` for normal execution. The API listens at `http://localhost:5000`; the jobs endpoint is `http://localhost:5000/api/jobs`. The server waits for a successful MongoDB connection before listening.

Environment variables in `.env`:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/student_internship_job_tracker
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

`FRONTEND_ORIGIN` configures the one allowed browser origin. CORS defaults to `http://localhost:5173` if it is not set.

## Structure

- `server.js` configures Express, CORS, JSON parsing, routes, error handling, and startup.
- `config/db.js` connects Mongoose to MongoDB.
- `models/Job.js` validates job records and allowed categories/job types.
- `models/Application.js` validates application records, email, and status.
- `controllers/` contains asynchronous request handlers and MongoDB queries.
- `routes/` maps REST endpoints to their handlers.
- `middleware/errorMiddleware.js` formats API errors and unknown routes.
- `seed.js` upserts ten demo jobs; rerunning it does not add duplicate copies.
- `postman_collection.json` contains the requests below in an importable Postman collection.

All API responses use `{ "success": true, "data": ... }` or `{ "success": false, "message": "..." }`. List responses put their records in `data`; counts use `data.count`.

## API

| Method | Path | Behavior |
| --- | --- | --- |
| GET | `/api/jobs` | List jobs; optional `search`, `category`, and `location` query parameters combine. Search matches title or company. |
| GET | `/api/jobs/:id` | Get one job. |
| POST | `/api/jobs` | Create a job. |
| PUT | `/api/jobs/:id` | Update a job; validators run on updates. |
| DELETE | `/api/jobs/:id` | Delete a job. |
| GET | `/api/jobs/count` | Return total job count. |
| GET | `/api/applications` | List applications; optional `status` filter. |
| GET | `/api/applications/:id` | Get one application. |
| POST | `/api/applications` | Create an application. |
| PUT | `/api/applications/:id` | Update an application. |
| DELETE | `/api/applications/:id` | Delete an application. |
| GET | `/api/applications/count` | Return total application count. |

Create-job JSON:

```json
{
  "jobTitle": "IoT Intern",
  "company": "Demo Technologies",
  "location": "Chennai",
  "category": "IoT",
  "jobType": "On-site",
  "applyLink": "https://example.com",
  "description": "Sample IoT internship for demonstration."
}
```

Create-application JSON:

```json
{
  "studentName": "Demo Student",
  "email": "student@example.com",
  "jobTitle": "IoT Intern",
  "company": "Demo Technologies",
  "applicationDate": "2026-10-08",
  "status": "Applied"
}
```

Categories: `Electronics`, `Embedded Systems`, `IoT`, `Web Development`, `Software`. Job types: `Remote`, `Hybrid`, `On-site`. Application statuses: `Applied`, `Interview`, `Selected`, `Rejected`.

## Postman

Import `postman_collection.json` in Postman and send requests to `http://localhost:5000`. The collection includes all CRUD, filter, count, and error-check requests. For single-record requests, copy an `_id` from a create/list response into the collection's `jobId` or `applicationId` variable. Requests with JSON bodies should use `Content-Type: application/json`.

Equivalent URLs:

```text
GET    http://localhost:5000/api/jobs
GET    http://localhost:5000/api/jobs/:id
GET    http://localhost:5000/api/jobs?search=IoT
GET    http://localhost:5000/api/jobs?category=IoT
GET    http://localhost:5000/api/jobs?location=Chennai
GET    http://localhost:5000/api/jobs?search=intern&category=IoT&location=Chennai
POST   http://localhost:5000/api/jobs
PUT    http://localhost:5000/api/jobs/:id
DELETE http://localhost:5000/api/jobs/:id
GET    http://localhost:5000/api/applications
POST   http://localhost:5000/api/applications
GET    http://localhost:5000/api/applications?status=Applied
PUT    http://localhost:5000/api/applications/:id
DELETE http://localhost:5000/api/applications/:id
GET    http://localhost:5000/api/applications/count
GET    http://localhost:5000/api/jobs/count
```

Invalid IDs return `400`, missing records return `404`, invalid/missing data returns `400`, and unknown routes return `404`. Server errors return a generic message without database details.
