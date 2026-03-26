# ENG-7278: Document safe `className` support for components

## Issue Summary

A customer requested documented, stable way to apply custom CSS classes to specific components such as `<Tabs>`, rather than relying on global CSS selectors or wrapper divs. The `className` prop currently appears to work in some places but is undocumented, and the request is to make that support safe and explicit.

## Current Repository Context

This Linear issue was assigned to the repository `brandonmcconnell/brandonmcconnell`, which is a GitHub profile README repository. This repository does not contain:

- Any React/UI component library
- Any `<Tabs>` component or similar UI components
- TypeScript/JavaScript source code for components
- Component documentation structure
- Package.json or dependency management

## Investigation Required

To properly resolve this issue, we need to identify:

1. **The correct repository**: Which codebase contains the components (like `<Tabs>`) that need `className` documentation?
   - Based on recent tweets in the profile, this might be related to a Mintlify project
   - The actual component library repository needs to be identified

2. **Current `className` implementation status**:
   - Which components currently support `className` (even if undocumented)?
   - How is `className` currently handled in component props?
   - Are there any existing patterns for spreading props or merging classNames?

3. **Documentation location**:
   - Where should this documentation live? (README, separate docs site, API reference, etc.)
   - What documentation format is currently used? (MDX, Markdown, TypeScript JSDoc, etc.)

## Recommended Resolution Path

Once the correct repository is identified, the resolution would typically involve:

### 1. Code Changes

**TypeScript Interface Updates**:
```typescript
interface TabsProps {
  /**
   * Optional CSS class name to apply to the Tabs container.
   * This className will be merged with the default Tabs styles.
   */
  className?: string;
  // ... other props
}
```

**Component Implementation**:
```typescript
export const Tabs = ({ className, ...props }: TabsProps) => {
  return (
    <div className={cn('default-tabs-styles', className)} {...props}>
      {/* component content */}
    </div>
  );
};
```

### 2. Documentation Updates

**API Documentation** (example format):
```markdown
## Tabs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Custom CSS class name to apply to the Tabs container. Will be merged with default styles. |

### Examples

#### Custom Styling
\`\`\`tsx
<Tabs className="my-custom-tabs">
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
</Tabs>
\`\`\`

#### With Tailwind CSS
\`\`\`tsx
<Tabs className="border-2 border-blue-500 rounded-lg">
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
</Tabs>
\`\`\`
```

### 3. Component Audit

Survey all public-facing components and ensure consistent `className` support:

- [ ] Tabs
- [ ] Tab
- [ ] Button
- [ ] Card
- [ ] Modal
- [ ] (other components as identified)

### 4. Type Safety

Ensure all components with `className` support:
- Properly type the prop in TypeScript interfaces
- Include JSDoc comments for documentation
- Handle className merging correctly (prefer utility like `clsx` or `classnames`)
- Test that custom classes don't override critical functionality styles

### 5. Testing

Add tests to verify:
- Custom classNames are applied correctly
- Default styles are preserved
- Multiple classNames can be combined
- className works with CSS modules, Tailwind, and plain CSS

## Next Steps

1. Identify the correct repository containing the component library
2. Create a new branch in that repository for this work
3. Audit existing components for current `className` support
4. Implement consistent `className` support across all public components
5. Add comprehensive documentation with examples
6. Update TypeScript types with proper JSDoc comments
7. Add tests for className functionality
8. Update any existing documentation or migration guides

## Questions to Answer

- Which repository contains the component library?
- Is there an existing pattern for handling className in any components?
- What className merging utility is currently used (if any)?
- Where should the documentation be published?
- Are there any components where className should NOT be supported? (and why?)
- What is the preferred approach for handling className conflicts?

---

**Status**: Waiting for correct repository identification to proceed with implementation.
