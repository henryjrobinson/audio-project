# Voice Legacy Platform - Architecture V2.0
## Collaborative Family Storytelling System

**Last Updated**: January 2025
**Version**: 2.0 - Major architectural revision for collaborative storytelling

---

## Vision Evolution

### V1.0 (Original)
- Single interviewer → Single subject model
- Adult child manages, elderly parent is interviewed
- One-directional story capture

### V2.0 (Current)
- **Collaborative family storytelling platform**
- Any family member can contribute memories
- AI facilitates and connects stories across family
- Emergent themes drive collection building
- Multi-modal contributions (audio, photo, video, text)

---

## Core Concept

**The AI acts as an intelligent family historian that:**
1. **Listens** to all family members' contributions
2. **Discovers** themes and patterns across stories
3. **Prompts** family to fill gaps and add details
4. **Connects** related memories from different perspectives
5. **Orchestrates** the collaborative creation of family legacy

---

## Use Case Flow

### Happy Path: "Grandma's Story"

**Week 0: Setup**
```
Adult child (Sarah) purchases service
↓
Creates project: "Mom's Life Story"
↓
Invites: Mom (Grandma), siblings, grandchildren
↓
Everyone receives access
```

**Week 1: Initial Contributions**
```
Grandma (via phone): Records story about moving from South to North
  ↓
Real-time Agent: "Why did you decide to move?" "What was that like?"
  ↓
Batch Agent (overnight):
  - Identifies themes: "Migration", "1960s", "Southern Roots"
  - Finds gaps: "What city? What year? Who helped you move?"
  - Generates prompts for family:
    * "Sarah: What do you know about Grandma's move north?"
    * "Uncle Jack: Do you remember this?"
```

**Week 2: Emergent Story Building**
```
Sarah adds: Audio memory "Mom told me she moved for work"
  ↓
Uncle Jack adds: Photos of the old house in Georgia
  ↓
Batch Agent analyzes:
  - Connects Sarah's audio to Grandma's story
  - Links photos to timeline
  - New insights: "Grandma mentioned cooking differently in the North"
  - New prompts:
    * "Grandma: What were your favorite Southern recipes?"
    * "Family: Who has Grandma's recipe cards?"
    * "Suggest: Record Grandma cooking her signature dish"
```

**Week 3: Theme Collections Emerge**
```
Collection: "Grandma's Southern Cooking"
  - Grandma's audio about learning to cook
  - Sarah's memory of Sunday dinners
  - Recipe cards (photos)
  - Video of Grandma making biscuits
  - Written story from cousin about Thanksgiving

AI synthesizes:
  - Multi-perspective narrative
  - Timeline of cooking memories
  - Physical recipe book suggested
  - Gaps identified: "Nobody mentioned her famous pie"
```

---

## Dual-Agent Architecture

### Agent 1: Real-Time Conversation Agent
**Role**: Live conversation facilitator during recording sessions

**Capabilities**:
- Conducts natural, empathetic conversations
- Asks intelligent follow-up questions
- Encourages elaboration and detail
- Detects emotions and adjusts tone
- Helps with narrative structure

**Technology**:
- GPT-4 Turbo or Claude 3.5 Sonnet (streaming)
- Whisper API (real-time transcription)
- ElevenLabs or similar (voice synthesis)
- WebSocket for real-time communication

**Conversation Flow**:
```
User: "Grandma loved to cook"
  ↓
Agent: "What was her specialty? What did she love to make?"
  ↓
User: "She made the best peach pie"
  ↓
Agent: "Tell me about the first time you had her peach pie"
  ↓
User: [tells story]
  ↓
Agent: "Where did she get the peaches? Did she teach anyone the recipe?"
```

### Agent 2: Batch Analysis & Orchestration Agent
**Role**: Overnight analysis and family coordination

**Capabilities**:
- Analyzes all contributions across family
- Identifies themes and patterns
- Finds connections between stories
- Detects gaps and missing details
- Generates personalized prompts for each family member
- Suggests collection items (recipes, photos, etc.)
- Creates synthesized narratives from multiple perspectives

**Technology**:
- GPT-4 or Claude 3 Opus (deep analysis)
- Vector embeddings (semantic similarity)
- Background job queue (Bull + Redis)
- Email/notification system

**Analysis Process**:
```
Input: 10 family contributions from past week
  ↓
1. Transcription & Entity Extraction
   - Who, what, when, where mentioned
   - Key phrases and topics
  ↓
2. Theme Discovery
   - "Cooking" mentioned 7 times across 4 people
   - "Garden" mentioned 3 times
   - "Singing" mentioned by 2 people
  ↓
3. Connection Mapping
   - Sarah's story references Grandma's story
   - Photos align with Uncle Jack's timeline
   - Recipe cards match cooking theme
  ↓
4. Gap Analysis
   - Grandma mentioned "famous pie" but no recipe shared
   - Multiple references to "Uncle Jack's jokes" but no stories
   - Garden mentioned but no photos
  ↓
5. Prompt Generation (personalized per family member)
   To Grandma: "You mentioned your peach pie. Can you share the recipe?"
   To Sarah: "Do you have photos of Grandma's garden?"
   To Grandchildren: "Ask Grandma to sing her favorite song"
  ↓
6. Collection Orchestration
   Create: "Grandma's Southern Cooking" collection
   Needed:
   - ☐ Peach pie recipe
   - ☐ Video of Grandma cooking
   - ☑ Stories about Sunday dinners (3 collected)
   - ☐ Photos of family meals
```

---

## Updated Data Models

### Core Entities

#### 1. FamilyArchive (replaces LegacyProject)
```typescript
interface FamilyArchive {
  id: string;
  name: string;                     // "Mom's Life Story"
  archiveType: 'individual' | 'family' | 'topic';
  primarySubject?: {                // If individual archive
    userId?: string;                // Grandma's user account
    name: string;                   // "Margaret Thompson"
    relationship: string;           // "Mother", "Grandmother"
    birthDate?: Date;
    photo?: string;
  };
  status: 'active' | 'paused' | 'completed' | 'archived';

  // Access control
  ownerId: string;                  // Adult child who purchased
  adminIds: string[];               // Can manage members

  // Legacy management (future feature)
  legacyPlan?: {
    transferToOnDeath: string[];    // UserIds who inherit control
    autoArchiveOn?: Date;
    accessRules: object;
  };

  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. ArchiveMember (replaces ProjectMember)
```typescript
interface ArchiveMember {
  id: string;
  archiveId: string;
  userId?: string;                  // null if not yet registered
  email: string;
  name: string;
  relationship: string;             // "Daughter", "Son", "Grandson", "Subject"
  role: 'owner' | 'admin' | 'contributor' | 'viewer';

  // Participation tracking
  contributionCount: number;
  lastContributedAt?: Date;

  // Permissions
  canContribute: boolean;
  canViewAll: boolean;              // Or restricted to certain stories
  canInviteOthers: boolean;

  status: 'active' | 'invited' | 'pending';
  invitedAt: Date;
  joinedAt?: Date;
}
```

#### 3. Contribution (replaces/augments Conversation)
```typescript
interface Contribution {
  id: string;
  archiveId: string;
  contributorId: string;            // Who added this
  contributorName: string;          // For display

  // Content
  type: 'audio' | 'video' | 'photo' | 'document' | 'text' | 'recipe';
  title: string;                    // "Grandma talks about moving North"
  description?: string;

  // Files
  files: {
    url: string;
    type: string;
    size: number;
    thumbnail?: string;
  }[];

  // AI processing
  transcription?: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';

  // Relationships
  relatedThemes: string[];          // ThemeIds - AI detected
  respondsTo?: string;              // ContributionId - if building on another story
  mentionedPeople: string[];        // Entity extraction
  mentionedPlaces: string[];
  timeframe?: {                     // When story takes place
    year?: number;
    decade?: string;
    era?: string;
  };

  // Metadata
  emotionalMoments: number;
  duration?: number;                // For audio/video

  contributedAt: Date;
  processedAt?: Date;
}
```

#### 4. Theme (NEW)
```typescript
interface Theme {
  id: string;
  archiveId: string;
  name: string;                     // "Grandma's Southern Cooking"
  slug: string;                     // "grandmas-southern-cooking"
  description: string;              // AI-generated summary

  // Discovery
  discoveredFrom: string[];         // ContributionIds that created this theme
  confidence: number;               // 0-1, how strong the theme is

  // Structure
  parentThemeId?: string;           // For hierarchical themes
  relatedThemes: string[];          // Connected themes

  // Content
  contributionIds: string[];        // All contributions tagged with theme
  storyIds: string[];               // Synthesized stories

  // Completeness tracking
  completeness: number;             // 0-100%
  suggestedGaps: string[];          // What's missing

  // Collection metadata
  coverImage?: string;
  timeline?: {
    start?: Date;
    end?: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}
```

#### 5. AIInsight (NEW)
```typescript
interface AIInsight {
  id: string;
  archiveId: string;
  type: 'theme_discovered' | 'gap_identified' | 'connection_made' |
        'prompt_suggestion' | 'collection_opportunity';

  // Content
  title: string;                    // "New theme discovered: Grandma's Cooking"
  description: string;              // Details
  confidence: number;               // 0-1

  // Context
  sourceContributions: string[];   // What triggered this insight
  relatedThemes: string[];

  // Actions
  suggestedActions: {
    type: 'record_audio' | 'upload_photo' | 'write_story' | 'find_document';
    description: string;
    targetMember?: string;          // Who should do this
    priority: 'high' | 'medium' | 'low';
  }[];

  // Engagement
  status: 'new' | 'acknowledged' | 'acted_on' | 'dismissed';
  acknowledgedBy: string[];         // UserIds who've seen it

  createdAt: Date;
  expiresAt?: Date;                 // Some insights are time-sensitive
}
```

#### 6. Story (Enhanced)
```typescript
interface Story {
  id: string;
  archiveId: string;
  themeId?: string;                 // Optional theme association

  // Content
  title: string;
  excerpt: string;
  fullContent: string;

  // Multi-perspective support
  perspectives: {
    contributionId: string;
    contributorId: string;
    contributorName: string;
    role: 'primary_narrator' | 'supporting' | 'witness';
    excerpt: string;                // Their part of the story
  }[];

  // Synthesis
  isSynthesized: boolean;           // Multiple perspectives combined?
  synthesisMethod?: 'manual' | 'ai_assisted' | 'ai_generated';

  // Classification
  tags: string[];
  emotionalMoments: number;

  // Media
  audioClipUrl?: string;
  relatedPhotos: string[];
  relatedVideos: string[];
  relatedDocuments: string[];

  // Timeline
  timeframe?: {
    year?: number;
    decade?: string;
    era?: string;
  };

  // Status
  status: 'draft' | 'pending_review' | 'approved' | 'published';
  approvedBy?: string;
  approvedAt?: Date;

  // Metadata
  duration: string;                 // Read time
  conversationDate: Date;           // When captured
  createdAt: Date;
  updatedAt: Date;
}
```

#### 7. Collection (NEW)
```typescript
interface Collection {
  id: string;
  archiveId: string;
  themeId?: string;                 // Optional theme link

  // Identity
  name: string;                     // "Grandma's Recipe Book"
  description: string;
  type: 'recipe_book' | 'photo_album' | 'story_book' | 'timeline' |
        'video_montage' | 'custom';

  // Contents
  items: {
    type: 'story' | 'contribution' | 'media';
    id: string;
    order: number;
    notes?: string;
  }[];

  // Progress
  status: 'planning' | 'collecting' | 'ready' | 'generated' | 'delivered';
  completeness: number;             // 0-100%
  neededItems: string[];            // What's still missing

  // Output
  coverImage?: string;
  outputFormat?: 'pdf' | 'physical_book' | 'video' | 'website';
  generatedUrl?: string;            // Final product

  // Collaboration
  contributors: string[];           // UserIds who added to this
  curators: string[];               // Who's organizing this

  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
}
```

#### 8. Prompt (NEW)
```typescript
interface Prompt {
  id: string;
  archiveId: string;
  targetMemberId: string;           // Who should see this

  // Content
  question: string;                 // "Tell us about Grandma's peach pie"
  context: string;                  // Why we're asking
  type: 'follow_up' | 'gap_fill' | 'new_topic' | 'clarification';

  // Generation source
  generatedBy: 'ai' | 'family_member';
  sourceInsightId?: string;
  relatedContributions: string[];
  relatedThemes: string[];

  // Priority
  priority: 'high' | 'medium' | 'low';
  urgency?: string;                 // "Before next family gathering"

  // Status
  status: 'active' | 'answered' | 'skipped' | 'expired';
  answeredBy?: string;              // ContributionId
  answeredAt?: Date;

  createdAt: Date;
  expiresAt?: Date;
}
```

---

## Database Relationships V2

```
User (1) ──────────────── (M) ArchiveMember
FamilyArchive (1) ───────── (M) ArchiveMember
FamilyArchive (1) ───────── (M) Contribution
FamilyArchive (1) ───────── (M) Theme
FamilyArchive (1) ───────── (M) AIInsight
FamilyArchive (1) ───────── (M) Story
FamilyArchive (1) ───────── (M) Collection
FamilyArchive (1) ───────── (M) Prompt

Theme (1) ──────────────── (M) Contribution (many-to-many)
Theme (1) ──────────────── (M) Story
Theme (1) ──────────────── (1) Collection (optional)

Contribution (1) ────────── (M) Story (one contribution can spawn multiple stories)
Contribution (1) ────────── (M) AIInsight

Collection (M) ─────────── (M) Story/Contribution (many-to-many)

Prompt (1) ────────────────> ArchiveMember (target)
Prompt (1) ────────────────> Contribution (answered_by)
```

---

## Updated API Endpoints

### Archives (replaces Projects)
```
GET    /archives                           - List user's archives
POST   /archives                           - Create new archive
GET    /archives/:id                       - Get archive details
PATCH  /archives/:id                       - Update archive
DELETE /archives/:id                       - Delete archive
GET    /archives/:id/stats                 - Get statistics
GET    /archives/:id/timeline              - Get chronological timeline
```

### Members
```
GET    /archives/:id/members               - List archive members
POST   /archives/:id/members/invite        - Invite family member
PATCH  /archives/:id/members/:memberId     - Update member role/permissions
DELETE /archives/:id/members/:memberId     - Remove member
GET    /archives/:id/members/:memberId/contributions - Member's contributions
```

### Contributions (replaces Conversations)
```
GET    /archives/:id/contributions                     - List all contributions
POST   /archives/:id/contributions                     - Add new contribution
GET    /archives/:id/contributions/:contributionId     - Get details
PATCH  /archives/:id/contributions/:contributionId     - Update
DELETE /archives/:id/contributions/:contributionId     - Delete
POST   /archives/:id/contributions/:contributionId/process - Trigger AI processing
GET    /archives/:id/contributions/by-theme/:themeId   - Filter by theme
GET    /archives/:id/contributions/by-member/:memberId - Filter by contributor
```

### Themes (NEW)
```
GET    /archives/:id/themes                - List all discovered themes
GET    /archives/:id/themes/:themeId       - Get theme details
PATCH  /archives/:id/themes/:themeId       - Edit theme (name, description)
DELETE /archives/:id/themes/:themeId       - Delete theme
GET    /archives/:id/themes/:themeId/contributions - Get all contributions for theme
GET    /archives/:id/themes/:themeId/stories       - Get synthesized stories
POST   /archives/:id/themes/:themeId/merge         - Merge with another theme
```

### AI Insights (NEW)
```
GET    /archives/:id/insights                      - Get recent insights
GET    /archives/:id/insights/:insightId           - Get insight details
POST   /archives/:id/insights/:insightId/acknowledge - Mark as seen
POST   /archives/:id/insights/:insightId/dismiss   - Dismiss insight
POST   /archives/:id/insights/:insightId/act       - Log action taken
```

### Prompts (NEW)
```
GET    /archives/:id/prompts                   - Get all active prompts
GET    /archives/:id/prompts/for-me            - Get prompts for current user
POST   /archives/:id/prompts                   - Create custom prompt
PATCH  /archives/:id/prompts/:promptId         - Update prompt
POST   /archives/:id/prompts/:promptId/answer  - Link contribution as answer
POST   /archives/:id/prompts/:promptId/skip    - Skip this prompt
```

### Stories
```
GET    /archives/:id/stories                       - List all stories
GET    /archives/:id/stories/:storyId              - Get story details
PATCH  /archives/:id/stories/:storyId              - Edit story
POST   /archives/:id/stories/:storyId/approve      - Approve story
POST   /archives/:id/stories/:storyId/synthesize   - Request AI synthesis
GET    /archives/:id/stories/by-theme/:themeId     - Filter by theme
GET    /archives/:id/stories/by-timeframe          - Filter by time period
```

### Collections (NEW)
```
GET    /archives/:id/collections                   - List all collections
POST   /archives/:id/collections                   - Create new collection
GET    /archives/:id/collections/:collectionId     - Get collection details
PATCH  /archives/:id/collections/:collectionId     - Update collection
DELETE /archives/:id/collections/:collectionId     - Delete collection
POST   /archives/:id/collections/:collectionId/items - Add item to collection
DELETE /archives/:id/collections/:collectionId/items/:itemId - Remove item
POST   /archives/:id/collections/:collectionId/generate - Generate final product
GET    /archives/:id/collections/:collectionId/preview  - Preview output
```

### Real-Time Conversation (NEW)
```
WebSocket: /conversation/:sessionId
  - Client sends audio chunks
  - Server returns real-time transcription
  - AI sends follow-up questions
  - Session saved as Contribution when complete

POST   /conversation/start                 - Start new conversation session
POST   /conversation/:sessionId/end        - End session, save contribution
GET    /conversation/:sessionId/transcript - Get live transcript
```

### AI Processing (Background)
```
POST   /ai/analyze-archive/:archiveId      - Trigger full re-analysis
POST   /ai/discover-themes/:archiveId      - Theme discovery
POST   /ai/generate-prompts/:archiveId     - Generate family prompts
POST   /ai/synthesize-story                - Combine multiple perspectives
POST   /ai/generate-collection/:collectionId - Create final product
```

---

## AI Processing Pipelines

### Pipeline 1: Real-Time Conversation
```
User starts recording
  ↓
WebSocket connection established
  ↓
Audio streamed in chunks
  ↓
Whisper API (streaming): Audio → Text
  ↓
GPT-4 Turbo: Generate follow-up question
  ↓
ElevenLabs: Text → Voice
  ↓
Stream back to user
  ↓
Loop continues until user ends
  ↓
Save complete conversation as Contribution
  ↓
Trigger Batch Analysis Pipeline
```

**Technology Stack**:
- WebSocket (Socket.io)
- Streaming audio processing
- Real-time AI inference
- Low-latency voice synthesis

### Pipeline 2: Batch Analysis (Overnight)
```
Trigger: New contribution added OR Daily cron
  ↓
1. Individual Contribution Analysis
   - Transcribe (if not already done)
   - Entity extraction (people, places, dates)
   - Emotion detection
   - Topic identification
  ↓
2. Cross-Archive Analysis
   - Load all contributions
   - Vector similarity search
   - Identify patterns and themes
  ↓
3. Theme Discovery/Update
   - Cluster similar topics
   - Create or update Theme records
   - Calculate completeness scores
  ↓
4. Gap Analysis
   - What's mentioned but not elaborated?
   - Who hasn't contributed?
   - What time periods are missing?
  ↓
5. Connection Mapping
   - Which stories reference each other?
   - What perspectives are related?
   - Build relationship graph
  ↓
6. Prompt Generation
   - Create personalized prompts per member
   - Prioritize based on gaps and engagement
   - Set urgency and expiration
  ↓
7. Insight Creation
   - Generate AIInsight records
   - Send notifications to family
  ↓
8. Collection Suggestions
   - Identify when theme is "collection-ready"
   - Suggest recipe books, photo albums, etc.
```

**Technology Stack**:
- Bull Queue (Redis-based)
- GPT-4 or Claude Opus (deep analysis)
- Vector database (Pinecone or pgvector)
- Email/notification service

### Pipeline 3: Story Synthesis
```
Trigger: Admin requests synthesis of theme
  ↓
1. Gather all contributions for theme
  ↓
2. Extract key facts and timeline
  ↓
3. Identify unique perspectives
  ↓
4. Generate unified narrative
   - Preserve each person's voice
   - Create cohesive flow
   - Maintain factual accuracy
  ↓
5. Create Story record with perspectives
  ↓
6. Suggest additional media (photos, videos)
  ↓
7. Present for human review/approval
```

---

## Key Features by Phase

### Phase 1: MVP (Weeks 1-6)
**Goal**: Validate collaborative storytelling concept

**Features**:
- ✅ Multi-member archives
- ✅ Manual audio upload (no AI calling yet)
- ✅ Basic transcription (Whisper)
- ✅ Simple theme detection
- ✅ Basic prompts to family
- ✅ Story approval workflow
- ✅ Family dashboard

**What's NOT included**:
- ❌ Real-time AI conversation
- ❌ Automatic theme discovery
- ❌ Collection generation
- ❌ Video support

### Phase 2: Enhanced AI (Weeks 7-12)
**Goal**: Add intelligent orchestration

**Features**:
- ✅ Twilio phone integration
- ✅ Scheduled calls to family
- ✅ Batch theme discovery
- ✅ AI-generated prompts
- ✅ Gap analysis
- ✅ Multi-perspective stories
- ✅ Photo/video upload
- ✅ Email notifications

### Phase 3: Real-Time Agent (Weeks 13-18)
**Goal**: Live AI conversation facilitator

**Features**:
- ✅ Real-time conversation agent
- ✅ Streaming transcription
- ✅ Live follow-up questions
- ✅ Emotion detection during call
- ✅ Adaptive conversation flow
- ✅ Voice synthesis for AI

### Phase 4: Collections & Artifacts (Weeks 19-24)
**Goal**: Create beautiful outputs

**Features**:
- ✅ Recipe book generation
- ✅ Photo album creation
- ✅ Video montage assembly
- ✅ Timeline visualization
- ✅ Physical book printing
- ✅ Custom collection types
- ✅ AI-generated artifacts

---

## Example: Theme Discovery Algorithm

```python
def discover_themes(archive_id):
    """
    Analyzes all contributions in an archive and discovers themes
    """
    # 1. Load all contributions
    contributions = get_contributions(archive_id)

    # 2. Extract topics from each
    topics = []
    for contribution in contributions:
        topics.extend(extract_topics(contribution.transcription))

    # 3. Cluster similar topics
    clusters = cluster_topics(topics)

    # 4. For each cluster, create or update theme
    for cluster in clusters:
        theme = {
            'name': generate_theme_name(cluster),
            'description': generate_theme_description(cluster),
            'confidence': calculate_confidence(cluster),
            'contributionIds': get_contribution_ids(cluster),
            'discoveredFrom': get_source_contributions(cluster)
        }

        # 5. Check if theme already exists
        existing = find_similar_theme(archive_id, theme.name)
        if existing:
            update_theme(existing.id, theme)
        else:
            create_theme(archive_id, theme)

    # 6. Analyze completeness
    for theme in get_themes(archive_id):
        analyze_theme_completeness(theme)

    # 7. Generate prompts for gaps
    generate_prompts_for_gaps(archive_id)
```

---

## Example: Prompt Generation Algorithm

```python
def generate_prompts(archive_id):
    """
    Creates personalized prompts for each family member
    """
    themes = get_themes(archive_id)
    members = get_members(archive_id)

    prompts = []

    for theme in themes:
        # Find gaps in this theme
        gaps = analyze_gaps(theme)

        for gap in gaps:
            # Who's best suited to fill this gap?
            target_member = determine_best_contributor(gap, members)

            # Generate personalized question
            question = generate_question(gap, target_member, theme)

            prompts.append({
                'archiveId': archive_id,
                'targetMemberId': target_member.id,
                'question': question,
                'context': explain_why_asking(gap, theme),
                'relatedThemes': [theme.id],
                'priority': calculate_priority(gap),
                'type': 'gap_fill'
            })

    # Save prompts
    for prompt in prompts:
        create_prompt(prompt)

    # Send notifications
    send_prompt_notifications(prompts)
```

---

## Access Control & Privacy

### Member Roles

**Owner** (Adult child who purchased)
- Full administrative control
- Can delete archive
- Manages billing
- Can transfer ownership

**Admin**
- Invite/remove members
- Approve stories
- Manage themes and collections
- Cannot delete archive

**Contributor**
- Add contributions (audio, photos, etc.)
- View all content
- Comment on stories
- Answer prompts

**Viewer**
- View approved stories only
- Cannot contribute
- Read-only access

### Privacy Levels

**Contribution-level privacy**:
```typescript
Contribution {
  privacy: 'public' | 'family_only' | 'private' | 'admin_only' | 'posthumous'
  // 'posthumous' = Don't share until after subject dies
}
```

**Story-level privacy**:
```typescript
Story {
  visibility: 'all' | 'contributors' | 'admin_approved' | 'scheduled'
  revealDate?: Date  // For "don't open until..." feature
}
```

### Legacy Management (Future Feature)

```typescript
LegacyPlan {
  // Transfer ownership on death
  transferTo: UserId[]

  // Auto-archive after inactivity
  autoArchiveAfter: Duration

  // Post-mortem access rules
  posthumousAccess: {
    memberId: UserId
    canView: boolean
    canEdit: boolean
    canDownload: boolean
  }[]

  // Content scheduling
  scheduledReleases: {
    storyId: string
    releaseDate: Date
    notifyMembers: UserId[]
  }[]
}
```

---

## Migration Path from V1 to V2

### Database Migration

```sql
-- Rename tables
ALTER TABLE legacy_projects RENAME TO family_archives;
ALTER TABLE project_members RENAME TO archive_members;
ALTER TABLE conversations RENAME TO contributions;

-- Add new fields to family_archives
ALTER TABLE family_archives
  ADD COLUMN archive_type VARCHAR(20) DEFAULT 'individual',
  ADD COLUMN primary_subject_name VARCHAR(255),
  ADD COLUMN primary_subject_relationship VARCHAR(100);

-- Add new fields to contributions
ALTER TABLE contributions
  ADD COLUMN contributor_name VARCHAR(255),
  ADD COLUMN type VARCHAR(20) DEFAULT 'audio',
  ADD COLUMN related_themes TEXT[],
  ADD COLUMN responds_to UUID,
  ADD COLUMN mentioned_people TEXT[],
  ADD COLUMN mentioned_places TEXT[];

-- Create new tables
CREATE TABLE themes (...);
CREATE TABLE ai_insights (...);
CREATE TABLE prompts (...);
CREATE TABLE collections (...);
```

### API Migration

**Breaking changes**:
- `/projects` → `/archives`
- `/projects/:id/conversations` → `/archives/:id/contributions`
- New required field: `contributorId` on contributions

**New endpoints** (non-breaking):
- `/archives/:id/themes`
- `/archives/:id/insights`
- `/archives/:id/prompts`
- `/archives/:id/collections`

---

## Technology Stack Updates

### New Technologies Required

**Real-Time Conversation**:
- WebSocket server (Socket.io)
- Streaming audio processing
- Twilio Voice API
- Real-time AI inference (GPT-4 Turbo with streaming)
- Voice synthesis (ElevenLabs or Azure TTS)

**Batch Processing**:
- Redis (job queue)
- Bull (task scheduler)
- Vector database (Pinecone or pgvector in Postgres)

**Notifications**:
- SendGrid or AWS SES (email)
- Push notifications (future: FCM)
- SMS (Twilio)

### Infrastructure Additions

**Scaling Considerations**:
- Separate servers for real-time vs batch processing
- CDN for media files (Cloudflare)
- Media processing pipeline (ffmpeg for audio/video)
- Increased storage for multi-modal content

---

## Next Steps for Implementation

### Immediate (Week 1-2)
1. ✅ Update data models in Prisma schema
2. ✅ Migrate existing tables
3. ✅ Update API endpoints (rename projects → archives)
4. ✅ Add contribution upload flow (multi-type support)
5. ✅ Basic theme tagging (manual first, AI later)

### Short-term (Week 3-6)
1. Build batch analysis pipeline
2. Implement theme discovery algorithm
3. Add prompt generation system
4. Email notification service
5. Enhanced dashboard with themes view

### Medium-term (Week 7-12)
1. Twilio integration for scheduled calls
2. Multi-perspective story synthesis
3. Collection creation workflow
4. Photo/video upload and processing
5. Timeline visualization

### Long-term (Week 13+)
1. Real-time conversation agent (WebSocket)
2. Streaming transcription and AI responses
3. Voice synthesis for AI agent
4. Physical product generation
5. Advanced analytics and insights

---

## Success Metrics V2

### Engagement Metrics
- **Contribution rate**: 70%+ of invited members contribute
- **Multi-perspective stories**: 40%+ of themes have 3+ contributors
- **Prompt response rate**: 50%+ of AI prompts result in contributions
- **Return rate**: 60%+ of users return weekly

### AI Quality Metrics
- **Theme accuracy**: 80%+ of discovered themes validated by users
- **Prompt relevance**: 70%+ of prompts marked as "helpful"
- **Story synthesis quality**: 85%+ approval rate on synthesized stories
- **Gap detection**: 75%+ of identified gaps confirmed as useful

### Product Metrics
- **Time to first collection**: < 4 weeks from signup
- **Collections per archive**: Average 2-3 collections created
- **Archive completion**: 60%+ of archives reach "collection-ready" state
- **NPS**: > 70 from all family members (not just purchaser)

---

## Key Questions Still to Resolve

1. **Pricing model**: Per-archive? Per-member? Per-collection output?
2. **Storage limits**: How much media can each archive contain?
3. **AI costs**: Need to estimate OpenAI costs for dual-agent system
4. **Real-time latency**: Can we achieve <500ms response time for conversation agent?
5. **Legacy transfer**: Legal requirements for post-mortem content control?

---

**This architecture supports the full vision of collaborative family storytelling while maintaining a clear path from simple MVP to sophisticated AI orchestration system.**