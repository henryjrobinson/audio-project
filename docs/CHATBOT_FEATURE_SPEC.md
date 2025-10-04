# Chatbot Agent Feature Specification
## Context-Aware Family Archive Assistant

**Version**: 1.0
**Date**: October 2025
**Status**: Ready for Implementation

---

## Executive Summary

A persistent, context-aware chatbot that appears on every view in the Voice Legacy Platform, helping users navigate the platform, understand their family archive, and get answers about stories, family members, and how to contribute.

### Key Goals
1. **Reduce friction** - Help users understand what to do next
2. **Surface insights** - Highlight interesting stories and patterns
3. **Guide contribution** - Encourage family members to add more content
4. **Answer questions** - About stories, family members, platform features

---

## Product Requirements

### Core Capabilities

**The chatbot must be able to:**

1. **Answer questions about the family archive**
   - "What stories do we have about Grandma's cooking?"
   - "Who has contributed the most?"
   - "What themes have been discovered?"
   - "Show me stories from the 1960s"

2. **Help with platform navigation**
   - "How do I schedule a call?"
   - "How do I invite my sister?"
   - "Where can I see all the stories?"
   - "How do I upload a photo?"

3. **Provide context-aware suggestions**
   - When on Dashboard: "You have 2 stories awaiting review"
   - When on Stories tab: "This story mentions cooking - we have 3 other cooking stories"
   - When on Family tab: "Sarah hasn't contributed in 2 weeks - maybe send a reminder?"

4. **Understand the project context**
   - Current family archive details
   - All stories and contributions
   - Family member information
   - Themes and insights
   - User's role and permissions

---

## User Experience Design

### Visual Design

**Floating Button (Closed State)**
```
Position: Fixed bottom-right corner
Size: 60px diameter circle
Icon: Chat bubble or sparkle icon
Color: Primary brand color (gradient blue/purple)
Badge: Show notification dot if there are suggestions
Z-index: 9999 (always on top)

Behavior:
- Pulses gently on first page load
- Shows notification badge when there are unread insights
- Animates on hover
```

**Chat Panel (Open State)**
```
Position: Fixed bottom-right, slides up from button
Size:
  - Desktop: 400px wide × 600px tall
  - Mobile: Full screen (with back button)
Appearance:
  - White background with subtle shadow
  - Rounded corners (top-left, top-right)
  - Header with title and minimize/close buttons

Sections:
┌─────────────────────────────────┐
│ Family Archive Assistant     ✕ │  ← Header
├─────────────────────────────────┤
│                                 │
│  [Chat messages scroll here]    │  ← Message Area
│                                 │
│  AI: How can I help?           │
│  User: Show me cooking stories  │
│  AI: I found 4 stories about... │
│                                 │
├─────────────────────────────────┤
│ [Type your question...]     →  │  ← Input
└─────────────────────────────────┘
```

### Interaction Patterns

**1. First-time User Experience**
```
User opens chatbot for first time
  ↓
Welcome message with quick actions:
"👋 Hi! I'm your Family Archive Assistant. I can help you:
  • Find stories and memories
  • Schedule calls with family
  • Invite family members
  • Answer questions about the archive

What would you like to do?"

[Quick Action Buttons]
[📅 Schedule a Call] [👥 Invite Family] [📖 Browse Stories]
```

**2. Context-Aware Greetings**
```
Based on current page:

Dashboard:
"Welcome back! You have 2 new stories to review and 1 family member pending invitation."

Stories Tab:
"Looking for something specific? I can help you find stories by theme, person, or time period."

Family Tab:
"Need to invite someone or check on contributions? I'm here to help!"
```

**3. Conversation Flow Examples**

**Example 1: Finding Stories**
```
User: "What stories do we have about cooking?"

AI: "I found 4 stories related to cooking:

📖 'The Christmas with No Money' - Margaret talks about making cake
📖 'Grandma's Kitchen Wisdom' - 3 family members share cooking memories
📖 'Sunday Dinners' - Sarah's favorite meal memories
📖 'The Peach Pie Recipe' - Margaret shares her famous recipe

Would you like me to show you any of these?"

User: "Show me the peach pie one"

AI: [Opens story detail modal]
"Here's 'The Peach Pie Recipe'. It's one of the most loved stories in your archive!"
```

**Example 2: Help with Actions**
```
User: "How do I invite my brother?"

AI: "I can help you invite your brother! You have two options:

1. Click the 'Invite Family Member' button in the Family tab
2. I can open the invite form for you right now

Which would you prefer?"

User: "Open the form"

AI: [Opens InviteFamilyModal]
"I've opened the invitation form. Just enter your brother's name and email!"
```

**Example 3: Archive Insights**
```
User: "What themes have been discovered?"

AI: "Your family archive has 3 emerging themes:

🍳 **Grandma's Southern Cooking** (7 contributions, 4 family members)
   - 85% complete - Missing: Peach pie recipe

🏠 **Moving from South to North** (3 contributions, 2 family members)
   - 60% complete - Missing: Photos of old house

👨‍👩‍👧‍👦 **Raising Five Children** (5 contributions, 3 family members)
   - 70% complete - Missing: Stories from Michael

Would you like to explore any of these themes?"
```

---

## Technical Specification

### Frontend Architecture

**Component Structure**
```
src/
├── components/
│   └── Chatbot/
│       ├── ChatbotButton.tsx          # Floating button
│       ├── ChatbotPanel.tsx           # Main chat interface
│       ├── ChatMessage.tsx            # Individual message
│       ├── QuickActions.tsx           # Suggested action buttons
│       ├── TypingIndicator.tsx        # "AI is typing..." animation
│       └── index.tsx                  # Main export
├── hooks/
│   ├── useChatbot.ts                  # Chat state management
│   └── useChatbotContext.ts           # Access to archive data
├── services/
│   └── chatbotService.ts              # API calls
└── types/
    └── chatbot.ts                     # TypeScript interfaces
```

**Key TypeScript Interfaces**

```typescript
// Message types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;

  // Optional rich content
  actions?: QuickAction[];
  references?: {
    type: 'story' | 'family_member' | 'theme' | 'contribution';
    id: string;
    title: string;
  }[];
}

interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  action: 'open_modal' | 'navigate' | 'trigger_api' | 'send_message';
  payload: any;
}

// Chat state
interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  hasUnreadInsights: boolean;
  context: ChatContext;
}

// Context about current archive
interface ChatContext {
  archiveId: string;
  archiveName: string;
  currentPage: 'dashboard' | 'stories' | 'conversations' | 'family';
  userRole: 'owner' | 'admin' | 'contributor' | 'viewer';

  // Quick stats for context
  stats: {
    totalStories: number;
    totalContributions: number;
    familyMemberCount: number;
    pendingReviews: number;
    discoveredThemes: number;
  };
}
```

**State Management**

Using React Context + hooks pattern:

```typescript
// ChatbotContext.tsx
export const ChatbotProvider = ({ children, archiveId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load archive context
  const { data: archiveContext } = useArchiveContext(archiveId);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Call API
    setIsTyping(true);
    const response = await chatbotService.sendMessage({
      message: content,
      context: archiveContext,
      conversationHistory: messages
    });
    setIsTyping(false);

    // Add AI response
    setMessages(prev => [...prev, response]);
  };

  return (
    <ChatbotContext.Provider value={{
      isOpen,
      setIsOpen,
      messages,
      sendMessage,
      isTyping
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};
```

**UI Components**

```typescript
// ChatbotButton.tsx - Floating button
export const ChatbotButton = () => {
  const { isOpen, setIsOpen, hasUnreadInsights } = useChatbot();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r
                 from-blue-500 to-purple-600 rounded-full shadow-lg
                 hover:shadow-xl transition-all duration-200
                 hover:scale-110 z-50"
    >
      {hasUnreadInsights && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500
                         rounded-full border-2 border-white" />
      )}
      <MessageCircle className="w-6 h-6 text-white" />
    </button>
  );
};

// ChatbotPanel.tsx - Main chat interface
export const ChatbotPanel = () => {
  const { isOpen, setIsOpen, messages, sendMessage, isTyping } = useChatbot();
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white
                    rounded-lg shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">Family Archive Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input);
                setInput('');
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={() => {
              sendMessage(input);
              setInput('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## Backend API Requirements

### Endpoint Specification

**POST /api/v1/chat/message**

Send a message to the chatbot and get a response.

```typescript
// Request
interface ChatRequest {
  archiveId: string;
  message: string;
  context: {
    currentPage: string;
    userRole: string;
    sessionId?: string;  // For conversation continuity
  };
  conversationHistory?: ChatMessage[];  // Last 5-10 messages for context
}

// Response
interface ChatResponse {
  id: string;
  role: 'assistant';
  content: string;
  timestamp: Date;

  // Optional structured responses
  actions?: QuickAction[];
  references?: Reference[];

  // For debugging
  intent?: string;  // What the AI understood
  confidence?: number;
}
```

**GET /api/v1/archives/:archiveId/context**

Get full context about an archive for the chatbot.

```typescript
interface ArchiveContext {
  archive: {
    id: string;
    name: string;
    status: string;
    createdAt: Date;
  };

  stats: {
    totalStories: number;
    totalContributions: number;
    totalFamilyMembers: number;
    pendingReviews: number;
    hoursRecorded: number;
  };

  recentActivity: {
    type: 'story' | 'contribution' | 'member_joined';
    title: string;
    timestamp: Date;
  }[];

  themes: {
    id: string;
    name: string;
    contributionCount: number;
    completeness: number;
  }[];

  familyMembers: {
    id: string;
    name: string;
    role: string;
    contributionCount: number;
    lastActive?: Date;
  }[];

  suggestedActions: {
    type: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}
```

### AI Processing Architecture

**Option 1: OpenAI Assistant API (Recommended)**

```typescript
// Backend service using OpenAI Assistants
class ChatbotService {
  private openai: OpenAI;
  private assistantId: string;

  async processMessage(request: ChatRequest): Promise<ChatResponse> {
    // 1. Get archive context
    const context = await this.getArchiveContext(request.archiveId);

    // 2. Create or get thread
    const threadId = request.context.sessionId
      ? await this.getThread(request.context.sessionId)
      : await this.createThread();

    // 3. Add context as system message
    await this.openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: this.formatContextPrompt(context, request)
    });

    // 4. Run assistant
    const run = await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: this.assistantId,
      instructions: this.getInstructions(request.context)
    });

    // 5. Wait for completion
    const result = await this.waitForCompletion(threadId, run.id);

    // 6. Parse and return response
    return this.parseResponse(result);
  }

  private formatContextPrompt(context: ArchiveContext, request: ChatRequest): string {
    return `
You are a helpful assistant for the "${context.archive.name}" family archive.

Current context:
- Archive has ${context.stats.totalStories} stories
- ${context.stats.totalFamilyMembers} family members involved
- ${context.stats.pendingReviews} stories need review
- User is on the ${request.context.currentPage} page
- User role: ${request.context.userRole}

Recent themes discovered:
${context.themes.map(t => `- ${t.name} (${t.contributionCount} contributions)`).join('\n')}

Recent activity:
${context.recentActivity.map(a => `- ${a.title}`).join('\n')}

User question: ${request.message}

Provide helpful, contextual answers. If suggesting actions, format them as:
[ACTION: action_type | payload_json]
`;
  }
}
```

**Option 2: RAG (Retrieval Augmented Generation)**

For more advanced context awareness:

```typescript
class RAGChatbotService {
  async processMessage(request: ChatRequest): Promise<ChatResponse> {
    // 1. Embed the user's question
    const questionEmbedding = await this.embedText(request.message);

    // 2. Search vector database for relevant context
    const relevantStories = await this.vectorDB.search({
      archiveId: request.archiveId,
      embedding: questionEmbedding,
      limit: 5
    });

    // 3. Build context-rich prompt
    const prompt = this.buildPrompt({
      question: request.message,
      archiveContext: await this.getArchiveContext(request.archiveId),
      relevantStories,
      conversationHistory: request.conversationHistory
    });

    // 4. Call LLM
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        ...prompt
      ],
      temperature: 0.7,
      functions: this.getAvailableFunctions()  // For structured actions
    });

    // 5. Parse and return
    return this.parseCompletion(completion);
  }
}
```

### Database Requirements

**New Tables Needed**

```sql
-- Store chat conversations for context continuity
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  archive_id UUID REFERENCES family_archives(id),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  last_message_at TIMESTAMP,
  message_count INTEGER DEFAULT 0
);

-- Store individual messages (optional - for analytics)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id),
  role VARCHAR(20),  -- 'user' | 'assistant'
  content TEXT,
  intent VARCHAR(100),  -- Detected user intent
  references JSONB,  -- Links to stories, themes, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vector embeddings for RAG (if using RAG approach)
CREATE TABLE story_embeddings (
  id UUID PRIMARY KEY,
  story_id UUID REFERENCES stories(id),
  archive_id UUID REFERENCES family_archives(id),
  embedding VECTOR(1536),  -- pgvector extension
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_story_embeddings_vector ON story_embeddings
  USING ivfflat (embedding vector_cosine_ops);
```

### System Prompt Template

```
You are the Family Archive Assistant for the Voice Legacy Platform.

Your role:
- Help families preserve and explore their stories
- Answer questions about stories, themes, and family members
- Guide users on how to use the platform
- Provide warm, empathetic responses (this is about precious memories)

Capabilities:
- Search and find stories by theme, person, time period
- Explain platform features and how to use them
- Suggest next actions (schedule calls, invite family, review stories)
- Surface insights about the family archive

Personality:
- Warm and empathetic (you're dealing with family memories)
- Helpful and proactive
- Concise but thorough
- Use emojis sparingly for visual clarity

When answering:
1. Be specific - reference actual stories and data from the archive
2. Provide actionable next steps
3. If you can trigger an action (open modal, navigate), format as [ACTION]
4. If uncertain, ask clarifying questions

Current archive context will be provided with each message.
```

---

## Implementation Phases

### Phase 1: Basic Chatbot (Week 1)
**Goal**: Get chatbot UI working with simple Q&A

- [ ] Create chatbot UI components
- [ ] Implement open/close functionality
- [ ] Add basic chat interface
- [ ] Create mock responses for testing
- [ ] Style and animate components

**Deliverable**: Working chatbot UI with mock data

### Phase 2: Backend Integration (Week 2)
**Goal**: Connect to real API with basic intelligence

- [ ] Create POST /api/v1/chat/message endpoint
- [ ] Integrate OpenAI API
- [ ] Implement archive context retrieval
- [ ] Add conversation history management
- [ ] Handle errors and rate limiting

**Deliverable**: Chatbot that answers real questions

### Phase 3: Context Awareness (Week 3)
**Goal**: Make chatbot understand archive context

- [ ] Pass current page context
- [ ] Surface recent activity
- [ ] Implement theme-based answers
- [ ] Add family member awareness
- [ ] Context-aware greetings

**Deliverable**: Smart, context-aware assistant

### Phase 4: Actions & Integration (Week 4)
**Goal**: Enable chatbot to trigger UI actions

- [ ] Implement quick action buttons
- [ ] Wire up modal triggers
- [ ] Add navigation capabilities
- [ ] Story/theme reference links
- [ ] Proactive suggestions

**Deliverable**: Fully interactive assistant

---

## Success Metrics

### User Engagement
- **30%** of users interact with chatbot in first session
- **Average 3-5** messages per chat session
- **60%** of questions successfully answered (no "I don't know")

### User Satisfaction
- **>80%** positive feedback on chatbot helpfulness
- **<10%** negative feedback or confusion
- **>40%** users complete suggested actions from chatbot

### Platform Impact
- **15%** increase in story reviews (chatbot prompts users)
- **20%** increase in family invitations (chatbot makes it easy)
- **25%** faster time-to-first-contribution for new users

---

## Future Enhancements

### Phase 5+: Advanced Features
- **Voice input**: "Hey, ask my archive..."
- **Proactive notifications**: "You haven't added to Sarah's story in a while"
- **Email digests**: Weekly summaries from the chatbot
- **Multi-language support**: Chat in user's preferred language
- **Mobile app integration**: Native chat experience
- **Story suggestions**: "Based on this story, you might want to ask about..."

---

## Technical Considerations

### Performance
- Response time target: <2 seconds for simple queries
- Streaming responses for longer answers
- Cache common questions per archive
- Lazy load chat history

### Security
- Respect user permissions (don't reveal stories they can't access)
- Rate limiting to prevent abuse
- Sanitize user input
- No PII in logs

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus management

### Mobile Responsiveness
- Full-screen modal on mobile
- Touch-friendly interface
- Swipe to close
- Virtual keyboard handling

---

## Open Questions

1. **Should chatbot remember conversations across sessions?**
   - Pro: Better continuity, personalized experience
   - Con: More complex state management, privacy concerns
   - **Recommendation**: Start with session-only, add persistence later

2. **How to handle multi-archive users?**
   - Show archive switcher in chat?
   - Separate chat per archive?
   - **Recommendation**: Separate chat context per archive

3. **Should we log all conversations for improvement?**
   - Pro: Learn from real usage, improve AI
   - Con: Privacy implications
   - **Recommendation**: Opt-in analytics with clear disclosure

4. **Rate limiting strategy?**
   - Free tier: 20 messages/day
   - Paid: Unlimited
   - **Recommendation**: Start unlimited, add limits if abused

---

## Dependencies

### Frontend
- `react` (existing)
- `lucide-react` for icons (existing)
- `@radix-ui/react-dialog` for modal (existing)
- Possibly `react-markdown` for rich responses

### Backend
- `openai` npm package
- Existing database (Prisma)
- Possibly `pgvector` for RAG approach
- Redis for session/cache management (optional)

### External Services
- OpenAI API (GPT-4 or GPT-3.5-turbo)
- Estimated cost: $0.01-0.05 per conversation

---

## Conclusion

This chatbot will serve as an intelligent guide through the family archive, making the platform more accessible and engaging. Start with Phase 1 (UI) and Phase 2 (basic API), then iterate based on user feedback.

**Next Steps**:
1. Review and approve this spec
2. Begin Phase 1 implementation
3. Create backend API endpoints
4. Test with real family data
