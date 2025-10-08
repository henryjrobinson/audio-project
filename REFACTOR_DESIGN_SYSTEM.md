# Design System Refactoring Task

## Current State (Problem)

The project has **TWO conflicting design systems**:

### System 1: "Mid-Century Modern" (DESIGN_SYSTEM.md)
- Deep Navy (`#121420`)
- Burnt Orange CTA (`#D35400`)
- Golden Accent (`#F39C12`)
- Cloud White (`#F8F9FA`)
- Teal Links (`#16A085`)
- Slate Text (`#2C3E50`)

### System 2: "Space Age Lounge" (index.css + tailwind.config.ts)
- Powder Blue (`#87CEEB`)
- Tangerine (`#FF8C42`)
- Atomic Teal (`#2A9D8F`)
- Champagne (`#F4E4C1`)
- Deep Walnut (`#2A1F1A`)
- Warm Gray (`#A8A39D`)

**Components are using both systems inconsistently**, leading to:
- Visual inconsistency across pages
- Conflicting color tokens (e.g., `text-slate` vs `text-deep-walnut`)
- Maintenance nightmare
- Design debt accumulation

## Goal

**Consolidate into ONE unified design system** and refactor all components to use it consistently.

## Decision Required

**Which design system should we standardize on?**

### Option A: Keep "Space Age Lounge" (index.css)
✅ Already implemented in CSS variables and Tailwind config
✅ More modern, warm, accessible
✅ Better color contrast for elderly users
✅ Comprehensive documentation in `index.css`
❌ Need to update DESIGN_SYSTEM.md

### Option B: Keep "Mid-Century Modern" (DESIGN_SYSTEM.md)
✅ Documented in markdown
✅ More professional/sophisticated
❌ Need to refactor all CSS variables
❌ Need to update tailwind.config.ts
❌ Need to update all components

### ⭐ Recommendation: Option A (Space Age Lounge)
It's already the active system with better accessibility features.

## Refactoring Checklist

### Phase 1: Consolidate Design System (1-2 days)

- [ ] **Choose one system** (recommend Space Age Lounge)
- [ ] **Update DESIGN_SYSTEM.md** to match chosen system
- [ ] **Create component style guide** with examples
- [ ] **Document all Tailwind utility classes** available
- [ ] **Create reusable component variants** for common patterns

### Phase 2: Extract Reusable Components (2-3 days)

- [ ] **Create `<ActionCard>` component** - Consolidate QuickActionCard patterns
- [ ] **Create `<Section>` component** - Standard section wrapper with heading
- [ ] **Create `<PageContainer>` component** - Standard page layout
- [ ] **Create `<EmptyState>` component** - Standardize empty states
- [ ] **Create button variants** - Primary, Secondary, Tertiary, Danger
- [ ] **Create typography components** - Heading, Body, Caption, etc.

### Phase 3: Refactor Existing Components (3-5 days)

#### Priority 1: Common Components
- [ ] `WelcomeBanner.tsx` - Use ActionCard component
- [ ] `QuickActionCard.tsx` - Standardize or deprecate if ActionCard replaces it
- [ ] `EmptyState.tsx` - Use design system colors consistently
- [ ] `Button` component (`ui/button.tsx`) - Ensure variants match system
- [ ] `Card` component (`ui/card.tsx`) - Standardize styling

#### Priority 2: Page Components
- [ ] `Dashboard.tsx` - Use new reusable components
- [ ] `ElderlyDashboard.tsx` - Use new reusable components
- [ ] `ViewerDashboard.tsx` - Use new reusable components
- [ ] `Index.tsx` - Standardize landing page
- [ ] `Onboarding.tsx` - Remove inline styles, use components

#### Priority 3: Utility Components
- [ ] All `ui/*.tsx` components - Ensure they use design tokens
- [ ] `ChatbotButton.tsx` - Standardize styling

### Phase 4: Remove Inline Styles (2-3 days)

**Current Issues:**
- Many components use inline Tailwind classes like `bg-white rounded-2xl p-5`
- Duplicate style definitions across multiple files
- Hard to maintain consistency

**Solution:**
1. **Extract common patterns to CSS classes** in `index.css`:
   ```css
   @layer components {
     .action-card {
       @apply bg-white rounded-2xl p-5 border-2 border-warm-gray shadow-xl;
       @apply flex flex-col h-full min-h-[280px] md:min-h-[300px];
     }

     .action-card-content {
       @apply flex-1 flex flex-col items-center text-center;
     }

     .action-card-button {
       @apply w-full min-h-[44px] mt-4 font-bold text-base;
     }
   }
   ```

2. **Create styled components** for complex patterns:
   ```tsx
   // components/styled/ActionCard.tsx
   export const ActionCard = styled(Card)`
     /* Reusable action card styles */
   `;
   ```

3. **Document component usage** in Storybook or similar

### Phase 5: Create Style Guide Components (1-2 days)

- [ ] **Colors page** - Show all colors with names and usage
- [ ] **Typography page** - Show all text styles with examples
- [ ] **Components page** - Show all reusable components
- [ ] **Spacing page** - Show spacing scale
- [ ] **Icons page** - Document icon usage patterns

### Phase 6: Cleanup and Documentation (1 day)

- [ ] **Remove unused color tokens** from tailwind.config.ts
- [ ] **Remove unused CSS variables** from index.css
- [ ] **Update README** with design system documentation
- [ ] **Create CONTRIBUTING.md** with component guidelines
- [ ] **Add ESLint rules** to prevent inline style inconsistencies

## File-by-File Refactor Plan

### Files with Inline Styles to Refactor

1. **WelcomeBanner.tsx** (68 lines)
   - Extract card pattern to reusable component
   - Use design tokens for all colors
   - Remove hardcoded spacing values

2. **Onboarding.tsx** (417 lines)
   - Large file with many inline styles
   - Extract step card patterns
   - Use consistent spacing and colors
   - Consider splitting into multiple components

3. **Dashboard.tsx**
   - Standardize card layouts
   - Use EmptyState component
   - Extract repeated patterns

4. **ElderlyDashboard.tsx**
   - Similar patterns to Dashboard
   - Ensure accessibility features
   - Use larger touch targets

5. **Index.tsx**
   - Hero section styling
   - CTA button patterns
   - Feature card layouts

## Design Token Naming Convention

**Establish clear naming for design tokens:**

### Colors (use Space Age Lounge)
```
Primary Actions: tangerine
Secondary Actions: atomic-teal
Backgrounds: champagne, powder-blue
Text: deep-walnut, warm-gray
Success: atomic-teal
Warning: harvest-gold
Error: coral-pink
Info: powder-blue
```

### Spacing
```
xs: 0.5rem (8px)
sm: 0.75rem (12px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Typography
```
text-xs: 14px (metadata only)
text-sm: 16px (minimum body)
text-base: 18px (preferred body)
text-lg: 20px (emphasis)
text-xl: 24px (section headers)
text-2xl: 32px (page headers)
text-3xl: 48px (hero text)
```

## Example Component Refactor

### Before (WelcomeBanner.tsx - current)
```tsx
<div className="bg-white rounded-2xl p-5 hover:bg-white/90 transition-all border-2 border-warm-gray card-hover shadow-xl flex flex-col h-full min-h-[280px] md:min-h-[300px]">
  <div className="flex-1 flex flex-col items-center text-center">
    <div className="h-12 w-12 bg-powder-blue rounded-full flex items-center justify-center mb-3">
      <Calendar className="h-7 w-7 text-deep-walnut" />
    </div>
    <h3 className="font-extrabold text-lg mb-2 text-deep-walnut">📅 Start Your First Chat!</h3>
    <p className="text-base text-deep-walnut font-medium">
      Let's capture some amazing stories together!
    </p>
  </div>
  <Button>Let's Go!</Button>
</div>
```

### After (using ActionCard component)
```tsx
<ActionCard
  icon={Calendar}
  iconColor="powder-blue"
  title="📅 Start Your First Chat!"
  description="Let's capture some amazing stories together!"
  action={{
    label: "Let's Go!",
    onClick: onScheduleCall
  }}
/>
```

### ActionCard Component Definition
```tsx
// components/ActionCard.tsx
interface ActionCardProps {
  icon: LucideIcon;
  iconColor?: 'powder-blue' | 'atomic-teal' | 'tangerine';
  title: string;
  description: string;
  action: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
}

export const ActionCard = ({ icon: Icon, iconColor = 'powder-blue', title, description, action }: ActionCardProps) => {
  return (
    <Card className="action-card">
      <CardContent className="action-card-content">
        <IconCircle color={iconColor}>
          <Icon />
        </IconCircle>
        <Heading as="h3">{title}</Heading>
        <Text>{description}</Text>
      </CardContent>
      <Button
        variant={action.variant || 'primary'}
        onClick={action.onClick}
        className="action-card-button"
      >
        {action.label}
        <ArrowRight />
      </Button>
    </Card>
  );
};
```

## Estimated Timeline

**Total: 10-16 days** (2-3 weeks)

- Phase 1: 1-2 days
- Phase 2: 2-3 days
- Phase 3: 3-5 days
- Phase 4: 2-3 days
- Phase 5: 1-2 days
- Phase 6: 1 day

## Benefits After Refactor

✅ **Consistency** - All components use same design language
✅ **Maintainability** - Single source of truth for styles
✅ **Developer Experience** - Easy to create new components
✅ **Performance** - Less duplicate CSS, smaller bundle
✅ **Accessibility** - Consistent touch targets and contrast
✅ **Scalability** - Easy to add new features with existing patterns
✅ **Documentation** - Clear guide for new developers

## Next Steps

1. **Decision**: Choose which design system to standardize on
2. **Create ticket**: Break this down into individual tasks
3. **Prioritize**: Start with Phase 1 and common components
4. **Iterate**: Refactor incrementally, test after each phase
5. **Review**: Have team review new components before wide adoption

## Questions to Answer Before Starting

1. Which design system should we keep? (Recommend Space Age Lounge)
2. Do we need to support dark mode? (Current: No, per Space Age Lounge docs)
3. Should we use styled-components or stick with Tailwind? (Recommend Tailwind + @layer components)
4. Do we need Storybook for component documentation?
5. Timeline: Can we allocate 2-3 weeks for this refactor?

---

**Created:** 2025-10-08
**Status:** Proposed
**Priority:** High (reduces technical debt)
