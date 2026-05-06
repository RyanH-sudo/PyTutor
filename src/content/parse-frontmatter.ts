import type { LessonMetadata } from '@/lib/lessons/types';

/**
 * Parse the YAML-style frontmatter at the top of a lesson markdown file.
 *
 * We use a tiny parser instead of pulling in gray-matter as a runtime
 * dependency, because the frontmatter format is simple enough and we
 * want this to work in the browser without Node-specific code.
 *
 * Expected format:
 *   ---
 *   key: value
 *   list_key: [item1, item2]
 *   ---
 *   ...body...
 */
export function parseFrontmatter(raw: string): {
  metadata: Partial<LessonMetadata>;
  body: string;
} {
  if (!raw.startsWith('---')) {
    return { metadata: {}, body: raw };
  }

  // Find the closing ---
  const endMarker = raw.indexOf('\n---', 3);
  if (endMarker === -1) {
    return { metadata: {}, body: raw };
  }

  const fmText = raw.slice(3, endMarker).trim();
  const body = raw.slice(endMarker + 4).replace(/^\s*\n/, '');

  const metadata: Record<string, unknown> = {};
  const lines = fmText.split('\n');
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let valueText = line.slice(colonIdx + 1).trim();

    // Strip wrapping quotes
    if (
      (valueText.startsWith('"') && valueText.endsWith('"')) ||
      (valueText.startsWith("'") && valueText.endsWith("'"))
    ) {
      valueText = valueText.slice(1, -1);
    }

    // Array form [a, b, c]
    if (valueText.startsWith('[') && valueText.endsWith(']')) {
      const inside = valueText.slice(1, -1).trim();
      if (!inside) {
        metadata[key] = [];
      } else {
        metadata[key] = inside
          .split(',')
          .map((s) => s.trim())
          .map((s) => {
            // Strip wrapping quotes from list items
            if (
              (s.startsWith('"') && s.endsWith('"')) ||
              (s.startsWith("'") && s.endsWith("'"))
            ) {
              return s.slice(1, -1);
            }
            return s;
          });
      }
      continue;
    }

    // Boolean
    if (valueText === 'true') {
      metadata[key] = true;
      continue;
    }
    if (valueText === 'false') {
      metadata[key] = false;
      continue;
    }

    // Number
    if (/^-?\d+(\.\d+)?$/.test(valueText)) {
      metadata[key] = parseFloat(valueText);
      continue;
    }

    metadata[key] = valueText;
  }

  return {
    metadata: normalizeKeys(metadata) as Partial<LessonMetadata>,
    body,
  };
}

function normalizeKeys(raw: Record<string, unknown>): Record<string, unknown> {
  const map: Record<string, string> = {
    estimatedMinutes: 'estimatedMinutes',
    estimated_minutes: 'estimatedMinutes',
    keyTerms: 'keyTerms',
    key_terms: 'keyTerms',
    exerciseCount: 'exerciseCount',
    exercise_count: 'exerciseCount',
  };
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    out[map[k] ?? k] = v;
  }
  return out;
}
