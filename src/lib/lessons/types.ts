/**
 * Lesson types — the schema every lesson conforms to.
 *
 * A "lesson" in PyTutor is more than a page. It carries:
 *   - identity (id, volume, chapter, sequence)
 *   - pedagogy (estimated time, prerequisites, key terms)
 *   - state shape (exercises, checkpoints)
 *   - the rendered content itself (loaded lazily as an MDX module)
 *
 * Why these specific fields?
 *
 * `id` — stable string identifier so we can refer to a lesson without
 * caring about its position. Renumbering volumes shouldn't break links.
 *
 * `volume` and `chapter` — pedagogical grouping. A volume is a "book"
 * of related concepts (Volume 1 is Foundations). A chapter is a
 * coherent run inside a volume (Chapter 3 is Strings).
 *
 * `key_terms` — these get auto-added to the glossary as the learner
 * progresses. Each term has its own etymology entry.
 *
 * `prerequisites` — lesson IDs the learner should have completed first.
 * The app warns if you jump ahead but doesn't block — autonomy matters.
 *
 * `checkpoint` — a checkpoint lesson means "the next volume needs you
 * to have mastered this." We surface checkpoints differently in the UI.
 */

export type VolumeId =
  | 'volume-00-welcome'
  | 'volume-01-foundations'
  | 'volume-02-data-and-names'
  | 'volume-03-containers'
  | 'volume-04-flow'
  | 'volume-05-functions'
  | 'volume-06-objects'
  | 'volume-07-stdlib'
  | 'volume-08-algorithms'
  | 'volume-09-production'
  | 'volume-10-applied-ai'
  | 'volume-11-fde-mindset'
  | 'volume-12-capstone';

export interface Volume {
  id: VolumeId;
  number: number; // 0..12
  title: string;
  subtitle: string;
  description: string;
  color: string; // CSS variable name for accent
  estimatedHours: number;
  lessonCount: number;
}

export interface LessonMetadata {
  id: string; // e.g. "0-1-the-letter"
  volume: VolumeId;
  chapter: number; // 1-indexed
  number: number; // 1-indexed within volume (sequence order)
  title: string;
  subtitle?: string;
  estimatedMinutes: number;
  prerequisites: string[]; // lesson ids
  keyTerms: string[]; // terms auto-added to glossary
  exerciseCount: number;
  checkpoint: boolean;
  tags: LessonTag[];
}

export type LessonTag =
  | 'theory'
  | 'practice'
  | 'history'
  | 'etymology'
  | 'interview'
  | 'fde'
  | 'capstone';

export interface LessonContent extends LessonMetadata {
  // The raw MDX/markdown body, parsed at runtime
  body: string;
  // Path to the file (debug)
  filepath: string;
}

/** Navigation neighbors — used in the lesson view footer */
export interface LessonNeighbors {
  previous: LessonMetadata | null;
  next: LessonMetadata | null;
}

/** A learner's relationship to a lesson */
export interface LessonState {
  lessonId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  startedAt: number | null;
  completedAt: number | null;
  exercisesPassed: number;
  exercisesTotal: number;
  notes: string;
  // Spaced repetition mastery 0..1
  mastery: number;
}
