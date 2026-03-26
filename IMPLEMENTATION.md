# Visibility Component Implementation

## Overview

This repository contains the implementation of the `Visibility` component for controlling content display between AI agents (like ChatGPT, Claude, Perplexity) and human users. This addresses Linear issue **ENG-7280**.

The component allows content authors to show different content to different audiences:
- **Interactive UI elements** for human visitors (sliders, calculators, carousels)
- **Static, structured content** for AI crawlers (plain text, lists, tables)

## Background & Research

This implementation is based on extensive research into AI SEO and LLM-optimized content:

1. **[LLMOnly Component Guide](https://aiseotracker.com/blog/llmonly-component)** - Comprehensive guide to detecting AI bots and serving them appropriate content
2. **[LLM-only React Component](https://llmrefs.com/blog/llm-only-react-component)** - Best practices for implementing visibility controls

### The Problem

Modern websites use interactive elements that AI crawlers cannot parse:
- **Pricing sliders**: AI sees empty rectangles instead of actual prices
- **Feature carousels**: Content behind interactions is invisible to crawlers
- **Accordion FAQs**: Collapsed sections aren't read by AI
- **Code playgrounds**: Interactive elements don't expose their data

When AI systems like ChatGPT can't find information on your official website, they pull data from:
- Competitor websites
- Outdated blog posts
- Inaccurate third-party sources

### The Solution

The `Visibility` component provides a clean way to serve:
1. **Rich, interactive UIs** to human visitors
2. **Structured, static content** to AI crawlers

This ensures AI systems get accurate information while humans enjoy the best UX.

## Architecture

### Component Structure

```
src/
  components/
    Visibility.tsx      # Main component with AI detection
    index.ts           # Export file
examples/
  nextjs-usage.tsx     # Next.js server component examples
  mdx-usage.mdx       # MDX usage examples
test/
  visibility.test.tsx  # Comprehensive test suite
```

### Key Features

1. **Comprehensive Bot Detection**: Detects 30+ AI bot user agents including:
   - OpenAI (GPTBot, ChatGPT-User, OAI-SearchBot)
   - Anthropic (ClaudeBot, anthropic-ai, claude-web)
   - Perplexity (PerplexityBot)
   - Google (google-extended, Gemini, Bard)
   - DeepSeek, Grok, Mistral, Cohere, and more

2. **Flexible Usage**: Works in multiple contexts:
   - Next.js server components (recommended)
   - Next.js client components (with fallback)
   - Standard React applications
   - MDX files

3. **Type Safety**: Full TypeScript support with:
   - Strict typing (no `any` types)
   - Proper prop interfaces
   - Helper functions for conditional logic

4. **Zero Dependencies**: Pure React with no external dependencies

## Usage

### Basic Example

```tsx
import { Visibility } from '@/components/Visibility';

// In your MDX file or React component
<Visibility for="humans">
  <PricingSlider />
</Visibility>

<Visibility for="agents">
  <h2>Pricing Plans</h2>
  <ul>
    <li>Starter: $29/month - 5 users, 10GB storage</li>
    <li>Pro: $99/month - 25 users, 100GB storage</li>
  </ul>
</Visibility>
```

### Next.js Server Components (Recommended)

```tsx
import { headers } from 'next/headers';
import { Visibility } from '@/components/Visibility';

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || undefined;
  
  return (
    <Visibility for="agents" userAgent={userAgent}>
      <div>Content for AI agents only</div>
    </Visibility>
  );
}
```

### MDX Files

```mdx
<Visibility for="humans">
  <InteractiveDashboard />
</Visibility>

<Visibility for="agents">
  ## Dashboard Metrics
  
  - Total Users: 1,234
  - Active Sessions: 567
  - Revenue (MTD): $45,678
</Visibility>
```

## Implementation Details

### User Agent Detection

The component uses a comprehensive list of AI bot user agents:

```typescript
const AI_BOT_USER_AGENTS = [
  'gptbot',           // OpenAI GPT
  'chatgpt-user',     // ChatGPT browsing
  'claudebot',        // Anthropic Claude
  'perplexitybot',    // Perplexity AI
  'google-extended',  // Google AI
  'gemini',           // Google Gemini
  // ... 30+ total
];
```

Detection is case-insensitive and uses substring matching to handle version numbers and variations.

### Conditional Rendering Logic

```typescript
export function Visibility({ for: target, children, userAgent }: VisibilityProps) {
  const detectedUserAgent = userAgent || 
    (typeof window !== 'undefined' ? navigator.userAgent : undefined);
  
  const isBot = isAIBot(detectedUserAgent);
  const shouldShow = target === 'agents' ? isBot : !isBot;
  
  return shouldShow ? <>{children}</> : null;
}
```

### Helper Function

For custom logic outside the component:

```typescript
import { isAIBot } from '@/components/Visibility';

if (isAIBot(userAgent)) {
  return <StaticContent />;
}
return <InteractiveUI />;
```

## Testing

### Automated Tests

Run the test suite:

```bash
npm test
```

The test suite includes:
- Detection of all major AI bots
- Rejection of regular browsers
- Edge case handling (null, undefined, empty strings)
- Case-insensitivity verification

### Manual Testing with curl

Test different user agents:

```bash
# Test as ChatGPT
curl -H "User-Agent: GPTBot/1.0" https://yoursite.com

# Test as Claude
curl -H "User-Agent: ClaudeBot/1.0" https://yoursite.com

# Test as regular browser
curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" https://yoursite.com
```

### Browser DevTools Testing

1. Open DevTools (F12)
2. Open Command Palette (Ctrl+Shift+P)
3. Type "Show Network conditions"
4. Uncheck "Use browser default" under User agent
5. Enter a bot user agent like `GPTBot/1.0`
6. Refresh the page to see agent-only content

## Common Use Cases

### 1. Pricing Pages

**Problem**: Interactive pricing calculators are invisible to AI
**Solution**: Show calculator to humans, static pricing to AI

```tsx
<Visibility for="humans">
  <PricingSlider />
</Visibility>

<Visibility for="agents">
  <h2>Pricing</h2>
  <ul>
    <li>Starter: $29/month</li>
    <li>Pro: $99/month</li>
    <li>Enterprise: $299/month</li>
  </ul>
</Visibility>
```

### 2. Feature Comparisons

**Problem**: Feature tables with collapsible sections
**Solution**: Interactive table for humans, full list for AI

```tsx
<Visibility for="humans">
  <InteractiveFeatureTable />
</Visibility>

<Visibility for="agents">
  <h2>Features by Plan</h2>
  <h3>Starter Plan</h3>
  <ul>
    <li>5 users</li>
    <li>10GB storage</li>
  </ul>
  <h3>Pro Plan</h3>
  <ul>
    <li>25 users</li>
    <li>100GB storage</li>
    <li>API access</li>
  </ul>
</Visibility>
```

### 3. Documentation

**Problem**: Code playgrounds and interactive examples
**Solution**: Playground for humans, static code for AI

```tsx
<Visibility for="humans">
  <CodePlayground />
</Visibility>

<Visibility for="agents">
  <h2>Code Example</h2>
  <pre><code>{`
const client = new Client({
  apiKey: 'your-api-key',
  environment: 'production'
});
  `}</code></pre>
</Visibility>
```

### 4. FAQ Sections

**Problem**: Accordion FAQs hide content from AI
**Solution**: Accordion for humans, expanded list for AI

```tsx
<Visibility for="humans">
  <AccordionFAQ />
</Visibility>

<Visibility for="agents">
  <h2>FAQ</h2>
  <h3>How do I get started?</h3>
  <p>Sign up at example.com/signup...</p>
  <h3>What payment methods do you accept?</h3>
  <p>We accept all major credit cards...</p>
</Visibility>
```

## Design Decisions

### 1. Singular Form: `for="agents"` not `for="agent"`

Using plural form for consistency with existing patterns and better readability.

### 2. No `userAgent` Prop Required in MDX

While the prop is available for fine-grained control, the component automatically detects user agents in browser environments, making MDX usage simpler.

### 3. Server-Side Detection Preferred

Next.js server components provide the most reliable detection since:
- Headers are read server-side before rendering
- No client-side JavaScript required
- Works for all users including those with JS disabled

### 4. Type Safety Without `any`

Following the project's strict TypeScript guidelines:
- No explicit or implicit `any` types
- Proper union types for `VisibilityTarget`
- Strict null checking

## Migration Guide

### From Existing Tabs Component

If you have existing "human and agents" tabs, migrate to:

```tsx
// Before
<Tabs>
  <Tab label="For Humans">
    <InteractiveUI />
  </Tab>
  <Tab label="For Agents">
    <StaticContent />
  </Tab>
</Tabs>

// After
<Visibility for="humans">
  <InteractiveUI />
</Visibility>

<Visibility for="agents">
  <StaticContent />
</Visibility>
```

**Benefits**:
- Cleaner UI (no visible tabs)
- Better UX (no user action required)
- More semantic (describes intent)

## Future Enhancements (Out of Scope for v1)

The following are explicitly excluded from v1 per the issue requirements:

1. **Search Indexing**: Agent-only content searchable only by agents
2. **MCP Integration**: Context Protocol handling of visibility
3. **Assistant Behavior**: Preventing assistants from quoting invisible content
4. **Computer Use Agents**: Special handling for agents that act like humans
5. **Copy as Markdown**: Including all content with visibility context

These will be considered if complaints or requirements arise.

## SEO & Cloaking Concerns

**This is NOT cloaking.** Google's spam policies define cloaking as showing different content to deceive search engines. The `Visibility` component:

- ✅ Provides the **same information** in different formats
- ✅ Supplements existing content, doesn't replace it
- ✅ Serves technical needs (AI can't run JavaScript)
- ✅ Improves accessibility for AI systems

Reference: [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies#hidden-text-and-links)

## Performance

- **Zero Runtime Overhead**: Simple string matching
- **No External Dependencies**: Pure React
- **Server-Side Only**: No client bundle impact when using Next.js server components
- **No API Calls**: All detection happens in-memory

## Contributing

When adding new AI bot user agents:

1. Add to the `AI_BOT_USER_AGENTS` array in `Visibility.tsx`
2. Add corresponding test in `visibility.test.tsx`
3. Verify detection works with manual testing
4. Update this documentation

## License

This implementation is part of the Mintlify project and follows its license terms.

## Related Resources

- [AI SEO Tracker - LLMOnly Component Guide](https://aiseotracker.com/blog/llmonly-component)
- [LLM Refs - LLM-only React Component](https://llmrefs.com/blog/llm-only-react-component)
- [Google Search Central - Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## Questions & Support

For questions about this implementation, refer to:
- Linear Issue: ENG-7280
- Implementation docs: This file
- Example usage: `/examples` directory
- Test cases: `/test/visibility.test.tsx`
