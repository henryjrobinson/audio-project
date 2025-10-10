# Voice Legacy Platform - Master Feature List (MFL)
## V2: Collaborative Family Storytelling Platform

**Version**: 1.0
**Date**: January 2025
**Status**: Ready for Development

---

## 📋 Table of Contents

1. [Epic Overview](#epic-overview)
2. [Priority Definitions](#priority-definitions)
3. [MVP Scope (Week 1-8)](#mvp-scope-week-1-8)
4. [Post-MVP Features](#post-mvp-features)
5. [Detailed Feature Breakdown](#detailed-feature-breakdown)

---

## Epic Overview

### **Total Epics**: 21
### **MVP Epics**: 14 (Week 1-8)
### **Post-MVP Epics**: 7 (Week 9+)

| # | Epic Name | Priority | Week | Effort | Status |
|---|-----------|----------|------|--------|--------|
| **1** | Authentication & Onboarding | P0 | 1-2 | M | 📋 Planned |
| **2** | Family Archive Management | P0 | 1-2 | S | 📋 Planned |
| **3** | Invite Family & Sharing | P0 | 2 | M | 📋 Planned |
| **4** | Dashboards (Owner + Elderly) | P0 | 3 | L | 📋 Planned |
| **5** | AI-Guided Recording (Solo) | P0 | 3-4 | XL | 📋 Planned |
| **6** | Multi-Modal Contributions | P0 | 4 | M | 📋 Planned |
| **7** | Story Extraction & Processing | P0 | 4-5 | L | 📋 Planned |
| **8** | Story Management | P0 | 5 | M | 📋 Planned |
| **9** | AI-Guided Group Recording | P0 | 5 | L | 📋 Planned |
| **10** | AI Insights & Connections | P0 | 5-6 | L | 📋 Planned |
| **11** | Contributor Dashboard | P0 | 6 | M | 📋 Planned |
| **12** | Theme Discovery | P0 | 6-7 | XL | 📋 Planned |
| **13** | Prompt Generation System | P0 | 7 | L | 📋 Planned |
| **14** | Theme Management | P0 | 7-8 | M | 📋 Planned |
| **15** | Search & Discovery | P1 | 9 | M | 📅 Post-MVP |
| **16** | Notifications & Alerts | P1 | 9 | M | 📅 Post-MVP |
| **17** | Video Group Calls | P1 | 9-10 | XL | 📅 Post-MVP |
| **18** | Call Scheduling | P1 | 10 | M | 📅 Post-MVP |
| **19** | Collections & Outputs | P2 | 11-12 | XL | 📅 Post-MVP |
| **20** | Settings & Preferences | P2 | 12 | S | 📅 Post-MVP |
| **21** | Viewer Dashboard | P2 | 12 | M | 📅 Post-MVP |

**Effort Legend**: S=Small (1-2 days), M=Medium (3-5 days), L=Large (1-2 weeks), XL=Extra Large (2-3 weeks)

---

## Priority Definitions

### **P0 - Must Have (MVP)**
Features critical to core value proposition. Without these, the product doesn't work or fails to deliver V2's unique value.

**Criteria**:
- On critical path for user journey
- Core V2 differentiator (multi-family, AI orchestration)
- No acceptable workaround exists

### **P1 - Should Have (Post-MVP Phase 1)**
High-value features that significantly improve UX but have acceptable workarounds in MVP.

**Criteria**:
- Important for scale/engagement
- Manual workarounds exist for MVP
- Needed for beta → production transition

### **P2 - Nice to Have (Post-MVP Phase 2)**
Features that polish the experience or expand use cases.

**Criteria**:
- Enhances specific use cases
- Not critical for core value
- Can be added based on user feedback

### **P3 - Future/Deferred**
Features documented for future consideration but not in current roadmap.

---

## MVP Scope (Week 1-8)

### **Core User Journey (MVP)**

```
Week 1-2: Foundation
User creates account → Creates family archive → Invites family

Week 3-4: Recording Magic
Family gathers → AI guides group conversation → Stories captured

Week 4-5: Processing & Insights
AI extracts stories → Identifies connections → Shows insights

Week 6-7: Orchestration
AI discovers themes → Generates prompts → Family responds

Week 8: Polish
Refinement → Bug fixes → Beta testing prep
```

### **Value Delivered at Week 8**

✅ Multiple family members contributing
✅ AI-guided recording (solo + group)
✅ Real-time conversational AI with follow-ups
✅ AI discovers themes across family stories
✅ AI identifies gaps and prompts family
✅ Connections shown between stories
✅ 3 persona dashboards (Owner, Elderly, Contributor)
✅ Ready for 20-30 family beta test

---

## Post-MVP Features

### **Phase 1: Enhanced Engagement (Week 9-12)**

**Goal**: Geographic separation, scheduled engagement, discoverability

- Video group calls (distributed families)
- Call scheduling system
- Search & discovery
- Enhanced notifications
- Chatbot assistant (separate from recording AI)

### **Phase 2: Outputs & Scale (Week 13-16)**

**Goal**: Deliverable artifacts, monetization, polish

- Collections & outputs (PDF books, photo albums)
- Viewer dashboard (read-only persona)
- Settings & preferences
- Analytics & admin dashboard
- Monetization infrastructure

### **Phase 3: Growth (Month 5+)**

**Goal**: Marketplace, advanced features, platform

- Marketplace (templates, community)
- Advanced AI (voice cloning, real-time synthesis)
- Mobile apps
- MyLife platform integration (if applicable)

---

## Detailed Feature Breakdown

---

## EPIC 1: Authentication & Onboarding

**Priority**: P0 - Must Have
**Timeline**: Week 1-2
**Effort**: Medium (3-5 days)
**Dependencies**: None (foundation)

### **Epic Description**

User registration, login, and first-time onboarding experience that sets up the family archive journey.

### **User Stories**

#### **1.1 User Registration**

**As a new user, I want to create an account, so I can start preserving my family's stories**

**Acceptance Criteria**:
- [ ] User can register with email + password
- [ ] Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special char
- [ ] Email validation (format check)
- [ ] Duplicate email prevented with clear error message
- [ ] Confirmation email sent (optional for MVP)
- [ ] User redirected to onboarding flow after registration

**Technical Requirements**:
- JWT-based authentication
- Password hashing (bcrypt, 10 salt rounds)
- PostgreSQL User table
- Email service integration (SendGrid or similar)

**UI/UX**:
- Clean, minimal registration form
- Real-time password strength indicator
- Clear error messages
- "Already have an account? Login" link

---

#### **1.2 User Login**

**As a returning user, I want to login quickly, so I can access my family archives**

**Acceptance Criteria**:
- [ ] User can login with email + password
- [ ] Invalid credentials show clear error (don't reveal which field is wrong)
- [ ] "Remember me" option (refresh token)
- [ ] "Forgot password" flow (P1 - post-MVP)
- [ ] Successful login redirects to dashboard
- [ ] Session persists across page refreshes

**Technical Requirements**:
- Access token (15 min expiry)
- Refresh token (7 days expiry)
- Token stored in httpOnly cookies or localStorage
- Auto-refresh before expiration

---

#### **1.3 Onboarding Flow**

**As a new user, I want to understand what to do first, so I can quickly create value**

**Acceptance Criteria**:
- [ ] Step 1: "What would you like to preserve?" (archive purpose)
  - Options: "A parent's life story", "Family traditions", "Specific memories"
- [ ] Step 2: "Who is this archive about?" (subject information)
  - Name, relationship, optional photo
- [ ] Step 3: "What topics matter most?" (initial focus areas)
  - Multi-select: Cooking, Travel, Childhood, Career, Family, Holidays, etc.
  - Free-text: "Other topics"
- [ ] Step 4: "Who should contribute?" (invite family)
  - Add 1-5 email addresses with names and relationships
  - Skip option available
- [ ] Progress indicator (Step X of 4)
- [ ] Can go back to previous steps
- [ ] Creates archive + sends invites on completion
- [ ] Redirects to dashboard with "Next steps" guidance

**Technical Requirements**:
- Onboarding state management (React Context or similar)
- Archive creation API call
- Invitation API calls
- User preferences saved to database

**UI/UX**:
- Welcoming, conversational tone
- Visual icons for each step
- Estimated time: "2 minutes to get started"
- Mobile-responsive

---

#### **1.4 Invitation Acceptance**

**As an invited family member, I want to easily join the archive, so I can start contributing**

**Acceptance Criteria**:
- [ ] Invited user receives email with unique invitation link
- [ ] Clicking link opens acceptance page (no login required yet)
- [ ] Shows: "Sarah invited you to contribute to 'Mom's Life Story'"
- [ ] If not registered: Prompts to create account
- [ ] If registered: Auto-adds to archive on login
- [ ] Redirects to dashboard after acceptance
- [ ] Shows welcome message: "You're now part of [Archive Name]"

**Technical Requirements**:
- Invitation token generation (UUID, 7-day expiry)
- Email template with personalized message
- Invitation redemption endpoint
- Auto-link user to archive on acceptance

---

### **Design Notes**

**Onboarding Philosophy**:
- Get to value fast (< 3 minutes to first archive)
- Educate through doing, not reading
- Progressive disclosure (don't overwhelm with features)
- Create momentum: archive created → family invited → first recording prompt

**Success Metrics**:
- 70%+ of registered users complete onboarding
- Average time < 5 minutes
- 60%+ invite at least 1 family member
- 40%+ record first story within 24 hours

---

## EPIC 2: Family Archive Management

**Priority**: P0 - Must Have
**Timeline**: Week 1-2
**Effort**: Small (1-2 days)
**Dependencies**: Epic 1 (Authentication)

### **Epic Description**

CRUD operations for family archives - the container for all stories, members, and content.

### **User Stories**

#### **2.1 Create Archive**

**As a user, I want to create a family archive, so I can start preserving stories**

**Acceptance Criteria**:
- [ ] User can create archive from dashboard or onboarding
- [ ] Required fields: Archive name
- [ ] Optional fields: Description, primary subject (name, relationship, photo)
- [ ] Archive created with user as owner
- [ ] User redirected to archive dashboard
- [ ] First-time tips shown: "Next, invite family members!"

**Technical Requirements**:
- POST /api/archives endpoint
- FamilyArchive model in database
- Auto-assign user as owner
- Auto-create ArchiveMember record for owner

---

#### **2.2 View Archive Dashboard**

**As an archive owner, I want to see my archive overview, so I understand current status**

**Acceptance Criteria**:
- [ ] Dashboard shows:
  - Archive name and description
  - Primary subject info (if set)
  - Stats: # of stories, # of contributions, # of family members, hours recorded
  - Recent activity feed
  - Themes discovered (if any)
  - AI insights (if any)
  - Quick actions: "Record Story", "Invite Family", "Upload Photo"
- [ ] Empty state for new archives: "Let's get started! Here's what to do..."
- [ ] Loading states for async data

**Technical Requirements**:
- GET /api/archives/:id endpoint
- GET /api/archives/:id/stats endpoint
- Aggregated queries for stats
- Recent activity query (last 10 items)

---

#### **2.3 Edit Archive**

**As an archive owner, I want to edit archive details, so I can keep information current**

**Acceptance Criteria**:
- [ ] Owner can edit: Name, description, subject info
- [ ] Changes save immediately or with "Save" button
- [ ] Success notification on save
- [ ] Other members see updated information

**Technical Requirements**:
- PATCH /api/archives/:id endpoint
- Permission check (only owner or admin)
- Optimistic UI updates

---

#### **2.4 Delete Archive**

**As an archive owner, I want to delete an archive if needed, with clear warnings**

**Acceptance Criteria**:
- [ ] Delete option in archive settings
- [ ] Confirmation modal: "This will delete all stories, contributions, and data. This cannot be undone."
- [ ] Requires typing archive name to confirm
- [ ] All related data deleted (cascade)
- [ ] User redirected to archive list
- [ ] Success notification

**Technical Requirements**:
- DELETE /api/archives/:id endpoint
- Permission check (only owner)
- Cascade delete all related records
- Soft delete option (P1 - for recovery)

---

#### **2.5 Archive Settings**

**As an archive owner, I want to configure archive settings, so I can control behavior**

**Acceptance Criteria (MVP - minimal settings)**:
- [ ] Privacy: "Family only" or "Invite only" (MVP: always invite only)
- [ ] Collaboration mode: "Everyone can contribute" or "Approval required"
- [ ] AI features: "Enable theme discovery" (on by default)

**Technical Requirements**:
- Archive settings table or JSONB column
- Settings API endpoints
- Default values on archive creation

---

### **Database Schema**

```sql
CREATE TABLE family_archives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,

    -- Primary subject (if individual archive)
    subject_name VARCHAR(255),
    subject_relationship VARCHAR(100),
    subject_photo_url TEXT,

    -- Settings
    settings JSONB DEFAULT '{"collaboration_mode": "open", "ai_enabled": true}',

    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_archives_owner ON family_archives(owner_id);
```

---

## EPIC 3: Invite Family & Sharing

**Priority**: P0 - Must Have
**Timeline**: Week 2
**Effort**: Medium (3-5 days)
**Dependencies**: Epic 2 (Archive Management)

### **Epic Description**

Family member invitation, role management, and permission system enabling multi-contributor collaboration.

### **User Stories**

#### **3.1 Invite Family Member**

**As an archive owner, I want to invite family members, so they can contribute stories**

**Acceptance Criteria**:
- [ ] "Invite Family" button prominent on dashboard
- [ ] Modal form with fields:
  - Email (required)
  - Name (required)
  - Relationship to subject (dropdown: Daughter, Son, Grandchild, Sibling, Spouse, Other)
  - Role (dropdown: Admin, Contributor, Viewer)
  - Personal message (optional)
- [ ] Can invite multiple at once (add another email)
- [ ] Email validation
- [ ] Duplicate check (already in archive)
- [ ] Sends invitation email immediately
- [ ] Shows pending invitations in family list
- [ ] Success message: "Invitation sent to [Name]"

**Technical Requirements**:
- POST /api/archives/:id/members/invite endpoint
- Create ArchiveMember record (status: 'invited')
- Generate invitation token (UUID, 7-day expiry)
- Send email with invitation link
- Email template with archive name, inviter name, personal message

---

#### **3.2 View Family Members**

**As an archive member, I want to see who's part of the archive, so I know who's contributing**

**Acceptance Criteria**:
- [ ] Family tab shows all members
- [ ] For each member:
  - Name, relationship, role
  - Status: Active, Invited (pending), Inactive
  - Contribution count
  - Last active date
  - Avatar/initials
- [ ] Owner sees additional info: Email, invite/join dates
- [ ] Pending invitations shown separately
- [ ] Option to resend invitation (owner only)
- [ ] Option to revoke invitation (owner only)

**Technical Requirements**:
- GET /api/archives/:id/members endpoint
- Returns all ArchiveMembers with stats
- Joins with users table for registered members
- Shows email for pending invitations (owner only)

---

#### **3.3 Manage Member Roles**

**As an archive owner, I want to change member roles, so I can control permissions**

**Acceptance Criteria**:
- [ ] Owner can edit member roles (except own role)
- [ ] Roles: Owner (1 only), Admin, Contributor, Viewer
- [ ] Role change modal with confirmation: "Change [Name] to [Role]?"
- [ ] Permissions per role:
  - **Owner**: Full control, delete archive, manage billing
  - **Admin**: Invite/remove members, approve stories, manage themes
  - **Contributor**: Add content, view all content, comment
  - **Viewer**: View approved content only
- [ ] Owner can transfer ownership (requires confirmation)
- [ ] Changes reflected immediately
- [ ] Member notified of role change (email)

**Technical Requirements**:
- PATCH /api/archives/:id/members/:memberId endpoint
- Permission check (only owner or admin)
- Role enum validation
- Owner transfer requires special confirmation

---

#### **3.4 Remove Member**

**As an archive owner, I want to remove members if needed**

**Acceptance Criteria**:
- [ ] Owner/admin can remove members
- [ ] Confirmation modal: "Remove [Name] from archive?"
- [ ] Option to keep or delete their contributions
- [ ] Member no longer sees archive in their dashboard
- [ ] Removed member receives notification email
- [ ] Can re-invite later if needed

**Technical Requirements**:
- DELETE /api/archives/:id/members/:memberId endpoint
- Permission check
- Optionally cascade delete contributions
- Send removal notification email

---

#### **3.5 Accept Invitation**

**As an invited person, I want to easily join the archive**

**Acceptance Criteria**:
- [ ] Click invitation link from email
- [ ] See welcome page: "[Inviter] invited you to '[Archive Name]'"
- [ ] Shows: Subject name, archive description, who else is part of it
- [ ] If not registered:
  - "Create account to join" button → Registration flow
  - After registration, auto-accepts invitation
- [ ] If already registered:
  - "Login to join" button → Login flow
  - After login, auto-accepts invitation
- [ ] Redirect to archive dashboard after acceptance
- [ ] Welcome message: "You're now part of [Archive]! Here's what to do first..."

**Technical Requirements**:
- GET /invitation/:token endpoint (validates token)
- POST /invitation/:token/accept endpoint
- Updates ArchiveMember status: 'invited' → 'active'
- Sets joined_at timestamp
- Creates user-archive association

---

### **Database Schema**

```sql
CREATE TABLE archive_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES family_archives(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),  -- NULL until invitation accepted

    -- Invitation info
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100),
    invitation_token UUID,
    invitation_expires_at TIMESTAMP,

    -- Role & permissions
    role VARCHAR(50) NOT NULL DEFAULT 'contributor',  -- 'owner' | 'admin' | 'contributor' | 'viewer'
    can_contribute BOOLEAN DEFAULT true,
    can_invite_others BOOLEAN DEFAULT false,

    -- Status tracking
    status VARCHAR(50) DEFAULT 'invited',  -- 'active' | 'invited' | 'inactive'
    invited_at TIMESTAMP DEFAULT NOW(),
    joined_at TIMESTAMP,
    last_active_at TIMESTAMP,

    -- Stats
    contribution_count INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_members_archive ON archive_members(archive_id);
CREATE INDEX idx_members_user ON archive_members(user_id);
CREATE INDEX idx_members_token ON archive_members(invitation_token);
```

---

## EPIC 4: Dashboards (Owner + Elderly)

**Priority**: P0 - Must Have
**Timeline**: Week 3
**Effort**: Large (1-2 weeks)
**Dependencies**: Epic 2, 3 (Archive + Members)

### **Epic Description**

Two distinct dashboard experiences tailored to different personas: Owner (admin/coordinator) and Elderly (primary subject, simple UX).

### **User Stories - Owner Dashboard**

#### **4.1 Owner Dashboard - Overview**

**As an archive owner, I want to see everything at a glance, so I can coordinate family efforts**

**Acceptance Criteria**:
- [ ] Top stats cards:
  - Stories captured (number)
  - Family members (active/invited)
  - Hours recorded
  - Themes discovered
- [ ] Recent activity feed (last 10 items):
  - "[Name] added story 'Title'" - 2 hours ago
  - "AI discovered theme 'Cooking'" - 1 day ago
  - "[Name] joined the archive" - 3 days ago
- [ ] Themes section (if any discovered):
  - Theme cards with completeness %
  - Top 3 themes shown
  - "View all themes" link
- [ ] AI Insights section (if any):
  - Connection discovered notifications
  - Gap identified alerts
  - Prompt suggestions
- [ ] Quick actions:
  - "Record Story"
  - "Invite Family Member"
  - "Upload Photo"
  - "Review Stories"

**Technical Requirements**:
- Aggregated stats queries
- Activity feed from contributions, stories, members, themes
- Real-time or periodic refresh
- Responsive grid layout

**UI/UX**:
- Cards with icons and visual hierarchy
- Color-coded stats (green for growth)
- Empty states with guidance
- Mobile-responsive stacked layout

---

#### **4.2 Owner Dashboard - Prompts & Suggestions**

**As an owner, I want to see what AI suggests we should do next**

**Acceptance Criteria**:
- [ ] "AI Suggestions" section shows:
  - Prompts for family members
  - Gaps to fill
  - Themes to explore
- [ ] For each suggestion:
  - Description (what's needed)
  - Assigned to (which family member)
  - Action button: "Send Prompt", "Record", "Explore"
- [ ] Can create custom prompts for family
- [ ] Can dismiss suggestions
- [ ] Shows completion status (% of prompts answered)

**Technical Requirements**:
- AI Insights API
- Prompts API
- Ability to create/edit prompts
- Track prompt responses

---

#### **4.3 Owner Dashboard - Family Activity**

**As an owner, I want to see who's contributing and who's not, so I can encourage participation**

**Acceptance Criteria**:
- [ ] "Family Activity" widget shows:
  - Each member's contribution count
  - Last active date
  - Visual indicator (active vs. inactive)
- [ ] Can filter: All, Active, Inactive, Invited
- [ ] Click member → see their contributions
- [ ] "Encourage" action sends reminder email
- [ ] Sort by: Most active, Least active, Recently joined

**Technical Requirements**:
- Member stats aggregation
- Activity tracking (last_active_at)
- Email reminder functionality

---

### **User Stories - Elderly Dashboard**

#### **4.4 Elderly Dashboard - Simple Recording Interface**

**As an elderly parent, I want a simple interface focused on sharing stories, without complexity**

**Acceptance Criteria**:
- [ ] Large, clear heading: "Welcome back, [Name]!"
- [ ] Primary action (huge button): "🎤 Record a Story"
- [ ] Secondary option: "☎️ Or call: 1-800-XXX-XXXX" (post-MVP)
- [ ] Shows prompts from family:
  - "Your family wants to hear about:"
  - List of 3-5 prompts (e.g., "Your peach pie recipe")
  - Each has "Record Answer" button
- [ ] "Your Stories" section (simplified):
  - Shows story cards with titles and dates
  - Visual: Large text, photos, simple cards
  - Click to review
- [ ] "What Your Family Said About You" section:
  - Quotes from family members' stories that mention them
  - Heartwarming, encouraging
  - "Add Your Perspective" button

**Technical Requirements**:
- Simplified component tree (minimal navigation)
- Large fonts (18px+ base)
- High contrast colors
- Touch-friendly targets (min 44px)
- Minimal cognitive load

**UI/UX Principles**:
- ONE primary action per screen
- Large, readable text (no small fonts)
- Warm, encouraging tone
- Visual progress indicators
- Celebratory feedback ("You've shared 10 stories!")
- No jargon, no complex terms

---

#### **4.5 Elderly Dashboard - Story Review**

**As an elderly parent, I want to see and review my stories**

**Acceptance Criteria**:
- [ ] "Your Stories" shows all their contributions
- [ ] Each story card shows:
  - Large thumbnail (if applicable)
  - Title (auto-generated or custom)
  - Date recorded
  - "❤️ Loved by X family members"
- [ ] Click story → Full story view
- [ ] Can listen to audio recording
- [ ] Can read transcript
- [ ] Can see AI-generated story
- [ ] Can edit title or add notes
- [ ] Shows who else contributed to this theme

**UI/UX**:
- Large, scannable cards
- Audio player with large controls
- Read-aloud option (text-to-speech)
- Simple "Edit" vs. complex forms

---

### **Navigation & Layout**

**Owner Dashboard Tabs**:
1. Overview (default)
2. Stories
3. Family
4. Themes
5. Settings

**Elderly Dashboard Tabs** (simplified):
1. Record (default)
2. My Stories
3. Family

**Responsive Behavior**:
- Mobile: Bottom navigation
- Desktop: Sidebar navigation
- Elderly: Larger touch targets, simplified

---

### **Design System Notes**

**Owner Dashboard Style**:
- Modern, clean, data-rich
- Cards, charts, activity feeds
- Similar to Notion, Linear, modern SaaS

**Elderly Dashboard Style**:
- Warm, simple, encouraging
- Large text, photos, minimal UI
- Similar to GrandPad, Lively, senior-focused apps

---

## EPIC 5: AI-Guided Recording (Solo)

**Priority**: P0 - Must Have
**Timeline**: Week 3-4
**Effort**: Extra Large (2-3 weeks) - **CORE MAGIC**
**Dependencies**: Epic 4 (Dashboards)

### **Epic Description**

Real-time AI conversation system that guides individual users through storytelling, asks follow-up questions, and creates rich, detailed narratives. This is the CORE differentiator.

### **User Stories**

#### **5.1 Start Solo Recording Session**

**As a user, I want to start a guided recording, so AI can help me tell my story**

**Acceptance Criteria**:
- [ ] User clicks "Record Story" button from dashboard
- [ ] Optional: Select topic/prompt
  - "Your family wants to hear about: [Topic]" (if prompt exists)
  - Or "What would you like to share today?" (open-ended)
- [ ] Recording interface opens (modal or full-screen)
- [ ] Shows:
  - Microphone permission request (if needed)
  - AI greeting: "Hi [Name]! I'd love to hear about [Topic]. Ready to start?"
  - Large "Start Recording" button
  - "How this works" explainer (first time only)
- [ ] User clicks "Start Recording"
- [ ] AI begins conversation

**Technical Requirements**:
- Browser MediaRecorder API
- Microphone permission handling
- Conversation session creation
- WebSocket or polling for AI responses

**UI/UX**:
- Calming, encouraging design
- Clear mic permission flow
- Visual feedback (recording indicator)
- Easy escape: "Stop Recording" always visible

---

#### **5.2 Real-Time AI Conversation**

**As a user, I want AI to ask me questions while I record, so I can tell a richer story**

**Acceptance Criteria**:
- [ ] User speaks into microphone
- [ ] Voice-to-text transcription (real-time or chunked)
- [ ] After user pauses (3-5 seconds of silence):
  - AI generates follow-up question
  - AI speaks question (text-to-speech)
  - Question appears as text on screen
- [ ] User responds to follow-up
- [ ] Conversation continues for 5-10 exchanges (or until user says "done")
- [ ] AI questions are contextual and empathetic:
  - "Tell me more about that..."
  - "What was that like?"
  - "Who else was there?"
  - "How did that make you feel?"
- [ ] User can say "I'm done" or "That's all" to end
- [ ] AI confirms: "Thank you! Let me process this..."

**Technical Requirements**:

**Option A - Chunked Approach** (Simpler for MVP):
1. Record 30-second chunks
2. Send audio to Whisper API → transcript
3. Send transcript to GPT-4 → generate follow-up
4. Send follow-up to TTS API → audio response
5. Play audio, show text
6. **Latency**: 3-5 seconds per exchange

**Option B - Streaming Approach** (Better UX, more complex):
1. Use OpenAI Realtime API (voice-to-voice)
2. Streaming audio in/out
3. **Latency**: <1 second
4. **Cost**: Higher API costs

**Recommendation**: Start with Option A (chunked) for MVP, upgrade to Option B post-MVP

**System Prompt for GPT-4**:
```
You are an empathetic interviewer helping families preserve memories.

Current topic: {topic}
Person speaking: {name}, {age}, {relationship}
Conversation so far: {transcript}

Your role:
- Ask ONE short, natural follow-up question
- Focus on details: people, places, emotions, sensory experiences
- Be warm and encouraging
- Don't summarize or interrupt
- Keep questions under 15 words

Examples:
- "Tell me more about that..."
- "What was that like for you?"
- "Who else was there?"
- "What did that smell/taste like?"
- "How did that make you feel?"

Respond with ONLY the follow-up question.
```

**UI/UX**:
- Visual waveform (shows recording activity)
- Transcript appears in real-time
- AI questions highlighted differently
- Clear indication when AI is "thinking" vs. "listening"
- Progress indicator (time recorded, questions asked)

---

#### **5.3 Pause and Resume Recording**

**As a user, I want to pause if I need a break, so I'm not rushed**

**Acceptance Criteria**:
- [ ] "Pause" button always visible
- [ ] Pausing stops recording and AI processing
- [ ] Shows: "Paused - Take your time. Resume when ready."
- [ ] "Resume" button to continue
- [ ] Conversation context maintained across pause/resume
- [ ] No data lost during pause

**Technical Requirements**:
- Pause/resume state management
- Context preservation
- Timer stops during pause

---

#### **5.4 End Recording and Review**

**As a user, I want to review what I said before finalizing**

**Acceptance Criteria**:
- [ ] User clicks "Stop Recording" or says "I'm done"
- [ ] AI confirms: "Thank you for sharing! Let me process this for you..."
- [ ] Processing indicator (estimated 30-60 seconds)
- [ ] Review screen shows:
  - Full transcript (editable)
  - Audio playback with timestamp highlighting
  - AI-extracted story preview
  - Key entities extracted (people, places, dates mentioned)
- [ ] User can:
  - Edit transcript
  - Add notes/context
  - Add title (or accept AI-generated title)
  - Retake recording (start over)
  - Save contribution
- [ ] "Save Story" button
- [ ] Saved story appears in dashboard
- [ ] Success message: "Your story has been saved! Your family will love it."

**Technical Requirements**:
- Transcript editing UI
- Audio player with synchronized transcript
- Story extraction API call (Whisper + GPT-4)
- Entity extraction
- Save contribution to database

---

#### **5.5 Handle Recording Errors**

**As a user, I want clear feedback if something goes wrong**

**Acceptance Criteria**:
- [ ] Microphone permission denied → Clear message with instructions
- [ ] Network error → "Connection lost. Saving what we have..."
- [ ] Audio processing fails → "We couldn't process the audio. Please try again."
- [ ] AI doesn't respond → Timeout after 10 seconds, continue recording
- [ ] Browser not supported → "Please use Chrome, Firefox, or Safari"
- [ ] All errors show helpful next steps

**Technical Requirements**:
- Error boundary components
- Graceful degradation
- Offline support (save locally, sync later - P1)
- Browser compatibility checks

---

### **Technical Implementation Details**

#### **Architecture: Chunked Approach (MVP)**

```
Frontend (React):
┌─────────────────────────────────────────┐
│ RecordingInterface Component            │
│                                          │
│ 1. MediaRecorder API captures audio     │
│ 2. Chunk every 30 seconds                │
│ 3. Send chunk to backend                 │
│ 4. Display AI response                   │
│ 5. Loop until user stops                 │
└─────────────────────────────────────────┘
         ↓ (audio chunk)
Backend (Node.js):
┌─────────────────────────────────────────┐
│ POST /api/recording/process-chunk       │
│                                          │
│ 1. Receive audio blob                   │
│ 2. Send to Whisper API → transcript     │
│ 3. Append to conversation context       │
│ 4. Send context to GPT-4 → follow-up Q  │
│ 5. Send question to TTS → audio         │
│ 6. Return: {transcript, question, audio}│
└─────────────────────────────────────────┘
         ↓ (response)
Frontend:
┌─────────────────────────────────────────┐
│ 1. Display transcript                    │
│ 2. Play AI question audio                │
│ 3. Show question text                    │
│ 4. Continue recording next chunk         │
└─────────────────────────────────────────┘
```

#### **API Endpoints**

```typescript
POST /api/recording/start
// Creates new recording session
// Returns: { sessionId, greeting }

POST /api/recording/chunk
// Processes audio chunk
// Body: { sessionId, audioBlob, chunkNumber }
// Returns: { transcript, followUpQuestion, questionAudio }

POST /api/recording/end
// Finalizes recording
// Body: { sessionId }
// Returns: { fullTranscript, extractedStory, entities }

GET /api/recording/:sessionId
// Get session state (for resume)
```

#### **Database Schema**

```sql
CREATE TABLE recording_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID REFERENCES family_archives(id),
    user_id UUID REFERENCES users(id),

    -- Topic context
    prompt_id UUID REFERENCES prompts(id),  -- If responding to prompt
    topic VARCHAR(255),

    -- Conversation state
    conversation_context JSONB,  -- Full conversation history
    chunks_count INTEGER DEFAULT 0,

    -- Audio storage
    audio_urls TEXT[],  -- Array of S3 URLs for chunks

    -- Status
    status VARCHAR(50) DEFAULT 'active',  -- 'active' | 'paused' | 'completed'

    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP,
    duration_seconds INTEGER
);
```

---

### **Example Conversation Flow**

```
User: [Clicks "Record Story About Thanksgiving"]

AI: "Hi Margaret! I'd love to hear about your Thanksgiving
     traditions. What's your favorite Thanksgiving memory?"

User: "Oh, there was this one year when we didn't have much
       money, but I made do with what we had..."

AI: "That must have been challenging. What did you cook
     that year?"

User: "I made a small turkey, green beans from the garden,
       and my mother's peach pie recipe..."

AI: "Your mother's peach pie sounds special! How did she
     teach you to make it?"

User: "She'd have me help in the kitchen when I was just 8
       years old. We'd pick the peaches together from the
       tree in our backyard in Georgia..."

AI: "What a wonderful memory! Who joined you for that
     Thanksgiving dinner?"

User: "Just my husband and the five kids. It was small but
       so meaningful. We said grace and everyone shared
       what they were thankful for..."

AI: "That sounds beautiful. What do you remember most
     about how the children reacted?"

User: "They didn't care that we didn't have much. They
       were just happy to be together. Sarah, my oldest,
       helped me set the table..."

AI: "Thank you for sharing that beautiful memory, Margaret.
     Is there anything else about that Thanksgiving you'd
     like to add?"

User: "No, I think that's it."

AI: "Wonderful! Let me process this story for you..."

[Processing: 30 seconds]

AI: "Here's what I captured: 'The Thanksgiving with No Money'

     Entities extracted:
     - People: Mother, Husband, Sarah (daughter), 5 children
     - Places: Georgia, backyard
     - Foods: Peach pie, turkey, green beans
     - Emotions: Grateful, content, nostalgic

     Would you like to review and save this story?"
```

---

### **Success Metrics**

- [ ] 80%+ of users complete 5+ minute recordings
- [ ] AI asks average 5-7 follow-up questions per session
- [ ] Users rate conversation as "natural" (4+/5 stars)
- [ ] 90%+ of recordings produce usable stories
- [ ] <5% error rate (technical failures)
- [ ] Average latency <5 seconds per AI response

---

## EPIC 6: Multi-Modal Contributions

**Priority**: P0 - Must Have
**Timeline**: Week 4
**Effort**: Medium (3-5 days)
**Dependencies**: Epic 5 (Recording system)

### **Epic Description**

Allow family members to contribute memories through multiple formats: photos, videos, text stories, and documents (not just audio recordings).

### **User Stories**

#### **6.1 Upload Photos**

**As a family member, I want to upload photos related to stories, so we can visualize memories**

**Acceptance Criteria**:
- [ ] "Upload Photo" button on dashboard
- [ ] Drag-and-drop interface or file picker
- [ ] Supports: JPG, PNG, HEIC (iOS), GIF
- [ ] Multiple file upload (up to 10 at once)
- [ ] Image preview before upload
- [ ] For each photo:
  - Add title/caption
  - Add date (when photo was taken)
  - Tag people in photo (optional)
  - Associate with existing story or theme (optional)
  - Add location (optional)
- [ ] Upload progress indicator
- [ ] Thumbnails generated automatically
- [ ] Photos appear in "Recent Activity" and relevant stories
- [ ] Success message: "3 photos uploaded!"

**Technical Requirements**:
- File upload endpoint (multipart/form-data)
- S3 or Azure Blob storage
- Image processing (thumbnail generation, optimization)
- EXIF data extraction (date, location)
- Max file size: 10MB per photo
- Virus scanning (P1)

---

#### **6.2 Upload Videos**

**As a family member, I want to upload video clips, so we can preserve visual memories**

**Acceptance Criteria**:
- [ ] "Upload Video" option
- [ ] Supports: MP4, MOV, AVI (common formats)
- [ ] Max duration: 10 minutes (MVP)
- [ ] Max file size: 500MB
- [ ] Shows upload progress with estimated time
- [ ] Video processing in background:
  - Thumbnail generation (first frame)
  - Transcoding to web-compatible format (H.264)
  - Optional: Extract audio for transcription (P1)
- [ ] Add title, description, date
- [ ] Associate with story/theme
- [ ] Video player in story view

**Technical Requirements**:
- Video upload endpoint
- Cloud storage with CDN (CloudFront, Cloudflare)
- Video processing (FFmpeg or cloud service)
- Streaming-friendly formats
- Background job queue for processing

---

#### **6.3 Write Text Stories**

**As a family member, I want to write stories directly, for when I prefer typing over recording**

**Acceptance Criteria**:
- [ ] "Write Story" button
- [ ] Rich text editor:
  - Basic formatting: bold, italic, lists
  - No complex features (keep simple)
- [ ] Optional: AI writing assistant
  - "Help me expand this" button
  - AI suggests questions to answer
  - AI improves grammar/clarity (optional)
- [ ] Add title
- [ ] Add timeframe (when story takes place)
- [ ] Tag people, places mentioned
- [ ] Save as draft (auto-save every 30 seconds)
- [ ] Publish when ready
- [ ] Story appears in dashboard like recorded stories

**Technical Requirements**:
- Rich text editor (Tiptap, Quill, or similar)
- Auto-save functionality
- Draft state management
- GPT-4 writing assistance API (optional)

---

#### **6.4 Upload Documents**

**As a family member, I want to upload documents (recipes, letters, certificates), so we preserve artifacts**

**Acceptance Criteria**:
- [ ] "Upload Document" option
- [ ] Supports: PDF, DOC, DOCX, TXT
- [ ] Max file size: 25MB
- [ ] Add title and description
- [ ] Category tag: Recipe, Letter, Certificate, Article, Other
- [ ] PDF preview in browser
- [ ] Extract text from PDF (OCR for scanned docs - P1)
- [ ] Documents searchable by text content (P1)
- [ ] Download option always available

**Technical Requirements**:
- Document upload endpoint
- Secure storage (encrypted at rest)
- PDF rendering library
- OCR service (AWS Textract, Google Cloud Vision - P1)

---

#### **6.5 Contribution Feed**

**As a user, I want to see all types of contributions in one place**

**Acceptance Criteria**:
- [ ] "Contributions" tab shows all content
- [ ] Filter by type: All, Audio, Photos, Videos, Text, Documents
- [ ] Filter by contributor: All, Me, [Family Member Name]
- [ ] Filter by date range
- [ ] Sort by: Newest, Oldest, Most relevant
- [ ] Grid view for photos/videos
- [ ] List view for audio/text
- [ ] Quick actions: View, Edit, Delete, Share

**Technical Requirements**:
- GET /api/archives/:id/contributions endpoint
- Filtering and sorting logic
- Pagination (infinite scroll or pages)
- Responsive grid/list layouts

---

### **Database Schema**

```sql
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES family_archives(id) ON DELETE CASCADE,
    contributor_id UUID NOT NULL REFERENCES archive_members(id),

    -- Content type
    type VARCHAR(50) NOT NULL,  -- 'audio' | 'video' | 'photo' | 'text' | 'document'

    -- Basic info
    title VARCHAR(255),
    description TEXT,

    -- File storage (for non-text)
    file_url TEXT,
    file_type VARCHAR(100),
    file_size INTEGER,
    thumbnail_url TEXT,

    -- Media metadata
    duration_seconds INTEGER,  -- for audio/video
    extracted_text TEXT,  -- for documents/photos (OCR)

    -- Context
    timeframe JSONB,  -- {year: 1960, decade: "1960s"}
    mentioned_people TEXT[],
    mentioned_places TEXT[],
    tags TEXT[],

    -- AI processing
    transcription TEXT,  -- for audio/video
    processing_status VARCHAR(50) DEFAULT 'pending',
    processed_at TIMESTAMP,

    -- Associations
    theme_ids UUID[],  -- Associated themes
    story_id UUID REFERENCES stories(id),  -- If part of extracted story

    contributed_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contributions_archive ON contributions(archive_id);
CREATE INDEX idx_contributions_contributor ON contributions(contributor_id);
CREATE INDEX idx_contributions_type ON contributions(type);
```

---

### **Success Metrics**

- [ ] 40%+ of archives have multi-modal content (not just audio)
- [ ] Average 3+ photo uploads per archive
- [ ] 20%+ of users use text writing feature
- [ ] Upload success rate >95%
- [ ] Average upload time <30 seconds

---

## EPIC 7: Story Extraction & Processing

**Priority**: P0 - Must Have
**Timeline**: Week 4-5
**Effort**: Large (1-2 weeks)
**Dependencies**: Epic 5, 6 (Contributions exist)

### **Epic Description**

AI-powered processing pipeline that transforms raw contributions (audio, video, text) into structured, searchable stories with extracted entities and insights.

### **User Stories**

#### **7.1 Automatic Transcription**

**As a user, I want audio/video automatically transcribed, so I don't have to type**

**Acceptance Criteria**:
- [ ] After audio/video upload or recording completes, processing starts automatically
- [ ] Status shows: "Processing... Transcribing audio"
- [ ] Uses Whisper API (or similar) for transcription
- [ ] Accuracy target: >90% for clear audio
- [ ] Handles accents, elderly speech patterns
- [ ] Transcription stored in database
- [ ] Processing time: <2 minutes for 10-minute recording
- [ ] Errors handled gracefully:
  - Poor audio quality → "Transcription may be inaccurate"
  - Inaudible sections → [inaudible] markers
  - Multiple speakers → timestamps
- [ ] User can edit transcription if needed

**Technical Requirements**:
- Background job queue (Bull/BullMQ + Redis)
- OpenAI Whisper API or Deepgram
- Audio file format conversion (to WAV/MP3)
- Chunking for long recordings (>25MB)
- Error handling and retry logic

---

#### **7.2 Story Extraction**

**As a user, I want AI to turn transcripts into readable stories**

**Acceptance Criteria**:
- [ ] After transcription completes, story extraction begins
- [ ] GPT-4 processes transcript:
  - Generates story title
  - Creates narrative summary (2-3 paragraphs)
  - Preserves speaker's voice/tone
  - Improves readability without changing meaning
  - Identifies key moments/quotes
- [ ] Extracted story includes:
  - Title (editable)
  - Narrative text
  - Key quotes highlighted
  - Original transcript (expandable)
  - Emotional tone (warm, nostalgic, funny, sad)
- [ ] Processing time: <1 minute for typical story
- [ ] User can regenerate story with different style (P1)

**Technical Requirements**:
- GPT-4 API with custom prompt
- Streaming response for faster UX (optional)
- Story generation prompt template
- Database storage for extracted stories

**GPT-4 System Prompt**:
```
You are a compassionate family historian helping preserve memories.

Task: Transform this transcript into a beautiful, readable story.

Transcript: {transcript}
Speaker: {speaker_name}, {age}, {relationship}
Topic: {topic}

Instructions:
1. Create a compelling title (under 10 words)
2. Write a narrative summary (2-4 paragraphs)
3. Preserve the speaker's authentic voice and emotion
4. Improve grammar/clarity but don't change meaning
5. Identify 1-3 key quotes to highlight
6. Determine emotional tone

Format your response as JSON:
{
  "title": "...",
  "narrative": "...",
  "keyQuotes": ["...", "..."],
  "emotionalTone": "warm/nostalgic/funny/sad/proud"
}
```

---

#### **7.3 Entity Extraction**

**As a user, I want AI to identify people, places, and dates mentioned, so stories are searchable**

**Acceptance Criteria**:
- [ ] AI extracts from transcript:
  - **People**: Names, relationships (e.g., "Mother", "Sarah - daughter")
  - **Places**: Cities, countries, addresses, landmarks
  - **Dates**: Years, decades, specific dates, age references
  - **Events**: Weddings, births, holidays, historical events
  - **Objects**: Foods, recipes, heirlooms, specific items
- [ ] Entities shown in story metadata:
  - "People mentioned: Mother, Sarah (daughter), Michael (son)"
  - "Places: Detroit, Georgia"
  - "Timeframe: 1960s, Thanksgiving 1965"
- [ ] Entities are clickable → shows all stories mentioning them
- [ ] Confidence scoring (high/medium/low)
- [ ] User can correct/add entities

**Technical Requirements**:
- GPT-4 with structured output (JSON mode)
- Entity extraction prompt
- Database schema for entities
- Linking entities across stories

**Entity Extraction Prompt**:
```
Extract structured entities from this transcript.

Transcript: {transcript}

Return JSON:
{
  "people": [
    {"name": "Sarah", "relationship": "daughter", "confidence": "high"},
    {"name": "Mother", "relationship": "grandmother", "confidence": "high"}
  ],
  "places": [
    {"name": "Detroit", "type": "city", "confidence": "high"},
    {"name": "Georgia", "type": "state", "confidence": "high"}
  ],
  "dates": [
    {"value": "1965", "type": "year", "event": "Thanksgiving", "confidence": "high"},
    {"value": "1960s", "type": "decade", "confidence": "high"}
  ],
  "events": ["Thanksgiving dinner", "Family gathering"],
  "objects": ["Peach pie", "Green beans", "Turkey"]
}
```

---

#### **7.4 Processing Status & Notifications**

**As a user, I want to know when my contribution is ready**

**Acceptance Criteria**:
- [ ] Contribution card shows processing status:
  - "Uploading..." → Progress bar
  - "Processing..." → Spinner
  - "Ready" → Checkmark
  - "Failed" → Error icon with details
- [ ] Dashboard notification when processing completes:
  - "Your story '[Title]' is ready to review!"
- [ ] Email notification (optional, user preference)
- [ ] If processing fails:
  - Clear error message
  - Retry button
  - Option to contact support

**Technical Requirements**:
- Real-time status updates (WebSocket or polling)
- Job status tracking in database
- Notification system
- Error logging and monitoring

---

#### **7.5 Story Review & Approval**

**As a user, I want to review AI-generated stories before they're finalized**

**Acceptance Criteria**:
- [ ] After processing, story goes to "Pending Review" status
- [ ] Dashboard shows: "X stories awaiting review"
- [ ] Review screen shows:
  - Original transcript
  - Extracted story
  - Entities identified
  - Suggested title
  - Side-by-side comparison
- [ ] User can:
  - Approve as-is
  - Edit story text
  - Edit title
  - Add/remove entities
  - Request regeneration
  - Reject and delete
- [ ] After approval, story status → "Approved"
- [ ] Approved stories visible to all family members
- [ ] Approval notification sent to contributor

**Technical Requirements**:
- Story approval workflow
- Version history (optional)
- Editing interface
- Approval state management

---

### **Processing Pipeline Architecture**

```
Contribution Created (Audio/Video/Text)
           ↓
┌──────────────────────────────────────┐
│ Job Queue: transcription-job         │
│ Priority: High                       │
│ Timeout: 10 minutes                  │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Worker 1: Transcription              │
│ - Send audio to Whisper API          │
│ - Receive transcript                 │
│ - Save to database                   │
│ - Update status: "transcribed"       │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Job Queue: entity-extraction-job     │
│ Priority: High                       │
│ Timeout: 5 minutes                   │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Worker 2: Entity Extraction          │
│ - Send transcript to GPT-4           │
│ - Extract people, places, dates      │
│ - Save entities to database          │
│ - Update status: "entities_extracted"│
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Job Queue: story-generation-job      │
│ Priority: Medium                     │
│ Timeout: 5 minutes                   │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Worker 3: Story Generation           │
│ - Send transcript to GPT-4           │
│ - Generate title & narrative         │
│ - Save story to database             │
│ - Update status: "ready_for_review"  │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Notification: Story ready for review │
└──────────────────────────────────────┘
```

---

### **Database Schema**

```sql
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID NOT NULL REFERENCES family_archives(id) ON DELETE CASCADE,
    contribution_id UUID REFERENCES contributions(id),

    -- Story content
    title VARCHAR(255) NOT NULL,
    narrative TEXT NOT NULL,
    excerpt TEXT,  -- First 200 chars for previews

    -- Metadata
    key_quotes TEXT[],
    emotional_tone VARCHAR(50),  -- 'warm' | 'nostalgic' | 'funny' | 'sad' | 'proud'

    -- Entities (extracted from AI)
    mentioned_people JSONB,  -- [{name, relationship, confidence}]
    mentioned_places JSONB,
    mentioned_dates JSONB,
    mentioned_events TEXT[],
    mentioned_objects TEXT[],

    -- Timeframe
    timeframe JSONB,  -- {year: 1965, decade: "1960s", era: "Post-war"}

    -- Status
    status VARCHAR(50) DEFAULT 'pending_review',  -- 'pending_review' | 'approved' | 'rejected'
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,

    -- Processing
    processing_notes TEXT,  -- Any issues during processing

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stories_archive ON stories(archive_id);
CREATE INDEX idx_stories_contribution ON stories(contribution_id);
CREATE INDEX idx_stories_status ON stories(status);
```

---

### **Success Metrics**

- [ ] 85%+ transcription accuracy (user-rated)
- [ ] 80%+ of generated stories approved without edits
- [ ] Average processing time <3 minutes
- [ ] 95%+ successful processing rate
- [ ] 90%+ entity extraction accuracy

---

## EPIC 8: Story Management

**Priority**: P0 - Must Have
**Timeline**: Week 5
**Effort**: Medium (3-5 days)
**Dependencies**: Epic 7 (Stories exist)

### **Epic Description**

Interface for viewing, organizing, editing, and managing stories extracted from contributions.

### **User Stories**

#### **8.1 View All Stories**

**As a user, I want to browse all stories in the archive**

**Acceptance Criteria**:
- [ ] "Stories" tab shows all approved stories
- [ ] Display options:
  - Grid view (cards with thumbnails)
  - List view (table format)
  - Timeline view (chronological)
- [ ] Each story card shows:
  - Title
  - Excerpt (first 100 chars)
  - Contributor name and photo
  - Date added
  - Emotional tone icon
  - Theme tags (if associated)
  - "❤️ X family loves this"
- [ ] Click card → Full story view
- [ ] Empty state: "No stories yet. Let's create one!"

---

#### **8.2 View Story Details**

**As a user, I want to read the full story with all context**

**Acceptance Criteria**:
- [ ] Full-screen or modal story view
- [ ] Shows:
  - Title
  - Narrative text (formatted, readable)
  - Contributor info (name, photo, relationship)
  - Date recorded
  - Timeframe (when story takes place)
  - Key quotes highlighted
  - Entities mentioned (people, places, dates)
  - Audio/video player (if applicable)
  - Original transcript (expandable)
  - Related stories (if any)
- [ ] Actions:
  - Like/Love (❤️)
  - Comment
  - Share
  - Edit (if contributor or admin)
  - Download
- [ ] Navigation: Previous/Next story

---

#### **8.3 Edit Story**

**As a contributor or admin, I want to edit stories for accuracy**

**Acceptance Criteria**:
- [ ] "Edit" button visible to contributor and admins
- [ ] Edit mode allows:
  - Change title
  - Edit narrative text
  - Add/remove entities
  - Change emotional tone
  - Update timeframe
  - Add custom tags
- [ ] "Save Changes" button
- [ ] Shows edit history: "Last edited by [Name] on [Date]"
- [ ] Original transcript and audio remain unchanged
- [ ] Other family members notified of edits

---

#### **8.4 Delete/Archive Story**

**As an admin, I want to remove inappropriate or duplicate stories**

**Acceptance Criteria**:
- [ ] "Delete" option in story menu (admin only)
- [ ] Confirmation modal: "Delete this story? This cannot be undone."
- [ ] Option to "Archive" instead of delete (soft delete)
- [ ] Deleted stories removed from all views
- [ ] Contributor notified of deletion
- [ ] Admin can view archived stories in settings

---

#### **8.5 Filter and Search Stories**

**As a user, I want to find specific stories quickly**

**Acceptance Criteria**:
- [ ] Search bar: Search by keywords in title/narrative
- [ ] Filters:
  - By contributor
  - By timeframe (decade, year)
  - By theme
  - By emotional tone
  - By people mentioned
  - By date added
- [ ] Sort options:
  - Newest first
  - Oldest first
  - Most loved
  - Alphabetical
- [ ] Clear filters button
- [ ] Results update in real-time

---

### **Database & API**

```typescript
GET /api/archives/:id/stories
// Query params: search, contributor, theme, timeframe, sort

GET /api/stories/:id
// Returns full story with all metadata

PATCH /api/stories/:id
// Update story content (contributor or admin only)

DELETE /api/stories/:id
// Delete or archive story (admin only)

POST /api/stories/:id/love
// Add love reaction

POST /api/stories/:id/comments
// Add comment (P1 feature)
```

---

## EPIC 9: AI-Guided Group Recording

**Priority**: P0 - Must Have
**Timeline**: Week 5
**Effort**: Large (1-2 weeks) - **NEW MAGIC**
**Dependencies**: Epic 5 (Solo recording works)

### **Epic Description**

Enable families to record together (physically gathered or virtually), with AI facilitating conversation between multiple family members.

### **User Stories**

#### **9.1 Start Group Recording**

**As an owner, I want to record with my whole family present, so we capture multiple perspectives**

**Acceptance Criteria**:
- [ ] "Group Recording" option on dashboard
- [ ] Setup screen:
  - "Who's joining this session?" (select family members)
  - "What topic?" (select or custom)
  - Instructions: "Gather everyone around the device"
- [ ] Start button: "Start Family Session"
- [ ] AI greeting: "Hi everyone! I see we have [Names] here today. Let's talk about [Topic]."
- [ ] Recording begins, all speakers recorded

---

#### **9.2 Multi-Speaker Facilitation**

**As a family, we want AI to guide conversation between us, not just interview one person**

**Acceptance Criteria**:
- [ ] AI addresses different family members:
  - "Grandma, tell us about [Topic]"
  - "Sarah, do you remember that?"
  - "Michael, what's your perspective?"
- [ ] AI encourages interaction:
  - "Sarah mentioned [X]. Grandma, what do you think?"
  - "That's interesting! Does anyone else remember?"
- [ ] AI balances participation:
  - Notices if someone hasn't spoken
  - Prompts quiet members gently
- [ ] 10-15 exchanges over 15-20 minute session

**Technical Requirements**:
- GPT-4 system prompt aware of multiple participants
- Context includes list of participants
- AI tracks who has spoken
- Conversational routing logic

**System Prompt Enhancement**:
```
You are facilitating a family storytelling session.

Participants:
- Margaret (grandmother, age 78)
- Sarah (daughter, age 52)
- Michael (son, age 49)
- Emily (granddaughter, age 24)

Topic: Thanksgiving traditions

Your role:
- Ask questions to different family members by name
- Encourage them to respond to each other
- Balance participation (notice who hasn't spoken)
- Create a warm, conversational atmosphere
- Ask ONE person at a time (use their name)

Example:
"Margaret, tell us about your favorite Thanksgiving memory."
[Margaret responds]
"That's wonderful! Sarah, do you remember that Thanksgiving?"
[Sarah responds]
"Michael, what was your favorite part of Grandma's Thanksgivings?"
```

---

#### **9.3 Speaker Identification (Manual Tagging)**

**As a family, we want to know who said what in the recording**

**Acceptance Criteria (MVP - Manual)**:
- [ ] During group recording, one microphone picks up everyone
- [ ] Transcript shows: [Multiple speakers]
- [ ] After recording ends, review screen shows transcript
- [ ] User can manually tag sections:
  - Click text segment
  - Select speaker from dropdown
  - Color-code by speaker
- [ ] Tagged transcript shows:
  - **Margaret**: "We always had Thanksgiving at my house..."
  - **Sarah**: "I remember helping you set the table..."
  - **Michael**: "And I'd help with the turkey..."
- [ ] Saves tagged transcript

**Post-MVP Enhancement**:
- [ ] Automatic speaker diarization (AWS Transcribe, Deepgram)
- [ ] AI guesses who said what based on context

---

#### **9.4 Multi-Perspective Story Generation**

**As a family, we want one story that includes everyone's viewpoints**

**Acceptance Criteria**:
- [ ] After group recording, AI generates:
  - Single unified story
  - Sections for each perspective
  - Woven narrative that includes all voices
- [ ] Story format:
  ```
  Title: "Thanksgiving at Grandma's House"

  Narrative:
  Margaret remembers hosting Thanksgiving for her family of
  five children. "We didn't have much money that year," she
  recalls, "but I made do with what we had."

  Her daughter Sarah adds, "I was young, but I remember Mom
  in the kitchen all day. She let me help set the table."

  Michael, her son, laughs at the memory: "I tried to help
  with the turkey, but I had no idea what I was doing!"

  Emily, the granddaughter, heard these stories growing up:
  "It sounds like such a special time. I wish I could have
  been there."
  ```
- [ ] Each person's quotes attributed correctly
- [ ] Preserves individual voices
- [ ] Creates cohesive narrative

**GPT-4 Prompt for Multi-Perspective**:
```
Create a unified story from this family conversation.

Transcript: {transcript}
Speakers:
- Margaret (grandmother)
- Sarah (daughter)
- Michael (son)
- Emily (granddaughter)

Instructions:
1. Weave their perspectives into one narrative
2. Preserve each person's authentic voice
3. Attribute quotes correctly
4. Create flow between perspectives
5. Highlight connections between their memories
6. Generate a compelling title

Return JSON:
{
  "title": "...",
  "narrative": "...",
  "perspectives": [
    {"speaker": "Margaret", "excerpt": "..."},
    {"speaker": "Sarah", "excerpt": "..."}
  ]
}
```

---

#### **9.5 Family Session History**

**As a user, I want to see past group sessions**

**Acceptance Criteria**:
- [ ] "Group Sessions" section on dashboard
- [ ] Shows:
  - Date of session
  - Topic discussed
  - Who participated
  - Duration
  - Generated story
- [ ] Click session → View full story with all perspectives
- [ ] "Schedule Next Session" button

---

### **Technical Implementation**

**Group Recording Flow**:
```
1. User selects "Group Recording"
2. Select participants from archive members
3. Choose topic
4. Click "Start"
5. AI greets everyone by name
6. Recording begins (single device microphone)
7. AI asks questions, alternating between people
8. Family converses, AI facilitates
9. User clicks "Stop"
10. Processing:
    - Transcription (Whisper)
    - Manual speaker tagging (user assigns)
    - Multi-perspective story generation
11. Story saved with all participants linked
```

---

### **Database Schema Addition**

```sql
-- Add to contributions table
ALTER TABLE contributions ADD COLUMN is_group_session BOOLEAN DEFAULT false;
ALTER TABLE contributions ADD COLUMN participant_ids UUID[];  -- Array of member IDs

-- Story perspectives
CREATE TABLE story_perspectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    speaker_id UUID REFERENCES archive_members(id),

    excerpt TEXT,  -- This person's part of the story
    role VARCHAR(50),  -- 'primary_narrator' | 'supporting' | 'witness'

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### **Success Metrics**

- [ ] 30%+ of archives have at least 1 group recording
- [ ] Average 3-4 participants per group session
- [ ] 75%+ of group recordings produce multi-perspective stories
- [ ] Users rate group sessions as "engaging" (4+/5 stars)
- [ ] Family requests more group sessions

---

## EPIC 10: AI Insights & Connections

**Priority**: P0 - Must Have
**Timeline**: Week 5-6
**Effort**: Large (1-2 weeks) - **AHA MOMENTS**
**Dependencies**: Epic 7, 8 (Stories exist)

### **Epic Description**

Batch AI processing that discovers connections between stories, identifies gaps, and generates insights to guide the family.

### **User Stories**

#### **10.1 Connection Discovery**

**As a family member, I want to see how stories connect, so I understand the bigger picture**

**Acceptance Criteria**:
- [ ] After 2+ stories exist, AI analyzes overnight
- [ ] Dashboard shows "Connections Discovered" notifications
- [ ] Each connection shows:
  - 2+ related stories
  - What connects them (shared person, place, theme)
  - Visual link: "Sarah's story connects to Grandma's story"
  - Snippet from each story
  - "Explore Connection" button
- [ ] Connection detail view:
  - Side-by-side story excerpts
  - Highlighted connecting element
  - Suggested prompt: "Grandma, can you tell us more about [X]?"
- [ ] Connections visible in story detail view

**Example**:
```
🔗 Connection Discovered!

"Grandma's Thanksgiving Story" ←→ "Sarah's Sunday Dinners Memory"

Both mention:
- Peach pie
- Setting the table
- Family gatherings in Detroit

Suggested Action:
"Sarah, do you have photos from those Sunday dinners?"
```

**Technical Requirements**:
- Nightly batch job
- Vector embeddings for semantic similarity (optional MVP)
- GPT-4 connection analysis
- Connection storage in database

---

#### **10.2 Gap Identification**

**As an owner, I want to know what's missing from our archive, so we can fill gaps**

**Acceptance Criteria**:
- [ ] AI identifies gaps:
  - **Mentioned but not detailed**: "Peach pie mentioned 3 times, no recipe shared"
  - **People mentioned but no stories**: "Uncle Jack mentioned, no stories about him"
  - **Time periods missing**: "1960s barely mentioned"
  - **Incomplete themes**: "Cooking theme 60% complete - missing recipes"
- [ ] Dashboard "Gaps" widget shows top 5 gaps
- [ ] Each gap shows:
  - Description of gap
  - Why it matters
  - Who could fill it
  - Suggested action
- [ ] Can dismiss gaps
- [ ] Can create prompt from gap

**Example**:
```
🔍 Gap Identified

Peach Pie Recipe
- Mentioned in 3 stories by Grandma and Sarah
- Recipe details never shared
- This seems important to the family!

Suggested Actions:
→ Prompt Grandma: "Share your peach pie recipe"
→ Prompt Sarah: "Do you have Mom's recipe cards?"
```

---

#### **10.3 Insight Generation**

**As a family, we want AI to surface interesting patterns we might miss**

**Acceptance Criteria**:
- [ ] AI generates insights:
  - **Patterns**: "All 4 family members mention Sunday dinners"
  - **Emotions**: "Grandma's stories are warmest when talking about cooking"
  - **Timeline**: "Most stories focus on 1950s-1970s, few from 1980s+"
  - **Relationships**: "Sarah and Michael remember events differently"
  - **Themes**: "3 emerging themes detected"
- [ ] Insights appear as cards on dashboard
- [ ] Each insight:
  - Title (intriguing question or observation)
  - Explanation (1-2 sentences)
  - Supporting evidence (story snippets)
  - Suggested action
- [ ] Can mark insights as "Interesting" or "Not relevant"
- [ ] AI learns from feedback (P1)

**Example**:
```
💡 Insight: The Power of Food

AI noticed:
Food appears in 8 out of 10 stories! Cooking seems to be
a love language in your family.

Featured in:
- Grandma's peach pie (Thanksgiving story)
- Sarah's Sunday dinners memory
- Michael's favorite meal story

Suggested:
Create a "Family Recipes" collection with stories and photos
```

---

#### **10.4 Timeline Gap Analysis**

**As a family, we want to ensure we're covering Grandma's full life story**

**Acceptance Criteria**:
- [ ] AI analyzes timeline coverage:
  - Childhood (0-18): X stories
  - Young adult (19-30): X stories
  - Middle age (31-60): X stories
  - Later years (61+): X stories
- [ ] Visual timeline shows gaps:
  ```
  1940s ████░░░░ 50% covered
  1950s ████████ 100% covered
  1960s ██░░░░░░ 25% covered
  1970s ██████░░ 75% covered
  ```
- [ ] Identifies missing decades
- [ ] Suggests prompts for gaps:
  - "Tell us about the 1960s"
  - "What happened in your 30s?"
  - "Share stories about your children's early years"

---

#### **10.5 Batch Processing Dashboard**

**As an owner, I want to understand when AI runs and what it's doing**

**Acceptance Criteria**:
- [ ] "AI Analysis" section shows:
  - Last run: "2 hours ago"
  - Next run: "Tonight at 2am"
  - What was analyzed: "5 new contributions"
  - What was found: "2 connections, 1 gap, 3 insights"
- [ ] Can manually trigger analysis: "Analyze Now"
- [ ] Processing status indicator
- [ ] History of past analyses

---

### **Technical Implementation**

**Batch Processing Pipeline**:
```
Nightly Cron Job (2am)
         ↓
┌────────────────────────────────────────┐
│ 1. Load all contributions since last   │
│    analysis (new stories only)         │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Vector Embedding Generation         │
│    - Generate embeddings for each story│
│    - Store in vector database (pgvector│
│      or Pinecone)                      │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. Similarity Search                   │
│    - Find related stories (cosine sim) │
│    - Threshold: >0.7 similarity        │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 4. Connection Analysis (GPT-4)         │
│    - Why do these stories connect?     │
│    - What's the common thread?         │
│    - Create Connection records         │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 5. Gap Analysis (GPT-4)                │
│    - What's mentioned but not detailed?│
│    - What time periods are missing?    │
│    - What people have no stories?      │
│    - Create Gap records                │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 6. Insight Generation (GPT-4)          │
│    - Identify patterns                 │
│    - Detect themes                     │
│    - Analyze emotions                  │
│    - Create AIInsight records          │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 7. Send Notifications                  │
│    - In-app: "New insights discovered!"│
│    - Email: Daily/weekly digest        │
└────────────────────────────────────────┘
```

---

### **GPT-4 Prompts**

**Connection Analysis**:
```
Analyze these stories for connections:

Story 1: {story1_content}
Story 2: {story2_content}

Tasks:
1. Do these stories connect? (yes/no)
2. If yes, what connects them?
   - Shared people?
   - Shared place?
   - Shared theme?
   - Similar timeframe?
3. What's interesting about this connection?
4. What question should we ask the family?

Return JSON:
{
  "connected": true/false,
  "connectionType": "shared_person|shared_place|shared_theme|timeframe",
  "commonElement": "Peach pie",
  "insight": "Both stories mention Grandma's famous peach pie...",
  "suggestedPrompt": "Grandma, can you share the recipe?"
}
```

**Gap Analysis**:
```
Analyze this archive for gaps:

All stories: {story_summaries}
All entities mentioned: {entities}

Tasks:
1. What's mentioned frequently but never detailed?
2. What people are mentioned but have no dedicated stories?
3. What time periods are underrepresented?
4. What themes are incomplete?

Return JSON:
{
  "gaps": [
    {
      "type": "incomplete_topic",
      "description": "Peach pie mentioned 3 times, recipe never shared",
      "severity": "high",
      "whoCanFill": ["Grandma", "Sarah"],
      "suggestedPrompt": "Grandma, share your peach pie recipe"
    }
  ]
}
```

---

### **Database Schema**

```sql
CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID REFERENCES family_archives(id),

    -- Connected stories
    story_ids UUID[],  -- Array of 2+ story IDs

    -- Connection details
    connection_type VARCHAR(50),  -- 'shared_person' | 'shared_place' | 'shared_theme' | 'timeframe'
    common_element VARCHAR(255),  -- e.g., "Peach pie"
    insight TEXT,

    -- Suggested action
    suggested_prompt TEXT,
    prompt_created BOOLEAN DEFAULT false,

    -- User feedback
    status VARCHAR(50) DEFAULT 'active',  -- 'active' | 'dismissed'

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID REFERENCES family_archives(id),

    -- Gap details
    type VARCHAR(50),  -- 'incomplete_topic' | 'missing_person' | 'timeline_gap' | 'incomplete_theme'
    description TEXT,
    severity VARCHAR(20),  -- 'high' | 'medium' | 'low'

    -- Who can fill it
    suggested_contributors UUID[],  -- Member IDs
    suggested_prompt TEXT,

    -- Status
    status VARCHAR(50) DEFAULT 'active',  -- 'active' | 'filled' | 'dismissed'
    filled_by UUID REFERENCES contributions(id),

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    archive_id UUID REFERENCES family_archives(id),

    -- Insight details
    type VARCHAR(50),  -- 'pattern' | 'emotion' | 'timeline' | 'relationship' | 'theme'
    title VARCHAR(255),
    description TEXT,

    -- Supporting evidence
    related_story_ids UUID[],
    evidence_snippets TEXT[],

    -- Suggested action
    suggested_action TEXT,

    -- User engagement
    marked_interesting BOOLEAN DEFAULT false,
    marked_not_relevant BOOLEAN DEFAULT false,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### **Success Metrics**

- [ ] AI finds 2+ connections per 5 stories
- [ ] 60%+ of connections marked as "interesting"
- [ ] 50%+ of gaps result in new contributions
- [ ] 40%+ of insights lead to action
- [ ] Batch processing completes in <10 minutes

---

## Summary of Remaining Epics

Due to length constraints, I'll provide abbreviated versions of the remaining epics:

---

## EPIC 11: Contributor Dashboard (P0, Week 6)
- Personalized view for contributing family members
- Shows prompts assigned to them
- Theme completeness indicators
- Their contribution history
- Connections AI found with their stories

---

## EPIC 12: Theme Discovery (P0, Week 6-7)
- AI clustering of related stories
- Theme naming and description
- Completeness scoring (0-100%)
- Gap identification per theme
- Theme explorer UI

---

## EPIC 13: Prompt Generation System (P0, Week 7)
- Personalized prompts per family member
- Prompt priority (high/medium/low)
- Response tracking
- Custom prompts from owners
- Prompt feed interface

---

## EPIC 14: Theme Management (P0, Week 7-8)
- View all themes
- Explore stories in theme
- Manual theme creation
- Theme merging/splitting
- Export theme as collection

---

## POST-MVP EPICS (Week 9+)

**EPIC 15: Search & Discovery** (P1, Week 9)
**EPIC 16: Notifications & Alerts** (P1, Week 9)
**EPIC 17: Video Group Calls** (P1, Week 9-10)
**EPIC 18: Call Scheduling** (P1, Week 10)
**EPIC 19: Collections & Outputs** (P2, Week 11-12)
**EPIC 20: Settings & Preferences** (P2, Week 12)
**EPIC 21: Viewer Dashboard** (P2, Week 12)

---

## Total Feature Count

**MVP (Week 1-8)**: 14 Epics, ~85 User Stories
**Post-MVP**: 7 Epics, ~40 User Stories
**TOTAL**: 21 Epics, ~125 User Stories

---

## Next Steps

1. ✅ Master Feature List created
2. ⏳ Create detailed roadmap with dependencies
3. ⏳ Build prototypes for core AI features
4. ⏳ Set up development environment
5. ⏳ Begin Week 1-2 implementation

**Ready to start building!** 🚀
