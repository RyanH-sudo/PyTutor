---
id: 01-7-syntax-and-semantics
volume: volume-01-foundations
chapter: 2
number: 7
title: "Syntax and Semantics"
subtitle: "The grammar of the language and the meaning of the words. They are not the same thing."
estimatedMinutes: 11
prerequisites: [01-6-the-repl]
keyTerms: [syntax]
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

Linguists distinguish *syntax* from *semantics*. Syntax is the rules of grammar — which sequences of words form valid sentences. Semantics is the meaning of the sentences. They are different things, and both matter.

A sentence can be syntactically valid but semantically nonsense: *Colorless green ideas sleep furiously.* (Noam Chomsky's famous example, from 1957.) Every word fits its grammatical slot, the structure is correct — and the sentence means nothing. The syntax is fine; the semantics fail.

A sentence can also be syntactically broken but semantically clear: *Me hungry give food please.* You probably understood that. The syntax is wrong (subject-verb agreement, articles, etc.) but the meaning came through.

Programming languages have the same dual structure. A piece of code can be syntactically valid (parses fine) but semantically wrong (does the wrong thing). Or it can be syntactically broken (won't parse) but conceptually clear in your head. Distinguishing these two failures is one of the most important skills a programmer develops.

</Section>

<Section label="Python's syntax — the rules of grammar">

Python's syntax is the set of rules that say which sequences of characters are valid Python code. These rules are surprisingly small. Some examples:

- A statement ends at the end of a line, unless it's continued with a backslash or it's inside parentheses.
- An indented block follows a colon: `if x:`, `while x:`, `def f():`, `for x in y:`, etc. The block ends when indentation returns to the previous level.
- Strings are delimited by `"..."` or `'...'`. (Triple-quoted strings `"""..."""` allow multiline.)
- Function calls use parentheses: `f(x, y)`.
- Subscripts use square brackets: `lst[0]`, `d["key"]`.
- Comments start with `#` and run to the end of the line.

When you violate one of these rules, the interpreter raises a `SyntaxError` and refuses to run any of the code in the file. This is harsh but useful: you find the typo immediately rather than discovering it at runtime.

</Section>

<EtymologyCard
  term="syntax"
  origin="Greek"
  rootForm="syntaxis"
  rootMeaning="arrangement together"
  story="From the Greek 'sun' (together) plus 'taxis' (arrangement). Originally a military term for the disposition of troops — the arrangement of units on a battlefield. The grammatical sense came in late antiquity, applied to the way words are arranged into phrases and clauses. When computer scientists in the 1950s and 1960s needed terminology for the formal grammar of programming languages, they adopted 'syntax' directly from linguistics. The notion of *generative grammar* (Chomsky, 1957) — that a small set of rules can produce all and only the valid sentences of a language — is the conceptual foundation of programming-language design too."
  entryToComputing="Backus-Naur Form (BNF), a notation for describing programming-language syntax, was introduced for the description of Algol-58 in 1959. Modern languages still use variants of BNF in their reference manuals."
  insight="When someone says 'this code has a syntax error,' they're using the linguistic term precisely: the *arrangement* is wrong. Whether the code would have meant anything once parsed is a separate question — it has to parse first."
/>

<Section label="Common syntax errors and how to read them">

Let's look at three syntax errors you'll meet often. Run each one and read the error before moving on.

<CodeRunner
  initial={`# This has a missing colon.

if 5 > 3
    print("yes")`}
  caption="The error message will be a SyntaxError. Read it carefully — Python is telling you what's wrong and where."
/>

The error you see is something like:

```
File "<exec>", line 3
    if 5 > 3
            ^
SyntaxError: expected ':'
```

Python read your line and got to the end without finding the `:` it needed. The little caret `^` points at where Python noticed the problem. The fix is to add a colon: `if 5 > 3:`.

<CodeRunner
  initial={`# This has unbalanced parentheses.

print("the answer is", 42`}
  caption="Another SyntaxError. This one is about parens."
/>

```
File "<exec>", line 3
    print("the answer is", 42
                                ^
SyntaxError: '(' was never closed
```

Python opened a paren at the start of `print(` and reached the end of input without ever seeing the closing `)`. The fix is to close it: `print("the answer is", 42)`.

<CodeRunner
  initial={`# This has a tab/space mixing problem,
# or inconsistent indentation.

if True:
    print("first")
       print("second indent off")`}
  caption="The error here is IndentationError. Python is fussy about consistent indentation."
/>

```
File "<exec>", line 6
    print("second indent off")
IndentationError: unexpected indent
```

The second print is indented further than the first, but they should be at the same level if they're meant to be in the same block. Or it should be at a lower level if it's meant to be outside the block. Python doesn't know which you wanted, so it refuses.

These three (missing colon, unbalanced punctuation, indentation problems) account for the vast majority of syntax errors you'll hit in your first weeks. Each one has a clear fix once you read the message.

</Section>

<Section label="Semantics — what the code means">

Semantics is the *meaning* of code that's syntactically valid. Two pieces of code can have identical syntax and different semantics, depending on context.

Consider:

```python
x = 5
y = 5
```

vs:

```python
x = "5"
y = "5"
```

Both are syntactically the same shape — assignment statements. But the meaning is different: in the first case, `x` and `y` are integers and you can do arithmetic on them. In the second, they're strings and you can't (without converting first).

Or consider:

```python
print(2 + 3)        # adds: prints 5
print("2" + "3")    # concatenates: prints 23
```

The same operator (`+`) means different things depending on its operands. Both calls are syntactically valid; their semantics differ.

Semantic mistakes are *runtime errors* (when the meaning crashes) or *logic errors* (when the meaning is wrong but doesn't crash — the program runs to completion but produces the wrong answer). The latter is the harder kind.

</Section>

<Section label="The semantics-without-syntax test">

Here's a trick. When you're confused about a piece of code, separate the two questions:

1. **Does this parse?** — Is the syntax correct?
2. **Does it mean what I think it means?** — Are the semantics what I expect?

Often a beginner stares at code that doesn't run and assumes the problem is logical when it's actually a typo. Or vice versa: assumes the syntax is fine but the logic is wrong, when really the program is silently doing what they wrote, not what they meant.

The way to disentangle: run it. If it raises a `SyntaxError`, the syntax is broken — fix the typo. If it runs but does the wrong thing, the semantics are off — re-think the logic. Two failure modes, two diagnostic moves.

</Section>

<Callout kind="info" title="Logic errors are the worst kind">

A program with a logic error runs perfectly. It doesn't crash. It doesn't tell you anything is wrong. It just does the wrong thing. This is the kind of bug that shows up in production after the customer has been using your software for a week and discovers the totals are off by one.

The tools for catching logic errors are different from tools for catching syntax errors:

- **Tests.** Write code that calls your code and checks the output is what you expected. We'll cover testing in Volume 9.
- **Type hints and mypy.** Catch some logic errors at "type-check time" before they run.
- **Code review.** Have another human read your code.
- **Logging.** Add print statements (or use the `logging` module) to see what's happening at runtime.

For now, just know: syntax errors are loud, logic errors are quiet. When something feels off but the code runs, don't assume "no error means correct." Verify that the output is what you expected.

</Callout>

<Exercise
  title="Two errors, two kinds"
  prompt="Below are two programs. The first has a syntax error. The second has a logic error (it parses and runs, but produces the wrong answer). Fix both. The desired outputs are 10 and 30."
  starter={`# Program 1: SyntaxError. Make it print 10.
print(7 + 3

# Program 2: Logic error. The intent is to print 30.
# But the math is wrong.
print(2 + 3 * 5)`}
  expected={`10
30`}
  hints={[
    "Program 1: The print() call is missing its closing parenthesis.",
    "Program 2: Operator precedence! Python computes `3 * 5` first, then adds 2. To get 30, you need to add first, then multiply. Use parentheses: `(2 + 3) * 5 = 25`. Wait — that's 25, not 30. Recompute: 5 * 6 = 30. So you actually want different numbers, or use addition: `2 + 3 + ... `. Easiest fix: change to `(2 + 4) * 5 = 30` or `5 * 6`."
  ]}
  solution={`# Program 1: closed paren.
print(7 + 3)

# Program 2: parens force the addition first; with values that work.
print(5 * 6)`}
/>

<Section label="One last distinction: source code, parsed code, executed code">

There are three levels of "your code" worth distinguishing:

1. **Source code.** The text in the file (or in the editor). Just characters.
2. **Parsed code.** The structured tree (AST) that the parser produces from your source.
3. **Executed code.** What the interpreter actually does when running the AST.

Syntax errors live at level 1→2 (the parser can't build a tree from your source). Semantic errors and runtime errors live at level 2→3 (the tree was built but executing it goes wrong).

This is why a syntax error is "all-or-nothing" — if the parser can't build a tree, none of your program runs. A runtime error, by contrast, only happens when execution actually reaches the bad line. A logic error doesn't error at all; the tree builds, the execution completes, and the result just isn't what you wanted.

We'll see all three in the lessons ahead.

</Section>

<InterviewPhrase setup="If asked 'what's the difference between a syntax error and a runtime error,' something like this works.">

A syntax error is a violation of the language's grammar — the parser can't build a valid AST from the source code, so the program can't run at all. A runtime error happens during execution: the code parses fine, but when the interpreter actually runs the offending statement, something goes wrong (a name isn't defined, a list index is out of range, a type doesn't support the operation). The distinguishing feature is timing: syntax errors are caught up front before any execution; runtime errors only surface when the bad code path is actually traversed.

</InterviewPhrase>

<Connection
  back={[{ id: '01-6-the-repl', title: 'The REPL — A Conversation with the Interpreter' }]}
  forward={[{ id: '01-8-your-first-program', title: 'Your First Real Python Program' }]}
>

Next: we write a complete Python program from scratch — every character explained, every choice motivated. After that, more lessons on the structure of Python: comments, whitespace, the structure of a script.

</Connection>
