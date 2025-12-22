#!/usr/bin/env node

/**
 * Local test runner for Weekly Summary Generator
 *
 * Usage:
 *   node tests/weekly-summary/run.js              # Dry run (no issue created)
 *   node tests/weekly-summary/run.js --live       # Actually create issue (requires GITHUB_TOKEN)
 */

const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isLive = args.includes('--live');

const scriptPath = path.join(__dirname, '../../automation/scripts/weekly-summary-generator.js');

console.log('=== Weekly Summary Generator Local Test ===\n');
console.log(`Mode: ${isLive ? 'LIVE (will create GitHub issue)' : 'DRY RUN (no issue created)'}`);

if (isLive && !process.env.GITHUB_TOKEN) {
  console.log('\nWarning: GITHUB_TOKEN not set. Set it to create an issue:');
  console.log('  export GITHUB_TOKEN=your_token_here');
  console.log('  node tests/weekly-summary/run.js --live\n');
}

console.log('');

try {
  execSync(`node ${scriptPath}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DRY_RUN: isLive ? 'false' : 'true'
    }
  });
  console.log('\n=== Test completed successfully ===');
} catch (error) {
  console.error('\n=== Test failed ===');
  process.exit(1);
}
