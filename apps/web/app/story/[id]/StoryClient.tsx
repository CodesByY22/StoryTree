"use client";

import React, { useState, useEffect } from "react";
import { Heading, Text, Avatar, Button, CommentThread, CommentComposer, CommentCardProps } from "@repo/ui";
import { toggleLike, toggleBookmark } from "../../actions/feed";
import { getComments, createComment, editComment, deleteComment } from "../../actions/comments";
import { updateReadingProgress } from "../../actions/recommendations";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StoryClientProps {
  initialData: {
    id: string;
    title: string;
    subtitle: string | null;
    content: string;
    publishedAt: Date | null;
    createdAt: Date;
    author: {
      name: string;
      username: string | null;
      image: string | null;
      displayName: string | null;
    };
    likesCount: number;
    bookmarksCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
  };
  userId: string | undefined;
  currentUserName: string;
  currentUserAvatar: string | null;
}

export function StoryClient({ initialData, userId, currentUserName, currentUserAvatar }: StoryClientProps) {
  const router = useRouter();
  const [story, setStory] = useState(initialData);
  const [comments, setComments] = useState<Array<{
    id: string;
    content: string;
    authorId: string;
    createdAt: Date;
    author: { name: string; username: string | null; image: string | null; };
    replies?: Array<{
      id: string;
      content: string;
      authorId: string;
      createdAt: Date;
      author: { name: string; username: string | null; image: string | null; };
    }>;
  }>>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const fetchComments = async () => {
    try {
      const data = await getComments(story.id);
      // We can use an unknown cast first to bypass deep type mismatches in replies if any
      setComments(data as unknown as typeof comments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
    
    // Simple read tracking: update progress after 3 seconds of being on the page
    if (userId) {
      const timer = setTimeout(() => {
        updateReadingProgress(story.id, userId, 50).catch(console.error);
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story.id, userId]);

  const handleLike = async () => {
    if (!userId) return router.push("/auth/login");
    setStory((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
    await toggleLike(story.id, userId);
  };

  const handleBookmark = async () => {
    if (!userId) return router.push("/auth/login");
    setStory((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
      bookmarksCount: prev.isBookmarked ? prev.bookmarksCount - 1 : prev.bookmarksCount + 1,
    }));
    await toggleBookmark(story.id, userId);
  };

  const handleCreateComment = async (content: string) => {
    if (!userId) return router.push("/auth/login");
    await createComment(story.id, content);
    await fetchComments();
  };

  const handleReplyComment = async (parentId: string, content: string) => {
    if (!userId) return router.push("/auth/login");
    await createComment(story.id, content, parentId);
    await fetchComments();
  };

  const handleEditComment = async (commentId: string, content: string) => {
    await editComment(commentId, content);
    await fetchComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    await fetchComments();
  };

  const mapCommentToUI = (c: { id: string; content: string; authorId: string; createdAt: Date; author: { name: string; username: string | null; image: string | null; } }): CommentCardProps => ({
    id: c.id,
    content: c.content,
    authorId: c.authorId,
    authorName: c.author.name || "Unknown",
    authorUsername: c.author.username || "unknown",
    authorAvatar: c.author.image,
    createdAt: c.createdAt,
    isOwner: c.authorId === userId,
    onEdit: handleEditComment,
    onDelete: handleDeleteComment,
    currentUserAvatar,
    currentUserName,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Story Header */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-6">
        <Heading level="h1" className="text-4xl font-extrabold">{story.title}</Heading>
        {story.subtitle && <Heading level="h3" className="text-xl text-[var(--text-secondary)] font-normal">{story.subtitle}</Heading>}
        
        <div className="flex items-center justify-between pt-4">
          <Link href={`/user/${story.author.username}`} className="flex items-center gap-3 hover:opacity-80">
            <Avatar src={story.author.image} fallback={story.author.name?.[0] || "?"} size="lg" />
            <div>
              <Text className="font-semibold">{story.author.displayName || story.author.name}</Text>
              <Text className="text-sm text-[var(--text-muted)]">@{story.author.username}</Text>
            </div>
          </Link>
          <Text className="text-sm text-[var(--text-muted)]">
            {new Date(story.publishedAt || story.createdAt).toLocaleDateString()}
          </Text>
        </div>
      </div>

      {/* Story Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Placeholder for markdown rendering */}
        <Text className="whitespace-pre-wrap">{story.content}</Text>
      </div>

      {/* Engagement Actions */}
      <div className="flex items-center gap-4 py-4 border-y border-[var(--border-subtle)]">
        <Button variant={story.isLiked ? "primary" : "outline"} onClick={handleLike}>
          {story.isLiked ? "Unlike" : "Like"} ({story.likesCount})
        </Button>
        <Button variant={story.isBookmarked ? "primary" : "outline"} onClick={handleBookmark}>
          {story.isBookmarked ? "Saved" : "Save"} ({story.bookmarksCount})
        </Button>
      </div>

      {/* Comments Section */}
      <div className="space-y-6 pt-4">
        <Heading level="h3">Comments</Heading>
        
        {userId ? (
          <CommentComposer
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
            onSubmit={handleCreateComment}
          />
        ) : (
          <Text className="text-[var(--text-secondary)]">
            <Link href="/auth/login" className="text-[var(--primary)] hover:underline">Log in</Link> to join the conversation.
          </Text>
        )}

        <div className="space-y-8 mt-8">
          {loadingComments ? (
            <Text>Loading comments...</Text>
          ) : comments.length === 0 ? (
            <Text className="text-[var(--text-muted)]">No comments yet. Be the first!</Text>
          ) : (
            comments.map((comment) => (
              <CommentThread
                key={comment.id}
                comment={{
                  ...mapCommentToUI(comment),
                  onReply: (content) => handleReplyComment(comment.id, content),
                }}
                replies={comment.replies?.map(mapCommentToUI) || []}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
