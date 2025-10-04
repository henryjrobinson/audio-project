# Voice Legacy - Setup Guide

Complete guide to set up the Voice Legacy platform for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher ([Download](https://nodejs.org/))
- **npm**: v10 or higher (comes with Node.js)
- **PostgreSQL**: v14 or higher ([Download](https://www.postgresql.org/download/))
  - *OR* Docker Desktop for running PostgreSQL in a container
- **Git**: For version control

Check your installations:
```bash
node --version  # Should be v20+
npm --version   # Should be v10+
psql --version  # Should be v14+ (or skip if using Docker)
```

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd emerald-beaver-yawn
```

---

## Step 2: Database Setup

### Option A: Using Docker (Recommended)

1. Install Docker Desktop if you haven't already

2. Start PostgreSQL and Redis:
```bash
docker-compose up -d
```

3. Verify containers are running:
```bash
docker ps
```

You should see `voicelegacy-db` and `voicelegacy-redis` running.

**Database connection details:**
- Host: `localhost`
- Port: `5432`
- Database: `voicelegacy`
- User: `postgres`
- Password: `postgres`

### Option B: Using Local PostgreSQL

1. Install PostgreSQL on your machine

2. Create a database:
```bash
psql -U postgres
CREATE DATABASE voicelegacy;
\q
```

3. Update the `DATABASE_URL` in backend `.env` file with your credentials

---

## Step 3: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```bash
# Minimum required for MVP
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/voicelegacy
JWT_SECRET=your-secret-key-change-this
REFRESH_TOKEN_SECRET=your-refresh-secret-change-this
CORS_ORIGIN=http://localhost:5173
```

5. Generate Prisma client:
```bash
npm run prisma:generate
```

6. Run database migrations:
```bash
npm run prisma:migrate
```

7. (Optional) Seed the database with sample data:
```bash
npm run prisma:seed
```

8. Start the backend server:
```bash
npm run dev
```

You should see:
```
✓ Database connected
✓ Server running on port 3000
✓ Environment: development
✓ API: http://localhost:3000/v1
```

**Test the API:**
```bash
curl http://localhost:3000/v1/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-15T..."
  }
}
```

---

## Step 4: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional - has defaults):
```bash
# Create .env file
echo "VITE_API_BASE_URL=http://localhost:3000/v1" > .env
```

4. Start the development server:
```bash
npm run dev
```

You should see:
```
VITE v6.3.4  ready in 342 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

5. Open your browser to `http://localhost:5173`

---

## Step 5: Verify Everything Works

### Test Backend API

**Register a new user:**
```bash
curl -X POST http://localhost:3000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Save the `accessToken` from the response.

**Create a project:**
```bash
curl -X POST http://localhost:3000/v1/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "subjectName": "Margaret Thompson",
    "subjectAge": 78,
    "diagnosis": "Early-stage Alzheimer'\''s"
  }'
```

### Test Frontend

1. Navigate to `http://localhost:5173`
2. Click "View Family Dashboard Demo"
3. You should see the mock dashboard with stories and conversations

---

## Development Workflow

### Running Both Services

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Database Management

**View database with Prisma Studio:**
```bash
cd backend
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` to browse and edit data.

**Create a new migration after schema changes:**
```bash
cd backend
npm run prisma:migrate
```

**Reset database (WARNING: deletes all data):**
```bash
cd backend
npx prisma migrate reset
```

### Useful Commands

**Backend:**
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run linter
```

**Frontend:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

---

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

**Backend:** Change `PORT` in `backend/.env`
```bash
PORT=3001
```

**Frontend:** Vite will automatically use the next available port, or you can specify:
```bash
npm run dev -- --port 5174
```

### Database Connection Errors

**Error: "Can't reach database server"**

1. Verify PostgreSQL is running:
```bash
docker ps  # If using Docker
# OR
pg_isready # If using local PostgreSQL
```

2. Check `DATABASE_URL` in `backend/.env` is correct

3. Restart database:
```bash
docker-compose restart postgres  # If using Docker
```

### Prisma Errors

**Error: "Prisma schema file not found"**

Make sure you're in the `backend` directory when running Prisma commands.

**Error: "Migration failed"**

Reset and try again:
```bash
npx prisma migrate reset
npm run prisma:migrate
```

### CORS Errors

If you see CORS errors in the browser console:

1. Check `CORS_ORIGIN` in `backend/.env` matches your frontend URL
2. Restart the backend server

---

## Next Steps

Now that everything is set up:

1. **Explore the API**: Check out [ARCHITECTURE.md](./ARCHITECTURE.md) for all available endpoints

2. **Database Schema**: Open Prisma Studio to see the data structure:
   ```bash
   cd backend && npm run prisma:studio
   ```

3. **Start Integrating**: The frontend currently uses mock data. Next step is to replace mock data with API calls using the API client at `frontend/src/lib/api.ts`

4. **Read the Product Roadmap**: Review the MVP scope in [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Additional Resources

- [Backend README](./backend/README.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

## Getting Help

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review error messages carefully
3. Check the backend logs (Terminal 1)
4. Check the browser console (F12)
5. Search for similar issues in the project's issue tracker

Happy coding! 🚀