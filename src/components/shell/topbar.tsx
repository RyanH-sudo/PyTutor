'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function TopBar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('pytutor-theme');
    setIsDark(stored !== 'light');
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('pytutor-theme', next ? 'dark' : 'light');
  };

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="md:hidden font-sans font-semibold tracking-tight"
        >
          PyTutor
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <Button asChild variant="ghost" size="icon" aria-label="Glossary">
          <Link href="/glossary/">
            <Search className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
