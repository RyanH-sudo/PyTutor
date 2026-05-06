---
id: 03-1-lists-introduction
volume: volume-03-containers
chapter: 1
number: 1
title: "Lists — The Most Useful Container"
subtitle: "Ordered, mutable, and the workhorse of Python."
estimatedMinutes: 13
prerequisites: []
keyTerms: [list, mutable]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A *list* is an ordered collection of items. Items can be any type — integers, strings, other lists, mixed. Lists are mutable: you can add, remove, and change items after creation. Lists are the most flexible and most-used container in Python.

This is the first lesson of Volume 3. We'll cover all the major containers (`list`, `tuple`, `dict`, `set`) in turn. Lists come first because they're the most general.

</Section>

<EtymologyCard
  term="list"
  origin="Old English / Old French"
  rootForm="liste"
  rootMeaning="a strip, a series"
  story="From Old French 'liste' (a strip, an enumeration) and Old English 'list' (a strip of cloth or paper). The 'enumeration' sense — 'a list of names' — emerged in the 1500s. In computing, 'list' has been the standard term for ordered sequences since Lisp (1958). Lisp's name is itself an abbreviation: LISt Processing."
  insight="A list is a strip of items in order. The metaphor is exact: like a written list, items have positions; you read them in sequence; you can add to either end."
/>

<Section label="Creating a list">

```python
empty = []
fruits = ["apple", "banana", "cherry"]
mixed = [1, "two", 3.0, True, None]
nested = [[1, 2], [3, 4], [5, 6]]

# From an iterable:
chars = list("hello")           # ['h', 'e', 'l', 'l', 'o']
nums = list(range(5))           # [0, 1, 2, 3, 4]
```

The `[...]` syntax is the *list literal*. Items are separated by commas. The list can hold any combination of types.

</Section>

<Section label="Indexing and slicing">

Lists support all the sequence operations you learned for strings.

```python
fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])      # "apple"
print(fruits[-1])     # "date"
print(fruits[1:3])    # ["banana", "cherry"]
print(fruits[::-1])   # ["date", "cherry", "banana", "apple"]
print(len(fruits))    # 4
print("apple" in fruits)  # True
```

Indexing a list returns the item itself (any type), not a one-character list. Slicing returns a new list.

</Section>

<Section label="Mutating a list">

This is where lists differ from strings. You can modify a list in place.

```python
fruits = ["apple", "banana", "cherry"]

# Change an item:
fruits[0] = "apricot"            # ["apricot", "banana", "cherry"]

# Append to end:
fruits.append("date")            # ["apricot", "banana", "cherry", "date"]

# Insert at index:
fruits.insert(0, "almond")       # ["almond", "apricot", ...]

# Extend with another iterable:
fruits.extend(["elderberry", "fig"])

# Remove by value (first occurrence):
fruits.remove("apricot")

# Remove by index, returning the item:
last = fruits.pop()              # removes and returns last item
first = fruits.pop(0)            # removes and returns first item

# Delete by index without returning:
del fruits[2]

# Clear:
fruits.clear()                   # []
```

The methods that modify in place don't return the list — they return None. This is on purpose: you call them for the side effect, not to chain. `fruits.append("x")` modifies `fruits`; the return value is None.

</Section>

<CodeRunner
  initial={`# Lists in action.

# Build a list.
todos = ["wake up", "brush teeth", "code"]
print("initial:", todos)

# Add items.
todos.append("lunch")
todos.append("more code")
print("after appends:", todos)

# Insert at the front.
todos.insert(0, "snooze alarm")
print("after insert:", todos)

# Remove the last item.
last = todos.pop()
print("removed:", last)
print("after pop:", todos)

# Length.
print("count:", len(todos))`}
  caption="Notice how each operation modifies the same list. We're never assigning to `todos` again — just calling methods that change it."
/>

<Section label="List concatenation and repetition">

Like strings, lists support `+` and `*`:

```python
[1, 2] + [3, 4]      # [1, 2, 3, 4] — new list
[0] * 5              # [0, 0, 0, 0, 0]
```

These create *new* lists; the originals are unchanged. This is a different operation from `extend`, which modifies in place.

```python
# Different effects:
a = [1, 2]
a.extend([3, 4])      # a is now [1, 2, 3, 4]; modified in place

a = [1, 2]
b = a + [3, 4]        # b is [1, 2, 3, 4]; a is still [1, 2]
```

</Section>

<Section label="Common patterns">

**Build a list with a loop:**

```python
squares = []
for n in range(10):
    squares.append(n ** 2)
```

**Filter:**

```python
big = []
for n in numbers:
    if n > 100:
        big.append(n)
```

**Find max:**

```python
max_val = numbers[0]
for n in numbers:
    if n > max_val:
        max_val = n
```

(Built-ins `max()` and `min()` do this for you.)

**Sum:**

```python
total = sum(numbers)
```

</Section>

<Section label="List comprehensions — a preview">

Python has a beautiful syntax for building lists:

```python
squares = [n ** 2 for n in range(10)]
big = [n for n in numbers if n > 100]
upper_names = [name.upper() for name in names]
```

These are *list comprehensions*. They replace explicit loops with a single line. They're idiomatic Python and you'll see them everywhere. We'll do them properly later in Volume 3.

</Section>

<Exercise
  title="Build a list with operations"
  prompt="Start with an empty list. Append the integers 1 through 5. Then double the value at index 2. Then remove the last item. Print the result."
  starter={`nums = []

# Append 1..5
for i in ___:
    nums.append(i)

# Double the value at index 2.
nums[2] = nums[2] * 2

# Remove the last item.
nums.pop()

print(nums)`}
  expected="[1, 2, 6, 4]"
  hints={[
    "range(1, 6) gives 1..5.",
    "nums[2] starts as 3, becomes 6.",
    "After pop, the last item (5) is removed."
  ]}
  solution={`nums = []

for i in range(1, 6):
    nums.append(i)

nums[2] = nums[2] * 2
nums.pop()

print(nums)`}
/>

<Exercise
  title="Find the longest word"
  prompt="Given a list of strings, find and print the longest one. If multiple are tied, print the first one of that length."
  starter={`words = ["cat", "elephant", "ant", "dog", "alligator", "bear"]

longest = ___
for w in words:
    if len(w) > len(longest):
        longest = w

print(longest)`}
  expected="alligator"
  hints={[
    "Initialize longest = '' (empty string) so any word beats it.",
    "Or initialize longest = words[0] and start the loop at words[1:]."
  ]}
  solution={`words = ["cat", "elephant", "ant", "dog", "alligator", "bear"]

longest = ""
for w in words:
    if len(w) > len(longest):
        longest = w

print(longest)`}
/>

<Connection
  forward={[{ id: '03-2-dicts-introduction', title: 'Dictionaries — Key-Value Mapping' }]}
>

Next: dictionaries. The most important data structure in Python after strings.

</Connection>
