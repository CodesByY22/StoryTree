"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Badge } from "@repo/ui";
import { updateStory, publishStory } from "../../actions/story";

interface EditorClientProps {
  storyId: string;
  initialTitle: string;
  initialContent: string;
  initialStatus: string;
  userId: string;
}

export default function EditorClient({
  storyId,
  initialTitle,
  initialContent,
  initialStatus,
  userId,
}: EditorClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState(initialStatus);
  const [isPreview, setIsPreview] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounce saving
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent auto-save on initial mount if nothing changed
    if (title === initialTitle && content === initialContent) return;

    setIsSaving(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        await updateStory(storyId, userId, { title, content });
        setLastSaved(new Date());
      } catch (err) {
        console.error("Failed to auto-save story:", err);
      } finally {
        setIsSaving(false);
      }
    }, 2000); // 2 seconds auto-save

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [title, content, storyId, userId, initialTitle, initialContent]);

  const handlePublish = async () => {
    try {
      await publishStory(storyId, userId);
      setStatus("PUBLISHED");
      alert("Story published successfully!");
    } catch (err) {
      console.error("Failed to publish story:", err);
      alert("Failed to publish story");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)] flex flex-col">
      {/* Editor Navbar */}
      <header className="sticky top-0 z-10 border-b border-[var(--border-base)] bg-[var(--surface-base)]/80 backdrop-blur px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            &larr; Back
          </Button>
          <div className="flex-1 max-w-xl">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold text-lg border-transparent hover:border-[var(--border-base)] focus-visible:border-[var(--border-base)] bg-transparent focus-visible:bg-[var(--input-bg)]"
              placeholder="Story Title..."
            />
          </div>
          <div className="text-sm text-[var(--text-muted)] flex items-center gap-2">
            {isSaving ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Saving...
              </span>
            ) : lastSaved ? (
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            ) : null}
            <Badge variant="default" className="uppercase ml-2">{status}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? "Edit" : "Preview"}
          </Button>
          {status === "DRAFT" && (
            <Button variant="primary" size="sm" onClick={handlePublish}>
              Publish
            </Button>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        {isPreview ? (
          <div className="prose prose-invert max-w-none dark:prose-invert text-[var(--text-primary)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*No content yet...*"}
            </ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            className="w-full min-h-[70vh] resize-y bg-transparent border-transparent focus-visible:border-[var(--border-base)] focus-visible:bg-[var(--surface-sunken)] p-4 text-lg leading-relaxed font-[var(--font-sans)]"
          />
        )}
      </main>
    </div>
  );
}
