'use client';

import { useState, useMemo } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { searchGlossary } from '@/lib/glossary/search';
import type { GlossaryCategory } from '@/lib/glossary/types';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories: { id: GlossaryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'language', label: 'Python' },
  { id: 'concept', label: 'Concepts' },
  { id: 'algorithm', label: 'Algorithms' },
  { id: 'industry', label: 'Industry' },
  { id: 'tool', label: 'Tools' },
];

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategory | 'all'>('all');

  const results = useMemo(() => {
    const found = searchGlossary(query, 200);
    if (category === 'all') return found;
    return found.filter((e) => e.category === category);
  }, [query, category]);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="font-sans text-3xl font-bold tracking-tight mb-2">
            Glossary
          </h1>
          <p className="font-serif text-foreground/80">
            Every term, with etymology where it has one. Hover the
            origin-tag in any lesson and you'll land here.
          </p>
        </header>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  'px-3 py-1 text-sm rounded-md font-mono uppercase tracking-wider transition-colors',
                  category === c.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {results.length === 0 ? (
            <div className="text-muted-foreground italic font-serif">
              No matching terms.
            </div>
          ) : (
            results.map((entry) => (
              <article
                key={entry.term}
                className="rounded-lg border border-border bg-card p-5"
              >
                <header className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <h2 className="font-sans text-lg font-semibold">
                    {entry.display ?? entry.term}
                  </h2>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {entry.category}
                  </span>
                  {entry.origin && (
                    <span className="text-xs text-muted-foreground italic">
                      ← {entry.origin}
                      {entry.rootForm && (
                        <>
                          , <em className="font-mono">{entry.rootForm}</em>
                        </>
                      )}
                    </span>
                  )}
                </header>
                <p className="font-serif text-foreground/90 mb-2">
                  {entry.brief}
                </p>
                {entry.long && (
                  <p className="font-serif text-foreground/70 text-[0.95rem] mt-2">
                    {entry.long}
                  </p>
                )}
                {entry.rootMeaning && (
                  <div className="mt-2 text-xs text-muted-foreground font-mono">
                    literal: "{entry.rootMeaning}"
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
