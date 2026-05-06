'use client';

import { MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export interface InterviewPhraseProps {
  /** Optional setup describing the interview context */
  setup?: string;
  children: ReactNode;
}

/**
 * "Talk about it" — how the concept sounds out of your mouth in an
 * interview. The point of this card is muscle-memory of phrasing, not
 * just understanding. After encountering it ten times across lessons,
 * the phrase comes out naturally.
 */
export function InterviewPhrase({ setup, children }: InterviewPhraseProps) {
  return (
    <aside className="my-6 rounded-lg border border-interview/30 bg-interview/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-interview/15 p-1.5 mt-0.5">
          <MessageCircle className="h-4 w-4 text-interview" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-mono uppercase tracking-wider text-interview/80 mb-1.5">
            Talk about it
          </div>
          {setup && (
            <p className="text-xs text-muted-foreground italic mb-2 font-sans">
              {setup}
            </p>
          )}
          <blockquote className="font-serif text-[1.05rem] leading-relaxed text-foreground/90 border-l-2 border-interview/40 pl-4">
            {children}
          </blockquote>
        </div>
      </div>
    </aside>
  );
}
