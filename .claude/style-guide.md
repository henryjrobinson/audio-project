# Space Age Lounge - Style Guide for Memory Box

**Project**: Memory preservation app for users age 70-80+
**Era**: Early-Mid 1960s (JFK, Jetsons, Space Age optimism, Stardust Casino)
**Accessibility Target**: WCAG AAA where possible, minimum AA

---

## Color Palette

### Primary Colors
```css
--powder-blue: #87CEEB;      /* Backgrounds, cards, accents */
--sky-blue: #6BB6D6;         /* Interactive elements, hover states */
--tangerine: #FF8C42;        /* Primary CTA, important actions */
--atomic-teal: #2A9D8F;      /* Success, progress, secondary CTAs */
```

### Supporting Colors
```css
--champagne: #F4E4C1;        /* Page backgrounds, light surfaces */
--warm-gray: #A8A39D;        /* Secondary text, borders */
--deep-walnut: #2A1F1A;      /* Primary text, dark elements */
--coral-pink: #FF6B6B;       /* Alerts, special moments */
```

### Semantic Colors
```css
--success: #2A9D8F;          /* Same as atomic-teal */
--warning: #FFB347;          /* Warm orange */
--error: #E76F51;            /* Muted coral-red */
--info: #87CEEB;             /* Same as powder-blue */
```

---

## Typography

### Font Families
```css
--font-headline: 'Lexend', 'Outfit', 'DM Sans', system-ui, sans-serif;
--font-body: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Rule**: Never use thin weights (100-300). Minimum weight is 400, prefer 500-700.

### Font Sizes (Base: 16px)
```css
--text-xs: 0.875rem;    /* 14px - metadata, captions only */
--text-sm: 1rem;        /* 16px - absolute minimum for body */
--text-base: 1.125rem;  /* 18px - preferred body text */
--text-lg: 1.25rem;     /* 20px - emphasis */
--text-xl: 1.5rem;      /* 24px - section headers */
--text-2xl: 2rem;       /* 32px - page headers */
--text-3xl: 3rem;       /* 48px - hero text */
```

**Critical**: Never go below 16px for body text. Prefer 18px for primary content.

### Font Weights
```css
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### Typography Rules
- Line height: 1.6-1.7 for body text (never below 1.5)
- Paragraph max-width: 65-75 characters
- Letter spacing: Slightly increased for readability (0.01em on body)

---

## Spacing & Layout

### Spacing Scale
```css
--space-xs: 0.5rem;     /* 8px */
--space-sm: 0.75rem;    /* 12px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
```

### Touch Targets
```css
--touch-min: 44px;           /* Minimum tap target (WCAG) */
--touch-comfortable: 56px;   /* Preferred tap target */
```

**MANDATORY**: ALL interactive elements must be at least 44px × 44px. Prefer 56px for primary actions.

---

## Component Specifications

### Cards
```css
.card {
  background: #F4E4C1;              /* champagne */
  border-radius: 16px;
  padding: 2rem;                    /* 32px */
  border: 2px solid #A8A39D;        /* warm-gray */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-elevated {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
```

**Rules**:
- Always use soft, rounded corners (16px minimum)
- Always include subtle borders for definition
- Use shadows for depth, not flat design

### Buttons

#### Primary Button
```css
.button-primary {
  background: #FF8C42;              /* tangerine */
  color: #2A1F1A;                   /* deep-walnut */
  padding: 16px 32px;
  border-radius: 28px;              /* Pill-shaped */
  font-size: 1.125rem;              /* 18px */
  font-weight: 600;
  min-height: 56px;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 250ms ease;
}

.button-primary:hover {
  background: #FFA55F;              /* Lighter tangerine */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}

.button-primary:focus {
  outline: 3px solid rgba(255, 140, 66, 0.5);
  outline-offset: 2px;
}
```

#### Secondary Button
```css
.button-secondary {
  background: #2A9D8F;              /* atomic-teal */
  color: white;
  padding: 16px 32px;
  border-radius: 28px;
  font-size: 1.125rem;
  font-weight: 600;
  min-height: 56px;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.button-secondary:hover {
  background: #3BB5A5;
  transform: translateY(-2px);
}
```

**Button Rules**:
- NEVER use ghost/outline-only buttons
- NEVER use low-contrast buttons
- Every button must be OBVIOUS and have strong visual affordance
- Minimum 56px height for primary actions
- Always use pill-shaped borders (border-radius: 50% of height)

### Links
```css
.link {
  color: #2A9D8F;                   /* atomic-teal */
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 2px;
  font-weight: 500;
}

.link:hover {
  color: #6BB6D6;                   /* sky-blue */
  text-decoration-thickness: 3px;
}

.link:focus {
  outline: 3px solid rgba(42, 157, 143, 0.3);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**CRITICAL**: Links MUST ALWAYS be underlined. Color alone is insufficient for accessibility.

### Input Fields
```css
.input {
  background: white;
  border: 3px solid #A8A39D;        /* warm-gray */
  border-radius: 8px;
  padding: 16px 20px;
  font-size: 1.125rem;              /* 18px */
  min-height: 56px;
  color: #2A1F1A;                   /* deep-walnut */
  font-family: var(--font-body);
}

.input:focus {
  border-color: #2A9D8F;            /* atomic-teal */
  outline: 3px solid rgba(42, 157, 143, 0.2);
  outline-offset: 2px;
}

.input::placeholder {
  color: #A8A39D;
  opacity: 0.8;
}

.input-error {
  border-color: #FF6B6B;            /* coral-pink */
  outline-color: rgba(255, 107, 107, 0.2);
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #2A1F1A;
}

.input-helper {
  margin-top: 8px;
  font-size: 0.875rem;
  color: #A8A39D;
}

.input-error-message {
  margin-top: 8px;
  font-size: 0.875rem;
  color: #E76F51;
  font-weight: 500;
}
```

**Input Rules**:
- Thick borders (3px minimum) for visibility
- Clear focus states with outline
- Never use thin or subtle inputs
- Always pair with visible labels

### Progress Indicators
```css
.progress-bar {
  background: #A8A39D;              /* warm-gray */
  height: 16px;                     /* Chunky, visible */
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill {
  background: #2A9D8F;              /* atomic-teal */
  height: 100%;
  border-radius: 8px;
  transition: width 300ms ease;
}
```

### Stats/Gamification Cards
```css
.stats-card {
  background: #87CEEB;              /* powder-blue */
  color: #2A1F1A;                   /* deep-walnut */
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stats-card-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stats-card-value {
  font-size: 3rem;                  /* 48px */
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1;
}

.stats-card-subtitle {
  font-size: 1rem;
  font-weight: 500;
}
```

### Modal/Dialog
```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  background: #F4E4C1;              /* champagne */
  border-radius: 24px;
  padding: 3rem;                    /* 48px */
  max-width: 600px;
  width: 100%;
  border: 3px solid #FF8C42;        /* tangerine */
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.modal-header {
  font-size: 2rem;                  /* 32px */
  color: #2A1F1A;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.modal-body {
  font-size: 1.125rem;
  color: #2A1F1A;
  line-height: 1.6;
  margin-bottom: 2rem;
}
```

---

## Animation & Motion

### Timing Functions
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;

--easing-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Standard Transitions
```css
.animated {
  transition: all 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

.animated-entry {
  animation: slideInUp 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Animation Rules**:
- Use generous timing (never below 150ms)
- Avoid rapid flashing or quick fades
- No parallax effects
- Prefer subtle, smooth animations

---

## Accessibility Requirements

### Contrast Requirements (MANDATORY)
- Body text (< 18px): 7:1 minimum (WCAG AAA)
- Large text (≥ 18px): 4.5:1 minimum (WCAG AA)
- Interactive elements: 3:1 against background
- Focus indicators: 3:1 against background

### Color Combinations (Pre-approved)
✅ **PASS - Use these**:
- `#2A1F1A` text on `#F4E4C1` background (12.8:1)
- `#2A1F1A` text on `#E8D7C3` background (10.5:1)
- `#2A1F1A` text on `#87CEEB` background (8.2:1)
- `#2A1F1A` text on `#FF8C42` background (6.8:1)
- White text on `#2A9D8F` background (5.1:1)
- White text on `#6BB6D6` background (3.8:1)

### Interaction Requirements
- ✅ Minimum touch target: 44px × 44px (WCAG)
- ✅ Preferred touch target: 56px × 56px
- ✅ Spacing between targets: 8px minimum
- ✅ All focus states have 3px visible outlines
- ✅ Focus indicators contrast 3:1 with background

### Typography Requirements
- ✅ Minimum body text: 16px (prefer 18px)
- ✅ Line height: 1.5 minimum (prefer 1.6-1.7)
- ✅ Paragraph width: 65-75 characters max
- ✅ Letter spacing: Slightly increased

---

## Critical Don'ts

❌ **NEVER** use dark navy or cold blue backgrounds
❌ **NEVER** use font weights below 400
❌ **NEVER** use text smaller than 16px for body content
❌ **NEVER** use ghost/outline-only buttons
❌ **NEVER** use icon-only buttons without text labels
❌ **NEVER** rely on color alone to convey information
❌ **NEVER** use links without underlines
❌ **NEVER** use flat design (always use shadows/borders)
❌ **NEVER** use thin borders (< 2px)
❌ **NEVER** use touch targets smaller than 44px × 44px
❌ **NEVER** use rapid animations (< 150ms)

---

## Component Examples

### Example: Story Card
```jsx
<div style={{
  background: '#F4E4C1',
  borderRadius: '16px',
  padding: '32px',
  border: '2px solid #A8A39D',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}}>
  <h3 style={{
    color: '#2A1F1A',
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '16px'
  }}>
    The Christmas with No Money
  </h3>
  <p style={{
    color: '#2A1F1A',
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '24px'
  }}>
    It was 1943, and we didn't have two nickels to rub together...
  </p>
  <button style={{
    background: '#FF8C42',
    color: '#2A1F1A',
    padding: '16px 32px',
    borderRadius: '28px',
    fontSize: '18px',
    fontWeight: 600,
    minHeight: '56px',
    border: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    marginRight: '12px'
  }}>
    Read Story 📖
  </button>
  <button style={{
    background: '#2A9D8F',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '28px',
    fontSize: '18px',
    fontWeight: 600,
    minHeight: '56px',
    border: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    cursor: 'pointer'
  }}>
    Share
  </button>
</div>
```

### Example: Stats Card
```jsx
<div style={{
  background: '#87CEEB',
  borderRadius: '16px',
  padding: '24px',
  color: '#2A1F1A',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}}>
  <div style={{
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }}>
    Heart-to-Hearts 💌
  </div>
  <div style={{
    fontSize: '48px',
    fontWeight: 700,
    marginBottom: '8px',
    lineHeight: 1
  }}>
    8/12
  </div>
  <div style={{
    fontSize: '16px',
    fontWeight: 500
  }}>
    You're 67% there! Keep going! 🎉
  </div>
</div>
```

---

## CSS Variables (Complete Set)

Copy this into your root CSS:

```css
:root {
  /* Colors - Space Age Lounge */
  --powder-blue: #87CEEB;
  --sky-blue: #6BB6D6;
  --tangerine: #FF8C42;
  --atomic-teal: #2A9D8F;
  --champagne: #F4E4C1;
  --warm-gray: #A8A39D;
  --deep-walnut: #2A1F1A;
  --coral-pink: #FF6B6B;

  /* Semantic Colors */
  --color-success: #2A9D8F;
  --color-warning: #FFB347;
  --color-error: #E76F51;
  --color-info: #87CEEB;

  /* Typography */
  --font-headline: 'Lexend', 'Outfit', 'DM Sans', system-ui, sans-serif;
  --font-body: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;

  --text-xs: 0.875rem;
  --text-sm: 1rem;
  --text-base: 1.125rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 3rem;

  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Interaction */
  --touch-min: 44px;
  --touch-comfortable: 56px;

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --easing-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.15);
  --shadow-xl: 0 20px 60px rgba(0,0,0,0.3);
}
```

---

## Design Philosophy Summary

**Target User**: 70-80 year olds who were young in the 1960s

**Visual Inspiration**:
- Early 1960s optimistic futurism
- Space Age design (Jetsons, atomic age)
- Powder blue Cadillacs
- Stardust Casino glamour
- TWA airline ads
- Eero Saarinen furniture curves

**Core Principles**:
1. **Warm & Optimistic**: Use warm, hopeful colors that evoke the optimism of the Space Age
2. **High Contrast**: Every element must be easily readable
3. **Generous Spacing**: Nothing cramped or tight
4. **Obvious Affordances**: No subtle UI - everything is clear and inviting
5. **Soft Curves**: Mid-century rounded corners, pill-shaped buttons
6. **Subtle Depth**: Use shadows and borders, not flat design
7. **Accessibility First**: Older users need maximum readability

**Voice & Tone**: Warm grandparent, optimistic, never clinical or corporate
