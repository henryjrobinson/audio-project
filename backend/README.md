# Voice Legacy Backend

Backend API for the Voice Legacy Platform - AI-powered voice preservation service.

## Tech Stack

- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js v20 or higher
- PostgreSQL 14 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database
npm run prisma:seed
```

### Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/v1`

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /v1/auth/register` - Register new user
- `POST /v1/auth/login` - Login user
- `GET /v1/auth/me` - Get current user (authenticated)

### Projects
- `GET /v1/projects` - List user's projects
- `POST /v1/projects` - Create new project
- `GET /v1/projects/:id` - Get project details
- `PATCH /v1/projects/:id` - Update project
- `DELETE /v1/projects/:id` - Delete project
- `GET /v1/projects/:id/stats` - Get project statistics

### Health Check
- `GET /v1/health` - API health check

## Database Schema

See [Prisma schema](./prisma/schema.prisma) for complete data model.

### Main Entities
- **User** - Platform users
- **LegacyProject** - Memory preservation projects
- **ProjectMember** - Family members collaborating on projects
- **Conversation** - Recorded conversation sessions
- **Story** - AI-extracted stories from conversations
- **Invitation** - Family member invitations

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/                # Configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Express middleware
│   ├── routes/                # API routes
│   ├── services/              # Business logic
│   ├── types/                 # TypeScript types
│   ├── utils/                 # Utility functions
│   ├── app.ts                 # Express app setup
│   └── index.ts               # Entry point
├── .env.example               # Environment variables template
├── package.json
└── tsconfig.json
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (DB GUI)
- `npm run lint` - Run ESLint

## Environment Variables

See [.env.example](./.env.example) for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3000)

## License

MIT