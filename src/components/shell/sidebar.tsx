'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { volumes } from '@/lib/lessons/volumes';
import { getLessonsByVolume } from '@/lib/lessons/registry';
import { useProgress } from '@/lib/progress/store';
import { CheckCircle2, Circle, Dot, BookOpen, Search, Home, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const lessonState = useProgress((s) => s.lessons);
  const [openVolumes, setOpenVolumes] = useState<Set<string>>(
    new Set(['volume-00-welcome'])
  );

  const toggleVolume = (id: string) => {
    setOpenVolumes((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="w-72 shrink-0 border-r border-border bg-card/50 hidden md:flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <Link href="/" className="block group">
          <div className="text-lg font-sans font-semibold tracking-tight">
            PyTutor
          </div>
          <div className="text-xs text-muted-foreground font-serif italic mt-0.5">
            slow Python, deeply understood
          </div>
        </Link>
      </div>

      <nav className="px-3 py-3 space-y-0.5">
        <NavLink href="/" icon={Home} label="Home" active={pathname === '/'} />
        <NavLink
          href="/glossary/"
          icon={Search}
          label="Glossary"
          active={pathname?.startsWith('/glossary')}
        />
        <NavLink
          href="/progress/"
          icon={BookOpen}
          label="Progress"
          active={pathname?.startsWith('/progress')}
        />
        <NavLink
          href="/settings/"
          icon={Settings}
          label="Settings"
          active={pathname?.startsWith('/settings')}
        />
      </nav>

      <div className="px-3 py-2 border-t border-border">
        <div className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Curriculum
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 pb-6">
          {volumes.map((v) => {
            const isOpen = openVolumes.has(v.id);
            const lessons = getLessonsByVolume(v.id);
            const completed = lessons.filter(
              (l) => lessonState[l.id]?.status === 'completed'
            ).length;
            return (
              <div key={v.id} className="mb-1">
                <button
                  onClick={() => toggleVolume(v.id)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted/50 transition-colors',
                    'flex items-start gap-2'
                  )}
                >
                  <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0">
                    {String(v.number).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <div className="font-sans font-medium text-sm leading-tight">
                      {v.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {lessons.length > 0
                        ? `${completed}/${lessons.length} lessons`
                        : `${v.lessonCount} planned`}
                    </div>
                  </span>
                </button>
                {isOpen && lessons.length > 0 && (
                  <ul className="mt-0.5 ml-6 mb-2 space-y-0.5">
                    {lessons.map((l) => {
                      const state = lessonState[l.id];
                      const completed = state?.status === 'completed';
                      const inProgress = state?.status === 'in-progress';
                      const isCurrent = pathname === `/lessons/${l.id}/`;
                      return (
                        <li key={l.id}>
                          <Link
                            href={`/lessons/${l.id}/`}
                            className={cn(
                              'flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm hover:bg-muted/50 transition-colors',
                              isCurrent && 'bg-primary/10 text-primary',
                              !isCurrent && 'text-foreground/80'
                            )}
                          >
                            {completed ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                            ) : inProgress ? (
                              <Dot className="h-3.5 w-3.5 text-primary shrink-0" />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                            )}
                            <span className="truncate font-serif text-[0.95rem]">
                              {l.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}

function NavLink({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: typeof Home;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors',
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-foreground/80 hover:bg-muted/50'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
