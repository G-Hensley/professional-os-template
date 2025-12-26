import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { repoPath } from '@/lib/repo-path';

interface LinkedInPost {
  day: string;
  theme: string;
  content: string;
  hashtags: string[];
  imagePrompt?: string;
}

interface WeeklyPosts {
  weekStart: string;
  weekEnd: string;
  posts: LinkedInPost[];
  generatedAt: string;
}

function getWeeklyPosts(): WeeklyPosts[] {
  try {
    const logsDir = repoPath('logs', 'linkedin-posts');
    if (!existsSync(logsDir)) return [];

    const files = readdirSync(logsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();

    return files.slice(0, 8).map(f => {
      const filePath = join(logsDir, f);
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));
      return {
        weekStart: data.week_start || '',
        weekEnd: data.week_end || '',
        posts: (data.posts || []).map((p: Record<string, unknown>) => ({
          day: p.day || '',
          theme: p.theme || '',
          content: p.content || '',
          hashtags: p.hashtags || [],
          imagePrompt: p.image_prompt || '',
        })),
        generatedAt: data.generated_at || '',
      };
    });
  } catch {
    return [];
  }
}

function getContentIdeas() {
  try {
    const ideasPath = repoPath('linkedin', 'content-ideas.json');
    if (!existsSync(ideasPath)) return [];
    return JSON.parse(readFileSync(ideasPath, 'utf-8'));
  } catch {
    return [];
  }
}

export async function GET() {
  const weeklyPosts = getWeeklyPosts();
  const contentIdeas = getContentIdeas();

  return NextResponse.json({
    weeklyPosts,
    contentIdeas,
  });
}
