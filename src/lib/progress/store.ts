'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LessonState } from '@/lib/lessons/types';

/**
 * Progress store — what the learner has completed, mastered, and revisited.
 *
 * Persisted to localStorage under key `pytutor-progress-v1`.
 * Schema versioning is intentional: when we change the shape, bump the
 * key so old data doesn't crash the new schema. Better to lose progress
 * than to crash on first load.
 *
 * No "streak" feature on purpose. The pedagogy here is: come back when
 * you can. The app shouldn't make you feel guilty.
 */

export interface ProgressState {
  // Map from lessonId to that lesson's state
  lessons: Record<string, LessonState>;
  // The current lesson the learner is on (or null if just opened the app)
  currentLessonId: string | null;
  // Total minutes spent in lessons (rough estimate)
  totalMinutes: number;
  // When did we first launch?
  firstLaunchAt: number;
  // Spaced repetition queue: lesson ids ordered by next-review time
  reviewQueue: string[];
}

export interface ProgressActions {
  startLesson: (id: string, exerciseCount: number) => void;
  completeLesson: (id: string) => void;
  recordExercise: (id: string, passed: boolean) => void;
  updateNotes: (id: string, notes: string) => void;
  setCurrentLesson: (id: string | null) => void;
  resetAllProgress: () => void;
  getLessonState: (id: string) => LessonState | null;
}

const emptyLessonState = (
  id: string,
  exerciseCount: number
): LessonState => ({
  lessonId: id,
  status: 'not-started',
  startedAt: null,
  completedAt: null,
  exercisesPassed: 0,
  exercisesTotal: exerciseCount,
  notes: '',
  mastery: 0,
});

export const useProgress = create<ProgressState & ProgressActions>()(
  persist(
    (set, get) => ({
      lessons: {},
      currentLessonId: null,
      totalMinutes: 0,
      firstLaunchAt: Date.now(),
      reviewQueue: [],

      startLesson: (id, exerciseCount) =>
        set((s) => {
          const existing = s.lessons[id];
          if (existing && existing.status !== 'not-started') return s;
          return {
            lessons: {
              ...s.lessons,
              [id]: {
                ...emptyLessonState(id, exerciseCount),
                status: 'in-progress',
                startedAt: Date.now(),
              },
            },
            currentLessonId: id,
          };
        }),

      completeLesson: (id) =>
        set((s) => {
          const existing =
            s.lessons[id] ?? emptyLessonState(id, 0);
          return {
            lessons: {
              ...s.lessons,
              [id]: {
                ...existing,
                status: 'completed',
                completedAt: Date.now(),
                mastery: Math.max(existing.mastery, 0.5),
              },
            },
          };
        }),

      recordExercise: (id, passed) =>
        set((s) => {
          const existing =
            s.lessons[id] ?? emptyLessonState(id, 1);
          return {
            lessons: {
              ...s.lessons,
              [id]: {
                ...existing,
                exercisesPassed: passed
                  ? existing.exercisesPassed + 1
                  : existing.exercisesPassed,
              },
            },
          };
        }),

      updateNotes: (id, notes) =>
        set((s) => {
          const existing =
            s.lessons[id] ?? emptyLessonState(id, 0);
          return {
            lessons: {
              ...s.lessons,
              [id]: { ...existing, notes },
            },
          };
        }),

      setCurrentLesson: (id) => set({ currentLessonId: id }),

      resetAllProgress: () =>
        set({
          lessons: {},
          currentLessonId: null,
          totalMinutes: 0,
          firstLaunchAt: Date.now(),
          reviewQueue: [],
        }),

      getLessonState: (id) => get().lessons[id] ?? null,
    }),
    {
      name: 'pytutor-progress-v1',
    }
  )
);

/** Read-only summary numbers for the dashboard */
export function summarize(state: ProgressState) {
  const all = Object.values(state.lessons);
  const completed = all.filter((l) => l.status === 'completed').length;
  const inProgress = all.filter((l) => l.status === 'in-progress').length;
  return { completed, inProgress, totalTouched: all.length };
}
