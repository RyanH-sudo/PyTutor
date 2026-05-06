---
id: 01-24-string-formatting
volume: volume-01-foundations
chapter: 5
number: 24
title: "String Formatting and F-Strings"
subtitle: "How modern Python builds strings with embedded values."
estimatedMinutes: 11
prerequisites: [01-23-string-methods]
keyTerms: []
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

You've been concatenating strings with `+`. That works, but for anything more than trivial output, it gets clumsy fast. Python has a feature called *f-strings* (formatted string literals) that's both more readable and more powerful.

This lesson covers f-strings, the format specifiers that go inside them (padding, alignment, decimal places, etc.), and a brief mention of older formatting styles you'll see in legacy code.

</Section>

<Section label="The basic f-string">

An f-string is a string literal prefixed with `f`. Inside the string, anything between `{` and `}` is evaluated as a Python expression and inserted into the string.

```python
name = "Ryan"
age = 37

# Without f-string:
old_way = "Hello " + name + ", you are " + str(age) + " years old."

# With f-string:
new_way = f"Hello {name}, you are {age} years old."

print(old_way)
print(new_way)
# Both: Hello Ryan, you are 37 years old.
```

The f-string version is shorter, doesn't need explicit `str()` conversions, and is easier to read. It's the modern Python way. Use f-strings.

</Section>

<Section label="Expressions inside f-strings">

The thing between `{` and `}` can be any Python expression — not just a variable name.

```python
name = "ryan"
age = 37

print(f"Name: {name.upper()}")              # Name: RYAN
print(f"Years to 50: {50 - age}")           # Years to 50: 13
print(f"Double age: {age * 2}")             # Double age: 74
print(f"Birth year: {2026 - age}")          # Birth year: 1989
```

This makes f-strings genuinely *expressive*. You're embedding live computation into the string.

</Section>

<Section label="Format specifiers">

After the value or expression, you can add a `:` and a *format specifier* to control how the value is rendered. Some examples:

```python
pi = 3.14159265

# Decimal places.
print(f"{pi:.2f}")        # 3.14 — 2 decimals
print(f"{pi:.4f}")        # 3.1416 — 4 decimals
print(f"{pi:10.2f}")      # "      3.14" — width 10, right-aligned

# Integers.
n = 42
print(f"{n:5d}")          # "   42" — width 5
print(f"{n:05d}")         # "00042" — width 5, zero-padded
print(f"{n:>10}")         # "        42" — width 10, right-align
print(f"{n:<10}|")        # "42        |" — left-align
print(f"{n:^10}|")        # "    42    |" — center

# Hex, octal, binary.
print(f"{n:x}")           # "2a" — hex
print(f"{n:#x}")          # "0x2a" — hex with prefix
print(f"{n:b}")           # "101010" — binary

# Comma separators.
big = 1234567
print(f"{big:,}")         # "1,234,567"

# Percent.
ratio = 0.853
print(f"{ratio:.1%}")     # "85.3%"
```

The full grammar is `[fill][align][sign][#][0][width][,_][.precision][type]`. Most of the time you only need a couple of these. The cheat sheet:

- `:.2f` — float with 2 decimals.
- `:5d` — integer in field of width 5.
- `:05d` — integer zero-padded to width 5.
- `:,` — comma separators (1234567 → 1,234,567).
- `:.1%` — percent with 1 decimal.
- `:>10`, `:<10`, `:^10` — right, left, center alignment in width 10.
- `:x`, `:b`, `:o` — hex, binary, octal.

</Section>

<CodeRunner
  initial={`# Format specifier examples.

# Currency.
balance = 1234.50
print(f"Balance: \${balance:,.2f}")
# Balance: $1,234.50

# Aligning columns.
names = ["Ryan", "Sarah", "Alexandra"]
ages = [37, 28, 42]

print(f"{'Name':<12} {'Age':>3}")
print(f"{'-'*12} {'-'*3}")
for n, a in zip(names, ages):
    print(f"{n:<12} {a:>3}")

# Percentages.
print()
correct = 87
total = 100
print(f"Score: {correct}/{total} = {correct/total:.1%}")

# Hex / binary / int formats.
n = 255
print()
print(f"decimal: {n}")
print(f"hex:     {n:#x}")
print(f"binary:  {n:#b}")`}
  caption="A column-aligned table is built with width specifiers. Currency uses comma+decimals. Percentages are .1% or .2%."
/>

<Section label="Multiline f-strings">

Triple-quoted f-strings work too:

```python
name = "Ryan"
age = 37

message = f"""
Dear {name},

You are {age} years old.
That's {37 - 18} years past voting age.
And only {50 - 37} years from 50.

Best,
PyTutor
"""
print(message)
```

This is great for emails, templates, or any multi-line formatted output.

</Section>

<Section label="Older formatting styles">

You'll see two older styles in legacy code:

**% formatting** (oldest):
```python
"Hello %s, you are %d years old." % ("Ryan", 37)
```

**.format() method**:
```python
"Hello {}, you are {} years old.".format("Ryan", 37)
"Hello {name}, age {age}".format(name="Ryan", age=37)
```

These still work in modern Python. F-strings are preferred for new code because they're more readable and more efficient. You should be able to *read* the older styles when you see them.

</Section>

<Callout kind="info" title="Common f-string gotchas">

A few things that catch beginners:

1. **Don't put quotes inside `{}` that conflict with the outer quotes.** `f"text {dict['key']}"` works because outer is double, inner is single. `f"text {dict["key"]}"` is a syntax error.

2. **The `=` debugging trick.** `f"{name=}"` prints `name='Ryan'` — the variable name and value. Useful for debugging. Added in Python 3.8.

3. **Curly braces inside f-strings.** To include a literal `{`, double it: `f"{{literal}} {name}"` prints `{literal} Ryan`.

4. **F-strings are evaluated at the point they're written.** So `f"{x}"` captures the *current* value of x, not a reference. If x changes later, the string doesn't update.

</Callout>

<CodeRunner
  initial={`# F-string debugging trick.

x = 5
y = 10
total = x + y

# The = inside an f-string prints both name and value:
print(f"{x=}")         # x=5
print(f"{y=}")         # y=10
print(f"{total=}")     # total=15
print(f"{x + y=}")     # x + y=15

# Useful for debug logs.`}
  caption="The {var=} syntax is gold for debugging. It saves you from writing print('x =', x) endlessly."
/>

<Exercise
  title="Format a receipt"
  prompt="Given the items below, print a 3-line receipt where each line has the item name (left-aligned, width 12) and price (right-aligned, width 8, 2 decimal places). Then print a total line."
  starter={`items = [("apple", 0.50), ("bread", 2.99), ("cheese", 12.49)]

# Print each item on its own line, columns aligned.
for name, price in items:
    print(f"{___:<12} ${___:>8.2f}")

# Compute and print the total.
total = sum(price for _, price in items)
print(f"{'-' * 21}")
print(f"{'TOTAL':<12} ${total:>8.2f}")`}
  expected={`apple        $    0.50
bread        $    2.99
cheese       $   12.49
---------------------
TOTAL        $   15.98`}
  hints={[
    "In the f-string, use `name` and `price` directly: `f\"{name:<12} ${price:>8.2f}\"`.",
    "The sum() with generator expression sums the prices."
  ]}
  solution={`items = [("apple", 0.50), ("bread", 2.99), ("cheese", 12.49)]

for name, price in items:
    print(f"{name:<12} \${price:>8.2f}")

total = sum(price for _, price in items)
print(f"{'-' * 21}")
print(f"{'TOTAL':<12} \${total:>8.2f}")`}
/>

<Exercise
  title="Show your work"
  prompt="Use f-strings with the `=` debug syntax to print the values of `radius`, `area`, and `circumference` in a single multi-line block."
  starter={`import math

radius = 5
area = math.pi * radius ** 2
circumference = 2 * math.pi * radius

# Print each variable using f-string debug syntax.
print(f"{radius=}")
print(f"{area=}")
print(f"{circumference=}")`}
  expected={`radius=5
area=78.53981633974483
circumference=31.41592653589793`}
  solution={`import math

radius = 5
area = math.pi * radius ** 2
circumference = 2 * math.pi * radius

print(f"{radius=}")
print(f"{area=}")
print(f"{circumference=}")`}
/>

<Connection
  back={[{ id: '01-23-string-methods', title: 'String Methods — The Toolkit' }]}
  forward={[{ id: '01-25-escapes-and-raw-strings', title: 'Escapes, Raw Strings, and the Special Characters' }]}
>

Next: escape sequences in detail (newlines, tabs, backslashes, unicode escapes), raw strings, and when each is the right tool.

</Connection>
