---
id: 00-1-the-letter
volume: volume-00-welcome
chapter: 1
number: 1
title: "A Letter to a Curious Mind"
subtitle: "Why this exists, and what we're going to do together."
estimatedMinutes: 12
prerequisites: []
keyTerms: [code, computer, syntax]
exerciseCount: 0
checkpoint: false
tags: [theory]
---

<Section label="The Opening" icon="✦">

Hello.

If you're reading this, you've decided to learn Python. Maybe it's for a job. Maybe it's because you've been using AI to write code for you and you've started to feel uneasy about how little of it you'd be able to defend in an interview. Maybe it's pure curiosity. All three are good reasons. The reason matters less than the choosing.

This little application is going to teach you Python. Not the way most courses do — there are plenty of those, and most of them are some flavor of "type these magic words and watch them work." That's not what we're going to do. We're going to go slowly. We're going to talk about where the words came from. We're going to ask, again and again, *why is it like this?*

The answer to that question is almost always more interesting than the question.

</Section>

<Section label="What this app is, exactly">

PyTutor is a *slow* Python course. There are roughly four hundred and sixty-five lessons planned across thirteen volumes. If you completed one lesson per day, you'd finish in a little over a year. That number isn't supposed to scare you. It's supposed to release you.

Most courses promise you'll be a Python programmer in a weekend. They are lying or they are using a much weaker definition of "Python programmer" than I am. To actually understand a programming language — to *talk* about it the way a person who understands it talks — takes time. Not because Python is hard, but because *understanding anything* takes time. We're going to take that time.

Each lesson follows a rhythm:

- **The Opening.** A short narrative paragraph or two, conversational, setting the scene.
- **The Word.** Where a key term came from — its Latin or Greek roots, when it entered English, when it entered computing.
- **The Why.** What problem this concept exists to solve. (Hint: every concept exists because someone, somewhere, was frustrated by something.)
- **The What.** The concept itself — first in plain language, then with the precise definition.
- **The How.** Code. Real Python, line by line, with what every character means.
- **You Try.** Exercises in a live editor. You write code, hit run, see what happens. Hints appear if you ask for them.
- **Talk About It.** How you'd explain the concept aloud, in an interview or to a colleague.
- **Connections.** What this builds on, what it sets up.

You'll see these as labeled sections in every lesson. They aren't padding. They are the structure that makes the material stick.

</Section>

<Section label="Why etymology">

There's a word you'll see in every lesson — sometimes as the *Etymology* card you can click to expand, sometimes inline as a small underlined word with a popover. That word is **etymology** — Greek *etymon* ("true sense") plus *logia* ("study of"). The study of where words come from.

You may not have spent much time thinking about word origins since high school English. That's fine. Most programmers don't. But it's a quiet superpower. Here's the trick.

When you learn the word *operator* without knowing where it came from, it's just a label. A label sticks to a thing the way a sticker sticks to a wall: only as long as the glue holds. When you learn that *operator* comes from Latin *operari*, "to work," and that an operator in Python is a working symbol — it does work on its operands — the word stops being a sticker and becomes a small story. Stories stick.

We will use this trick relentlessly.

<EtymologyCard
  term="syntax"
  origin="Greek"
  rootForm="syntaxis"
  rootMeaning="arrangement together"
  story="From the Greek 'sun' (together) plus 'taxis' (arrangement). Originally a military term: the disposition of an army on the battlefield. It became a grammatical term in late antiquity — the arrangement of words to make a coherent sentence. When computer scientists in the 1950s needed a word for the rules that determined which sequences of characters were valid in a programming language, they took 'syntax' off the shelf."
  entryToComputing="The first programming languages with what we'd recognize as syntax — Fortran (1957), Lisp (1958), Cobol (1959) — adopted the linguist's vocabulary because their designers were thinking of code as a language."
  insight="When someone says a piece of code has 'a syntax error,' they mean the *arrangement* is wrong — the comma is missing, the bracket isn't closed. Syntax is about arrangement, not about meaning. A grammatically perfect sentence can still be nonsense; a syntactically perfect program can still be wrong. We'll come back to this distinction."
/>

</Section>

<Section label="A promise about pace">

I promise you something specific, and I want you to hold me to it.

I will not skip steps. When we encounter a word, I will tell you what it means. When we encounter a feature of the language, I will tell you why that feature exists — what problem it solves, what programs would have looked like before it. When we look at code, I will tell you what *every character* on the line is doing, not just the interesting parts. I'd rather repeat myself than leave a mystery.

If a section feels too slow for you, skim. Nothing is locked. You can run ahead. But know that if you run ahead, you may have to come back later when something doesn't feel right, and the slow walk you skipped is what would have made it feel right the first time.

The patient way is the fast way, eventually.

</Section>

<Section label="What we're going to build, together">

By the end of Volume 1, you will have written your first Python program and understood every character of it. You'll know what an *interpreter* is and why Python uses one. You'll know what a *bit* is, what a *byte* is, why the distinction matters, and why your computer thinks the letter "A" is the number 65.

By the end of Volume 3, you'll have full command of Python's data shapes — lists, tuples, dictionaries, sets — and you'll know not just how to use each one but when to reach for which.

By the end of Volume 8, you'll have slowly worked through all twenty-four interview problems with the kind of patient explanation that actually sticks. You won't have memorized solutions; you'll have built a working understanding of patterns.

By the end of Volume 10, you'll have built a real Retrieval-Augmented Generation pipeline, written your own evals, and shipped a small Model Context Protocol server. You'll know what *embedding* means, what *chunking* means, what *context engineering* means. You'll be able to talk about applied AI engineering in the language working engineers actually use.

By the end of Volume 12, you'll have shipped a handful of projects to GitHub that you can point at in interviews and say, "*I built that. Let me walk you through it.*"

</Section>

<Section label="Now">

There's nothing to do in this lesson but read. No exercises. No code. The next lesson explains how to use this app — the editor, the navigation, the progress tracker, the glossary — so you're ready to dive into Volume 1 when you turn that page.

When you're ready, click *next*.

I'm glad you're here.

</Section>

<Connection
  forward={[{ id: '00-2-how-to-use', title: 'How to use this app' }]}
>

The next lesson is a quick tour of the interface — every feature labeled, every keyboard shortcut listed. After that, we begin Volume 1.

</Connection>
