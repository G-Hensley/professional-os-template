import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

function readJSON(relativePath: string) {
  try {
    const fullPath = join(process.cwd(), '..', relativePath);
    return JSON.parse(readFileSync(fullPath, 'utf-8'));
  } catch {
    return null;
  }
}

export async function GET() {
  const active = readJSON('projects/active.json') || {};
  const planned = readJSON('projects/planned.json') || {};
  const completed = readJSON('projects/completed.json') || {};

  return NextResponse.json({
    active: Object.values(active),
    planned: Object.values(planned),
    completed: Object.values(completed),
  });
}
