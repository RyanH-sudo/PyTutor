'use client';

import { AppShell } from '@/components/shell/app-shell';
import { useProgress, summarize } from '@/lib/progress/store';
import { volumes } from '@/lib/lessons/volumes';
import { getAllLessons, getLessonsByVolume } from '@/lib/lessons/registry';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProgressPage() {
  const lessons = useProgress((s) => s.lessons);
  const reset = useProgress((s) => s.resetAllProgress);
  const [confirmReset, setConfirmReset] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const allLessons = getAllLessons();
  const totalAuthored = allLessons.length;

  const summary = summarize({ lessons } as any);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="font-sans text-3xl font-bold tracking-tight mb-2">
            Your progress
          </h1>
          <p className="font-serif text-foreground/80">
            The shape of what you've worked on. No streaks, no ranks. Just a
            picture.
          </p>
        </header>

        {hydrated && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Stat
                label="Lessons completed"
                value={summary.completed.toString()}
                of={totalAuthored.toString()}
              />
              <Stat
                label="In progress"
                value={summary.inProgress.toString()}
              />
              <Stat
                label="Touched at least once"
                value={summary.totalTouched.toString()}
                of={totalAuthored.toString()}
              />
            </div>

            <section className="space-y-4 mb-12">
              {volumes.map((v) => {
                const vLessons = getLessonsByVolume(v.id);
                if (vLessons.length === 0) return null;
                const completed = vLessons.filter(
                  (l) => lessons[l.id]?.status === 'completed'
                ).length;
                const pct = (completed / vLessons.length) * 100;
                return (
                  <div
                    key={v.id}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-sans font-semibold">{v.title}</h3>
                      <span className="text-sm font-mono text-muted-foreground">
                        {completed} / {vLessons.length}
                      </span>
                    </div>
                    <Progress value={pct} />
                  </div>
                );
              })}
            </section>

            <section className="border-t border-border pt-6">
              <h3 className="font-sans font-semibold mb-3">
                Reset progress
              </h3>
              <p className="font-serif text-sm text-muted-foreground mb-3">
                Wipes your lesson states from this browser. Useful if you're
                handing the app to your brother and want him to start fresh.
              </p>
              {confirmReset ? (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      reset();
                      setConfirmReset(false);
                    }}
                  >
                    Yes, reset everything
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setConfirmReset(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setConfirmReset(true)}
                >
                  Reset all progress
                </Button>
              )}
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  of,
}: {
  label: string;
  value: string;
  of?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </div>
      <div className="text-3xl font-sans font-bold tracking-tight">
        {value}
        {of && (
          <span className="text-base font-normal text-muted-foreground ml-1">
            / {of}
          </span>
        )}
      </div>
    </div>
  );
}
