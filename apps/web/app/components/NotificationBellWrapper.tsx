"use client";

import React, { useEffect, useState } from "react";
import { NotificationBell } from "@repo/ui";
import { getNotifications } from "../actions/notifications";

export function NotificationBellWrapper() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const { unreadCount } = await getNotifications(1);
        setUnreadCount(unreadCount);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUnread();
    
    // Optional: could poll every 30s
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  return <NotificationBell unreadCount={unreadCount} />;
}
