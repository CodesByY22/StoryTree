"use client";

import React, { useState } from "react";
import { Heading, NotificationItem, Button, Text } from "@repo/ui";
import { markNotificationRead, markAllNotificationsRead } from "../actions/notifications";
import { useRouter } from "next/navigation";

interface NotificationsClientProps {
  initialNotifications: Array<{
    id: string;
    type: "FOLLOW" | "LIKE" | "COMMENT" | "REPLY";
    isRead: boolean;
    createdAt: Date;
    actor: {
      name: string;
      username: string | null;
      image: string | null;
    };
    story?: { id: string; title: string } | null;
  }>;
  initialUnreadCount: number;
}

export function NotificationsClient({ initialNotifications, initialUnreadCount }: NotificationsClientProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const handleRead = async (id: string) => {
    // Optimistic
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await markNotificationRead(id);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0 || isMarkingAll) return;
    setIsMarkingAll(true);
    
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);

    try {
      await markAllNotificationsRead();
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsMarkingAll(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <Heading level="h1" className="text-2xl font-bold">Notifications</Heading>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={isMarkingAll}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="py-12 text-center">
          <Text className="text-[var(--text-muted)]">You have no notifications yet.</Text>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              id={n.id}
              type={n.type}
              actorName={n.actor.name || "Unknown"}
              actorUsername={n.actor.username || "unknown"}
              actorAvatar={n.actor.image}
              storyTitle={n.story?.title || null}
              storyId={n.story?.id || null}
              isRead={n.isRead}
              createdAt={n.createdAt}
              onRead={handleRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
