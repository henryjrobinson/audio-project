# V2 Implementation Readiness Assessment

**Date**: 2025-10-09
**Status**: ✅ Ready to Begin Week 1 Implementation
**Current State**: V1 Backend + Prototype Frontend
**Target**: V2 MVP (8-week sprint)

---

## 📊 Current State Analysis

### ✅ What's Already Built (V1 Foundation)

#### Backend Infrastructure
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL + Prisma ORM (schema.prisma exists)
- **Authentication**: JWT-based (auth.controller.ts, auth.middleware.ts)
- **Project Management**: CRUD endpoints (project.controller.ts)
- **Security**: Helmet, CORS, bcrypt password hashing
- **Validation**: Zod + express-validator
- **Logging**: Morgan

#### Database Schema (V1)
Current Prisma models:
- ✅ **User** - Authentication and user management
- ✅ **LegacyProject** - Project/archive management (needs renaming to FamilyArchive)
- ✅ **ProjectMember** - Family member relationships (needs renaming to ArchiveMember)
- ✅ **Conversation** - Recording sessions (needs expansion to Contribution)
- ✅ **Story** - Extracted stories (needs enhancement for multi-perspective)
- ✅ **Invitation** - Family invitation system

**Missing V2 Models**:
- ❌ Theme
- ❌ AIInsight
- ❌ Prompt
- ❌ Collection
- ❌ Comment
- ❌ Reaction

#### Frontend Infrastructure
- **Framework**: React 18 + Vite
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Routing**: React Router v6
- **State**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS with custom design system

**Design System Colors**:
- Powder Blue (backgrounds)
- Atomic Teal (primary actions)
- Tangerine (accents/highlights)
- Deep Walnut (text)
- Coral Pink (emotional/important)

#### Frontend Pages (Prototype)
- ✅ **Index.tsx** - Landing page
- ✅ **Onboarding.tsx** - Onboarding flow
- ✅ **Dashboard.tsx** - Owner dashboard (V1 focused, needs V2 features)
- ✅ **ElderlyDashboard.tsx** - Simplified elderly persona
- ✅ **ContributorDashboard.tsx** - Contributor persona
- ✅ **ViewerDashboard.tsx** - Viewer persona

#### Frontend Components
- ✅ **Chatbot** - AI assistant (ChatbotPanel, ChatMessage, TypingIndicator)
- ✅ **InviteFamilyModal** - Family invitation UI
- ✅ **ScheduleCallModal** - Call scheduling UI
- ✅ **StoryDetailModal** - Story viewing modal
- ✅ **WelcomeBanner** - First-time user welcome
- ✅ **OnboardingBanner** - Persistent onboarding access
- ✅ **EmptyState** - Empty state component

### ⚠️ V1 vs V2 Gaps

#### Critical Schema Changes Needed

**1. Rename Tables (Breaking Changes)**
```sql
-- From V1 to V2 naming
LegacyProject → FamilyArchive
ProjectMember → ArchiveMember
Conversation → Contribution
```

**2. Expand Contribution Model**
Current `Conversation` is audio-only. Needs:
- Multi-type support (audio, video, photo, text, document)
- Group session tracking (is_group_session, participant_ids)
- Manual speaker tagging (speaker_labels)
- Enhanced metadata

**3. Add V2-Specific Models**
```typescript
model Theme {
  id, archiveId, name, description, storyIds,
  confidence, createdByAI, status, color
}

model AIInsight {
  id, archiveId, insightType, title, description,
  relatedStoryIds, actionable, priority, status
}

model Prompt {
  id, archiveId, targetMemberId, promptType,
  question, context, priority, status
}

model Collection {
  id, archiveId, collectionType, title, description,
  storyIds, coverImage, status
}
```

#### Backend Endpoints Needed

**Week 1: Foundation**
- ✅ Auth endpoints exist (register, login, /me)
- ❌ Need archive endpoints (currently /projects, needs renaming)
- ❌ Need member management endpoints
- ❌ Need invitation acceptance flow

**Week 3-4: Recording Magic**
- ❌ **POST /contributions** - Create contribution (audio/photo/video/text)
- ❌ **POST /contributions/:id/upload-chunk** - Chunked audio upload
- ❌ **POST /contributions/:id/transcribe** - Trigger Whisper transcription
- ❌ **POST /contributions/:id/ai-followup** - Get AI follow-up question
- ❌ **GET /contributions/:id/session** - Get session state

**Week 4-5: AI Processing**
- ❌ **POST /contributions/:id/extract-stories** - Trigger story extraction
- ❌ **POST /archives/:id/analyze-connections** - Find connections
- ❌ **POST /archives/:id/identify-gaps** - Find missing stories

**Week 6-7: Orchestration**
- ❌ **GET /archives/:id/themes** - Get discovered themes
- ❌ **POST /archives/:id/discover-themes** - Trigger theme discovery
- ❌ **GET /archives/:id/prompts** - Get personalized prompts
- ❌ **POST /prompts/:id/respond** - Respond to prompt

#### Frontend Components Needed

**Recording Components (Week 3)**
- ❌ **AudioRecorder** - Browser MediaRecorder wrapper
- ❌ **WaveformVisualizer** - Real-time audio waveform
- ❌ **AIConversationPanel** - AI follow-up questions UI
- ❌ **SpeakerTagger** - Manual speaker tagging for group sessions
- ❌ **MultiModalUploader** - Upload audio/video/photo/text

**AI Insights Components (Week 5)**
- ❌ **ConnectionCard** - Display discovered connections
- ❌ **ThemeCard** - Display discovered themes
- ❌ **GapIdentificationPanel** - Show missing stories

**Orchestration Components (Week 6-7)**
- ❌ **ThemeDiscoveryView** - Browse themes
- ❌ **PromptCard** - Display personalized prompts
- ❌ **PromptResponseModal** - Respond to prompts

#### External Services Needed

**AI Services**
- ❌ **OpenAI API key** - Whisper + GPT-4
- ❌ **Whisper integration** - Audio transcription
- ❌ **GPT-4 integration** - Conversation + analysis
- ⚠️ **TTS service** (optional MVP) - ElevenLabs or OpenAI TTS

**Infrastructure**
- ❌ **S3/Azure Blob** - Audio/media file storage
- ❌ **Redis** - Job queue + caching
- ❌ **Bull/BullMQ** - Background job processing
- ⚠️ **Twilio** (post-MVP) - Phone calls
- ⚠️ **WebSocket server** (future) - Real-time streaming

**Database**
- ✅ **PostgreSQL** - Already configured
- ⚠️ **pgvector** (optional) - Semantic similarity for themes

---

## 🚀 Week 1 Implementation Plan

### Sprint Goal
**Value Delivered**: Users can create family archives, invite members, and see basic dashboard

### Features to Ship (from PRODUCT_ROADMAP_V2.md)

#### 1.1: Authentication & User Management
**Status**: ✅ 80% Complete

**Existing**:
- Backend auth endpoints (register, login, /me)
- JWT middleware
- Password hashing

**Needed**:
- Frontend login/register pages
- Protected route wrapper
- Token management in API client
- User context/state management

**Files to Create**:
```
frontend/src/pages/Login.tsx
frontend/src/pages/Register.tsx
frontend/src/contexts/AuthContext.tsx
frontend/src/components/ProtectedRoute.tsx
frontend/src/lib/auth.ts (token management)
```

**Estimated**: 8 hours

#### 1.2: Family Archive Creation
**Status**: ❌ Needs V2 Updates

**Database Migration**:
```prisma
// Rename LegacyProject to FamilyArchive
model FamilyArchive {
  id              String   @id @default(uuid())
  archiveName     String   // NEW: "Thompson Family Archive"
  archiveType     String   @default("family") // "family" or "individual"
  primarySubject  String?  // Optional for family archives
  description     String?
  coverImage      String?
  settings        Json     @default("{}")
  status          ArchiveStatus @default(ACTIVE)
  createdById     String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  createdBy       User            @relation(fields: [createdById], references: [id])
  members         ArchiveMember[]
  contributions   Contribution[]
  stories         Story[]
  themes          Theme[]
  insights        AIInsight[]
  prompts         Prompt[]
  collections     Collection[]
  invitations     Invitation[]

  @@map("family_archives")
}
```

**Backend Endpoints**:
- `POST /archives` - Create archive
- `GET /archives` - List user's archives
- `GET /archives/:id` - Get archive details
- `PATCH /archives/:id` - Update archive
- `DELETE /archives/:id` - Delete archive

**Frontend**:
- Update Onboarding.tsx to create FamilyArchive (not LegacyProject)
- Update Dashboard.tsx to fetch /archives
- Archive creation modal/flow

**Estimated**: 12 hours

#### 1.3: Family Member Invitations
**Status**: ⚠️ 50% Complete

**Existing**:
- Invitation model exists
- InviteFamilyModal component exists

**Needed**:
- Backend invitation endpoints
- Email sending service (SendGrid/Resend)
- Invitation acceptance flow
- Member role assignment

**Backend Endpoints**:
```typescript
POST /archives/:id/members/invite
GET /invitations/:token
POST /invitations/:token/accept
GET /archives/:id/members
PATCH /archives/:id/members/:memberId
DELETE /archives/:id/members/:memberId
```

**Frontend**:
- Invitation acceptance page
- Member management UI in Dashboard
- Update InviteFamilyModal to call API

**Estimated**: 10 hours

#### 1.4: Dashboard UI Updates
**Status**: ⚠️ Needs V2 Alignment

**Changes Needed**:
- Replace mock data with API calls
- Update to use /archives instead of /projects
- Add empty states for new archives
- Update persona dashboards for V2

**Files to Update**:
```
frontend/src/pages/Dashboard.tsx
frontend/src/pages/ElderlyDashboard.tsx
frontend/src/pages/ContributorDashboard.tsx
frontend/src/pages/ViewerDashboard.tsx
frontend/src/lib/api.ts (update endpoints)
```

**Estimated**: 6 hours

### Week 1 Deliverables Checklist

**Backend**:
- [ ] Rename database tables (migration script)
- [ ] Create /archives endpoints (create, list, get, update, delete)
- [ ] Create /invitations endpoints (invite, accept, list members)
- [ ] Set up email service (SendGrid/Resend integration)
- [ ] Test all endpoints with Postman/Thunder Client

**Frontend**:
- [ ] Create Login.tsx and Register.tsx pages
- [ ] Create AuthContext for user state management
- [ ] Create ProtectedRoute component
- [ ] Update Dashboard to fetch real data from /archives
- [ ] Update Onboarding to create FamilyArchive
- [ ] Connect InviteFamilyModal to backend
- [ ] Create invitation acceptance page
- [ ] Update App.tsx routing

**Infrastructure**:
- [ ] Set up environment variables (.env.example)
- [ ] Configure email service API keys
- [ ] Run database migration
- [ ] Test local development setup

**Testing**:
- [ ] Register new user
- [ ] Create family archive
- [ ] Invite family member
- [ ] Accept invitation
- [ ] View dashboard with real data

**Documentation**:
- [ ] Update .env.example with new variables
- [ ] Document API endpoints (optional: Swagger/OpenAPI)
- [ ] Update README with Week 1 status

---

## 📋 Week 2-8 Quick Reference

### Week 2: Onboarding & Settings
- Archive settings management
- User preferences
- Initial topic selection
- Dashboard personalization

### Week 3: AI-Guided Solo Recording
- Browser audio recording
- Chunked upload (30-second chunks)
- Whisper transcription
- GPT-4 follow-up questions
- Waveform visualizer

### Week 4: AI-Guided Group Recording
- Multi-speaker support
- Manual speaker tagging
- Group session management
- Participant management

### Week 5: AI Story Processing
- Story extraction from transcripts
- Connection discovery
- Gap identification
- Story approval workflow

### Week 6: Theme Discovery
- Batch theme discovery job
- Theme management UI
- Multi-perspective story views
- Theme-based navigation

### Week 7: AI Orchestration
- Personalized prompt generation
- Prompt notification system
- Prompt response flow
- Activity tracking

### Week 8: Polish & Beta Prep
- Performance optimization
- Error handling
- Onboarding refinement
- Beta testing preparation

---

## 🔧 Development Environment Setup

### Prerequisites
- Node.js 20+
- PostgreSQL (local or Docker)
- OpenAI API key
- Email service API key (SendGrid/Resend)
- AWS S3 or Azure Blob account (for Week 3+)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run prisma:migrate
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables Needed (Week 1)

**Backend (.env)**:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/voice_legacy_v2"

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-secret"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email (SendGrid or Resend)
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@voicelegacy.com

# OpenAI (for Week 3+, can be added later)
OPENAI_API_KEY=sk-...
```

**Frontend (.env)**:
```bash
VITE_API_URL=http://localhost:3001/v1
```

---

## ⚠️ Critical Decisions Before Starting

### 1. Database Migration Strategy
**Decision**: Rename tables or create new ones?

**Option A**: Rename existing tables (cleaner, but breaking)
```sql
ALTER TABLE legacy_projects RENAME TO family_archives;
ALTER TABLE project_members RENAME TO archive_members;
ALTER TABLE conversations RENAME TO contributions;
```

**Option B**: Create new tables, keep old ones (safer for rollback)
```sql
CREATE TABLE family_archives AS SELECT * FROM legacy_projects;
-- Then add new columns
```

**Recommendation**: Option A (rename) since this is pre-production and cleaner long-term.

### 2. Email Service
**Decision**: SendGrid or Resend?

- **SendGrid**: More mature, generous free tier (100 emails/day)
- **Resend**: Modern, developer-friendly, $0.001/email after 100/day

**Recommendation**: **Resend** for better DX and modern API.

### 3. File Storage (for Week 3)
**Decision**: AWS S3 or Azure Blob?

- **AWS S3**: Industry standard, more features
- **Azure Blob**: Simpler, good for small-scale

**Recommendation**: **AWS S3** for scalability and ecosystem compatibility.

### 4. Background Jobs (for Week 4+)
**Decision**: BullMQ + Redis or cloud queue (SQS)?

- **BullMQ + Redis**: Open-source, full control, local dev friendly
- **AWS SQS**: Managed, serverless, pay-per-use

**Recommendation**: **BullMQ + Redis** for Week 1-8 (easier local dev), migrate to SQS post-MVP if needed.

---

## 📊 Success Metrics (Week 1)

**Backend**:
- [ ] All auth endpoints return 200/201 for valid requests
- [ ] Archive CRUD endpoints tested via Postman
- [ ] Invitation flow works end-to-end
- [ ] Database migrations apply cleanly

**Frontend**:
- [ ] User can register, login, and see dashboard
- [ ] User can create archive and invite family
- [ ] Dashboard displays real data from API
- [ ] No console errors on any page

**Integration**:
- [ ] Frontend successfully authenticates with backend
- [ ] All API calls work with JWT tokens
- [ ] Invitation emails are sent and received
- [ ] Invitation acceptance creates ArchiveMember

**Performance**:
- [ ] All API responses <500ms
- [ ] Frontend loads <2 seconds
- [ ] No network errors in browser console

---

## 🎯 Ready to Begin?

**Current Status**: ✅ **READY**

You have:
- ✅ Backend infrastructure (Express + Prisma)
- ✅ Frontend infrastructure (React + Vite + shadcn)
- ✅ Authentication system (JWT)
- ✅ Database schema foundation
- ✅ Complete documentation (MFL + Roadmap)
- ✅ Clear 8-week plan

**Next Steps**:
1. **Create `.env` files** with credentials
2. **Run database migration** (rename tables)
3. **Implement Week 1 features** (follow checklist above)
4. **Test end-to-end** (register → create archive → invite → accept)
5. **Commit and deploy** to staging

**Estimated Week 1 Completion**: 40-50 hours (1 full-time week or 2 part-time weeks)

---

## 📞 Quick Reference

**Key Documents**:
- Master Feature List: `docs/MASTER_FEATURE_LIST.md`
- Product Roadmap: `docs/PRODUCT_ROADMAP_V2.md`
- Architecture: `docs/ARCHITECTURE_V2.md`
- Migration Guide: `docs/V1_TO_V2_MIGRATION.md`

**Code Locations**:
- Backend: `backend/src/`
- Frontend: `frontend/src/`
- Database Schema: `backend/prisma/schema.prisma`
- API Client: `frontend/src/lib/api.ts`

**Contact**:
If you hit blockers, reference the roadmap for dependencies and alternatives.

---

**Let's build this! 🚀**
