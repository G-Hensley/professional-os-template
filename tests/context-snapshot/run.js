#!/usr/bin/env node

/**
 * Local test runner for Context Snapshot
 *
 * Usage:
 *   node tests/context-snapshot/run.js           # Dry run (default)
 *   node tests/context-snapshot/run.js --live    # Actually write files
 */

const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isLive = args.includes('--live');

const scriptPath = path.join(__dirname, '../../automation/scripts/context-snapshot.js');

console.log('=== Context Snapshot Local Test ===\n');
console.log(`Mode: ${isLive ? 'LIVE (will write files)' : 'DRY RUN (no changes)'}\n`);

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
