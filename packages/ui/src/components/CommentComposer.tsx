"use client";

import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { cn } from "../utils/cn";

export interface CommentComposerProps {
  currentUserAvatar?: string | null | undefined;
  currentUserName: string;
  placeholder?: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export function CommentComposer({
  currentUserAvatar,
  currentUserName,
  placeholder = "Write a response...",
  onSubmit,
  onCancel,
  className,
  autoFocus = false,
}: CommentComposerProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent("");
      if (onCancel) onCancel(); // Auto close if it's a reply composer
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex gap-3 items-start", className)}>
      <Avatar
        src={currentUserAvatar || null}
        fallback={currentUserName[0] || "?"}
        size="md"
        className="mt-1"
      />
      <form onSubmit={handleSubmit} className="flex-1 space-y-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          disabled={isSubmitting}
          autoFocus={autoFocus}
          className="min-h-[80px] bg-[var(--surface-sunken)] border-[var(--border-subtle)] focus:bg-[var(--surface-base)] transition-colors"
          aria-label={placeholder}
        />
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Respond"}
          </Button>
        </div>
      </form>
    </div>
  );
}
