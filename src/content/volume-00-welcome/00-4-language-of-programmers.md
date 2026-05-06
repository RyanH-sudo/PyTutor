---
id: 00-4-the-language-of-programmers
volume: volume-00-welcome
chapter: 1
number: 4
title: "The Language of Programmers"
subtitle: "Jargon, tribe, and the courage to ask."
estimatedMinutes: 9
prerequisites: [00-3-how-learning-works]
keyTerms: [code]
exerciseCount: 0
checkpoint: false
tags: [theory, fde]
---

<Section label="The Opening">

Every profession develops a private vocabulary. Doctors say *idiopathic* when they mean "we don't know why." Lawyers say *tortious* when they mean "the kind of harm you can sue someone for." Plumbers say *trap* and *vent* and *waste arm*. These words exist for a reason — they're more precise than their English equivalents — but they also serve a social purpose. They mark who's inside the tribe.

Programmers are no different. There are dozens of words you'll encounter in this curriculum that mean specific things, and once you know them, you sound like a programmer. Not knowing them, you sound like an outsider — even if your code is good.

This lesson is about that vocabulary, and about the courage it takes to ask what a word means when you don't know it.

</Section>

<Section label="Some words to start with">

Here are a few words that show up immediately in any technical conversation. We'll go deeper on each of them later, but you should know they exist.

- **Source code.** The text you write. Source as in "the place a thing comes from." (Latin *surgere*, "to rise up.")
- **Bug.** A mistake in code. The story that the term came from a moth in a Harvard Mark II relay (1947) is real, but the word *bug* meaning "a defect in machinery" predates it by decades. Edison used it in 1878.
- **Compile.** To translate source code into a form a machine can run, all at once. From Latin *compilare* — "to plunder, to gather together." A compiler gathers your source into a final program.
- **Runtime.** The period during which a program is actually executing. Compile-time is when the translation happens; runtime is when the running happens. We'll come back to this distinction often.
- **Library.** A bundle of pre-written code you can use without writing yourself. The metaphor is exact: like a real library, you "borrow" functionality.
- **API.** Application Programming Interface. The set of names, functions, and rules a library exposes for you to use. When you "call an API," you're invoking one of those public functions.
- **Repository.** A folder containing a project's source code, usually tracked by a version-control system like Git. Often shortened to *repo*.
- **Commit.** A saved snapshot of your repository at a point in time. The verb form (*to commit*) means "to record this state."
- **Pull request.** A proposal to merge a branch of code into a main branch. Often shortened to *PR*. You'll hear "I opened a PR" or "can you review my PR?"
- **Stack.** Both a data structure (last-in-first-out) and a metaphor for the layers of technology you're using. "I work on the backend stack" means "I work on the server-side technologies." A *full-stack* developer works at every layer.

These words are going to come up. You don't need to memorize this list. You need to *recognize* the words when you see them so they don't trip you up. The glossary has every one of them.

</Section>

<Section label="The unspoken rules of asking">

Here's a thing programmers rarely say out loud but believe deeply: it is acceptable to ask "what does that word mean?" once. It is not acceptable to pretend you understand and have to ask again later.

Every programmer worth working with would rather you stop them mid-sentence and ask than have you nod along, miss the meaning, and produce a confused result a week later.

The cost of asking is small. The cost of not asking compounds.

In an interview, the same rule applies. If a question uses a word you don't know, the strongest move is to say, "*Just to make sure we're using this term the same way — could you tell me what you mean by* [word]?" Senior engineers do this all the time. It's a sign of confidence, not weakness.

The illusion that asking is weakness comes from school, where we were ranked against classmates and an admission of ignorance felt like losing points. Software engineering is not school. The team's product is what gets ranked, not the individual's perfect façade. Asking helps the team.

</Section>

<Section label="A note on style and humility">

Programmers also have aesthetic opinions, and the opinions are loud. You will encounter people who feel strongly that you should use four spaces instead of tabs (Python actually requires this — we'll get to it), that you should never use single-letter variable names except in mathematical contexts, that there's only one correct way to format a function definition.

Most of these opinions are correct in their context and overstated in general. The rule that helps most: *write the code the way the codebase you're working in already writes it.* Match the surrounding style. If you join a team that uses two-space indentation, use two-space indentation, even if you prefer four. Consistency within a project matters more than universal "correctness."

This is also a small humility lesson. Most engineering norms exist because someone got burned. The rule against single-letter variable names exists because someone tried to debug `if a > b and c < d` at three in the morning and discovered they couldn't remember which variable was which. The four-space indentation rule in Python exists because mixing tabs and spaces produced invisible bugs that took hours to find.

When you see a rule, ask: *what failure is this preventing?* If you can answer the question, follow the rule. If you can't, ask someone. Eventually you'll know enough to argue, and then you'll have something to argue.

</Section>

<Section label="The 'thinking like a programmer' myth">

There's a phrase you'll see in books and on YouTube: "thinking like a programmer." It's mostly a marketing phrase, but there's a kernel inside it that's real.

The kernel is this: programmers learn to break problems into pieces. Not by special talent — by practice. When a non-programmer is given a vague problem ("send a reminder email to everyone who hasn't paid their invoice in thirty days"), they often try to solve the whole thing in their head. A programmer's first move is different. The programmer asks:

- What counts as "everyone"? Where does that list come from?
- What counts as "hasn't paid"? Where do we look that up?
- What format is the email in? Who's it from? What does it say?
- What happens if the address is invalid?
- What if we run this twice — does the person get two emails?

Each of those is a smaller, more solvable problem. By the time the programmer starts writing code, the original vague problem has been replaced by half a dozen specific ones, each of which can be solved in maybe ten lines.

That habit — *break the vague into the specific* — is the only "programmer thinking" worth the name. We'll practice it in every volume.

</Section>

<FDEConnection>

This habit is also the FDE habit. When a customer says, "we want to use AI to improve customer support," a Forward Deployed Engineer's first move is *not* to start designing an AI system. It's to ask: what does "improve" mean? Faster responses, fewer escalations, better customer satisfaction scores? Which of these is the metric the executive sponsor will use to judge success? What's the current baseline? Where does the support data live? Who owns it? Who has access? What format is it in?

By the time an FDE proposes a technical approach, the original vague problem has become a set of specific ones — and the proposed solution maps to them directly. This is the same skill we'll practice on small Python problems. It scales.

</FDEConnection>

<Section label="One last thing">

You may catch yourself feeling, occasionally, that you "should already know this" or that real programmers wouldn't need this much explanation. That feeling is universal among learners and entirely false. The programmers you admire forgot more about Python than they remember. Every one of them used to not know what a *variable* was. Most of them still google how to read a CSV file.

You aren't catching up to a fixed bar. You're walking onto a path that everyone walks at their own speed, including the people who already work at the companies you're applying to. Some are further along. None are smarter for being further along — they just started earlier.

</Section>

<Connection
  back={[{ id: '00-3-how-learning-works', title: 'How Learning Actually Works' }]}
  forward={[{ id: '00-5-history-in-brief', title: 'A Brief History of Why Python Exists' }]}
>

Next: a short history of how we got from "computers" being a job title for a clerk to "Python" being a language read by millions of people. After that, three more orientation lessons, and then Volume 1 begins.

</Connection>
