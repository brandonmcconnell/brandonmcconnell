import { ReactNode } from 'react';

/**
 * Comprehensive list of AI bot user agents.
 * Based on research from:
 * - https://aiseotracker.com/blog/llmonly-component
 * - https://llmrefs.com/blog/llm-only-react-component
 */
const AI_BOT_USER_AGENTS = [
  // OpenAI
  'gptbot',
  'chatgpt-user',
  'oai-searchbot',
  
  // Anthropic (Claude)
  'claudebot',
  'anthropic-ai',
  'claude-web',
  
  // Perplexity
  'perplexitybot',
  
  // Google AI
  'google-extended',
  'bard',
  'gemini',
  
  // DeepSeek
  'deepseekbot',
  'deepseek-r1',
  
  // Grok (xAI)
  'grokbot',
  'xai',
  
  // Mistral
  'mistralai-user',
  
  // Cohere
  'cohere-ai',
  
  // ByteDance
  'bytespider',
  
  // Microsoft Bing
  'bingbot',
  
  // Amazon
  'amazonbot',
  
  // DuckDuckGo
  'duckassistbot',
  
  // AI2 (Allen Institute)
  'ai2bot',
  
  // Common Crawl
  'ccbot',
  
  // Omgili
  'omgili',
  
  // Diffbot
  'diffbot',
  
  // Meta/Facebook
  'facebookbot',
  'meta-externalagent',
  
  // You.com
  'youbot',
  
  // Apple
  'applebot-extended',
] as const;

export type VisibilityTarget = 'humans' | 'agents';

export interface VisibilityProps {
  /**
   * Determines who can see the content
   * - 'humans': Only visible to human users
   * - 'agents': Only visible to AI agents/bots
   */
  for: VisibilityTarget;
  
  /**
   * The content to conditionally render
   */
  children: ReactNode;
  
  /**
   * Optional user agent string. If not provided, will attempt to detect
   * from headers in Next.js server components or from navigator.userAgent
   * in client components.
   */
  userAgent?: string;
}

/**
 * Detects if the given user agent belongs to an AI bot
 */
export function isAIBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  
  const lowerUserAgent = userAgent.toLowerCase();
  return AI_BOT_USER_AGENTS.some(agent => lowerUserAgent.includes(agent));
}

/**
 * Visibility component for controlling content display between agents and humans.
 * 
 * This component allows you to show different content to AI agents (like ChatGPT, Claude,
 * Perplexity) versus human users. This is useful for providing static, parseable content
 * to AI while showing interactive UI to humans.
 * 
 * @example
 * ```tsx
 * // Interactive UI for humans
 * <Visibility for="humans">
 *   <PricingSlider />
 * </Visibility>
 * 
 * // Static content for AI agents
 * <Visibility for="agents">
 *   <h2>Pricing Plans</h2>
 *   <ul>
 *     <li>Starter: $29/month - 5 users, 10GB storage</li>
 *     <li>Pro: $99/month - 25 users, 100GB storage</li>
 *   </ul>
 * </Visibility>
 * ```
 * 
 * @example With Next.js Server Components
 * ```tsx
 * import { headers } from 'next/headers';
 * import { Visibility } from '@/components/Visibility';
 * 
 * export default async function Page() {
 *   const headersList = await headers();
 *   const userAgent = headersList.get('user-agent') || undefined;
 *   
 *   return (
 *     <Visibility for="agents" userAgent={userAgent}>
 *       <div>Content for AI agents only</div>
 *     </Visibility>
 *   );
 * }
 * ```
 */
export function Visibility({ for: target, children, userAgent }: VisibilityProps) {
  // Attempt to get user agent from various sources
  let detectedUserAgent = userAgent;
  
  // If no user agent provided, try to get from browser (client-side only)
  if (!detectedUserAgent && typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    detectedUserAgent = navigator.userAgent;
  }
  
  const isBot = isAIBot(detectedUserAgent);
  
  // Determine if content should be shown
  const shouldShow = target === 'agents' ? isBot : !isBot;
  
  if (!shouldShow) {
    return null;
  }
  
  return <>{children}</>;
}
