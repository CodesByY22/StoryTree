import { AppNavbar } from "../components/AppNavbar";
import { StorySkeleton, AuthorSkeleton } from "@repo/ui";
import React from "react";

export default function DiscoverLoading() {
  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <AppNavbar />

      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-16 animate-pulse">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="h-10 bg-[var(--surface-sunken)] rounded w-48 mb-2"></div>
            <div className="h-6 bg-[var(--surface-sunken)] rounded w-96 max-w-[80vw]"></div>
          </div>
          <div className="h-10 w-40 bg-[var(--surface-sunken)] rounded"></div>
        </header>

        <section>
          <div className="h-8 bg-[var(--surface-sunken)] rounded w-32 mb-6"></div>
          <div className="flex gap-4 overflow-hidden">
            <StorySkeleton />
            <StorySkeleton />
            <StorySkeleton />
          </div>
        </section>

        <section>
          <div className="h-8 bg-[var(--surface-sunken)] rounded w-48 mb-6"></div>
          <div className="flex gap-4 overflow-hidden">
            <StorySkeleton />
            <StorySkeleton />
            <StorySkeleton />
          </div>
        </section>

        <section>
          <div className="h-8 bg-[var(--surface-sunken)] rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AuthorSkeleton />
            <AuthorSkeleton />
            <AuthorSkeleton />
            <AuthorSkeleton />
          </div>
        </section>
      </main>
    </div>
  );
}
