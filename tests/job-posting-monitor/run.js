#!/usr/bin/env node

/**
 * Local test runner for Job Posting Monitor
 *
 * Usage:
 *   node tests/job-posting-monitor/run.js              # Dry run
 *   node tests/job-posting-monitor/run.js --live       # Actually write files
 */

const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isLive = args.includes('--live');

const scriptPath = path.join(__dirname, '../../automation/scripts/job-posting-monitor.js');

console.log('=== Job Posting Monitor Local Test ===\n');
console.log(`Mode: ${isLive ? 'LIVE (will write files)' : 'DRY RUN (no file writes)'}`);
console.log('');

// Note about Adzuna
if (!process.env.ADZUNA_APP_ID) {
  console.log('Note: ADZUNA_APP_ID not set - Adzuna results will be skipped');
  console.log('      Get free API key at: https://developer.adzuna.com/\n');
}

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
