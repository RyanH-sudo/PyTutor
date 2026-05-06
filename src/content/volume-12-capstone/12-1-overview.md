---
id: 12-1-overview
volume: volume-12-capstone
chapter: 1
number: 1
title: "Capstone Projects — What You'll Ship"
subtitle: "Twelve projects to take you from learner to portfolio."
estimatedMinutes: 9
prerequisites: []
keyTerms: []
exerciseCount: 0
checkpoint: false
tags: [theory, fde, capstone]
---

<Section label="The Opening">

Welcome to the final volume. The previous eleven volumes taught Python and the surrounding craft. This volume is different: it's twelve projects you build and ship to GitHub. Each one is real, useful, and serves as a portfolio piece you can point at in interviews.

By the end of Volume 12, you'll have:
- Twelve repos on your GitHub profile.
- Real engineering artifacts you can defend in interviews.
- A practiced rhythm of designing, building, and shipping.

The projects are sized to take 1-3 days each, working at the pace this curriculum encourages.

</Section>

<Section label="The twelve projects, briefly">

**Project 1: A Pythonic Greeter.** Command-line tool that takes arguments, reads config, prints personalized greetings. Demonstrates: argparse, file I/O, string formatting, basic CLI design.

**Project 2: A Word Counter.** Read a text file, count words, output stats. Demonstrates: file I/O, dict patterns, Counter from collections, command-line tools.

**Project 3: A Tiny Web Scraper.** Fetch a webpage, extract a table, write to CSV. Demonstrates: HTTP requests, HTML parsing (BeautifulSoup), CSV output, error handling.

**Project 4: A REST API.** Small Flask or FastAPI service exposing an endpoint that accepts JSON. Demonstrates: web frameworks, JSON, request validation, basic deployment.

**Project 5: A Database-Backed App.** Add SQLite to Project 4. Persist data. Demonstrate: SQL, database connections, ORM optional, migrations.

**Project 6: A Test Suite.** Take an earlier project, write a comprehensive pytest suite. Demonstrates: testing discipline, mocking, fixtures, coverage.

**Project 7: A Type-Checked Library.** A small library with full type hints, mypy-clean. Demonstrates: type system maturity, library structure, packaging.

**Project 8: An LLM-Powered CLI.** Interactive terminal app that uses Claude API to summarize, translate, or analyze. Demonstrates: API integration, streaming, error handling.

**Project 9: A RAG Pipeline.** Index a corpus of documents with embeddings; query interactively. Demonstrates: embeddings, vector search, chunking, end-to-end pipeline.

**Project 10: An Eval Framework.** Build evals for Project 9. Measure retrieval quality, answer quality, regression. Demonstrates: eval design, automated testing of AI systems.

**Project 11: A Model Context Protocol Server.** Build an MCP server that exposes a useful tool to Claude. Demonstrates: MCP spec, agentic integration, deployment.

**Project 12: A Customer-Style Engagement.** Pick a real domain (your network engineering experience, your Sanskrit study, anything). Scope it as if it were a customer brief. Build the AI-powered solution end to end. Document like an FDE would. Demonstrates: the full FDE flow.

</Section>

<Section label="How to approach each project">

Each project follows the same shape:

1. **Discovery (1-2 hours).** Read the project brief. Make a one-page plan. Identify what you don't know.
2. **Prototype (half day).** Get the simplest version working end-to-end. Doesn't have to be pretty.
3. **Refine (half day).** Add error handling, tests, documentation, polish.
4. **Document (1-2 hours).** Write the README. Make it usable by someone who isn't you.
5. **Ship (1 hour).** Commit. Push. Add to your GitHub profile.

The goal isn't perfection. It's *having shipped*. Three days of focused work per project. Twelve projects in a few months if you ship one per week.

The interview-relevance compounds. Recruiters who see "12 substantial projects on GitHub" treat the candidate seriously even before opening a repo.

</Section>

<Section label="The README as the gold">

For each project, the README is more important than you'd think. It's what recruiters see first when they open the repo. A great README has:

- A one-line description of what the project does.
- A one-paragraph explanation of why it exists.
- Setup instructions (one block, copy-pasteable).
- A usage example.
- An architecture sketch (sometimes a diagram).
- Notes on what's intentionally not done — honest scope.

A bad README is missing or generic. A great README signals "this person knows how to ship and document." The 1-2 hours spent on the README pay off disproportionately.

</Section>

<Section label="What you'll be able to do at the end">

After Volume 12:

- You'll have twelve repos on GitHub, each with a polished README and working code.
- You can point at any of them in an interview and walk through the architecture.
- You've practiced the full discovery → build → ship cycle twelve times.
- You have the muscle memory for what "production Python" looks like.
- You can defend every choice you made.

This is what separates "I learned Python" from "I'm a working Python engineer." The difference is the ship cycle, repeated.

</Section>

<FDEConnection>

The capstone projects are deliberately FDE-shaped. Project 12 in particular mimics a real customer engagement: scope, build, deliver, document. By the time you're applying to FDE roles, you'll have done this twelve times. When the interviewer asks "have you done customer-style engagements?" you say yes and point at the twelfth project.

The depth of the engagement matters. Don't pick something trivial. Pick a real problem you have or someone you know has. Solve it the way an FDE would. The artifact becomes interview gold.

</FDEConnection>

<Connection>

The capstone volume continues with detailed briefs for each of the twelve projects. Each brief is its own lesson — what to build, what to demonstrate, what to put in the README. By Volume 12 lesson 12, you've shipped twelve real things.

</Connection>
