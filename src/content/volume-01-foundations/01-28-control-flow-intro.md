---
id: 01-28-control-flow-intro
volume: volume-01-foundations
chapter: 6
number: 28
title: "Control Flow — Making Decisions"
subtitle: "if, elif, else — and the indentation that holds them together."
estimatedMinutes: 11
prerequisites: [01-27-string-recap]
keyTerms: []
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

Programs need to decide things. *If the user is logged in, show the dashboard. Otherwise, show the login page.* *If the file exists, read it. Otherwise, create it.* The structure that handles these decisions is *control flow* — the way the program chooses which code to run next.

Python's primary control-flow construct is `if`/`elif`/`else`. This lesson introduces the syntax, the semantics, and the cultural conventions around it.

</Section>

<Section label="The basic if">

```python
if condition:
    # this runs only if condition is truthy
    do_something()
```

The colon at the end of `if condition:` is required. The body is everything indented underneath. The body ends when indentation returns to the previous level.

```python
age = 25

if age >= 18:
    print("adult")
print("done")
```

When this runs:
- The condition `age >= 18` is evaluated. It's `True`.
- The body of the `if` (`print("adult")`) runs.
- The block ends because `print("done")` is back at the outer indentation level.
- `print("done")` runs unconditionally.

If the condition is `False`, the body is skipped entirely.

</Section>

<Section label="if/else">

To run different code in the false case, add `else`:

```python
age = 16

if age >= 18:
    print("adult")
else:
    print("minor")
```

The `else:` doesn't take a condition — it's "everything else." Exactly one of the two blocks runs.

</Section>

<Section label="if/elif/else">

For multiple alternatives, use `elif` (short for "else if"):

```python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("F")
```

How this evaluates:
- `score >= 90`? No.
- `score >= 80`? Yes. Print "B".
- The remaining `elif` and `else` are skipped.

Conditions are checked top to bottom. The first match wins. The `else` is only reached if no earlier condition matched. Exactly one block runs.

`elif` is unique to Python (some languages use `else if` as two keywords). It's an unimportant detail visually but useful: it keeps deeply nested decisions readable.

<CodeRunner
  initial={`# Grade calculator.
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"score: {score}, grade: {grade}")`}
  caption="Try changing the score and re-running. Notice how the chain finds the first matching condition and runs that branch."
/>

</Section>

<Section label="Indentation and blocks">

Python uses indentation to define blocks. Everything indented under an `if`, `elif`, `else`, or `def` is part of that block. The block ends when indentation returns to the previous level.

The convention is **4 spaces per indentation level, no tabs**. Most editors handle this automatically when configured for Python. Mixing tabs and spaces is a `TabError`.

```python
if x > 0:
    print("positive")           # part of the if block (4 spaces)
    print("definitely")         # also part of the if block (4 spaces)
print("always")                  # outside the if block (no indent)
```

Nested ifs use deeper indentation:

```python
if x > 0:
    if x > 10:
        print("big positive")    # 8 spaces
    else:
        print("small positive")  # 8 spaces
else:
    print("not positive")        # 4 spaces
```

</Section>

<Callout kind="info" title="Conditions don't need parentheses">

In C, Java, JavaScript, you write `if (x > 0)` with parens around the condition. In Python, parens are optional and usually omitted: `if x > 0:`. Both work; the parenless form is idiomatic.

```python
if (x > 0):           # works, but un-Pythonic
if x > 0:             # idiomatic
```

</Callout>

<Section label="Truthiness in conditions">

Recall from lesson 14: any value can be used as a condition. Python checks its truthiness.

```python
items = []

if items:
    print("we have items")
else:
    print("no items")
```

Idiomatic Python uses truthiness. `if items:` reads as "if we have items." It's clearer than `if len(items) > 0:`.

Common patterns:

```python
if not name:                # name is empty/None/falsy
    print("name required")

if config and config.enabled:   # short-circuit prevents AttributeError
    use(config)
```

</Section>

<Exercise
  title="Categorize a number"
  prompt="Given a number `n`, print 'negative' if it's less than 0, 'zero' if it's exactly 0, and 'positive' if it's greater than 0. Test with n = -5, then change to 0, then 7."
  starter={`n = -5

if n < 0:
    print(...)
elif n == 0:
    print(...)
else:
    print(...)`}
  expected="negative"
  hints={[
    "Three branches matching the three cases. Print 'negative', 'zero', 'positive'."
  ]}
  solution={`n = -5

if n < 0:
    print("negative")
elif n == 0:
    print("zero")
else:
    print("positive")`}
/>

<Exercise
  title="Eligibility check"
  prompt="Given age = 25 and citizenship = 'US', print 'eligible to vote' if both age >= 18 and citizenship == 'US'. Otherwise print 'not eligible'."
  starter={`age = 25
citizenship = "US"

if ___:
    print("eligible to vote")
else:
    print("not eligible")`}
  expected="eligible to vote"
  hints={[
    "The condition combines both requirements with `and`: `age >= 18 and citizenship == 'US'`."
  ]}
  solution={`age = 25
citizenship = "US"

if age >= 18 and citizenship == "US":
    print("eligible to vote")
else:
    print("not eligible")`}
/>

<Connection
  back={[{ id: '01-27-string-recap', title: 'String Chapter Recap' }]}
  forward={[{ id: '01-29-while-loops', title: 'While Loops' }]}
>

Next: while loops. The simplest kind of loop in Python — keep going until a condition becomes false.

</Connection>
