"use client";
import * as React from "react";
import { Button } from "./Button";

interface EditorToolbarProps {
  onInsert: (prefix: string, suffix: string, defaultText: string) => void;
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-2 bg-[var(--surface-sunken)] border-b border-[var(--border-base)] overflow-x-auto">
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("**", "**", "bold text")} title="Bold" aria-label="Bold">
        <strong>B</strong>
      </Button>
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("*", "*", "italic text")} title="Italic" aria-label="Italic">
        <em>I</em>
      </Button>
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("### ", "", "Heading 3")} title="Heading" aria-label="Heading">
        <strong>H</strong>
      </Button>
      <div className="w-px h-4 bg-[var(--border-base)] mx-1" />
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("[", "](url)", "Link text")} title="Link" aria-label="Insert Link">
        Link
      </Button>
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("![", "](image-url)", "Image alt")} title="Image" aria-label="Insert Image">
        Image
      </Button>
      <div className="w-px h-4 bg-[var(--border-base)] mx-1" />
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("> ", "", "Quote")} title="Quote" aria-label="Quote">
        Quote
      </Button>
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("`", "`", "code")} title="Code" aria-label="Code Block">
        Code
      </Button>
      <Button variant="ghost" size="sm" type="button" onClick={() => onInsert("- ", "", "List item")} title="Unordered List" aria-label="Unordered List">
        List
      </Button>
    </div>
  );
}

