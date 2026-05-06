'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface SectionProps {
  /** A short label for the section, shown in the divider */
  label: string;
  /** Optional small icon-or-emoji rendered to the left of the label */
  icon?: string;
  children: ReactNode;
  /** Reduce spacing on small screens? */
  dense?: boolean;
}

/**
 * A labeled, divider-style section header inside a lesson.
 *
 * Example:
 *   <Section label="The Word">
 *     ...prose...
 *   </Section>
 *
 * Renders a horizontal rule with a label embedded in it, then the body.
 * Used to mark the standard lesson sections (THE OPENING, THE WORD,
 * THE WHY, THE WHAT, THE HOW, YOU TRY, TALK ABOUT IT, CONNECTIONS).
 */
export function Section({ label, icon, children, dense }: SectionProps) {
  return (
    <section className={cn('my-10', dense && 'my-7')}>
      <div className="flex items-center gap-3 mb-4 select-none">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div>{children}</div>
    </section>
  );
}
