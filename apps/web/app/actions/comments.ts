"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export async function createComment(storyId: string, content: string, parentId?: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const authorId = session.user.id;

  // Verify story exists
  const story = await prisma.story.findUnique({
    where: { id: storyId },
    select: { authorId: true },
  });

  if (!story) throw new Error("Story not found");

  const comment = await prisma.comment.create({
    data: {
      content,
      storyId,
      authorId,
      parentId: parentId || null,
    },
  });

  // Create notification
  if (parentId) {
    // Notify the parent comment author
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
      select: { authorId: true },
    });
    if (parentComment && parentComment.authorId !== authorId) {
      await prisma.notification.create({
        data: {
          userId: parentComment.authorId,
          actorId: authorId,
          type: "REPLY",
          storyId,
          commentId: comment.id,
        },
      });
    }
  } else if (story.authorId !== authorId) {
    // Notify story author
    await prisma.notification.create({
      data: {
        userId: story.authorId,
        actorId: authorId,
        type: "COMMENT",
        storyId,
        commentId: comment.id,
      },
    });
  }

  revalidatePath(`/story/${storyId}`);
  return comment;
}

export async function editComment(commentId: string, content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("Comment not found");
  if (comment.authorId !== session.user.id) throw new Error("Unauthorized");

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });

  revalidatePath(`/story/${comment.storyId}`);
  return updated;
}

export async function deleteComment(commentId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new Error("Comment not found");
  if (comment.authorId !== session.user.id) throw new Error("Unauthorized");

  await prisma.comment.delete({
    where: { id: commentId },
  });

  revalidatePath(`/story/${comment.storyId}`);
}

export async function getComments(storyId: string) {
  // Fetch top level comments and their replies (1 level deep)
  const comments = await prisma.comment.findMany({
    where: {
      storyId,
      parentId: null,
    },
    orderBy: { createdAt: "asc" },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
      replies: {
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return comments;
}
