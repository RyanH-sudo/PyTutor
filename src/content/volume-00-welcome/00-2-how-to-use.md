---
id: 00-2-how-to-use
volume: volume-00-welcome
chapter: 1
number: 2
title: "How to Use This App"
subtitle: "Every feature, labeled. No surprises."
estimatedMinutes: 8
prerequisites: [00-1-the-letter]
keyTerms: [interpreter, repl]
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

You're inside PyTutor. Before we start the curriculum, let's walk through the interface so nothing feels mysterious. There are five main pieces, and once you know what each one is, you'll be using all of them within a week without thinking about it.

</Section>

<Section label="The sidebar">

On the left (or the menu icon on small screens) is the sidebar. It has four navigation links at the top — Home, Glossary, Progress, Settings — and below them, the entire curriculum, organized by volume. Each volume can be expanded by clicking it. When you click a lesson, it opens in the main pane.

A small dot next to a lesson means *in progress*. A green check means *completed*. An empty circle means *not started*. This is the only "progress signal" the app gives you. There are no streaks, no badges, no "you're on day 47" reminders. Come back when you can. The lessons will wait.

</Section>

<Section label="The lesson pane">

The center column is where you read. Notice that the body text is set in a serif font (Source Serif 4) for comfortable long-form reading — the same logic newspapers use. The headings are in a sans-serif font (Inter) because they're labels, not prose. Code is in a monospaced font (JetBrains Mono) because alignment matters.

Each lesson is divided into the labeled sections you saw in the last lesson — *The Opening, The Word, The Why,* and so on. The label appears between two horizontal lines, like a divider in a manuscript. You can scan a lesson by its labels to find the part you want to revisit.

At the bottom of every lesson is a footer with two cards: *previous* and *next*. Click them to navigate. There's also a "Mark lesson complete" button you can press when you've internalized the material.

</Section>

<Section label="The code editor">

When a lesson includes code you can run, you'll see a dark panel with a *run* button at the bottom. The editor is Monaco — the same editor used inside VS Code. You can click anywhere in the code, edit it, and press *run*. Python executes in your browser via Pyodide, which is a port of CPython compiled to WebAssembly. You don't have a local Python installation to set up. There is no server. The Python literally runs inside the browser tab.

The first time you press *run* on any page, Pyodide takes a moment to load — about ten megabytes, two seconds on a fast connection. After that, every code block uses the same loaded interpreter. It's fast.

Here is your first one. Press *run* and watch what happens.

<CodeRunner
  initial={`# Your first Python.
# Press run.

print("hello, ryan.")`}
  expected="hello, ryan."
  caption="If you're not Ryan, change the name. The editor is yours."
/>

When you ran it, you saw the output `hello, ryan.` appear in a panel beneath the editor. To Python, the line `print("hello, ryan.")` was a *statement*, and the way it executed that statement was to display the text between the quotation marks.

We'll dig into what every part of this means in Volume 1. For now, just notice: you wrote Python, you ran it, you saw a result. That's the whole loop.

</Section>

<Section label="The glossary">

The glossary is your friend. As you read lessons, you'll encounter terms that have full glossary entries — they show up underlined with a dotted line. Hover or focus on the underlined word and a small definition card appears.

If you want to browse the whole glossary, the sidebar link takes you to a page where you can search and filter every term. The glossary entries include etymology where the word has one. There are about eighty entries seeded for the early volumes; that number will grow into the hundreds as the curriculum expands.

A word about <KeyTerm term="interpreter" brief="A program that reads source code and executes it directly, statement by statement, instead of compiling it to machine code first.">interpreters</KeyTerm> — when you ran that `print` line, an interpreter was what executed it. Python is what's called an *interpreted language*, meaning your source code isn't translated all at once into a separate file you then run. Instead, the Python interpreter reads your code, decides what each line means, and does it. We'll get into the *interpreter vs. compiler* distinction in detail in Volume 1, but the term is one you'll see often, so the glossary entry is there now.

</Section>

<Section label="Progress and settings">

The Progress page shows you a snapshot — how many lessons you've completed, which volumes you've worked through, a small progress bar per volume. There's also a *reset progress* button if you ever want to hand the app to your brother (or yourself, six months from now) and start clean.

Settings has the theme switcher. The default is dark — a quiet study room at night. Light mode is also available — a parchment-colored background suited for daytime reading. Whichever feels better for your eyes.

</Section>

<Section label="The keyboard, the mouse, the head">

Most of what you'll do is read, run code, and click *next*. There's no game to play. There's no streak to maintain. The only thing this app asks of you is that you sit with each lesson long enough to understand it.

The other thing the app asks — and this is the most important — is that you *do* the exercises. When a lesson has a `You Try` block, the writing in your head changes when you actually try the code. Reading is fast. Doing is slow. Doing is what makes the knowledge yours.

</Section>

<Connection
  back={[{ id: '00-1-the-letter', title: 'A Letter to a Curious Mind' }]}
  forward={[{ id: '00-3-how-learning-works', title: 'How Learning Actually Works' }]}
>

Next we'll talk about *how learning works* — what neuroscience tells us about why slow repetition outperforms cram-style study, and what to expect from yourself as you move through the curriculum.

</Connection>
