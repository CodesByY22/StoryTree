"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export async function getNotifications(limit = 20) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return { notifications: [], unreadCount: 0 };

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        actor: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
        user: { // Add this to check if story title is needed, wait no we need story itself
          select: { id: true } 
        }
      },
    }),
    prisma.notification.count({
      where: { userId: session.user.id, isRead: false },
    }),
  ]);

  // For stories, we could manually fetch them or include them. Since story is an optional relation, let's fetch in bulk or add a relation.
  // Wait, I did not add `story` relation to `Notification` in prisma schema! I only added `storyId` String field.
  // Let's fetch story titles manually for those that have storyId.
  const storyIds = notifications.map(n => n.storyId).filter(Boolean) as string[];
  let storiesMap: Record<string, string> = {};
  if (storyIds.length > 0) {
    const stories = await prisma.story.findMany({
      where: { id: { in: storyIds } },
      select: { id: true, title: true },
    });
    storiesMap = stories.reduce((acc, story) => {
      acc[story.id] = story.title;
      return acc;
    }, {} as Record<string, string>);
  }

  const formatted = notifications.map(n => ({
    ...n,
    storyTitle: n.storyId ? storiesMap[n.storyId] : null,
  }));

  return { notifications: formatted, unreadCount };
}

export async function markNotificationRead(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return;

  await prisma.notification.updateMany({
    where: { id, userId: session.user.id },
    data: { isRead: true },
  });

  revalidatePath("/notifications");
}

export async function markAllNotificationsRead() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return;

  await prisma.notification.updateMany({
    where: { userId: session.user.id, isRead: false },
    data: { isRead: true },
  });

  revalidatePath("/notifications");
}
