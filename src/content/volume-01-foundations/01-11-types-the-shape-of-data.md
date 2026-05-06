---
id: 01-11-types-the-shape-of-data
volume: volume-01-foundations
chapter: 3
number: 11
title: "Types — The Shape of Data"
subtitle: "Why a number and a string are different things, and what that means."
estimatedMinutes: 12
prerequisites: [01-10-input-and-the-conversation]
keyTerms: [integer, string, boolean]
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

Up to now we've been treating numbers and strings as if they were just "data" without thinking carefully about the difference. They are not the same kind of thing. They behave differently. They support different operations. The category a value belongs to is called its *type*.

Type is one of the deep concepts in programming. Once you learn to think in types, a great deal of confused code becomes clear. The phrase "thinking in types" is not academic — it's the practical habit of asking, every time you encounter a value: *what kind of thing is this?* The answer guides everything you do with it.

This lesson is the introduction. We'll meet Python's basic types, see how to tell what type a value has, and start building the mental discipline of thinking in types.

</Section>

<Section label="A category for every value">

Every value in Python has a type. Some examples:

- `5` — type `int` (an integer).
- `5.0` — type `float` (a floating-point number).
- `"hello"` — type `str` (a string).
- `True` — type `bool` (a boolean).
- `None` — type `NoneType` (the special "no value" value).
- `[1, 2, 3]` — type `list`.
- `(1, 2)` — type `tuple`.
- `{"name": "Ryan"}` — type `dict`.

The type of a value tells you two things:
1. **What kind of data it represents.** An integer is a whole number. A string is text. A list is an ordered sequence.
2. **What operations are supported.** Integers support arithmetic. Strings support concatenation. Lists support indexing. Different types, different operations.

Type errors — `TypeError` — happen when you try to do an operation on a value whose type doesn't support it. `5 + "hello"` is a type error: integer addition isn't defined for a string operand.

</Section>

<Section label="Python's built-in types, ranked by frequency">

You'll meet all of these eventually. Roughly in order of how often you'll use them:

- **`str`** — Strings. Text. Quoted with `"..."` or `'...'`.
- **`int`** — Integers. Whole numbers, positive or negative. `5`, `-17`, `0`, `1000000000000000000`.
- **`float`** — Floating-point numbers. Decimals. `3.14`, `-0.001`, `2.0`.
- **`bool`** — Booleans. `True` or `False`. (Note the capitalization — Python is strict.)
- **`list`** — Ordered, mutable collection. `[1, 2, 3]`. We'll meet these in detail in Volume 3.
- **`dict`** — Key-value mapping. `{"name": "Ryan", "age": 37}`. Volume 3.
- **`tuple`** — Ordered, immutable collection. `(1, 2, 3)`. Volume 3.
- **`set`** — Unordered collection of unique values. `{1, 2, 3}`. Volume 3.
- **`NoneType`** — The type whose only value is `None`. Used to represent "no value."
- **`bytes`** — Raw binary data. We'll meet these later.

We'll go deep on each. For now, just know they exist and have names.

</Section>

<Section label="The type() function">

Python tells you the type of any value with the built-in `type()` function. Try it:

<CodeRunner
  initial={`# What's the type of each of these?

print(type(5))
print(type(5.0))
print(type("hello"))
print(type(True))
print(type(None))
print(type([1, 2, 3]))
print(type({"name": "Ryan"}))
print(type((1, 2)))`}
  caption="The output shows '<class int>', '<class str>', etc. The 'class' wording is technical — every type in Python is a class. We'll get to what that means in Volume 6."
/>

You should see:

```
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
<class 'NoneType'>
<class 'list'>
<class 'dict'>
<class 'tuple'>
```

The format `<class 'int'>` is just Python's way of saying "this value is of type int." The word "class" is technical — in Python, every type is implemented as a class — but for now you can read it as "type."

</Section>

<EtymologyCard
  term="type"
  origin="Greek via Latin"
  rootForm="typos"
  rootMeaning="a stamp, an impression"
  story="From the Greek 'typos,' meaning a stamp or the impression a stamp leaves on wax. The word entered Latin and then English meaning 'a class or kind' — a category that all members share. By the 19th century 'type' was the standard word for 'a category of things sharing essential features.' In the 1950s, programming-language designers started using 'type' to mean 'the category of values a variable can hold,' inheriting the philosophical sense directly: integers and strings are different kinds of things, like nouns and verbs are different kinds of words."
  entryToComputing="The notion of a 'type system' — the formal rules a language has for what types can be combined and how — is central to programming-language theory. Languages with strict type rules are called 'strongly typed'; languages where types are checked at runtime are called 'dynamically typed' (Python is one); languages where types are checked before runtime are 'statically typed' (Java, Go)."
  insight="When we say a value 'has a type,' we're using the same metaphor as a stamp making an impression: the type is the shape that's been imprinted on the data. A value can't be of two types at once, just as a single stamp produces a single impression."
/>

<Section label="Strong vs. dynamic typing">

Python has two characteristics worth distinguishing.

It's *dynamically typed* — meaning the type of a variable is determined at runtime, not declared in source code. You don't write `int x = 5;`, you write `x = 5`. Python figures out at runtime that `x` is an int. If you reassign `x = "hello"`, Python is fine with it.

It's also *strongly typed* — meaning Python doesn't do silent automatic conversions between types. If you try to add a string to an int, Python doesn't quietly convert one of them. It raises a `TypeError`. You have to do the conversion explicitly.

Compare this to JavaScript, which is dynamically typed and *weakly* typed: in JS, `"5" + 1` produces `"51"` (the int gets silently converted to a string). This kind of silent coercion is what gives JavaScript its reputation for surprising behavior. Python errs on the side of explicit: if you want a conversion, you ask for it (`str(1)` or `int("5")`).

The combination — dynamic but strong — is part of why Python feels predictable. The interpreter doesn't decide things for you; it does what you wrote.

</Section>

<CodeRunner
  initial={`# Demonstrating strong typing.
# Python refuses to silently convert.

print("5" + "3")     # works: string concatenation, gives "53"
print(5 + 3)         # works: integer addition, gives 8

# This will raise TypeError:
print("5" + 3)`}
  caption="The third line errors. Python won't guess what you meant. You must either convert the string with int(), or convert the integer with str()."
/>

<Section label="Conversions">

Python provides built-in functions for every common type conversion:

- `int(x)` — convert to integer. `int("5")` → 5, `int(3.7)` → 3 (truncates toward zero).
- `float(x)` — convert to float. `float("3.14")` → 3.14, `float(5)` → 5.0.
- `str(x)` — convert to string. `str(42)` → "42", `str(3.14)` → "3.14".
- `bool(x)` — convert to boolean. `bool(0)` → False, `bool(5)` → True, `bool("")` → False, `bool("hi")` → True.
- `list(x)` — convert to list. `list("abc")` → ['a', 'b', 'c'].
- `tuple(x)` — convert to tuple. `tuple([1, 2])` → (1, 2).

Each conversion has rules. `int("5")` works; `int("hello")` raises a `ValueError` (the string isn't a valid integer). `int(3.99)` truncates to 3, not rounds to 4. These behaviors are documented and you'll learn them as you go.

</Section>

<CodeRunner
  initial={`# Conversion examples.

# Strings to numbers.
print(int("42"))       # 42 — integer
print(float("3.14"))   # 3.14 — float
print(int("  42  "))   # 42 — int() trims whitespace

# Numbers to strings.
print(str(42))         # "42"
print(str(3.14))       # "3.14"

# Booleans.
print(bool(0))         # False
print(bool(""))        # False
print(bool("hello"))   # True
print(bool([]))        # False (empty list is falsy)
print(bool([0]))       # True (non-empty list is truthy)`}
  caption="Conversions follow specific rules. Empty containers (string, list, dict) convert to False. Non-empty ones to True. Zero converts to False. Everything else to True."
/>

<Section label="Truthiness">

The `bool()` examples above hint at one of Python's interesting features: *truthiness*. Every value in Python has a "truthy" or "falsy" status, even if it's not actually a boolean. This matters because Python's `if` statement accepts any value, not just booleans.

Falsy values:
- `False`
- `None`
- `0`, `0.0`
- `""` (empty string)
- `[]` (empty list), `{}` (empty dict), `()` (empty tuple), `set()` (empty set)

Everything else is truthy.

This means you can write idiomatic Python like:

```python
if items:
    process(items)
else:
    print("nothing to process")
```

Instead of the more verbose:

```python
if len(items) > 0:
    process(items)
else:
    print("nothing to process")
```

Both work. The first is more Pythonic. We'll come back to truthiness in Volume 4.

</Section>

<Exercise
  title="Inspect, convert, combine"
  prompt="The code below has three values. For each, print its type using `type()`. Then convert all three to strings and concatenate them with spaces between them. The output should be 4 lines: three type lines, then 'the values are 5 3.14 hello'."
  starter={`a = 5
b = 3.14
c = "hello"

# Print the type of each.
print(type(a))
print(type(b))
print(type(c))

# Convert all three to strings and concatenate them with spaces.
result = ___
print("the values are " + result)`}
  expected={`<class 'int'>
<class 'float'>
<class 'str'>
the values are 5 3.14 hello`}
  hints={[
    "For the result, you need to convert a and b to strings (c is already one). One way: str(a) + ' ' + str(b) + ' ' + c.",
    "Note the explicit spaces inside the string literals — those are what separate the values in the output."
  ]}
  solution={`a = 5
b = 3.14
c = "hello"

print(type(a))
print(type(b))
print(type(c))

result = str(a) + " " + str(b) + " " + c
print("the values are " + result)`}
/>

<Section label="Why types matter for FDE work">

A frequent source of bugs in production AI systems is silent type confusion: a function expects an integer ID, gets a string ID that happens to look like an integer, and misbehaves in subtle ways. Or expects a list of strings, gets a list of bytes (because the data came from a file in binary mode), and produces garbled output.

Modern Python makes type-related bugs less common with *type hints* — annotations on function signatures that say what types are expected. We'll cover them in Volume 5. For now, the discipline of *thinking in types* — asking what kind of thing each value is — is the foundation. Even without type hints, a programmer who consistently thinks in types writes fewer bugs than one who doesn't.

</Section>

<InterviewPhrase setup="If asked 'what does it mean for Python to be dynamically and strongly typed,' something like this works.">

Dynamic typing means the type of a variable is determined at runtime, not declared in advance. I can write `x = 5` and `x = "hello"` and Python is fine with both. Strong typing means Python doesn't do silent type coercion — if I try to add a string to an integer, I get a TypeError, not a guess. The combination is part of why Python feels predictable: the interpreter does what you wrote, and when types don't match, it tells you instead of pretending they did.

</InterviewPhrase>

<Connection
  back={[{ id: '01-10-input-and-the-conversation', title: 'Input and the Two-Way Conversation' }]}
  forward={[{ id: '01-12-integers', title: 'Integers — Whole Numbers, Unbounded' }]}
>

Next: integers. We dig into how Python represents whole numbers, why Python's integers are special compared to other languages', and the operations Python supports on them.

</Connection>
