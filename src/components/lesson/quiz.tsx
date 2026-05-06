'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuizChoice {
  text: string;
  correct?: boolean;
  explain?: string; // shown after the user picks this option
}

export interface QuizProps {
  question: string;
  choices: QuizChoice[];
  /** Multiple correct answers allowed? */
  multiple?: boolean;
}

/**
 * Inline multiple-choice quiz. Designed for self-check, not grading.
 *
 * The UX deliberately rewards reflection: clicking a wrong answer
 * doesn't punish you, it just shows the explanation. You can change
 * your mind. The point is to think.
 */
export function Quiz({ question, choices, multiple = false }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const onSelect = (i: number) => {
    setSelected(i);
  };

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="h-4 w-4 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider text-primary/80">
          Self-check
        </span>
      </div>
      <p className="font-serif text-[1.05rem] leading-relaxed text-foreground mb-4">
        {question}
      </p>

      <div className="space-y-2">
        {choices.map((c, i) => {
          const isSelected = selected === i;
          const showResult = isSelected;
          const isCorrect = c.correct;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                'w-full text-left rounded-md border px-4 py-3 transition-all',
                'hover:bg-muted/50',
                isSelected && isCorrect && 'border-success bg-success/10',
                isSelected &&
                  !isCorrect &&
                  'border-destructive bg-destructive/10',
                !isSelected && 'border-border'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-0.5 h-5 w-5 shrink-0 rounded-full border flex items-center justify-center',
                    isSelected && isCorrect && 'border-success bg-success',
                    isSelected &&
                      !isCorrect &&
                      'border-destructive bg-destructive',
                    !isSelected && 'border-muted-foreground/30'
                  )}
                >
                  {showResult && isCorrect && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                  {showResult && !isCorrect && (
                    <X className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[1rem]">{c.text}</div>
                  <AnimatePresence>
                    {showResult && c.explain && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p
                          className={cn(
                            'mt-2 text-sm font-serif italic',
                            isCorrect
                              ? 'text-success'
                              : 'text-muted-foreground'
                          )}
                        >
                          {c.explain}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
