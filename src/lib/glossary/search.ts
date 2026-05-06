'use client';

import Fuse from 'fuse.js';
import type { GlossaryEntry } from './types';
import { glossarySeed } from './data';

let fuseInstance: Fuse<GlossaryEntry> | null = null;

function getFuse() {
  if (!fuseInstance) {
    fuseInstance = new Fuse(glossarySeed, {
      keys: [
        { name: 'term', weight: 3 },
        { name: 'aliases', weight: 2 },
        { name: 'brief', weight: 1 },
        { name: 'long', weight: 0.5 },
      ],
      threshold: 0.35,
      includeScore: true,
    });
  }
  return fuseInstance;
}

export function searchGlossary(query: string, limit = 25): GlossaryEntry[] {
  const q = query.trim();
  if (!q) return glossarySeed.slice(0, limit);
  return getFuse()
    .search(q)
    .slice(0, limit)
    .map((r) => r.item);
}
