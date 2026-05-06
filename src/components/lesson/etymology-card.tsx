'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EtymologyCardProps {
  /** The English word being explained */
  term: string;
  /** Language family the word came from, e.g. "Latin", "Old French" */
  origin: string;
  /** The original word in its native script */
  rootForm: string;
  /** Literal meaning of the root */
  rootMeaning: string;
  /** A short paragraph telling the story of how the word evolved */
  story: string;
  /** When did this word enter the technical vocabulary of computing? */
  entryToComputing?: string;
  /** Why we care — what insight this etymology gives us */
  insight?: string;
  /** Open by default? */
  defaultOpen?: boolean;
}

/**
 * The etymology card — a slow-paced exploration of where a word came from.
 *
 * This is the soul of PyTutor's pedagogy. Programmers throw words around
 * like "operator" and "argument" without ever asking where they came from.
 * Knowing the etymology gives the term a hook in your memory it didn't
 * have before.
 *
 * Visual: when collapsed, just a slim banner with the term. Click to
 * expand and see the full story with a soft slide animation.
 */
export function EtymologyCard({
  term,
  origin,
  rootForm,
  rootMeaning,
  story,
  entryToComputing,
  insight,
  defaultOpen = false,
}: EtymologyCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="my-6 rounded-lg border border-etymology/30 bg-etymology/5 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-etymology/10',
          open && 'bg-etymology/10'
        )}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5">
          <BookOpen className="h-4 w-4 text-etymology" />
          <span className="text-xs font-mono uppercase tracking-wider text-etymology/80">
            Etymology
          </span>
          <span className="font-serif text-base italic text-foreground">
            {term}
          </span>
          <span className="text-xs text-muted-foreground font-sans">
            <span className="opacity-60">←</span> {origin},{' '}
            <em>{rootForm}</em>
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-4 font-serif text-[1.05rem] leading-relaxed">
              <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-sm">
                <span className="font-sans uppercase tracking-wider text-xs text-muted-foreground self-center">
                  Origin
                </span>
                <span>{origin}</span>
                <span className="font-sans uppercase tracking-wider text-xs text-muted-foreground self-center">
                  Root form
                </span>
                <span className="font-mono">
                  <em>{rootForm}</em>
                </span>
                <span className="font-sans uppercase tracking-wider text-xs text-muted-foreground self-center">
                  Literal meaning
                </span>
                <span>"{rootMeaning}"</span>
              </div>

              <p className="text-foreground/90">{story}</p>

              {entryToComputing && (
                <div className="border-l-2 border-etymology/40 pl-4 py-1">
                  <div className="text-xs font-sans uppercase tracking-wider text-muted-foreground mb-1">
                    Into computing
                  </div>
                  <p className="text-foreground/85 text-[1rem]">
                    {entryToComputing}
                  </p>
                </div>
              )}

              {insight && (
                <div className="border-l-2 border-primary/50 pl-4 py-1">
                  <div className="text-xs font-sans uppercase tracking-wider text-muted-foreground mb-1">
                    Why this matters
                  </div>
                  <p className="text-foreground/85 text-[1rem]">{insight}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
