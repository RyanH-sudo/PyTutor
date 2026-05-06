---
id: 01-29-while-loops
volume: volume-01-foundations
chapter: 6
number: 29
title: "While Loops"
subtitle: "Repeat until a condition becomes false."
estimatedMinutes: 10
prerequisites: [01-28-control-flow-intro]
keyTerms: []
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A *loop* is code that repeats. Python has two loop forms: `while` and `for`. We start with `while` because it's simpler conceptually.

A `while` loop says: *as long as this condition is true, keep running this code*. Each repetition is called an *iteration*. The loop ends when the condition becomes false (or you break out of it).

</Section>

<Section label="The basic while">

```python
while condition:
    # body — runs as long as condition is truthy
    do_something()
```

Example:

```python
count = 0
while count < 5:
    print(count)
    count = count + 1
```

This prints 0, 1, 2, 3, 4. How it runs:

1. Check condition: `count < 5` → `0 < 5` → True. Enter body.
2. Print `0`. Increment to `1`.
3. Re-check: `1 < 5` → True. Enter body.
4. Print `1`. Increment to `2`.
5. ...
6. After printing `4`, increment to `5`.
7. Re-check: `5 < 5` → False. Exit loop.

The condition is checked at the *top* of the loop, before each iteration including the first. If the condition is false to begin with, the body never runs.

</Section>

<CodeRunner
  initial={`# Counting from 0 to 4.

count = 0
while count < 5:
    print(count)
    count = count + 1

print("done")`}
  caption="Five iterations, then the condition becomes false and we exit."
/>

<Section label="The infinite-loop trap">

Forgetting to update the variable that affects the condition produces an infinite loop:

```python
count = 0
while count < 5:
    print(count)
    # forgot: count = count + 1
```

This prints 0 forever. In a terminal you'd press Ctrl+C to interrupt. In our editor, Pyodide will eventually time out.

The discipline: every `while` loop should change something each iteration that moves the condition toward becoming false. If the body doesn't move toward an exit, the loop is infinite (and probably wrong).

</Section>

<Section label="Common while patterns">

**Counting** (often replaced by `for` loops; we'll see):

```python
i = 0
while i < n:
    process(i)
    i += 1
```

**Reading until a sentinel:**

```python
line = input()
while line != "quit":
    process(line)
    line = input()
```

**Searching:**

```python
i = 0
while i < len(items) and items[i] != target:
    i += 1
if i < len(items):
    print(f"found at index {i}")
else:
    print("not found")
```

**The "while True" with explicit break:**

```python
while True:
    line = input()
    if line == "quit":
        break
    process(line)
```

The `while True` pattern is common when the exit condition is clearer to express in the middle of the loop than at the top.

</Section>

<Section label="break and continue">

Two keywords modify loop flow:

- **`break`** exits the loop immediately.
- **`continue`** skips the rest of this iteration and goes to the next.

```python
# break example: stop on first match.
n = 0
while n < 100:
    if n * n > 50:
        print(f"first n where n² > 50: {n}")
        break
    n += 1

# continue example: skip even numbers.
n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue
    print(n)   # prints odd numbers 1, 3, 5, 7, 9
```

`break` and `continue` only affect the innermost loop. We'll cover nested loops later.

</Section>

<CodeRunner
  initial={`# A simple summing loop.

total = 0
n = 1

while n <= 10:
    total = total + n
    n = n + 1

print(f"sum 1 to 10: {total}")    # 55

# Find first power of 2 > 1000.
p = 1
while p <= 1000:
    p = p * 2

print(f"first power of 2 > 1000: {p}")    # 1024`}
  caption="Two patterns: accumulating into a total, and growing a value until it crosses a threshold."
/>

<Section label="The walrus operator">

Python 3.8 introduced `:=`, the *walrus operator* (so named because `:=` looks like a walrus). It's an assignment expression — assign and return the value in a single expression.

The classic use is in while loops:

```python
# Without walrus:
line = input()
while line != "quit":
    process(line)
    line = input()

# With walrus:
while (line := input()) != "quit":
    process(line)
```

The walrus assigns and returns. It's great for "read-and-test" patterns. It's modern Python; you'll see it in current code, but it's optional.

</Section>

<Exercise
  title="Sum until a threshold"
  prompt="Sum integers starting from 1 until the running total exceeds 100. Print the count of numbers added and the final total."
  starter={`n = 1
total = 0

while ___:
    total += n
    n += 1

print(f"added {n - 1} numbers, total {total}")`}
  expected="added 14 numbers, total 105"
  hints={[
    "Loop while total <= 100. We exit when total exceeds 100."
  ]}
  solution={`n = 1
total = 0

while total <= 100:
    total += n
    n += 1

print(f"added {n - 1} numbers, total {total}")`}
/>

<Exercise
  title="Find the first multiple"
  prompt="Find the smallest n where n is a multiple of both 7 and 11. Use a while loop incrementing n until you find one."
  starter={`n = 1

while ___:
    n += 1

print(f"first multiple of 7 and 11: {n}")`}
  expected="first multiple of 7 and 11: 77"
  hints={[
    "Condition: keep going while NOT (n is a multiple of 7 AND n is a multiple of 11). i.e., while n % 7 != 0 or n % 11 != 0."
  ]}
  solution={`n = 1

while n % 7 != 0 or n % 11 != 0:
    n += 1

print(f"first multiple of 7 and 11: {n}")`}
/>

<Connection
  back={[{ id: '01-28-control-flow-intro', title: 'Control Flow — Making Decisions' }]}
  forward={[{ id: '01-30-for-loops', title: 'For Loops and the Iteration Protocol' }]}
>

Next: for loops. The more idiomatic way to iterate in Python — over sequences, ranges, and any iterable.

</Connection>
