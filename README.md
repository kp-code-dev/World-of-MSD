# World of MSD 🎮

World of MSD is a full-stack gaming database platform where users can browse, search, and discover games, while administrators can manage the content through a secure dashboard.

## 🌟 Features
- **Public Dashboard:** Browse games, view detailed system requirements, and see image sliders.
- **Search & Filter:** Instantly filter games by name or keyword.
- **Admin Panel:** Securely login to add, edit, or delete games and slides.
- **Dynamic Settings:** Administrators can update the site logo, favicon, and title dynamically without touching the code.
- **Cloud Database:** Data is securely stored and retrieved using MongoDB Atlas.

## 🏗️ Architecture
This project is built using a modern **Monorepo** structure, separating the frontend and backend into two distinct directories to allow for separate hosting and scaling.

- `/client` - The Frontend (React)
- `/server` - The Backend (Node.js/Express)

## 🛠️ Tech Stack
- **Frontend:** React, React Router, TailwindCSS (or custom CSS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v14 or higher)
- A MongoDB Atlas connection string (or local MongoDB)

### 2. Installation
Run the following command in the root directory to install dependencies for **both** the client and the server simultaneously:
```bash
npm install
```

### 3. Environment Variables
You need to set up two `.env` files:

**Backend (`server/.env`):**
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:3000
```

**Frontend (`client/.env`):**
```env
REACT_APP_API_URL=http://localhost:5000
```
*(Note: If you are on Mac, also add `HOST=localhost` to prevent port EPERM issues).*

### 4. Running the App
From the root directory, start both the frontend and backend with a single command:
```bash
npm start
```
- The React Frontend will start on `http://localhost:3000`
- The Express Backend will start on `http://localhost:5000`

## ☁️ Deployment Guide

This repository is designed to be split-deployed across two free-tier cloud providers.

### Frontend (Vercel or Netlify)
1. Import the repository.
2. Set the **Root Directory** to `client`.
3. Build Command: `npm run build`
4. Output Directory: `build`
5. Add the `REACT_APP_API_URL` environment variable pointing to your deployed backend.

### Backend (Render or Railway)
1. Import the repository.
2. Set the **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add your `MONGO_URL`, `JWT_SECRET`, and `FRONTEND_URL` (pointing to your Vercel deployment) in the Environment Variables section.

---
*Created and maintained by Kalpesh Mevada.*
