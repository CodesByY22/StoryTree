import * as React from "react";
import { Avatar } from "./Avatar";

interface AuthorCardProps {
  id: string;
  name: string;
  username: string;
  image?: string | null;
  bio?: string | null;
  onClick?: () => void;
}

export function AuthorCard({ name, username, image, bio, onClick }: AuthorCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-base)] flex items-start gap-4 transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-1' : ''}`}
    >
      <Avatar src={image || null} alt={name} fallback={name.substring(0, 2).toUpperCase()} size="lg" />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[var(--text-primary)] truncate">{name}</h3>
        <p className="text-sm text-[var(--text-muted)] truncate">@{username}</p>
        {bio && (
          <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}
