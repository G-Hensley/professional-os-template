import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { repoPath } from '@/lib/repo-path';

// TODO: Phase 2 (Hosted Dashboard - April 2026)
// - Add Supabase auth with GitHub OAuth to get user's access token
// - Store user's connected repo in Supabase (users table: github_repo, access_token)
// - Fetch linkedin/drafts/ and linkedin/content-ideas.json from user's GitHub repo
// - Use GitHub Trees API to list draft folders, then fetch metadata.json for each
// - Switch between local/GitHub based on NEXT_PUBLIC_DATA_SOURCE env var
// - Add caching layer to avoid GitHub API rate limits

interface LinkedInPost {
  day: string;
  theme: string;
  content: string;
  hashtags: string[];
  imageSuggestion?: string;
  imagePrompt?: string;
}

interface WeeklyPosts {
  weekStart: string;
  weekEnd: string;
  posts: LinkedInPost[];
  generatedAt: string;
}

interface RawPost {
  day: string;
  pillar: string;
  account: string;
  full_post: string;
  content: {
    hashtags: string[];
  };
  image?: {
    type?: string;
    description?: string;
    ai_prompt?: string | null;
  };
}

function getWeeklyPosts(): WeeklyPosts[] {
  try {
    const draftsDir = repoPath('linkedin', 'drafts');
    if (!existsSync(draftsDir)) return [];

    const weekFolders = readdirSync(draftsDir)
      .filter(f => {
        const folderPath = join(draftsDir, f);
        return existsSync(join(folderPath, 'metadata.json'));
      })
      .sort()
      .reverse();

    return weekFolders.slice(0, 8).map(folder => {
      const metadataPath = join(draftsDir, folder, 'metadata.json');
      const data = JSON.parse(readFileSync(metadataPath, 'utf-8'));
      return {
        weekStart: data.week_start || '',
        weekEnd: data.week_end || '',
        posts: (data.posts || []).map((p: RawPost) => ({
          day: p.day || '',
          theme: `${p.pillar || ''} (${p.account || ''})`,
          content: p.full_post || '',
          hashtags: p.content?.hashtags?.map((h: string) => h.replace(/^#/, '')) || [],
          imageSuggestion: p.image?.description || '',
          imagePrompt: p.image?.ai_prompt || '',
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
