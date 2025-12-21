#!/usr/bin/env node

/**
 * Local test runner for Monthly Assessment Generator
 *
 * Usage:
 *   node tests/monthly-assessment/run.js              # Dry run for previous month
 *   node tests/monthly-assessment/run.js --live       # Actually generate assessment
 *   node tests/monthly-assessment/run.js --month 2025-12  # Specific month
 */

const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isLive = args.includes('--live');
const monthIdx = args.indexOf('--month');
const month = monthIdx !== -1 && args[monthIdx + 1] ? args[monthIdx + 1] : '';

const scriptPath = path.join(__dirname, '../../automation/scripts/monthly-assessment-generator.js');

console.log('=== Monthly Assessment Generator Local Test ===\n');
console.log(`Mode: ${isLive ? 'LIVE (will write files)' : 'DRY RUN (no file writes)'}`);
if (month) {
  console.log(`Month: ${month}`);
} else {
  console.log('Month: Previous month (default)');
}
console.log('');

try {
  execSync(`node ${scriptPath}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DRY_RUN: isLive ? 'false' : 'true',
      MONTH: month
    }
  });
  console.log('\n=== Test completed successfully ===');
} catch (error) {
  console.error('\n=== Test failed ===');
  process.exit(1);
}
