---
id: 01-12-integers
volume: volume-01-foundations
chapter: 3
number: 12
title: "Integers — Whole Numbers, Unbounded"
subtitle: "What Python's int can do that most languages' int can't."
estimatedMinutes: 11
prerequisites: [01-11-types-the-shape-of-data]
keyTerms: [integer]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

In Volume 1 so far, you've used integers casually — `5`, `42`, `1989`. In this lesson we look at them carefully. What is an integer to Python, exactly? What can it do? What's its relationship to the integers in other languages?

The short version: Python's integers are unusually nice. In most languages, integers have a maximum size — typically 2^63 - 1 if they're 64-bit signed, after which they wrap or overflow. Python's integers don't have a maximum. You can do `2 ** 1000` and Python gives you the exact answer, all 302 digits of it. This is unusual. It's also one of the reasons Python is good for math, science, and AI.

</Section>

<EtymologyCard
  term="integer"
  origin="Latin"
  rootForm="integer"
  rootMeaning="whole, untouched"
  story="The Latin 'integer' meant 'whole, untouched, intact' — from 'in-' (not) plus a root related to 'tangere' (to touch). The word entered English in the 1500s as a mathematical term: a 'whole number,' as opposed to a fraction. The same root gives us 'integrity' (wholeness) and 'integral' (essential, whole). The shortening to 'int' as a programming-language type name appears in C (1972) and was adopted everywhere afterward."
  entryToComputing="In computing, 'int' has a more specific meaning than in math: it's a value of a particular machine size, usually 32 or 64 bits, that can hold whole numbers in a fixed range. Python's int is closer to the mathematical sense — *any* whole number — at the cost of a small performance overhead. Other Python implementations (Cython, PyPy) and most other languages keep the bounded version."
  insight="When you write `int` in Python, you're saying 'whole number, untouched by fractions.' The Latin root 'tangere' (touch) gives the lovely image of integers as numbers that haven't been broken into pieces."
/>

<Section label="Integer literals">

Python accepts integer literals in several bases:

- Decimal (the usual): `42`, `1000`, `-17`.
- Binary, prefixed `0b`: `0b101010` (= 42).
- Octal (base 8), prefixed `0o`: `0o52` (= 42).
- Hexadecimal, prefixed `0x`: `0x2A` (= 42).

Python also lets you embed underscores in long numbers for readability:

- `1_000_000` is the same as `1000000`.
- `0b1111_0000_1111_0000` is the same as `0b1111000011110000`.

The underscores are purely visual — they have no effect on the number's value.

<CodeRunner
  initial={`# Integer literals in different bases.

print(42)
print(0b101010)        # binary
print(0o52)            # octal
print(0x2A)            # hex

# Underscores for readability.
print(1_000_000)       # one million
print(1_000_000_000)   # one billion`}
  caption="All representations on the same line print the same number. Python normalizes to base 10 for output."
/>

</Section>

<Section label="Integer operations">

Python supports the standard arithmetic operators on integers:

- `+` — addition. `2 + 3` → 5.
- `-` — subtraction or negation. `5 - 3` → 2. `-5` → -5.
- `*` — multiplication. `2 * 3` → 6.
- `/` — division. *Always* returns a float. `6 / 2` → 3.0, not 3.
- `//` — integer division (also called floor division). Discards the fraction. `7 // 2` → 3.
- `%` — modulo (remainder). `7 % 2` → 1.
- `**` — exponentiation. `2 ** 10` → 1024.

There are also bitwise operators we'll meet later: `&`, `|`, `^`, `~`, `<<`, `>>`. They operate on the binary representation. We'll cover them in Volume 4.

<CodeRunner
  initial={`# Arithmetic on integers.

print(7 + 3)        # 10
print(7 - 3)        # 4
print(7 * 3)        # 21
print(7 / 3)        # 2.3333... — note: float result
print(7 // 3)       # 2 — integer division
print(7 % 3)        # 1 — remainder
print(2 ** 10)      # 1024 — exponentiation

# Negative numbers.
print(-7 // 3)      # -3 — floor division rounds toward negative infinity
print(-7 % 3)       # 2 — remainder is always non-negative

# Big numbers — Python doesn't care.
print(2 ** 100)
print(10 ** 50)`}
  caption="Three things to notice: division always gives a float, integer division rounds toward negative infinity (not toward zero), and Python integers can be arbitrarily large."
/>

</Section>

<Section label="The unbounded integer">

This is the unusual feature. In C, an `int` is 32 bits, max value ~2.1 billion. In Java, an `int` is 32 bits with the same max. In Go, `int` is 32 or 64 bits depending on the platform. If you exceed the max, the value silently wraps around — `2_147_483_647 + 1` becomes `-2_147_483_648`. This causes real bugs.

In Python, integers grow as large as needed. The implementation uses an internal data structure that allocates more memory for bigger numbers. The max is bounded only by your computer's memory.

```python
2 ** 1000
# Returns: 10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376
```

This is the actual answer, exact. No rounding. No overflow. Python computes it in a few microseconds.

This matters for cryptography (which uses huge primes), for combinatorics (which produces astronomical numbers), and for any math-heavy work where exact integers matter. It's part of why Python is the lingua franca of scientific computing.

</Section>

<Callout kind="info" title="Why Python can do this and C can't">

C's `int` is a fixed-size value that fits in a CPU register. The operations on it are single CPU instructions. This is fast — addition takes one clock cycle. But the size is fixed.

Python's `int` is a more elaborate data structure (a *PyObject* with a header, a sign, and a list of "digits" in some large base). Operations on Python integers are implemented as Python C functions that handle arbitrary sizes. This is slower than a single CPU instruction (often 100x or more), but it's never wrong.

For most code, the slowdown doesn't matter — Python is fast enough. When it does matter, you reach for NumPy, which has fixed-size types backed by C arrays. We'll see NumPy in Volume 10.

</Callout>

<Section label="Comparison operators on integers">

You can compare integers with the standard comparison operators. Each comparison returns a boolean.

- `==` — equal. `5 == 5` → True. `5 == 6` → False.
- `!=` — not equal.
- `<` — less than.
- `<=` — less than or equal.
- `>` — greater than.
- `>=` — greater than or equal.

Python supports a unique syntax called *chained comparisons*:

```python
1 < x < 10        # True if x is strictly between 1 and 10
0 <= y <= 100     # True if y is between 0 and 100, inclusive
```

This reads naturally and is unique to Python (most languages would require `1 < x and x < 10`). Use it when it makes the code clearer.

<CodeRunner
  initial={`x = 5

# Standard comparisons.
print(x == 5)      # True
print(x != 6)      # True
print(x < 10)      # True
print(x >= 5)      # True

# Chained — Python feature.
print(1 < x < 10)  # True
print(0 < x < 4)   # False`}
  caption="Comparisons return booleans. Chained comparisons read like math — you can almost always use them where they apply."
/>

</Section>

<Exercise
  title="Compute and compare"
  prompt="Given x = 17 and y = 4, compute and print: x + y, x - y, x * y, x // y (integer division), x % y (remainder), and finally a True/False for whether x is greater than y squared."
  starter={`x = 17
y = 4

# Print each computation.
print(x + y)
print(x - y)
print(x * y)
print(x // y)
print(x % y)

# True or False: is x greater than y squared?
print(...)`}
  expected={`21
13
68
4
1
True`}
  hints={[
    "y squared is y ** 2 (which equals 16). x is 17. So 17 > 16 is True."
  ]}
  solution={`x = 17
y = 4

print(x + y)
print(x - y)
print(x * y)
print(x // y)
print(x % y)
print(x > y ** 2)`}
/>

<Exercise
  title="Big numbers"
  prompt="Compute the factorial of 30 (the product 1 × 2 × 3 × ... × 30) and print it. The trick: there's a built-in function called `math.factorial(n)` you can use after importing math. The expected answer is approximately 2.65 × 10^32 — Python should give you the exact integer."
  starter={`# Import the math module to get factorial.
import math

# Compute and print factorial of 30.
print(...)`}
  expected="265252859812191058636308480000000"
  hints={[
    "Use math.factorial(30) inside print().",
    "The result is a 33-digit integer. Python represents it exactly because Python integers are unbounded."
  ]}
  solution={`import math
print(math.factorial(30))`}
/>

<Connection
  back={[{ id: '01-11-types-the-shape-of-data', title: 'Types — The Shape of Data' }]}
  forward={[{ id: '01-13-floats-the-trap', title: 'Floats and the Floating-Point Trap' }]}
>

Next: floats — Python's decimal numbers — and the surprising fact that `0.1 + 0.2` is *not* exactly `0.3`. We'll explain why, and what to do about it.

</Connection>
