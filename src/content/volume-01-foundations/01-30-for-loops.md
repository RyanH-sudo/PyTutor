---
id: 01-30-for-loops
volume: volume-01-foundations
chapter: 6
number: 30
title: "For Loops and the Iteration Protocol"
subtitle: "The loop you'll use most. Iterate over anything iterable."
estimatedMinutes: 11
prerequisites: [01-29-while-loops]
keyTerms: [iterable]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

The Python `for` loop is unlike the `for` you might know from C or Java. There's no counter-based syntax (`for (int i = 0; i < 10; i++)`). Instead, Python's `for` iterates over a *collection* — taking each item in turn.

This is more general and more pleasant. Anything *iterable* — strings, lists, tuples, dictionaries, files, ranges, generators — can be looped over with the same syntax.

</Section>

<Section label="The basic for">

```python
for item in iterable:
    # body — runs once per item, with `item` set to each element
    process(item)
```

Example:

```python
for letter in "Python":
    print(letter)
# P
# y
# t
# h
# o
# n

for n in [10, 20, 30]:
    print(n)
# 10
# 20
# 30
```

Reading the syntax: "*for each item in this iterable, run the body with that item.*" The variable name (`letter`, `n`) is yours to choose; it's bound to each successive item.

</Section>

<Section label="range — the counter substitute">

When you do need counting (like a traditional `for` loop), use `range()`:

```python
for i in range(5):
    print(i)
# 0, 1, 2, 3, 4

for i in range(2, 8):
    print(i)
# 2, 3, 4, 5, 6, 7

for i in range(0, 20, 3):
    print(i)
# 0, 3, 6, 9, 12, 15, 18
```

`range(stop)` produces 0, 1, ..., stop-1.
`range(start, stop)` produces start, start+1, ..., stop-1.
`range(start, stop, step)` adds step each time.

`range()` doesn't return a list — it returns a special iterable that produces values lazily. This means `range(10**9)` is fine; it doesn't allocate a billion integers. We'll cover lazy iteration in Volume 5.

</Section>

<CodeRunner
  initial={`# range patterns.

# Count to 5.
for i in range(5):
    print(i, end=" ")
print()

# Count from 10 to 14.
for i in range(10, 15):
    print(i, end=" ")
print()

# Even numbers.
for i in range(0, 11, 2):
    print(i, end=" ")
print()

# Countdown.
for i in range(5, 0, -1):
    print(i, end=" ")
print()`}
  caption="range with a negative step lets you count down."
/>

<Section label="enumerate — index AND value">

Often you want both the index and the value. `enumerate()` gives you both:

```python
fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry
```

`enumerate()` returns pairs (index, value) for each item. The `i, fruit = ...` syntax is *tuple unpacking* — we'll see it formally in Volume 3.

By default, indices start at 0. You can change with `enumerate(fruits, start=1)` to start at 1, useful for human-readable numbering.

</Section>

<Section label="Iterating over a dictionary">

When you `for x in some_dict:`, you iterate over the *keys*:

```python
ages = {"Ryan": 37, "Sarah": 28, "Alex": 42}

for name in ages:
    print(name)
# Ryan, Sarah, Alex
```

To get keys and values, use `.items()`:

```python
for name, age in ages.items():
    print(f"{name} is {age}")
# Ryan is 37
# Sarah is 28
# Alex is 42
```

`.values()` gives just the values. We'll cover dictionaries fully in Volume 3.

</Section>

<Section label="Common loop patterns">

**Sum:**

```python
total = 0
for n in numbers:
    total += n
```

**Find:**

```python
found = None
for n in numbers:
    if n > 100:
        found = n
        break
```

**Filter:**

```python
big = []
for n in numbers:
    if n > 100:
        big.append(n)
```

**Build a string:**

```python
message = ""
for word in words:
    message += word + " "
message = message.strip()
```

(Better: `" ".join(words)`. We'll see why in Volume 3.)

**Count:**

```python
count = 0
for ch in text:
    if ch in "aeiou":
        count += 1
```

These patterns repeat constantly. Memorize the shapes.

</Section>

<CodeRunner
  initial={`# Common patterns in action.

numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# Sum.
total = 0
for n in numbers:
    total += n
print(f"sum: {total}")

# Max.
max_val = numbers[0]
for n in numbers:
    if n > max_val:
        max_val = n
print(f"max: {max_val}")

# Count of a specific value.
count = 0
for n in numbers:
    if n == 5:
        count += 1
print(f"count of 5s: {count}")

# Build new list of squares.
squares = []
for n in numbers:
    squares.append(n ** 2)
print(f"squares: {squares}")`}
  caption="Each pattern is a different operation: sum (accumulate), max (track), count (filter+count), build (collect into new list)."
/>

<Exercise
  title="Sum of squares"
  prompt="Compute the sum of squares of the integers 1 through 10 (1² + 2² + ... + 10²). Use a for loop with range. The expected answer is 385."
  starter={`total = 0

for i in ___:
    total += i ** 2

print(f"sum of squares: {total}")`}
  expected="sum of squares: 385"
  hints={[
    "Use range(1, 11) for integers 1 through 10."
  ]}
  solution={`total = 0
for i in range(1, 11):
    total += i ** 2
print(f"sum of squares: {total}")`}
/>

<Exercise
  title="Reverse a string with a loop"
  prompt="Without using slicing, build the reverse of 'hello' character by character with a for loop. (Yes, slicing `[::-1]` is the right way; this exercise is to practice loops.) Print the result."
  starter={`text = "hello"
reversed_text = ""

for ch in text:
    reversed_text = ___

print(reversed_text)`}
  expected="olleh"
  hints={[
    "Each new character goes at the *front* of the result: reversed_text = ch + reversed_text."
  ]}
  solution={`text = "hello"
reversed_text = ""

for ch in text:
    reversed_text = ch + reversed_text

print(reversed_text)`}
/>

<Section label="What's still ahead in Volume 1">

Lessons 31-45 will cover:

- Nested loops and the patterns they produce
- The `for-else` and `while-else` constructs (Python's curiosity)
- Defining your first functions with `def`
- Function arguments, return values, defaults
- Local and global variables (scope basics)
- A small project pulling it together

After that, Volume 2 begins with names, values, memory, and the deep types — the foundation for everything else.

</Section>

<Connection
  back={[{ id: '01-29-while-loops', title: 'While Loops' }]}
  forward={[]}
>

That's lesson 30 — the end of the deep-content first pass for Volume 1. Lessons 31-45 are planned and will be authored as the curriculum extends. The content created so far is enough to take you from zero to comfortable with Python's basics: types, operators, strings, control flow.

</Connection>
