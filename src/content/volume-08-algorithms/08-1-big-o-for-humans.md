---
id: 08-1-big-o-for-humans
volume: volume-08-algorithms
chapter: 1
number: 1
title: "Big-O for Humans"
subtitle: "What 'this is O(n log n)' actually means, without the textbook."
estimatedMinutes: 13
prerequisites: []
keyTerms: []
exerciseCount: 1
checkpoint: false
tags: [theory, interview]
---

<Section label="The Opening">

In every coding interview you'll have, somebody will ask "what's the time complexity?" and expect an answer like "O(n)" or "O(log n)" or "O(n²)". This vocabulary — Big-O notation — is the lingua franca of algorithm discussion. It's also one of those topics where the textbook treatment is more confusing than clarifying.

This lesson teaches Big-O the way an experienced engineer thinks about it, not the way a CS textbook does. By the end you'll be comfortable saying things like "this is O(n) so it scales fine" or "this nested loop is O(n²) so it'll be slow on big inputs."

</Section>

<Section label="The fundamental question">

Big-O answers one question: **as the input gets bigger, how does the running time grow?**

Not "how fast is this on my machine right now?" — that depends on the hardware. Not "how long does it take for n=100?" — that's a single data point. The question is the *shape* of the curve. If I double the input size, does the time double? Quadruple? Stay the same? That shape is what Big-O captures.

The notation `O(f(n))` means: "the running time grows roughly like the function f(n) when n is large."

</Section>

<Section label="The common shapes">

Here are the categories that come up almost every time, ordered from fastest (best) to slowest (worst):

**O(1) — constant time.** The work doesn't depend on n at all. Examples: looking up a value in a dict by key, accessing a list at a specific index, reading a value from a fixed-length register. These don't get slower as the input grows.

**O(log n) — logarithmic.** The work grows very slowly — doubling n adds a constant amount of work. Examples: binary search, balanced binary tree operations. These are essentially as fast as constant time for any practical input size.

**O(n) — linear.** The work grows in proportion to n. If n doubles, work doubles. Examples: scanning a list once to find a value, summing all elements, calling a function on each item. The bread and butter of algorithms.

**O(n log n) — linearithmic.** Slightly slower than linear. Examples: efficient sorting (merge sort, heap sort, Python's sorted()). Still very fast for large n.

**O(n²) — quadratic.** Doubling n quadruples the work. Examples: nested loops over the same list, naive sorting (bubble sort), comparing every pair of elements. Manageable for n up to about 10,000; painfully slow beyond that.

**O(2ⁿ) — exponential.** Doubling n squares the work. Examples: brute-force solutions to combinatorial problems. Becomes astronomically slow even for moderate n. Avoid.

**O(n!) — factorial.** Worse than exponential. Comes up in problems like the traveling salesman done by brute force. Useless for n > 12 or so.

</Section>

<Section label="Practical mental model">

Translation table to use in interviews:

| Big-O | Verbal description | Practical meaning |
|-------|---------------------|-------------------|
| O(1) | constant | "doesn't depend on input size" |
| O(log n) | logarithmic | "essentially constant" |
| O(n) | linear | "proportional to input size" |
| O(n log n) | linearithmic | "fast sort speed" |
| O(n²) | quadratic | "nested loops over same data" |
| O(2ⁿ) | exponential | "blows up — avoid" |

The boundaries that matter:

- O(n²) is fine for n < 10,000 but slow for n > 100,000. If your data is small, quadratic is OK.
- O(n log n) is fine for n up to billions. Sorting a million items takes milliseconds.
- O(2ⁿ) is fine for n < 25 but exponential past that. Never use brute force on bigger problems.

The skill is recognizing the Big-O of an algorithm by looking at it. The patterns:

- **Single loop over the data:** O(n).
- **Nested loop over the same data (n × n):** O(n²).
- **Loop where the data halves each iteration:** O(log n).
- **Sort:** O(n log n).
- **Loop where you sort each iteration:** O(n × n log n) = O(n² log n).

</Section>

<Section label="Counting operations — a concrete example">

Let's count operations in three different sums-of-array implementations.

```python
# Version 1: simple loop. O(n).
def sum1(numbers):
    total = 0
    for n in numbers:
        total += n
    return total

# Operations: 1 (init) + n (additions) = n + 1 operations.
# Big-O: O(n).
```

```python
# Version 2: built-in. O(n) too — under the hood, sum() loops.
def sum2(numbers):
    return sum(numbers)

# Big-O: O(n).
```

```python
# Version 3: silly nested loop. O(n²).
def sum3(numbers):
    total = 0
    for n in numbers:
        for m in numbers:
            if m == n:
                total += n
                break
    return total

# Operations: roughly n² (the outer loop runs n times,
# each iteration does an inner loop that runs up to n times).
# Big-O: O(n²).
```

The first two are O(n). The third is O(n²) — pointlessly slow for the same task. When solving a problem, ask: am I doing more work than necessary? Most of the time the answer is "yes, you nested where you didn't need to."

</Section>

<Section label="Constants don't matter (in Big-O)">

Big-O ignores constants and lower-order terms. `O(2n)` and `O(n)` are the same. `O(n + 100)` is `O(n)`. `O(n² + n)` is `O(n²)`. The shape is what matters; the multiplier doesn't.

This sometimes confuses beginners because in real life, constants matter. A 100x speedup matters. But for Big-O analysis, we care about *how the algorithm scales*, not its absolute speed. Two O(n) algorithms might differ by 100x in real performance, but they're both O(n).

In practice you say things like:
- "Theoretically O(n), but the constant is high — there's a lot of work per element."
- "It's O(n²) but n is always small (< 10), so it's effectively constant."

The Big-O classification and the real-world performance are related but distinct. The interview answer is the Big-O.

</Section>

<Callout kind="info" title="Worst case, average case, best case">

Big-O usually refers to the *worst case* — the time when the input is structured in the worst possible way. Some algorithms have different best/average/worst:

- **Quicksort** is O(n log n) average, O(n²) worst case (when the input is already sorted).
- **Hash dict lookup** is O(1) average, O(n) worst case (when many keys collide).
- **Linear search** is O(1) best (item is first), O(n) worst (item is last or absent).

When someone asks "what's the time complexity?" they usually mean worst case unless otherwise specified.

</Callout>

<Section label="Space complexity">

Big-O also describes memory usage — *space complexity*. The same notation:

- O(1) space — uses a constant amount of memory regardless of input.
- O(n) space — uses memory proportional to input.
- O(n²) space — uses quadratic memory.

A loop that sums a list with a single accumulator is O(1) space. Building a new list of squares is O(n) space. Building a 2D matrix of pairs is O(n²) space.

When you describe an algorithm, people sometimes ask both: "what's the time and space complexity?"

</Section>

<Exercise
  title="Identify the Big-O"
  prompt="For each function below, decide whether it's O(1), O(n), O(n²), or O(log n). Print the answers as strings."
  starter={`# 1. Get the first element.
def first(lst):
    return lst[0]

# 2. Sum all elements.
def total(lst):
    return sum(lst)

# 3. Find duplicates with nested loops.
def has_duplicates(lst):
    for i in range(len(lst)):
        for j in range(i + 1, len(lst)):
            if lst[i] == lst[j]:
                return True
    return False

# 4. Binary search (assumes sorted).
def binary_search(lst, target):
    lo, hi = 0, len(lst) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if lst[mid] == target:
            return mid
        elif lst[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Fill in the answers (as strings).
print("first:", "O(...)")
print("total:", "O(...)")
print("has_duplicates:", "O(...)")
print("binary_search:", "O(...)")`}
  expected={`first: O(1)
total: O(n)
has_duplicates: O(n^2)
binary_search: O(log n)`}
  hints={[
    "first does one operation regardless of n. O(1).",
    "total scans the whole list once. O(n).",
    "has_duplicates has nested loops. O(n²).",
    "binary_search halves the search space each iteration. O(log n)."
  ]}
  solution={`# 1. O(1) — single operation.
# 2. O(n) — single pass.
# 3. O(n²) — nested loop.
# 4. O(log n) — halves each step.

print("first:", "O(1)")
print("total:", "O(n)")
print("has_duplicates:", "O(n^2)")
print("binary_search:", "O(log n)")`}
/>

<InterviewPhrase setup="If asked 'walk me through the time complexity of your solution,' something like this works.">

Looking at the loop structure, the outer iteration runs n times, and inside we're doing a constant-time hash-map lookup, so the total work is O(n). Space-wise, the hash map can grow to hold up to n keys, so that's O(n) auxiliary space. We could trade off — sort first and use two pointers for O(n log n) time and O(1) space — but the hash-map approach is faster for this constraint.

</InterviewPhrase>

<Connection
  forward={[{ id: '08-2-hash-maps-deep-dive', title: 'Hash Maps — Why They Win' }]}
>

Next: hash maps. The single most important data structure in coding interviews and the answer to a huge fraction of "find a thing fast" problems.

</Connection>
