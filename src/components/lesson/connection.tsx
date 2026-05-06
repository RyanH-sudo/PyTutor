'use client';

import { ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface ConnectionProps {
  /** Lesson IDs of related material */
  back?: { id: string; title: string }[];
  forward?: { id: string; title: string }[];
  children?: ReactNode;
}

/**
 * The "Connections" block at the end of every lesson.
 *
 * Backward links remind the learner where this idea was set up.
 * Forward links hint where it's going. This is the spaced-repetition
 * scaffolding made visible — the lesson is part of a web, not a list.
 */
export function Connection({ back = [], forward = [], children }: ConnectionProps) {
  if (back.length === 0 && forward.length === 0 && !children) return null;

  return (
    <div className="my-6 rounded-lg border border-border bg-muted/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Connections
        </span>
      </div>

      {children && (
        <div className="font-serif text-[1.05rem] leading-relaxed text-foreground/90 mb-4">
          {children}
        </div>
      )}

      {back.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-sans text-muted-foreground mb-1.5">
            Builds on
          </div>
          <ul className="space-y-1">
            {back.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/lessons/${l.id}/`}
                  className="text-sm font-serif inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {forward.length > 0 && (
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1.5">
            Sets up
          </div>
          <ul className="space-y-1">
            {forward.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/lessons/${l.id}/`}
                  className="text-sm font-serif inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
