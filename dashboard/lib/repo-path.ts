import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Resolves the repository root path.
 *
 * Priority:
 * 1. REPO_ROOT environment variable (for production/Vercel)
 * 2. Detect based on dashboard location (local development)
 */
export function getRepoRoot(): string {
  // Use environment variable if set
  if (process.env.REPO_ROOT) {
    return process.env.REPO_ROOT;
  }

  // Local development: dashboard is inside the repo
  // cwd() is dashboard/, so parent is repo root
  const parentDir = join(process.cwd(), '..');

  // Verify we found the repo by checking for CLAUDE.md
  if (existsSync(join(parentDir, 'CLAUDE.md'))) {
    return parentDir;
  }

  // Fallback: assume cwd is repo root (e.g., running from repo root)
  if (existsSync(join(process.cwd(), 'CLAUDE.md'))) {
    return process.cwd();
  }

  // Last resort: use parent anyway
  console.warn('Could not verify repo root, using parent directory');
  return parentDir;
}

/**
 * Resolves a path relative to the repository root.
 */
export function repoPath(...segments: string[]): string {
  return join(getRepoRoot(), ...segments);
}
