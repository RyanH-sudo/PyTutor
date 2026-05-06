import type { GlossaryEntry } from './types';

/**
 * Seed glossary — the foundational ~80 terms covered in Volumes 0–2.
 *
 * As lessons are authored, their `keyTerms` should be added here too.
 * The `tools/build_glossary.ts` script (future) will diff lesson key
 * terms against this file and prompt for missing entries.
 */
export const glossarySeed: GlossaryEntry[] = [
  {
    term: 'algorithm',
    origin: 'Medieval Latin via Arabic',
    rootForm: 'al-Khwārizmī',
    rootMeaning: 'after the 9th-century Persian mathematician',
    brief: 'A finite, ordered set of steps that solves a problem.',
    long: 'The word "algorithm" comes from al-Khwārizmī, a 9th-century scholar in Baghdad whose Latinized name was "Algoritmi." His textbook on Indian numerals introduced systematic step-by-step calculation methods to medieval Europe. The word came to mean any well-defined procedure for solving a problem, and is now the core term of computer science.',
    category: 'concept',
  },
  {
    term: 'argument',
    origin: 'Latin',
    rootForm: 'argumentum',
    rootMeaning: 'evidence, proof',
    brief:
      "A value passed into a function when you call it. Different from a 'parameter,' which is the function's named slot.",
    category: 'language',
  },
  {
    term: 'attribute',
    origin: 'Latin',
    rootForm: 'attributus',
    rootMeaning: 'assigned, ascribed',
    brief:
      'Data attached to an object. In Python, you access an attribute with a dot: `dog.name` reads the `name` attribute on the `dog` object.',
    category: 'language',
  },
  {
    term: 'binary',
    origin: 'Latin',
    rootForm: 'binarius',
    rootMeaning: 'consisting of two',
    brief:
      'Base-2 number system, where every digit is 0 or 1. Computers use binary because transistors have two stable states: on and off.',
    category: 'concept',
  },
  {
    term: 'bit',
    origin: 'English (coined 1948)',
    rootForm: 'binary digit',
    rootMeaning: 'a single 0 or 1',
    brief:
      'The smallest unit of digital information. Coined by John Tukey in 1948, popularized by Claude Shannon.',
    category: 'concept',
  },
  {
    term: 'boolean',
    origin: 'After George Boole (1815-1864)',
    rootForm: 'Boole',
    rootMeaning: 'named after Boole',
    brief:
      'A value that is either True or False. Named after George Boole, the 19th-century logician whose algebra of logic underlies all of digital computation.',
    category: 'language',
  },
  {
    term: 'byte',
    origin: 'English (coined 1956)',
    rootForm: 'bite (respelled to avoid confusion with bit)',
    rootMeaning: 'a small portion',
    brief:
      'A group of 8 bits, the standard unit of memory addressing in modern computers.',
    category: 'concept',
  },
  {
    term: 'class',
    origin: 'Latin',
    rootForm: 'classis',
    rootMeaning: 'a group, a division of citizens',
    brief:
      'A blueprint for creating objects. In Python, `class Dog:` defines a category, and `Dog()` makes an instance of that category.',
    category: 'language',
  },
  {
    term: 'closure',
    origin: 'Old French',
    rootForm: 'closure',
    rootMeaning: 'an enclosure',
    brief:
      'A function that "closes over" variables from the scope where it was defined, keeping access to them even after that scope has exited.',
    category: 'language',
  },
  {
    term: 'code',
    origin: 'Latin',
    rootForm: 'codex',
    rootMeaning: 'a wooden tablet, then a book',
    brief:
      "A set of instructions written in a language a computer can execute. The word 'codex' originally meant a hand-bound book — the precursor of the manuscript.",
    long: "The Latin 'codex' meant a tablet of wax-coated wood, then bound pages — the form that replaced the scroll. By the Middle Ages, 'code' meant any systematic body of laws or rules. Computer 'code' inherits this sense: a system of rules a machine follows.",
    category: 'concept',
  },
  {
    term: 'compile',
    origin: 'Latin',
    rootForm: 'compilare',
    rootMeaning: 'to plunder, to gather together',
    brief:
      'To translate code in one language (e.g., Python source) into another (e.g., bytecode) all at once, before execution.',
    category: 'concept',
  },
  {
    term: 'computer',
    origin: 'Latin',
    rootForm: 'computare',
    rootMeaning: 'to count up, reckon',
    brief:
      'A device that performs computation. Until the 1940s, "computer" usually meant a person — a clerk who computed by hand. The job title was renamed when the machines took it over.',
    category: 'concept',
  },
  {
    term: 'context engineering',
    origin: 'Industry term, ~2025',
    rootForm: '—',
    rootMeaning: 'the engineering of LLM context windows',
    brief:
      'The discipline of curating what information enters an LLM\'s context. Replaces the older term "prompt engineering" because most production systems now manage many sources of context, not just a prompt.',
    category: 'industry',
  },
  {
    term: 'dictionary',
    origin: 'Latin',
    rootForm: 'dictionarium',
    rootMeaning: 'a collection of words',
    brief:
      "A Python data structure that maps keys to values. Often shortened to 'dict.' The most-used data structure in idiomatic Python.",
    aliases: ['dict'],
    category: 'language',
  },
  {
    term: 'embedding',
    origin: 'English',
    rootForm: 'to embed',
    rootMeaning: 'to fix into a surrounding mass',
    brief:
      'A vector of numbers that represents a piece of text (or image, etc.) in a way that semantically similar inputs produce numerically similar vectors.',
    category: 'industry',
  },
  {
    term: 'eval',
    origin: 'Latin (via French)',
    rootForm: 'evaluare',
    rootMeaning: 'to determine the value of',
    brief:
      'In production AI, an "eval" is a structured test that measures the quality of a system\'s output against expected behavior. The single most-asked-about discipline in 2026 AI hiring.',
    category: 'industry',
  },
  {
    term: 'forward deployed engineer',
    origin: 'Coined at Palantir, ~2010',
    brief:
      "An engineer embedded with a customer to write production code that bridges the platform's capabilities and the customer's needs. The fastest-growing role in AI hiring.",
    category: 'industry',
    aliases: ['fde'],
  },
  {
    term: 'function',
    origin: 'Latin',
    rootForm: 'functio',
    rootMeaning: 'performance, execution',
    brief:
      'A named block of code that takes inputs (arguments) and returns an output. The most fundamental tool of abstraction in programming.',
    category: 'language',
  },
  {
    term: 'hash map',
    origin: 'English (technical, mid-20th century)',
    brief:
      'A data structure that maps keys to values using a hash function for fast lookup. Python\'s "dict" is a hash map. The dominant pattern in interview problems.',
    category: 'algorithm',
    aliases: ['hash table'],
  },
  {
    term: 'instance',
    origin: 'Latin',
    rootForm: 'instantia',
    rootMeaning: 'a presence, a standing-near',
    brief: 'A specific object created from a class.',
    category: 'language',
  },
  {
    term: 'integer',
    origin: 'Latin',
    rootForm: 'integer',
    rootMeaning: 'whole, untouched',
    brief: 'A whole number — no fractional part. In Python, an `int`.',
    category: 'language',
  },
  {
    term: 'interpret',
    origin: 'Latin',
    rootForm: 'interpretari',
    rootMeaning: 'to explain, translate',
    brief:
      'To execute code one statement at a time, translating each as you go. Python is an interpreted language, in contrast to compiled languages like C.',
    category: 'concept',
  },
  {
    term: 'iterable',
    origin: 'Latin',
    rootForm: 'iterare',
    rootMeaning: 'to repeat',
    brief:
      'Anything you can loop over. Lists, tuples, strings, dictionaries, files, generators — all iterables.',
    category: 'language',
  },
  {
    term: 'list',
    origin: 'Old English / Old French',
    rootForm: 'liste',
    rootMeaning: 'a strip, a series',
    brief:
      'An ordered, mutable collection of values. Python\'s most flexible container type.',
    category: 'language',
  },
  {
    term: 'literal',
    origin: 'Latin',
    rootForm: 'litteralis',
    rootMeaning: 'of letters',
    brief:
      'A value written directly in the source code. `42` is an int literal, `"hello"` is a string literal.',
    category: 'language',
  },
  {
    term: 'method',
    origin: 'Greek via Latin',
    rootForm: 'methodos',
    rootMeaning: 'a way of doing, pursuit',
    brief:
      'A function attached to an object. `dog.bark()` calls the `bark` method of the `dog` object.',
    category: 'language',
  },
  {
    term: 'module',
    origin: 'Latin',
    rootForm: 'modulus',
    rootMeaning: 'a small measure',
    brief:
      'A Python file you can import. The unit of code reuse and namespace separation.',
    category: 'language',
  },
  {
    term: 'mutable',
    origin: 'Latin',
    rootForm: 'mutabilis',
    rootMeaning: 'changeable',
    brief:
      'Capable of being changed in place. Lists are mutable; tuples and strings are not.',
    category: 'language',
  },
  {
    term: 'object',
    origin: 'Medieval Latin',
    rootForm: 'objectum',
    rootMeaning: 'thing thrown before (the mind)',
    brief:
      'In Python, everything is an object — a bundle of data and the methods that act on it.',
    category: 'language',
  },
  {
    term: 'operator',
    origin: 'Latin',
    rootForm: 'operari',
    rootMeaning: 'to work',
    brief:
      'A symbol that performs an action on values. `+` is an operator. So is `==`. So is `not`.',
    long: "From Latin 'operari' meaning 'to work,' an operator is a working symbol — it does work on its operands. The word entered mathematics in the 18th century and computing in the 1950s.",
    category: 'language',
  },
  {
    term: 'parameter',
    origin: 'Greek',
    rootForm: 'para + metron',
    rootMeaning: 'beside-measure',
    brief:
      "The named slot in a function definition. Different from an 'argument,' which is the actual value passed when the function is called.",
    category: 'language',
  },
  {
    term: 'prompt injection',
    origin: 'Coined by Simon Willison, 2022',
    brief:
      'An attack in which a malicious instruction hides inside content that an LLM processes, hijacking the model. The defining security concern of agentic AI.',
    category: 'industry',
  },
  {
    term: 'python',
    origin: 'After Monty Python',
    rootForm: '—',
    rootMeaning: 'named after the British comedy troupe',
    brief:
      'A high-level, interpreted programming language created by Guido van Rossum starting in 1989. Named after Monty Python\'s Flying Circus.',
    category: 'language',
  },
  {
    term: 'rag',
    origin: 'Acronym, ~2020',
    rootForm: 'Retrieval-Augmented Generation',
    rootMeaning: 'fetch-relevant-text-then-generate',
    brief:
      'A pattern where an LLM is given retrieved relevant text from a knowledge base before being asked to answer. The most common production AI deployment pattern.',
    aliases: ['retrieval-augmented generation'],
    category: 'industry',
  },
  {
    term: 'recursion',
    origin: 'Latin',
    rootForm: 'recurrere',
    rootMeaning: 'to run back',
    brief:
      "A function that calls itself. The cleanest expression of self-similar problems — and a frequent interview topic.",
    category: 'algorithm',
  },
  {
    term: 'repl',
    origin: 'Acronym',
    rootForm: 'Read-Eval-Print Loop',
    rootMeaning: 'a conversation with an interpreter',
    brief:
      'An interactive prompt where you type code, the interpreter evaluates it, prints the result, and waits for the next input. You\'re probably using one right now while learning.',
    category: 'tool',
  },
  {
    term: 'scope',
    origin: 'Greek via Italian',
    rootForm: 'skopos',
    rootMeaning: 'a target, a watcher',
    brief:
      'The region of a program where a name is visible. Python\'s scope rules are summarized as LEGB: Local, Enclosing, Global, Built-in.',
    category: 'language',
  },
  {
    term: 'set',
    origin: 'Old English',
    rootForm: 'set',
    rootMeaning: 'a group',
    brief:
      'An unordered collection of unique values. Useful when you need fast membership testing or to deduplicate a list.',
    category: 'language',
  },
  {
    term: 'string',
    origin: 'Old English',
    rootForm: 'streng',
    rootMeaning: 'a thread, a line of characters',
    brief: 'A sequence of characters. In Python, immutable.',
    category: 'language',
  },
  {
    term: 'syntax',
    origin: 'Greek',
    rootForm: 'syntaxis',
    rootMeaning: 'arrangement together',
    brief:
      'The rules that say which sequences of characters are valid in a language. Python\'s syntax is famously readable; this is by design.',
    category: 'language',
  },
  {
    term: 'token',
    origin: 'Old English',
    rootForm: 'tācn',
    rootMeaning: 'a sign, a symbol',
    brief:
      "In compiler theory, a single meaningful unit of code. In modern AI, a chunk of text that's the unit of LLM input/output (often ~4 characters).",
    category: 'concept',
  },
  {
    term: 'tuple',
    origin: 'English (back-formation, late 19th c.)',
    rootForm: 'from "septuple, octuple," etc.',
    rootMeaning: 'a fixed-size group',
    brief:
      'An ordered, immutable collection of values. Use a tuple when the group has a fixed structure: `(latitude, longitude)`.',
    category: 'language',
  },
  {
    term: 'unicode',
    origin: 'English (coined 1987)',
    rootForm: 'unique + code',
    rootMeaning: 'a single code for every character',
    brief:
      'A standard that assigns every character in every writing system a unique number. Python 3 strings are Unicode by default.',
    category: 'concept',
  },
  {
    term: 'variable',
    origin: 'Latin',
    rootForm: 'variabilis',
    rootMeaning: 'changeable',
    brief:
      'A name that points to a value. In Python, variables are not boxes — they\'re labels. Multiple variables can point at the same value.',
    category: 'language',
  },
  {
    term: 'vector store',
    origin: 'Industry term, ~2022',
    brief:
      'A database optimized for similarity search over high-dimensional embeddings. ChromaDB, Pinecone, Weaviate, FAISS are common examples.',
    category: 'tool',
  },
];

export function findEntry(term: string): GlossaryEntry | undefined {
  const t = term.toLowerCase().trim();
  return glossarySeed.find(
    (e) => e.term === t || (e.aliases ?? []).includes(t)
  );
}
