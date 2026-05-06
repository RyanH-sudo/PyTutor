---
id: 02-2-binary-deeper
volume: volume-02-data-and-names
chapter: 1
number: 2
title: "Binary, Two's Complement, and IEEE 754 — A Deeper Look"
subtitle: "How negative numbers and decimals are actually stored."
estimatedMinutes: 13
prerequisites: [02-1-the-deep-name-model]
keyTerms: []
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

In Volume 1 we mentioned binary, integers, and floats at a surface level. Now we look at the storage representation in detail. Two's complement (how negative integers are stored) and IEEE 754 (how floats are stored) are universal across modern hardware — every CPU does it the same way. Knowing the format clarifies a lot of subtle Python behavior.

This is theory-heavy. You don't need to memorize the bit patterns. You need to understand the *shape* of what's happening so the abstractions make sense.

</Section>

<Section label="Unsigned vs signed">

A bit pattern of 8 bits can represent 256 distinct values. There are two conventions for what those values mean.

**Unsigned:** 0 to 255. The 8 bits represent a positive integer.
**Signed:** typically -128 to 127. One bit is used as the sign; the value range is shifted.

For unsigned, `00000000` is 0 and `11111111` is 255. Simple.

For signed, the standard is *two's complement*, which we'll explain in a moment. `00000000` is 0, `01111111` is 127, `10000000` is -128, `11111111` is -1.

</Section>

<Section label="Two's complement — how negatives are stored">

The natural impulse for storing negative numbers is to use one bit as a sign — *sign-magnitude representation*. But this has a problem: there are two zeros (`00000000` and `10000000` both being "zero, with no magnitude"), and arithmetic gets weird at the boundary.

Two's complement solves this. The rule:

> To negate a number, flip all the bits, then add 1.

Examples (in 8 bits):
- `5` is `00000101`.
- To get `-5`: flip → `11111010`. Add 1 → `11111011`. So `-5` is `11111011`.
- To get back to `5` from `-5`: flip `11111011` → `00000100`. Add 1 → `00000101`. Back to 5.

Why is this clever? Because addition works the same way for positive and negative numbers. The CPU doesn't need a separate "subtraction" circuit — subtraction is just adding the two's complement.

```
  3 + (-3) =
  00000011
+ 11111101
  --------
  00000000   (with a carry out, which is discarded)
```

The result is 0, exactly as it should be. Two's complement makes arithmetic work uniformly.

The range for n-bit two's complement: -2^(n-1) to 2^(n-1) - 1. So 8-bit is -128 to 127. 32-bit is -2^31 to 2^31-1 (about ±2.1 billion). 64-bit is -2^63 to 2^63-1 (about ±9.2 quintillion).

Most languages' `int` types use two's complement at fixed widths. Python's `int` is unbounded, so it uses a variable-length internal representation. But the math works the same way.

</Section>

<Section label="Float storage: IEEE 754">

Floating-point numbers (Python's `float`) are stored in a format called IEEE 754. The double-precision form (used by Python) is 64 bits, divided as:

- 1 bit: sign (0 = positive, 1 = negative).
- 11 bits: exponent.
- 52 bits: mantissa (also called the significand or fraction).

The number's value is roughly:

```
(-1)^sign × 1.mantissa × 2^(exponent - 1023)
```

The "1.mantissa" part is the actual fractional value (with an implicit 1 bit). The exponent has a bias of 1023, so an exponent of 1023 means 2^0 = 1, an exponent of 1024 means 2^1 = 2, etc.

This is similar in spirit to scientific notation: `6.022 × 10^23` has a sign, a mantissa (6.022), and an exponent (23). The base is 10 in scientific notation; in IEEE 754 the base is 2.

The implications:

1. **Limited precision.** 52 bits of mantissa gives about 15-17 decimal digits of precision. Beyond that, you can't represent the number exactly.
2. **Limited range.** With 11 bits of exponent, values range from about 10^-308 to 10^308. Outside this range you get infinity.
3. **Many decimals can't be exactly represented.** As we saw in Volume 1: 0.1 and 0.2 are repeating fractions in binary, so they're stored as approximations.
4. **Special values.** Some bit patterns are reserved: zero (positive and negative), infinity, NaN.

</Section>

<Callout kind="info" title="Why IEEE 754 isn't worse">

You might wonder: if floating-point has all these issues, why do we use it? Because for most engineering work, the precision is good enough and the speed is enormous. CPUs have dedicated floating-point hardware that can do millions of operations per second per core.

For exact decimal math (currency, scientific work requiring exact fractions), Python provides `decimal.Decimal` — slower but exact. We'll use it in Volume 7. For exact rational arithmetic, there's `fractions.Fraction`. But for everything else, IEEE 754 is what you get.

</Callout>

<Section label="When this comes up in Python">

Most Python code doesn't care about the underlying representation. The places it matters:

- **NumPy arrays** have explicit fixed-size integer and float types: `int8`, `int32`, `int64`, `float32`, `float64`. Choosing the right size matters for memory and accuracy.
- **Bit manipulation** in network protocols, file formats, cryptography — anywhere bits matter directly.
- **Numerical analysis** — knowing precision limits is essential for stable algorithms.
- **Reading legacy data** — when you need to interpret bytes from another system, knowing the format is everything.

We'll touch each of these throughout Volumes 2 and 7.

</Section>

<Exercise
  title="Hexadecimal practice"
  prompt="Convert these hexadecimal values to decimal and verify with Python: 0xFF, 0xC0FFEE, 0xDEADBEEF. Print each."
  starter={`# Hex to decimal.

print(int("FF", 16))         # 255
print(int("C0FFEE", 16))     # ...
print(int("DEADBEEF", 16))   # ...

# You can also write hex literals directly:
print(0xFF)
print(0xC0FFEE)
print(0xDEADBEEF)`}
  expected_contains="DEADBEEF"
  hints={[
    "int(s, base) parses a string in the given base. int('FF', 16) = 255.",
    "Or use the hex literal syntax: 0xFF, 0xDEADBEEF.",
    "0xDEADBEEF = 3735928559. It's a famous 'magic' constant in low-level programming."
  ]}
  solution={`print(int("FF", 16))
print(int("C0FFEE", 16))
print(int("DEADBEEF", 16))
print(0xFF)
print(0xC0FFEE)
print(0xDEADBEEF)`}
/>

<Connection
  back={[{ id: '02-1-the-deep-name-model', title: 'The Deep Model — Names, Values, References' }]}
>

Volume 2 continues. The remaining lessons cover strings deeply (Unicode normalization, performance), the numeric tower, None, and the deep mechanics of hashing.

</Connection>
