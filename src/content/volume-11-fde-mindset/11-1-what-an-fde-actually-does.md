---
id: 11-1-what-an-fde-actually-does
volume: volume-11-fde-mindset
chapter: 1
number: 1
title: "What an FDE Actually Does"
subtitle: "The job, in concrete terms."
estimatedMinutes: 12
prerequisites: []
keyTerms: [forward deployed engineer]
exerciseCount: 0
checkpoint: false
tags: [theory, fde]
---

<Section label="The Opening">

Welcome to Volume 11. The previous volumes built Python and applied-AI competence. This volume builds the *mindset* — how to think and talk like a Forward Deployed Engineer. By the end, you'll be able to handle the FDE-specific parts of an interview: customer scoping, system design under constraints, the "tell me about a time" stories.

This first lesson is concrete: what does the job actually look like, day to day, week to week. We touched on this in Volume 0 lesson 6; here we go deeper.

</Section>

<Section label="The role at a snapshot">

A Forward Deployed Engineer (FDE) is a software engineer who works directly with customers, embedded in their environments, building production solutions on top of a platform. The role was invented at Palantir and has been adopted by AI companies (Anthropic, OpenAI), data companies (Databricks, Snowflake), and many startups.

The phrase that captures it: **one customer, many capabilities.** A traditional product engineer has *many customers, one capability* (they build a feature used by everyone). An FDE has *one customer, many capabilities* — they bring whatever tools are needed to make this customer succeed.

In numbers (from Sundeep Teki's research, 1000-job FDE analysis):
- ~55% of the work is customer-facing.
- ~30% is engineering on the customer's deployment.
- ~15% is feeding intelligence back to the product team.

The exact split varies by company and seniority. Senior FDEs do more strategy and less hands-on coding. Junior FDEs do more building.

</Section>

<Section label="A realistic week">

**Monday morning.** Customer sync. The customer's data team has run into an issue — their pipeline is choking on documents over 200 pages. You listen. You ask diagnostic questions. You take notes.

**Monday afternoon.** Reproduce the issue locally. Trace it to a chunking strategy that loses context across page boundaries. Sketch a fix.

**Tuesday.** Build the fix. Ship a fork or a configuration change. Run their eval set against it. The accuracy went from 71% to 94% on long docs. Send them the results.

**Wednesday.** Pair-programming session with their senior engineer. Walk through the fix together. Help them understand the change so they can maintain it.

**Wednesday afternoon.** Internal team standup. You share what you saw at this customer. Two other FDEs nod — they've seen the same chunking issue elsewhere. The team lead opens an internal RFC: "We should make chunking configurable in the SDK."

**Thursday.** Write the RFC. Reference the three customer engagements where it would have helped. Estimate the engineering cost. Send to the product team.

**Friday.** Customer sync, this time with a different customer. They're scoping a new use case. You help them think through whether AI is the right tool, what a pilot would look like, what data they'd need to provide.

A typical week has 8-15 hours of customer interaction, 15-25 hours of engineering, and 5-10 hours of internal coordination and documentation. The exact mix shifts week to week — some weeks are deep building, some are heavy customer time.

</Section>

<Section label="A realistic project">

A "customer engagement" is an FDE's primary unit of work. A typical engagement runs 2-12 weeks.

**Week 1-2: Discovery.**
- What do they actually need?
- What's the business goal? What metric defines success?
- What systems exist? What data is available?
- Who are the stakeholders? Who has decision authority?
- What's the timeline?

You produce a *discovery document* — 2-3 pages summarizing the problem, the proposed approach, success criteria, and timeline. Every assumption is named explicitly. The customer signs off.

**Week 3-4: Prototype.**
- Build the smallest thing that solves the problem.
- Use real customer data (with permission).
- Demo to stakeholders.

The prototype is rough. The point isn't quality; the point is to surface what you didn't know yet. Often the prototype reveals issues with the data, the workflow, or the original framing.

**Week 5-8: Production build.**
- Take the prototype and harden it.
- Error handling, logging, evals, monitoring.
- Integration with their existing systems.
- Documentation for their team.

This is where the engineering work concentrates. You're writing real code that real customers will rely on.

**Week 9-10: Deploy and validate.**
- The system goes live.
- Monitor closely. Identify and fix issues quickly.
- Run the eval set in production. Confirm the metrics.

**Week 11-12: Handoff.**
- Train the customer's team.
- Write the runbook — how to maintain, monitor, extend.
- Internal retrospective — what worked, what didn't, what should become a platform feature.

Then you rotate to the next customer.

</Section>

<Section label="What FDEs are paid for">

The role pays $200-400K base at frontier AI labs because it's hard. Three specific things FDEs are uniquely good at:

**1. Living with ambiguity.** Customer problems are rarely well-defined. The customer says "we want to use AI" but doesn't know which use case will succeed. The FDE turns that ambiguity into a concrete project.

**2. Translation.** Between technical and non-technical, between platform capability and customer environment, between what's possible and what's needed now. FDEs are bilingual.

**3. End-to-end ownership.** The FDE doesn't punt to another team when something gets hard. They debug the network issue, fix the data pipeline, write the docs, train the user. It's "one mind from start to finish" — the most valuable kind of engineering work because nothing falls through cracks.

If you're naturally good at any of these, you're FDE-shaped. If you're good at all three, you're rare.

</Section>

<Section label="Anti-patterns FDEs avoid">

Things that distinguish good FDEs from bad ones:

**Don't:**
- Promise what you don't know is possible. ("Sure, AI can do that!" — when you haven't checked.)
- Build the customer's whole system. (You're there to bridge to the platform, not replace their engineering team.)
- Solve the wrong problem. (The problem they describe isn't always the problem they have.)
- Hide complexity. (Customers respect "this is going to be hard because X" more than "we'll figure it out.")
- Skip evals. (You can't say "it works" without measuring.)

**Do:**
- Listen before proposing.
- Build the smallest thing first.
- Measure with evals.
- Bring intelligence back to the product team.
- Write down what you learned so the next FDE benefits.

</Section>

<FDEConnection>

The interview tests for these. When asked "tell me about a time you handled a customer problem," the strongest stories show:

1. *You listened first.* Diagnostic questions before solutions.
2. *You decomposed the problem.* The vague request became specific sub-problems.
3. *You built the smallest thing that solves it.* Prototype before production.
4. *You measured.* Quantified the improvement.
5. *You brought it back.* The lesson became a team or product improvement.

Every interview I've ever heard about asks variants of this. Have your stories ready.

</FDEConnection>

<InterviewPhrase setup="If asked 'why do you want to be an FDE specifically?' something like this works.">

Two reasons. First, the work itself — I thrive in the gap between platform capability and customer reality, where the engineering and the human translation are equally important. I've been doing this informally for years; I want to do it formally with the scale of a frontier lab. Second, the trajectory — FDEs see more customer problems in a year than product engineers see in five, and the pattern recognition compounds. The FDEs I've talked to describe the role as the best founder-prep job in tech, and I find that compelling.

</InterviewPhrase>

<Connection>

Volume 11 continues with customer scoping techniques, system design under constraints, the STAR story framework done right, and full mock interviews you can practice with the in-app AI tutor.

</Connection>
