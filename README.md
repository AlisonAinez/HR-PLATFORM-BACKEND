# Sub-Team 1: Foundation, Auth & Core Tech

Handles server setup, database connection, JWT authentication, Role-Based Access Control (Admin/Employee), and shared utilities (search, notifications) for the HR & Payroll Management Platform MVP.

## Tech Stack

Node.js, Express.js, MongoDB & Mongoose, JWT, bcrypt

## Setup

1. `npm install`
2. Copy `.env.example` to `.env`, fill in your own values
3. `npm run dev`
4. Confirm "MongoDB connected" and "Server live on port 5000"

## Roles

`Admin`, `Employee`

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires token)
- `GET /api/auth/admin-only` (requires token + Admin role)
- `GET /api/notifications` (requires token)
- `GET /api/search/employees?name=` (requires token)

## Using the middleware in your routes

```javascript
const authMiddleware = require("../middleware/auth");
const requireRole = require("../middleware/roleCheck");

router.post("/some-route", authMiddleware, requireRole("Admin"), controllerFn);
```

## Folder structure

config/ - database connection
models/ - schemas
controllers/ - request logic
routes/ - URL mapping
middleware/ - auth & role checks
