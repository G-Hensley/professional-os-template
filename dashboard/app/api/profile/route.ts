import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import { repoPath } from '@/lib/repo-path';

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
