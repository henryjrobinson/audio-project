# Voice Legacy ↔ MyLife Platform Integration Plan

**Version**: 1.0
**Date**: October 2025
**Status**: Planning Phase

---

## Executive Summary

Voice Legacy will be built as a **MyLife Member Service** - a specialized service running on the MyLife platform that focuses on family storytelling and voice preservation for elderly parents.

### Integration Strategy

**Frontend**: React SPA (standalone during development, embedded in MyLife later)
**Backend**: MyLife Koa.js server with new Voice Legacy endpoints
**Authentication**: MyLife member sessions
**Data**: MyLife PostgreSQL database (new tables)
**Bots**: Voice Legacy Chatbot as a MyLife bot-avatar

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MyLife Platform                          │
│                                                             │
│  ┌──────────────────┐         ┌─────────────────────┐     │
│  │  Member Auth     │         │   Bot Framework     │     │
│  │  & Sessions      │◄────────┤   - Biographer-bot  │     │
│  └──────────────────┘         │   - Health-bot      │     │
│           ▲                   │   - VoiceLegacy-bot │◄────┼───┐
│           │                   └─────────────────────┘     │   │
│           │                                               │   │
│  ┌────────┴───────────────────────────────────────┐      │   │
│  │         Koa.js Server                          │      │   │
│  │                                                │      │   │
│  │  Existing Routes:          New Routes:        │      │   │
│  │  - /api/member/*          - /api/voice-legacy/*│      │   │
│  │  - /api/bot/*             - /api/archives/*   │      │   │
│  │  - /api/avatar/*          - /api/chat/*       │      │   │
│  └────────────────────────────────────────────────┘      │   │
│           ▲                           ▲                  │   │
│           │                           │                  │   │
│  ┌────────┴──────────┐       ┌────────┴──────────┐      │   │
│  │  Azure Cosmos DB  │       │  PostgreSQL        │      │   │
│  │  (MyLife Core)    │       │  (MyLife + Voice)  │      │   │
│  └───────────────────┘       └────────────────────┘      │   │
│                                      ▲                   │   │
└──────────────────────────────────────┼───────────────────┘   │
                                       │                       │
                    ┌──────────────────┴────────────────┐      │
                    │  Voice Legacy Frontend (React)    │      │
                    │                                   │      │
                    │  Components:                      │      │
                    │  - Dashboard                      │      │
                    │  - Stories                        │      │
                    │  - Family Management             │      │
                    │  - Chatbot (uses VoiceLegacy-bot)│◄─────┘
                    │                                   │
                    │  During Development:              │
                    │  - Runs standalone (localhost)    │
                    │  - Uses mock API services         │
                    │                                   │
                    │  In Production:                   │
                    │  - Embedded in MyLife             │
                    │  - Uses real MyLife APIs          │
                    └───────────────────────────────────┘
```

---

## MyLife Backend Changes Required

### 1. New Database Tables (PostgreSQL)

MyLife already uses PostgreSQL. Add these new tables for Voice Legacy:

```sql
-- Family Archives (the core entity)
CREATE TABLE voice_legacy_archives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES mylife_members(id),  -- MyLife member who created
    name VARCHAR(255) NOT NULL,
    description TEXT,
    archive_type VARCHAR(50) DEFAULT 'family',  -- 'individual' | 'family' | 'topic'
    status VARCHAR(50) DEFAULT 'active',  -- 'active' | 'paused' | 'completed'

    -- Subject info (if individual archive)
    subject_name VARCHAR(255),
    subject_relationship VARCHAR(100),
    subject_birth_date DATE,
    subject_photo_url TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Archive members (family participants)
CREATE TABLE voice_legacy_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES voice_legacy_archives(id) ON DELETE CASCADE,
    member_id UUID REFERENCES mylife_members(id),  -- NULL if not yet registered
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100),  -- "Daughter", "Son", "Grandson"
    role VARCHAR(50) NOT NULL,  -- 'owner' | 'admin' | 'contributor' | 'viewer'

    -- Permissions
    can_contribute BOOLEAN DEFAULT true,
    can_view_all BOOLEAN DEFAULT true,
    can_invite_others BOOLEAN DEFAULT false,

    -- Tracking
    contribution_count INTEGER DEFAULT 0,
    last_contributed_at TIMESTAMP,

    status VARCHAR(50) DEFAULT 'invited',  -- 'active' | 'invited' | 'pending'
    invited_at TIMESTAMP DEFAULT NOW(),
    joined_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()
);

-- Contributions (audio, photos, videos, text)
CREATE TABLE voice_legacy_contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES voice_legacy_archives(id) ON DELETE CASCADE,
    contributor_id UUID NOT NULL REFERENCES voice_legacy_members(id),

    type VARCHAR(50) NOT NULL,  -- 'audio' | 'video' | 'photo' | 'text' | 'document'
    title VARCHAR(255) NOT NULL,
    description TEXT,

    -- File storage (Azure Blob or S3)
    file_url TEXT,
    file_type VARCHAR(100),
    file_size INTEGER,
    thumbnail_url TEXT,

    -- AI processing
    transcription TEXT,
    processing_status VARCHAR(50) DEFAULT 'pending',  -- 'pending' | 'processing' | 'completed' | 'failed'

    -- Metadata
    duration INTEGER,  -- seconds (for audio/video)
    emotional_moments INTEGER DEFAULT 0,

    contributed_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

-- Stories (extracted narratives)
CREATE TABLE voice_legacy_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES voice_legacy_archives(id) ON DELETE CASCADE,
    contribution_id UUID REFERENCES voice_legacy_contributions(id),  -- Source contribution

    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,

    -- Metadata
    tags TEXT[],  -- Array of tags
    timeframe JSONB,  -- {year: 1960, decade: "1960s", era: "Post-war"}
    mentioned_people TEXT[],
    mentioned_places TEXT[],

    -- Status
    approved BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES mylife_members(id),
    approved_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Themes (AI-discovered patterns)
CREATE TABLE voice_legacy_themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES voice_legacy_archives(id) ON DELETE CASCADE,

    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,

    -- Discovery
    confidence DECIMAL(3,2),  -- 0.00 to 1.00
    completeness INTEGER DEFAULT 0,  -- 0 to 100

    -- Tracking
    contribution_count INTEGER DEFAULT 0,
    story_count INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Link table: contributions to themes (many-to-many)
CREATE TABLE voice_legacy_contribution_themes (
    contribution_id UUID REFERENCES voice_legacy_contributions(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES voice_legacy_themes(id) ON DELETE CASCADE,
    PRIMARY KEY (contribution_id, theme_id)
);

-- Conversations (scheduled calls)
CREATE TABLE voice_legacy_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES voice_legacy_archives(id) ON DELETE CASCADE,

    scheduled_for TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 45,
    topic VARCHAR(255),

    -- Twilio integration (future)
    call_sid VARCHAR(255),
    phone_number VARCHAR(50),

    status VARCHAR(50) DEFAULT 'scheduled',  -- 'scheduled' | 'in_progress' | 'completed' | 'cancelled'

    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_archives_member ON voice_legacy_archives(member_id);
CREATE INDEX idx_members_archive ON voice_legacy_members(archive_id);
CREATE INDEX idx_contributions_archive ON voice_legacy_contributions(archive_id);
CREATE INDEX idx_stories_archive ON voice_legacy_stories(archive_id);
CREATE INDEX idx_themes_archive ON voice_legacy_themes(archive_id);
```

### 2. New API Endpoints (Koa.js Routes)

Add these routes to the MyLife Koa server:

```javascript
// File: server/routes/voice-legacy.js

const Router = require('koa-router');
const router = new Router({ prefix: '/api/voice-legacy' });

// ========================================
// Archives
// ========================================

// GET /api/voice-legacy/archives
// List all archives for current member
router.get('/archives', async (ctx) => {
    const memberId = ctx.state.member.id;  // From MyLife session
    // Query database for archives where member_id = memberId
    // Return array of archives
});

// POST /api/voice-legacy/archives
// Create new archive
router.post('/archives', async (ctx) => {
    const memberId = ctx.state.member.id;
    const { name, description, archiveType, subjectInfo } = ctx.request.body;
    // Create archive in database
    // Return created archive
});

// GET /api/voice-legacy/archives/:id
// Get single archive with stats
router.get('/archives/:id', async (ctx) => {
    const archiveId = ctx.params.id;
    // Verify member has access
    // Return archive with stats (contribution count, member count, etc.)
});

// PUT /api/voice-legacy/archives/:id
// Update archive
router.put('/archives/:id', async (ctx) => {
    // Update archive details
});

// DELETE /api/voice-legacy/archives/:id
// Delete archive (owner only)
router.delete('/archives/:id', async (ctx) => {
    // Soft delete or hard delete
});

// ========================================
// Archive Members
// ========================================

// GET /api/voice-legacy/archives/:id/members
// List all members of an archive
router.get('/archives/:id/members', async (ctx) => {
    // Return array of members with their roles and stats
});

// POST /api/voice-legacy/archives/:id/members/invite
// Invite family member
router.post('/archives/:id/members/invite', async (ctx) => {
    const { email, name, relationship, role } = ctx.request.body;
    // Create member record
    // Send invitation email via MyLife email service
    // Return created member
});

// PUT /api/voice-legacy/members/:memberId
// Update member role/permissions
router.put('/members/:memberId', async (ctx) => {
    const { role, canContribute, canViewAll } = ctx.request.body;
    // Update member
});

// DELETE /api/voice-legacy/members/:memberId
// Remove member from archive
router.delete('/members/:memberId', async (ctx) => {
    // Delete member
});

// ========================================
// Contributions
// ========================================

// GET /api/voice-legacy/archives/:id/contributions
// List all contributions for an archive
router.get('/archives/:id/contributions', async (ctx) => {
    const { type, contributorId } = ctx.query;  // Optional filters
    // Return array of contributions
});

// POST /api/voice-legacy/archives/:id/contributions
// Create new contribution (upload)
router.post('/archives/:id/contributions', async (ctx) => {
    const { type, title, description, fileUrl } = ctx.request.body;
    const contributorId = ctx.state.member.id;
    // Create contribution
    // Trigger AI processing (transcription, story extraction)
    // Return created contribution
});

// GET /api/voice-legacy/contributions/:id
// Get single contribution
router.get('/contributions/:id', async (ctx) => {
    // Return contribution with transcription
});

// PUT /api/voice-legacy/contributions/:id
// Update contribution
router.put('/contributions/:id', async (ctx) => {
    // Update title, description
});

// DELETE /api/voice-legacy/contributions/:id
// Delete contribution
router.delete('/contributions/:id', async (ctx) => {
    // Delete
});

// ========================================
// Stories
// ========================================

// GET /api/voice-legacy/archives/:id/stories
// List all stories
router.get('/archives/:id/stories', async (ctx) => {
    const { approved, tags } = ctx.query;  // Optional filters
    // Return array of stories
});

// GET /api/voice-legacy/stories/:id
// Get single story
router.get('/stories/:id', async (ctx) => {
    // Return full story
});

// PUT /api/voice-legacy/stories/:id/approve
// Approve a story
router.put('/stories/:id/approve', async (ctx) => {
    const memberId = ctx.state.member.id;
    // Set approved = true, approved_by = memberId
});

// ========================================
// Themes
// ========================================

// GET /api/voice-legacy/archives/:id/themes
// List discovered themes
router.get('/archives/:id/themes', async (ctx) => {
    // Return array of themes with contribution counts
});

// GET /api/voice-legacy/themes/:id
// Get single theme with related content
router.get('/themes/:id', async (ctx) => {
    // Return theme with contributions and stories
});

// ========================================
// Conversations (Scheduled Calls)
// ========================================

// GET /api/voice-legacy/archives/:id/conversations
// List scheduled/completed conversations
router.get('/archives/:id/conversations', async (ctx) => {
    // Return array of conversations
});

// POST /api/voice-legacy/archives/:id/conversations/schedule
// Schedule a new call
router.post('/archives/:id/conversations/schedule', async (ctx) => {
    const { scheduledFor, topic, phoneNumber } = ctx.request.body;
    // Create conversation
    // (Future: integrate with Twilio)
    // Return scheduled conversation
});

// ========================================
// Analytics/Stats
// ========================================

// GET /api/voice-legacy/archives/:id/stats
// Get archive statistics
router.get('/archives/:id/stats', async (ctx) => {
    // Return:
    // - Total contributions
    // - Total stories
    // - Family member count
    // - Hours recorded
    // - Themes discovered
    // - Recent activity
});

// GET /api/voice-legacy/archives/:id/context
// Get full context for chatbot
router.get('/archives/:id/context', async (ctx) => {
    // Return comprehensive context (for chatbot)
    // - Archive details
    // - Stats
    // - Recent activity
    // - Themes
    // - Family members
    // - Suggested actions
});

module.exports = router;
```

### 3. Bot Integration (Voice Legacy Chatbot)

The chatbot should be implemented as a **MyLife bot-avatar**, similar to Biographer-bot:

```javascript
// File: server/bots/voice-legacy-bot.js

const MyLifeBot = require('../services/mylife-bot-base');
const OpenAI = require('openai');

class VoiceLegacyBot extends MyLifeBot {
    constructor(memberId, archiveId) {
        super({
            name: 'VoiceLegacy Assistant',
            type: 'voice-legacy-assistant',
            memberId,
            capabilities: [
                'answer_questions',
                'find_stories',
                'suggest_actions',
                'guide_navigation'
            ]
        });

        this.archiveId = archiveId;
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async processMessage(message, context) {
        // 1. Get archive context
        const archiveContext = await this.getArchiveContext(this.archiveId);

        // 2. Build prompt with context
        const systemPrompt = this.buildSystemPrompt(archiveContext, context);

        // 3. Call OpenAI
        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            temperature: 0.7
        });

        // 4. Parse response
        const response = completion.choices[0].message.content;

        // 5. Extract any actions
        const actions = this.extractActions(response);

        return {
            content: response,
            actions,
            timestamp: new Date()
        };
    }

    buildSystemPrompt(archiveContext, userContext) {
        return `
You are the Voice Legacy Assistant for the "${archiveContext.name}" family archive.

Current archive context:
- ${archiveContext.stats.totalStories} stories captured
- ${archiveContext.stats.totalContributions} contributions from ${archiveContext.stats.familyMemberCount} family members
- ${archiveContext.themes.length} themes discovered

Recent activity:
${archiveContext.recentActivity.map(a => `- ${a.title}`).join('\n')}

User is currently on: ${userContext.currentPage}
User role: ${userContext.userRole}

Provide helpful, warm, and contextual answers. You can:
- Find stories by theme, person, or time period
- Explain how to use the platform
- Suggest next actions
- Surface insights about the family archive

Be empathetic - these are precious family memories.
`;
    }

    async getArchiveContext(archiveId) {
        // Call /api/voice-legacy/archives/:id/context
        // Return full context object
    }

    extractActions(response) {
        // Parse response for action markers like [OPEN_MODAL:story-123]
        // Return array of action objects
    }
}

// Register bot with MyLife bot framework
module.exports = VoiceLegacyBot;
```

### 4. Authentication & Session Management

Voice Legacy will use MyLife's existing member authentication:

```javascript
// In Voice Legacy routes, access current member via ctx.state.member

router.get('/archives', async (ctx) => {
    // MyLife middleware populates ctx.state.member
    const memberId = ctx.state.member.id;
    const memberEmail = ctx.state.member.email;

    // Use memberId for all queries
    const archives = await db.query(`
        SELECT * FROM voice_legacy_archives
        WHERE member_id = $1
    `, [memberId]);

    ctx.body = archives;
});
```

### 5. File Storage

Use MyLife's existing Azure Blob Storage or S3:

```javascript
// File upload handler
router.post('/archives/:id/contributions/upload', async (ctx) => {
    const file = ctx.request.files.file;

    // Upload to Azure Blob (MyLife's existing storage)
    const fileUrl = await ctx.services.storage.uploadFile({
        file,
        container: 'voice-legacy-contributions',
        memberId: ctx.state.member.id
    });

    // Create contribution record
    const contribution = await db.query(`
        INSERT INTO voice_legacy_contributions
        (archive_id, contributor_id, type, title, file_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [archiveId, contributorId, fileType, title, fileUrl]);

    ctx.body = contribution;
});
```

---

## Frontend Changes (Mock Mode During Development)

### Directory Structure

```
frontend/
├── src/
│   ├── services/
│   │   ├── api.ts                    # Main API service
│   │   ├── mockApi.ts                # Mock data for development
│   │   └── mylifeAdapter.ts          # Adapts MyLife API responses
│   ├── config/
│   │   └── environment.ts            # Environment config
│   ├── types/
│   │   ├── api.ts                    # API response types
│   │   └── mylife.ts                 # MyLife-specific types
│   ├── components/
│   │   └── Chatbot/
│   │       ├── ChatbotButton.tsx
│   │       ├── ChatbotPanel.tsx
│   │       └── index.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Stories.tsx
│   │   └── Family.tsx
│   └── App.tsx
```

### Environment Configuration

```typescript
// src/config/environment.ts

export const config = {
    // Toggle between mock and real API
    useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',

    // MyLife API base URL
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

    // MyLife member session (when embedded)
    mylifeSessionToken: null as string | null
};

// Development: use mock data
// Production: use MyLife APIs
```

### API Service with Mock Fallback

```typescript
// src/services/api.ts

import { config } from '@/config/environment';
import { mockApi } from './mockApi';
import { mylifeAdapter } from './mylifeAdapter';

class ApiService {
    private baseUrl: string;
    private useMock: boolean;

    constructor() {
        this.baseUrl = config.apiBaseUrl;
        this.useMock = config.useMockApi;
    }

    // Archives
    async getArchives() {
        if (this.useMock) {
            return mockApi.getArchives();
        }

        const response = await fetch(`${this.baseUrl}/api/voice-legacy/archives`, {
            headers: this.getHeaders()
        });
        const data = await response.json();
        return mylifeAdapter.transformArchives(data);
    }

    async getArchive(id: string) {
        if (this.useMock) {
            return mockApi.getArchive(id);
        }

        const response = await fetch(`${this.baseUrl}/api/voice-legacy/archives/${id}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    // Stories
    async getStories(archiveId: string) {
        if (this.useMock) {
            return mockApi.getStories(archiveId);
        }

        const response = await fetch(
            `${this.baseUrl}/api/voice-legacy/archives/${archiveId}/stories`,
            { headers: this.getHeaders() }
        );
        return response.json();
    }

    // Family Members
    async getFamilyMembers(archiveId: string) {
        if (this.useMock) {
            return mockApi.getFamilyMembers(archiveId);
        }

        const response = await fetch(
            `${this.baseUrl}/api/voice-legacy/archives/${archiveId}/members`,
            { headers: this.getHeaders() }
        );
        return response.json();
    }

    async inviteFamilyMember(archiveId: string, data: any) {
        if (this.useMock) {
            return mockApi.inviteFamilyMember(archiveId, data);
        }

        const response = await fetch(
            `${this.baseUrl}/api/voice-legacy/archives/${archiveId}/members/invite`,
            {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            }
        );
        return response.json();
    }

    // Chatbot
    async sendChatMessage(archiveId: string, message: string, context: any) {
        if (this.useMock) {
            return mockApi.sendChatMessage(archiveId, message, context);
        }

        // In production, this would call MyLife bot endpoint
        const response = await fetch(`${this.baseUrl}/api/bot/voice-legacy/chat`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                archiveId,
                message,
                context
            })
        });
        return response.json();
    }

    // Helper to get auth headers
    private getHeaders() {
        const headers: any = {
            'Content-Type': 'application/json'
        };

        // In production, MyLife session token
        if (config.mylifeSessionToken) {
            headers['Authorization'] = `Bearer ${config.mylifeSessionToken}`;
        }

        return headers;
    }
}

export const api = new ApiService();
```

### Mock Data Service

```typescript
// src/services/mockApi.ts

import { mockData } from './mockData';

export const mockApi = {
    getArchives: async () => {
        await delay(300);  // Simulate network delay
        return mockData.archives;
    },

    getArchive: async (id: string) => {
        await delay(300);
        return mockData.archives.find(a => a.id === id);
    },

    getStories: async (archiveId: string) => {
        await delay(500);
        return mockData.stories.filter(s => s.archiveId === archiveId);
    },

    getFamilyMembers: async (archiveId: string) => {
        await delay(300);
        return mockData.familyMembers.filter(m => m.archiveId === archiveId);
    },

    inviteFamilyMember: async (archiveId: string, data: any) => {
        await delay(500);
        const newMember = {
            id: generateId(),
            archiveId,
            ...data,
            status: 'invited',
            invitedAt: new Date().toISOString()
        };
        mockData.familyMembers.push(newMember);
        return newMember;
    },

    sendChatMessage: async (archiveId: string, message: string, context: any) => {
        await delay(1000);

        // Simple mock responses based on keywords
        let response = "I'm here to help! What would you like to know?";

        if (message.toLowerCase().includes('cooking')) {
            response = "I found 4 stories related to cooking in your archive. Would you like me to show them?";
        } else if (message.toLowerCase().includes('invite')) {
            response = "I can help you invite family members! Click the 'Invite Family' button or I can guide you through it.";
        } else if (message.toLowerCase().includes('stories')) {
            response = `Your archive has ${mockData.stories.length} stories. Would you like to see them organized by theme?`;
        }

        return {
            id: generateId(),
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString()
        };
    }
};

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
```

### MyLife Adapter (Transform API Responses)

```typescript
// src/services/mylifeAdapter.ts

// Transforms MyLife API responses to frontend format
export const mylifeAdapter = {
    transformArchives: (mylifeData: any[]) => {
        return mylifeData.map(archive => ({
            id: archive.id,
            name: archive.name,
            description: archive.description,
            type: archive.archive_type,
            status: archive.status,
            subject: archive.subject_name ? {
                name: archive.subject_name,
                relationship: archive.subject_relationship,
                birthDate: archive.subject_birth_date,
                photo: archive.subject_photo_url
            } : null,
            createdAt: archive.created_at,
            updatedAt: archive.updated_at
        }));
    },

    // Add more transformers as needed
};
```

### .env Configuration

```bash
# .env.development
VITE_USE_MOCK_API=true
VITE_API_BASE_URL=http://localhost:5173

# .env.production (when integrated with MyLife)
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-mylife-instance.com
```

---

## Integration Phases

### Phase 1: Standalone Frontend (Current - 2 weeks)
- ✅ Build React components
- ✅ Use 100% mock data
- ✅ Implement all UI/UX
- ✅ Chatbot with mock responses
- ✅ Test all user flows

**Deliverable**: Fully functional demo with mock data

### Phase 2: MyLife Backend Development (4-6 weeks)
- [ ] Add database tables to MyLife PostgreSQL
- [ ] Implement Voice Legacy API routes
- [ ] Create VoiceLegacy bot in bot framework
- [ ] Set up file storage integration
- [ ] Add authentication middleware

**Deliverable**: MyLife backend ready for Voice Legacy

### Phase 3: Frontend-Backend Integration (1-2 weeks)
- [ ] Switch from mock API to real MyLife APIs
- [ ] Test authentication flow
- [ ] Verify all endpoints
- [ ] Fix any data format issues
- [ ] Load testing

**Deliverable**: Working end-to-end integration

### Phase 4: MyLife Platform Embedding (1 week)
- [ ] Create Voice Legacy section in MyLife UI
- [ ] Embed React app in MyLife
- [ ] Pass MyLife session to frontend
- [ ] Style integration with MyLife design system
- [ ] Navigation integration

**Deliverable**: Voice Legacy as MyLife member service

---

## Development Workflow

### Current (Development Mode)
```bash
# Terminal 1: Frontend only
cd frontend
npm run dev

# Uses mock data, no backend needed
# Access at http://localhost:5173
```

### Future (Integrated Mode)
```bash
# Terminal 1: MyLife backend
cd mylife-maht
npm run dev

# Terminal 2: Frontend (connected to MyLife)
cd voice-legacy/frontend
VITE_USE_MOCK_API=false npm run dev

# Frontend talks to MyLife backend at localhost:3000
```

---

## Key Decisions Documented

### ✅ Authentication
- Use MyLife member sessions (no separate auth system)
- Frontend receives session token from MyLife
- All API calls include MyLife auth headers

### ✅ Data Storage
- Use MyLife PostgreSQL (add new tables)
- Use MyLife file storage (Azure Blob)
- No separate database needed

### ✅ Bot Integration
- Chatbot = MyLife bot-avatar
- Uses MyLife bot framework
- Registered as "VoiceLegacy Assistant"

### ✅ Frontend Architecture
- React SPA (can run standalone or embedded)
- Mock API layer for development
- Adapter pattern for MyLife API integration
- Environment-based configuration

---

## Next Steps

1. **Build frontend with mock data** (this is what we'll do now)
2. **Document MyLife backend changes** (this document)
3. **Share with MyLife team** for backend implementation
4. **Test integration** when MyLife backend is ready
5. **Deploy** as MyLife member service

---

## Questions for MyLife Team

1. **Bot Framework**: What's the exact interface for creating a new bot type?
2. **File Storage**: What's the API for uploading files to Azure Blob?
3. **Email Service**: How do we send invitation emails via MyLife?
4. **UI Embedding**: What's the best way to embed our React app in MyLife?
5. **Session Management**: How do we access the current member's session from frontend?

---

## Conclusion

This plan allows you to:
- ✅ Build and demo the frontend **immediately** with mock data
- ✅ Design APIs that match MyLife's architecture
- ✅ Document exactly what MyLife backend needs to add
- ✅ Integrate seamlessly when backend is ready

**The frontend you build now will work with MyLife backend later with minimal changes.**
