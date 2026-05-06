---
id: 01-23-string-methods
volume: volume-01-foundations
chapter: 5
number: 23
title: "String Methods — The Toolkit"
subtitle: "The day-to-day operations that make text manageable."
estimatedMinutes: 13
prerequisites: [01-22-slicing]
keyTerms: [method]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A *method* is a function attached to a value. You call it with dot syntax: `s.upper()`. Strings have dozens of methods; we'll cover the ones you'll use almost daily, then point at the rest.

All string methods are *non-destructive* — they return a new string and leave the original unchanged. This is a direct consequence of strings being immutable.

</Section>

<EtymologyCard
  term="method"
  origin="Greek via Latin"
  rootForm="methodos"
  rootMeaning="a way of doing, a pursuit"
  story="From Greek 'methodos,' literally 'way of pursuit' — from 'meta' (after, in pursuit of) plus 'hodos' (way, road). Originally meant a systematic procedure for inquiry — a 'method' of investigation. The word entered programming in the 1960s with object-oriented languages: a method is a procedure 'belonging to' an object — a way the object knows how to behave."
  entryToComputing="Smalltalk (1972) made 'method' the standard term for object-attached functions. Java, C++, Python, and most modern languages followed. In Python the term is used loosely — a function defined inside a class is a method, a function defined in module scope is a function, but the calling syntax is similar."
  insight="A method is a function tied to a particular object. The object 'knows' the method; you call it on the object. `s.upper()` reads as 'string s, give me your uppercase version.' This phrasing — calling on a particular object — is the soul of object-oriented programming, which we'll meet in Volume 6."
/>

<Section label="Case methods">

```python
"hello".upper()           # "HELLO"
"HELLO".lower()           # "hello"
"hello world".title()     # "Hello World" — title case
"Hello".capitalize()      # "Hello" — first letter caps, rest lower
"Hello".swapcase()        # "hELLO" — flip each letter's case
"hello".isupper()         # False
"HELLO".isupper()         # True
"Hello".islower()         # False
"hello".isalpha()         # True (all alphabetic)
"hello123".isalpha()      # False
"123".isdigit()           # True
"123abc".isalnum()        # True (alphanumeric)
```

Use `.lower()` for case-insensitive comparisons:

```python
if name.lower() == "ryan":
    print("hi Ryan!")
```

</Section>

<Section label="Whitespace methods">

Whitespace handling is a constant nuisance with text from external sources. Python provides:

```python
"  hello  ".strip()       # "hello" — strip both ends
"  hello  ".lstrip()      # "hello  " — strip left
"  hello  ".rstrip()      # "  hello" — strip right
"\n\t hello \n".strip()   # "hello" — handles all whitespace, not just spaces
"---hello---".strip("-")  # "hello" — can specify what to strip
```

You'll use `.strip()` constantly when reading user input or file lines, since they often have stray spaces or newlines.

</Section>

<Section label="Searching">

```python
"hello world".find("world")      # 6 — index of first match
"hello world".find("xyz")        # -1 — not found
"hello world".rfind("l")         # 9 — last occurrence
"hello world".index("world")     # 6 — like find, but raises ValueError if not found
"hello world".count("l")         # 3
"hello world".startswith("hello") # True
"hello world".endswith("world")  # True
```

Use `.find()` when "not found" is an expected outcome (it returns -1). Use `.index()` when you're sure it's there (it raises an error if not).

</Section>

<Section label="Splitting and joining">

```python
"a,b,c".split(",")               # ['a', 'b', 'c']
"hello world".split()            # ['hello', 'world'] — splits on any whitespace
"a,b,,c".split(",")              # ['a', 'b', '', 'c'] — empty string between consecutive commas
"a-b-c-d".split("-", 2)          # ['a', 'b', 'c-d'] — limit to 2 splits

",".join(["a", "b", "c"])        # "a,b,c" — opposite of split
" - ".join(["one", "two"])       # "one - two"
"".join(["a", "b", "c"])         # "abc" — concatenate without separator

"line one\nline two\nline three".splitlines()   # splits on newlines
# ['line one', 'line two', 'line three']
```

`.split()` and `.join()` are inverses. They're among the most-used string methods. When you read CSV-like data, you split it. When you produce delimited output, you join.

</Section>

<Section label="Replacing">

```python
"hello world".replace("world", "Python")    # "hello Python"
"banana".replace("a", "o")                    # "bonono" — replaces all
"banana".replace("a", "o", 2)                # "bonona" — limit to 2 replacements
```

`.replace()` doesn't modify the original — remember, strings are immutable. It returns a new string.

</Section>

<Section label="Validation methods">

```python
"hello".isalpha()        # True
"123".isdigit()          # True
"hello123".isalnum()     # True (alphanumeric)
"   ".isspace()          # True (all whitespace)
"Hello".istitle()        # True (title-cased)
```

These are useful for input validation. *Note*: empty strings return False for all these methods, which is sometimes surprising. `"".isalpha()` is False because there are no characters to be alphabetic.

</Section>

<CodeRunner
  initial={`# Putting it together.

raw_input = "  Ryan  "

# Clean it up.
clean = raw_input.strip().lower()
print("cleaned:", repr(clean))

# Validate.
print("is alpha:", clean.isalpha())

# Find a substring.
text = "I went to the store and bought apples and oranges."
print("apple position:", text.find("apple"))
print("apple count:", text.count("apple"))

# Split into words.
words = text.split()
print("word count:", len(words))
print("first word:", words[0])
print("last word:", words[-1])

# Join with hyphens.
print("hyphenated:", "-".join(words))`}
  caption="A typical pattern: clean input with strip, normalize with lower, then validate or process."
/>

<Section label="A few more useful methods">

```python
"hello".center(11, "*")          # "***hello***" — pad to width with character
"42".zfill(5)                    # "00042" — zero-pad to width
"\thello".expandtabs(4)          # "    hello" — tab to spaces
"hello".encode("utf-8")          # b'hello' — convert to bytes (we'll see in lesson 28)
```

The full list of string methods is in the Python docs at docs.python.org/3/library/stdtypes.html#string-methods. There are about 40 in total. The ones we've covered handle 90% of normal needs.

</Section>

<Exercise
  title="Clean and parse"
  prompt="The variable `raw` below has a name and email separated by a comma, with surrounding whitespace. Clean it up, split into name and email, and print 'Name: <name>' on one line and 'Email: <email>' on another."
  starter={`raw = "  Ryan Haig , rytuality@gmail.com  "

# Step 1: split on comma.
parts = raw.split(",")

# Step 2: strip each part.
name = ___
email = ___

# Print both.
print("Name:", name)
print("Email:", email)`}
  expected={`Name: Ryan Haig
Email: rytuality@gmail.com`}
  hints={[
    "After split, parts is ['  Ryan Haig ', ' rytuality@gmail.com  ']. Each has whitespace.",
    "name = parts[0].strip(); email = parts[1].strip()."
  ]}
  solution={`raw = "  Ryan Haig , rytuality@gmail.com  "

parts = raw.split(",")
name = parts[0].strip()
email = parts[1].strip()

print("Name:", name)
print("Email:", email)`}
/>

<Exercise
  title="Title-case a sentence"
  prompt="Convert the sentence below to title case (each word capitalized) and print the result. Use the .title() method."
  starter={`sentence = "the quick brown fox jumps over the lazy dog"

print(...)`}
  expected="The Quick Brown Fox Jumps Over The Lazy Dog"
  hints={[
    "sentence.title() returns the title-cased version."
  ]}
  solution={`sentence = "the quick brown fox jumps over the lazy dog"
print(sentence.title())`}
/>

<Connection
  back={[{ id: '01-22-slicing', title: 'Slicing — Cutting Strings into Pieces' }]}
  forward={[{ id: '01-24-string-formatting', title: 'String Formatting and F-Strings' }]}
>

Next: f-strings. The modern way to build formatted strings, with embedded expressions, padding, alignment, and number formatting.

</Connection>
