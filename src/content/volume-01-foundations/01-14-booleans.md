---
id: 01-14-booleans
volume: volume-01-foundations
chapter: 3
number: 14
title: "Booleans and Logic"
subtitle: "True, False, and the operators that combine them."
estimatedMinutes: 10
prerequisites: [01-13-floats-the-trap]
keyTerms: [boolean]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A boolean is the simplest type — it has exactly two values, `True` and `False`. Despite the simplicity, booleans are the backbone of decision-making in code. Every `if` statement asks a true-or-false question. Every comparison produces a boolean. Every logical condition reduces to a boolean.

This lesson covers booleans, the three logical operators (`and`, `or`, `not`), and Python's special trick of *truthy* and *falsy* values that lets you write idiomatic code.

</Section>

<EtymologyCard
  term="boolean"
  origin="After George Boole (1815-1864)"
  rootForm="Boole"
  rootMeaning="named after the English mathematician George Boole"
  story="George Boole was an English mathematician who developed an algebra of logic in the mid-1800s. His 1854 book 'An Investigation of the Laws of Thought' formalized how logical statements could be combined using AND, OR, and NOT — operations that work on True and False the way addition and multiplication work on numbers. This algebra became the foundation of all digital circuits a century later: every CPU is a vast network of Boolean gates implementing Boole's logic in silicon. The word 'Boolean' (often capitalized) entered programming as the natural term for True/False values."
  entryToComputing="Boolean algebra is the formal foundation of computing. Claude Shannon's 1938 master's thesis showed that Boolean algebra could analyze and design electrical switching circuits. From there to digital computers was a short step. Every bit, every gate, every comparison in a CPU is a Boolean operation."
  insight="When we say a value is 'Boolean,' we're naming it after a person — much like 'Cartesian coordinates' or 'Newtonian physics.' The word implicitly carries Boole's whole conceptual apparatus: a small, formal system of two values that, when combined, can express any logical statement. Two states. All of computing."
/>

<Section label="True and False">

Python's two boolean values are written `True` and `False` — capitalized. (Note: not `true` or `TRUE`. Python is strict about this. Other languages use different conventions.)

```python
yes = True
no = False
print(type(yes))   # <class 'bool'>
```

Booleans are produced by:
- Comparison operators: `5 > 3` → `True`, `5 == 6` → `False`.
- Logical operators on booleans: `True and False` → `False`.
- The `bool()` conversion function: `bool(0)` → `False`, `bool(5)` → `True`.

</Section>

<Section label="The three logical operators">

Python has three logical operators:

- **`and`** — true if *both* operands are true.
- **`or`** — true if *at least one* operand is true.
- **`not`** — flips true and false.

Examples:

```python
print(True and True)     # True
print(True and False)    # False
print(False or True)     # True
print(False or False)    # False
print(not True)           # False
print(not False)          # True
```

Two important details:

**Short-circuit evaluation.** Python evaluates `and`/`or` lazily. In `A and B`, if `A` is false, Python doesn't evaluate `B` — the result is already determined. In `A or B`, if `A` is true, Python doesn't evaluate `B`. This is sometimes used for safety:

```python
# Safe: if x is None, x.value is never evaluated.
if x is not None and x.value > 0:
    do_something()
```

**Returns operands, not bools.** `and` and `or` actually return one of their operands, not necessarily a boolean. `5 and 3` evaluates to `3` (because Python evaluated `5` as truthy, then needed to evaluate `3` to know the final result). `0 or "hello"` evaluates to `"hello"` (because `0` is falsy, so Python looked at the second operand). For most purposes you can treat the result as a boolean — `if A and B:` works because Python checks truthiness — but knowing the actual return value sometimes matters.

</Section>

<CodeRunner
  initial={`# Logical operators in action.

age = 30
country = "USA"

# Combinations.
print(age >= 18 and country == "USA")   # True — both conditions
print(age < 18 or country != "USA")     # False — neither
print(not (age >= 18))                   # False — age IS >= 18

# Short-circuit examples.
x = 0
print(x != 0 and (10 / x) > 1)   # False, no division by zero
# (If x != 0 is False, the second part isn't evaluated.)

# Operands, not bools.
print(5 and 3)        # 3 — last truthy operand
print(0 and 3)        # 0 — first falsy operand short-circuits
print(0 or "hello")   # "hello" — first truthy operand`}
  caption="The third example is the most surprising. and/or return values, not bools, but you can usually treat them as bools."
/>

<Section label="Truthiness recap">

We met truthiness in lesson 11. To recap: every value in Python has a truthy or falsy status, and `if x:` checks the truthiness of `x`.

Falsy:
- `False`, `None`
- `0`, `0.0`
- `""`, `[]`, `{}`, `()`, `set()`

Truthy: everything else.

This means you write idiomatic Python like:

```python
items = []
if items:
    print("we have items")
else:
    print("no items")   # this branch runs
```

Without truthiness, you'd write `if len(items) > 0:`. The truthy version is cleaner and equally clear.

You can use `not` to invert truthiness:

```python
if not items:
    print("no items")
```

This is idiomatic Python.

</Section>

<Section label="Comparison operators that return booleans">

Every comparison returns a boolean. The full list:

- `==` — equal
- `!=` — not equal
- `<` — less than
- `<=` — less than or equal
- `>` — greater than
- `>=` — greater than or equal
- `is` — identity (same object in memory). Different from `==`! We'll cover the distinction in Volume 2.
- `is not` — not the same object
- `in` — membership. `5 in [1, 2, 5]` → True.
- `not in` — not a member.

`in` is especially useful with strings, lists, sets, and dicts. We'll see it constantly.

<CodeRunner
  initial={`# Membership tests with 'in'.

print("a" in "apple")          # True — substring check
print("z" in "apple")          # False
print(3 in [1, 2, 3])          # True
print("name" in {"name": "x"}) # True — checks keys, not values

# Identity vs equality.
a = [1, 2]
b = [1, 2]
print(a == b)    # True — same value
print(a is b)    # False — different list objects in memory
print(a is a)    # True — same object`}
  caption="`in` is one of Python's most-used operators. The 'is vs ==' distinction trips up beginners; we'll explore it deeply in Volume 2."
/>

</Section>

<Exercise
  title="Compose conditions"
  prompt="Given age = 25 and has_license = True, write a print statement that displays True if the person is at least 18 AND has a license, False otherwise."
  starter={`age = 25
has_license = True

# Print True if age >= 18 AND has_license is True.
print(...)`}
  expected="True"
  hints={[
    "Combine the two conditions with `and`: `age >= 18 and has_license`."
  ]}
  solution={`age = 25
has_license = True
print(age >= 18 and has_license)`}
/>

<Exercise
  title="The truthy/falsy table"
  prompt="Print the truthiness of these values, one per line: 0, 1, '', 'hi', [], [0]. Use bool() to force the conversion."
  starter={`# Print bool() of each.
print(bool(0))
print(bool(1))
print(bool(...))
print(bool(...))
print(bool(...))
print(bool(...))`}
  expected={`False
True
False
True
False
True`}
  hints={[
    "Empty containers are falsy; non-empty ones are truthy.",
    "[0] is a list with one element (the integer zero) — it's not empty, so it's truthy. Containers' truthiness is about whether they have any contents, not what those contents are."
  ]}
  solution={`print(bool(0))
print(bool(1))
print(bool(""))
print(bool("hi"))
print(bool([]))
print(bool([0]))`}
/>

<Section label="Booleans and integers">

In Python, booleans are technically a subtype of integers. `True` is treated as `1` and `False` as `0` in arithmetic contexts:

```python
print(True + True)       # 2
print(True * 5)          # 5
print(False + 7)         # 7
print(sum([True, True, False, True]))  # 3 — counts the trues
```

This is occasionally useful — counting how many conditions are true is one line. Use it sparingly; mixing booleans into arithmetic can confuse readers.

</Section>

<Connection
  back={[{ id: '01-13-floats-the-trap', title: 'Floats and the Floating-Point Trap' }]}
  forward={[{ id: '01-15-strings-introduction', title: 'Strings — A First Tour' }]}
>

Next: a first proper tour of strings. Creation, indexing, length, basic operations. We'll get serious about strings in Chapter 4 (lessons 21-30); this is the introductory pass.

</Connection>
