import { notFound, redirect } from "next/navigation";
import { prisma } from "@repo/db";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth"; // We can use the server-side auth here
import dynamic from "next/dynamic";
import { LoadingSkeleton } from "@repo/ui";

const EditorClient = dynamic(() => import("./EditorClient"), {
  loading: () => <div className="min-h-screen bg-[var(--surface-base)] flex items-center justify-center p-8"><LoadingSkeleton className="w-full max-w-4xl h-96" /></div>
});

interface EditorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { id } = await params;
  
  // We need to fetch the session using Better Auth server function
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/auth/login");
  }

  const story = await prisma.story.findUnique({
    where: { id },
  });

  if (!story) {
    notFound();
  }

  // Ensure only the author can access the editor
  if (story.authorId !== session.user.id) {
    redirect("/dashboard"); // or show unauthorized
  }

  return (
    <EditorClient
      storyId={story.id}
      initialTitle={story.title}
      initialSubtitle={story.subtitle || ""}
      initialContent={story.content}
      initialCoverImage={story.coverImage || ""}
      initialGenre={story.genre || ""}
      initialTags={story.tags}
      initialStatus={story.status}
      userId={session.user.id}
    />
  );
}
