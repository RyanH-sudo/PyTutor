---
id: 01-25-escapes-and-raw-strings
volume: volume-01-foundations
chapter: 5
number: 25
title: "Escapes, Raw Strings, and Special Characters"
subtitle: "How to put a newline, a tab, or a backslash into a string."
estimatedMinutes: 9
prerequisites: [01-24-string-formatting]
keyTerms: []
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

Some characters can't easily be typed inside a string literal. A newline can't be typed (the line just ends). A tab is invisible. A double-quote inside a double-quoted string would close the string. The solution is *escape sequences* — backslash-prefixed codes that stand in for these characters.

This is a short lesson covering the escape sequences you'll meet, raw strings (which disable escape interpretation), and the Unicode escapes that let you write any character.

</Section>

<Section label="The common escapes">

```python
"\n"       # newline
"\t"       # tab
"\r"       # carriage return (older Windows-style line ending)
"\\"       # a literal backslash
"\""       # a double quote (when inside a double-quoted string)
"\'"       # a single quote (when inside a single-quoted string)
"\b"       # backspace (rarely used)
"\f"       # form feed (rarely used)
"\0"       # null character (rare, but used in C interop)
```

Examples:

```python
print("hello\nworld")        # hello (newline) world
print("col1\tcol2\tcol3")    # tab-separated columns
print("path: C:\\Users")     # path: C:\Users
print("she said \"hi\"")     # she said "hi"
```

Notice the backslash itself needs to be escaped: `\\` produces one literal backslash. This is why Windows paths in regular strings look noisy: `"C:\\Users\\Ryan\\Documents"` to get `C:\Users\Ryan\Documents`.

</Section>

<Section label="Raw strings">

For situations where backslashes are common (Windows paths, regex patterns, LaTeX, etc.), Python provides *raw strings* with the `r` prefix. In a raw string, backslashes are taken literally:

```python
print(r"C:\Users\Ryan\Documents")    # C:\Users\Ryan\Documents — no escaping needed
print(r"\n is a literal backslash-n")  # \n is a literal backslash-n
```

The `r"..."` prefix is read as "raw" — disable escape interpretation. The string is otherwise normal.

Raw strings are especially useful with regular expressions, where the regex syntax has its own backslash conventions:

```python
import re
# Match a sequence of digits — \d in regex.
pattern = r"\d+"   # raw — no Python escape interference.
```

We'll see regex in Volume 7.

A small caveat: raw strings can't end with an odd number of backslashes. `r"C:\"` is a syntax error because the `\` escapes the closing quote. Workaround: use a regular string, or end with a different character.

</Section>

<Section label="Unicode escapes">

For non-ASCII characters, you can use Unicode escapes:

```python
print("é")        # é (U+00E9, Latin small letter e with acute)
print("中文")  # 中文 (Chinese characters)
print("\U0001F600")    # 😀 (with capital U for 8-hex-digit codepoints)
print("\N{HEAVY HEART}") # ❤ (named character)
```

The `\u` form takes 4 hex digits (codepoints up to U+FFFF). The `\U` form takes 8 hex digits (any codepoint). The `\N{NAME}` form looks up the character by Unicode name.

Python source files are UTF-8 by default, so you can also just type the character directly:

```python
print("é")
print("中文")
print("😀")
```

Both work. Escapes are useful when you can't type the character (maybe it's in a comment or a string template) or when explicit codepoints matter.

</Section>

<CodeRunner
  initial={`# Escape sequences in action.

# Newline and tab.
print("Name\tAge\nRyan\t37\nSarah\t28")

# Quoting strategies.
print("She said \"hi\"")     # escape the quote
print('She said "hi"')        # use single quotes outside
print("It's a test")          # apostrophe inside double-quoted

# Backslashes.
print("C:\\Users\\Ryan")      # escaped
print(r"C:\Users\Ryan")       # raw

# Unicode.
print("café́")           # café with combining accent
print("❤")               # heart
print("\U0001F40D")           # snake emoji`}
  caption="Three quoting strategies for the same content. Raw strings are great for paths and regex."
/>

<Exercise
  title="Build a path"
  prompt="Build the Windows path 'C:\\\\Users\\\\Ryan\\\\Documents\\\\file.txt' two ways: once with regular escapes (so backslashes are written as \\\\) and once with a raw string. Print both."
  starter={`# With regular escapes.
path1 = "C:\\\\Users\\\\Ryan\\\\Documents\\\\file.txt"

# With a raw string.
path2 = ___

print(path1)
print(path2)`}
  expected={`C:\\Users\\Ryan\\Documents\\file.txt
C:\\Users\\Ryan\\Documents\\file.txt`}
  hints={[
    "path2 = r\"C:\\Users\\Ryan\\Documents\\file.txt\"."
  ]}
  solution={`path1 = "C:\\\\Users\\\\Ryan\\\\Documents\\\\file.txt"
path2 = r"C:\\Users\\Ryan\\Documents\\file.txt"

print(path1)
print(path2)`}
/>

<Connection
  back={[{ id: '01-24-string-formatting', title: 'String Formatting and F-Strings' }]}
  forward={[{ id: '01-26-encoding-and-bytes', title: 'Encoding and Bytes — The Hidden Layer' }]}
>

Next: bytes, encoding, and how strings turn into binary on the wire. We touch UTF-8 just enough to know what's happening underneath.

</Connection>
