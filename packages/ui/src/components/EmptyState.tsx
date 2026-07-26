import * as React from "react";
import { Text } from "./Text";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--border-base)] rounded-xl bg-[var(--surface-sunken)]">
      {icon && (
        <div className="mb-4 text-[var(--text-muted)]">
          {icon}
        </div>
      )}
      <Text className="mb-2 font-bold text-lg">{title}</Text>
      {description && <Text className="text-[var(--text-muted)] mb-6 max-w-sm mx-auto">{description}</Text>}
      {action && <div>{action}</div>}
    </div>
  );
}
