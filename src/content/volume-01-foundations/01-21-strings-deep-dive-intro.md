---
id: 01-21-strings-deep-dive-intro
volume: volume-01-foundations
chapter: 5
number: 21
title: "Strings — A Deeper Look"
subtitle: "Sequence-ness, indexing, the immutability principle revisited."
estimatedMinutes: 11
prerequisites: [01-20-chapter-3-recap]
keyTerms: [string]
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

Strings are the type you'll work with most. Customer names. URL paths. Configuration values. JSON keys. Code itself, when programs read other programs. Almost any external data starts as a string and becomes useful only after you parse it into something more structured.

Chapter 5 is a careful tour. Today we set the foundation: strings as *sequences*, indexing in detail, immutability and what it means, and a few of the most-used string operations. Subsequent lessons cover slicing, methods, formatting, encoding, and Unicode.

</Section>

<Section label="A string is a sequence">

In Python, a string is a *sequence* — an ordered collection of characters. Sequences are a general category that includes strings, lists, tuples, ranges, and more. They share certain operations: indexing, slicing, length, membership, iteration. Once you learn the operations on one sequence, they transfer to all sequences. Strings are your first proper sequence.

The general operations on any sequence:

- `len(seq)` — number of items.
- `seq[i]` — item at position i (0-indexed).
- `seq[i:j]` — slice from i (inclusive) to j (exclusive).
- `x in seq` — is x a member?
- `for x in seq:` — iterate.

Strings support all of these, plus a few extras specific to text.

</Section>

<Section label="Indexing — a closer look">

A string of length n has indices `0`, `1`, ..., `n-1` going forward, and `-1`, `-2`, ..., `-n` going backward. The character at index `i` is the same as the character at index `i - n` for negative indexing.

```python
s = "Python"
# Index:  P  y  t  h  o  n
# Forward: 0  1  2  3  4  5
# Reverse:-6 -5 -4 -3 -2 -1
```

Accessing a single index gives you a string of length 1 — *not* a separate "character" type. Python doesn't have a character type; a one-character string is just a short string.

```python
s = "Python"
print(s[0])       # 'P'
print(type(s[0])) # <class 'str'> — still a string, just a short one
print(len(s[0]))  # 1
```

Out-of-range indices raise `IndexError`:

```python
s = "Python"
print(s[10])      # IndexError: string index out of range
```

Always remember that the last valid index is `len(s) - 1`. The off-by-one error (using `len(s)` as an index) is one of the most common mistakes in programming.

</Section>

<Section label="Strings are immutable, revisited">

We mentioned this in lesson 15. Repeating because it's important: *you cannot modify a string in place*. The methods we'll see (`.upper()`, `.replace()`, etc.) all return *new* strings — the original is unchanged.

```python
name = "ryan"
upper_name = name.upper()    # creates a new string, "RYAN"
print(name)                  # "ryan" — unchanged!
print(upper_name)            # "RYAN"

# Reassigning the variable is fine:
name = name.upper()          # name now points to "RYAN"
print(name)                  # "RYAN"
```

Reassigning the variable is *not* mutating the original string — it's just rebinding the name to a new string. The old "ryan" string still exists in memory until nothing references it (then it gets garbage-collected).

Why is immutability a feature? Three reasons:

1. **Safety.** A string passed to a function can't be unexpectedly modified. The caller knows their string survives intact.
2. **Hashability.** Strings can be used as dictionary keys (mutable types like lists cannot, because their hash would change if they mutated).
3. **Sharing.** Multiple variables can point to the same string with no risk. Two variables holding "hello" are pointing at the *same* memory.

This last point — Python's interning of strings — is why `id("hello") == id("hello")` is often True. Python is smart about reusing string objects.

</Section>

<Section label="Concatenation, repetition, and the multiline trick">

We've seen `+` and `*`:

```python
"hello" + " " + "world"     # "hello world"
"-" * 30                    # 30 dashes
```

There's a third nicety: *adjacent string literals are auto-concatenated*. This works:

```python
greeting = "hello, " "Ryan!"
print(greeting)             # "hello, Ryan!"
```

The whitespace doesn't matter; `"hello, " "Ryan!"` is treated as `"hello, " + "Ryan!"`. Useful for splitting long string literals across lines:

```python
long_message = (
    "This is a long sentence that "
    "would be hard to read if it "
    "were all on one line."
)
```

The parentheses turn it into a single expression spanning multiple lines. The whitespace between adjacent literals is ignored. The result is one big string.

This is *not* the same as `+` concatenation. Adjacent literal concatenation is a syntactic convenience and only works between *literals* (not variables).

</Section>

<Section label="Iteration — a sneak peek">

You can loop over a string character by character:

```python
for ch in "hello":
    print(ch)

# h
# e
# l
# l
# o
```

`for x in seq:` iterates through any sequence, including strings. Each pass through the loop, `ch` is the next character of the string. This is a deeply useful pattern — you'll see it constantly. We'll cover loops properly in Volume 1's chapter 6, but you've seen the shape now.

</Section>

<Section label="Membership and the in operator">

Use `in` to test whether a character or substring appears:

```python
"a" in "apple"           # True — 'a' is a character in "apple"
"app" in "apple"         # True — substring check
"x" in "apple"           # False
"banana" in "apple"      # False — substring not present

# in is widely used for "is this a thing in this collection" tests:
",.;!?" 
# Checking if a character is punctuation:
ch = "."
print(ch in ",.;!?")     # True
```

The `in` operator on strings does substring matching, not just character matching. `"app" in "apple"` is True because `"app"` is a substring of `"apple"`. This is more than an "is this character one of those characters" check — it's a full substring search.

</Section>

<CodeRunner
  initial={`# Putting the pieces together.

text = "PyTutor is fun"

print("length:", len(text))
print("first char:", text[0])
print("last char:", text[-1])

# Membership.
print("'fun' in text:", "fun" in text)
print("'boring' in text:", "boring" in text)

# Iteration with a count.
vowels = "aeiou"
count = 0
for ch in text:
    if ch in vowels:
        count = count + 1
print("vowel count:", count)`}
  caption="The vowel-counting loop is a classic. We iterate over each character; for each one, we check 'is this a vowel?' If yes, increment the count."
/>

<Section label="Comparing strings">

You can compare strings with `==`, `!=`, `<`, `<=`, `>`, `>=`. Equality compares character by character. Inequality compares lexicographically — like dictionary order.

```python
"apple" == "apple"      # True
"apple" == "Apple"      # False — case-sensitive
"apple" < "banana"      # True — alphabetically before
"apple" < "apricot"     # True — same first letter, but second is smaller
"Apple" < "apple"       # True — uppercase letters sort before lowercase in ASCII
```

Be careful with case. `"apple" == "APPLE"` is False. To compare ignoring case, lowercase both sides:

```python
a = "Hello"
b = "HELLO"
print(a.lower() == b.lower())   # True
```

The lexicographic order uses the underlying character code points (we'll cover this fully when we get to Unicode). For pure ASCII strings, the order is roughly alphabetical with capitals before lowercase letters. For non-ASCII strings, the order is the Unicode code-point order, which mostly matches alphabetical for European languages but has surprises elsewhere.

</Section>

<Exercise
  title="Count specific characters"
  prompt="Given the string `text = 'how much wood would a woodchuck chuck'`, count the number of times 'o' appears, and print 'count of o: N' where N is the count."
  starter={`text = "how much wood would a woodchuck chuck"

count = 0
# Loop through each character. If it's 'o', increment count.
for ch in text:
    if ___:
        count = count + 1

print("count of o:", count)`}
  expected="count of o: 6"
  hints={[
    "The condition is `ch == 'o'`.",
    "Alternatively, Python has a built-in: text.count('o') gives 6 directly. We'll see it in lesson 23. The loop version is good practice."
  ]}
  solution={`text = "how much wood would a woodchuck chuck"

count = 0
for ch in text:
    if ch == "o":
        count = count + 1

print("count of o:", count)`}
/>

<Connection
  back={[{ id: '01-20-chapter-3-recap', title: 'Chapter 3-4 Recap and Practice' }]}
  forward={[{ id: '01-22-slicing', title: 'Slicing — Cutting Strings into Pieces' }]}
>

Next: slicing in detail. The full `[start:stop:step]` syntax, negative steps, and the elegant idioms slicing enables.

</Connection>
