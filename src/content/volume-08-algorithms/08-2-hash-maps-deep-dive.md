---
id: 08-2-hash-maps-deep-dive
volume: volume-08-algorithms
chapter: 1
number: 2
title: "Hash Maps — Why They Win"
subtitle: "The data structure behind 60% of interview problems."
estimatedMinutes: 14
prerequisites: [08-1-big-o-for-humans]
keyTerms: [hash map]
exerciseCount: 2
checkpoint: false
tags: [theory, interview, practice]
---

<Section label="The Opening">

If you had to bet on one data structure being the answer to a coding interview problem, you'd bet on the hash map. It comes up over and over: counting things, looking up things by key, detecting duplicates, grouping things, joining datasets. Once you have the hash-map instinct, a huge fraction of problems become straightforward.

In Python, hash maps are called *dicts*. We met them in Volume 3. This lesson goes deeper into when and why to reach for one.

</Section>

<Section label="What a hash map gives you">

The fundamental promise of a hash map is **O(1) lookup, O(1) insertion, O(1) deletion** — on average. Compared to a list, where you scan O(n) to find a value, this is a transformation.

Consider: you have 10,000 customer records and you need to look up customers by email. With a list, each lookup takes time proportional to the list size — for a million lookups, that's 10 billion comparisons. With a dict keyed by email, each lookup is O(1) — for a million lookups, that's a million constant-time operations. The dict approach is roughly 10,000x faster.

The cost: the dict uses extra memory (the hash structure), and the keys must be *hashable* (immutable types). For nearly all interview problems, the trade is overwhelmingly worthwhile.

</Section>

<Section label="The hash map mental model">

A hash map works by:

1. Taking the key (e.g., the string `"ryan@example.com"`).
2. Computing its *hash* — a number derived from the key's content.
3. Using the hash to find a *bucket* (a slot in an internal array).
4. Storing the value in that bucket.

When you look up the key later, the same hash function points to the same bucket, and the value is right there. No scanning. Constant time.

Collisions (when two different keys produce the same hash) are handled by storing multiple entries in the same bucket and scanning the small list. With a good hash function, collisions are rare and the amortized cost stays O(1).

You don't usually need to think about this internal mechanism. You just need to know: dict operations are O(1), and that's the gold of algorithm work.

</Section>

<Section label="The classic interview problem: Two Sum">

Probably the most-asked interview question in the world. The problem:

> Given an array of integers and a target, return the indices of two numbers that add up to the target. Assume exactly one solution.

The naive approach is two nested loops — O(n²):

```python
def two_sum_naive(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
```

The hash-map approach is O(n):

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

How it works:
1. As we walk through the list, for each number we check: have we already seen the *complement* (target - num)?
2. If yes, we found the pair.
3. If no, we record this number and its index in the dict.

One pass through the list. Each step is constant time (dict insert and lookup). Total: O(n). The shift from O(n²) to O(n) is the dictum of "use a hash map."

</Section>

<CodeRunner
  initial={`def two_sum(nums, target):
    """Find two indices whose values sum to target. O(n) time, O(n) space."""
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


# Test cases.
print(two_sum([2, 7, 11, 15], 9))    # [0, 1] — 2 + 7 = 9
print(two_sum([3, 2, 4], 6))         # [1, 2] — 2 + 4 = 6
print(two_sum([3, 3], 6))             # [0, 1] — 3 + 3 = 6`}
  caption="The classic Two Sum solution. Walk through it on paper at least once: for [2,7,11,15] target=9, when we hit 7, the complement is 2, which we already saw at index 0. Done."
/>

<Section label="The 'use a hash map' patterns">

Hash maps solve four broad problem shapes:

**1. Existence/membership.** "Have I seen this before?"

```python
seen = set()         # set is hash-map-like, just keys
for x in items:
    if x in seen:
        print(f"duplicate: {x}")
    seen.add(x)
```

**2. Counting.** "How many times does each thing occur?"

```python
counts = {}
for x in items:
    counts[x] = counts.get(x, 0) + 1
# Or: from collections import Counter; counts = Counter(items)
```

**3. Grouping.** "Group items by some key."

```python
groups = {}
for item in items:
    key = item.category
    if key not in groups:
        groups[key] = []
    groups[key].append(item)
# Or: from collections import defaultdict; groups = defaultdict(list); ...
```

**4. Lookup tables.** "Map an input to an output."

```python
day_names = {0: "Mon", 1: "Tue", 2: "Wed", ...}
print(day_names[3])    # "Thu"
```

When you see a problem that fits one of these shapes, dict is almost always the right answer.

</Section>

<Section label="The 'precompute then query' pattern">

Many problems get faster with a one-pass precomputation that builds a dict, followed by O(1) queries.

Example: "Given a list of words, find all anagram groups."

Naive: compare every word against every other word. O(n² × k) where k is word length.

Hash-map: for each word, compute a *canonical form* (sorted letters), use it as a key, group words by canonical form. O(n × k log k) total.

```python
def group_anagrams(words):
    groups = {}
    for word in words:
        key = "".join(sorted(word))
        if key not in groups:
            groups[key] = []
        groups[key].append(word)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

The trick: every anagram of "eat" sorts to "aet". So they all share the same key. We group in one pass.

This pattern — compute a canonical form, group by it — comes up in many problems.

</Section>

<Exercise
  title="Find the first non-repeating character"
  prompt="Given a string, find the index of the first character that doesn't repeat. If all characters repeat, return -1. Do it in O(n) time using a dict."
  starter={`def first_unique(s):
    """Return index of first non-repeating character, or -1."""
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1


print(first_unique("leetcode"))    # 0 — 'l' is unique
print(first_unique("loveleetcode")) # 2 — 'v' is unique
print(first_unique("aabbcc"))       # -1 — all repeat`}
  expected={`0
2
-1`}
  hints={[
    "Two passes through the string. First pass: count each character. Second pass: find the first one with count 1.",
    "Total: O(n) time, O(k) space where k is the alphabet size."
  ]}
  solution={`def first_unique(s):
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1


print(first_unique("leetcode"))
print(first_unique("loveleetcode"))
print(first_unique("aabbcc"))`}
/>

<Exercise
  title="Two-sum follow-up: contains duplicate within k"
  prompt="Given a list of integers and a window size k, return True if any two equal values are within k indices of each other. Use a dict mapping value to last-seen index."
  starter={`def contains_nearby_duplicate(nums, k):
    """Return True if there are nums[i] == nums[j] with |i - j| <= k."""
    last_seen = {}
    for i, num in enumerate(nums):
        if num in last_seen and i - last_seen[num] <= k:
            return True
        last_seen[num] = i
    return False


print(contains_nearby_duplicate([1, 2, 3, 1], 3))    # True
print(contains_nearby_duplicate([1, 0, 1, 1], 1))    # True
print(contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2))  # False`}
  expected={`True
True
False`}
  hints={[
    "Walk through, recording the last index each value was seen at.",
    "If we see a value again and its previous index is within k, return True."
  ]}
  solution={`def contains_nearby_duplicate(nums, k):
    last_seen = {}
    for i, num in enumerate(nums):
        if num in last_seen and i - last_seen[num] <= k:
            return True
        last_seen[num] = i
    return False


print(contains_nearby_duplicate([1, 2, 3, 1], 3))
print(contains_nearby_duplicate([1, 0, 1, 1], 1))
print(contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2))`}
/>

<InterviewPhrase setup="When asked to solve a problem and you spot the hash-map shape, something like this works.">

I notice this is essentially a 'find this thing fast' problem — for each element I'm asking 'have I seen something related to this before?' That's the hash-map signal. By keeping a dict of what we've seen, we trade O(n) extra space for O(n) total time instead of O(n²). Let me code that up.

</InterviewPhrase>

<Connection
  back={[{ id: '08-1-big-o-for-humans', title: 'Big-O for Humans' }]}
>

Volume 8 continues with two-pointer techniques, sliding window, recursion, BFS, DFS, dynamic programming — all the patterns the 24 interview problems test.

</Connection>
