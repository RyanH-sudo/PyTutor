'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { ReactNode } from 'react';

export interface KeyTermProps {
  term: string;
  brief: string; // one-line definition
  children: ReactNode; // the inline content (usually the term itself)
}

/**
 * Inline key term with hover-popover definition.
 *
 * In MDX:
 *   <KeyTerm term="operator" brief="A symbol that performs an action on values."> operator </KeyTerm>
 *
 * Hover (or focus) the underlined word to see its definition without
 * leaving your reading flow.
 */
export function KeyTerm({ term, brief, children }: KeyTermProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="etymology-term" tabIndex={0} aria-label={`Definition of ${term}`}>
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80" sideOffset={8}>
        <div className="space-y-1.5">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {term}
          </div>
          <p className="font-serif text-sm leading-relaxed">{brief}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
