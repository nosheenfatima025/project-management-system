# ProjectFlow - Functional Role-Based Project Management System

## Features
- Real MongoDB data only; no demo projects/tasks are inserted by the frontend.
- JWT login/register/logout and protected routes.
- Admin, employee, developer, designer, tester and client roles.
- Admin can create/delete projects and create tasks.
- Team members can see their accessible projects/tasks and update their assigned task status.
- Admin can view team members and change roles.
- Profile settings update the logged-in user's real database record.
- Responsive ProjectFlow navy/teal/purple interface.

## Requirements
- Node.js 18+
- MongoDB running locally

## Start backend
```powershell
cd backend
npm install
npm run dev
```

Backend: http://localhost:5000

The server creates only one admin account if it does not already exist:
- Email: admin@projectflow.com
- Password: Admin@1234
- 
Change these values in `backend/.env` before first run if desired.

## Start frontend
Open another terminal:
```powershell
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Important
Public registration always creates an `employee` account. Only an admin can change a user's role from the Team page.


## Inventory Admin Feature

Login as admin, open Inventory, and click Add Product. Products are saved in MongoDB; no demo records are inserted. If the old screen still appears, delete the old extracted project folder and extract this ZIP into a new folder.
