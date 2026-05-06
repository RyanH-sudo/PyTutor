---
id: 10-1-how-llms-work
volume: volume-10-applied-ai
chapter: 1
number: 1
title: "How LLMs Work — A Working Engineer's Mental Model"
subtitle: "Enough to build with them. Not the math."
estimatedMinutes: 14
prerequisites: []
keyTerms: [token]
exerciseCount: 0
checkpoint: false
tags: [theory, fde]
---

<Section label="The Opening">

Welcome to Volume 10. We're going to spend this volume building applied AI competence — the kind that makes you employable as a Forward Deployed Engineer. We'll cover LLMs at a working-engineer level (this lesson), the Claude API, embeddings, chunking, RAG pipelines, evaluations, and Model Context Protocol.

You won't leave Volume 10 a researcher. You'll leave able to design and ship production AI systems, which is what FDE roles need.

</Section>

<Section label="What an LLM is, mechanically">

An LLM (Large Language Model) is a function that takes a sequence of tokens as input and produces a probability distribution over the next token. That's it. That's the whole job description.

Let me unpack that.

A *token* is a unit of text. Roughly: a token is a few characters, often a word or part of a word. The string `"the cat sat on the mat"` might be 6 tokens (one per word) or 7 or 8 depending on how the tokenizer splits things. Punctuation, spaces, and rare words sometimes split into multiple tokens; common words are often one token each.

LLMs work in tokens, not characters or words. When you send a prompt to Claude, your text is first *tokenized* — broken into tokens. Claude operates on those tokens internally. When Claude responds, it produces tokens, which are then *detokenized* back into text.

Inside the model is a vast neural network with billions of parameters. The network has been trained on enormous amounts of text. Given the input tokens, it computes a probability for every possible next token. The token with the highest probability (with some randomness mixed in) is sampled and added to the output. Then the process repeats: the model considers the now-extended sequence and predicts the next token. And so on, until it produces a special "stop" token or hits a length limit.

</Section>

<Section label="The probability distribution">

Crucially: the model doesn't decide on the next token deterministically. It produces a *distribution* — like saying "30% chance the next token is 'cat,' 25% chance 'dog,' 20% chance 'mouse,' 15% chance 'rabbit,' 10% something else." Then a sampling process picks one according to those probabilities.

This is why LLMs can give different answers to the same prompt. Each time, the random sampling picks a different token. There are knobs you can tune: *temperature* controls how peaky the distribution is (low temperature → almost always picks the highest probability; high temperature → more random). The Claude API exposes these knobs.

Understanding this gives you the right frame for prompt engineering: *you're nudging the model toward sampling tokens that produce useful answers*. A clear prompt makes "useful" more probable.

</Section>

<EtymologyCard
  term="token"
  origin="Old English"
  rootForm="tācn"
  rootMeaning="a sign, a symbol"
  story="The Old English 'tācn' meant a sign or symbol — something used to indicate something else. The word entered modern English meaning a small physical object representing something larger ('a token of appreciation,' 'subway token'). In computer science, a 'token' has been a unit of meaningful text since at least the 1960s — first in compiler theory (a token in code is a keyword, identifier, or punctuation mark), now in NLP and LLMs."
  insight="A token is *the unit of meaning* a system works with. For a compiler, tokens are keywords and identifiers. For an LLM, tokens are sub-word chunks. The word 'token' carries the same essence in both: a small piece that has its own meaning in the system."
/>

<Section label="What 'training' means">

The model's parameters were learned from data. The training process showed the model billions of pieces of text, each time asking "given this prefix, what's the next token?" The parameters were nudged in directions that made the model better at predicting. After enough nudges across enough data, the model has implicitly learned a vast amount about how language and the world work.

A few things to know about training:

- **It's incredibly expensive.** Training Claude or GPT-4 cost tens of millions of dollars. The compute requirements are massive.
- **It's data-hungry.** Models are trained on most of the public internet plus books and other curated text.
- **It happens once.** Once the model is trained, the parameters are frozen. The model you use today is the result of a months-long training run from some time in the past. It's not learning from your prompts.
- **There are post-training steps.** After the base model is trained, additional steps (RLHF — Reinforcement Learning from Human Feedback) make it follow instructions, refuse harmful requests, etc. The base model just predicts tokens; the post-training shapes it into an assistant.

This is why models have a *knowledge cutoff* — they only know things from before their training data. Claude 4.7 has a January 2026 cutoff. It doesn't know what happened yesterday unless you tell it in the prompt.

</Section>

<Section label="The context window">

The model has a maximum number of tokens it can attend to at once — its *context window*. Claude 4.7's context window is 1 million tokens, which is exceptional. Older models were 8K, 32K, 128K. The window is roughly: how much text can the model "see" when generating a response.

Anything you want the model to know — system instructions, the conversation history, retrieved documents, file contents — must fit in the context window. When you exceed it, you have to choose what to keep and what to drop.

This is why **context engineering** is a thing. It's the discipline of curating what enters the context window. Too little, the model lacks information. Too much, performance degrades (context rot — models get worse at long contexts) and costs go up. The middle ground is what FDEs design.

</Section>

<Section label="What LLMs are good at, and not">

LLMs are remarkably good at:
- Generating fluent text in any style.
- Understanding and explaining text.
- Following instructions when stated clearly.
- Translating between languages.
- Summarizing, expanding, rewriting.
- Coding — given clear specs and context.
- Reasoning about explicit information.

They're bad at:
- Math beyond simple arithmetic (without a calculator tool).
- Precise factual recall — they hallucinate confidently.
- Anything requiring up-to-date information not in training.
- Long-horizon planning without scaffolding.
- Self-correction without external feedback.

The art of building with LLMs is leveraging the strengths and working around the weaknesses. *Provide tools for math.* *Use retrieval for facts.* *Use evals to detect hallucination.* *Use scaffolding for long tasks.* These are the patterns of applied AI engineering.

</Section>

<FDEConnection>

When customers ask "can AI do X?", the FDE's instinct is:

1. *Decompose X into smaller pieces.* What does X actually require?
2. *Map each piece to LLM capabilities.* Which parts are LLM strong-suits, which need scaffolding, which need separate tools?
3. *Identify the failure modes.* Where will the LLM hallucinate? Where will it lose context? Where will it skip steps?
4. *Design the harness.* What evals catch the failures? What human-in-the-loop checks need to be there?

Most production AI is 30% the LLM and 70% the harness around it. Understanding what LLMs are mechanically — token predictors with frozen knowledge — is what lets you design the rest.

</FDEConnection>

<InterviewPhrase setup="If asked 'how do LLMs work?' something like this works.">

At a working-engineer level: an LLM is a function from a sequence of tokens to a probability distribution over the next token. The text is broken into tokens, the model produces a distribution, a sampler picks the next token, and the process repeats. The model's behavior comes from billions of parameters trained on huge amounts of text. The knowledge is frozen at training time, so anything current has to be supplied via the context window. Most production work is about engineering what enters that context, not about the model itself.

</InterviewPhrase>

<Connection
  forward={[{ id: '10-2-claude-api-first-call', title: 'The Claude API — A First Call' }]}
>

Next: making your first Claude API call. We'll use the Anthropic SDK to send a prompt and parse the response.

</Connection>
