# Visibility Component

A React component for controlling content visibility between AI agents and human users.

## Features

- **Bidirectional control**: Show content to agents OR humans
- **Simple API**: Single `for` prop with clear semantics
- **TypeScript support**: Full type definitions included
- **30+ AI bots detected**: Comprehensive user-agent matching
- **SSR-ready**: Works with Next.js and other server-side rendering frameworks
- **Zero dependencies**: Only requires React as a peer dependency

## Installation

```bash
npm install visibility-component
```

## Usage

### Next.js App Router (Recommended)

```tsx
import { headers } from 'next/headers';
import { Visibility } from 'visibility-component';

export default async function HomePage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  return (
    <div>
      {/* Interactive UI for human visitors */}
      <Visibility for="humans" userAgent={userAgent}>
        <PricingSlider />
      </Visibility>

      {/* Static content for AI agents */}
      <Visibility for="agents" userAgent={userAgent}>
        <h1>Product Pricing</h1>
        <ul>
          <li>Starter: $29/month - 5 users, 10GB storage, email support</li>
          <li>Pro: $99/month - 25 users, 100GB storage, priority support</li>
          <li>Enterprise: $299/month - Unlimited users, 1TB storage, 24/7 support</li>
        </ul>
      </Visibility>
    </div>
  );
}
```

### Next.js Pages Router

```tsx
import { GetServerSideProps } from 'next';
import { Visibility } from 'visibility-component';

interface PageProps {
  userAgent: string | null;
}

export default function PricingPage({ userAgent }: PageProps) {
  return (
    <div>
      <Visibility for="humans" userAgent={userAgent}>
        <InteractivePricingCalculator />
      </Visibility>

      <Visibility for="agents" userAgent={userAgent}>
        <h2>Pricing Details</h2>
        <p>Complete pricing information in plain text format for AI consumption</p>
      </Visibility>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      userAgent: req.headers['user-agent'] || null,
    },
  };
};
```

### Client-Side Usage

While server-side rendering is recommended for proper bot detection, you can also use the component client-side:

```tsx
'use client';

import { Visibility } from 'visibility-component';

export default function ClientComponent() {
  // Note: Client-side detection may not be as reliable
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : null;

  return (
    <Visibility for="humans" userAgent={userAgent}>
      <InteractiveElement />
    </Visibility>
  );
}
```

## API Reference

### `<Visibility>` Component

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `for` | `'agents' \| 'humans'` | Yes | Target audience for the content |
| `children` | `ReactNode` | Yes | Content to conditionally display |
| `userAgent` | `string \| null \| undefined` | No | User agent string for bot detection |
| `className` | `string` | No | CSS class to apply to wrapper div |

#### Behavior

- `for="agents"`: Content visible only to AI bots/LLMs
- `for="humans"`: Content visible only to human users

If the target doesn't match the detected user type, the component returns `null`.

### `isAIBot()` Function

Helper function for custom logic:

```tsx
import { isAIBot } from 'visibility-component';

const userAgent = 'GPTBot/1.0';
if (isAIBot(userAgent)) {
  // Handle AI bot visitor
}
```

### Detected AI Bots

The component detects 30+ AI bots including:

- **OpenAI**: GPTBot, ChatGPT-User, OAI-SearchBot
- **Anthropic**: ClaudeBot, Anthropic-AI, Claude-Web
- **Google**: Google-Extended, Bard, Gemini
- **Perplexity**: PerplexityBot
- **DeepSeek**: DeepSeekBot, DeepSeek-R1
- **xAI**: GrokBot, XAI
- **Microsoft**: BingBot
- And many more...

See `AI_BOT_USER_AGENTS` export for the complete list.

## Use Cases

### 1. Dynamic Pricing Displays

Show interactive sliders to humans, static pricing to AI:

```tsx
<Visibility for="humans" userAgent={userAgent}>
  <PricingSlider />
</Visibility>

<Visibility for="agents" userAgent={userAgent}>
  {pricingTiers.map(tier => (
    <div key={tier.name}>
      <h3>{tier.name}: ${tier.price}/month</h3>
      <ul>
        {tier.features.map(feature => <li key={feature}>{feature}</li>)}
      </ul>
    </div>
  ))}
</Visibility>
```

### 2. Feature Comparison Tables

```tsx
<Visibility for="agents" userAgent={userAgent}>
  <h2>Feature Comparison</h2>
  <table>
    <tr><th>Feature</th><th>Starter</th><th>Pro</th><th>Enterprise</th></tr>
    <tr><td>Users</td><td>5</td><td>25</td><td>Unlimited</td></tr>
    <tr><td>Storage</td><td>10GB</td><td>100GB</td><td>1TB</td></tr>
  </table>
</Visibility>
```

### 3. Product Documentation

```tsx
<Visibility for="agents" userAgent={userAgent}>
  <h1>Product Name - Category</h1>
  <p>Comprehensive product description optimized for AI understanding</p>
  
  <h2>Core Features</h2>
  <ul>
    <li>Feature 1: Detailed explanation</li>
    <li>Feature 2: Specific benefits</li>
  </ul>
  
  <h2>Use Cases</h2>
  <ul>
    <li>E-commerce: Inventory management</li>
    <li>Marketing: Campaign analytics</li>
  </ul>
</Visibility>
```

## Best Practices

### 1. Use Semantic HTML

Structure AI-visible content with proper headings and lists:

```tsx
<Visibility for="agents" userAgent={userAgent}>
  <h1>Main Product Title</h1>
  <h2>Section Heading</h2>
  <p>Description with key details</p>
  <ul>
    <li>Specific, structured information</li>
  </ul>
</Visibility>
```

### 2. Keep Content Consistent

AI-visible and human-visible content should convey the same information, just in different formats:

```tsx
// ✅ Good: Same information, different formats
<Visibility for="humans" userAgent={userAgent}>
  <PricingSlider min={29} max={299} />
</Visibility>

<Visibility for="agents" userAgent={userAgent}>
  <p>Pricing ranges from $29/month to $299/month</p>
</Visibility>

// ❌ Bad: Contradictory information
<Visibility for="humans" userAgent={userAgent}>
  <p>Starting at $49/month</p>
</Visibility>

<Visibility for="agents" userAgent={userAgent}>
  <p>Starting at $29/month</p>
</Visibility>
```

### 3. Server-Side Rendering

Always prefer SSR for accurate bot detection:

```tsx
// ✅ Recommended: Server-side user agent detection
const headersList = await headers();
const userAgent = headersList.get('user-agent');

// ⚠️ Less reliable: Client-side detection
const userAgent = navigator.userAgent;
```

### 4. Add Styling When Needed

Use the `className` prop for custom styling:

```tsx
<Visibility 
  for="agents" 
  userAgent={userAgent}
  className="ai-optimized-content"
>
  {/* Content here */}
</Visibility>
```

## Testing

### Manual Testing with cURL

Test AI bot visibility:

```bash
# Test as ChatGPT bot (should see agent-only content)
curl -H "User-Agent: GPTBot/1.0" https://yoursite.com

# Test as Claude bot
curl -H "User-Agent: ClaudeBot/1.0" https://yoursite.com

# Test as regular browser (should see human-only content)
curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" https://yoursite.com
```

### Browser DevTools

1. Open DevTools → Network tab
2. Right-click → "Override User Agent"
3. Enter an AI bot user agent like `GPTBot/1.0`
4. Refresh the page

## FAQ

### Is this considered cloaking?

No. Google's spam policies define cloaking as showing different content to deceive search engines. The Visibility component:

- Supplements existing content (not replaces it)
- Provides the same information in different formats
- Helps AI understand interactive content that would otherwise be invisible

### Why use server-side rendering?

Server-side rendering ensures bot detection happens before the HTML is sent. Client-side detection requires JavaScript execution, which many AI crawlers don't perform.

### Can I customize the bot detection?

Yes! Import and extend `AI_BOT_USER_AGENTS`:

```tsx
import { AI_BOT_USER_AGENTS, isAIBot } from 'visibility-component';

const CUSTOM_BOTS = [...AI_BOT_USER_AGENTS, 'my-custom-bot'];

function isCustomBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  const lower = userAgent.toLowerCase();
  return CUSTOM_BOTS.some(agent => lower.includes(agent));
}
```

### Does this affect SEO?

No. The component provides supplemental content for AI consumption. Traditional search engine crawlers like Googlebot are not affected.

## TypeScript Support

Full TypeScript definitions are included:

```tsx
import { Visibility, VisibilityProps, VisibilityTarget } from 'visibility-component';

// Type-safe props
const props: VisibilityProps = {
  for: 'agents',
  children: <div>Content</div>,
  userAgent: 'GPTBot/1.0',
  className: 'my-class'
};

// Type checking
const target: VisibilityTarget = 'humans'; // 'agents' | 'humans'
```

## License

MIT

## Contributing

Contributions welcome! Please ensure all code is properly typed and follows the existing patterns.
