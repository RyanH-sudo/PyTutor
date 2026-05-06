---
id: 01-6-the-repl
volume: volume-01-foundations
chapter: 2
number: 6
title: "The REPL — A Conversation with the Interpreter"
subtitle: "Read, evaluate, print, loop. The fundamental learning loop."
estimatedMinutes: 11
prerequisites: [01-5-meet-python]
keyTerms: [repl, interpreter]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

The single most useful tool a Python learner has is called the *REPL*. The acronym stands for **R**ead, **E**valuate, **P**rint, **L**oop, and it describes exactly what the tool does. You type a piece of Python code; the interpreter reads it, evaluates it (figures out the result), prints the result, and loops back to wait for your next input.

A REPL is, fundamentally, a conversation. You ask the interpreter "what is 2 + 2" and it tells you. You ask "what's in this list" and it shows you. You ask "what does this function return when I pass it these values" and it answers. The conversation is the fastest way to learn a language, because every question gets an immediate, honest answer.

Every language we'd call modern has a REPL or something like one. Python's is excellent. We're going to use it constantly.

</Section>

<EtymologyCard
  term="REPL"
  origin="Acronym"
  rootForm="Read-Eval-Print Loop"
  rootMeaning="a conversation with an interpreter"
  story="The acronym REPL was popularized in the Lisp community in the 1960s. Lisp's interactive interpreter was one of its defining features — you'd type an expression, the interpreter would parse and evaluate it, print the result, and prompt for the next one. The acronym describes the loop: Read input, Evaluate it, Print the result, Loop back. Python adopted both the loop and the term. Later languages (Ruby, JavaScript, R, Julia, Scala) all built REPLs, all using the same word."
  entryToComputing="REPL is now the generic term for any interactive language interpreter. Python's standard REPL, IPython, the Jupyter notebook kernel, the browser console for JavaScript, irb for Ruby — all are REPLs."
  insight="The 'loop' part of the name matters. A REPL is not a one-shot evaluator; it's a continuous loop where each evaluation can build on the previous one. State persists. You define a variable; the next prompt remembers it. This persistence is what makes REPLs powerful for learning."
/>

<Section label="The four steps, slowly">

Let's break apart what happens when you type a line into a REPL and press Enter.

1. **Read.** The interpreter reads the text you typed. It knows what character set you're using. It collects characters until you press Enter.

2. **Parse.** (This step is sometimes folded into "Read" but it's distinct.) The interpreter takes the raw text and figures out the *structure*. Is this an expression like `2 + 2`? Is it a statement like `x = 5`? Is it a function call? The parser turns the linear stream of characters into a structured tree (called an AST — Abstract Syntax Tree) that represents what the code means.

3. **Evaluate.** The interpreter executes the parsed code. If it was an expression, the interpreter computes the value. If it was a statement, the interpreter performs the action (assigns a variable, calls a function, etc.).

4. **Print.** The interpreter shows the result. For expressions, this is the computed value. For statements that don't produce a value (like assignments), the REPL shows nothing — the action happened, there's no value to print.

5. **Loop.** Back to step 1, ready for the next input.

This loop is happening every single time you type something into the editor in this app. Pyodide (the Python interpreter running in your browser) is, conceptually, a REPL — though the editor here lets you type multi-line programs at once before pressing Run.

</Section>

<Section label="Try it">

The CodeRunner blocks in this curriculum behave like a slightly fancier REPL. You can type multiple lines, press Run, and see the output of all the lines at once. Internally, each Run is one round of read-evaluate-print.

Let's do a small conversation with Python.

<CodeRunner
  initial={`# Python, what is 2 plus 2?
print(2 + 2)

# Python, what is 17 times 23?
print(17 * 23)

# Python, what is 2 to the 10th power?
print(2 ** 10)

# Python, what is the integer division of 17 by 5?
print(17 // 5)

# Python, what is the remainder when 17 is divided by 5?
print(17 % 5)`}
  caption="Five questions, five answers. Read each one and notice the operator (the symbol). Each one is asking Python to compute something."
/>

You should see:

```
4
391
1024
3
2
```

Each line of output is the answer to the question on the corresponding line. We just had a conversation with the interpreter.

There's something to notice here that we're going to come back to often: the *operators* — the symbols `+`, `*`, `**`, `//`, `%` — each have a meaning. They are *symbols that perform an action on values*. Plus is addition. Star is multiplication. Two stars is exponentiation. Two slashes is integer division (drop the fractional part). Percent is the remainder, also called *modulo*.

</Section>

<Section label="Expressions vs statements">

There's a small but important distinction between an *expression* and a *statement*. An expression is a piece of code that evaluates to a value. A statement is a piece of code that performs an action.

`2 + 2` is an expression. It evaluates to `4`.
`x = 5` is a statement. It assigns the value `5` to the name `x`. The statement doesn't have a value of its own.

`print(2 + 2)` is a function call, which is an expression — it returns a value (in this case, `None`, because `print` doesn't return anything useful) — but its main job is the *side effect* of printing to the screen.

In a REPL, when you type just `2 + 2` (no `print`) and press Enter, the REPL automatically prints the result for you. When you type `x = 5`, the REPL doesn't print anything because the statement doesn't have a value.

Try it.

<CodeRunner
  initial={`# A pure expression.
2 + 2

# An assignment statement.
x = 5

# Reading a variable is an expression.
x`}
  caption="In a real interactive REPL, typing 2+2 alone prints 4. But our editor doesn't auto-print bare expressions — it only prints what print() outputs. So this code shows nothing! You'd need print(2+2) and print(x). The distinction between 'doing' and 'showing' is real."
/>

When you ran that, *nothing got printed*. That's because the editor here only shows what `print()` writes to standard output. In a true REPL, the bare expression `2 + 2` would auto-print `4`, and `x` on its own line would auto-print `5`. The CodeRunner here is a slightly different experience — it executes Python like a script, not like an interactive session.

The distinction we're learning matters: *expressions evaluate to values; statements perform actions*. Some statements are also expressions (function calls); some are not (assignments).

</Section>

<Exercise
  title="Make Python show you something"
  prompt="Modify the code so it prints `the answer is 42`. The trick: there are several Python operators that produce 42 from small numbers, but the simplest is to compute 6 times 7. Use `print()` to show the answer."
  starter={`# Modify this so it prints "the answer is 42"
# Hint: 6 * 7 = 42

print("the answer is", ___)`}
  expected="the answer is 42"
  hints={[
    "Replace the `___` with `6 * 7`. Python will compute the multiplication first, then `print()` shows the string and the number together.",
    "Note that print() takes multiple arguments separated by commas — it places a space between them automatically. So `print('hello', 'world')` outputs `hello world`."
  ]}
  solution={`print("the answer is", 6 * 7)`}
/>

<Section label="Why the REPL matters for learning">

I want to highlight one thing about REPLs that often goes unsaid. *The REPL is the single best place to test a hypothesis about Python.*

When you read a piece of code and aren't sure what it does, the right move is to type it into a REPL and see. When a documentation page describes a function and you want to know how it behaves on weird input, the right move is to call it in a REPL. When a Stack Overflow answer says "this works" but you don't quite believe it, the right move is to paste it into a REPL.

Most of programming is uncertainty about what code does. The REPL converts uncertainty into knowledge in seconds. Use it.

In this app, every CodeRunner block is your REPL. Don't just run the code that's there — *modify it*. If a block prints `4`, change it to print `5`. Add a line. Try a different operator. The block isn't precious; you can always click *reset* to get the original back. The point is to develop the habit of *poking*. Asking "what if I changed this?" is the engine of learning.

</Section>

<Section label="The Python REPL outside this app">

For completeness: when you install Python on your own computer (Mac, Windows, Linux), you can open a terminal and just type `python3` — and you'll be in a real interactive Python REPL. Lines starting with `>>>` are the prompt. You type code, press Enter, see the result.

```
$ python3
Python 3.12.0 (...)
>>> 2 + 2
4
>>> x = 5
>>> x * 10
50
>>> exit()
$
```

When you eventually leave PyTutor and start writing real Python locally, this is the REPL you'll use. Or — even better — `ipython`, an enhanced REPL with syntax highlighting, tab completion, and richer error messages. We'll meet IPython in Volume 9.

</Section>

<Exercise
  title="Conversation practice"
  prompt="Have a conversation with Python. Print three things, in order: the result of 12345 times 67890, the integer part of 1000 divided by 7, and the message 'all done'."
  starter={`# Print three things on three lines.

print(...)  # 12345 * 67890
print(...)  # integer part of 1000/7 (use //)
print(...)  # the string "all done"`}
  expected={`838102050
142
all done`}
  hints={[
    "The `//` operator does integer division — it returns the integer part and discards the remainder.",
    "Replace each `...` with the right expression. For the first: `12345 * 67890`. For the second: `1000 // 7`. For the third: `'all done'`."
  ]}
  solution={`print(12345 * 67890)
print(1000 // 7)
print("all done")`}
/>

<Connection
  back={[{ id: '01-5-meet-python', title: 'Meet Python' }]}
  forward={[{ id: '01-7-syntax-and-semantics', title: 'Syntax and Semantics' }]}
>

Next: the difference between *syntax* (the grammar of the language) and *semantics* (what code means). Both matter. The distinction is where many beginner confusions come from.

</Connection>
