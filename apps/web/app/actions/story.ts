"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

export async function createStory(userId: string, title: string) {
  if (!userId) {
    throw new Error("User ID is required to create a story");
  }

  const story = await prisma.story.create({
    data: {
      title,
      content: "",
      authorId: userId,
      status: "DRAFT",
    },
  });

  revalidatePath("/dashboard");
  return { success: true, story };
}

export async function updateStory(id: string, userId: string, data: { title?: string; content?: string }) {
  if (!userId) {
    throw new Error("User ID is required to update a story");
  }

  // Ensure user owns the story
  const existing = await prisma.story.findUnique({ where: { id } });
  if (!existing || existing.authorId !== userId) {
    throw new Error("Unauthorized");
  }

  const updatedStory = await prisma.story.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.content !== undefined && { content: data.content }),
    },
  });

  return { success: true, story: updatedStory };
}

export async function publishStory(id: string, userId: string) {
  if (!userId) {
    throw new Error("User ID is required to publish a story");
  }

  const existing = await prisma.story.findUnique({ where: { id } });
  if (!existing || existing.authorId !== userId) {
    throw new Error("Unauthorized");
  }

  const updatedStory = await prisma.story.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  // Since it's published, it might now appear on the public user profile or feeds
  revalidatePath("/dashboard");
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (user?.username) {
    revalidatePath(`/user/${user.username}`);
  }

  return { success: true, story: updatedStory };
}
