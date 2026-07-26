"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Heading, Text, Avatar } from "@repo/ui";
import { NotificationBellWrapper } from "./NotificationBellWrapper";
import { useSession } from "../../lib/auth-client";

export function AppNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Discover", href: "/discover" },
    { name: "Search", href: "/search" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-[var(--z-sticky)] bg-[var(--nav-bg)] border-b border-[var(--nav-border)] backdrop-blur-[var(--blur-glass)] bg-opacity-80 flex flex-col px-4 lg:px-8">
      <div className="flex items-center justify-between h-[var(--nav-height)]">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Heading level="h4" font="display" className="tracking-tight text-[var(--text-accent)] hover:opacity-80 transition-opacity">
              StoryTree
            </Heading>
          </Link>
          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link key={link.name} href={link.href}>
                  <Text
                    className={`px-3 py-2 rounded-[var(--radius-sm)] transition-[var(--motion-fast)] text-sm font-medium ${
                      isActive
                        ? "bg-[var(--surface-raised)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"
                    }`}
                  >
                    {link.name}
                  </Text>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/editor/new">
            <Button variant="primary" size="sm" className="hidden md:inline-flex">
              Write
            </Button>
          </Link>
          
          {session?.user ? (
            <>
              <NotificationBellWrapper />
              <Link href={`/user/${(session.user as Record<string, unknown>).username || session.user.id}`}>
                <Avatar
                  src={session.user.image || null}
                  fallback={session.user.name?.[0] || "?"}
                  size="sm"
                  className="hover:ring-2 ring-[var(--color-green-500)] transition-all cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <Link href="/auth/login" className="hidden md:inline-flex">
              <Button variant="outline" size="sm">Log In</Button>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-[var(--border-subtle)] space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <Text
                  className={`block px-4 py-3 rounded-md transition-colors font-medium ${
                    isActive
                      ? "bg-[var(--surface-raised)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.name}
                </Text>
              </Link>
            );
          })}
          
          <div className="px-4 pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-col gap-2">
            <Link href="/editor/new" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">Write a Story</Button>
            </Link>
            {!session?.user && (
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">Log In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
