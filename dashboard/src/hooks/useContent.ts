import { useQuery } from '@tanstack/react-query';

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

interface ContentResponse {
  weeklyPosts: WeeklyPosts[];
  contentIdeas: unknown[];
}

async function fetchContent(): Promise<ContentResponse> {
  const res = await fetch('/api/content');
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export function useContent() {
  return useQuery({
    queryKey: ['content'],
    queryFn: fetchContent,
  });
}

export function useWeeklyPosts() {
  const { data, ...rest } = useContent();
  return {
    data: data?.weeklyPosts ?? [],
    ...rest,
  };
}

export function useCurrentWeekPosts() {
  const { data, ...rest } = useContent();
  const currentWeek = data?.weeklyPosts?.[0] ?? null;
  return {
    data: currentWeek,
    ...rest,
  };
}

export function useContentIdeas() {
  const { data, ...rest } = useContent();
  return {
    data: data?.contentIdeas ?? [],
    ...rest,
  };
}
