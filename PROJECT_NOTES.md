# PyTutor — Project Notes

A guide to the codebase architecture, for Ryan and any future contributors.

## High-level architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Next.js app router                      │
│  /                home page                                  │
│  /lessons/        lessons index                              │
│  /lessons/[id]/   individual lesson                          │
│  /glossary/       searchable glossary                        │
│  /progress/       progress dashboard                         │
│  /settings/       theme + about                              │
└──────────────────────────────────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
       ┌─────────────┐         ┌─────────────┐
       │  Lesson     │         │   Side      │
       │  view       │         │   shell     │
       └─────────────┘         └─────────────┘
              │
   ┌──────────┼──────────────────────────────────┐
   ▼          ▼                                  ▼
 MDX     CodeRunner                       Etymology, etc.
 body    (Monaco +                        (lesson components)
         Pyodide)
```

## Directory layout

```
pytutor/
├── src/
│   ├── app/                    Next.js routes
│   │   ├── layout.tsx          Root layout, fonts, theme
│   │   ├── globals.css         Design tokens, base styles
│   │   ├── page.tsx            Landing page
│   │   ├── lessons/
│   │   │   ├── page.tsx        Lessons index
│   │   │   └── [id]/page.tsx   Single lesson page
│   │   ├── glossary/page.tsx
│   │   ├── progress/page.tsx
│   │   └── settings/page.tsx
│   ├── components/
│   │   ├── ui/                 Shadcn-style UI primitives
│   │   ├── shell/              App shell (sidebar, topbar)
│   │   └── lesson/             Lesson-specific components
│   │       ├── lesson-view.tsx
│   │       ├── lesson-mdx.tsx
│   │       ├── code-runner.tsx
│   │       ├── etymology-card.tsx
│   │       ├── history-note.tsx
│   │       ├── interview-phrase.tsx
│   │       ├── fde-connection.tsx
│   │       ├── callout.tsx
│   │       ├── quiz.tsx
│   │       ├── key-term.tsx
│   │       ├── section.tsx
│   │       ├── connection.tsx
│   │       ├── exercise.tsx
│   │       └── mdx-components.tsx
│   ├── lib/
│   │   ├── lessons/            Lesson types, registry, navigation
│   │   ├── runtime/            Pyodide loader and runner
│   │   ├── glossary/           Glossary types, data, search
│   │   ├── progress/           Zustand store with localStorage
│   │   └── utils.ts
│   ├── content/                The actual lesson markdown files
│   │   ├── parse-frontmatter.ts
│   │   ├── registry.ts
│   │   └── volume-XX-name/*.md
│   └── types/
│       └── markdown.d.ts       Module declaration for .md imports
├── public/                     Static assets
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## Key files explained

### `src/lib/runtime/pyodide.ts`

Loads Pyodide on demand. Singleton — one instance per page session. The `runPython()` function wraps execution with stdout/stderr capture.

### `src/components/lesson/code-runner.tsx`

Monaco editor + Run button + output panel. Shows Pyodide loading state, executes code, displays output and (optionally) compares to expected output.

### `src/lib/lessons/registry.ts` & `src/content/registry.ts`

The lesson catalog. Each lesson is imported as a raw string, parsed for frontmatter, and registered. Static at build time.

### `src/components/lesson/lesson-mdx.tsx`

Client-side MDX serializer. Takes a lesson body string, runs `next-mdx-remote/serialize` on it in the browser, then renders with the registered components.

### `src/lib/progress/store.ts`

Zustand store for lesson state. Persisted to `localStorage` under key `pytutor-progress-v1`. Schema versioning means we can ship breaking schema changes without crashing existing users.

## How lessons are loaded

1. At build time, `src/content/registry.ts` imports every lesson `.md` file as a raw string (via the webpack rule for `.md` files in `next.config.mjs`).
2. `parseFrontmatter()` splits each into metadata + body.
3. The lesson registry exposes the metadata and bodies.
4. When a user visits `/lessons/[id]/`, the page calls `loadLesson(id)` to get the lesson, then passes the body to `<LessonMDX>`.
5. `<LessonMDX>` serializes the body in the browser and renders with `<MDXRemote>`, providing the registered components map.

## How code execution works

1. The user's lesson contains a `<CodeRunner initial={...} />` block in MDX.
2. When the lesson renders, the CodeRunner component mounts.
3. On mount, the component starts loading Pyodide in the background (cached after first load).
4. User clicks Run. We call `runPython(code)`, which captures stdout/stderr.
5. Output appears in a panel below the editor.

## Static export details

The app is configured for static export (`output: 'export'` in `next.config.mjs`). This means:

- `npm run build` produces a static `out/` directory.
- No server is needed in production.
- Can be hosted on GitHub Pages, Vercel, Netlify, S3, anywhere.
- Pyodide is loaded from a CDN, so the user needs an internet connection on first load. Subsequent loads can come from browser cache.

## Things I (Ryan) might want to add later

- **AI tutor side panel.** A chat with Claude (using a user-provided API key) that can answer questions about the current lesson.
- **Spaced repetition flashcards.** Auto-generated from each lesson's `keyTerms`.
- **Search across all lessons.** Full-text search of lesson bodies.
- **PDF export of any lesson** for printing.
- **Dark/light theme persistence in middleware.** Currently set in client; SSR could pre-render with the right theme.
- **More volumes.** The curriculum lists 13 volumes; we have content seeds in all but the back half are still light.
- **Multi-language support.** Translate the lessons into Thai or other languages.

## Authoring style guide

The narrative voice in lessons is:
- First-person, but inclusive ("we").
- Conversational without being chatty.
- Uses etymology to anchor unfamiliar terms.
- Uses concrete code examples constantly.
- Names tradeoffs honestly.
- Avoids buzzwords and filler.
- Treats the reader as smart but new to the topic.

When in doubt, model after Volume 0 lesson 1 (`00-1-the-letter`) or any of the Volume 1 lessons. The voice should feel like a thoughtful teacher writing a careful letter.

## Known issues

- Pyodide takes ~2-10 seconds to load on first use. The CodeRunner shows a loading state. The first interaction with code is slow; subsequent ones are fast.
- Some Python packages with C extensions (numpy, pandas) require explicit `pyodide.loadPackagesFromImports()` calls — handled automatically in our runner, but heavy packages add seconds.
- The `next-mdx-remote/serialize` runs in the browser, which is unusual. It works but isn't the typical pattern. We do it this way to keep static export working without a Node runtime.

## Running locally for development

```bash
npm install
npm run dev
# http://localhost:3000
```

For type checking:
```bash
npm run type-check
```

For production build:
```bash
npm run build
# Output in ./out/
```
