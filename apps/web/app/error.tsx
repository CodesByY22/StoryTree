"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@repo/ui";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[var(--surface-base)]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md">
        An unexpected error occurred. We&apos;ve been notified and are looking into it.
      </p>
      <Button onClick={() => reset()} variant="primary">
        Try again
      </Button>
    </div>
  );
}
