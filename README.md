# Sub-Team 1: Foundation, Auth & Core Tech

Handles the Node.js/Express server setup, MongoDB connection, JWT authentication, Role-Based Access Control (RBAC), and global supporting utilities for the HR & Payroll Management Platform MVP.

---

## 🎯 Scope

This sub-team doesn't build a product epic directly — it builds what every other epic depends on:

- Server setup and configuration
- Database connection
- User registration and login
- Role-based access control (Admin vs Employee)
- Global utilities: search, notifications

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 🚀 Status

- [x] Project setup (Express, MongoDB Atlas, CORS)
- [x] User model (roles: Admin, Employee)
- [x] Register & login (bcrypt password hashing, JWT issuing)
- [x] Auth middleware (verifies token)
- [x] Role middleware (restricts by role)
- [x] Tested locally (Thunder Client / Postman)
- [ ] Search utility
- [ ] Notifications utility
- [ ] Restructured to match main repo folder layout
- [ ] Merged into main team repo

---

## 📂 Folder Structure

config/ - database connection
models/ - User schema
middleware/ - auth & role check
controllers/ - auth logic (register/login)
routes/ - auth endpoints
server.js - app entry point

---

## 🔑 Roles

`Admin`, `Employee`

---

## 📡 Auth Endpoints

- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — returns a JWT token
- `GET /api/auth/me` — returns the logged-in user (requires token)

Send the token on protected requests as:

Authorization Bearer token

---

## 🔒 Protecting a Route (for other sub-teams)

```javascript
const authMiddleware = require("../middleware/auth");
const requireRole = require("../middleware/roleCheck");

router.post(
  "/some-route",
  authMiddleware,
  requireRole("Admin"),
  controllerFunction,
);
```

- `authMiddleware` confirms the request has a valid token
- `requireRole(...)` restricts access to specific roles

---

## 👥 Contributors

Alee (Auth, RBAC, core setup) & Al ameen (search utility)
