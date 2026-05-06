import Link from 'next/link';
import { AppShell } from '@/components/shell/app-shell';
import { volumes } from '@/lib/lessons/volumes';
import { getLessonsByVolume } from '@/lib/lessons/registry';

export default function LessonsIndexPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="font-sans text-3xl font-bold tracking-tight mb-2">
            All lessons
          </h1>
          <p className="font-serif text-foreground/80">
            The full curriculum, organized by volume. Authored lessons are
            linked. Planned lessons are listed for context.
          </p>
        </header>

        {volumes.map((v) => {
          const lessons = getLessonsByVolume(v.id);
          return (
            <section key={v.id} className="mb-10">
              <header className="mb-3 flex items-baseline gap-3">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(v.number).padStart(2, '0')}
                </span>
                <h2 className="font-sans text-xl font-semibold tracking-tight">
                  {v.title}
                </h2>
                <span className="text-sm text-muted-foreground italic font-serif">
                  {v.subtitle}
                </span>
              </header>
              {lessons.length === 0 ? (
                <p className="text-sm font-serif italic text-muted-foreground pl-7">
                  Planning {v.lessonCount} lessons. Authoring in progress.
                </p>
              ) : (
                <ul className="pl-7 space-y-1.5">
                  {lessons.map((l) => (
                    <li key={l.id}>
                      <Link
                        href={`/lessons/${l.id}/`}
                        className="group flex items-baseline gap-3 hover:text-primary transition-colors"
                      >
                        <span className="font-mono text-xs text-muted-foreground">
                          {l.number.toString().padStart(2, '0')}
                        </span>
                        <span className="font-serif text-base">{l.title}</span>
                        {l.subtitle && (
                          <span className="text-sm text-muted-foreground italic">
                            — {l.subtitle}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
