"use client";
import * as React from "react";
import { Badge } from "./Badge";

interface GenreChipProps {
  genre: string;
  onClick?: () => void;
  selected?: boolean;
}

export function GenreChip({ genre, onClick, selected }: GenreChipProps) {
  return (
    <Badge 
      variant={selected ? "default" : "info"}
      className={`text-sm px-4 py-2 font-medium ${onClick ? 'cursor-pointer hover:opacity-90' : ''}`}
      onClick={onClick}
    >
      {genre}
    </Badge>
  );
}

