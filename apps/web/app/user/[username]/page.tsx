import { notFound } from "next/navigation";
import { prisma } from "@repo/db";
import { Avatar, Card, CardContent, CardHeader, Heading, Text, Badge } from "@repo/ui";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    notFound();
  }

  // Parse favorite genres if available
  const genres = user.favoriteGenres
    ? user.favoriteGenres.split(",").map(g => g.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[var(--surface-base)] p-4 md:p-8">
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
  );
}
