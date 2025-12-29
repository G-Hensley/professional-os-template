import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import { repoPath } from '@/lib/repo-path';

// TODO: Phase 2 (Hosted Dashboard - April 2026)
// - Add Supabase auth with GitHub OAuth to get user's access token
// - Store user's connected repo in Supabase (users table: github_repo, access_token)
// - Fetch profile/*.json files from user's GitHub repo via GitHub Contents API
// - Switch between local/GitHub based on NEXT_PUBLIC_DATA_SOURCE env var
// - Add caching layer to avoid GitHub API rate limits

function readJSON(relativePath: string) {
  try {
    const fullPath = repoPath(relativePath);
    return JSON.parse(readFileSync(fullPath, 'utf-8'));
  } catch {
    return null;
  }
}

export async function GET() {
  const skills = readJSON('profile/skills.json');
  const experience = readJSON('profile/experience.json');
  const education = readJSON('profile/education.json');
  const contact = readJSON('profile/contact.json');
  const preferences = readJSON('profile/preferences.json');

  return NextResponse.json({
    skills,
    experience,
    education,
    contact,
    preferences,
  });
}
