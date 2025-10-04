# Voice Legacy Platform

An AI-powered platform that helps families preserve precious memories from aging loved ones through collaborative storytelling, intelligent theme discovery, and beautiful multi-format outputs.

---

## 🎯 Quick Links

**New to the project?** Start here:

1. **[📋 INDEX.md](./INDEX.md)** - Complete documentation index
2. **[⭐ EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)** - What this is and why it matters (10 min read)
3. **[🚀 QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes

**Ready to dive deep?**

- **[🏗️ ARCHITECTURE_V2.md](./ARCHITECTURE_V2.md)** - Complete technical architecture
- **[💼 PRODUCT_VISION_V2.md](./PRODUCT_VISION_V2.md)** - Business strategy and roadmap
- **[🔄 V1_TO_V2_MIGRATION.md](./V1_TO_V2_MIGRATION.md)** - Implementation plan

---

## Project Overview

### What We're Building

**V2.0: Collaborative Family Storytelling Platform**

Voice Legacy enables families to:
- **Contribute together**: Everyone adds memories (audio, photos, videos, text)
- **AI discovers themes**: Automatically identifies patterns ("Grandma's Cooking", "Moving North")
- **Get intelligent prompts**: AI asks personalized questions to fill gaps
- **Multiple perspectives**: One event told by multiple family members
- **Beautiful outputs**: Recipe books, photo albums, timelines, videos, physical books

### Key Innovation: Dual-Agent AI System

**Real-Time Agent**: Facilitates live conversations with follow-up questions
**Batch Orchestration Agent**: Analyzes all contributions, discovers themes, generates prompts

### Architecture

This is a full-stack application with:
- **Frontend**: React 18 + TypeScript + Vite + shadcn/ui
- **Backend**: Node.js + Express + TypeScript + Prisma
- **Database**: PostgreSQL + Redis
- **AI/ML**: OpenAI GPT-4 (story extraction, orchestration), Whisper (transcription)
- **Voice**: Twilio (phone calls), ElevenLabs (synthesis)

See [ARCHITECTURE_V2.md](./ARCHITECTURE_V2.md) for complete technical documentation.

## Project Structure

```
emerald-beaver-yawn/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities
│   │   └── utils/         # Helper functions
│   └── package.json
├── backend/               # Express backend API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utilities
│   │   └── config/        # Configuration
│   ├── prisma/            # Database schema
│   └── package.json
├── docker-compose.yml     # Local development services
├── ARCHITECTURE.md        # Technical architecture doc
└── README.md             # This file
```

## Quick Start

### Prerequisites

- Node.js v20+
- PostgreSQL 14+ (or use Docker)
- npm or yarn

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd emerald-beaver-yawn

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Start Database (Docker)

```bash
# From project root
docker-compose up -d
```

This starts PostgreSQL on `localhost:5432` with:
- Database: `voicelegacy`
- User: `postgres`
- Password: `postgres`

### 3. Set Up Backend

```bash
cd backend

# Copy environment file
cp .env.example .env
# Edit .env if needed

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3000`

### 4. Start Frontend

```bash
cd frontend

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev                 # Start with hot reload
npm run prisma:studio       # Open database GUI
npm run prisma:migrate      # Create new migration
```

### Database Management
```bash
# View database with Prisma Studio
cd backend
npm run prisma:studio

# Create a new migration
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## API Documentation

The backend API is available at `http://localhost:3000/v1`

### Example Requests

**Register a new user:**
```bash
curl -X POST http://localhost:3000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Create a project (requires auth token):**
```bash
curl -X POST http://localhost:3000/v1/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "subjectName": "Margaret Thompson",
    "subjectAge": 78,
    "diagnosis": "Early-stage Alzheimer'\''s"
  }'
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete API documentation.

## Current Status

### ✅ Completed
- ✅ Backend API foundation (Express + Prisma)
- ✅ Database schema (V1 + V2 designed)
- ✅ Authentication system (JWT)
- ✅ Project CRUD operations
- ✅ Frontend UI prototype with all main screens
- ✅ Docker development environment
- ✅ **Complete V2 architecture designed**
- ✅ **Migration plan documented**
- ✅ **Business strategy defined**

### 🚧 Next Up
- Multi-contributor backend implementation
- Theme discovery algorithm
- Prompt generation system
- Enhanced dashboard UI
- Beta testing with 50 families

### 📋 Roadmap (V2)

**Phase 1: Foundation** (Weeks 1-8)
- Multi-contributor support
- Basic theme detection
- Simple prompt system
- Email notifications

**Phase 2: AI Orchestration** (Weeks 9-16)
- Twilio phone integration
- Advanced theme discovery
- AI-generated prompts
- Multi-perspective stories

**Phase 3: Real-Time Agent** (Weeks 17-24)
- Live conversation facilitator
- Streaming transcription
- Adaptive dialog

**Phase 4: Collections** (Weeks 25-32)
- Recipe books, photo albums
- Video montages, timelines
- Physical book printing

See [PRODUCT_VISION_V2.md](./PRODUCT_VISION_V2.md) for complete roadmap and business model.

## Contributing

This is currently a prototype. Contribution guidelines will be added as the project matures.

## License

MIT

## Contact

For questions or feedback, please open an issue.