import * as React from "react";
import { Button } from "./components/Button";
import { Badge } from "./components/Badge";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";

// --- Helper Components ---

function Section({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) {
  return (
    <section className="space-y-6 mb-16">
      <div className="border-b border-[var(--border-subtle)] pb-4 mb-6">
        <Heading level="h2" variant="primary">{title}</Heading>
        {description && <Text variant="secondary" className="mt-2">{description}</Text>}
      </div>
      {children}
    </section>
  );
}

function Swatch({ token, name }: { token: string, name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div 
        className="w-full h-16 rounded-[var(--radius-md)] border border-[var(--border-subtle)] shadow-[var(--shadow-xs)]" 
        style={{ backgroundColor: `var(${token})` }} 
      />
      <div>
        <Text size="xs" font="mono" variant="primary">{name}</Text>
        <Text size="xs" font="mono" variant="tertiary" className="truncate">{token}</Text>
      </div>
    </div>
  );
}

function TokenBlock({ token, name, renderVisual }: { token: string, name: string, renderVisual: (token: string) => React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-[var(--radius-container)] border border-[var(--border-subtle)] bg-[var(--surface-base)]">
      <div className="flex-1 flex items-center justify-center min-h-24 bg-[var(--surface-sunken)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] relative overflow-hidden">
        {renderVisual(token)}
      </div>
      <div>
        <Text size="xs" font="mono" variant="primary">{name}</Text>
        <Text size="xs" font="mono" variant="tertiary">{token}</Text>
      </div>
    </div>
  );
}

// --- Main Showcase ---

export const StoryTreeShowcase = () => {
  return (
    <div className="max-w-[var(--width-container-max)] mx-auto p-4 md:p-12 text-[var(--text-primary)]">
      
      {/* Header */}
      <header className="mb-16 space-y-4">
        <Heading level="h1" font="display" className="text-5xl lg:text-7xl tracking-tight">StoryTree Design System</Heading>
        <Text size="lg" variant="secondary" className="max-w-[var(--width-reading)]">
          A comprehensive overview of our UI components, design tokens, and foundational primitives. This documentation ensures consistency and scale across the entire platform.
        </Text>
      </header>

      {/* Typography */}
      <Section title="Typography" description="Scales, variants, and font families used across the application.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Headings */}
          <div className="space-y-8 p-8 rounded-[var(--radius-container)] bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
            <Heading level="h4" variant="secondary" className="uppercase tracking-widest text-xs mb-6">Display & Headings</Heading>
            <div className="space-y-6">
              <Heading level="h1">Display XL (H1)</Heading>
              <Heading level="h2">Display LG (H2)</Heading>
              <Heading level="h3">Display MD (H3)</Heading>
              <Heading level="h4">Display SM (H4)</Heading>
              <Heading level="h5">UI 2XL (H5)</Heading>
              <Heading level="h6">UI XL (H6)</Heading>
            </div>
          </div>
          
          {/* Body Text */}
          <div className="space-y-8 p-8 rounded-[var(--radius-container)] bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
            <Heading level="h4" variant="secondary" className="uppercase tracking-widest text-xs mb-6">Body & Variants</Heading>
            <div className="space-y-6">
              <Text size="lg" variant="primary">Primary (Lg) — Every story starts with one idea.</Text>
              <Text size="base" variant="secondary">Secondary (Base) — Collaborative storytelling platform.</Text>
              <Text size="sm" variant="tertiary">Tertiary (Sm) — Hundreds of unique interpretations.</Text>
              <Text size="story" font="story" variant="story">Story (Serif) — The same seed grows into an entire forest.</Text>
              <Text size="base" font="mono" variant="accent">Accent (Mono) — 01001011 01000101</Text>
              <div className="p-4 bg-[var(--surface-inverse)] rounded-[var(--radius-md)]">
                <Text size="base" variant="inverse">Inverse — Used on dark backgrounds.</Text>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons" description="Interactive elements for triggering actions.">
        <div className="space-y-8 p-8 rounded-[var(--radius-container)] bg-[var(--surface-raised)] border border-[var(--border-subtle)] overflow-x-auto">
          <div className="min-w-max grid grid-cols-5 gap-6 items-center">
            <Text font="mono" size="sm" variant="tertiary" className="w-24">Variant</Text>
            <Text font="mono" size="sm" variant="tertiary" className="text-center">Small (sm)</Text>
            <Text font="mono" size="sm" variant="tertiary" className="text-center">Medium (md)</Text>
            <Text font="mono" size="sm" variant="tertiary" className="text-center">Large (lg)</Text>
            <Text font="mono" size="sm" variant="tertiary" className="text-center">Disabled</Text>

            {/* Primary */}
            <Text font="mono" size="sm" variant="primary">Primary</Text>
            <div className="flex justify-center"><Button variant="primary" size="sm">Primary</Button></div>
            <div className="flex justify-center"><Button variant="primary" size="md">Primary</Button></div>
            <div className="flex justify-center"><Button variant="primary" size="lg">Primary</Button></div>
            <div className="flex justify-center"><Button variant="primary" size="md" disabled>Primary</Button></div>

            {/* Secondary */}
            <Text font="mono" size="sm" variant="primary">Secondary</Text>
            <div className="flex justify-center"><Button variant="secondary" size="sm">Secondary</Button></div>
            <div className="flex justify-center"><Button variant="secondary" size="md">Secondary</Button></div>
            <div className="flex justify-center"><Button variant="secondary" size="lg">Secondary</Button></div>
            <div className="flex justify-center"><Button variant="secondary" size="md" disabled>Secondary</Button></div>

            {/* Outline */}
            <Text font="mono" size="sm" variant="primary">Outline</Text>
            <div className="flex justify-center"><Button variant="outline" size="sm">Outline</Button></div>
            <div className="flex justify-center"><Button variant="outline" size="md">Outline</Button></div>
            <div className="flex justify-center"><Button variant="outline" size="lg">Outline</Button></div>
            <div className="flex justify-center"><Button variant="outline" size="md" disabled>Outline</Button></div>

            {/* Ghost */}
            <Text font="mono" size="sm" variant="primary">Ghost</Text>
            <div className="flex justify-center"><Button variant="ghost" size="sm">Ghost</Button></div>
            <div className="flex justify-center"><Button variant="ghost" size="md">Ghost</Button></div>
            <div className="flex justify-center"><Button variant="ghost" size="lg">Ghost</Button></div>
            <div className="flex justify-center"><Button variant="ghost" size="md" disabled>Ghost</Button></div>

            {/* Destructive */}
            <Text font="mono" size="sm" variant="primary">Destructive</Text>
            <div className="flex justify-center"><Button variant="destructive" size="sm">Destructive</Button></div>
            <div className="flex justify-center"><Button variant="destructive" size="md">Destructive</Button></div>
            <div className="flex justify-center"><Button variant="destructive" size="lg">Destructive</Button></div>
            <div className="flex justify-center"><Button variant="destructive" size="md" disabled>Destructive</Button></div>

            {/* Success */}
            <Text font="mono" size="sm" variant="primary">Success</Text>
            <div className="flex justify-center"><Button variant="success" size="sm">Success</Button></div>
            <div className="flex justify-center"><Button variant="success" size="md">Success</Button></div>
            <div className="flex justify-center"><Button variant="success" size="lg">Success</Button></div>
            <div className="flex justify-center"><Button variant="success" size="md" disabled>Success</Button></div>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges" description="Small status indicators and semantic labels.">
        <div className="flex flex-wrap gap-4 p-8 rounded-[var(--radius-container)] bg-[var(--surface-raised)] border border-[var(--border-subtle)]">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Section>

      {/* Primitive Colors */}
      <Section title="Primitive Colors" description="The foundational color palette.">
        <div className="space-y-8">
          <div>
            <Heading level="h5" className="mb-4">Greens</Heading>
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4">
              {['50','100','200','300','400','500','600','700','800','900','950'].map(w => (
                <Swatch key={w} name={`green-${w}`} token={`--color-green-${w}`} />
              ))}
            </div>
          </div>
          <div>
            <Heading level="h5" className="mb-4">Ambers</Heading>
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4">
              {['100','200','300','400','500','600','700','800','900'].map(w => (
                <Swatch key={w} name={`amber-${w}`} token={`--color-amber-${w}`} />
              ))}
            </div>
          </div>
          <div>
            <Heading level="h5" className="mb-4">Neutrals</Heading>
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4">
              {['50','100','200','300','400','500','600','700','800','900','950'].map(w => (
                <Swatch key={w} name={`neutral-${w}`} token={`--color-neutral-${w}`} />
              ))}
            </div>
          </div>
          <div>
            <Heading level="h5" className="mb-4">Genres</Heading>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {['horror','scifi','fantasy','romance','thriller','literary','comedy','drama'].map(w => (
                <Swatch key={w} name={w} token={`--color-genre-${w}`} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Semantic Colors */}
      <Section title="Semantic Colors" description="Contextual aliases mapped to primitives, adapting to Light/Dark modes.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Heading level="h5" className="mb-4">Surfaces</Heading>
            <div className="grid grid-cols-2 gap-4">
              <Swatch name="base" token="--surface-base" />
              <Swatch name="raised" token="--surface-raised" />
              <Swatch name="sunken" token="--surface-sunken" />
              <Swatch name="overlay" token="--surface-overlay" />
              <Swatch name="inverse" token="--surface-inverse" />
            </div>
          </div>
          <div>
            <Heading level="h5" className="mb-4">Text</Heading>
            <div className="grid grid-cols-2 gap-4">
              <Swatch name="primary" token="--text-primary" />
              <Swatch name="secondary" token="--text-secondary" />
              <Swatch name="tertiary" token="--text-tertiary" />
              <Swatch name="accent" token="--text-accent" />
              <Swatch name="inverse" token="--text-inverse" />
            </div>
          </div>
          <div>
            <Heading level="h5" className="mb-4">Borders & States</Heading>
            <div className="grid grid-cols-2 gap-4">
              <Swatch name="subtle" token="--border-subtle" />
              <Swatch name="default" token="--border-default" />
              <Swatch name="strong" token="--border-strong" />
              <Swatch name="hover" token="--interactive-hover" />
              <Swatch name="pressed" token="--interactive-pressed" />
            </div>
          </div>
        </div>
      </Section>

      {/* Spacing & Radius */}
      <Section title="Structure & Layout" description="Measurements for spacing and rounding.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Spacing */}
          <div>
            <Heading level="h5" className="mb-4">Spacing Scale</Heading>
            <div className="space-y-3">
              {[
                { name: 'space-1', val: '4px' },
                { name: 'space-2', val: '8px' },
                { name: 'space-3', val: '12px' },
                { name: 'space-4', val: '16px' },
                { name: 'space-6', val: '24px' },
                { name: 'space-8', val: '32px' },
                { name: 'space-12', val: '48px' },
                { name: 'space-16', val: '64px' }
              ].map(s => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="w-24 text-right">
                    <Text size="xs" font="mono">{s.name}</Text>
                    <Text size="xs" font="mono" variant="tertiary">{s.val}</Text>
                  </div>
                  <div className="bg-[var(--interactive-selected)] rounded-sm h-6" style={{ width: `var(--${s.name})` }} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Radius */}
          <div>
            <Heading level="h5" className="mb-4">Border Radius</Heading>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'radius-sm', t: '--radius-sm' },
                { name: 'radius-md', t: '--radius-md' },
                { name: 'radius-lg', t: '--radius-lg' },
                { name: 'radius-full', t: '--radius-full' },
                { name: 'radius-action', t: '--radius-action' },
                { name: 'radius-container', t: '--radius-container' },
              ].map(r => (
                <TokenBlock 
                  key={r.name} 
                  name={r.name} 
                  token={r.t} 
                  renderVisual={(t) => (
                    <div className="w-16 h-16 bg-[var(--surface-inverse)] border border-transparent" style={{ borderRadius: `var(${t})` }} />
                  )} 
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Shadows & Motion */}
      <Section title="Elevation & Motion" description="Shadows for depth and transitions for interaction.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shadows */}
          <div>
            <Heading level="h5" className="mb-4">Shadows</Heading>
            <div className="grid grid-cols-2 gap-4">
              {['sm','md','lg','xl','glow-amber','glow-genre'].map(s => (
                <TokenBlock 
                  key={s} 
                  name={`shadow-${s}`} 
                  token={`--shadow-${s}`} 
                  renderVisual={(t) => (
                    <div className="w-16 h-16 bg-[var(--surface-base)] rounded-[var(--radius-md)] border border-[var(--border-subtle)]" style={{ boxShadow: `var(${t})` }} />
                  )} 
                />
              ))}
            </div>
          </div>
          
          {/* Motion */}
          <div>
            <Heading level="h5" className="mb-4">Motion & Transitions</Heading>
            <div className="grid grid-cols-2 gap-4">
              {['instant','fast','normal','slow','gentle','spring'].map(m => (
                <TokenBlock 
                  key={m} 
                  name={`motion-${m}`} 
                  token={`--motion-${m}`} 
                  renderVisual={(t) => (
                    <div 
                      className="w-10 h-10 bg-[var(--color-amber-500)] rounded-full group-hover:scale-150 cursor-pointer" 
                      style={{ transition: `transform var(${t})` }} 
                      title="Hover over this box"
                    />
                  )} 
                />
              ))}
              <Text size="xs" variant="tertiary" className="col-span-2 text-center mt-2">Hover over the motion visualizers to see the transition curve.</Text>
            </div>
          </div>
        </div>
      </Section>
      
    </div>
  );
};
