import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { FeedClient } from "./FeedClient";
import { getFeed } from "../actions/feed";

export default async function FeedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  // Fetch initial data natively via Server Action on the server
  const { feed, nextCursor } = await getFeed(userId, undefined, 10);

  return (
    <main className="min-h-screen bg-[var(--surface-base)] p-4 md:p-8">
      <FeedClient initialData={feed} initialCursor={nextCursor} userId={userId} />
    </main>
  );
}
