# Voice Legacy Platform

An AI-orchestrated family storytelling platform that helps families collaboratively preserve their stories, memories, and legacies.

## Quick Start

```bash
# Start the database
docker-compose up -d

# Start backend (Terminal 1)
cd backend
npm install
npm run dev

# Start frontend (Terminal 2)
cd frontend
pnpm install
pnpm dev
```

Visit http://localhost:5173 to see the app.

## Project Structure

```
audio-project/
├── backend/          # Node.js + Express + TypeScript API
├── frontend/         # React + Vite + TypeScript app
├── docs/             # Comprehensive documentation
└── docker-compose.yml
```

## Documentation

📚 **Start here**: [docs/EXECUTIVE_SUMMARY.md](docs/EXECUTIVE_SUMMARY.md) - Complete project overview

### Key Documents
- [docs/INDEX.md](docs/INDEX.md) - Full documentation index
- [docs/QUICKSTART.md](docs/QUICKSTART.md) - 5-minute setup guide
- [docs/ARCHITECTURE_V2.md](docs/ARCHITECTURE_V2.md) - Technical architecture
- [docs/PRODUCT_VISION_V2.md](docs/PRODUCT_VISION_V2.md) - Product strategy

## Tech Stack

**Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
**Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
**AI**: OpenAI GPT-4, Whisper (planned: Twilio, ElevenLabs)

## Development

```bash
# Backend
cd backend
npm run dev              # Start dev server
npm run prisma:studio    # Open database GUI
npm run prisma:migrate   # Run migrations

# Frontend
cd frontend
pnpm dev                 # Start dev server
pnpm build              # Build for production
```

## Learn More

See [docs/INDEX.md](docs/INDEX.md) for complete documentation, architecture details, and development guides.
