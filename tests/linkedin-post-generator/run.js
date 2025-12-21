#!/usr/bin/env node

/**
 * Local test runner for LinkedIn Post Generator
 *
 * Usage:
 *   node tests/linkedin-post-generator/run.js           # Dry run (default)
 *   node tests/linkedin-post-generator/run.js --live    # Actually generate posts (requires OPENAI_API_KEY)
 *   node tests/linkedin-post-generator/run.js --week -1 # Generate for last week
 */

const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isLive = args.includes('--live');
const weekIdx = args.indexOf('--week');
const weekOffset = weekIdx !== -1 && args[weekIdx + 1] ? args[weekIdx + 1] : '0';

const scriptPath = path.join(__dirname, '../../automation/scripts/linkedin-post-generator.js');

console.log('=== LinkedIn Post Generator Local Test ===\n');
console.log(`Mode: ${isLive ? 'LIVE (will call OpenAI API)' : 'DRY RUN (no API calls)'}`);
console.log(`Week offset: ${weekOffset}\n`);

if (isLive && !process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is required for live mode');
  console.error('Set it with: export OPENAI_API_KEY=your-key-here');
  process.exit(1);
}

try {
  execSync(`node ${scriptPath}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DRY_RUN: isLive ? 'false' : 'true',
      WEEK_OFFSET: weekOffset
    }
  });
  console.log('\n=== Test completed successfully ===');
} catch (error) {
  console.error('\n=== Test failed ===');
  process.exit(1);
}
