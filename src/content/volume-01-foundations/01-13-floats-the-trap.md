---
id: 01-13-floats-the-trap
volume: volume-01-foundations
chapter: 3
number: 13
title: "Floats and the Floating-Point Trap"
subtitle: "Why 0.1 + 0.2 is not 0.3, and what working programmers do about it."
estimatedMinutes: 11
prerequisites: [01-12-integers]
keyTerms: []
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

If you have only one weird thing to remember about Python's numbers, this is it. Run this:

<CodeRunner
  initial={`print(0.1 + 0.2)`}
  caption="What did you expect? What did you get?"
/>

You got `0.30000000000000004`. Not `0.3`. This is not a Python bug. It's a fact about how computers represent decimal numbers in binary, and it shows up in every programming language that uses standard floating-point arithmetic — JavaScript, C, Java, Ruby, Go, all of them.

This lesson explains why it happens, what programs you should and shouldn't trust to give exact answers, and what tools Python provides for the cases where exactness matters.

</Section>

<Section label="The decimal you can't represent in binary">

Recall from Volume 1's binary lesson: a number like `0.5` in binary is `0.1` (one-half). `0.25` is `0.01` (one-quarter). `0.75` is `0.11` (one-half plus one-quarter). These are exact — they fit cleanly into binary because their denominators are powers of 2.

But the decimal `0.1` doesn't have a clean binary representation. In binary, `0.1` is approximately:

```
0.0001100110011001100110011...  (repeating forever)
```

It's a repeating fraction in base 2, the same way `1/3` is a repeating decimal in base 10 (`0.33333...`). Computers can't store an infinitely long fraction, so they round to a fixed number of bits — typically 53 bits for the mantissa in IEEE 754 double-precision floats.

The result: when Python stores `0.1`, it stores something close to `0.1` but not exactly. When you add two of these "almost 0.1"s and a "almost 0.2", the small errors accumulate. The output `0.30000000000000004` is the mathematical truth about that addition: the stored values, exactly, sum to slightly more than `0.3`.

This isn't sloppiness in the language. It's the inherent limit of representing arbitrary decimals in a fixed number of binary bits. Every CPU does this the same way (the IEEE 754 standard is universal), so every language has the same behavior.

</Section>

<HistoryNote year="1985" who="IEEE">

The IEEE 754 standard defines how computers represent floating-point numbers. It was finalized in 1985 and refined since. Before IEEE 754, every computer had its own incompatible floating-point format, and porting numerical software was a nightmare. The standard fixed that. Today, every CPU and every programming language uses IEEE 754, which is why every language has the same `0.1 + 0.2` problem.

</HistoryNote>

<Section label="What this means in practice">

For most everyday code, the imprecision doesn't matter. If you're computing the price of a meal in dollars and cents, the small errors are usually below the rounding you'd do anyway. If you're computing the position of a particle in a physics simulation, the errors are far smaller than the data's resolution.

But there are a few situations where it bites:

1. **Equality comparisons.** Don't compare floats with `==`. `0.1 + 0.2 == 0.3` is `False`. Instead, check if they're "close enough":
   ```python
   abs((0.1 + 0.2) - 0.3) < 0.0001  # True
   ```
   Or use `math.isclose()`:
   ```python
   import math
   math.isclose(0.1 + 0.2, 0.3)  # True
   ```

2. **Money.** Don't do financial calculations with floats. Use the `decimal` module instead, which represents decimal numbers exactly. Or do everything in cents (integers).

3. **Repeated arithmetic.** Floating-point errors accumulate. If you sum a million floats, the small errors add up to potentially significant ones. There are numerical techniques (like Kahan summation) to mitigate this, but they're outside our scope.

Most code is fine. But knowing the trap exists prevents the surprise when you encounter it.

</Section>

<CodeRunner
  initial={`# Demonstrating the float trap and how to handle it.

# The classic.
print(0.1 + 0.2)              # 0.30000000000000004
print(0.1 + 0.2 == 0.3)       # False — surprising!

# The fix: math.isclose().
import math
print(math.isclose(0.1 + 0.2, 0.3))   # True

# Or with a tolerance you choose.
diff = abs((0.1 + 0.2) - 0.3)
print(diff < 1e-9)            # True — close enough

# For money, use decimal.
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))   # 0.3 — exact!`}
  caption="Three takeaways: don't use == on floats, use math.isclose() for approximate comparisons, use Decimal for money."
/>

<Section label="Float literals and operations">

Float literals look like decimals: `3.14`, `0.001`, `2.0`, `-7.5`. You can also use scientific notation: `1.5e3` is 1500, `2.5e-4` is 0.00025.

The arithmetic operators are the same as for integers: `+`, `-`, `*`, `/`, `//`, `%`, `**`. With floats:

- `/` always returns a float (it does for ints too — `7/3` is `2.333...`, not `2`).
- `//` returns a float when at least one operand is a float (`7.0 // 2` is `3.0`, not `3`).
- `%` works the same.
- `**` works the same.

<CodeRunner
  initial={`# Float operations.

print(3.14 + 1.0)      # 4.14
print(3.14 * 2)        # 6.28 — int gets promoted to float
print(10.0 / 3)        # 3.3333333333333335
print(10.0 // 3)       # 3.0 — float result, but value is 3
print(10.0 % 3)        # 1.0
print(2.0 ** 10)       # 1024.0

# Scientific notation.
print(1.5e3)           # 1500.0
print(2.5e-4)          # 0.00025`}
/>

</Section>

<Section label="Special float values">

There are a few unusual values floats can take. You'll encounter them occasionally:

- `float('inf')` — positive infinity. Larger than any finite number.
- `float('-inf')` — negative infinity.
- `float('nan')` — "not a number." Result of operations like `0.0 / 0.0`.

`nan` is particularly tricky because `nan == nan` is `False`. Even `nan` isn't equal to itself! Use `math.isnan(x)` to test for it.

<CodeRunner
  initial={`import math

# Infinities.
inf = float('inf')
print(inf > 1_000_000_000_000)    # True
print(inf + 1)                     # still inf

# NaN — the weird one.
nan = float('nan')
print(nan == nan)                  # False! NaN is not equal to itself.
print(math.isnan(nan))             # True — this is how you check`}
  caption="Infinity is well-behaved. NaN is not. The lesson: never use == to test for NaN; use math.isnan() instead."
/>

</Section>

<Exercise
  title="Approximate comparison"
  prompt="The variable `total` below should be 1.0 — it's the sum of ten 0.1s. But because of float imprecision, the equality check `total == 1.0` will fail. Use `math.isclose()` to verify the value is close to 1.0. The output should be 'total: 0.9999999999999999' and 'is_close: True'."
  starter={`import math

# Sum 0.1 ten times.
total = 0.0
for _ in range(10):
    total = total + 0.1

# Print the actual value.
print("total:", total)

# Use math.isclose() to check it's close to 1.0.
is_close = ___
print("is_close:", is_close)`}
  expected={`total: 0.9999999999999999
is_close: True`}
  hints={[
    "Use `math.isclose(total, 1.0)`.",
    "Notice that summing ten 0.1s doesn't give exactly 1.0 — float errors compound."
  ]}
  solution={`import math

total = 0.0
for _ in range(10):
    total = total + 0.1

print("total:", total)

is_close = math.isclose(total, 1.0)
print("is_close:", is_close)`}
/>

<Connection
  back={[{ id: '01-12-integers', title: 'Integers — Whole Numbers, Unbounded' }]}
  forward={[{ id: '01-14-booleans', title: 'Booleans and Logic' }]}
>

Next: booleans, the simplest type. Plus the logical operators `and`, `or`, `not`, and how Python's truthiness works.

</Connection>
