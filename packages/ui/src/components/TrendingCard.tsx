import React from "react";
import { Card, CardContent } from "./Card";
import { Text } from "./Text";
import { Heading } from "./Heading";
import { Badge } from "./Badge";

export interface TrendingCardProps {
  id: string;
  rank: number;
  title: string;
  authorName: string;
  genre?: string | null;
  likesCount: number;
  commentsCount: number;
  onClick?: () => void;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({
  rank,
  title,
  authorName,
  genre,
  likesCount,
  commentsCount,
  onClick,
}) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-[var(--surface-overlay)] transition-all duration-300 ease-out h-full flex flex-col group relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute -left-4 -top-6 text-8xl font-black text-[var(--surface-sunken)] opacity-50 select-none z-0">
        {rank}
      </div>
      <CardContent className="pt-6 relative z-10 flex-1 flex flex-col">
        {genre && <Badge variant="info" className="w-fit mb-3">{genre}</Badge>}
        <Heading level="h4" className="text-lg mb-1 group-hover:text-[var(--primary)] line-clamp-2">
          {title}
        </Heading>
        <Text className="text-sm text-[var(--text-muted)] mb-4">by {authorName}</Text>
        
        <div className="mt-auto flex items-center gap-4 text-xs text-[var(--text-tertiary)] font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            {likesCount}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            {commentsCount}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
