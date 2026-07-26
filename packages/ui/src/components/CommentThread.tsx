"use client";

import React from "react";
import { CommentCard, CommentCardProps } from "./CommentCard";
import { cn } from "../utils/cn";

export interface CommentThreadProps {
  comment: CommentCardProps;
  replies?: CommentCardProps[];
  className?: string;
}

export function CommentThread({ comment, replies = [], className }: CommentThreadProps) {
  return (
    <div className={cn("flex flex-col gap-4 w-full group", className)}>
      <CommentCard {...comment} />
      
      {replies.length > 0 && (
        <div className="flex flex-col gap-4 pl-12 border-l-2 border-[var(--border-subtle)] ml-4 mt-2">
          {replies.map((reply) => (
            <CommentCard key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
}
