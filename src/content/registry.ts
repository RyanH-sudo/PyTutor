import type { LessonMetadata } from '@/lib/lessons/types';
import { parseFrontmatter } from './parse-frontmatter';

/**
 * The static lesson registry.
 *
 * Each lesson is imported as a raw string (Next.js webpack handles the
 * `?raw` suffix to inline file contents). We parse the frontmatter at
 * module load and produce a shape the rest of the app consumes.
 *
 * Adding a new lesson:
 *   1. Author src/content/<volume>/<lesson-id>.md with frontmatter.
 *   2. Add an import line below.
 *   3. Add an entry in `rawSources`.
 */

// Volume 0 — Welcome
import vol0_1 from './volume-00-welcome/00-1-the-letter.md';
import vol0_2 from './volume-00-welcome/00-2-how-to-use.md';
import vol0_3 from './volume-00-welcome/00-3-how-learning-works.md';
import vol0_4 from './volume-00-welcome/00-4-language-of-programmers.md';
import vol0_5 from './volume-00-welcome/00-5-history-in-brief.md';
import vol0_6 from './volume-00-welcome/00-6-fde-mindset.md';
import vol0_7 from './volume-00-welcome/00-7-mistakes-that-help.md';
import vol0_8 from './volume-00-welcome/00-8-the-pact.md';

// Volume 1 — Foundations
import vol1_1 from './volume-01-foundations/01-1-what-is-a-computer.md';
import vol1_2 from './volume-01-foundations/01-2-binary-and-base-2.md';
import vol1_3 from './volume-01-foundations/01-3-anatomy-of-a-computer.md';
import vol1_4 from './volume-01-foundations/01-4-instructions-to-languages.md';
import vol1_5 from './volume-01-foundations/01-5-meet-python.md';
import vol1_6 from './volume-01-foundations/01-6-the-repl.md';
import vol1_7 from './volume-01-foundations/01-7-syntax-and-semantics.md';
import vol1_8 from './volume-01-foundations/01-8-your-first-program.md';
import vol1_9 from './volume-01-foundations/01-9-comments-and-docstrings.md';
import vol1_10 from './volume-01-foundations/01-10-input-and-the-conversation.md';
import vol1_11 from './volume-01-foundations/01-11-types-the-shape-of-data.md';
import vol1_12 from './volume-01-foundations/01-12-integers.md';
import vol1_13 from './volume-01-foundations/01-13-floats-the-trap.md';
import vol1_14 from './volume-01-foundations/01-14-booleans.md';
import vol1_15 from './volume-01-foundations/01-15-strings-introduction.md';
import vol1_16 from './volume-01-foundations/01-16-variables-as-names.md';
import vol1_17 from './volume-01-foundations/01-17-expressions-vs-statements.md';
import vol1_18 from './volume-01-foundations/01-18-operators-and-precedence.md';
import vol1_19 from './volume-01-foundations/01-19-the-print-function.md';
import vol1_20 from './volume-01-foundations/01-20-chapter-3-recap.md';
import vol1_21 from './volume-01-foundations/01-21-strings-deep-dive-intro.md';
import vol1_22 from './volume-01-foundations/01-22-slicing.md';
import vol1_23 from './volume-01-foundations/01-23-string-methods.md';
import vol1_24 from './volume-01-foundations/01-24-string-formatting.md';
import vol1_25 from './volume-01-foundations/01-25-escapes-and-raw-strings.md';
import vol1_26 from './volume-01-foundations/01-26-encoding-and-bytes.md';
import vol1_27 from './volume-01-foundations/01-27-string-recap.md';
import vol1_28 from './volume-01-foundations/01-28-control-flow-intro.md';
import vol1_29 from './volume-01-foundations/01-29-while-loops.md';
import vol1_30 from './volume-01-foundations/01-30-for-loops.md';

// Volume 2 — Names, Values, Memory (seed)
import vol2_1 from './volume-02-data-and-names/02-1-the-deep-name-model.md';
import vol2_2 from './volume-02-data-and-names/02-2-binary-deeper.md';

// Volume 3 — Containers (seed)
import vol3_1 from './volume-03-containers/03-1-lists-introduction.md';
import vol3_2 from './volume-03-containers/03-2-dicts-introduction.md';

// Volume 4 — Flow (seed)
import vol4_1 from './volume-04-flow/04-1-the-philosophy-of-branching.md';

// Volume 5 — Functions (seed)
import vol5_1 from './volume-05-functions/05-1-functions-introduction.md';

// Volume 6 — Objects (seed)
import vol6_1 from './volume-06-objects/06-1-everything-is-an-object.md';

// Volume 7 — Standard Library (seed)
import vol7_1 from './volume-07-stdlib/07-1-batteries-included.md';

// Volume 8 — Algorithms (seed)
import vol8_1 from './volume-08-algorithms/08-1-big-o-for-humans.md';
import vol8_2 from './volume-08-algorithms/08-2-hash-maps-deep-dive.md';

// Volume 9 — Production (seed)
import vol9_1 from './volume-09-production/09-1-virtual-environments.md';

// Volume 10 — Applied AI (seed)
import vol10_1 from './volume-10-applied-ai/10-1-how-llms-work.md';
import vol10_2 from './volume-10-applied-ai/10-2-claude-api-first-call.md';
import vol10_3 from './volume-10-applied-ai/10-3-embeddings-explained.md';

// Volume 11 — FDE Mindset (seed)
import vol11_1 from './volume-11-fde-mindset/11-1-what-an-fde-actually-does.md';

// Volume 12 — Capstone (seed)
import vol12_1 from './volume-12-capstone/12-1-overview.md';

const rawSources: { source: string; filepath: string }[] = [
  // Volume 0
  { source: vol0_1, filepath: 'volume-00-welcome/00-1-the-letter.md' },
  { source: vol0_2, filepath: 'volume-00-welcome/00-2-how-to-use.md' },
  { source: vol0_3, filepath: 'volume-00-welcome/00-3-how-learning-works.md' },
  { source: vol0_4, filepath: 'volume-00-welcome/00-4-language-of-programmers.md' },
  { source: vol0_5, filepath: 'volume-00-welcome/00-5-history-in-brief.md' },
  { source: vol0_6, filepath: 'volume-00-welcome/00-6-fde-mindset.md' },
  { source: vol0_7, filepath: 'volume-00-welcome/00-7-mistakes-that-help.md' },
  { source: vol0_8, filepath: 'volume-00-welcome/00-8-the-pact.md' },
  // Volume 1
  { source: vol1_1, filepath: 'volume-01-foundations/01-1-what-is-a-computer.md' },
  { source: vol1_2, filepath: 'volume-01-foundations/01-2-binary-and-base-2.md' },
  { source: vol1_3, filepath: 'volume-01-foundations/01-3-anatomy-of-a-computer.md' },
  { source: vol1_4, filepath: 'volume-01-foundations/01-4-instructions-to-languages.md' },
  { source: vol1_5, filepath: 'volume-01-foundations/01-5-meet-python.md' },
  { source: vol1_6, filepath: 'volume-01-foundations/01-6-the-repl.md' },
  { source: vol1_7, filepath: 'volume-01-foundations/01-7-syntax-and-semantics.md' },
  { source: vol1_8, filepath: 'volume-01-foundations/01-8-your-first-program.md' },
  { source: vol1_9, filepath: 'volume-01-foundations/01-9-comments-and-docstrings.md' },
  { source: vol1_10, filepath: 'volume-01-foundations/01-10-input-and-the-conversation.md' },
  { source: vol1_11, filepath: 'volume-01-foundations/01-11-types-the-shape-of-data.md' },
  { source: vol1_12, filepath: 'volume-01-foundations/01-12-integers.md' },
  { source: vol1_13, filepath: 'volume-01-foundations/01-13-floats-the-trap.md' },
  { source: vol1_14, filepath: 'volume-01-foundations/01-14-booleans.md' },
  { source: vol1_15, filepath: 'volume-01-foundations/01-15-strings-introduction.md' },
  { source: vol1_16, filepath: 'volume-01-foundations/01-16-variables-as-names.md' },
  { source: vol1_17, filepath: 'volume-01-foundations/01-17-expressions-vs-statements.md' },
  { source: vol1_18, filepath: 'volume-01-foundations/01-18-operators-and-precedence.md' },
  { source: vol1_19, filepath: 'volume-01-foundations/01-19-the-print-function.md' },
  { source: vol1_20, filepath: 'volume-01-foundations/01-20-chapter-3-recap.md' },
  { source: vol1_21, filepath: 'volume-01-foundations/01-21-strings-deep-dive-intro.md' },
  { source: vol1_22, filepath: 'volume-01-foundations/01-22-slicing.md' },
  { source: vol1_23, filepath: 'volume-01-foundations/01-23-string-methods.md' },
  { source: vol1_24, filepath: 'volume-01-foundations/01-24-string-formatting.md' },
  { source: vol1_25, filepath: 'volume-01-foundations/01-25-escapes-and-raw-strings.md' },
  { source: vol1_26, filepath: 'volume-01-foundations/01-26-encoding-and-bytes.md' },
  { source: vol1_27, filepath: 'volume-01-foundations/01-27-string-recap.md' },
  { source: vol1_28, filepath: 'volume-01-foundations/01-28-control-flow-intro.md' },
  { source: vol1_29, filepath: 'volume-01-foundations/01-29-while-loops.md' },
  { source: vol1_30, filepath: 'volume-01-foundations/01-30-for-loops.md' },
  // Volume 2
  { source: vol2_1, filepath: 'volume-02-data-and-names/02-1-the-deep-name-model.md' },
  { source: vol2_2, filepath: 'volume-02-data-and-names/02-2-binary-deeper.md' },
  // Volume 3
  { source: vol3_1, filepath: 'volume-03-containers/03-1-lists-introduction.md' },
  { source: vol3_2, filepath: 'volume-03-containers/03-2-dicts-introduction.md' },
  // Volume 4
  { source: vol4_1, filepath: 'volume-04-flow/04-1-the-philosophy-of-branching.md' },
  // Volume 5
  { source: vol5_1, filepath: 'volume-05-functions/05-1-functions-introduction.md' },
  // Volume 6
  { source: vol6_1, filepath: 'volume-06-objects/06-1-everything-is-an-object.md' },
  // Volume 7
  { source: vol7_1, filepath: 'volume-07-stdlib/07-1-batteries-included.md' },
  // Volume 8
  { source: vol8_1, filepath: 'volume-08-algorithms/08-1-big-o-for-humans.md' },
  { source: vol8_2, filepath: 'volume-08-algorithms/08-2-hash-maps-deep-dive.md' },
  // Volume 9
  { source: vol9_1, filepath: 'volume-09-production/09-1-virtual-environments.md' },
  // Volume 10
  { source: vol10_1, filepath: 'volume-10-applied-ai/10-1-how-llms-work.md' },
  { source: vol10_2, filepath: 'volume-10-applied-ai/10-2-claude-api-first-call.md' },
  { source: vol10_3, filepath: 'volume-10-applied-ai/10-3-embeddings-explained.md' },
  // Volume 11
  { source: vol11_1, filepath: 'volume-11-fde-mindset/11-1-what-an-fde-actually-does.md' },
  // Volume 12
  { source: vol12_1, filepath: 'volume-12-capstone/12-1-overview.md' },
];

interface ParsedLesson {
  metadata: LessonMetadata;
  body: string;
  filepath: string;
}

function build(): ParsedLesson[] {
  return rawSources.map(({ source, filepath }) => {
    const { metadata, body } = parseFrontmatter(source);
    if (!metadata.id) {
      throw new Error(`Lesson at ${filepath} is missing 'id' in frontmatter.`);
    }
    return {
      metadata: {
        id: metadata.id as string,
        volume: metadata.volume ?? 'volume-00-welcome',
        chapter: (metadata.chapter as number) ?? 1,
        number: (metadata.number as number) ?? 1,
        title: metadata.title as string,
        subtitle: metadata.subtitle as string | undefined,
        estimatedMinutes: (metadata.estimatedMinutes as number) ?? 10,
        prerequisites: (metadata.prerequisites as string[]) ?? [],
        keyTerms: (metadata.keyTerms as string[]) ?? [],
        exerciseCount: (metadata.exerciseCount as number) ?? 0,
        checkpoint: (metadata.checkpoint as boolean) ?? false,
        tags: (metadata.tags as any) ?? ['theory'],
      } as LessonMetadata,
      body,
      filepath,
    };
  });
}

export const lessons: ParsedLesson[] = build();
