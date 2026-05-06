import { notFound } from 'next/navigation';
import { AppShell } from '@/components/shell/app-shell';
import { LessonView } from '@/components/lesson/lesson-view';
import { getAllLessons } from '@/lib/lessons/registry';
import { loadLesson } from '@/lib/lessons/load';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ id: l.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = loadLesson(id);
  if (!lesson) {
    notFound();
  }
  return (
    <AppShell>
      <LessonView lesson={lesson} />
    </AppShell>
  );
}
