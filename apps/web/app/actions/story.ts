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

export async function updateStory(
  id: string,
  userId: string,
  data: {
    title?: string;
    subtitle?: string;
    content?: string;
    coverImage?: string;
    genre?: string;
    tags?: string[];
  }
) {
  if (!userId) {
    throw new Error("User ID is required to update a story");
  }

  // Ensure user owns the story
  const existing = await prisma.story.findUnique({ where: { id } });
  if (!existing || existing.authorId !== userId) {
    throw new Error("Unauthorized");
  }

  // Basic Validations
  if (data.title && data.title.length > 100) throw new Error("Title too long (max 100 characters)");
  if (data.subtitle && data.subtitle.length > 200) throw new Error("Subtitle too long (max 200 characters)");
  if (data.tags && data.tags.length > 5) throw new Error("Maximum 5 tags allowed");
  if (data.tags && data.tags.some(t => t.length > 20)) throw new Error("Each tag must be 20 characters or less");

  const updatedStory = await prisma.story.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
      ...(data.genre !== undefined && { genre: data.genre }),
      ...(data.tags !== undefined && { tags: data.tags }),
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

  if (!existing.title || !existing.content) {
    throw new Error("Title and content are required to publish");
  }

  const updatedStory = await prisma.story.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  revalidatePath("/dashboard");
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (user?.username) {
    revalidatePath(`/user/${user.username}`);
  }

  return { success: true, story: updatedStory };
}

export async function unpublishStory(id: string, userId: string) {
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.story.findUnique({ where: { id } });
  if (!existing || existing.authorId !== userId) throw new Error("Unauthorized");

  const updatedStory = await prisma.story.update({
    where: { id },
    data: {
      status: "DRAFT",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/feed");
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (user?.username) {
    revalidatePath(`/user/${user.username}`);
  }

  return { success: true, story: updatedStory };
}

export async function deleteStory(id: string, userId: string) {
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.story.findUnique({ where: { id } });
  if (!existing || existing.authorId !== userId) throw new Error("Unauthorized");

  await prisma.story.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/feed");
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (user?.username) {
    revalidatePath(`/user/${user.username}`);
  }

  return { success: true };
}
