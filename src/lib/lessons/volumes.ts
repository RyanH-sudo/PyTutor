import type { Volume } from './types';

/**
 * The full catalog of volumes.
 *
 * Each volume is a separate "book" with its own pedagogical arc.
 * The `lessonCount` is the *target* count — actual lessons grow over time.
 * The dashboard shows progress against the target.
 */
export const volumes: Volume[] = [
  {
    id: 'volume-00-welcome',
    number: 0,
    title: 'Welcome',
    subtitle: 'How to use this. How learning works. Why it matters.',
    description:
      'A short orientation before the real work begins. We talk about how the app is structured, how spaced repetition rewires memory, what "etymology" is and why we lean on it, and what it means to think like a programmer. No code yet.',
    color: 'hsl(var(--muted-foreground))',
    estimatedHours: 2,
    lessonCount: 8,
  },
  {
    id: 'volume-01-foundations',
    number: 1,
    title: 'What Even Is Code?',
    subtitle: 'From electricity to logic gates to Python.',
    description:
      'We start at the bottom. What is a computer, mechanically? What does it mean for something to "compute"? How did humans go from flicking switches to typing English-like instructions? By the end of Volume 1 you will have written your first Python program, character by character, with full understanding of what each character does.',
    color: 'hsl(var(--history))',
    estimatedHours: 11,
    lessonCount: 45,
  },
  {
    id: 'volume-02-data-and-names',
    number: 2,
    title: 'Names, Values, and Memory',
    subtitle: 'What variables really are. Binary, Unicode, the IEEE 754 trap.',
    description:
      'Variables are not boxes. They are names that point to values, and values live in memory. We dig into binary, hexadecimal, ASCII, Unicode, integers, floats, the floating-point trap that bites every programmer once, strings as sequences, and the philosophy of None.',
    color: 'hsl(var(--primary))',
    estimatedHours: 12,
    lessonCount: 50,
  },
  {
    id: 'volume-03-containers',
    number: 3,
    title: 'Containers — The Shapes of Data',
    subtitle: 'Lists, tuples, dicts, sets — and why they are different things.',
    description:
      "Lists, tuples, dicts, and sets each exist for a reason. We tour each one — etymology, history, when to use it, when not to — and end with comprehensions, the most elegant syntax Python offers. By the end you'll have a decision tree memorized for picking the right container.",
    color: 'hsl(var(--accent))',
    estimatedHours: 12,
    lessonCount: 50,
  },
  {
    id: 'volume-04-flow',
    number: 4,
    title: 'Flow — The Philosophy of Branching',
    subtitle: 'Conditionals, loops, iterators, exception handling.',
    description:
      "Programs make decisions. We study branching from first principles, then move to loops (and the often-missed difference between iteration and iterables and iterators), truthiness and the lie of 'True or False,' exception handling as a control-flow tool, and the modern syntax sugar that's reshaped Python lately.",
    color: 'hsl(var(--success))',
    estimatedHours: 9,
    lessonCount: 30,
  },
  {
    id: 'volume-05-functions',
    number: 5,
    title: 'Functions — Abstraction Itself',
    subtitle: 'What it means to name a process and reuse it.',
    description:
      "Functions are how we hide complexity. Arguments, parameters, scope (LEGB), closures, decorators, lambdas, *args/**kwargs, pure-vs-impure thinking, type hints. By the end you'll write functions you'd be comfortable putting into NinjaToolKit.",
    color: 'hsl(var(--interview))',
    estimatedHours: 11,
    lessonCount: 35,
  },
  {
    id: 'volume-06-objects',
    number: 6,
    title: 'Objects — Everything Is One',
    subtitle: 'OOP from scratch. No jargon. No cargo culting.',
    description:
      "In Python, everything is an object. We cover classes, instances, inheritance, composition, duck typing, magic methods, dataclasses, properties, descriptors — and importantly, when not to reach for OOP. The chapter closes with how production codebases actually use it.",
    color: 'hsl(var(--etymology))',
    estimatedHours: 10,
    lessonCount: 30,
  },
  {
    id: 'volume-07-stdlib',
    number: 7,
    title: 'The Standard Library',
    subtitle: '"Batteries included" — the tools you already have.',
    description:
      'Python ships with extraordinary tools. collections, itertools, functools, pathlib, os, datetime, json, csv. We tour each one with the same etymological care, and you finish able to read other people\'s code fluently.',
    color: 'hsl(var(--muted-foreground))',
    estimatedHours: 8,
    lessonCount: 30,
  },
  {
    id: 'volume-08-algorithms',
    number: 8,
    title: 'Algorithms — Patterns of Thought',
    subtitle: 'The patterns interviewers test, taught slowly.',
    description:
      "Big-O for non-CS people. Hash maps, two pointers, sliding window, recursion (the only honest explanation of how it actually works), trees, BFS, DFS, dynamic programming. All 24 of your interview problems, taught one at a time, with the patience that makes them stick.",
    color: 'hsl(var(--warning))',
    estimatedHours: 12,
    lessonCount: 50,
  },
  {
    id: 'volume-09-production',
    number: 9,
    title: 'Production Python',
    subtitle: 'Virtual envs, testing, types, code style, reading code.',
    description:
      'The transition from "I can write a script" to "I can ship a system." venvs, pip, pyproject, pytest, mypy, ruff, logging, the unreasonable importance of error messages.',
    color: 'hsl(var(--success))',
    estimatedHours: 7,
    lessonCount: 30,
  },
  {
    id: 'volume-10-applied-ai',
    number: 10,
    title: 'Applied AI Engineering',
    subtitle: 'How LLMs work. The Claude API. Embeddings, RAG, evals.',
    description:
      'How LLMs actually work (concept, not math). The Claude API from first principles. Prompt engineering vs context engineering. Embeddings, vector stores, ChromaDB hands-on. Chunking strategies. RAG pipelines built step by step. Evals — what they are, why they matter. Agentic patterns. MCP servers from scratch.',
    color: 'hsl(var(--interview))',
    estimatedHours: 12,
    lessonCount: 40,
  },
  {
    id: 'volume-11-fde-mindset',
    number: 11,
    title: 'The Forward Deployed Mindset',
    subtitle: 'How to talk about your work. How to think customer-first.',
    description:
      "What an FDE actually does. Customer scoping. System design under constraints. STAR stories that aren't formulaic. Industry vocabulary mastery. Mock interviews you can run with the in-app AI tutor.",
    color: 'hsl(var(--primary))',
    estimatedHours: 6,
    lessonCount: 20,
  },
  {
    id: 'volume-12-capstone',
    number: 12,
    title: 'Capstone Projects',
    subtitle: 'Build the things. Ship them. Talk about them.',
    description:
      'A real RAG pipeline. A real MCP server. A real Claude-powered CLI tool. Refactor a piece of NinjaToolKit narrating your reasoning aloud. Each project shipped to GitHub as a portfolio piece.',
    color: 'hsl(var(--etymology))',
    estimatedHours: 10,
    lessonCount: 12,
  },
];

export function getVolume(id: string): Volume | undefined {
  return volumes.find((v) => v.id === id);
}

export function totalLessons(): number {
  return volumes.reduce((sum, v) => sum + v.lessonCount, 0);
}

export function totalEstimatedHours(): number {
  return volumes.reduce((sum, v) => sum + v.estimatedHours, 0);
}
