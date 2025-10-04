# Voice Legacy - Quick Start (5 Minutes)

Get up and running in just 5 minutes!

## Prerequisites

- Node.js v20+ installed
- Docker Desktop installed and running

## Step 1: Start Database (30 seconds)

```bash
docker-compose up -d
```

## Step 2: Setup Backend (2 minutes)

```bash
cd backend

# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start server
npm run dev
```

**Expected output:**
```
✓ Database connected
✓ Server running on port 3000
```

## Step 3: Setup Frontend (2 minutes)

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Expected output:**
```
➜  Local:   http://localhost:5173/
```

## Step 4: Test It! (30 seconds)

### Test Backend API

In a new terminal:
```bash
curl http://localhost:3000/v1/health
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-15T..."
  }
}
```

### Test Frontend

Open browser to: http://localhost:5173

You should see the Voice Legacy landing page!

---

## ✅ You're Ready!

- Backend API: http://localhost:3000/v1
- Frontend UI: http://localhost:5173
- Database GUI: Run `cd backend && npm run prisma:studio`

---

## Next Steps

1. **Read** [TRANSFORMATION_SUMMARY.md](./TRANSFORMATION_SUMMARY.md) to understand what was built
2. **Follow** [PRODUCT_ROADMAP.md](./PRODUCT_ROADMAP.md) to implement features
3. **Reference** [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details

---

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

**Database connection error?**
```bash
# Check if Docker is running
docker ps

# Restart database
docker-compose restart
```

**Need detailed help?**
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete instructions.

---

Happy coding! 🚀