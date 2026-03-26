# Visibility Component

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React component for controlling content visibility between AI agents and human users.

## Overview

The `<Visibility>` component solves a critical problem in modern web development: **AI crawlers cannot interact with dynamic content**. When ChatGPT, Claude, or Perplexity visit your site, they can't click buttons, drag sliders, or expand accordions. They only see the static HTML.

This component lets you:
- Show **interactive UIs** to humans
- Show **static, structured content** to AI bots
- Keep both experiences clean and optimized

## Quick Start

### Installation

```bash
npm install visibility-component
```

### Basic Usage (Next.js)

```tsx
import { headers } from 'next/headers';
import { Visibility } from 'visibility-component';

export default async function PricingPage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  return (
    <div>
      {/* Humans see an interactive slider */}
      <Visibility for="humans" userAgent={userAgent}>
        <PricingSlider />
      </Visibility>

      {/* AI agents see plain text */}
      <Visibility for="agents" userAgent={userAgent}>
        <h2>Pricing Plans</h2>
        <ul>
          <li>Starter: $29/month - 5 users, 10GB storage</li>
          <li>Pro: $99/month - 25 users, 100GB storage</li>
        </ul>
      </Visibility>
    </div>
  );
}
```

## Features

✅ **Bidirectional control** - Show content to agents OR humans  
✅ **Simple API** - Single `for` prop with clear semantics  
✅ **TypeScript support** - Full type definitions included  
✅ **30+ AI bots detected** - ChatGPT, Claude, Perplexity, Gemini, and more  
✅ **SSR-ready** - Works with Next.js and other server-side frameworks  
✅ **Zero dependencies** - Only requires React as peer dependency  

## Why Use This?

### The Problem

Your pricing page has an interactive slider. Humans love it. But when ChatGPT crawls your site to answer "What does [your product] cost?", it sees nothing. The pricing is hidden behind JavaScript interactions that AI can't perform.

Result: ChatGPT cites your competitor's blog post about your pricing instead of your actual pricing page.

### The Solution

```tsx
{/* Interactive for humans */}
<Visibility for="humans" userAgent={userAgent}>
  <PricingSlider />
</Visibility>

{/* Static text for AI */}
<Visibility for="agents" userAgent={userAgent}>
  <h2>Pricing: $29-$299/month</h2>
  <p>Starter ($29), Pro ($99), Enterprise ($299)</p>
</Visibility>
```

Now ChatGPT reads your pricing directly from your site and cites you as the source.

## API Reference

### `<Visibility>` Component

```tsx
interface VisibilityProps {
  for: 'agents' | 'humans';
  children: ReactNode;
  userAgent?: string | null;
  className?: string;
}
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `for` | `'agents' \| 'humans'` | ✅ | Target audience for content |
| `children` | `ReactNode` | ✅ | Content to display |
| `userAgent` | `string \| null` | ⚠️ | User agent string (recommended for SSR) |
| `className` | `string` | ❌ | CSS class for wrapper div |

### `isAIBot()` Helper

```tsx
import { isAIBot } from 'visibility-component';

const userAgent = 'GPTBot/1.0';
if (isAIBot(userAgent)) {
  // Custom logic for AI bots
}
```

## Detected AI Bots

The component detects **30+ AI crawlers** including:

- **OpenAI**: GPTBot, ChatGPT-User, OAI-SearchBot
- **Anthropic**: ClaudeBot, Anthropic-AI, Claude-Web  
- **Google**: Google-Extended, Bard, Gemini
- **Perplexity**: PerplexityBot
- **DeepSeek**: DeepSeekBot, DeepSeek-R1
- **xAI**: GrokBot, XAI
- **Microsoft**: BingBot
- **Meta**: FacebookBot, Meta-ExternalAgent
- And many more...

See [`AI_BOT_USER_AGENTS`](src/user-agents.ts) for the complete list.

## Examples

### Pricing Pages

```tsx
<Visibility for="humans" userAgent={userAgent}>
  <InteractivePricingCalculator />
</Visibility>

<Visibility for="agents" userAgent={userAgent}>
  <h2>Pricing Plans</h2>
  {plans.map(plan => (
    <div key={plan.name}>
      <h3>{plan.name}: ${plan.price}/month</h3>
      <ul>
        {plan.features.map(f => <li>{f}</li>)}
      </ul>
    </div>
  ))}
</Visibility>
```

### Product Features

```tsx
<Visibility for="humans" userAgent={userAgent}>
  <FeatureCarousel />
</Visibility>

<Visibility for="agents" userAgent={userAgent}>
  <h2>Core Features</h2>
  <ul>
    <li>Task management with Kanban and Gantt views</li>
    <li>Real-time collaboration and comments</li>
    <li>Time tracking and reporting</li>
  </ul>
</Visibility>
```

## Best Practices

### 1. Use Server-Side Rendering

```tsx
// ✅ Recommended: SSR with accurate detection
const headersList = await headers();
const userAgent = headersList.get('user-agent');

// ⚠️ Less reliable: Client-side detection
const userAgent = navigator.userAgent;
```

### 2. Keep Content Consistent

Both versions should convey the **same information** in different formats:

```tsx
// ✅ Good: Same info, different formats
<Visibility for="humans" userAgent={userAgent}>
  <PricingSlider min={29} max={299} />
</Visibility>

<Visibility for="agents" userAgent={userAgent}>
  <p>Pricing: $29-$299/month based on team size</p>
</Visibility>
```

### 3. Use Semantic HTML

Structure AI-visible content properly:

```tsx
<Visibility for="agents" userAgent={userAgent}>
  <h1>Product Name - Category</h1>
  <h2>Key Features</h2>
  <ul>
    <li>Specific feature with details</li>
  </ul>
</Visibility>
```

## Testing

### Test with cURL

```bash
# Test as ChatGPT (should see agent-only content)
curl -H "User-Agent: GPTBot/1.0" https://yoursite.com

# Test as Chrome (should see human-only content)
curl -H "User-Agent: Mozilla/5.0 Chrome/120.0" https://yoursite.com
```

### Browser DevTools

1. Open DevTools → Network
2. Right-click → "Override User Agent"
3. Enter `GPTBot/1.0`
4. Refresh page

## FAQ

**Is this SEO cloaking?**  
No. You're providing the same information in different formats. Google's policies prohibit deceptive content, not format optimization for different user agents.

**Why not just use CSS `display: none`?**  
Some crawlers ignore hidden content. Server-side rendering ensures content is either included or excluded from the HTML entirely.

**Does this affect regular SEO?**  
No. Traditional search crawlers (Googlebot) are not in the AI bot list and see the same content as humans.

## TypeScript

Full type definitions included:

```tsx
import type { VisibilityProps, VisibilityTarget } from 'visibility-component';

const target: VisibilityTarget = 'agents'; // 'agents' | 'humans'
```

## Documentation

- [Full Documentation](COMPONENT_DOCS.md)
- [Next.js App Router Example](examples/nextjs-app-router.tsx)
- [Next.js Pages Router Example](examples/nextjs-pages-router.tsx)

## Contributing

Contributions welcome! Please ensure:
- All code is properly typed (no `any`)
- Tests pass
- Documentation is updated

## License

MIT

## Related Resources

- [LLMOnly Component Guide](https://aiseotracker.com/blog/llmonly-component)
- [LLM-Only React Component](https://llmrefs.com/blog/llm-only-react-component)
- [AI SEO Best Practices](https://llmrefs.com/ai-search-visibility)

---

**Note**: This component is part of the v1 implementation focusing on page vs. markdown display differences and traffic-type detection. Future versions may expand to include broader search, MCP, or assistant behavior optimizations.
