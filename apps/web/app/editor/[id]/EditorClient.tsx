"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Textarea, Badge, EditorToolbar, TagInput, GenreSelect, Label } from "@repo/ui";
import { updateStory, publishStory, unpublishStory, deleteStory } from "../../actions/story";

interface EditorClientProps {
  storyId: string;
  initialTitle: string;
  initialSubtitle?: string;
  initialContent: string;
  initialCoverImage?: string;
  initialGenre?: string;
  initialTags?: string[];
  initialStatus: string;
  userId: string;
}

export default function EditorClient({
  storyId,
  initialTitle,
  initialSubtitle = "",
  initialContent,
  initialCoverImage = "",
  initialGenre = "",
  initialTags = [],
  initialStatus,
  userId,
}: EditorClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [content, setContent] = useState(initialContent);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [genre, setGenre] = useState(initialGenre);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [status, setStatus] = useState(initialStatus);

  const [isPreview, setIsPreview] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [isDirty, setIsDirty] = useState(false);

  // Debounce saving
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check dirtiness to prevent redundant saves
  useEffect(() => {
    // Only set dirty if we haven't just saved it (this is a simplified dirty check)
    // Actually, real dirty check should compare against the last saved state.
    // For now, any change triggers dirty.
  }, [title, subtitle, content, coverImage, genre, tags, initialTitle, initialSubtitle, initialContent, initialCoverImage, initialGenre, initialTags]);

  const saveContent = useCallback(async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    try {
      await updateStory(storyId, userId, { title, subtitle, content, coverImage, genre, tags });
      setLastSaved(new Date());
      setIsDirty(false);
    } catch (err) {
      console.error("Failed to auto-save story:", err);
    } finally {
      setIsSaving(false);
    }
  }, [title, subtitle, content, coverImage, genre, tags, storyId, userId]);

  useEffect(() => {
    setIsDirty(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      saveContent();
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [title, subtitle, content, coverImage, genre, tags, saveContent]);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required to publish.");
      return;
    }
    
    // Ensure it's saved first
    await saveContent();

    try {
      await publishStory(storyId, userId);
      setStatus("PUBLISHED");
      setIsSettingsOpen(false);
      alert("Story published successfully!");
    } catch (err: unknown) {
      console.error("Failed to publish story:", err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to publish story.");
      }
    }
  };

  const handleUnpublish = async () => {
    if (confirm("Are you sure you want to unpublish this story? It will be moved to your drafts.")) {
      try {
        await unpublishStory(storyId, userId);
        setStatus("DRAFT");
      } catch (err) {
        console.error("Failed to unpublish", err);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this story completely? This cannot be undone.")) {
      try {
        await deleteStory(storyId, userId);
        router.push("/dashboard");
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const insertMarkdown = (prefix: string, suffix: string, defaultText: string) => {
    const textarea = document.getElementById("story-content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const newContent = content.substring(0, start) + prefix + textToInsert + suffix + content.substring(end);
    setContent(newContent);
    
    // Attempt to reset cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + textToInsert.length);
    }, 0);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="min-h-screen bg-[var(--surface-base)] flex flex-col relative">
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
          <div className="text-sm text-[var(--text-muted)] flex items-center gap-2 hidden md:flex">
            {isSaving ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Saving...
              </span>
            ) : isDirty ? (
              <span className="text-[var(--text-muted)]">Unsaved changes</span>
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
          <Button variant="secondary" size="sm" onClick={() => setIsSettingsOpen(true)}>
            Settings
          </Button>
          {status === "DRAFT" ? (
            <Button variant="primary" size="sm" onClick={handlePublish}>
              Publish
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleUnpublish}>
              Unpublish
            </Button>
          )}
        </div>
      </header>

      {/* Settings Modal / Overlay */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface-base)] p-6 rounded-lg w-full max-w-lg shadow-2xl space-y-6">
            <h2 className="text-xl font-bold">Story Settings</h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Subtitle (Optional)</Label>
                <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="A brief summary..." />
              </div>
              <div className="space-y-1">
                <Label>Cover Image URL (Optional)</Label>
                <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." type="url" />
              </div>
              <div className="space-y-1">
                <Label>Genre</Label>
                <GenreSelect value={genre} onChange={(e) => setGenre(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Tags (Max 5)</Label>
                <TagInput tags={tags} onChange={setTags} />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[var(--border-base)]">
              <Button variant="ghost" className="text-red-500 hover:text-red-400" onClick={handleDelete}>
                Delete Story
              </Button>
              <Button variant="primary" onClick={() => setIsSettingsOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {!isPreview && <EditorToolbar onInsert={insertMarkdown} />}
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 pb-20">
        {isPreview ? (
          <div className="prose prose-invert max-w-none dark:prose-invert text-[var(--text-primary)]">
            {coverImage && (
              <div className="relative w-full h-64 mb-8">
                <Image src={coverImage} alt="Cover" fill className="object-cover rounded-lg" />
              </div>
            )}
            {subtitle && <p className="text-xl text-[var(--text-secondary)] italic mb-8">{subtitle}</p>}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*No content yet...*"}
            </ReactMarkdown>
          </div>
        ) : (
          <Textarea
            id="story-content-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            className="w-full min-h-[70vh] resize-y bg-transparent border-transparent focus-visible:border-[var(--border-base)] focus-visible:bg-[var(--surface-sunken)] p-4 text-lg leading-relaxed font-[var(--font-sans)]"
          />
        )}
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[var(--surface-base)] border-t border-[var(--border-base)] p-2 text-xs text-[var(--text-muted)] flex justify-between px-4">
        <div>
          {wordCount} words &middot; {charCount} characters
        </div>
        <div>
          {status === "PUBLISHED" ? "Live to the world" : "Only visible to you"}
        </div>
      </footer>
    </div>
  );
}
