import { notFound } from "next/navigation";
import { prisma } from "@repo/db";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { StoryClient } from "./StoryClient";
import { getRelatedStories } from "../../actions/recommendations";
import { RecommendationCarousel, StoryCard, Text } from "@repo/ui";
import Link from "next/link";
import { AppNavbar } from "../../components/AppNavbar";

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const story = await prisma.story.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
      _count: {
        select: { likes: true, bookmarks: true },
      },
      ...(userId && {
        likes: { where: { userId } },
        bookmarks: { where: { userId } },
      }),
    },
  });

  if (!story || story.status !== "PUBLISHED") {
    notFound();
  }

  const isLiked = userId && "likes" in story ? (story.likes as unknown[]).length > 0 : false;
  const isBookmarked = userId && "bookmarks" in story ? (story.bookmarks as unknown[]).length > 0 : false;

  const initialData = {
    ...story,
    likesCount: story._count.likes,
    bookmarksCount: story._count.bookmarks,
    isLiked,
    isBookmarked,
  };

  const relatedStories = await getRelatedStories(id, 4);

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <AppNavbar />
      <main className="p-4 md:p-8">
      <StoryClient 
        initialData={initialData} 
        userId={userId} 
        currentUserName={session?.user?.name || ""} 
        currentUserAvatar={session?.user?.image || null} 
      />

      {relatedStories.length > 0 && (
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-[var(--border-subtle)]">
          <Text className="text-2xl font-bold mb-6">You may also like</Text>
          <RecommendationCarousel>
            {relatedStories.map((story) => (
              <Link href={`/story/${story.id}`} key={story.id} className="block group h-full">
                <StoryCard
                  id={story.id}
                  title={story.title}
                  snippet={story.content.substring(0, 100)}
                  authorName={story.author.name}
                  authorAvatar={story.author.image || null}
                  publishedAt={story.publishedAt || new Date()}
                  likesCount={story._count.likes}
                  bookmarksCount={story._count.bookmarks}
                  isLiked={false}
                  isBookmarked={false}
                />
              </Link>
            ))}
          </RecommendationCarousel>
        </div>
      )}
      </main>
    </div>
  );
}
