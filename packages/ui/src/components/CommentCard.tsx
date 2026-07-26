"use client";

import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { Text } from "./Text";
import { CommentComposer } from "./CommentComposer";
import { cn } from "../utils/cn";

export interface CommentCardProps {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string | null;
  createdAt: Date;
  isOwner: boolean;
  onEdit?: (id: string, newContent: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onReply?: (content: string) => Promise<void>;
  currentUserAvatar?: string | null;
  currentUserName?: string;
  className?: string;
}

export function CommentCard({
  id,
  content,
  authorName,
  authorUsername,
  authorAvatar,
  createdAt,
  isOwner,
  onEdit,
  onDelete,
  onReply,
  currentUserAvatar,
  currentUserName,
  className,
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    if (confirm("Are you sure you want to delete this comment?")) {
      setIsDeleting(true);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Failed to delete comment", error);
        setIsDeleting(false);
      }
    }
  };

  const handleEditSubmit = async (newContent: string) => {
    if (!onEdit) return;
    await onEdit(id, newContent);
    setIsEditing(false);
  };

  const handleReplySubmit = async (replyContent: string) => {
    if (!onReply) return;
    await onReply(replyContent);
    setIsReplying(false);
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: new Date().getFullYear() !== createdAt.getFullYear() ? "numeric" : undefined,
  }).format(createdAt);

  return (
    <div className={cn("flex gap-3", className, isDeleting && "opacity-50 pointer-events-none")}>
      <a href={`/user/${authorUsername}`}>
        <Avatar src={authorAvatar || null} fallback={authorName[0] || "?"} size="md" className="mt-1 hover:ring-2 ring-[var(--primary)] transition-all" />
      </a>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href={`/user/${authorUsername}`}>
              <Text className="font-semibold text-sm hover:underline">{authorName}</Text>
            </a>
            <Text className="text-xs text-[var(--text-muted)]">{formattedDate}</Text>
          </div>
          
          {isOwner && !isEditing && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setIsEditing(true)} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-base)] px-2 py-1" aria-label="Edit comment">
                Edit
              </button>
              <button onClick={handleDelete} className="text-xs text-[var(--text-muted)] hover:text-red-500 px-2 py-1" aria-label="Delete comment">
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <CommentComposer
              currentUserName={currentUserName || authorName}
              currentUserAvatar={currentUserAvatar}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditing(false)}
              autoFocus
            />
          </div>
        ) : (
          <Text className="text-[var(--text-secondary)] text-sm whitespace-pre-wrap">{content}</Text>
        )}

        {!isEditing && onReply && (
          <div className="mt-2">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-base)]"
            >
              Reply
            </button>
          </div>
        )}

        {isReplying && onReply && currentUserName && (
          <div className="mt-4 pl-4 border-l-2 border-[var(--border-subtle)]">
            <CommentComposer
              currentUserName={currentUserName}
              currentUserAvatar={currentUserAvatar}
              onSubmit={handleReplySubmit}
              onCancel={() => setIsReplying(false)}
              placeholder={`Reply to ${authorName}...`}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}
