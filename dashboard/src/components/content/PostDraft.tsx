'use client';

import { useState } from 'react';
import { Card } from '@/src/components/ui';

interface LinkedInPost {
  day: string;
  theme: string;
  content: string;
  hashtags: string[];
  imageSuggestion?: string;
  imagePrompt?: string;
}

interface PostDraftProps {
  post: LinkedInPost;
}

function PostDraft({ post }: PostDraftProps) {
  const [copied, setCopied] = useState(false);
  const [copiedImagePrompt, setCopiedImagePrompt] = useState(false);

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy post:', err);
    }
  };

  const handleCopyImagePrompt = async () => {
    try {
      await navigator.clipboard.writeText(post.imagePrompt || '');
      setCopiedImagePrompt(true);
      setTimeout(() => setCopiedImagePrompt(false), 2000);
    } catch (err) {
      console.error('Failed to copy image prompt:', err);
    }
  };

  const hasImageSuggestion = post.imageSuggestion && post.imageSuggestion.trim() !== '';
  const hasImagePrompt = post.imagePrompt && post.imagePrompt.trim() !== '';

  return (
    <Card className="w-full" aria-labelledby={`post-${post.day.toLowerCase()}`}>
      <div className="mb-3">
        <h3
          id={`post-${post.day.toLowerCase()}`}
          className="text-cyan-200 font-medium"
        >
          {post.day} - {post.theme}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {(hasImageSuggestion || hasImagePrompt) && (
        <div className="mb-4 p-3 bg-slate-700/50 rounded">
          <p className="text-xs text-cyan-400 font-medium mb-2">Image</p>
          {hasImageSuggestion && (
            <p className="text-gray-300 text-sm">{post.imageSuggestion}</p>
          )}
          {hasImagePrompt && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-1">AI Prompt:</p>
              <p className="text-gray-400 text-sm italic">{post.imagePrompt}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700">
        <button
          onClick={handleCopyPost}
          className="px-3 py-1 text-xs bg-slate-700 text-cyan-300 rounded hover:bg-slate-600 transition-colors cursor-pointer"
          aria-label={`Copy ${post.day} post`}
        >
          {copied ? '✓ Copied!' : 'Copy Post'}
        </button>
        {hasImagePrompt && (
          <button
            onClick={handleCopyImagePrompt}
            className="px-3 py-1 text-xs bg-slate-700 text-cyan-300 rounded hover:bg-slate-600 transition-colors cursor-pointer"
            aria-label={`Copy ${post.day} image prompt`}
          >
            {copiedImagePrompt ? '✓ Copied!' : 'Copy Image Prompt'}
          </button>
        )}
      </div>
    </Card>
  );
}

export { PostDraft };
export type { LinkedInPost };
