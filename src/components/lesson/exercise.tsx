'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeRunner } from './code-runner';
import type { ReactNode } from 'react';

export interface ExerciseProps {
  /** A title shown above the editor */
  title: string;
  /** The instructions / prompt */
  prompt: ReactNode;
  /** Starting code in the editor */
  starter: string;
  /** Expected stdout - if matched, the exercise is "passed" */
  expected?: string;
  /** Hints, revealed one at a time */
  hints?: string[];
  /** A reference solution, hidden until "show solution" is clicked */
  solution?: string;
}

/**
 * A full exercise unit: prompt + code editor + hints + reference solution.
 *
 * Pedagogy: hints are revealed progressively. The first one nudges the
 * learner toward the relevant concept without giving the answer. Each
 * subsequent hint moves closer. The solution is only revealed if the
 * learner explicitly clicks to show it.
 */
export function Exercise({
  title,
  prompt,
  starter,
  expected,
  hints = [],
  solution,
}: ExerciseProps) {
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);

  return (
    <div className="my-8 rounded-lg border-2 border-primary/30 overflow-hidden">
      <div className="border-b border-primary/20 bg-primary/5 px-5 py-3">
        <div className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-1">
          Exercise
        </div>
        <h4 className="font-sans text-base font-semibold">{title}</h4>
      </div>

      <div className="p-5">
        <div className="font-serif text-[1.05rem] leading-relaxed text-foreground mb-4">
          {prompt}
        </div>

        <CodeRunner initial={starter} expected={expected} rows={10} />

        {hints.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Hints ({hintsRevealed} / {hints.length})
              </span>
              {hintsRevealed < hints.length && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5 h-7 text-xs"
                  onClick={() => setHintsRevealed((v) => v + 1)}
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  reveal next hint
                </Button>
              )}
            </div>
            <AnimatePresence>
              {hints.slice(0, hintsRevealed).map((hint, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-md bg-muted/40 px-4 py-2.5 mb-2 text-sm font-serif italic text-muted-foreground">
                    Hint {i + 1}: {hint}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {solution && (
          <div className="mt-4">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => setSolutionShown((v) => !v)}
            >
              {solutionShown ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
              {solutionShown ? 'hide reference solution' : 'show reference solution'}
            </Button>
            <AnimatePresence>
              {solutionShown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3">
                    <CodeRunner
                      initial={solution}
                      title="Reference solution"
                      readonly
                      rows={Math.min(15, solution.split('\n').length + 1)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
