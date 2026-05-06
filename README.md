# PyTutor

A slow-paced, deeply etymological Python learning suite for thoughtful learners.

PyTutor is a self-contained web application that teaches Python from first principles. It is built around a single conviction: understanding takes time, and the best way to learn is patiently, with full explanations.

## What Makes This Different

Most Python courses race the learner to "I can write a for-loop" in a weekend. PyTutor goes the other way:

- **Etymology built in.** Every key term — operator, argument, byte, recursion — comes with the story of where the word came from. Latin roots, Greek origins, the moment the term entered computing. Knowing why a word means what it means makes it stick.
- **Real Python, in the browser.** Every lesson has live, editable code blocks that run Python via Pyodide. No installation, no setup. Edit, run, see what happens, all without leaving the page.
- **Slow pacing.** Lessons are 10–15 minutes each. The full curriculum is 460 lessons across 13 volumes. Done at one lesson per day, the curriculum takes about a year. That pace is the point.
- **Built toward applied AI engineering.** The curriculum threads from "what is a computer" all the way to RAG pipelines, evaluations, and Model Context Protocol servers. The closing volumes prepare the learner for Forward Deployed Engineer and Applied AI Engineer roles.
- **No streaks, no anxiety.** The progress tracker shows what you have completed. It does not punish absence. Come back when you can; the lessons wait.

## Curriculum

The full curriculum is organized into thirteen volumes. Each volume has a coherent pedagogical arc.

- **Volume 0 — Welcome.** Orientation, learning theory, the language of programmers.
- **Volume 1 — What Even Is Code?** Bottom-up: bits, bytes, languages, Python, your first program.
- **Volume 2 — Names, Values, Memory.** The deep type system, binary representation, IEEE 754, hashing.
- **Volume 3 — Containers.** Lists, dictionaries, tuples, sets, comprehensions.
- **Volume 4 — Flow.** Conditionals, loops, iteration, exception handling.
- **Volume 5 — Functions.** Abstraction, scope, closures, decorators, type hints.
- **Volume 6 — Objects.** Object-oriented programming from scratch, magic methods, dataclasses.
- **Volume 7 — The Standard Library.** The daily-use modules: collections, itertools, functools, pathlib, datetime, json.
- **Volume 8 — Algorithms.** Big-O, hash maps, two pointers, sliding window, recursion, trees, BFS, DFS, dynamic programming. The interview prep volume.
- **Volume 9 — Production Python.** Virtual environments, testing, type checking, code style, logging.
- **Volume 10 — Applied AI.** How LLMs work, the Claude API, embeddings, RAG, evaluations, agentic patterns, Model Context Protocol.
- **Volume 11 — The Forward Deployed Mindset.** Customer scoping, system design under constraints, interview preparation.
- **Volume 12 — Capstone Projects.** Twelve real projects shipped to GitHub as portfolio artifacts.

## Lesson Structure

Every lesson follows a deliberate rhythm:

- **The Opening.** A short narrative paragraph or two, conversational, setting the scene.
- **The Word.** Etymology of a key term — its roots, the story of how it entered computing.
- **The Why.** What problem this concept exists to solve.
- **The What.** The concept explained in plain language, then with the precise definition.
- **The How.** Code, line by line, with what every character means.
- **You Try.** Exercises in a live editor with progressive hints.
- **Talk About It.** How to articulate the concept aloud — interview-ready phrasing.
- **Connections.** Links back to prior lessons and forward to upcoming ones.

## Running Locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Building for Static Hosting

```bash
npm run build
```

The output is a static export in `out/`. The site can be hosted on GitHub Pages, Vercel, Netlify, S3, or any static-file host. No server is required at runtime.

## Adding a Lesson

Lessons are markdown files under `src/content/<volume>/`. Each one has YAML frontmatter and a body that uses a small set of MDX-style components.

1. Author the file at `src/content/<volume>/<lesson-id>.md`.
2. Import it in `src/content/registry.ts` and add an entry to the `rawSources` array.
3. The lesson appears in the sidebar automatically.

The available components are documented in `src/components/lesson/mdx-components.tsx`. Existing lessons in Volume 0 and Volume 1 serve as the style reference for tone and structure.

## Technology Stack

- Next.js 15 with the app router, configured for static export.
- TypeScript throughout.
- Tailwind CSS with custom design tokens for typography and theming.
- Framer Motion for animation.
- Pyodide for in-browser Python execution.
- Monaco Editor for the code editor surface.
- Zustand for progress tracking, persisted to `localStorage`.

## Project Layout

```
pytutor/
├── src/
│   ├── app/                    Next.js routes
│   ├── components/
│   │   ├── ui/                 Design-system primitives
│   │   ├── shell/              Sidebar, top bar, app shell
│   │   └── lesson/             Lesson-specific components
│   ├── lib/
│   │   ├── lessons/            Lesson types, registry, navigation
│   │   ├── runtime/            Pyodide loader and execution
│   │   ├── glossary/           Glossary data and search
│   │   └── progress/           Zustand store
│   └── content/                The lesson markdown files
├── README.md
├── LICENSE
├── PROJECT_NOTES.md            Architecture notes for contributors
└── CONTRIBUTING.md
```

## Status

The framework is complete. The first two volumes (Volume 0 and Volume 1) are fully authored. The remaining volumes have seeded lessons that establish the curriculum's path; additional lessons are authored over time.

## Author

Built by Ryan Haig.

## License

MIT. See `LICENSE`.
