# Contributing to PyTutor

Thanks for thinking about contributing! PyTutor is open to fixes, improvements, and new lessons.

## Quick rules

- Lessons should follow the existing tone — slow-paced, etymological, conversational.
- Code examples must run on Pyodide (most stdlib works; some C-extension packages don't).
- Use the existing components (`<EtymologyCard>`, `<CodeRunner>`, etc.) where possible.
- Keep each lesson 10-15 minutes of reading.

## Authoring a new lesson

1. Pick a volume and a slot. Lessons are numbered within volume, e.g., `01-15-strings-introduction.md`.
2. Create the file under `src/content/<volume>/`.
3. Add YAML frontmatter:

```yaml
---
id: 01-15-some-id              # unique
volume: volume-01-foundations  # matches the directory
chapter: 3                     # 1-indexed
number: 15                     # 1-indexed within volume
title: "Some Title"
subtitle: "Optional subtitle"
estimatedMinutes: 12
prerequisites: [01-14-previous-lesson]
keyTerms: [list, of, terms]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---
```

4. Write the body in markdown. Use MDX components for callouts, code, etc.
5. Register the lesson in `src/content/registry.ts`.

## Pull requests

- One change per PR if possible.
- Run `npm run type-check` and `npm run build` before submitting.
- A short description of what you changed and why.

## License

By contributing, you agree your contributions are MIT-licensed.
