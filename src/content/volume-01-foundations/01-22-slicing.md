---
id: 01-22-slicing
volume: volume-01-foundations
chapter: 5
number: 22
title: "Slicing — Cutting Strings into Pieces"
subtitle: "The most underrated syntax in Python."
estimatedMinutes: 11
prerequisites: [01-21-strings-deep-dive-intro]
keyTerms: []
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

Slicing is one of Python's signature features. Once you have the rhythm, expressions like `text[::-1]` (reverse a string) or `text[1::2]` (every other character starting at position 1) become natural. Slicing applies to strings, lists, tuples, and any sequence — so it's worth a careful lesson.

The full slice syntax is `[start:stop:step]`. All three are optional. Defaults: `start=0`, `stop=len(seq)`, `step=1`.

</Section>

<Section label="The full syntax">

```python
seq[start:stop:step]
```

- `start`: the index where the slice begins (inclusive). Default `0`.
- `stop`: the index where the slice ends (exclusive). Default `len(seq)`.
- `step`: how to advance from one position to the next. Default `1`.

Each part can be omitted. `[1:5]` is the same as `[1:5:1]`. `[:5]` is the same as `[0:5:1]`. `[::2]` is the same as `[0:len(seq):2]`.

</Section>

<Section label="Building intuition with examples">

Let's work through them, slowly.

```python
s = "Python"
#    P y t h o n
#    0 1 2 3 4 5

s[0:6]      # "Python" — the whole string (start=0, stop=6 exclusive)
s[0:3]      # "Pyt"
s[1:4]      # "yth"
s[3:]       # "hon" — from 3 to the end
s[:3]       # "Pyt" — from start up to (not including) 3
s[:]        # "Python" — the whole string
```

Negative indices work too:

```python
s[-3:]      # "hon" — from third-from-end to end
s[:-3]      # "Pyt" — from start to third-from-end (exclusive)
s[-4:-1]    # "tho" — from -4 to -1
```

The step parameter:

```python
s[::2]      # "Pto" — every 2nd character
s[1::2]     # "yhn" — every 2nd character starting from index 1
s[::-1]     # "nohtyP" — reverse!
s[::-2]     # "nhy" — every 2nd character, in reverse
```

The reverse trick — `s[::-1]` — is one of the most useful idioms in Python. We'll see it constantly. The negative step direction means "go backward through the sequence."

<CodeRunner
  initial={`s = "Python"

print(s[0:6])      # Python
print(s[0:3])      # Pyt
print(s[3:])       # hon
print(s[:3])       # Pyt
print(s[:])        # Python — full copy

# Negative.
print(s[-3:])      # hon
print(s[:-3])      # Pyt

# With step.
print(s[::2])      # Pto
print(s[1::2])     # yhn
print(s[::-1])     # nohtyP — reverse!`}
/>

</Section>

<Section label="Slice-out-of-bounds is forgiving">

Unlike single-index access, slicing is forgiving about indices that go past the end.

```python
s = "hello"
print(s[10])     # IndexError!
print(s[10:20])  # "" — empty string, no error
print(s[:1000])  # "hello" — clipped to actual length
print(s[-100:])  # "hello" — clipped at the start
```

This is a feature, not a bug. It means slicing for "the first N characters" works whether the string has N characters or not — `s[:n]` always returns up to n characters. No need to check `len(s)` first.

</Section>

<Section label="Common slicing idioms">

A handful of slice patterns appear constantly:

```python
s[::-1]       # reverse the sequence
s[:n]         # the first n characters
s[-n:]        # the last n characters
s[1:]         # everything except the first character
s[:-1]        # everything except the last character
s[::2]        # every other character starting at 0
s[1::2]       # every other character starting at 1
```

Memorize these. They're idiomatic and constant.

</Section>

<Section label="Slicing with variables">

Slicing isn't limited to literal integers. You can use variables and expressions:

```python
url = "https://example.com/path/to/file.json"

# Find where the path starts (after "://").
path_start = url.find("/", 8)   # find next '/' after position 8
print(url[path_start:])          # "/path/to/file.json"

# Find where the file extension starts.
dot = url.rfind(".")             # last '.'
print(url[dot:])                 # ".json"
print(url[:dot])                 # everything before the last '.'
```

We'll see `find()`, `rfind()`, and other string methods in the next lesson. The point here: slice indices can come from anywhere — they're just integers.

</Section>

<Callout kind="tip" title="The mental model: slices are between characters">

A useful way to think about slice indices: they point *between* characters, not *at* them. Index 0 is "before the first character." Index 1 is "between the first and second character." Index `len(s)` is "after the last character."

This makes slice arithmetic intuitive. `s[0:3]` takes the characters between index 0 and index 3 — which is the first three characters. `s[3:]` takes from index 3 to the end — everything after the first three characters.

If you draw the indices like this:

```
 P y t h o n
0 1 2 3 4 5 6
```

Slicing makes immediate sense: `s[0:3]` is "from 0 to 3" — `Pyt`. `s[3:6]` is "from 3 to 6" — `hon`.

</Callout>

<Exercise
  title="The first three and the last three"
  prompt="Given `text = 'PythonProgramming'`, print the first 3 characters and the last 3 characters on separate lines."
  starter={`text = "PythonProgramming"

# First 3 characters.
print(text[___])

# Last 3 characters.
print(text[___])`}
  expected={`Pyt
ing`}
  hints={[
    "First 3: text[:3].",
    "Last 3: text[-3:]."
  ]}
  solution={`text = "PythonProgramming"
print(text[:3])
print(text[-3:])`}
/>

<Exercise
  title="Reverse a string and check palindrome"
  prompt="A palindrome is a string that reads the same forward and backward. Given `word = 'racecar'`, print whether the word is a palindrome by comparing it to its reverse. Expected output: 'is palindrome: True'."
  starter={`word = "racecar"

reversed_word = ___
is_palindrome = ___

print("is palindrome:", is_palindrome)`}
  expected="is palindrome: True"
  hints={[
    "reversed_word = word[::-1]",
    "is_palindrome = word == reversed_word"
  ]}
  solution={`word = "racecar"
reversed_word = word[::-1]
is_palindrome = word == reversed_word
print("is palindrome:", is_palindrome)`}
/>

<Connection
  back={[{ id: '01-21-strings-deep-dive-intro', title: 'Strings — A Deeper Look' }]}
  forward={[{ id: '01-23-string-methods', title: 'String Methods — The Toolkit' }]}
>

Next: string methods. The full toolkit of `.upper()`, `.lower()`, `.split()`, `.strip()`, `.replace()`, `.find()`, and more. The methods you'll use every day.

</Connection>
