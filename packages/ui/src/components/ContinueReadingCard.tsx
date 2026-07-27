"use client";
import React from "react";
import { Card } from "./Card";
import { Text } from "./Text";
import { Heading } from "./Heading";

export interface ContinueReadingCardProps {
  storyId: string;
  title: string;
  authorName: string;
  progress: number;
  coverImage?: string | null;
  onClick?: () => void;
}

export const ContinueReadingCard: React.FC<ContinueReadingCardProps> = ({
  title,
  authorName,
  progress,
  coverImage,
  onClick,
}) => {
  return (
    <Card 
      className="cursor-pointer hover:border-[var(--primary)] transition-all group overflow-hidden flex flex-col sm:flex-row h-auto sm:h-32"
      onClick={onClick}
    >
      {coverImage && (
        <div 
          className="h-32 w-full sm:w-32 bg-cover bg-center shrink-0" 
          style={{ backgroundImage: `url(${coverImage})` }} 
        />
      )}
      <div className="flex-1 flex flex-col p-4 sm:p-6 justify-between">
        <div>
          <Heading level="h4" className="text-lg group-hover:text-[var(--primary)] line-clamp-1 mb-1">
            {title}
          </Heading>
          <Text className="text-sm text-[var(--text-muted)] line-clamp-1">
            by {authorName}
          </Text>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full max-w-sm">
          <div className="flex-1 h-2 bg-[var(--surface-sunken)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--primary)] transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <Text className="text-xs font-bold text-[var(--text-secondary)] whitespace-nowrap">
            {Math.round(progress)}%
          </Text>
        </div>
      </div>
    </Card>
  );
};

