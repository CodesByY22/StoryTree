import { notFound } from "next/navigation";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { getNotifications } from "../actions/notifications";
import { NotificationsClient } from "./NotificationsClient";
import { AppNavbar } from "../components/AppNavbar";

export default async function NotificationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    notFound();
  }

  const { notifications, unreadCount } = await getNotifications(50);

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <AppNavbar />
      <main className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <NotificationsClient 
          initialNotifications={notifications} 
          initialUnreadCount={unreadCount} 
        />
      </div>
      </main>
    </div>
  );
}
