---
id: 00-7-the-mistakes-that-help
volume: volume-00-welcome
chapter: 1
number: 7
title: "The Mistakes That Help"
subtitle: "How to be friends with your own broken code."
estimatedMinutes: 11
prerequisites: [00-6-fde-mindset]
keyTerms: []
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

You're going to break your code. Hundreds, maybe thousands of times before this curriculum is over. You're going to type something you think is right, press *run*, and see a wall of red text. This will happen frequently, especially at first.

I want to spend a lesson on this *before* we hit any of the breakage, because how you respond to errors is the single biggest determinant of how much you'll get out of programming. Some people see a red error and feel attacked. They close the window. They go do something else. Other people see the same error and feel a small click of curiosity — *what's it telling me?* — and read the message. The second group becomes programmers. The first group doesn't. The difference is purely psychological. You're going to be in the second group, and this lesson is the part where I help you get there.

</Section>

<Section label="Errors are messages, not punishments">

Here's the deepest reframe I can offer. An error is not the computer being mean. An error is the computer trying to *help* you. The runtime ran into a situation it didn't know how to handle, and instead of silently doing the wrong thing, it stopped, gathered everything it knew about the problem, and printed it out for you. This is a kindness. The truly bad outcome is when a program does something wrong silently and doesn't tell you.

Older languages were not always kind in this way. C, in particular, has a notorious habit of producing nonsense rather than errors when you misuse it — a tradition that has cost the world countless billions of dollars in security flaws. Python is friendlier. When something goes wrong, Python tells you. The text is sometimes alarming, but it's information.

Your job, when you see an error, is to read it.

</Section>

<Section label="Anatomy of a Python error">

Let's trigger an error on purpose so we can examine its parts. Run this:

<CodeRunner
  initial={`# This is broken on purpose.

def greet(name):
    print("hello, " + name)

greet(42)`}
  caption="When you run this, you'll see a red error message. Read it carefully before continuing."
/>

The error you see has a particular shape. Let's take it apart.

```
Traceback (most recent call last):
  File "<exec>", line 6, in <module>
    greet(42)
  File "<exec>", line 4, in greet
    print("hello, " + name)
TypeError: can only concatenate str (not "int") to str
```

The first line — *Traceback (most recent call last)* — is announcing that what follows is a *traceback*. A traceback is a stack of function calls leading up to the place the error happened. Reading bottom to top is sometimes most useful, because the bottom line tells you what kind of error it was.

The bottom line says `TypeError: can only concatenate str (not "int") to str`. Translation: "I tried to put two things together with `+`, but one of them was a string and the other was an integer, and I don't know how to do that."

Working backward through the traceback, you can trace the path: it happened on line 4, inside the function `greet`, when we tried `"hello, " + name`. We can see why: when the function was *called* on line 6, we passed it `42` (an integer), not a string. Inside the function, `name` was 42, and `"hello, " + 42` doesn't make sense to Python.

This whole thing is a tiny detective story, and you have all the clues. The fix is either to call `greet("Ryan")` instead of `greet(42)`, or to convert the number to a string inside the function. We'll come back to both options later. For now, the point is just *the error told you exactly what the problem was, and where it was, and what code triggered it*.

</Section>

<Callout kind="tip" title="A reading order that works">

When a traceback is long and intimidating, the move is:

1. **Skip to the bottom line first.** That's the actual error type and message. Read it.
2. **Find the first line of the traceback that's *your* code** (not a library's code). That's the most useful place to look. The lines above it are usually framework or library code; the lines below it are your code. Errors are easiest to fix in your own code first.
3. **Read the message as a sentence**, not a glob of jargon. `NameError: name 'x' is not defined` is just the computer saying, "you used a name I don't know."

</Callout>

<Section label="Errors you'll meet often">

Here are the four or five errors you'll see most in the first weeks. They all read like riddles the first time, and like old friends after the tenth.

- **`SyntaxError`** — Python couldn't parse your code at all. Usually a missing colon, a missing close-paren, or a typo in a keyword. The error often points one line *after* where the actual problem is, because Python kept reading hoping it'd make sense.
- **`NameError`** — You used a name (a variable or function) that Python has never seen. Usually a typo, or you forgot to define the variable, or you defined it inside a function and tried to use it outside.
- **`TypeError`** — You did something to a value of the wrong type. The example above is one. Another common one: trying to call something that isn't a function (`5()` doesn't work).
- **`IndexError`** — You tried to read past the end of a list. `[1, 2, 3][7]` raises this.
- **`KeyError`** — You tried to read a dictionary key that doesn't exist.
- **`AttributeError`** — You tried to access an attribute or method that the object doesn't have. For example, `"hello".puffin` (the string type doesn't have a `.puffin` method).
- **`IndentationError`** — Your indentation isn't consistent or expected. Python is strict about this.

There are dozens of others. Each one is a sentence describing what went wrong. We'll meet them throughout the curriculum.

</Section>

<Section label="The first habit: read the message">

The single most important habit is also the simplest. When you see an error, *read the message*. All of it. Out loud if you have to. Don't skim. Don't immediately google it. Read the actual sentence the runtime is telling you.

In about 80% of cases, the message will tell you exactly what's wrong. In another 15%, the message will tell you something close enough that you can spot the actual issue from context. In maybe 5%, the message is genuinely confusing and you need help. Most beginners assume they're always in the 5% case, and they aren't.

Try this one. Read the error before doing anything else.

<Exercise
  title="Practice reading an error"
  prompt="The code below has an error. Run it. Read the error message carefully — don't fix anything yet, just read. After you've read it, fix the bug and run it again. The output should be `the answer is 42`."
  starter={`answer = 42
print("the answer is " + answer)`}
  expected="the answer is 42"
  hints={[
    "The error says 'can only concatenate str (not \"int\") to str.' Translation: you tried to glue a string and a number together with `+`.",
    "There are two ways to fix this. Either turn the number into a string, or use a different way to combine them. The simplest fix uses `str()` to convert: `str(answer)`.",
    "Replace `answer` in the print line with `str(answer)`."
  ]}
  solution={`answer = 42
print("the answer is " + str(answer))`}
/>

</Section>

<Section label="The second habit: simplify until it works, then re-complicate">

When something is broken and you can't see why, the move is to *simplify*. Comment out lines until the program runs at all. Then re-add lines one by one until it breaks again. The line you re-added is where the bug is. This is sometimes called *bisection* — like a search.

Example: you have a 30-line program and somewhere it's failing. Don't stare at all 30 lines. Comment out lines 16-30 and run. Does it work now? Re-enable 16-23. Still works? Then the bug is in 24-30. Bisect again.

This is unromantic but unfailingly effective. Senior engineers use it daily.

</Section>

<Section label="The third habit: ask the small question, not the big one">

When you ask for help — from a coworker, from a chat, from this app — the question that gets useful answers is small and specific. Not "my code doesn't work, can you help?" But "I'm getting a `TypeError` on line 14 of my function. Here's the code, here's the input, here's the message. What am I missing?"

The smaller and more specific the question, the faster and better the answer. This is true of human helpers and AI helpers equally. We'll talk later in Volume 11 about how to ask AI for coding help in ways that get useful results — there's a whole craft to it.

</Section>

<Exercise
  title="Bisection in miniature"
  prompt="The code below has a bug somewhere. Run it once to see the error. Then comment out lines (use a `#` at the start of a line to comment) one at a time to find the offending line. Once you've found it, fix the bug. The intended output is `done`."
  starter={`x = 1
y = 2
z = "3"
total = x + y + z
print("done")`}
  expected="done"
  hints={[
    "If you comment out the line `total = x + y + z`, the program runs to completion. So the bug is on that line.",
    "The bug: `z` is a string, not a number. You can't add a string to integers without converting.",
    "Either change `z = \"3\"` to `z = 3`, or change the math to `total = x + y + int(z)`."
  ]}
  solution={`x = 1
y = 2
z = 3
total = x + y + z
print("done")`}
/>

<Section label="One last thing">

I want you to keep something in mind for the next year: **every error message you encounter is teaching you something specific**. The first time you see a `TypeError` it feels like an obstacle. The hundredth time, it feels like an old friend whose handwriting you recognize. The journey from "obstacle" to "old friend" happens automatically if you read the messages and don't avoid them.

The fastest way through pain is through. The slowest way is around. Reading errors is "through." Closing the laptop and feeling bad is "around."

You're going to do the through. I have full confidence.

</Section>

<Connection
  back={[{ id: '00-6-fde-mindset', title: 'The Forward Deployed Mindset' }]}
  forward={[{ id: '00-8-the-pact', title: 'The Pact' }]}
>

One more orientation lesson — a short one — and then Volume 1 begins.

</Connection>
