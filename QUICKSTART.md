# Quick Start Guide

## Prerequisites
✅ Node.js v16+ installed
✅ MongoDB running (local or cloud)
✅ npm installed

## Setup in 3 Steps

### 1️⃣ Configure Environment
```bash
# Copy environment templates
copy .env.example .env
cd frontend
copy .env.example .env
cd ..
```

Edit `.env` in root directory:
```env
MONGO_URI=mongodb://localhost:27017/expense-tracker
SESSION_SECRET=your-random-secret-key-here
NODE_ENV=development
```

### 2️⃣ Install Dependencies
```bash
# Root directory (backend)
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 3️⃣ Start the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```
Server runs at: http://localhost:4000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs at: http://localhost:3000

## Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with hot reload |
| `npm start` | Start backend production mode |
| `cd frontend && npm run dev` | Start frontend dev server |
| `cd frontend && npm run build` | Build frontend for production |

## Default Ports
- Backend GraphQL: **4000**
- Frontend React: **3000**

## Common Issues

### MongoDB Connection Error
Make sure MongoDB is running:
```bash
# Windows with MongoDB installed
net start MongoDB
```

### Port Already in Use
Change ports in:
- Backend: `backend/index.js` (line with `httpServer.listen`)
- Frontend: `frontend/vite.config.ts` (server.port)

### CORS Errors
Update CORS origin in `backend/index.js`:
```javascript
cors({
  origin: "http://localhost:3000", // Change if using different port
  credentials: true,
})
```

## Project URLs
- 🖥️ Frontend: http://localhost:3000
- 🔌 GraphQL API: http://localhost:4000/
- 📊 GraphQL Playground: http://localhost:4000/

---

Need help? Check the main README.md for detailed documentation.
