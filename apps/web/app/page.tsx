import * as React from "react";
import { Button, Text, Heading, Badge } from "@repo/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)] font-[var(--font-sans)] flex flex-col">
      
      {/* 1. Sticky Navbar */}
      <nav className="sticky top-0 z-[var(--z-sticky)] h-[var(--nav-height)] bg-[var(--nav-bg)] border-b border-[var(--nav-border)] backdrop-blur-[var(--blur-glass)] bg-opacity-80 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-8">
          <Heading level="h4" font="display" className="tracking-tight text-[var(--text-accent)]">StoryTree</Heading>
          <div className="hidden md:flex gap-1">
            {["Write", "Discover", "Community", "About"].map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--nav-link-text)] hover:text-[var(--nav-link-hover-text)] hover:bg-[var(--nav-link-hover-bg)] rounded-[var(--radius-sm)] transition-[var(--motion-fast)] text-[var(--type-ui-sm)] font-medium"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Login</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center">
        
        {/* 2. Hero */}
        <section className="w-full max-w-[var(--width-container-max)] mx-auto px-6 lg:px-12 py-[var(--space-20)] lg:py-[var(--space-24)] flex flex-col lg:flex-row items-center gap-[var(--space-12)]">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <Badge variant="info" className="mb-4">v0.4 Preview</Badge>
            <Heading level="h1" font="display" className="text-5xl lg:text-7xl leading-tight">
              Every story starts with <span className="text-[var(--text-accent)]">one idea.</span>
            </Heading>
            <Text size="lg" variant="secondary" className="max-w-[var(--width-reading)] mx-auto lg:mx-0">
              A collaborative storytelling platform where one prompt inspires hundreds of unique stories. Plant your seed, watch the branches grow, and collaborate with writers worldwide.
            </Text>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button variant="primary" size="lg">Start Writing</Button>
              <Button variant="outline" size="lg">Explore Branches</Button>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            {/* Illustration Placeholder */}
            <div className="w-full max-w-md aspect-square bg-[var(--surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-container)] shadow-[var(--shadow-xl)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-green-500)]/20 to-[var(--color-amber-500)]/20 mix-blend-overlay" />
              <Heading level="h4" variant="secondary" font="sans" className="opacity-50">Illustration</Heading>
            </div>
          </div>
        </section>

        {/* 3. Features */}
        <section id="features" className="w-full bg-[var(--surface-sunken)] border-y border-[var(--border-subtle)] py-[var(--space-20)] px-6 lg:px-12">
          <div className="max-w-[var(--width-container-max)] mx-auto">
            <div className="text-center space-y-4 mb-[var(--space-12)]">
              <Heading level="h2">Build the Forest</Heading>
              <Text size="lg" variant="secondary" className="max-w-[var(--width-reading)] mx-auto">
                StoryTree gives you the tools to explore every narrative possibility.
              </Text>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-6)]">
              {/* Feature Card 1 */}
              <div className="bg-[var(--card-bg)] border-[var(--card-border-width)] border-[var(--card-border)] p-[var(--card-padding)] rounded-[var(--card-radius)] shadow-[var(--card-shadow)] space-y-4 hover:shadow-[var(--shadow-lg)] transition-[var(--motion-normal)]">
                <div className="w-12 h-12 bg-[var(--surface-base)] border border-[var(--border-subtle)] rounded-[var(--radius-action)] flex items-center justify-center text-[var(--color-green-500)] text-2xl font-display">W</div>
                <Heading level="h4">Write Stories</Heading>
                <Text size="sm" variant="secondary">Plant your own prompt or branch off an existing storyline to take the narrative in a new direction.</Text>
              </div>
              
              {/* Feature Card 2 */}
              <div className="bg-[var(--card-bg)] border-[var(--card-border-width)] border-[var(--card-border)] p-[var(--card-padding)] rounded-[var(--card-radius)] shadow-[var(--card-shadow)] space-y-4 hover:shadow-[var(--shadow-lg)] transition-[var(--motion-normal)]">
                <div className="w-12 h-12 bg-[var(--surface-base)] border border-[var(--border-subtle)] rounded-[var(--radius-action)] flex items-center justify-center text-[var(--color-amber-500)] text-2xl font-display">C</div>
                <Heading level="h4">Collaborate</Heading>
                <Text size="sm" variant="secondary">Work with other authors to build interconnected worlds and deep, branching character arcs.</Text>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-[var(--card-bg)] border-[var(--card-border-width)] border-[var(--card-border)] p-[var(--card-padding)] rounded-[var(--card-radius)] shadow-[var(--card-shadow)] space-y-4 hover:shadow-[var(--shadow-lg)] transition-[var(--motion-normal)]">
                <div className="w-12 h-12 bg-[var(--surface-base)] border border-[var(--border-subtle)] rounded-[var(--radius-action)] flex items-center justify-center text-[var(--color-genre-scifi)] text-2xl font-display">D</div>
                <Heading level="h4">Discover</Heading>
                <Text size="sm" variant="secondary">Navigate through a visual tree of stories. Find the path most taken, or explore hidden gems.</Text>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-[var(--card-bg)] border-[var(--card-border-width)] border-[var(--card-border)] p-[var(--card-padding)] rounded-[var(--card-radius)] shadow-[var(--card-shadow)] space-y-4 hover:shadow-[var(--shadow-lg)] transition-[var(--motion-normal)]">
                <div className="w-12 h-12 bg-[var(--surface-base)] border border-[var(--border-subtle)] rounded-[var(--radius-action)] flex items-center justify-center text-[var(--color-genre-fantasy)] text-2xl font-display">R</div>
                <Heading level="h4">Remix</Heading>
                <Text size="sm" variant="secondary">Don&apos;t like the ending? Fork the chapter and write your own conclusion. Let the community decide.</Text>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="w-full max-w-[var(--width-container-max)] mx-auto px-6 lg:px-12 py-[var(--space-20)]">
          <div className="text-center space-y-4 mb-[var(--space-16)]">
            <Heading level="h2">How It Works</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-10)] relative">
            <div className="hidden md:block absolute top-[var(--space-4)] left-[16.6%] right-[16.6%] h-[var(--border-width-2)] bg-[var(--border-subtle)]" />
            
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--surface-inverse)] text-[var(--text-inverse)] flex items-center justify-center font-bold text-lg shadow-[var(--shadow-md)]">1</div>
              <Heading level="h5">The Seed</Heading>
              <Text size="sm" variant="secondary" className="max-w-xs">An author posts a single prompt or opening paragraph to start a new Tree.</Text>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--surface-inverse)] text-[var(--text-inverse)] flex items-center justify-center font-bold text-lg shadow-[var(--shadow-md)]">2</div>
              <Heading level="h5">The Branches</Heading>
              <Text size="sm" variant="secondary" className="max-w-xs">Multiple writers submit their own &quot;Chapter 2&quot;. The story splits into parallel timelines.</Text>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--surface-inverse)] text-[var(--text-inverse)] flex items-center justify-center font-bold text-lg shadow-[var(--shadow-md)]">3</div>
              <Heading level="h5">The Forest</Heading>
              <Text size="sm" variant="secondary" className="max-w-xs">Readers explore the tree, voting on their favorite arcs and discovering new genres.</Text>
            </div>
          </div>
        </section>

        {/* 5. Community Statistics */}
        <section className="w-full bg-[var(--surface-raised)] border-y border-[var(--border-subtle)] py-[var(--space-16)] px-6">
          <div className="max-w-[var(--width-container-max)] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[var(--space-8)] divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)] text-center">
            <div className="pt-8 md:pt-0 space-y-2">
              <Heading level="h2" font="display" className="text-5xl text-[var(--color-green-500)]">14,204</Heading>
              <Text variant="secondary" font="mono" className="uppercase tracking-widest text-xs">Stories Planted</Text>
            </div>
            <div className="pt-8 md:pt-0 space-y-2">
              <Heading level="h2" font="display" className="text-5xl text-[var(--color-amber-500)]">89,102</Heading>
              <Text variant="secondary" font="mono" className="uppercase tracking-widest text-xs">Active Writers</Text>
            </div>
            <div className="pt-8 md:pt-0 space-y-2">
              <Heading level="h2" font="display" className="text-5xl text-[var(--color-genre-scifi)]">2.4M</Heading>
              <Text variant="secondary" font="mono" className="uppercase tracking-widest text-xs">Readers</Text>
            </div>
          </div>
        </section>

        {/* 6. CTA Banner */}
        <section className="w-full max-w-[var(--width-container-max)] mx-auto px-6 lg:px-12 py-[var(--space-24)]">
          <div className="bg-[var(--surface-inverse)] text-[var(--text-inverse)] rounded-[var(--radius-container)] p-[var(--space-12)] md:p-[var(--space-16)] flex flex-col items-center text-center space-y-8 shadow-[var(--shadow-2xl)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-green-400)]/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-amber-400)]/20 blur-[100px] rounded-full" />
            
            <Heading level="h2" variant="inverse" font="display" className="text-4xl md:text-5xl z-10 relative">Ready to grow your story?</Heading>
            <Text size="lg" variant="inverse" className="opacity-80 max-w-md z-10 relative">Join thousands of writers collaborating on the next great adventure.</Text>
            <div className="z-10 relative">
              <Button variant="primary" size="lg" className="bg-[var(--surface-base)] text-[var(--text-primary)] hover:bg-[var(--surface-raised)] border-transparent">Join StoryTree Now</Button>
            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="w-full bg-[var(--surface-sunken)] border-t border-[var(--border-subtle)] py-[var(--space-12)] px-6 lg:px-12">
        <div className="max-w-[var(--width-container-max)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-[var(--space-8)] mb-[var(--space-12)]">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Heading level="h5" font="display" className="text-[var(--text-accent)] tracking-tight">StoryTree</Heading>
            <Text size="sm" variant="secondary">Every story starts with one idea.</Text>
          </div>
          <div className="space-y-4">
            <Text font="mono" size="sm" variant="primary" className="uppercase tracking-widest text-xs">Platform</Text>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Explore</a></li>
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Writers</a></li>
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Community</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <Text font="mono" size="sm" variant="primary" className="uppercase tracking-widest text-xs">Resources</Text>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Documentation</a></li>
              <li><a href="/showcase" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Design System</a></li>
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Blog</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <Text font="mono" size="sm" variant="primary" className="uppercase tracking-widest text-xs">Legal</Text>
            <ul className="space-y-2">
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Privacy Policy</a></li>
              <li><a href="#" className="text-[var(--type-ui-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)]">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[var(--width-container-max)] mx-auto pt-[var(--space-6)] border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
          <Text size="sm" variant="tertiary">© 2026 StoryTree Inc. All rights reserved.</Text>
          <div className="flex items-center gap-4">
            {/* Social Placeholders */}
            <div className="w-8 h-8 rounded-full bg-[var(--surface-base)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)] cursor-pointer">X</div>
            <div className="w-8 h-8 rounded-full bg-[var(--surface-base)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)] cursor-pointer">G</div>
            <div className="w-8 h-8 rounded-full bg-[var(--surface-base)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-[var(--motion-fast)] cursor-pointer">D</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
