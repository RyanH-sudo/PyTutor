import type { LessonContent } from './types';
import { lessons as authoredLessons } from '@/content/registry';

/**
 * Load a single lesson by id, including its full body.
 *
 * Lessons are bundled at build time so the deployment is a static export.
 * No runtime fetching, no server, no surprises.
 */
export function loadLesson(id: string): LessonContent | null {
  const found = authoredLessons.find((l) => l.metadata.id === id);
  if (!found) return null;
  return {
    ...found.metadata,
    body: found.body,
    filepath: found.filepath,
  };
}
