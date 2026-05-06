---
id: 01-9-comments-and-docstrings
volume: volume-01-foundations
chapter: 2
number: 9
title: "Comments, Docstrings, and Talking to Future You"
subtitle: "The most important code reader is yourself, three months from now."
estimatedMinutes: 10
prerequisites: [01-8-your-first-program]
keyTerms: []
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

There's an old programming saying: *the most important reader of your code is you, three months from now*. By then you've forgotten most of why you wrote it the way you did. The variable names that felt obvious now feel cryptic. The clever one-liner that made you proud is impenetrable. Future-you is, essentially, a stranger.

Comments and docstrings exist to help future-you. They are the only place to record the things the code itself can't say — the *why* behind the code, the alternatives that were considered, the constraints that shaped the choice. Code shows the *what*. Comments show the *why*.

This is a short lesson but an important one. Cultivating good comment habits early saves entire careers.

</Section>

<Section label="The two kinds of comment">

Python has two ways to leave notes for human readers:

1. **Hash comments.** Anything from `#` to the end of the line is ignored by the interpreter.
2. **Docstrings.** Triple-quoted strings at the start of a module, function, class, or method. Technically these are string literals, but Python treats them specially when placed as the first statement of a definition.

Both have their place. We'll see when each one fits.

</Section>

<Section label="Hash comments — the workhorse">

The hash comment is for short, inline explanations. Use it when you need to clarify a single line, group of lines, or section of code.

```python
# Read user data from disk.
user_data = load_user_data()

# The customer's CSV uses semicolons, not commas.
records = parse_csv(user_data, separator=";")

# Skip records older than 30 days.
fresh = filter_recent(records, days=30)
```

A few things to notice:

- Comments above their referent line, not after it. (`# Read user data from disk.` above the line, not at the end.) End-of-line comments are common in some communities, but PEP 8, Python's style guide, prefers comments above the line for anything more than a brief note.
- Comments use full sentences with capitalization and a period, treating English as English.
- Comments explain *why*, not *what*. The line `user_data = load_user_data()` already says it loads user data; the comment doesn't need to repeat that. A useful comment would say *why* we're loading it now, what we'll do with it, or what assumptions it depends on.

A common anti-pattern is the "translating-the-code" comment:

```python
# Bad: this comment adds nothing.
# Increment x by 1
x = x + 1
```

The code says `x = x + 1`. We don't need a comment to translate it. A useful comment, if there's anything to say, would be:

```python
# Good: explains why, not what.
# Compensate for the off-by-one in upstream IDs.
x = x + 1
```

The second version actually helps the reader. The first is noise.

</Section>

<Section label="Block comments — for the bigger 'why'">

When the explanation needs more than one line, use multiple hash-comment lines:

```python
# Calculate the customer's effective rate.
#
# This needs to handle three cases:
# 1. Standard pricing — the rate from the price book.
# 2. Custom pricing — the rate from the contract addendum.
# 3. Grandfathered pricing — the rate from the customer's
#    original contract, locked in at signing.
#
# Custom rates take precedence over grandfathered rates,
# which take precedence over standard. The order matters
# because some customers have all three configured.
rate = compute_effective_rate(customer)
```

This kind of comment is gold. It tells future-you (or future-Ryan) the *whole shape* of the problem, not just what the code does on this particular line. Block comments are appropriate before any non-trivial logic — usually before functions, classes, or significant code sections.

</Section>

<Section label="Docstrings — for documentation that travels with the code">

A docstring is a string literal placed as the first statement of a module, class, function, or method. Docstrings are different from hash comments in two ways:

1. They are stored as part of the object — Python keeps them around at runtime.
2. Tools (like `help()`, IDEs, documentation generators) read them automatically.

Triple-quoted strings (`"""..."""` or `'''...'''`) are the standard form because they can span multiple lines.

```python
def add(x, y):
    """Return the sum of two numbers.

    Args:
        x: The first number.
        y: The second number.

    Returns:
        The sum x + y.
    """
    return x + y
```

When you call `help(add)` in an interactive session, Python prints the docstring. When IDEs show you the documentation for a function as you type its name, they're reading the docstring. When you generate documentation with tools like Sphinx, it scrapes docstrings.

A few conventions:

- The first line is a single-sentence summary, ending with a period.
- A blank line separates the summary from the body.
- The body describes parameters, return values, exceptions raised, side effects, and usage examples.
- Use the present tense imperative: *"Return the sum"* not *"Returns the sum"*.

We'll use docstrings throughout this curriculum on every function we define. They're not just for big projects — even a small script benefits from a docstring on each function.

</Section>

<CodeRunner
  initial={`# Try defining a function with a docstring.

def greet(name):
    """Return a friendly greeting for the given name.

    Args:
        name: A string, the person's name.

    Returns:
        A greeting string.
    """
    return "hello, " + name + "!"

# The function's docstring is accessible at runtime:
print(greet.__doc__)

# And help() formats it nicely.
help(greet)`}
  caption="Run this. Notice that the docstring becomes part of the function — accessible at runtime, used by help()."
/>

<Section label="When to comment, when not to">

The most common bad comment habits, ranked from most-noisy to least:

1. **Translating the code.** `# add 1 to x` above `x = x + 1`. Adds nothing.
2. **Lying.** Comments that used to be true but no longer are, because the code changed and the comment didn't. Worse than no comment.
3. **Gloating.** "This is the elegant solution to a hard problem." Most readers don't care that you found it elegant. Either explain *why* it's elegant, or leave it out.
4. **Cargo-cult formality.** Boilerplate docstrings on trivial functions just because the style guide said to. If a function is self-explanatory, a one-line docstring is fine; a five-line one is overkill.

The good comment habits, ranked from most to least common:

1. **The "why" comment.** Why the code is shaped this way. What the alternative was and why it didn't work.
2. **The constraint comment.** "This must be in this order because the upstream system expects ascending IDs." Future-you might be tempted to reorder.
3. **The TODO comment.** "TODO: handle the case where the customer has multiple addresses." A flag that the code is incomplete, with a hint about what's missing.
4. **The link comment.** "See https://example.com/issue/12345 for context." Pointers to bug reports, design docs, or external references that explain the surrounding decisions.
5. **The decision comment.** "Chose recursion over iteration here because the data is naturally tree-shaped and the depth is bounded." Records the reasoning so it isn't lost.

</Section>

<Callout kind="warning" title="The most dangerous lie">

A *stale comment* — a comment that used to be true and now isn't — is worse than no comment. It lies to the reader. They trust it. They make decisions based on it. The decisions are wrong.

When you change code, *re-read every comment near the change* and update or delete the ones that are now wrong. This is a small habit that compounds enormously over the lifetime of a codebase.

</Callout>

<Exercise
  title="Add useful comments"
  prompt="The code below works correctly but has no explanation. Add comments that would help a future reader understand *why* the program does what it does. Then run it to confirm it still works (your comments shouldn't change the output)."
  starter={`name = "Ryan"
year = 2026
years_since_started = year - 1989
greeting = "Hello, " + name + "! Python turns " + str(years_since_started) + " this year."
print(greeting)`}
  expected="Hello, Ryan! Python turns 37 this year."
  hints={[
    "Comments should explain *why*, not just *what*. For example: '# Python first released by Guido van Rossum in 1989.' is more useful than '# subtract 1989 from year'.",
    "A short module-level comment at the top describing the program's purpose is also a good practice."
  ]}
  solution={`# A small program that computes Python's age and greets a user.

# The user's name. Hardcoded for now; we'll add input() next lesson.
name = "Ryan"

# The current year. We'll make this dynamic in a future version.
year = 2026

# Python was first released by Guido van Rossum in 1989.
years_since_started = year - 1989

# Build the greeting. We use str() to convert the integer to a string.
greeting = "Hello, " + name + "! Python turns " + str(years_since_started) + " this year."
print(greeting)`}
/>

<Section label="One last thing: comments vs. better code">

Sometimes the right answer to "should I add a comment?" is "no — make the code itself clearer." If you find yourself writing a comment to explain a confusing line, often the better move is to rewrite the line.

```python
# Confusing code that needs a comment to explain.
x = a * 0.0254  # convert inches to meters

# Better: rename so the comment isn't needed.
inches = a
meters = inches * 0.0254
```

The second version's variable names tell the story. No comment needed.

The principle: *clear code is the first defense; comments are the second*. Reach for comments when the code can't be made self-explanatory through naming alone — usually for explaining *why* you're doing something, or for surfacing constraints the code can't enforce.

This is a habit you'll develop slowly. Don't worry about it yet. Just notice when you write a comment that *the code didn't need*. Those are opportunities for a small refactor.

</Section>

<Connection
  back={[{ id: '01-8-your-first-program', title: 'Your First Real Python Program' }]}
  forward={[{ id: '01-10-input-and-the-conversation', title: 'Input and the Two-Way Conversation' }]}
>

Next: we add `input()` so the program can ask the user for their name and respond. The first true two-way conversation between your program and a person.

</Connection>
