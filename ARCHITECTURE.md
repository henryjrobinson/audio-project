# Voice Legacy Platform - Architecture Document

## Overview
Voice Legacy is an AI-powered platform that helps families preserve memories from aging loved ones through guided conversations, automatic story extraction, and collaborative family engagement.

---

## Data Models

### Core Entities

#### 1. User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. LegacyProject
```typescript
interface LegacyProject {
  id: string;
  subjectName: string;           // The person being interviewed (e.g., "Margaret Thompson")
  subjectAge?: number;
  subjectPhoto?: string;
  diagnosis?: string;             // Optional medical context
  diagnosisDate?: Date;
  status: 'active' | 'paused' | 'completed';
  createdById: string;            // User who created the project
  createdAt: Date;
  updatedAt: Date;
}
```

#### 3. ProjectMember
```typescript
interface ProjectMember {
  id: string;
  projectId: string;
  userId?: string;                // null if invite not yet accepted
  email: string;
  name: string;
  relationship: string;           // e.g., "Daughter", "Son", "Granddaughter"
  role: 'admin' | 'contributor' | 'viewer';
  status: 'active' | 'invited' | 'pending';
  invitedAt: Date;
  joinedAt?: Date;
}
```

#### 4. Conversation
```typescript
interface Conversation {
  id: string;
  projectId: string;
  scheduledAt: Date;
  completedAt?: Date;
  duration: number;               // in minutes
  topic: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'processing' | 'cancelled';
  audioUrl?: string;              // Cloud storage URL
  transcriptUrl?: string;
  storiesExtracted: number;
  emotionalMoments: number;
  clarityScore: number;           // 0-100
  specialNotes?: string;
  suggestedTopics: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### 5. Story
```typescript
interface Story {
  id: string;
  projectId: string;
  conversationId: string;
  title: string;
  excerpt: string;
  fullContent: string;
  duration: string;               // e.g., "3 min read"
  tags: string[];                 // e.g., ["Family", "Holidays"]
  status: 'pending' | 'approved' | 'rejected' | 'edited';
  emotionalMoments: number;
  audioClipUrl?: string;          // Extracted audio segment
  relatedPhotos: string[];
  approvedBy?: string;            // userId
  approvedAt?: Date;
  conversationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 6. Invitation
```typescript
interface Invitation {
  id: string;
  projectId: string;
  email: string;
  name: string;
  relationship: string;
  personalMessage?: string;
  token: string;                  // Unique invite token
  status: 'pending' | 'accepted' | 'expired';
  sentAt: Date;
  expiresAt: Date;
  acceptedAt?: Date;
}
```

---

## Technology Stack

### Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js or Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL (primary) + Redis (caching/sessions)
- **ORM**: Prisma
- **Authentication**: JWT + OAuth 2.0 (Google, email/password)
- **File Storage**: AWS S3 or Cloudflare R2
- **AI/ML**:
  - OpenAI GPT-4 for story extraction and conversation guidance
  - Whisper API for transcription
  - ElevenLabs or similar for voice synthesis
- **Task Queue**: Bull (Redis-based) for async processing
- **Email**: SendGrid or AWS SES
- **Real-time**: Socket.io (for live conversation updates)

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **State Management**: TanStack Query + Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

### Infrastructure
- **Hosting**:
  - Backend: AWS ECS/Fargate, Railway, or Render
  - Frontend: Vercel or Cloudflare Pages
  - Database: AWS RDS or Supabase
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (errors), DataDog or Grafana (metrics)
- **Logging**: Winston + CloudWatch

---

## API Design

### Base URL
```
Production: https://api.voicelegacy.app/v1
Development: http://localhost:3000/v1
```

### Authentication
All authenticated endpoints require:
```
Authorization: Bearer <jwt_token>
```

---

## API Endpoints

### Authentication
```
POST   /auth/register                  - Register new user
POST   /auth/login                     - Login user
POST   /auth/logout                    - Logout user
POST   /auth/refresh                   - Refresh access token
POST   /auth/forgot-password           - Request password reset
POST   /auth/reset-password            - Reset password
GET    /auth/me                        - Get current user
```

### Projects
```
GET    /projects                       - List user's projects
POST   /projects                       - Create new legacy project
GET    /projects/:id                   - Get project details
PATCH  /projects/:id                   - Update project
DELETE /projects/:id                   - Delete project
GET    /projects/:id/stats             - Get project statistics
```

### Project Members
```
GET    /projects/:id/members           - List project members
POST   /projects/:id/members/invite    - Invite family member
DELETE /projects/:id/members/:memberId - Remove member
PATCH  /projects/:id/members/:memberId - Update member role
```

### Conversations
```
GET    /projects/:id/conversations                    - List conversations
POST   /projects/:id/conversations                    - Schedule new conversation
GET    /projects/:id/conversations/:conversationId    - Get conversation details
PATCH  /projects/:id/conversations/:conversationId    - Update conversation
DELETE /projects/:id/conversations/:conversationId    - Cancel conversation
GET    /projects/:id/conversations/:conversationId/transcript - Get transcript
POST   /projects/:id/conversations/:conversationId/process    - Trigger AI processing
```

### Stories
```
GET    /projects/:id/stories                  - List all stories
GET    /projects/:id/stories/:storyId         - Get story details
PATCH  /projects/:id/stories/:storyId         - Edit story
POST   /projects/:id/stories/:storyId/approve - Approve story
POST   /projects/:id/stories/:storyId/reject  - Reject story
DELETE /projects/:id/stories/:storyId         - Delete story
POST   /projects/:id/stories/export           - Export all stories (PDF/ebook)
```

### Invitations
```
POST   /invitations/send              - Send invitation(s)
GET    /invitations/:token            - Get invitation details (public)
POST   /invitations/:token/accept     - Accept invitation
POST   /invitations/:token/decline    - Decline invitation
```

### Media/Files
```
POST   /media/upload                  - Upload audio/photo
GET    /media/:fileId                 - Get media file
DELETE /media/:fileId                 - Delete media file
```

### AI/Processing (Internal/Webhook endpoints)
```
POST   /ai/transcribe                 - Transcribe audio to text
POST   /ai/extract-stories            - Extract stories from transcript
POST   /ai/generate-summary           - Generate conversation summary
POST   /ai/analyze-emotions           - Detect emotional moments
```

---

## Database Schema

### Relationships
```
User (1) ──────── (M) LegacyProject
LegacyProject (1) ── (M) ProjectMember
LegacyProject (1) ── (M) Conversation
LegacyProject (1) ── (M) Story
Conversation (1) ─── (M) Story
LegacyProject (1) ── (M) Invitation
User (1) ─────────── (M) ProjectMember
```

### Indexes
```sql
-- Users
CREATE INDEX idx_users_email ON users(email);

-- Projects
CREATE INDEX idx_projects_created_by ON legacy_projects(created_by_id);
CREATE INDEX idx_projects_status ON legacy_projects(status);

-- Members
CREATE INDEX idx_members_project ON project_members(project_id);
CREATE INDEX idx_members_user ON project_members(user_id);
CREATE INDEX idx_members_email ON project_members(email);

-- Conversations
CREATE INDEX idx_conversations_project ON conversations(project_id);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_scheduled ON conversations(scheduled_at);

-- Stories
CREATE INDEX idx_stories_project ON stories(project_id);
CREATE INDEX idx_stories_conversation ON stories(conversation_id);
CREATE INDEX idx_stories_status ON stories(status);

-- Invitations
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_status ON invitations(status);
```

---

## Security Considerations

1. **Authentication**: JWT with short expiration (15min) + refresh tokens
2. **Authorization**: Role-based access control (RBAC) for project resources
3. **Data Encryption**:
   - At rest: Database encryption (RDS encryption)
   - In transit: HTTPS/TLS only
   - Sensitive audio files encrypted in S3
4. **Rate Limiting**: Per IP and per user
5. **Input Validation**: Zod schemas on both frontend and backend
6. **CORS**: Strict origin whitelist
7. **SQL Injection**: Parameterized queries via Prisma
8. **File Upload**: Virus scanning, file type validation, size limits

---

## AI Processing Pipeline

### Conversation Flow
```
1. Call Scheduled → Send reminder notifications
2. AI Initiates Call → Record audio stream
3. Real-time Transcription → Save to database
4. Conversation Ends → Upload audio to S3
5. Trigger Processing Queue
   ├── Full transcription (Whisper)
   ├── Story extraction (GPT-4)
   ├── Emotional analysis
   ├── Tag generation
   └── Summary creation
6. Notify family members → Stories ready for review
```

### Story Extraction Prompt (Example)
```
Given a conversation transcript between an AI interviewer and an elderly person,
extract distinct, coherent stories with clear beginnings and endings.

For each story:
- Create a compelling title
- Write a 2-3 sentence excerpt
- Preserve the narrator's voice and emotion
- Identify key themes/tags
- Note emotional moments (joy, sadness, nostalgia, humor)
```

---

## Error Handling

### Standard Error Response
```typescript
interface APIError {
  error: {
    code: string;              // e.g., "UNAUTHORIZED", "NOT_FOUND"
    message: string;            // Human-readable message
    details?: any;              // Additional context
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error
- `503` - Service Unavailable

---

## MVP Scope

### Phase 1: Core Functionality (Weeks 1-4)
- [x] Architecture design
- [ ] Backend setup (Express + Prisma + PostgreSQL)
- [ ] User authentication (JWT)
- [ ] Project CRUD operations
- [ ] Basic frontend-backend integration
- [ ] Mock AI processing (simulate with delays)

### Phase 2: Conversation Management (Weeks 5-6)
- [ ] Schedule conversation
- [ ] Audio upload/storage
- [ ] Transcription integration (Whisper API)
- [ ] Conversation status tracking

### Phase 3: Story Extraction (Weeks 7-8)
- [ ] GPT-4 integration for story extraction
- [ ] Story approval workflow
- [ ] Story editing capabilities
- [ ] Story export (PDF)

### Phase 4: Collaboration (Weeks 9-10)
- [ ] Family member invitations
- [ ] Project sharing
- [ ] Email notifications
- [ ] Activity feed

### Phase 5: Polish & Launch (Weeks 11-12)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] Beta launch

---

## Environment Variables

```bash
# Backend
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/voicelegacy
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# AWS/Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=us-east-1

# OpenAI
OPENAI_API_KEY=

# Email
SENDGRID_API_KEY=
EMAIL_FROM=noreply@voicelegacy.app

# Frontend
VITE_API_BASE_URL=http://localhost:3000/v1
```

---

## Next Steps

1. Set up backend project structure
2. Configure Prisma with PostgreSQL
3. Implement authentication endpoints
4. Create API client in frontend
5. Replace mock data with API calls
6. Set up development environment with Docker