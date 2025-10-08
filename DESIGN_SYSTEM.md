# Family Story App - Design System Documentation

**Version:** 2.0
**Last Updated:** 2025-10-08
**Theme:** Space Age Lounge (1960s-inspired, optimized for 70-80 year olds)

---

## Design Philosophy

This design system prioritizes **accessibility, warmth, and clarity** for elderly users (70-80 years old). Every design decision is made with the user's needs in mind:

- **High contrast** for vision accessibility
- **Large touch targets** (minimum 44px) for ease of interaction
- **Warm, nostalgic colors** from the 1960s Space Age era
- **Clear visual hierarchy** with generous spacing
- **Enthusiastic, supportive tone** with emojis for emotional warmth

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | Usage | Tailwind Class |
|------------|----------|-------|----------------|
| **Powder Blue** | `#87CEEB` | Backgrounds, cards, accents, header backgrounds | `bg-powder-blue`, `text-powder-blue`, `border-powder-blue` |
| **Tangerine** | `#FF8C42` | Primary CTA buttons, important highlights, borders | `bg-tangerine`, `text-tangerine`, `border-tangerine` |
| **Atomic Teal** | `#2A9D8F` | Success states, secondary actions, progress indicators | `bg-atomic-teal`, `text-atomic-teal`, `border-atomic-teal` |
| **Champagne** | `#F4E4C1` | Page backgrounds (currently using `bg-white`) | `bg-champagne` |

### Supporting Colors

| Color Name | Hex Code | Usage | Tailwind Class |
|------------|----------|-------|----------------|
| **Deep Walnut** | `#2A1F1A` | Primary text, headings, important content | `text-deep-walnut` |
| **Warm Gray** | `#A8A39D` | Secondary text, metadata, subtle borders | `text-warm-gray`, `border-warm-gray` |
| **Coral Pink** | `#FF6B6B` | Emotional moments, alerts, special highlights | `bg-coral-pink`, `text-coral-pink`, `border-coral-pink` |
| **Harvest Gold** | `#E4A853` | Warnings, tips, achievements | `bg-harvest-gold`, `text-harvest-gold` |

### Semantic Color Mapping

| State | Color | Usage |
|-------|-------|-------|
| **Success** | Atomic Teal | Completed tasks, approved items, positive feedback |
| **Warning** | Harvest Gold | Needs attention, pending review |
| **Error** | Coral Pink | Destructive actions, alerts, emotional intensity |
| **Info** | Powder Blue | Informational cards, backgrounds |

---

## Typography

### Font Families

```css
/* Headlines & Headings */
font-family: 'Lexend', 'Outfit', 'DM Sans', system-ui, sans-serif;

/* Body Text */
font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Sizes (Mobile-First)

| Size | Value | Line Height | Usage | Tailwind Class |
|------|-------|-------------|-------|----------------|
| **xs** | 14px (0.875rem) | 1.5 | Metadata, captions, timestamps | `text-xs` |
| **sm** | 16px (1rem) | 1.6 | Minimum body text, secondary info | `text-sm` |
| **base** | 18px (1.125rem) | 1.6 | **Preferred body text** (accessibility) | `text-base` |
| **lg** | 20px (1.25rem) | 1.5 | Emphasis, card titles | `text-lg` |
| **xl** | 24px (1.5rem) | 1.4 | Section headers, important titles | `text-xl` |
| **2xl** | 32px (2rem) | 1.3 | Page headers, hero text | `text-2xl` |
| **3xl** | 48px (3rem) | 1.2 | Hero sections, landing pages | `text-3xl` |
| **4xl** | 64px (4rem) | 1.1 | Large display numbers/stats | `text-4xl` |

### Font Weights

| Weight | Value | Usage | Tailwind Class |
|--------|-------|-------|----------------|
| Normal | 400 | Regular body text | `font-normal` |
| Medium | 500 | Emphasis, metadata | `font-medium` |
| Semibold | 600 | Buttons, important text | `font-semibold` |
| Bold | 700 | Headings, stats | `font-bold` |
| Extrabold | 800 | Large numbers, hero text | `font-extrabold` |

### Text Color Classes

```tsx
// Primary text (high contrast)
className="text-deep-walnut"

// Secondary text / metadata
className="text-warm-gray"

// On colored backgrounds
className="text-white"

// Semi-transparent variations
className="text-deep-walnut/80"  // 80% opacity
className="text-deep-walnut/90"  // 90% opacity
className="text-white/90"
```

---

## Spacing Scale

Based on 8px base unit for consistency:

| Name | Value | Usage | Tailwind Class |
|------|-------|-------|----------------|
| **xs** | 8px (0.5rem) | Tight spacing, inline gaps | `space-x-2`, `gap-2`, `p-2` |
| **sm** | 12px (0.75rem) | Small gaps, compact layouts | `space-x-3`, `gap-3`, `p-3` |
| **md** | 16px (1rem) | Standard spacing | `space-x-4`, `gap-4`, `p-4` |
| **lg** | 24px (1.5rem) | Card padding, section spacing | `space-x-6`, `gap-6`, `p-6` |
| **xl** | 32px (2rem) | Large section spacing | `space-x-8`, `gap-8`, `p-8` |
| **2xl** | 48px (3rem) | Major section breaks | `space-y-12`, `gap-12` |
| **3xl** | 64px (4rem) | Page-level spacing | `space-y-16` |

---

## Component Patterns

### 1. Page Layout

```tsx
// Full page container
<div className="min-h-screen bg-white">
  {/* Page content */}
</div>

// Content container (max-width with padding)
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Content */}
</div>
```

### 2. Header Section

```tsx
<div className="bg-powder-blue shadow-lg border-b-4 border-tangerine">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-6">
      {/* Header content */}
    </div>
  </div>
</div>
```

**Key Styles:**
- Background: `bg-powder-blue`
- Border bottom: `border-b-4 border-tangerine`
- Shadow: `shadow-lg`
- Padding: `py-6`

### 3. Card Components

#### Standard Card
```tsx
<Card className="shadow-lg border-2 border-atomic-teal">
  <CardHeader className="bg-atomic-teal/10 border-b-2 border-atomic-teal">
    <CardTitle className="flex items-center text-deep-walnut">
      <Icon className="h-6 w-6 mr-2" />
      Title with Emoji 📖
    </CardTitle>
    <CardDescription className="text-deep-walnut font-medium">
      Description text
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4 pt-6">
    {/* Card content */}
  </CardContent>
</Card>
```

#### Stat Card (Overview)
```tsx
<Card className="card-hover bg-powder-blue text-deep-walnut shadow-xl border-0">
  <CardHeader className="pb-3">
    <CardTitle className="flex items-center text-lg font-bold text-deep-walnut">
      <Icon className="h-6 w-6 mr-2 emoji-icon" />
      Card Title 💬
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-4xl font-extrabold mb-3">{number}</div>
    <p className="text-deep-walnut/90 text-sm font-semibold">
      Description text
    </p>
  </CardContent>
</Card>
```

**Card Variants:**

| Background | Border | Text Color | Usage |
|------------|--------|------------|-------|
| `bg-powder-blue` | `border-0` | `text-deep-walnut` | Info cards, stats |
| `bg-atomic-teal` | `border-0` | `text-white` | Success cards, highlights |
| `bg-tangerine/10` | `border-4 border-tangerine` | `text-deep-walnut` | CTA cards, important actions |
| `bg-white` | `border-2 border-atomic-teal` | `text-deep-walnut` | Standard content cards |

#### Hover Effects
```tsx
className="card-hover"  // Adds hover animation (defined in index.css)
className="hover:shadow-md transition-shadow"
className="hover:border-atomic-teal transition-all"
```

### 4. Buttons

#### Primary Action Button
```tsx
<Button
  className="shadow-lg hover:shadow-xl hover:scale-105 transition-all"
>
  <Icon className="h-4 w-4 mr-2" />
  Action Label
</Button>
```

**Default styles:**
- Background: Tangerine (`bg-tangerine`)
- Text: Deep Walnut or White
- Min height: `min-h-[44px]`
- Font: `font-bold` or `font-semibold`
- Hover: `hover:scale-105 transition-transform`

#### Secondary Button
```tsx
<Button
  variant="secondary"
  size="sm"
  className="mt-1 font-semibold hover:scale-105 transition-transform shadow-md"
>
  <Plus className="h-4 w-4 mr-1" />
  Action Label
</Button>
```

#### Outline Button
```tsx
<Button
  variant="outline"
  size="sm"
  className="border-2 border-deep-walnut text-deep-walnut hover:bg-deep-walnut/10 hover:scale-105 transition-transform"
>
  <Icon className="h-4 w-4 mr-2" />
  Action Label
</Button>
```

#### Ghost Button
```tsx
<Button
  variant="ghost"
  size="sm"
  className="hover:scale-110 transition-transform"
>
  <Play className="h-5 w-5 text-atomic-teal" />
</Button>
```

### 5. Badges

```tsx
// Default badge (primary)
<Badge variant="default" className="font-semibold">
  <AlertCircle className="w-3 h-3 mr-1" />
  Demo Mode
</Badge>

// Secondary badge (with custom colors)
<Badge variant="secondary" className="text-xs bg-atomic-teal/20 text-atomic-teal font-semibold">
  📖 {number} stories
</Badge>

// Outline badge
<Badge variant="outline" className="text-xs border-coral-pink text-coral-pink font-semibold">
  💕 {number} special moments
</Badge>

// Warning badge
<Badge variant="outline" className="text-xs bg-tangerine/20 border-tangerine text-deep-walnut font-semibold">
  ✨ Review Me!
</Badge>
```

### 6. Progress Bars

```tsx
<Progress
  value={percentage}
  className="bg-deep-walnut/20 h-3 mb-2"
/>
```

**Variants:**
- Standard height: `h-3`
- Background: `bg-deep-walnut/20` or `bg-white/20`
- Foreground: Uses theme primary color (Tangerine)

### 7. Avatars

```tsx
<Avatar className="h-14 w-14 ring-4 ring-tangerine ring-offset-2">
  <AvatarImage src={src} alt={name} />
  <AvatarFallback className="bg-tangerine text-deep-walnut text-lg">
    {initials}
  </AvatarFallback>
</Avatar>
```

**Sizes:**
- Small: `h-12 w-12`
- Medium: `h-14 w-14`
- Large: `h-16 w-16`

**Ring styles:**
- `ring-4 ring-tangerine ring-offset-2`
- `ring-4 ring-atomic-teal ring-offset-2`

### 8. Tabs

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="overview">
      🏠 Overview
    </TabsTrigger>
    <TabsTrigger value="conversations">
      💬 Chats
    </TabsTrigger>
    <TabsTrigger value="stories">
      📖 Stories
    </TabsTrigger>
    <TabsTrigger value="family">
      👨‍👩‍👧‍👦 Family
    </TabsTrigger>
  </TabsList>

  <TabsContent value="overview" className="space-y-6">
    {/* Content */}
  </TabsContent>
</Tabs>
```

**Note:** Always include emojis in tab labels for visual clarity.

### 9. Conversation/Story Cards

#### Recent Conversation Card
```tsx
<div className="flex items-center justify-between p-4 bg-powder-blue/30 rounded-xl border-2 border-powder-blue hover:border-atomic-teal transition-all card-hover">
  <div className="flex-1">
    <h4 className="font-bold text-deep-walnut">{title}</h4>
    <p className="text-sm text-warm-gray font-medium">{date} • {duration}</p>
    <div className="flex items-center mt-2 space-x-2">
      <Badge variant="secondary" className="text-xs bg-atomic-teal/20 text-atomic-teal font-semibold">
        📖 {count} stories
      </Badge>
      <Badge variant="outline" className="text-xs border-coral-pink text-coral-pink font-semibold">
        💕 {count} special moments
      </Badge>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    {/* Status icon */}
    <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
      <Play className="h-5 w-5 text-atomic-teal" />
    </Button>
  </div>
</div>
```

#### Story Highlight Card
```tsx
<div className="p-4 bg-tangerine/10 rounded-xl border-2 border-tangerine/30 hover:border-tangerine transition-all card-hover">
  <div className="flex items-start justify-between mb-2">
    <h4 className="font-bold text-deep-walnut">{title}</h4>
    {approved ? (
      <CheckCircle className="h-6 w-6 text-atomic-teal flex-shrink-0" />
    ) : (
      <Badge variant="outline" className="text-xs bg-tangerine/20 border-tangerine text-deep-walnut font-semibold">
        ✨ Review Me!
      </Badge>
    )}
  </div>
  <p className="text-sm text-deep-walnut/80 mb-3 font-medium">{excerpt}</p>
  <div className="flex items-center justify-between">
    <span className="text-xs text-warm-gray font-semibold">{duration}</span>
    <Button
      variant="ghost"
      size="sm"
      className="bg-tangerine/20 hover:bg-tangerine/30 text-deep-walnut font-semibold hover:scale-105 transition-transform"
    >
      <FileText className="h-4 w-4 mr-1" />
      Read Story
    </Button>
  </div>
</div>
```

### 10. Next Steps / CTA Section

```tsx
<Card className="bg-tangerine/10 border-4 border-tangerine shadow-2xl">
  <CardHeader>
    <CardTitle className="text-deep-walnut text-2xl flex items-center">
      🎯 Your Next Adventures
    </CardTitle>
    <CardDescription className="text-deep-walnut font-semibold text-base">
      Keep the magic going! Every chat saves precious moments forever ✨
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border-3 border-tangerine shadow-lg card-hover">
        <div className="h-14 w-14 bg-tangerine rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
          <Icon className="h-7 w-7 text-deep-walnut" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-deep-walnut text-lg">Action Title 💬</h4>
          <p className="text-sm text-deep-walnut font-medium">Description</p>
        </div>
        <Button className="ml-auto font-bold hover:scale-110 transition-transform shadow-lg">
          Let's Go!
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```

---

## Icons & Emojis

### Icon Usage

**Always use Lucide React icons:**
```tsx
import { Calendar, Users, BookOpen, Heart, Star } from 'lucide-react';
```

**Standard icon sizes:**
- Small: `h-4 w-4` (buttons, inline)
- Medium: `h-5 w-5` or `h-6 w-6` (card headers)
- Large: `h-7 w-7` (action cards, emphasis)

**Icon with animation:**
```tsx
<Icon className="h-6 w-6 emoji-icon" />  // Adds hover animation
```

### Emoji Usage

**Always pair emojis with text labels for clarity:**
```tsx
<CardTitle>📖 Stories Unlocked</CardTitle>
<Button>💬 Chat with Mom</Button>
<p>🎉 You're 67% there! Keep going!</p>
```

**Common emoji patterns:**
- Heart: 💝 💕 ❤️ (love, memories, special moments)
- Communication: 💬 📞 🎙️ (chats, calls, recordings)
- Content: 📖 ⭐ ✨ (stories, highlights, magic)
- People: 👨‍👩‍👧‍👦 👪 (family)
- Celebration: 🎉 🎯 🌟 (achievement, goals)
- Emotions: 😊 💛 🥰 (warmth, love)

---

## Border Styles

### Border Widths
- Standard: `border` (1px)
- Medium: `border-2` (2px)
- Thick: `border-3` (3px) - custom, for emphasis
- Extra thick: `border-4` (4px) - for CTAs

### Border Radius
- Small: `rounded-lg` (16px)
- Medium: `rounded-xl` (20px)
- Large: `rounded-2xl` (24px)
- Pill: `rounded-full` (circles for icons/avatars)

### Border Color Patterns
```tsx
// Standard borders
className="border-2 border-warm-gray"

// Hover state changes
className="border-2 border-powder-blue hover:border-atomic-teal"

// Emphasis borders
className="border-4 border-tangerine"

// Section dividers
className="border-b-2 border-atomic-teal"
```

---

## Shadow System

```tsx
// Subtle shadow
className="shadow-sm"

// Standard shadow
className="shadow-lg"

// Emphasis shadow
className="shadow-xl"

// Maximum depth
className="shadow-2xl"

// Hover effects
className="shadow-lg hover:shadow-xl"
```

---

## Responsive Grid Layouts

### Two-column responsive grid
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Content */}
</div>
```

### Three-column responsive grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

### Four-column responsive grid (stats)
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {/* Content */}
</div>
```

**Breakpoints used:**
- Mobile: default (no prefix)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

---

## Animation Classes

### Transitions
```tsx
// All-purpose smooth transition
className="transition-all"

// Specific properties
className="transition-shadow"
className="transition-transform"

// Hover scale effects
className="hover:scale-105"  // Subtle (buttons)
className="hover:scale-110"  // Medium (small buttons/icons)
```

### Custom Animations (from index.css)
```tsx
// Gentle bounce (for icons, decorations)
className="bounce-gentle"

// Pulse glow effect
className="pulse-glow"

// Card hover effect
className="card-hover"

// Emoji icon hover
className="emoji-icon"

// Loading spinner
<div className="h-6 w-6 border-2 border-atomic-teal border-t-transparent rounded-full animate-spin" />
```

---

## Accessibility Guidelines

### Touch Targets
- **Minimum size:** `min-h-[44px]` (WCAG requirement)
- **Preferred size:** `min-h-[56px]` for primary actions
- Apply to all buttons, links, and interactive elements

```tsx
<Button className="min-h-[44px]">Action</Button>
<button className="min-h-[44px] min-w-[44px]">Icon</button>
```

### Text Contrast
- **Body text:** `text-deep-walnut` on `bg-white` or `bg-powder-blue` (AAA compliant)
- **Secondary text:** `text-warm-gray` (AA compliant minimum)
- **On dark backgrounds:** Use `text-white` or very light colors

### Focus States
All interactive elements automatically receive focus rings (defined in index.css):
```css
*:focus-visible {
  outline: 3px solid rgba(255, 140, 66, 0.5);
  outline-offset: 2px;
}
```

---

## Status Indicators

### Processing/Loading States
```tsx
// Spinner
<div className="h-6 w-6 border-2 border-atomic-teal border-t-transparent rounded-full animate-spin" />

// With badge
<Badge className="bg-powder-blue/20 text-atomic-teal">Processing</Badge>
```

### Completed States
```tsx
<CheckCircle className="h-6 w-6 text-atomic-teal" />
<Badge className="bg-atomic-teal/20 text-atomic-teal">Processed</Badge>
```

### Needs Review States
```tsx
<Badge variant="outline" className="text-xs bg-tangerine/20 border-tangerine text-deep-walnut font-semibold">
  ✨ Review Me!
</Badge>
```

---

## Stat Display Pattern

```tsx
<div className="text-center p-3 bg-powder-blue/20 rounded-lg">
  <div className="text-2xl font-bold text-atomic-teal">{value}</div>
  <div className="text-sm text-deep-walnut">{label}</div>
</div>
```

**Background color mapping:**
- `bg-powder-blue/20` - Info stats
- `bg-atomic-teal/20` - Success/progress stats
- `bg-coral-pink/20` - Emotional/special stats
- `bg-tangerine/20` - Action stats

---

## Content Tone Guidelines

### Voice & Tone
- **Warm and enthusiastic** - Use emojis generously
- **Supportive and encouraging** - Celebrate progress
- **Clear and simple** - No jargon
- **Personal and family-focused** - Use "Mom," "Dad," family names

### Example Copy Patterns

**Stats:**
- "🎉 You're 67% there! Keep going!"
- "✨ Memories saved forever! 💝"
- "🌟 Amazing people helping out!"

**Actions:**
- "Let's Go!" (not "Start" or "Begin")
- "Chat with Mom" (not "Schedule Call")
- "Invite Everyone" (not "Add Members")

**Headers:**
- "💬 Heart-to-Hearts" (not "Conversations")
- "📖 Stories Unlocked" (not "Extracted Stories")
- "👨‍👩‍👧‍👦 Family Squad" (not "Team Members")

---

## Common Patterns Summary

### DO ✅
- Use `text-deep-walnut` for primary text
- Use `font-bold` or `font-extrabold` for numbers and stats
- Add emojis to all headings and labels
- Use `card-hover` class for interactive cards
- Add `shadow-lg` or `shadow-xl` to important cards
- Use `hover:scale-105` or `hover:scale-110` for buttons
- Include at least `min-h-[44px]` for all interactive elements
- Use `bg-powder-blue`, `bg-atomic-teal`, or `bg-tangerine` for colored backgrounds
- Use opacity variations (`/10`, `/20`, `/30`, `/80`, `/90`) for subtle backgrounds

### DON'T ❌
- Don't use pure black text (use `text-deep-walnut`)
- Don't use colors not in the palette
- Don't create buttons smaller than 44px
- Don't use `text-gray-500` (use `text-warm-gray`)
- Don't skip hover/focus states
- Don't use gradient backgrounds (solid colors only per design philosophy)
- Don't use generic labels ("Submit," "OK") - be specific and warm
- Don't omit emojis from user-facing text

---

## Component Checklist

When creating a new component, ensure:

- [ ] Uses Space Age Lounge colors only
- [ ] All interactive elements are min 44px
- [ ] Text uses `text-deep-walnut` or appropriate color
- [ ] Includes hover/focus states
- [ ] Uses appropriate font weights (`font-bold` for emphasis)
- [ ] Includes emojis for warmth
- [ ] Has responsive breakpoints (`md:`, `lg:`)
- [ ] Uses card-hover or transition classes
- [ ] Shadows are appropriate (`shadow-lg`, `shadow-xl`)
- [ ] Spacing uses design system scale (`gap-4`, `p-6`, etc.)
- [ ] Icons are from Lucide React
- [ ] Border radius is consistent (`rounded-lg`, `rounded-xl`)

---

## File References

**Primary Files:**
- Colors & Variables: `frontend/src/index.css`
- Tailwind Config: `frontend/tailwind.config.ts`
- Example Implementation: `frontend/src/pages/Dashboard.tsx`

**DO NOT** reference the old "Mid-Century Modern" colors (navy, burnt orange, etc.). This document reflects the **active Space Age Lounge system** only.

---

**Last Reviewed:** 2025-10-08
**Status:** Active - This is the canonical design system documentation
