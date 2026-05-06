---
id: 01-20-chapter-3-recap
volume: volume-01-foundations
chapter: 4
number: 20
title: "Chapter 3-4 Recap and Practice"
subtitle: "Consolidating types, operators, variables, expressions."
estimatedMinutes: 12
prerequisites: [01-19-the-print-function]
keyTerms: []
exerciseCount: 3
checkpoint: true
tags: [practice]
---

<Section label="The Opening">

We've covered a lot in the last ten lessons. Before we dive into strings in detail (Chapter 5, lessons 21-30), let's take a breath and consolidate. This is a *checkpoint lesson* — a place to make sure the foundation is solid before we build on it.

We'll do three combined exercises that touch the major topics: types, conversion, operators, variables, expressions, print. Take your time. If something doesn't click, the lesson it came from is worth a re-read.

</Section>

<Section label="What you should be able to do">

After lessons 11-19, you should be able to:

- Name Python's basic types (`int`, `float`, `str`, `bool`, `NoneType`).
- Use `type()` to inspect a value's type.
- Convert between types with `int()`, `float()`, `str()`, `bool()`.
- Read and write integer literals in decimal, binary, and hex.
- Avoid the float comparison trap (don't use `==`, use `math.isclose`).
- Use the three logical operators `and`, `or`, `not`, and explain truthiness.
- Index and slice strings with `s[i]` and `s[i:j]`.
- Concatenate and repeat strings with `+` and `*`.
- Understand variables as names pointing to values, not boxes holding them.
- Distinguish expressions (have values) from statements (do actions).
- Apply operator precedence (or wrap in parens when in doubt).
- Use `print()` with `sep=`, `end=`, and multiple arguments.

If any of those feel shaky, the corresponding lesson is the place to revisit.

</Section>

<Section label="The exercises">

These exercises mix several topics. Read each prompt carefully before starting.

</Section>

<Exercise
  title="The age calculator"
  prompt="Given today's year is 2026 and someone's birth year is 1989, write a program that computes and prints: 1) their age, 2) what age they'll be in 10 years, 3) the message 'old enough to vote: True' (or False) — check if their age is at least 18. Use a single print() per line, leveraging multiple arguments."
  starter={`current_year = 2026
birth_year = 1989

age = ___
age_in_10 = ___
can_vote = ___

# Print three lines:
# age: 37
# age in 10 years: 47
# old enough to vote: True
print(...)
print(...)
print(...)`}
  expected={`age: 37
age in 10 years: 47
old enough to vote: True`}
  hints={[
    "age = current_year - birth_year.",
    "age_in_10 = age + 10.",
    "can_vote = age >= 18.",
    "Each print uses two arguments separated by a comma — print() puts a space between them."
  ]}
  solution={`current_year = 2026
birth_year = 1989

age = current_year - birth_year
age_in_10 = age + 10
can_vote = age >= 18

print("age:", age)
print("age in 10 years:", age_in_10)
print("old enough to vote:", can_vote)`}
/>

<Exercise
  title="Type-aware concatenation"
  prompt="Given the variables below, build a single string `summary` that reads `Ryan, age 37, balance $1234.50` (note: the dollar sign, the comma after the name, the period at the end). Use string concatenation with proper conversions. Then print it."
  starter={`name = "Ryan"
age = 37
balance = 1234.50

# Build summary using concatenation. Convert numbers with str().
summary = ___

print(summary)`}
  expected="Ryan, age 37, balance $1234.5"
  hints={[
    "summary = name + ', age ' + str(age) + ', balance $' + str(balance).",
    "Note: 1234.50 prints as '1234.5' because trailing zeros are dropped. To control formatting, use f-strings (next chapter)."
  ]}
  solution={`name = "Ryan"
age = 37
balance = 1234.50

summary = name + ", age " + str(age) + ", balance $" + str(balance)
print(summary)`}
/>

<Exercise
  title="Conditional summary"
  prompt="Given x = 17 and y = 23, build a summary string that depends on the values: if x > y, it should say 'x is bigger'; if x < y, 'y is bigger'; if equal, 'they are equal'. Use a conditional expression (the if-else expression). Print the result."
  starter={`x = 17
y = 23

# Use a conditional expression to build the message.
# Format: VALUE_IF_TRUE if CONDITION else VALUE_IF_FALSE
# For the three-way case, you can chain: A if cond1 else (B if cond2 else C)

message = ...

print(message)`}
  expected="y is bigger"
  hints={[
    "The conditional expression: 'x is bigger' if x > y else ('y is bigger' if x < y else 'they are equal').",
    "Conditional expressions are an expression form of if-else. Useful for assigning a value based on a condition in a single line."
  ]}
  solution={`x = 17
y = 23

message = "x is bigger" if x > y else ("y is bigger" if x < y else "they are equal")
print(message)`}
/>

<Section label="What's next">

Chapter 5 (lessons 21-30) is a deep dive on strings: indexing, slicing, methods, f-strings, encoding, and the Unicode story. After that, Chapter 6 (lessons 31-45) covers control flow — if/else, while loops, for loops — and ends Volume 1.

By lesson 45, you'll be writing programs that take input, branch on conditions, and loop over data. That's a real Python programmer's toolkit. Volume 2 builds on it.

Before moving on, take a moment. If any of the previous nine lessons are still hazy, going back is worthwhile. The next chapter assumes confidence with everything we've covered.

</Section>

<Connection
  back={[{ id: '01-19-the-print-function', title: 'The Print Function in Detail' }]}
  forward={[{ id: '01-21-strings-deep-dive-intro', title: 'Strings — A Deeper Look' }]}
>

Volume 1 continues. The remaining lessons (21-45) cover strings in depth, control flow, our first functions, and a small project that pulls it all together.

</Connection>
