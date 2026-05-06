---
id: 01-17-expressions-vs-statements
volume: volume-01-foundations
chapter: 4
number: 17
title: "Expressions vs Statements"
subtitle: "What evaluates and what acts — and why the difference matters."
estimatedMinutes: 9
prerequisites: [01-16-variables-as-names]
keyTerms: []
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

Python's syntax has two main categories of constructs: *expressions* and *statements*. Knowing which is which clarifies a lot of confusion later.

- An **expression** is a piece of code that evaluates to a value. `2 + 2`, `name`, `len("hello")`, `True and False` — all expressions.
- A **statement** is a piece of code that performs an action. Assignments (`x = 5`), `if` statements, `while` loops, `def` definitions, `import`s — all statements.

Some constructs are both: a function call like `print("hi")` is an expression (it evaluates to whatever the function returns — `None` for `print`) and it's a statement (a line of code performing an action).

This lesson clarifies the categories so the next few lessons (operators, control flow) make sense.

</Section>

<Section label="Expressions: things that have values">

Anything that you can put on the right-hand side of an assignment is an expression. The right side gets evaluated, and the resulting value is bound to the left side.

```python
x = 2 + 3              # 2 + 3 is an expression — evaluates to 5
y = len("hello")       # len("hello") is an expression — evaluates to 5
z = (1, 2)             # (1, 2) is an expression — evaluates to a tuple
flag = True and False  # True and False is an expression — evaluates to False
```

Expressions can contain other expressions. `(2 + 3) * len("hello")` is one big expression containing several smaller ones. Python evaluates the inner ones first, then combines them.

</Section>

<Section label="Statements: things that do work">

A statement does something. It changes the program's state, redirects flow, defines a name, etc. Statements don't evaluate to values you can assign.

```python
x = 5                  # assignment statement
if x > 0:              # if statement
    print(x)
for i in range(3):     # for statement
    print(i)
def f():               # def statement
    return 42
import math            # import statement
return x               # return statement (only inside functions)
```

You cannot put a statement on the right-hand side of an assignment:

```python
y = if x > 0: print(x)   # SyntaxError
y = def f(): return 42   # SyntaxError
```

The fact that statements aren't expressions has consequences. We'll see, for example, that Python's `if` is a statement (and can't be used as an expression directly), but Python provides a *conditional expression* syntax for the cases where you want the value:

```python
# This is the conditional expression — an expression form of if.
result = "positive" if x > 0 else "non-positive"
```

We'll cover this in Volume 4.

</Section>

<Section label="Function calls: both">

A function call is a hybrid. Syntactically it's an expression — it has a value (whatever the function returns). But as a statement on its own line, it's executed for its side effects.

```python
print("hello")           # statement: prints "hello"; the return value (None) is discarded
result = max(1, 2, 3)    # expression: max(1, 2, 3) evaluates to 3, which is assigned to result
```

In `print("hello")` on its own line, we're calling `print` for its effect (printing). The fact that `print` returns `None` doesn't matter — we don't capture it.

In `result = max(1, 2, 3)`, we're calling `max` and capturing its return value. The function call is an expression here.

The same syntactic construct serves both purposes. Python doesn't make you choose.

</Section>

<Section label="Why does this matter?">

A few practical consequences:

**Where things can appear.** Expressions can be inside other expressions. Statements cannot. You can write `x = f(y + 1)` because `y + 1` is an expression that fits inside the function call expression. You cannot write `x = (if y: 1 else: 2)` because `if` is a statement, not an expression.

**Return values.** Functions return values, which are expressions. Statements like `if` and `for` don't have return values. The body of a function might be a single expression (`return x + 1`) or a sequence of statements (`x = 5; if x > 0: ...; return x`).

**Lambda functions.** Python's `lambda` syntax can only contain a single expression — not statements. `lambda x: x + 1` is fine. `lambda x: if x > 0: print(x)` is not. We'll cover lambdas in Volume 5.

**The Python interpreter prompt.** In an interactive Python REPL, typing an expression auto-prints its value. Typing a statement does the action but prints nothing. This is how you can tell which is which: `>>> 2 + 2` shows `4`. `>>> x = 5` shows nothing.

</Section>

<CodeRunner
  initial={`# Sample expressions and statements.

# Expressions:
print(2 + 2)              # the expression 2+2 evaluates inside print
print(len("hello"))       # len(...) is an expression
print(2 + 2 == 4)         # comparison is an expression

# Statements:
x = 5                     # assignment

if x > 0:                 # if statement
    print("positive")

for i in range(3):        # for statement
    print(i)

def my_function():        # def statement
    """Docstring."""
    return 42

# Function call as expression — captures return value:
result = my_function()
print("result:", result)

# Function call as statement — discards return value:
my_function()             # called, value not captured`}
  caption="Notice how each line is either evaluating something (expression) or doing something (statement). Some lines do both."
/>

<Section label="Operators are expression-builders">

An operator combines values into a new expression. We've met:

- Arithmetic: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- Comparison: `==`, `!=`, `<`, `<=`, `>`, `>=`, `is`, `in`
- Logical: `and`, `or`, `not`
- Membership: `in`, `not in`
- Identity: `is`, `is not`

Each operator takes one or two operands (which are themselves expressions) and produces a new expression.

The order in which Python evaluates operators matters — it's called *operator precedence*. `2 + 3 * 4` evaluates to 14, not 20, because `*` has higher precedence than `+`. We'll cover the full precedence table in the next lesson.

</Section>

<Exercise
  title="Spot the kind"
  prompt="For each line below, mentally classify it as Expression, Statement, or Both. Then run the code to confirm what happens. There's no expected output to match — this is for the thinking, not the running."
  starter={`# Classify each: expression, statement, or both?

# 1.
x = 5

# 2.
print(x)

# 3.
x + 5

# 4.
result = x + 5

# 5.
if x > 0:
    print("positive")

# 6.
y = max(x, 10)

print("done")`}
  expected="done"
  hints={[
    "Line 1 is a statement (assignment). Line 2 is a function call — both an expression (returns None) and a statement (the side effect of printing). Line 3 is an expression — evaluated and discarded; nothing happens visibly.",
    "Line 4 is a statement (assignment), with the right side being an expression. Line 5 is an if-statement (a compound statement). Line 6 is a statement, again with an expression on the right."
  ]}
  solution={`# Solutions in comments — running it just prints "done".
x = 5                   # statement
print(x)                # both — call is expression, line is statement
x + 5                   # expression (evaluated and discarded)
result = x + 5          # statement (right side is expression)
if x > 0:               # statement
    print("positive")
y = max(x, 10)          # statement (right side is expression)
print("done")`}
/>

<Connection
  back={[{ id: '01-16-variables-as-names', title: 'Variables Are Names, Not Boxes' }]}
  forward={[{ id: '01-18-operators-and-precedence', title: 'Operators and Precedence' }]}
>

Next: the full table of operators, the precedence rules that decide who runs first, and the parentheses tactic for keeping things readable.

</Connection>
