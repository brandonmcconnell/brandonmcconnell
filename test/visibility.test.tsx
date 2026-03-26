/**
 * Tests for the Visibility component
 * 
 * These tests verify that the component correctly detects AI bots and
 * shows/hides content appropriately.
 */

import { describe, it, expect } from '@jest/globals';
import { isAIBot } from '../src/components/Visibility';

describe('isAIBot', () => {
  describe('OpenAI bots', () => {
    it('should detect GPTBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.0; +https://openai.com/gptbot')).toBe(true);
    });

    it('should detect ChatGPT-User', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot')).toBe(true);
    });

    it('should detect OAI-SearchBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot')).toBe(true);
    });
  });

  describe('Anthropic bots', () => {
    it('should detect ClaudeBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +https://www.anthropic.com/claudebot')).toBe(true);
    });

    it('should detect anthropic-ai', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 anthropic-ai')).toBe(true);
    });

    it('should detect claude-web', () => {
      expect(isAIBot('Mozilla/5.0 claude-web/1.0')).toBe(true);
    });
  });

  describe('Other AI bots', () => {
    it('should detect PerplexityBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0')).toBe(true);
    });

    it('should detect Google Extended', () => {
      expect(isAIBot('Mozilla/5.0 (compatible; Google-Extended/1.0; +http://www.google.com/bot.html)')).toBe(true);
    });

    it('should detect Gemini', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 Gemini/1.0')).toBe(true);
    });

    it('should detect DeepSeekBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 DeepSeekBot/1.0')).toBe(true);
    });

    it('should detect GrokBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 GrokBot/1.0')).toBe(true);
    });

    it('should detect Cohere-AI', () => {
      expect(isAIBot('Mozilla/5.0 cohere-ai bot')).toBe(true);
    });
  });

  describe('Regular browsers', () => {
    it('should not detect Chrome as a bot', () => {
      expect(isAIBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')).toBe(false);
    });

    it('should not detect Firefox as a bot', () => {
      expect(isAIBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0')).toBe(false);
    });

    it('should not detect Safari as a bot', () => {
      expect(isAIBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15')).toBe(false);
    });

    it('should not detect Edge as a bot', () => {
      expect(isAIBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0')).toBe(false);
    });

    it('should not detect mobile Safari as a bot', () => {
      expect(isAIBot('Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should handle null user agent', () => {
      expect(isAIBot(null)).toBe(false);
    });

    it('should handle undefined user agent', () => {
      expect(isAIBot(undefined)).toBe(false);
    });

    it('should handle empty string user agent', () => {
      expect(isAIBot('')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(isAIBot('GPTBOT/1.0')).toBe(true);
      expect(isAIBot('ClAuDeBoT/1.0')).toBe(true);
      expect(isAIBot('PERPLEXITYBOT')).toBe(true);
    });
  });

  describe('Meta/Facebook bots', () => {
    it('should detect FacebookBot', () => {
      expect(isAIBot('facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php) facebookbot')).toBe(true);
    });

    it('should detect Meta-ExternalAgent', () => {
      expect(isAIBot('Mozilla/5.0 (compatible; meta-externalagent/1.0)')).toBe(true);
    });
  });

  describe('Other commercial bots', () => {
    it('should detect ByteSpider', () => {
      expect(isAIBot('Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; https://zhanzhang.toutiao.com/)')).toBe(true);
    });

    it('should detect BingBot', () => {
      expect(isAIBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm')).toBe(true);
    });

    it('should detect AmazonBot', () => {
      expect(isAIBot('Mozilla/5.0 (compatible; Amazonbot/1.0; +https://developer.amazon.com/amazonbot)')).toBe(true);
    });

    it('should detect YouBot', () => {
      expect(isAIBot('Mozilla/5.0 (compatible; YouBot/1.0; +https://about.you.com/youbot)')).toBe(true);
    });
  });
});

describe('Visibility Component Behavior', () => {
  it('should show content to agents when for="agents" and user is a bot', () => {
    // This would require React Testing Library or similar
    // Example structure:
    // const { container } = render(<Visibility for="agents" userAgent="GPTBot/1.0">Content</Visibility>);
    // expect(container).toHaveTextContent('Content');
  });

  it('should hide content from humans when for="agents" and user is not a bot', () => {
    // const { container } = render(<Visibility for="agents" userAgent="Mozilla/5.0...">Content</Visibility>);
    // expect(container).toBeEmptyDOMElement();
  });

  it('should show content to humans when for="humans" and user is not a bot', () => {
    // const { container } = render(<Visibility for="humans" userAgent="Mozilla/5.0...">Content</Visibility>);
    // expect(container).toHaveTextContent('Content');
  });

  it('should hide content from agents when for="humans" and user is a bot', () => {
    // const { container } = render(<Visibility for="humans" userAgent="GPTBot/1.0">Content</Visibility>);
    // expect(container).toBeEmptyDOMElement();
  });
});

/**
 * Manual Testing Guide
 * 
 * To test the component with real AI bots, use curl with different user agents:
 * 
 * Test as ChatGPT:
 * curl -H "User-Agent: GPTBot/1.0" https://yoursite.com
 * 
 * Test as Claude:
 * curl -H "User-Agent: ClaudeBot/1.0" https://yoursite.com
 * 
 * Test as Perplexity:
 * curl -H "User-Agent: PerplexityBot/1.0" https://yoursite.com
 * 
 * Test as regular browser:
 * curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" https://yoursite.com
 * 
 * In browser DevTools:
 * 1. Open DevTools (F12)
 * 2. Go to Network Conditions (Ctrl+Shift+P -> "Show Network conditions")
 * 3. Uncheck "Use browser default" under User agent
 * 4. Enter a bot user agent like "GPTBot/1.0"
 * 5. Refresh the page
 */
