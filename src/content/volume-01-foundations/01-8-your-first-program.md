---
id: 01-8-your-first-program
volume: volume-01-foundations
chapter: 2
number: 8
title: "Your First Real Python Program"
subtitle: "Every character explained. Every choice motivated."
estimatedMinutes: 14
prerequisites: [01-7-syntax-and-semantics]
keyTerms: [function, argument, string, literal]
exerciseCount: 2
checkpoint: false
tags: [practice, theory]
---

<Section label="The Opening">

We're going to write a Python program from scratch — small, complete, useful in a tiny way. By the time we're done, you'll be able to defend every character on every line.

The program is a personalized greeter. It will ask the user for their name (well — we'll simulate that, since our in-browser Python doesn't easily handle real input) and then print a message. Six lines of code. We'll spend a thousand words on them, because that's the rate of compression we want at this stage.

</Section>

<Section label="The full program, all at once">

Here it is. Read it once, then we'll dissect it.

<CodeRunner
  initial={`# A personalized greeter.

name = "Ryan"
greeting = "hello, " + name + "!"
print(greeting)
print("welcome to Python.")`}
  expected={`hello, Ryan!
welcome to Python.`}
  caption="Run this. You should see two lines of output. Now we'll go through every line."
/>

When you ran it, you saw:

```
hello, Ryan!
welcome to Python.
```

Six lines of code (one of them is blank, one is a comment). Two lines of output. Let's take it apart.

</Section>

<Section label="Line 1: The comment">

```python
# A personalized greeter.
```

The `#` character is the *comment marker*. Everything from `#` to the end of the line is a comment, ignored by the Python interpreter. Comments are for humans. They explain what the code is doing or why.

This particular comment is the first line of our program. It serves as a kind of title — telling someone reading the file what this program is for.

A few conventions about comments:

- Use `#` (single character) followed by a space, then the comment text.
- Capitalize the first word, end with a period — treat comments as English sentences. (This is style, not a requirement; the interpreter ignores comments completely.)
- Don't comment what the code already obviously says. The comment `# add 1 to x` above `x = x + 1` is noise. The comment `# fix off-by-one bug — the previous version started counting at 0 not 1` is information.
- Update comments when you change the code. Stale comments are worse than no comments.

We'll write more comments as we go. For this small program, one is enough.

</Section>

<Section label="Line 2: A blank line">

The blank line between the comment and the rest of the code is *intentional whitespace*. Python doesn't require it, but humans appreciate it. Blank lines visually separate logical groups within a file. We'll see this convention reinforced as we read more code.

</Section>

<Section label="Line 3: The first assignment">

```python
name = "Ryan"
```

This is a *statement* — specifically, an *assignment statement*. It says: "Take the value on the right-hand side of the `=` sign, and bind it to the name on the left-hand side."

Reading it character by character:

- `name` — this is a *name* (also called an *identifier*) we're choosing. We could have used `n`, or `user_name`, or `the_name_of_the_person`. The name is purely for our convenience as humans. Python doesn't care what it is, as long as it follows naming rules (starts with a letter or underscore, contains only letters/digits/underscores, isn't a reserved word).
- ` ` — a space. Python ignores spaces around operators. The space is for readability.
- `=` — the *assignment operator*. It is read "is assigned to" or "becomes." This is *not* the same as `==` (which we'll see later — that's the equality comparison).
- ` ` — another space.
- `"Ryan"` — a *string literal*. The quotation marks tell Python "this is a string of text." Inside the quotes, every character is literal text. Without the quotes, Python would think `Ryan` was a name (an identifier), and would look it up — and find that no such name exists, raising a `NameError`.

After this statement runs, the name `name` exists in the program's namespace, and it points to the string value `"Ryan"`. From this point forward in the program, anywhere we use `name`, Python will substitute in the string `"Ryan"`.

</Section>

<EtymologyCard
  term="literal"
  origin="Latin"
  rootForm="litteralis"
  rootMeaning="of letters"
  story="From Latin 'litteralis,' from 'littera' (letter). Originally meant 'pertaining to letters,' as in 'a literal translation' (one that follows the letters of the original). In programming, a 'literal' is a value written directly in the source code — the text of the value is, literally, the value. A 'string literal' is a string written between quotes. An 'integer literal' is a number written as digits. The literal is the value as it appears, before any computation."
  entryToComputing="The term entered programming-language theory in the early 1960s and is now standard. When someone says 'string literal' or 'integer literal' or 'list literal,' they mean a hand-written value in source code — the literal form, as opposed to a computed form."
  insight="Why have the term at all? Because some values appear in code directly (literals), and others are computed (`x + 1`, `len(lst)`). The distinction matters when discussing optimization, parsing, and semantics. A literal can be inlined; a computed expression must be evaluated."
/>

<Section label="Line 4: String concatenation and a second assignment">

```python
greeting = "hello, " + name + "!"
```

Another assignment statement. This one is more interesting because the right-hand side is an *expression* with multiple parts.

Reading it:

- `greeting` — the name we're assigning to. It doesn't exist yet (this line creates it).
- `=` — assignment operator.
- `"hello, "` — a string literal. Note the trailing space inside the quotes — that space will be part of the string.
- `+` — the *concatenation operator* when both operands are strings. (When both operands are numbers, it's addition. The same operator means different things based on its operand types — that's *operator overloading* — and we'll see more of it later.)
- `name` — a *variable reference*. Python looks up the value bound to `name`, which is `"Ryan"`.
- `+` — concatenation again.
- `"!"` — a string literal containing a single character, the exclamation mark.

So the right-hand side evaluates to `"hello, " + "Ryan" + "!"` which equals `"hello, Ryan!"`. That string is then assigned to the name `greeting`.

Notice how concatenation works: it just glues strings together end to end, no spaces added unless you put them in the literals. That's why I wrote `"hello, "` (with a trailing space and comma) and `"!"` — to control the spacing precisely.

</Section>

<Section label="Line 5: The first print">

```python
print(greeting)
```

This is a *function call*. We're calling the built-in function `print` with one argument.

Reading it:

- `print` — the name of the function. It's built into Python, available everywhere.
- `(` — opening parenthesis. Function calls use parentheses to delimit their arguments.
- `greeting` — the argument. Python looks up the value bound to `greeting`, which is `"hello, Ryan!"`. That string is passed to the function.
- `)` — closing parenthesis.

The `print` function's job is to take its arguments and write them to *standard output* — which in our case is the panel below the editor. The function returns `None` (a special "no value" value we'll see in detail in Volume 2), but we don't capture the return value — we just call the function for its *side effect* of printing.

After this line, you've seen `hello, Ryan!` appear in the output.

</Section>

<EtymologyCard
  term="function"
  origin="Latin"
  rootForm="functio"
  rootMeaning="performance, execution"
  story="From Latin 'functio' (a performing, an execution), from 'fungi' (to perform). Originally meant 'the action of performing' — a function in the sense of a duty or office. In mathematics, the term was adapted by the 17th century to mean a relationship that maps inputs to outputs, after Leibniz. Programming inherited the mathematical sense: a function is a named procedure that takes inputs and produces an output. Python's functions are even more general — they can do work (side effects) in addition to producing a return value."
  entryToComputing="Subroutines (programming functions in early languages) appeared with the EDSAC computer in 1949. The mathematical term 'function' was applied to them naturally because they mapped inputs to outputs. By Fortran (1957), 'function' was the standard term."
  insight="The Latin root *functio* — 'performance' — is a useful image. When you call a function, you're asking it to *perform* its action. The function is an actor; the call is the cue to perform."
/>

<EtymologyCard
  term="argument"
  origin="Latin"
  rootForm="argumentum"
  rootMeaning="evidence, proof, the substance of an argument"
  story="From Latin 'argumentum,' from 'arguere' (to make clear, to prove). The original sense was 'evidence' or 'proof.' In rhetoric and law, the 'arguments' were the points you made to prove your case. The mathematical sense — 'an input to a function' — appeared in the 1700s, treating the function's inputs as the 'evidence' you were giving it. Programming inherited this sense directly."
  entryToComputing="By Fortran in 1957, function arguments were standard terminology. The contrast with 'parameter' is technical: a parameter is the named slot in the function definition; an argument is the actual value passed when the function is called. Both terms are used loosely in casual conversation, but precise speakers maintain the distinction."
  insight="When someone says 'the function takes three arguments,' they mean three values are passed in. When they say 'the function has three parameters,' they mean the function's signature has three named slots. The difference is the difference between 'who gets called' (parameters) and 'who shows up' (arguments)."
/>

<Section label="Line 6: The second print">

```python
print("welcome to Python.")
```

Same shape as line 5 — a call to `print` — but with a string literal as the argument instead of a variable. The function prints the literal text directly.

This line is independent of `name` and `greeting`. It would print the same thing regardless of what name was assigned earlier.

</Section>

<Section label="The whole program, in one breath">

Now read the whole program again, and try to read it as one sentence:

> *We define a name. We construct a greeting using that name. We print the greeting. We print a closing message.*

Six lines, four conceptual operations. The fact that we can describe the program in one English sentence is by design — the Python team's goal is *readable* code, and this little program achieves it.

You've now seen, with full understanding:

- Comments (`#`)
- String literals (`"..."`)
- Assignment statements (`name = "Ryan"`)
- Variables (the names we assign to)
- Operators (`=`, `+`)
- Function calls (`print(...)`)
- Standard output (where `print` writes)

This is more Python than you may have realized. The next lesson formalizes some of this and adds the `input()` function, so we can make the greeter actually ask for a name.

</Section>

<Exercise
  title="Customize the greeter"
  prompt="Modify the program so it greets *you* by name and prints an extra line saying what year it is. The output should be three lines: 'hello, [your name]!', 'welcome to Python.', and 'the year is 2026.'"
  starter={`# Customize this for yourself.

name = "Ryan"
greeting = "hello, " + name + "!"
print(greeting)
print("welcome to Python.")
# Add a third print here.`}
  expected={`hello, Ryan!
welcome to Python.
the year is 2026.`}
  hints={[
    "Add one more print line at the bottom: print(\"the year is 2026.\").",
    "If you change name to your own name, the first line of output will change. The expected output above uses 'Ryan' — match it for the exercise to pass."
  ]}
  solution={`name = "Ryan"
greeting = "hello, " + name + "!"
print(greeting)
print("welcome to Python.")
print("the year is 2026.")`}
/>

<Exercise
  title="Use a number, then convert it"
  prompt="Define a variable `year` with the integer value `2026`. Then build a greeting like `Hello in 2026!` and print it. The trick: you can't directly add a string and an integer with `+`. Convert the integer to a string using `str()`."
  starter={`year = 2026
# Build a string like "Hello in 2026!" and print it.
# Use str(year) to convert the int to a string.

greeting = ___
print(greeting)`}
  expected="Hello in 2026!"
  hints={[
    "The expression you want is `\"Hello in \" + str(year) + \"!\"`.",
    "If you write `\"Hello in \" + year + \"!\"` without `str()`, you'll get a TypeError because Python can't concatenate a string and an integer."
  ]}
  solution={`year = 2026
greeting = "Hello in " + str(year) + "!"
print(greeting)`}
/>

<Section label="What you can already do">

After this lesson, you can:

- Read a small Python program and describe what each line does.
- Define string variables with assignment statements.
- Concatenate strings using `+`.
- Convert an integer to a string with `str()`.
- Print to standard output with `print()`.
- Recognize and use comments.

This isn't trivial. You've crossed the line from "I've seen Python" to "I can write Python." The line in front of you is now bigger — but you're across the first one.

</Section>

<FDEConnection>

Six lines of code is a tiny program, but the *style* is the same style production engineers use. Every line has a purpose. Comments explain intent. Variables have meaningful names. The flow reads top to bottom in one direction.

When you eventually read NinjaToolKit code or any production Python, you'll notice this same shape — clear assignment, clear concatenation, clear function calls. Production programs are bigger versions of small programs. Your six-line greeter and a 60K-line audit platform share the same DNA.

</FDEConnection>

<Connection
  back={[{ id: '01-7-syntax-and-semantics', title: 'Syntax and Semantics' }]}
  forward={[{ id: '01-9-comments-and-docstrings', title: 'Comments, Docstrings, and Talking to Future You' }]}
>

Next: a closer look at comments and Python's special `"""docstrings"""`. Why we comment, when we comment, and how to write comments that actually help.

</Connection>
