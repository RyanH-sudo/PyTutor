'use client';

import { AppShell } from '@/components/shell/app-shell';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('pytutor-theme');
    setTheme(stored === 'light' ? 'light' : 'dark');
  }, []);

  const updateTheme = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('pytutor-theme', next);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-sans text-3xl font-bold tracking-tight mb-8">
          Settings
        </h1>

        <section className="rounded-lg border border-border bg-card p-5 mb-6">
          <h2 className="font-sans font-semibold mb-3">Theme</h2>
          <div className="flex gap-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => updateTheme('light')}
            >
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => updateTheme('dark')}
            >
              Dark
            </Button>
          </div>
          <p className="text-sm text-muted-foreground italic font-serif mt-3">
            The default is dark — a quiet study room at night.
          </p>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-sans font-semibold mb-3">About</h2>
          <p className="font-serif text-foreground/80">
            PyTutor was built by Ryan Haig as a personal Python tutor and
            shared open-source so others (especially curious siblings) can
            learn the same way: slowly, etymologically, with patience.
          </p>
          <p className="font-serif text-foreground/80 mt-3">
            MIT licensed. Source on{' '}
            <a
              href="https://github.com/RyanH-sudo"
              className="text-primary underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </AppShell>
  );
}
