---
id: 01-15-strings-introduction
volume: volume-01-foundations
chapter: 3
number: 15
title: "Strings — A First Tour"
subtitle: "Creating them, joining them, asking how long they are."
estimatedMinutes: 11
prerequisites: [01-14-booleans]
keyTerms: [string]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A *string* is a sequence of characters. We've used strings since lesson 8 — `"Ryan"`, `"hello, "`, `"the answer is "`. Now we look at them as a type, with their own operations and quirks.

This is a first tour. Chapter 4 (lessons 21-30) is the deep dive — slicing, methods, formatting, encoding. Today we cover what you need to use strings comfortably.

</Section>

<EtymologyCard
  term="string"
  origin="Old English"
  rootForm="streng"
  rootMeaning="a thread, a line"
  story="The Old English 'streng' meant a thread, a cord, or a line. It's related to the German 'Strang' (rope) and probably to Latin 'stringere' (to draw tight). In English, 'a string of pearls,' 'a string of lights,' 'a string of words' — all refer to a sequence of items joined together. In computing, a 'string' is a sequence of characters joined together: 'h-e-l-l-o' is a string. The metaphor is exact: characters threaded together like beads on a string."
  entryToComputing="The term entered programming in the 1950s. By the time of Cobol (1959), 'character string' was standard terminology. Modern languages either use 'string' (Python, Java, JavaScript) or 'text' (Rust's `String` and `&str` keep both)."
  insight="The string-as-thread metaphor matters because it makes the operations on strings feel natural: you can *cut* a piece (slicing), *join* two strings (concatenation), *measure* the length (counting beads). Every string operation maps to something you'd do with a real piece of string."
/>

<Section label="Creating strings">

A string literal is text between quotation marks. Python accepts:

- Single quotes: `'hello'`
- Double quotes: `"hello"`
- Triple single: `'''hello'''` — multiline strings
- Triple double: `"""hello"""` — multiline strings

Single and double quotes are interchangeable — use whichever is more convenient. The conventional choice is double quotes for natural-language strings and single quotes for short identifiers, but it's a soft rule.

Triple-quoted strings can contain newlines:

```python
poem = """The quick brown fox
jumps over the lazy dog.
End of poem."""
```

This is a single string with two newline characters in it (one between each line).

<CodeRunner
  initial={`# Different ways to write strings.

a = "hello"
b = 'hello'
print(a == b)            # True — same string

# When the string itself contains a quote, use the other type.
c = "I said 'hi'"
d = 'She said "yes"'
print(c)
print(d)

# Triple-quoted strings can span lines.
poem = """Roses are red,
violets are blue."""
print(poem)`}
  caption="Choose the quote style that doesn't conflict with quotes inside the string. Triple-quoted strings preserve newlines."
/>

</Section>

<Section label="Length, concatenation, repetition">

Three operations you'll use constantly:

**`len(s)`** returns the number of characters in the string.

**`+`** concatenates two strings.

**`*`** repeats a string a given number of times.

```python
name = "Ryan"
greeting = "hello, " + name + "!"

print(len(greeting))     # 12
print(greeting * 3)       # "hello, Ryan!hello, Ryan!hello, Ryan!"
print("=" * 30)          # 30 equals signs
```

The last line is a common trick for printing a separator line.

</Section>

<Section label="Indexing and slicing — the first taste">

Each character of a string has a numeric position, called an *index*. Indexing in Python starts at 0, not 1 — the first character is at index 0.

```python
name = "Ryan"
print(name[0])       # 'R'
print(name[1])       # 'y'
print(name[2])       # 'a'
print(name[3])       # 'n'
```

You can use negative indices to count from the end:

```python
print(name[-1])      # 'n' — last character
print(name[-2])      # 'a'
```

You can extract a *slice* — a portion of the string — using `[start:end]`. The start is inclusive; the end is exclusive.

```python
word = "Programming"
print(word[0:7])     # "Program"
print(word[7:])      # "ming" — from 7 to end
print(word[:7])      # "Program" — from start to 7
print(word[-4:])     # "ming" — last 4 characters
```

We'll do slicing properly in Chapter 4. For now, just know it exists and the basic shape.

<CodeRunner
  initial={`text = "PyTutor"

# Length.
print(len(text))     # 7

# Indexing.
print(text[0])       # 'P'
print(text[-1])      # 'r' (last character)

# Slicing.
print(text[2:6])     # 'Tuto'
print(text[:2])      # 'Py'
print(text[2:])      # 'Tutor'

# Concatenation and repetition.
print("Py" + "Tutor")     # 'PyTutor'
print("ha" * 3)           # 'hahaha'`}
  caption="Indexing starts at 0. Negative indices count from the end. Slicing is [start:end] with start inclusive, end exclusive."
/>

</Section>

<Section label="Strings are immutable">

You cannot change a string in place. This errors:

```python
s = "hello"
s[0] = "H"   # TypeError: 'str' object does not support item assignment
```

To "modify" a string, you build a new one and reassign the variable:

```python
s = "hello"
s = "H" + s[1:]    # "Hello"
```

Why is this a feature? Several reasons. Immutable values can be shared safely (no one can modify them out from under you). They can be hash-keyed (used as dict keys, which mutable types can't be). They make reasoning about code easier — once a string exists, it can't change.

We'll cover immutability properly when we discuss memory in Volume 2. For now, remember: *to change a string, build a new one*.

</Section>

<Section label="Escape sequences">

Some characters can't be typed directly inside a string — like a newline (`\n`) or a tab (`\t`) or a quote that matches the delimiter. Python lets you write them with *escape sequences*.

The most common:
- `\n` — newline
- `\t` — tab
- `\\` — a literal backslash
- `\"` — a double quote (when inside a double-quoted string)
- `\'` — a single quote (when inside a single-quoted string)

```python
print("line one\nline two")        # prints two lines
print("a\tb\tc")                   # tab-separated
print("she said \"hello\"")        # she said "hello"
print("path: C:\\Users\\Ryan")     # path: C:\Users\Ryan
```

You can also use *raw strings* with the `r` prefix, which disable escape sequences. Useful for regex patterns and Windows paths:

```python
print(r"C:\Users\Ryan")            # C:\Users\Ryan — backslashes are literal
```

</Section>

<Section label="Common string operations preview">

Strings have many *methods* — functions you call on a string with `.method()` syntax. We'll cover them in Chapter 4. Just so you've seen them:

```python
"hello".upper()              # 'HELLO'
"HELLO".lower()              # 'hello'
"  hello  ".strip()          # 'hello' — removes whitespace
"a,b,c".split(",")           # ['a', 'b', 'c'] — returns a list
"-".join(["a", "b", "c"])    # 'a-b-c' — opposite of split
"hello".replace("l", "L")    # 'heLLo'
"hello".startswith("he")     # True
"hello".endswith("lo")       # True
"hello".find("l")            # 2 — index of first 'l'
len("hello")                 # 5
```

There are dozens more. We'll meet the important ones in lessons 21-30.

</Section>

<Exercise
  title="Build a banner"
  prompt="Given name = 'Ryan', print a 'banner' that has three lines: a row of 30 equals signs, a line saying 'Hello, Ryan!', and another row of 30 equals signs. Use string repetition for the equals signs."
  starter={`name = "Ryan"

# Line 1: 30 equals signs.
print(...)
# Line 2: greeting.
print(...)
# Line 3: 30 equals signs.
print(...)`}
  expected={`==============================
Hello, Ryan!
==============================`}
  hints={[
    "`'=' * 30` produces 30 equals signs.",
    "`'Hello, ' + name + '!'` builds the greeting."
  ]}
  solution={`name = "Ryan"
print("=" * 30)
print("Hello, " + name + "!")
print("=" * 30)`}
/>

<Exercise
  title="Indexing practice"
  prompt="Given the string `text = 'PyTutor'`, print the first character, the last character, the third character, and the substring 'Tut' (which starts at index 2)."
  starter={`text = "PyTutor"

# First character.
print(text[...])
# Last character.
print(text[...])
# Third character (index 2).
print(text[...])
# Substring "Tut".
print(text[...])`}
  expected={`P
r
T
Tut`}
  hints={[
    "First character is index 0.",
    "Last character is index -1.",
    "'Tut' starts at index 2 and ends at index 5 (exclusive). So `text[2:5]`."
  ]}
  solution={`text = "PyTutor"
print(text[0])
print(text[-1])
print(text[2])
print(text[2:5])`}
/>

<Connection
  back={[{ id: '01-14-booleans', title: 'Booleans and Logic' }]}
  forward={[{ id: '01-16-variables-as-names', title: 'Variables Are Names, Not Boxes' }]}
>

Next: a careful look at what variables really are in Python. Spoiler: they're not what most beginners think they are.

</Connection>
