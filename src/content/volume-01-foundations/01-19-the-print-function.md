---
id: 01-19-the-print-function
volume: volume-01-foundations
chapter: 4
number: 19
title: "The Print Function in Detail"
subtitle: "More than meets the eye. The options that make debugging easier."
estimatedMinutes: 9
prerequisites: [01-18-operators-and-precedence]
keyTerms: []
exerciseCount: 2
checkpoint: false
tags: [practice]
---

<Section label="The Opening">

`print()` is the most-used function in Python lessons. Most courses teach it once and move on. It actually has several options worth knowing — they make debugging easier and let you produce nicer output.

This is a short lesson covering: multiple arguments, the `sep` parameter, the `end` parameter, and printing objects directly.

</Section>

<Section label="Multiple arguments">

`print()` accepts any number of positional arguments. It prints them with spaces between them by default.

```python
print("hello", "world")             # hello world
print("a", "b", "c", "d")            # a b c d
print("Year:", 2026)                 # Year: 2026 (notice no need for str())
```

That last one is important: when you pass a non-string to `print()`, it converts it to a string for you. You don't need `str(2026)` — `print()` handles it automatically. This is why `print("Year:", 2026)` works but `print("Year: " + 2026)` errors.

The convenience extends to any type:

```python
print("name:", "Ryan", "age:", 37, "married:", True)
# name: Ryan age: 37 married: True
```

Whenever you're tempted to convert and concatenate, consider whether passing multiple arguments to `print()` would be cleaner.

</Section>

<Section label="The sep parameter">

By default, `print()` puts a space between arguments. You can change that with `sep=`:

```python
print("a", "b", "c", sep="-")        # a-b-c
print("a", "b", "c", sep="")          # abc — no separator
print("a", "b", "c", sep=", ")        # a, b, c
print("date:", 2026, 5, 4, sep="/")   # date:/2026/5/4 — note: sep is ALL pairs

# Common use: pretty-printing data.
print("Ryan", 37, "engineer", sep=" | ")    # Ryan | 37 | engineer
```

`sep` is a *keyword argument* — a parameter you specify by name. You can think of it as `print()` accepting `sep` as a named option. We'll cover keyword arguments thoroughly when we discuss functions in Volume 5.

</Section>

<Section label="The end parameter">

By default, `print()` ends with a newline. The `end=` parameter changes this:

```python
print("hello")           # "hello" + newline
print("hello", end="")   # "hello" — no newline
print("hello", end=" ")  # "hello " — space instead of newline
```

This is useful when you want to print on the same line in a loop:

```python
for i in range(5):
    print(i, end=" ")
print()  # final newline

# Output: 0 1 2 3 4
```

Or for progress bars, prompts, or any output where you don't want each `print()` to end the line.

<CodeRunner
  initial={`# Demonstrating sep and end.

# Default behavior.
print("a", "b", "c")
print("d", "e", "f")

# Custom separator.
print("x", "y", "z", sep="-")
print("p", "q", "r", sep=", ")

# Custom end.
print("first", end=" -> ")
print("second", end=" -> ")
print("third")

# Combination — useful for progress.
print("Loading", end="")
for _ in range(5):
    print(".", end="")
print(" done.")`}
  caption="The last block prints 'Loading..... done.' on a single line by suppressing the newline on each print."
/>

</Section>

<Section label="Printing objects directly">

Any value can be printed directly. Python calls the value's `str()` method (or `repr()` as a fallback) to get a printable representation.

```python
print([1, 2, 3])              # [1, 2, 3]
print({"name": "Ryan"})       # {'name': 'Ryan'}
print((1, 2, 3))              # (1, 2, 3)
print(None)                   # None
print(True)                   # True
```

For your own classes (Volume 6), you can define how they print by implementing `__str__`. We'll see that later.

</Section>

<Section label="Printing to standard error">

By default, `print()` writes to *standard output* (often abbreviated stdout). You can redirect to *standard error* (stderr) with the `file` parameter:

```python
import sys
print("normal message")
print("error message", file=sys.stderr)
```

In a terminal, both appear interleaved. But they can be redirected separately, which is useful for tooling — error messages go to stderr, regular output to stdout, and a script invoking your program can capture them differently.

For now, just know the option exists. We'll use it more in Volume 9.

</Section>

<Section label="A debugging trick: f-strings preview">

For more elaborate output, Python's *f-strings* are the modern way. We'll cover them properly in Chapter 4 (lesson 26), but a preview:

```python
name = "Ryan"
age = 37

# Old way:
print("name: " + name + ", age: " + str(age))

# Better way: pass multiple args.
print("name:", name, "age:", age)

# Best way for complex output: f-strings.
print(f"name: {name}, age: {age}")
print(f"name = {name!r}, age = {age:03d}")  # repr and zero-pad
```

The `f` before the quote turns a regular string into an f-string. Inside, anything in `{...}` is evaluated as Python and inserted into the string. We'll cover the formatting specifiers (like `:03d` for "format as an int, padded to 3 digits with zeros") later.

</Section>

<Exercise
  title="Pretty-print a record"
  prompt="Given the variables below, print a single line that looks like: `Ryan | 37 | engineer | True`. Use print() with sep="."`."
  starter={`name = "Ryan"
age = 37
job = "engineer"
employed = True

# Print all four with " | " between each.
print(...)`}
  expected="Ryan | 37 | engineer | True"
  hints={[
    "Pass all four as positional arguments and use sep=' | '.",
    "`print(name, age, job, employed, sep=' | ')`."
  ]}
  solution={`name = "Ryan"
age = 37
job = "engineer"
employed = True
print(name, age, job, employed, sep=" | ")`}
/>

<Exercise
  title="Build a progress line"
  prompt="Print 'Working' followed by 10 dots on the same line, then ' done.' on the same line, and finally a newline. Use a for loop with end='' to avoid newlines."
  starter={`# Print "Working.......... done." all on one line.

print("Working", end="")
for _ in range(10):
    print(...)
print(" done.")`}
  expected="Working.......... done."
  hints={[
    "Inside the for loop, print('.', end='')."
  ]}
  solution={`print("Working", end="")
for _ in range(10):
    print(".", end="")
print(" done.")`}
/>

<Connection
  back={[{ id: '01-18-operators-and-precedence', title: 'Operators and Precedence' }]}
  forward={[{ id: '01-20-chapter-3-recap', title: 'Chapter 3-4 Recap and Practice' }]}
>

Next: a recap chapter consolidating everything from chapters 3 and 4 — types, operators, variables, expressions vs statements, print. We'll do a few combined exercises to build muscle memory before moving into strings in depth.

</Connection>
