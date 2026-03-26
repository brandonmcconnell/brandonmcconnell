# Visibility Component for AI Agents and Humans

[![Linear Issue](https://img.shields.io/badge/Linear-ENG--7280-5E6AD2?logo=linear)](https://linear.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev/)

A React component that conditionally renders content based on whether the visitor is an AI agent (like ChatGPT, Claude, Perplexity) or a human user.

## 🎯 Purpose

Modern websites use interactive elements that AI crawlers cannot parse. When ChatGPT, Claude, or Perplexity visit your pricing page with a dynamic slider, they see an empty rectangle. When they can't find your pricing information, they pull data from competitors or outdated sources.

The `Visibility` component solves this by letting you serve:
- **Interactive UIs** to human visitors (sliders, calculators, carousels)
- **Static, structured content** to AI agents (plain text, lists, tables)

## 🚀 Quick Start

### Installation

```bash
# Copy the component to your project
cp src/components/Visibility.tsx your-project/components/
```

### Basic Usage

```tsx
import { Visibility } from '@/components/Visibility';

// In your React component or MDX file
<Visibility for="humans">
  <PricingSlider />
</Visibility>

<Visibility for="agents">
  <h2>Pricing Plans</h2>
  <ul>
    <li>Starter: $29/month - 5 users, 10GB storage</li>
    <li>Pro: $99/month - 25 users, 100GB storage</li>
    <li>Enterprise: $299/month - Unlimited users, 1TB storage</li>
  </ul>
</Visibility>
```

## 📚 Documentation

- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Comprehensive implementation guide
- **[examples/](./examples/)** - Usage examples for Next.js and MDX
- **[test/](./test/)** - Test suite and manual testing guide

## 🤖 Supported AI Bots

The component detects 30+ AI bot user agents including:

| Provider | User Agents |
|----------|------------|
| **OpenAI** | GPTBot, ChatGPT-User, OAI-SearchBot |
| **Anthropic** | ClaudeBot, anthropic-ai, claude-web |
| **Perplexity** | PerplexityBot |
| **Google** | google-extended, Gemini, Bard |
| **DeepSeek** | DeepSeekBot, deepseek-r1 |
| **xAI** | GrokBot, xai |
| **Others** | Mistral, Cohere, ByteSpider, BingBot, and more |

## 💡 Common Use Cases

### 1. Pricing Pages

Show interactive calculators to humans, static prices to AI:

```tsx
<Visibility for="humans">
  <PricingSlider />
</Visibility>

<Visibility for="agents">
  <h2>Pricing</h2>
  <ul>
    <li>Starter: $29/month</li>
    <li>Pro: $99/month</li>
    <li>Enterprise: Custom pricing</li>
  </ul>
</Visibility>
```

### 2. Documentation

Show code playgrounds to humans, static examples to AI:

```tsx
<Visibility for="humans">
  <CodePlayground />
</Visibility>

<Visibility for="agents">
  <pre><code>{`
const client = new Client({
  apiKey: 'your-api-key'
});
  `}</code></pre>
</Visibility>
```

### 3. FAQ Sections

Show accordion UI to humans, expanded content to AI:

```tsx
<Visibility for="humans">
  <AccordionFAQ />
</Visibility>

<Visibility for="agents">
  <h2>Frequently Asked Questions</h2>
  <h3>How do I get started?</h3>
  <p>Sign up at example.com/signup...</p>
</Visibility>
```

## 🔧 API Reference

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `for` | `"humans" \| "agents"` | Yes | Who can see the content |
| `children` | `ReactNode` | Yes | The content to conditionally render |
| `userAgent` | `string \| undefined` | No | Override user agent detection |

### Helper Function

```typescript
import { isAIBot } from '@/components/Visibility';

if (isAIBot(userAgent)) {
  // Render static content
}
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Manual Testing

Use curl to test with different user agents:

```bash
# Test as ChatGPT
curl -H "User-Agent: GPTBot/1.0" https://yoursite.com

# Test as Claude
curl -H "User-Agent: ClaudeBot/1.0" https://yoursite.com

# Test as regular browser
curl -H "User-Agent: Mozilla/5.0" https://yoursite.com
```

### Browser DevTools

1. Open DevTools (F12)
2. Open Command Palette (Ctrl+Shift+P)
3. Type "Show Network conditions"
4. Uncheck "Use browser default"
5. Enter `GPTBot/1.0`
6. Refresh page

## 📖 Research & Background

This implementation is based on:

1. **[LLMOnly Component Guide](https://aiseotracker.com/blog/llmonly-component)**
   - Comprehensive AI bot detection patterns
   - Best practices for serving content to AI

2. **[LLM-only React Component](https://llmrefs.com/blog/llm-only-react-component)**
   - React implementation patterns
   - Real-world use cases and examples

## ⚡ Performance

- ✅ Zero external dependencies
- ✅ Server-side rendering support
- ✅ No client-side JavaScript overhead
- ✅ Simple string matching (microseconds)

## 🔒 SEO & Cloaking

**This is NOT cloaking.** The component provides the same information in different formats to serve technical needs (AI can't run JavaScript). This is similar to providing alt text for images or transcripts for videos.

Reference: [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies#hidden-text-and-links)

## 🎨 TypeScript Support

Fully typed with strict TypeScript:
- No `any` types (explicit or implicit)
- Proper union types
- Complete IntelliSense support

## 📝 v1 Scope

**Included:**
- ✅ Page/markdown display differences
- ✅ Traffic-type detection
- ✅ MDX component usage
- ✅ Server and client support

**Excluded (future versions):**
- ⏭️ Search indexing behavior
- ⏭️ MCP integration
- ⏭️ Assistant quoting behavior
- ⏭️ Computer use agent handling

## 🤝 Contributing

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for:
- Architecture details
- Design decisions
- Adding new AI bots
- Migration guides

## 📄 License

Part of the Mintlify project - see project license for details.

## 🔗 Related Resources

- [Linear Issue ENG-7280](https://linear.app)
- [AI SEO Tracker](https://aiseotracker.com/)
- [LLM Refs](https://llmrefs.com/)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

<div align="center">

**Built for [Mintlify](https://mintlify.com/) with ❤️**

Show the right content to the right audience

</div>
