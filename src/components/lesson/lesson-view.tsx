'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ArrowLeft, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LessonContent } from '@/lib/lessons/types';
import { mdxComponents } from './mdx-components';
import { getLessonNeighbors } from '@/lib/lessons/registry';
import { useProgress } from '@/lib/progress/store';
import { LessonMDX } from './lesson-mdx';

export function LessonView({ lesson }: { lesson: LessonContent }) {
  const startLesson = useProgress((s) => s.startLesson);
  const completeLesson = useProgress((s) => s.completeLesson);
  const lessonState = useProgress((s) => s.lessons[lesson.id]);

  const neighbors = getLessonNeighbors(lesson.id);

  useEffect(() => {
    startLesson(lesson.id, lesson.exerciseCount);
  }, [lesson.id, lesson.exerciseCount, startLesson]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10 md:py-14 animate-fade-in">
      {/* Lesson header */}
      <header className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
          <span>Volume {lesson.volume.split('-')[1]}</span>
          <span>·</span>
          <span>Lesson {lesson.number}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ~{lesson.estimatedMinutes} min
          </span>
        </div>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {lesson.title}
        </h1>
        {lesson.subtitle && (
          <p className="mt-3 font-serif text-lg italic text-muted-foreground">
            {lesson.subtitle}
          </p>
        )}
      </header>

      <div className="prose-lesson">
        <LessonMDX source={lesson.body} />
      </div>

      {/* Lesson footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => completeLesson(lesson.id)}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            {lessonState?.status === 'completed'
              ? 'Marked complete ✓'
              : 'Mark lesson complete'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {neighbors.previous ? (
            <Link
              href={`/lessons/${neighbors.previous.id}/`}
              className="group rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition-colors"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Previous
              </div>
              <div className="font-serif text-base group-hover:text-primary transition-colors">
                {neighbors.previous.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {neighbors.next ? (
            <Link
              href={`/lessons/${neighbors.next.id}/`}
              className="group rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition-colors text-right"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1 justify-end">
                Next
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="font-serif text-base group-hover:text-primary transition-colors">
                {neighbors.next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </article>
  );
}
