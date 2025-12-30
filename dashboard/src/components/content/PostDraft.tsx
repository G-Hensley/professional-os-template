'use client';

import { useState } from 'react';
import { Card } from '@/src/components/ui';
import { Clipboard, Image as ImageIcon, Sparkles } from 'lucide-react';

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
  const [copiedHashtags, setCopiedHashtags] = useState(false);

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

  const handleCopyHashtags = async () => {
    try {
      await navigator.clipboard.writeText(post.hashtags.join(' '));
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    } catch (err) {
      console.error('Failed to copy hashtags:', err);
    }
  };

  const hasImageSuggestion = post.imageSuggestion && post.imageSuggestion.trim() !== '';
  const hasImagePrompt = post.imagePrompt && post.imagePrompt.trim() !== '';
  const hasHashtags = post.hashtags && post.hashtags.length > 0;

  return (
    <Card className="w-full" aria-labelledby={`post-${post.day.toLowerCase()}`}>
      <div className="mb-3">
        <h3
          id={`post-${post.day.toLowerCase()}`}
          className="text-cyan-200 font-medium flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-cyan-300/70" aria-hidden="true" />
          {post.day} - {post.theme}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-cyan-100/90 text-sm whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {hasHashtags && (
        <div className="mb-4 p-3 surface-3 rounded-lg">
          <p className="text-xs text-cyan-200 font-medium mb-2">Hashtags</p>
          <p className="text-cyan-100/90 text-sm">{post.hashtags.join(' ')}</p>
        </div>
      )}

      {(hasImageSuggestion || hasImagePrompt) && (
        <div className="mb-4 p-3 surface-3 rounded-lg">
          <p className="text-xs text-cyan-200 font-medium mb-2 flex items-center gap-2">
            <ImageIcon className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden="true" />
            Image
          </p>
          {hasImageSuggestion && (
            <p className="text-cyan-100/90 text-sm">{post.imageSuggestion}</p>
          )}
          {hasImagePrompt && (
            <div className="mt-2">
              <p className="text-xs text-muted mb-1">AI Prompt:</p>
              <p className="text-muted text-sm italic">{post.imagePrompt}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-3 border-t border-cyan-900/40">
        <button
          onClick={handleCopyPost}
          className="btn-secondary text-xs"
          aria-label={`Copy ${post.day} post`}
        >
          <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
          {copied ? '✓ Copied!' : 'Copy Post'}
        </button>
        {hasHashtags && (
          <button
            onClick={handleCopyHashtags}
            className="btn-secondary text-xs"
            aria-label={`Copy ${post.day} hashtags`}
          >
            <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
            {copiedHashtags ? '✓ Copied!' : 'Copy Hashtags'}
          </button>
        )}
        {hasImagePrompt && (
          <button
            onClick={handleCopyImagePrompt}
            className="btn-secondary text-xs"
            aria-label={`Copy ${post.day} image prompt`}
          >
            <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {copiedImagePrompt ? '✓ Copied!' : 'Copy Image Prompt'}
          </button>
        )}
      </div>
    </Card>
  );
}

export { PostDraft };
export type { LinkedInPost };
