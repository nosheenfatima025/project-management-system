# 🚀 ProjectFlow — Project Management System

> A modern full-stack project management platform designed to help teams organize projects, manage tasks, collaborate with team members, track resources, and monitor business activities through a centralized dashboard.

ProjectFlow is a professional **MERN-based Project Management System** developed as a full-stack web application. It provides secure authentication, role-based access, project and task management, team management, inventory tracking, reporting, and a responsive dashboard.

---

## 🌟 Overview

Managing multiple projects, tasks, employees, and resources can become difficult when information is scattered across different systems.

**ProjectFlow** provides a centralized platform where administrators and team members can manage their daily project activities efficiently.

The system focuses on:

- 📊 Centralized project monitoring
- 📁 Project and task organization
- 👥 Team management
- 🔐 Secure authentication
- 🛡️ Role-based access control
- 📦 Inventory management
- 📈 Reports and business insights
- 📅 Calendar-based planning
- 💳 Payment management interface
- 📱 Responsive and user-friendly UI

---

# ✨ Key Features

## 🔐 Authentication & Authorization

- User registration
- Secure login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Logout functionality
- Role-based authorization
- Admin and employee access control

---

## 📊 Dashboard

The ProjectFlow dashboard provides a quick overview of important business information.

### Dashboard includes:

- Total projects
- Active projects
- Completed projects
- Pending tasks
- Team information
- Recent activities
- Quick navigation
- Project statistics

---

## 📁 Project Management

Administrators and authorized users can manage projects from a centralized interface.

### Features:

- Create projects
- View projects
- Update project information
- Delete projects
- Track project status
- Search and filter projects
- View project details
- Monitor project progress

---

## ✅ Task Management

ProjectFlow provides task management functionality to organize project work.

### Features:

- Create tasks
- Assign tasks
- Update task status
- Track task progress
- View task details
- Filter tasks
- Manage task priorities

---

## 👥 Team Management

The team module allows administrators to manage project team members.

### Features:

- View team members
- Manage employee information
- Assign responsibilities
- Role-based access
- Employee activity management

---

## 📦 Inventory Management

ProjectFlow also provides an inventory management module for tracking project-related resources.

### Features:

- Add inventory items
- View inventory
- Update inventory
- Delete inventory
- Track stock
- Monitor available resources

---

## 📈 Reports

The reporting module provides a structured view of project and business information.

### Features:

- Project reports
- Task information
- Team information
- Inventory information
- Business activity overview

---

## 📅 Calendar

The calendar interface helps users organize and visualize project-related activities and deadlines.

---

## 💳 Payment Module

ProjectFlow includes a payment management interface for handling project/business payment-related information.

> This module is designed as part of the application interface and does not represent a live payment gateway.

---

# 🛡️ Role-Based Access Control

ProjectFlow separates permissions based on user roles.

### 👑 Administrator

Administrators have access to management-level functionality, including:

- Dashboard
- Project management
- Task management
- Team management
- Inventory management
- Reports
- Settings
- Administrative controls

### 👤 Employee / Team Member

Employees have access to the functionality required for their assigned work without administrator-level privileges.

This separation helps improve:

- Security
- Data control
- Accountability
- System organization

---

# 🧰 Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Axios

## Backend

- Node.js
- Express.js
- JavaScript
- JWT
- bcryptjs

## Database

- MongoDB
- Mongoose
- MongoDB Atlas

## Deployment

- Netlify — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

# 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      ProjectFlow     │
                    │       Frontend       │
                    │    React + Vite      │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │       Backend        │
                    │   Node + Express     │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB Atlas   │
                    │       Database       │
                    └──────────────────────┘
````

---

# 📂 Project Structure

```text
projectflow-starter/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Inventory.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── inventory.js
│   │   ├── projects.js
│   │   └── tasks.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── index.html
│
├── .gitignore
├── package.json
├── README.md
└── START-PROJECT.bat
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/nosheenfatima025/project-management-system.git
```

Navigate into the project:

```bash
cd project-management-system
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=secure_jwt_secret

CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=admin@projectflow.com

ADMIN_PASSWORD=Admin@1234
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

A sample configuration is available in:

```text
backend/.env.example
```

---

# 🔌 API Modules

ProjectFlow backend provides REST API endpoints for:

```text
/api/auth
/api/projects
/api/tasks
/api/inventory
```

Health check:

```text
/api/health
```

The API uses JWT authentication for protected resources.

---

# 🌐 Deployment

## Frontend — Netlify

The React/Vite frontend can be deployed on Netlify.

Then build the application:

```bash
npm run build
```

Deploy the generated:

```text
dist/
```

directory.

---

## Backend — Render

The Express backend can be deployed as a Render Web Service.

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

Configure the required environment variables in Render.

---

## Database — MongoDB Atlas

ProjectFlow uses MongoDB Atlas as its cloud database.

The backend connects to MongoDB using the `MONGO_URI` environment variable.

---

# 🔒 Security

ProjectFlow implements several security practices:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Role-based authorization
* Environment variables for secrets
* `.env` excluded from Git
* Server-side authorization checks

> Never publish database passwords, JWT secrets, API keys, or other credentials in a public repository.

---

# 📱 Responsive Design

The application is designed with a responsive interface so that the management dashboard and application modules can adapt to different screen sizes.

---

# 🎯 Project Goals

The primary goals of ProjectFlow are:

1. Simplify project management.
2. Improve task organization.
3. Provide centralized team management.
4. Secure application access.
5. Improve project visibility through dashboards and reports.
6. Provide a scalable full-stack architecture.
7. Create a professional and responsive user experience.

---

# 🚀 Future Improvements

Possible future enhancements include:

* Real-time notifications
* Email notifications
* File and document management
* Advanced analytics
* Task comments
* Team chat
* Activity timeline
* Advanced search and pagination
* Automated report generation
* Cloud file storage
* Real payment gateway integration
* More granular permission management

---

# 📸 Screenshots
<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/dadc70fe-b5c4-47a5-9363-ed5553e2a6ab" />


### Dashboard

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/602cd49c-c4ab-4a82-ae23-abed609c777a" />


### Projects

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/bc72eac9-d79f-46bc-a536-1736490ac9e1" />


### Tasks

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/6185e98f-8845-4b07-81c1-0b6619920645" />


### Team

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/a7cf2b89-42dc-4bb9-addf-b93e8ddac2c3" />


### Reports

<img width="3840" height="2160" alt="image" src="https://github.com/user-attachments/assets/8e4dc7d0-ab10-44a4-aa6c-2cc6cdb16448" />


---

# 🧪 Development

The application was developed using a separate frontend and backend architecture.

```text
Frontend
   ↓
REST API
   ↓
Express Backend
   ↓
MongoDB
```

This architecture makes the system easier to maintain, test, and deploy independently.

---

# 👩‍💻 Author

## Nosheen Fatima

BS Information Technology Graduate

Project: **ProjectFlow — Project Management System**

GitHub:

[https://github.com/nosheenfatima025](https://github.com/nosheenfatima025)

---

# 📄 License

This project is developed for educational, portfolio, and demonstration purposes.

---

## ⭐ ProjectFlow

**Plan. Organize. Manage. Grow.**

A centralized platform for managing projects, tasks, teams, and resources efficiently.

> **A full-stack MERN Project Management System with JWT authentication, role-based access control, project & task management, team management, inventory, reports, and a responsive dashboard.**

**Topics/Tags:**

```text
react
vite
nodejs
express
mongodb
mongoose
mern
project-management
jwt
full-stack
javascript
````

