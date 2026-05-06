'use client';

import { Clock } from 'lucide-react';
import type { ReactNode } from 'react';

export interface HistoryNoteProps {
  year?: string;
  who?: string;
  children: ReactNode;
}

/**
 * A note about computing history. Used for context that connects a
 * concept to who created it, when, and why.
 *
 * Example: a HistoryNote on `print` might say "1991 — Guido added it
 * because he was tired of writing `import sys; sys.stdout.write(...)`."
 */
export function HistoryNote({ year, who, children }: HistoryNoteProps) {
  return (
    <aside className="my-6 rounded-lg border border-history/30 bg-history/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-history/15 p-1.5 mt-0.5">
          <Clock className="h-4 w-4 text-history" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-history/80">
              Historical note
            </span>
            {year && (
              <span className="text-xs text-muted-foreground">· {year}</span>
            )}
            {who && (
              <span className="text-xs text-muted-foreground">· {who}</span>
            )}
          </div>
          <div className="font-serif text-[1.05rem] leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
