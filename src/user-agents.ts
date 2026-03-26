/**
 * List of known AI bot user agents for detection
 * Based on major LLM crawlers and AI assistants
 */
export const AI_BOT_USER_AGENTS = [
  // OpenAI
  'gptbot',
  'chatgpt-user',
  'oai-searchbot',
  
  // Anthropic
  'claudebot',
  'anthropic-ai',
  'claude-web',
  
  // Mistral
  'mistralai-user',
  
  // ByteDance
  'bytespider',
  
  // Cohere
  'cohere-ai',
  
  // Perplexity
  'perplexitybot',
  
  // Google
  'google-extended',
  'bard',
  'gemini',
  
  // DeepSeek
  'deepseekbot',
  'deepseek-r1',
  
  // xAI (Grok)
  'grokbot',
  'xai',
  
  // Microsoft
  'bingbot',
  
  // Amazon
  'amazonbot',
  
  // DuckDuckGo
  'duckassistbot',
  
  // AI2
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

/**
 * Detects if a user agent string belongs to an AI bot
 * @param userAgent - The user agent string to check
 * @returns true if the user agent is an AI bot, false otherwise
 */
export function isAIBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) {
    return false;
  }
  
  const lowerUserAgent = userAgent.toLowerCase();
  return AI_BOT_USER_AGENTS.some(agent => lowerUserAgent.includes(agent));
}
