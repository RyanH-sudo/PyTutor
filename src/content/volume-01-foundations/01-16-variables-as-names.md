---
id: 01-16-variables-as-names
volume: volume-01-foundations
chapter: 4
number: 16
title: "Variables Are Names, Not Boxes"
subtitle: "The mental model that prevents a thousand bugs."
estimatedMinutes: 12
prerequisites: [01-15-strings-introduction]
keyTerms: [variable]
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

Most beginner books explain variables with a metaphor: "a variable is a box that holds a value." This metaphor is intuitive but, for Python, *wrong*. It causes confusion later when you encounter mutable values, function arguments, or aliasing.

The correct mental model is: *a variable is a name that points to a value*. The value lives somewhere in memory; the variable is a label tied to it. Multiple labels can point to the same value. A label can be re-tied to a different value at any time. The values themselves are independent of the names.

This sounds pedantic. It's not. The "names not boxes" model is the difference between predicting Python's behavior correctly and being surprised by it. Once you internalize it, a class of bugs disappears.

</Section>

<EtymologyCard
  term="variable"
  origin="Latin"
  rootForm="variabilis"
  rootMeaning="changeable"
  story="From Latin 'variabilis,' from 'variare' (to change). In mathematics, a variable is a symbol whose value can change — `x` in `f(x) = x²` is a variable because `x` can be different things. In programming, the same idea applies, with a twist: a programming variable is a name in a scope, and the value the name points to can change. The mathematical sense is closer to a parameter; the programming sense allows reassignment."
  entryToComputing="Fortran (1957) used the term 'variable' for named storage locations. The convention has been universal since. The word picks up a slightly different meaning in functional languages where 'variables' don't actually vary — they're just names bound once. But in mainstream languages, 'variable' implies the possibility of reassignment."
  insight="Holding both meanings — mathematical (a symbol with multiple possible values) and computational (a name with mutable binding) — is useful. They're related: in both, the variable is a stand-in for the actual value, and the value can be different at different times."
/>

<Section label="The right model: names point to values">

Imagine memory as a vast warehouse of values. Numbers, strings, lists — each one occupies a spot in the warehouse with a unique address. A variable is just a sticky note saying "this name refers to the value at this address."

```python
x = 5
```

After this statement: somewhere in memory, the value `5` exists. The name `x` has a sticky note attached to that location.

```python
x = 7
```

After this: the sticky note labeled `x` has been moved. It now points to the value `7`. The original `5` is still around in memory (unless nothing else is pointing to it, in which case it's eligible for garbage collection — Python cleans up unreferenced values).

```python
y = x
```

After this: a *second* sticky note labeled `y` has been attached to the same value as `x`. Both names point to the same `7`.

```python
y = "hello"
```

After this: `y`'s sticky note has been moved to a string `"hello"`. `x` is still pointing at `7`. The two names are now pointing at completely different values.

This model — names as mobile labels, values as fixed-in-place — is the mental picture to keep.

</Section>

<Section label="The id() function shows you the address">

Python has a built-in function `id()` that returns the unique numeric "address" of a value. (For CPython, it's actually the memory address; for other Python implementations, it's an opaque unique number. Either way, two values are at the same id if and only if they're literally the same object.)

```python
x = 5
print(id(x))   # some number like 140711234567168

y = x
print(id(y))   # SAME number — y points to the same value

y = 6
print(id(y))   # different number now — y points to a new value
```

You'll see this distinction made important when we get to mutable values like lists. For immutable values like integers and strings, the distinction often doesn't matter in practice.

<CodeRunner
  initial={`# Showing that y = x makes y point to the same value as x.

x = 1000
y = x

print("x:", x, "id:", id(x))
print("y:", y, "id:", id(y))

# Same id — same value, in the same memory location.

# Now reassign y.
y = 2000

print()
print("after y = 2000:")
print("x:", x, "id:", id(x))
print("y:", y, "id:", id(y))

# x is unchanged. y now points elsewhere.`}
  caption="The ids before reassignment are the same — both names point to the same value. After reassigning y, the ids differ. x is unchanged."
/>

</Section>

<Section label="Why this matters: mutable values">

For *immutable* values (integers, floats, strings, tuples), the box-vs-name distinction doesn't show up much. You never modify an int in place — you create a new int and rebind. So either model gives the right intuition.

For *mutable* values (lists, dicts, sets, custom objects), the distinction is dramatic. Consider:

```python
a = [1, 2, 3]
b = a              # b is the same list as a
b.append(4)        # mutates the list

print(a)           # [1, 2, 3, 4]
print(b)           # [1, 2, 3, 4]
```

If you'd thought of variables as boxes, you'd expect `a` to still be `[1, 2, 3]` because we only modified `b`. But under the names-as-labels model, the result is obvious: `a` and `b` are two labels on the same value, and we mutated the value. Of course both labels see the change.

This is one of the most common sources of bugs in beginner Python. We'll do a full lesson on it in Volume 3 when we cover lists. For now, the seed: *if two names point to the same mutable value, modifying through one name changes what the other sees*.

<CodeRunner
  initial={`# The classic surprise.

a = [1, 2, 3]
b = a              # b and a point to the same list
b.append(4)        # mutate the list

print("a:", a)
print("b:", b)
print("same object?", a is b)`}
  caption="The output shows a and b both ending up as [1, 2, 3, 4], because they're labels on the same list. We'll come back to this."
/>

</Section>

<Section label="Naming conventions">

Choosing good variable names is one of the most underrated skills in programming. A few conventions:

**Use meaningful names.** `x = 5` is fine in a math example. In production code, `account_balance = 5` is much better.

**Use lowercase with underscores.** This is Python's convention: `user_name`, not `UserName` or `userName`. The pattern is called *snake_case* (the underscores look like the joints of a snake). Capital names are reserved for classes (which we'll meet in Volume 6) and constants.

**Avoid reserved words.** Python has keywords that can't be used as names: `if`, `else`, `for`, `while`, `def`, `class`, `return`, `import`, `True`, `False`, `None`, etc. The interpreter raises a `SyntaxError` if you try.

**Don't shadow built-ins.** Python has built-in names like `list`, `str`, `int`, `dict`, `len`, `type`. Don't reassign them. `list = [1, 2, 3]` works but breaks `list()` everywhere downstream.

**Single-letter names are fine when the meaning is obvious.** `i` and `j` for loop counters. `x` and `y` for coordinates. `k` and `v` for dict keys and values. Single-letter names are bad when the meaning is opaque.

**Use plurals for collections.** `customer` is one customer. `customers` is a list of them.

**Boolean names should sound like questions.** `is_valid`, `has_permission`, `should_retry`. Reading the code as English: `if is_valid: ...` reads "if [it] is valid: ..."

</Section>

<Callout kind="tip" title="The rename-friendly habit">

Get comfortable renaming variables as you understand the code better. Most editors have a *rename* command that updates all references — VS Code's is `F2`, with cursor on a name. When a variable was called `x` because you weren't sure what it represented, and now you realize it's the customer's annual revenue, rename it. The rename is free and the readability gain is permanent.

This is a habit professionals develop early and keep forever. Code that reads clearly is code that's easier to modify, easier to debug, and easier to defend in code review.

</Callout>

<Section label="Multiple assignment and swapping">

Python lets you assign multiple variables in one line:

```python
x, y = 5, 10
print(x)        # 5
print(y)        # 10
```

This is *tuple unpacking* — the right side is `(5, 10)`, the left side is two names, and Python pairs them up. We'll see this used heavily in Volume 5.

A famous trick: swapping two variables.

```python
x, y = 5, 10
x, y = y, x       # swap
print(x)           # 10
print(y)           # 5
```

In most languages you'd need a temporary variable: `tmp = x; x = y; y = tmp`. Python's tuple unpacking does it in one line. It's elegant, idiomatic, and the kind of thing interviewers love to see.

<CodeRunner
  initial={`# Multiple assignment.
x, y = 5, 10
print(x, y)      # 5 10

# The Python swap.
x, y = y, x
print(x, y)      # 10 5

# Three at once.
a, b, c = 1, 2, 3
print(a, b, c)   # 1 2 3`}
/>

</Section>

<Exercise
  title="Names point, names re-point"
  prompt="Walk through this code in your head, predict what gets printed, then run it. Does the output match what you expected?"
  starter={`a = 100
b = a       # b and a both point to 100

a = 200     # a now points to 200; b is unchanged

print("a:", a)
print("b:", b)`}
  expected={`a: 200
b: 100`}
  hints={[
    "When you write `b = a`, you're creating a second name for the value a points to. After that, both names are independent — reassigning one doesn't affect the other.",
    "This is fundamentally different from mutating a value (which we'll see with lists). Reassignment changes which value the name points to; it doesn't change the value itself."
  ]}
  solution={`a = 100
b = a
a = 200
print("a:", a)
print("b:", b)`}
/>

<Connection
  back={[{ id: '01-15-strings-introduction', title: 'Strings — A First Tour' }]}
  forward={[{ id: '01-17-expressions-vs-statements', title: 'Expressions vs Statements' }]}
>

Next: a careful distinction between expressions (things that evaluate to a value) and statements (things that perform an action). The categories matter for how Python parses and executes your code.

</Connection>
