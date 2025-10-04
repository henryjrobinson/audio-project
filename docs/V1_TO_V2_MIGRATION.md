# Migration Guide: V1 → V2 Architecture

## Executive Summary

**V1**: Single-subject interview platform (adult child interviews elderly parent)
**V2**: Collaborative family storytelling platform (entire family contributes, AI orchestrates)

This represents a **significant product pivot** that fundamentally changes:
- Who the users are (one purchaser → entire family)
- What they do (passive subject → active contributors)
- How AI is used (process recordings → orchestrate family collaboration)

---

## Key Architectural Changes

### 1. Data Model Changes

| V1 Concept | V2 Concept | Change Impact |
|-----------|-----------|---------------|
| `LegacyProject` | `FamilyArchive` | **BREAKING** - Rename + new fields |
| `ProjectMember` | `ArchiveMember` | **BREAKING** - Rename + new permissions |
| `Conversation` | `Contribution` | **MAJOR** - Expanded to multi-type (audio/photo/video/text) |
| `Story` | `Story` (enhanced) | **ADDITIVE** - Multi-perspective support |
| ❌ N/A | `Theme` | **NEW** - Core feature |
| ❌ N/A | `AIInsight` | **NEW** - Core feature |
| ❌ N/A | `Prompt` | **NEW** - Core feature |
| ❌ N/A | `Collection` | **NEW** - Core feature |

### 2. API Changes

#### Breaking Changes
```
/projects → /archives
/projects/:id/conversations → /archives/:id/contributions
/projects/:id/members → /archives/:id/members
```

#### New Endpoints (25+ new routes)
```
/archives/:id/themes/*
/archives/:id/insights/*
/archives/:id/prompts/*
/archives/:id/collections/*
/conversation/*  (WebSocket for real-time)
```

### 3. User Flow Changes

**V1 Flow**:
```
Adult child → Schedules call → AI interviews parent → Stories extracted → Review
```

**V2 Flow**:
```
Adult child → Invites family → Everyone contributes → AI discovers themes →
AI prompts for gaps → Family responds → Collections emerge → Multiple outputs
```

---

## What Stays the Same

✅ **User authentication** - No changes
✅ **Story data model core** - Title, content, tags, approval
✅ **File storage** - S3 for audio/media
✅ **Transcription** - Whisper API
✅ **Story extraction** - GPT-4
✅ **Family invitation** - Email-based invites

---

## What Changes Significantly

### 🔴 Critical Changes

**1. Multi-User Contributions**
- **V1**: One subject (Grandma) is interviewed
- **V2**: Everyone contributes (Grandma, kids, grandkids, siblings)
- **Impact**: Need permissions, attribution, contribution tracking

**2. Content Types**
- **V1**: Audio only (phone conversations)
- **V2**: Audio, video, photos, text, documents, recipes
- **Impact**: File handling, processing pipelines, storage costs

**3. AI Role**
- **V1**: Process audio → extract stories
- **V2**: Orchestrate family + discover themes + prompt for gaps + synthesize perspectives
- **Impact**: 10x more complex AI logic, needs batch processing system

**4. Themes Discovery**
- **V1**: Manual tagging of stories
- **V2**: AI automatically discovers themes from all contributions
- **Impact**: New ML pipeline, vector similarity, clustering algorithms

**5. Prompts System**
- **V1**: Fixed question list
- **V2**: AI generates personalized prompts per family member based on gaps
- **Impact**: New notification system, personalization engine

### ⚠️ Major Changes

**6. Collections**
- **V1**: One output (book)
- **V2**: Multiple collection types (recipe book, photo album, timeline, etc.)
- **Impact**: Flexible output generation system

**7. Real-Time Conversation**
- **V1**: Upload recorded audio
- **V2**: Live AI conversation via phone/web
- **Impact**: WebSocket server, streaming audio, Twilio integration

**8. Dual-Agent System**
- **V1**: Single batch processing
- **V2**: Real-time agent + batch orchestration agent
- **Impact**: 2 separate AI systems, complex coordination

---

## Migration Strategy

### Phase 0: Preparation (Week 0)
- [ ] Freeze V1 features
- [ ] Backup production database
- [ ] Create migration scripts
- [ ] Test migration on staging

### Phase 1: Database Migration (Week 1)
```sql
-- Step 1: Rename tables (non-destructive)
ALTER TABLE legacy_projects RENAME TO family_archives;
ALTER TABLE project_members RENAME TO archive_members;
ALTER TABLE conversations RENAME TO contributions;

-- Step 2: Add new columns
ALTER TABLE family_archives ADD COLUMN archive_type VARCHAR(20) DEFAULT 'individual';
-- ... (see ARCHITECTURE_V2.md for full schema)

-- Step 3: Create new tables
CREATE TABLE themes (...);
CREATE TABLE ai_insights (...);
CREATE TABLE prompts (...);
CREATE TABLE collections (...);

-- Step 4: Migrate existing data
UPDATE family_archives SET archive_type = 'individual';
UPDATE contributions SET type = 'audio', contributor_id = created_by_id;
```

### Phase 2: API Compatibility Layer (Week 2)
```typescript
// Create backward-compatible endpoints
app.get('/projects', (req, res) => {
  // Internally calls /archives but returns V1 format
  const archives = await getArchives(req.user.id);
  return res.json(convertToV1Format(archives));
});

// Add V2 endpoints alongside
app.get('/archives', getArchives);  // New V2 endpoint
```

### Phase 3: Frontend Migration (Week 3-4)
- [ ] Update API client to use `/archives` endpoints
- [ ] Add multi-contributor UI
- [ ] Add theme discovery view
- [ ] Add prompts dashboard
- [ ] Maintain V1 features during transition

### Phase 4: New Features Rollout (Week 5+)
- [ ] Enable theme discovery (opt-in)
- [ ] Enable AI prompts (opt-in)
- [ ] Enable multi-type contributions
- [ ] Enable collections

---

## Backward Compatibility Strategy

### For Existing V1 Users

**Option A: Automatic Migration**
```
Existing project "Mom's Story" becomes:
  ↓
Archive Type: "individual"
Primary Subject: "Mom"
Single contributor: Original account owner
  ↓
Gradually invite family members (optional)
Themes auto-generated from existing stories
```

**Option B: Opt-In Upgrade**
```
User sees: "New! Invite family to contribute"
  ↓
If accepted: Convert to V2 collaborative mode
If declined: Remain in V1 "individual" mode
```

**Recommendation**: Option A with clear onboarding

### V1 Mode (Simplified)
For users who want original experience:
```typescript
archive.archiveType = 'individual'
archive.settings.collaborationMode = false
archive.settings.autoThemeDiscovery = false
```

This disables:
- Multiple contributors
- AI prompts to family
- Theme discovery
- Collections

Maintains:
- Single-subject interviews
- Story extraction
- Single book output

---

## Code Changes Required

### Backend Changes

**1. Prisma Schema** (~200 lines changed)
```typescript
// Rename models
model FamilyArchive { ... }  // was LegacyProject
model ArchiveMember { ... }  // was ProjectMember
model Contribution { ... }   // was Conversation

// New models
model Theme { ... }
model AIInsight { ... }
model Prompt { ... }
model Collection { ... }
```

**2. Controllers** (~15 new files)
```
controllers/
  archives.controller.ts      (updated from projects)
  contributions.controller.ts  (updated from conversations)
  themes.controller.ts         (NEW)
  insights.controller.ts       (NEW)
  prompts.controller.ts        (NEW)
  collections.controller.ts    (NEW)
```

**3. Services** (~10 new files)
```
services/
  theme-discovery.service.ts   (NEW - core AI)
  prompt-generator.service.ts  (NEW - core AI)
  story-synthesis.service.ts   (NEW - core AI)
  collection-builder.service.ts (NEW)
  real-time-agent.service.ts   (NEW)
```

**4. Background Jobs** (~5 new workers)
```
workers/
  theme-discovery.worker.ts
  prompt-generation.worker.ts
  batch-analysis.worker.ts
  collection-generator.worker.ts
```

### Frontend Changes

**1. Pages** (~5 new pages)
```
pages/
  Dashboard.tsx         (updated - add themes view)
  ThemesView.tsx       (NEW)
  PromptsView.tsx      (NEW)
  CollectionsView.tsx  (NEW)
  TimelineView.tsx     (NEW)
```

**2. Components** (~10 new components)
```
components/
  ContributionUploader.tsx     (updated - multi-type)
  ThemeCard.tsx                (NEW)
  AIInsightBanner.tsx          (NEW)
  PromptCard.tsx               (NEW)
  CollectionBuilder.tsx        (NEW)
  MultiPerspectiveStory.tsx    (NEW)
```

**3. API Client**
```typescript
// Update all endpoints
apiClient.getProjects() → apiClient.getArchives()

// Add new endpoints
apiClient.getThemes(archiveId)
apiClient.getInsights(archiveId)
apiClient.getPrompts(archiveId)
apiClient.answerPrompt(promptId, contributionId)
```

---

## Estimated Effort

### Development Time

| Component | V1 (Original) | V2 (New) | Effort Increase |
|-----------|---------------|----------|-----------------|
| Data Models | 5 models | 9 models | +80% |
| API Endpoints | ~20 routes | ~50 routes | +150% |
| AI Processing | 1 pipeline | 3 pipelines | +200% |
| Frontend Pages | 4 pages | 10 pages | +150% |
| Background Jobs | 1 worker | 5 workers | +400% |

**Total Estimate**:
- V1 MVP: 8-10 weeks
- V2 MVP: 16-20 weeks
- Migration: 2-4 weeks

### Cost Impact

| Resource | V1 | V2 | Change |
|----------|----|----|--------|
| OpenAI API calls | ~100/day | ~500/day | +400% |
| Storage (S3) | ~10GB/month | ~50GB/month | +400% |
| Database size | ~1GB | ~5GB | +400% |
| Server load | 1x | 2-3x | +200% |

**Monthly Cost Increase**: ~$200 → ~$800 (at 1000 active archives)

---

## Risk Assessment

### Technical Risks

**🔴 High Risk**
1. **Theme discovery accuracy**: AI might create nonsensical themes
   - **Mitigation**: Human review, confidence thresholds, manual merge/split

2. **Real-time conversation latency**: <500ms target hard to achieve
   - **Mitigation**: Start with async only, add real-time in Phase 3

3. **Multi-contributor conflicts**: Two people tell contradictory stories
   - **Mitigation**: Show multiple perspectives, don't auto-merge

**⚠️ Medium Risk**
4. **Prompt fatigue**: Family gets overwhelmed by AI suggestions
   - **Mitigation**: Rate limiting, priority filtering, snooze feature

5. **Privacy complexity**: Family members disagree on what to share
   - **Mitigation**: Granular permissions, default to private

### Product Risks

**🔴 High Risk**
1. **Complexity overwhelms users**: Too many features confuse simple use case
   - **Mitigation**: Progressive disclosure, "simple mode" vs "family mode"

2. **Existing users resist change**: V1 users want old experience
   - **Mitigation**: Maintain backward compatibility, opt-in upgrades

**⚠️ Medium Risk**
3. **Family adoption rate**: Hard to get whole family engaged
   - **Mitigation**: Make single-contributor mode work great, family is bonus

---

## Success Criteria

### Must Have for V2 Launch
- [ ] 80%+ of V1 features working in V2
- [ ] Zero data loss during migration
- [ ] Theme discovery >70% accuracy
- [ ] Multi-contributor uploads working
- [ ] Basic prompt system functional

### Nice to Have
- [ ] Real-time conversation agent
- [ ] Collection generation
- [ ] Advanced analytics
- [ ] Video support

### Metrics to Track
- **Adoption**: % of archives with 2+ contributors
- **Engagement**: Average contributions per member per month
- **AI Quality**: Theme accuracy, prompt relevance
- **Satisfaction**: NPS from multi-contributor families

---

## Decision Points

### Critical Decisions Needed

**1. Migration Approach**
- [ ] **Option A**: Automatic migration, all users get V2
- [ ] **Option B**: Opt-in, V1 remains available
- [ ] **Option C**: New users get V2, existing stay V1

**Recommendation**: Option A with V1 compatibility mode

**2. Feature Rollout**
- [ ] **Option A**: Big bang - all V2 features at once
- [ ] **Option B**: Phased - V2 data models first, AI features later
- [ ] **Option C**: Parallel - V2 as separate product

**Recommendation**: Option B (phased rollout)

**3. Real-Time Agent Timing**
- [ ] **Option A**: Include in V2 MVP (Week 16-20)
- [ ] **Option B**: Phase 2 (Week 21-24)
- [ ] **Option C**: Phase 3 (Month 6+)

**Recommendation**: Option B (not in MVP, fast-follower)

---

## Next Steps

### Immediate Actions (This Week)
1. Review and approve V2 architecture
2. Decide on migration approach
3. Create detailed task breakdown
4. Update product roadmap
5. Estimate budget impact

### Week 1-2
1. Update Prisma schema
2. Write migration scripts
3. Test on staging environment
4. Create API compatibility layer
5. Update frontend API client

### Week 3-4
1. Build theme discovery pipeline
2. Build prompt generation system
3. Update dashboard UI
4. Add multi-contributor support
5. Beta test with 5-10 families

### Week 5-8
1. Full rollout to existing users
2. Monitor and iterate
3. Add collection features
4. Prepare for real-time agent

---

## Summary

**V1 → V2 represents a fundamental product evolution from "interview service" to "collaborative family platform."**

**The good news**: Core technology (transcription, story extraction) remains the same. The architecture is solid.

**The challenge**: Significantly more complex UX, AI orchestration, and user coordination required.

**The opportunity**: 10x more valuable product - families stay engaged long-term, multiple outputs, viral family invitations.

**Recommendation**: Proceed with phased migration approach, maintaining V1 compatibility while rolling out V2 features incrementally.