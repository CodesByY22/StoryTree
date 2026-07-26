import { notFound } from "next/navigation";
import { prisma } from "@repo/db";
import { Avatar, Card, CardContent, CardHeader, Heading, Text, Badge } from "@repo/ui";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { getFollowStats, checkIsFollowing } from "../../actions/social";
import { ProfileFollowButton } from "./ProfileFollowButton";
import { AppNavbar } from "../../components/AppNavbar";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserId = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          stories: { where: { status: "PUBLISHED" } },
        }
      }
    }
  });

  if (!user) {
    notFound();
  }

  // Get follow stats
  const { followers, following } = await getFollowStats(user.id);
  const isFollowing = currentUserId ? await checkIsFollowing(user.id) : false;

  // Get total likes received
  const totalLikes = await prisma.like.count({ where: { story: { authorId: user.id } } });

  // Parse favorite genres if available
  const genres = user.favoriteGenres
    ? user.favoriteGenres.split(",").map(g => g.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <AppNavbar />
      <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          {/* Header / Banner Area */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 w-full" />
          
          <CardHeader className="relative pb-0 pt-0">
            <div className="flex justify-between items-end -mt-12 mb-4 px-2">
              <Avatar
                src={user.image}
                fallback={user.displayName || user.username || user.name}
                size="xl"
                className="border-4 border-[var(--surface-sunken)] shadow-sm"
              />
              {currentUserId && currentUserId !== user.id && (
                <ProfileFollowButton userId={user.id} initialIsFollowing={isFollowing} />
              )}
            </div>
            
            <div className="space-y-1">
              <Heading level="h2" className="text-2xl font-bold">
                {user.displayName || user.name}
              </Heading>
              <Text className="text-[var(--text-muted)] font-medium">
                @{user.username}
              </Text>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-[var(--border-subtle)]">
              <div className="flex flex-col items-center">
                <Text className="font-bold text-lg">{followers}</Text>
                <Text className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Followers</Text>
              </div>
              <div className="flex flex-col items-center">
                <Text className="font-bold text-lg">{following}</Text>
                <Text className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Following</Text>
              </div>
              <div className="h-8 w-px bg-[var(--border-subtle)] mx-2 hidden sm:block" />
              <div className="flex flex-col items-center">
                <Text className="font-bold text-lg">{user._count.stories}</Text>
                <Text className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Stories</Text>
              </div>
              <div className="flex flex-col items-center">
                <Text className="font-bold text-lg">{totalLikes}</Text>
                <Text className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Likes</Text>
              </div>
            </div>

            <div>
              <Heading level="h4" className="mb-2 text-lg">About</Heading>
              {user.bio ? (
                <Text>{user.bio}</Text>
              ) : (
                <Text className="text-[var(--text-muted)] italic">
                  This user hasn&apos;t written a bio yet.
                </Text>
              )}
            </div>

            {genres.length > 0 && (
              <div>
                <Heading level="h4" className="mb-3 text-lg">Favorite Genres</Heading>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <Badge key={genre} variant="default">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-[var(--border-base)]">
              <Text className="text-[var(--text-muted)] text-sm">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
      </main>
    </div>
  );
}
