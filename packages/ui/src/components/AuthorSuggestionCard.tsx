import React from "react";
import { Card, CardContent } from "./Card";
import { Text } from "./Text";
import { Avatar } from "./Avatar";
import { FollowButton } from "./FollowButton";

export interface AuthorSuggestionCardProps {
  id: string;
  name: string;
  username: string | null;
  image: string | null;
  bio?: string | null;
  followersCount: number;
  isFollowing?: boolean;
  onFollowToggle?: (id: string) => Promise<void>;
  href: string;
}

export const AuthorSuggestionCard: React.FC<AuthorSuggestionCardProps> = ({
  id,
  name,
  username,
  image,
  bio,
  followersCount,
  isFollowing = false,
  onFollowToggle,
  href,
}) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <a href={href} className="flex flex-col items-center group">
          <Avatar 
            src={image} 
            fallback={name[0] || "?"} 
            size="xl" 
            className="mb-4 group-hover:ring-4 group-hover:ring-[var(--primary)]/20 transition-all"
          />
          <Text className="font-bold text-lg group-hover:text-[var(--primary)] transition-colors">{name}</Text>
          <Text className="text-sm text-[var(--text-muted)] mb-2">@{username}</Text>
        </a>
        
        <Text className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 h-10">
          {bio || "Storyteller"}
        </Text>
        
        <div className="w-full mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <Text className="text-xs font-semibold text-[var(--text-muted)]">{followersCount} Followers</Text>
          {onFollowToggle && (
            <FollowButton 
              userId={id} 
              isFollowing={isFollowing} 
              onFollowToggle={onFollowToggle}
              className="h-8 text-xs px-3"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
