---
id: 03-2-dicts-introduction
volume: volume-03-containers
chapter: 1
number: 2
title: "Dictionaries — Key-Value Mapping"
subtitle: "The most important data structure in idiomatic Python."
estimatedMinutes: 13
prerequisites: [03-1-lists-introduction]
keyTerms: [dictionary]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A *dictionary* (or *dict*) maps keys to values. Where a list is indexed by integer position, a dict is indexed by anything hashable — usually strings, sometimes integers or tuples. Dicts are mutable, very fast for lookup, and the most-used non-string data structure in Python.

If you're picking one container to know inside-out, pick the dict.

</Section>

<EtymologyCard
  term="dictionary"
  origin="Latin"
  rootForm="dictionarium"
  rootMeaning="a collection of words"
  story="From Latin 'dictionarium' (a collection of words), from 'dictio' (saying, word). A printed dictionary maps words to their definitions — keys to values, in modern terms. Programming inherited the metaphor: a dict is a 'dictionary' in the abstract sense, a structure that lets you look up a value by its key."
  entryToComputing="Different languages call this structure different things: dictionary in Python and Smalltalk, hashmap in Java, object in JavaScript, hash in Perl and Ruby, associative array in PHP. The data structure is universal; the names vary."
  insight="The original sense — looking up a definition by a word — is exactly what a Python dict does. `phonebook['Ryan']` reads 'look up Ryan in the phonebook,' just like flipping to R in a printed directory."
/>

<Section label="Creating a dict">

```python
empty = {}
phonebook = {"Ryan": "555-1234", "Sarah": "555-5678"}
mixed_keys = {1: "one", "two": 2, (3, 4): "tuple key"}

# From a list of pairs:
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)            # {"a": 1, "b": 2, "c": 3}

# From keyword arguments:
config = dict(host="localhost", port=8080, debug=True)
```

The `{key: value, ...}` syntax is the *dict literal*. Keys must be *hashable* — meaning immutable types: strings, ints, floats, tuples (with hashable contents). Lists, dicts, and sets cannot be keys.

</Section>

<Section label="Reading and writing">

```python
phonebook = {"Ryan": "555-1234", "Sarah": "555-5678"}

# Read:
print(phonebook["Ryan"])        # "555-1234"

# Write (or update):
phonebook["Alex"] = "555-9999"  # adds new key
phonebook["Ryan"] = "555-0000"  # updates existing

# Read with default — doesn't error if key is missing:
print(phonebook.get("Bob"))           # None
print(phonebook.get("Bob", "n/a"))    # "n/a"

# Delete:
del phonebook["Sarah"]

# Check membership:
print("Ryan" in phonebook)      # True
```

Reading with `[key]` raises `KeyError` if the key is missing. Reading with `.get(key)` returns `None` (or a default) instead. Use `[key]` when you're sure the key is there; use `.get()` when "missing" is a normal possibility.

</Section>

<CodeRunner
  initial={`# Dict basics.

ages = {"Ryan": 37, "Sarah": 28, "Alex": 42}

# Read.
print("Ryan's age:", ages["Ryan"])

# Add and update.
ages["Bob"] = 50
ages["Ryan"] = 38           # birthday!

# Use .get() to avoid KeyError.
print("Carol's age:", ages.get("Carol", "unknown"))

# Iterate.
for name, age in ages.items():
    print(f"{name}: {age}")`}
  caption="The dict.items() method returns (key, value) pairs. We unpack into name and age. This is the most common iteration pattern."
/>

<Section label="Dict methods">

```python
d = {"a": 1, "b": 2, "c": 3}

d.keys()              # dict_keys(['a', 'b', 'c'])
d.values()            # dict_values([1, 2, 3])
d.items()             # dict_items([('a', 1), ('b', 2), ('c', 3)])

d.get("a")            # 1
d.get("z", 0)         # 0 — default if key missing

d.pop("a")            # 1 — removes and returns
d.pop("z", None)      # None — default if key missing

d.update({"x": 10, "y": 20})    # add/update from another dict
d.setdefault("z", 99)            # set z=99 if not present

d.clear()                         # empty the dict

len(d)                            # number of entries
```

The most common ones are `.get()`, `.items()`, `.keys()`, and `.update()`. The others are useful when needed.

</Section>

<Section label="Iterating">

```python
d = {"name": "Ryan", "age": 37, "job": "engineer"}

# By default, iteration gives keys:
for k in d:
    print(k)
# name, age, job

# Better: use .items() to get keys AND values:
for k, v in d.items():
    print(f"{k}: {v}")
# name: Ryan
# age: 37
# job: engineer

# Or values only:
for v in d.values():
    print(v)
```

In Python 3.7+, dicts preserve insertion order. The order you add keys is the order you'll see when iterating. (Earlier Python versions made no such guarantee.)

</Section>

<Section label="Common dict patterns">

**Counting:**

```python
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
```

(Better with `collections.Counter`, which we'll see in Volume 7.)

**Grouping:**

```python
by_category = {}
for item in items:
    cat = item["category"]
    if cat not in by_category:
        by_category[cat] = []
    by_category[cat].append(item)
```

**Lookup tables:**

```python
day_names = {0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat", 6: "Sun"}
print(day_names[3])    # "Thu"
```

**Configuration:**

```python
config = {"host": "localhost", "port": 8080, "debug": True}
host = config["host"]
```

</Section>

<Section label="Dict comprehensions">

Like list comprehensions, but for dicts:

```python
squares = {n: n**2 for n in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

names = ["Ryan", "Sarah", "Alex"]
name_lengths = {n: len(n) for n in names}
# {"Ryan": 4, "Sarah": 5, "Alex": 4}
```

We'll cover comprehensions properly later. For now, the shape: `{key_expr: value_expr for var in iterable}`.

</Section>

<Exercise
  title="Word frequency"
  prompt="Count how many times each word appears in the sentence below. Print each word and its count, one per line."
  starter={`text = "the quick brown fox jumps over the lazy dog the the"

words = text.split()
counts = {}

for w in words:
    counts[w] = counts.get(w, 0) + 1

for word, count in counts.items():
    print(f"{word}: {count}")`}
  expected_contains="the: 4"
  hints={[
    "split() breaks the text into a list of words.",
    ".get(w, 0) returns the current count or 0 if not seen yet."
  ]}
  solution={`text = "the quick brown fox jumps over the lazy dog the the"

words = text.split()
counts = {}

for w in words:
    counts[w] = counts.get(w, 0) + 1

for word, count in counts.items():
    print(f"{word}: {count}")`}
/>

<Exercise
  title="Build a phonebook"
  prompt="Create a phonebook dict with three entries. Add a fourth. Update one. Print the whole phonebook with name on the left and number on the right, aligned in columns."
  starter={`phonebook = {
    "Ryan": "555-1234",
    "Sarah": "555-5678",
    "Alex": "555-9999",
}

# Add an entry.
phonebook["Maria"] = "555-1111"

# Update an entry.
phonebook["Ryan"] = "555-0000"

# Print all, aligned.
for name, number in phonebook.items():
    print(f"{name:<10} {number}")`}
  expected={`Ryan       555-0000
Sarah      555-5678
Alex       555-9999
Maria      555-1111`}
  solution={`phonebook = {
    "Ryan": "555-1234",
    "Sarah": "555-5678",
    "Alex": "555-9999",
}

phonebook["Maria"] = "555-1111"
phonebook["Ryan"] = "555-0000"

for name, number in phonebook.items():
    print(f"{name:<10} {number}")`}
/>

<Connection
  back={[{ id: '03-1-lists-introduction', title: 'Lists — The Most Useful Container' }]}
>

Volume 3 continues with tuples, sets, comprehensions in detail, and the decision tree for picking the right container.

</Connection>
