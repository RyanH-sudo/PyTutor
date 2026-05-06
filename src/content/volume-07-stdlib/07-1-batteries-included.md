---
id: 07-1-batteries-included
volume: volume-07-stdlib
chapter: 1
number: 1
title: "Batteries Included — A Tour of the Standard Library"
subtitle: "Tools you already have, no installation needed."
estimatedMinutes: 11
prerequisites: []
keyTerms: [module]
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

Python's standard library is huge. The phrase "batteries included" has been associated with Python since at least the late 1990s — the language ships with so many useful modules that you rarely need to install anything for everyday tasks.

This volume tours the most-used parts of the standard library. We don't cover everything (there are over 200 modules) — we cover the ones you'll reach for daily.

</Section>

<EtymologyCard
  term="module"
  origin="Latin"
  rootForm="modulus"
  rootMeaning="a small measure"
  story="From Latin 'modulus,' a small measure or unit. The architectural sense — 'a standardized unit of construction' — entered English in the 1500s. In computing, 'module' has been used since the 1960s for 'a self-contained unit of code.' Python uses the term specifically for a single .py file (or a built-in C extension) that can be imported. A module is the unit of code organization."
  insight="A module is a measured unit — a coherent piece you can compose with others. The metaphor of architecture (modular construction) carries over: you build programs by combining modules, the way a building combines structural elements."
/>

<Section label="Importing modules">

A module is brought into your program with `import`:

```python
import math
import os
import json
import datetime

print(math.pi)              # 3.141592653589793
print(os.getcwd())          # current working directory
```

Variations:

```python
# Import a specific name from the module:
from math import pi, sqrt
print(pi)                   # no need for math.

# Import with an alias (especially common with long names):
import datetime as dt
print(dt.datetime.now())

# Import everything (not recommended — pollutes namespace):
from math import *
```

The `from X import Y` form is convenient when you use only a few names. The `import X` form is clearer because every reference is qualified with the module name.

</Section>

<Section label="The most-used modules — a quick map">

| Module | Use for |
|--------|---------|
| `os` | OS interaction (paths, env vars, processes) |
| `pathlib` | Modern path handling (preferred over `os.path`) |
| `sys` | Interpreter state (argv, exit, stdin/stdout) |
| `re` | Regular expressions |
| `json` | Read/write JSON |
| `csv` | Read/write CSV files |
| `datetime` | Dates and times |
| `time` | Time-related functions, sleep |
| `random` | Random numbers |
| `math` | Mathematical functions |
| `statistics` | mean, median, stdev |
| `collections` | Counter, defaultdict, deque, OrderedDict |
| `itertools` | Iterator algebra (chain, cycle, combinations) |
| `functools` | Function tools (lru_cache, partial, reduce) |
| `urllib` | HTTP requests, URL parsing |
| `socket` | Low-level networking |
| `subprocess` | Run external programs |
| `threading` | Concurrent threads |
| `multiprocessing` | Concurrent processes |
| `unittest` | Testing framework |
| `argparse` | Parse command-line arguments |
| `logging` | Structured logging |
| `dataclasses` | Concise class definitions |
| `typing` | Type hints |
| `decimal` | Exact decimal arithmetic |

We'll meet many of these as we go. For a complete list, see docs.python.org/3/library.

</Section>

<CodeRunner
  initial={`# Sample uses of common modules.

import math
import random
import datetime

# Math.
print("pi:", math.pi)
print("sqrt(2):", math.sqrt(2))
print("log(100, 10):", math.log(100, 10))

# Random.
print("random int:", random.randint(1, 100))
print("random pick:", random.choice(["apple", "banana", "cherry"]))

# Datetime.
now = datetime.datetime.now()
print("now:", now)
print("year:", now.year)`}
  caption="Three modules, three use cases. Python ships with everything we just used."
/>

<Section label="The collections module — unsung hero">

`collections` provides specialized container types that are vastly better than rolling your own. The big four:

**`Counter`** — a dict subclass for counting:

```python
from collections import Counter

text = "the quick brown fox jumps over the lazy dog the the"
words = text.split()

c = Counter(words)
print(c)                       # Counter({'the': 4, 'quick': 1, ...})
print(c.most_common(3))        # [('the', 4), ('quick', 1), ...]
```

**`defaultdict`** — a dict that auto-creates default values:

```python
from collections import defaultdict

groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)
# No need for: if cat not in groups: groups[cat] = []
```

**`deque`** — efficient double-ended queue:

```python
from collections import deque

q = deque()
q.append("first")
q.append("second")
q.appendleft("zero")
print(q.popleft())     # "zero" — fast
```

A regular list's `.pop(0)` is O(n) — Python has to shift every element. A deque's `.popleft()` is O(1). Use deque when you need queue-like FIFO operations.

**`OrderedDict`** — preserves insertion order. Less needed since Python 3.7 made regular dicts ordered, but still has methods regular dicts don't.

</Section>

<Section label="The itertools and functools modules">

`itertools` provides building blocks for working with iterators:

```python
from itertools import chain, cycle, islice, combinations

# chain: concatenate iterables.
list(chain([1, 2], [3, 4]))    # [1, 2, 3, 4]

# cycle: repeat forever (use with islice to bound).
list(islice(cycle("ABC"), 7))  # ['A', 'B', 'C', 'A', 'B', 'C', 'A']

# combinations: pick k from a sequence.
list(combinations([1, 2, 3, 4], 2))
# [(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)]
```

`functools` provides function-related tools:

```python
from functools import lru_cache, partial, reduce

# lru_cache: memoize a function (cache its results).
@lru_cache
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

# partial: pre-fill some arguments.
def greet(greeting, name):
    return f"{greeting}, {name}!"

hello = partial(greet, "Hello")
print(hello("Ryan"))     # "Hello, Ryan!"
```

Both modules are gold. We'll see them in detail later.

</Section>

<Exercise
  title="Count word frequencies the easy way"
  prompt="Use Counter from collections to count words in the sentence below. Print the three most common words."
  starter={`from collections import Counter

text = "the quick brown fox jumps over the lazy dog the the"
words = text.split()

# Use Counter to count.
c = Counter(words)

# Print the three most common.
print(___)`}
  expected_contains="('the', 4)"
  hints={[
    "c.most_common(3) returns a list of (word, count) pairs."
  ]}
  solution={`from collections import Counter

text = "the quick brown fox jumps over the lazy dog the the"
words = text.split()

c = Counter(words)
print(c.most_common(3))`}
/>

<Connection>

Volume 7 continues with deep dives on each major module: pathlib, datetime, json, regex, the iteration protocol, and the patterns that come up daily.

</Connection>
