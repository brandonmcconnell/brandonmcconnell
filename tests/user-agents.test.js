/**
 * Simple tests for user-agent detection
 */

const { isAIBot } = require('../dist/user-agents');

// Test cases
const testCases = [
  // AI Bots - should return true
  { userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0)', expected: true, name: 'GPTBot' },
  { userAgent: 'ClaudeBot/1.0', expected: true, name: 'ClaudeBot' },
  { userAgent: 'Mozilla/5.0 (compatible; PerplexityBot/1.0)', expected: true, name: 'PerplexityBot' },
  { userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) Google-Extended', expected: true, name: 'Google-Extended' },
  { userAgent: 'DeepSeekBot/1.0', expected: true, name: 'DeepSeekBot' },
  { userAgent: 'GrokBot/1.0', expected: true, name: 'GrokBot' },
  { userAgent: 'Anthropic-AI', expected: true, name: 'Anthropic-AI' },
  
  // Regular browsers - should return false
  { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', expected: false, name: 'Chrome' },
  { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', expected: false, name: 'Chrome macOS' },
  { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0', expected: false, name: 'Firefox' },
  { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15', expected: false, name: 'Safari' },
  
  // Edge cases
  { userAgent: null, expected: false, name: 'null user agent' },
  { userAgent: undefined, expected: false, name: 'undefined user agent' },
  { userAgent: '', expected: false, name: 'empty string' },
];

// Run tests
console.log('Running user-agent detection tests...\n');

let passed = 0;
let failed = 0;

testCases.forEach(({ userAgent, expected, name }) => {
  const result = isAIBot(userAgent);
  const status = result === expected ? '✓' : '✗';
  
  if (result === expected) {
    passed++;
    console.log(`${status} PASS: ${name}`);
  } else {
    failed++;
    console.log(`${status} FAIL: ${name} (expected ${expected}, got ${result})`);
    console.log(`   User Agent: ${userAgent}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}

console.log('\n✓ All tests passed!');
