export interface GlossaryEntry {
  /** The headword. Lowercase for matching. */
  term: string;
  /** Display form, in case of casing/punctuation */
  display?: string;
  /** Where the word came from (Latin, Greek, etc.) */
  origin?: string;
  /** The original-language form */
  rootForm?: string;
  /** Literal meaning in plain English */
  rootMeaning?: string;
  /** A short definition the learner sees first */
  brief: string;
  /** Longer explanation, optional */
  long?: string;
  /** Lesson IDs where this term is introduced or used */
  introducedIn?: string[];
  /** Categorization for filtering */
  category: GlossaryCategory;
  /** Aliases that should match the same entry */
  aliases?: string[];
}

export type GlossaryCategory =
  | 'language' // Python language features
  | 'concept' // computing concepts
  | 'industry' // FDE/AI industry vocabulary
  | 'algorithm' // algorithm/data-structure terms
  | 'tool'; // libraries, tools, products
