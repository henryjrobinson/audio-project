# Voice Legacy Platform - V2 MVP

An AI-powered platform that helps families preserve precious memories from aging loved ones through collaborative storytelling, intelligent theme discovery, and beautiful multi-format outputs.

## 🎯 **Current Status: Planning Complete, Ready for Implementation**

**Date**: October 2025
**Phase**: Week 1 implementation starting
**Strategy**: Standalone V2 MVP (8 weeks), optional MyLife integration post-MVP

---

## 📚 Essential Documentation (Start Here)

**For Implementation (Week 1-8)**:

1. **[V2_IMPLEMENTATION_READINESS.md](./V2_IMPLEMENTATION_READINESS.md)** ⭐⭐⭐
   - Current state analysis and Week 1 checklist
   - Environment setup guide
   - Ready-to-code task list

2. **[PRODUCT_ROADMAP_V2.md](./PRODUCT_ROADMAP_V2.md)** ⭐⭐⭐
   - 8-week sprint implementation plan
   - Week-by-week deliverables
   - Budget and resource allocation

3. **[MASTER_FEATURE_LIST.md](./MASTER_FEATURE_LIST.md)** ⭐⭐⭐
   - Complete feature specifications (21 epics)
   - User stories and acceptance criteria
   - Technical requirements

**For Context**:

- **[📋 INDEX.md](./INDEX.md)** - Complete documentation index
- **[⭐ EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)** - What this is and why it matters
- **[🚀 QUICKSTART.md](./QUICKSTART.md)** - Get current system running
- **[🏗️ ARCHITECTURE_V2.md](./ARCHITECTURE_V2.md)** - Complete technical architecture
- **[💼 PRODUCT_VISION_V2.md](./PRODUCT_VISION_V2.md)** - Business strategy
- **[🔄 V1_TO_V2_MIGRATION.md](./V1_TO_V2_MIGRATION.md)** - Migration guidance
- **[🏢 MYLIFE_PLATFORM_ANALYSIS.md](./MYLIFE_PLATFORM_ANALYSIS.md)** - Platform comparison and strategy

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

### 📋 Roadmap (V2 MVP - 8 Weeks)

**✅ Planning Complete** (October 2025):
- Complete V2 architecture designed
- Master feature list documented (21 epics, ~125 user stories)
- 8-week implementation roadmap
- MyLife platform analysis and integration strategy

**Week 1-2: Foundation**
- Authentication & user management
- Family archive creation
- Member invitations
- Dashboard UI updates

**Week 3-4: Recording Magic**
- AI-guided solo recording (browser audio)
- Real-time AI conversation (GPT-4 follow-up questions)
- Multi-modal uploads (photo, video, text)
- Whisper transcription

**Week 5: Group Recording**
- Multi-speaker support
- Manual speaker tagging
- Group session management

**Week 6-7: AI Orchestration**
- Theme discovery (batch analysis)
- Connection identification
- Gap detection
- Personalized prompt generation

**Week 8: Polish & Beta Prep**
- Performance optimization
- Error handling
- Beta testing preparation
- Production deployment

**Post-MVP** (Weeks 9+):
- Phone/video calls (Twilio integration)
- Real-time streaming (OpenAI Realtime API)
- Advanced collections (books, albums, videos)
- MyLife platform integration (optional)

See **[PRODUCT_ROADMAP_V2.md](./PRODUCT_ROADMAP_V2.md)** for detailed week-by-week breakdown.

## Contributing

This is currently a prototype. Contribution guidelines will be added as the project matures.

## License

MIT

## Contact

For questions or feedback, please open an issue.