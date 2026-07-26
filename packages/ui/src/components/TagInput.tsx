import * as React from "react";
import { Badge } from "./Badge";
import { Input } from "./Input";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  maxTagLength?: number;
  placeholder?: string;
}

export function TagInput({ tags, onChange, maxTags = 5, maxTagLength = 20, placeholder = "Add a tag..." }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = inputValue.trim().toLowerCase();
      if (val && !tags.includes(val) && tags.length < maxTags && val.length <= maxTagLength) {
        onChange([...tags, val]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 mb-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="default" className="flex items-center gap-1">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              &times;
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length < maxTags ? placeholder : `Max ${maxTags} tags reached`}
        disabled={tags.length >= maxTags}
      />
    </div>
  );
}
