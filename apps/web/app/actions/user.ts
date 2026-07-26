"use server";

import { prisma, Prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(userId: string, data: {
  username?: string;
  displayName?: string;
  bio?: string;
  favoriteGenres?: string;
  preferences?: Prisma.InputJsonValue;
}) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Ensure username uniqueness if provided
  if (data.username) {
    const existing = await prisma.user.findFirst({
      where: {
        username: data.username,
        NOT: { id: userId },
      },
    });

    if (existing) {
      throw new Error("Username is already taken.");
    }
  }

  const updateData: Record<string, unknown> = {};
  if (data.username !== undefined) updateData.username = data.username;
  if (data.displayName !== undefined) updateData.displayName = data.displayName;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.favoriteGenres !== undefined) updateData.favoriteGenres = data.favoriteGenres;
  if (data.preferences !== undefined) updateData.preferences = data.preferences;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  revalidatePath(`/user/${updatedUser.username}`);
  revalidatePath("/settings/profile");
  revalidatePath("/dashboard");

  return { success: true, user: updatedUser };
}
