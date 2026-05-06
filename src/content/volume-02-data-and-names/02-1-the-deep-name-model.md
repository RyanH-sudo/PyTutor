---
id: 02-1-the-deep-name-model
volume: volume-02-data-and-names
chapter: 1
number: 1
title: "The Deep Model — Names, Values, References"
subtitle: "Why understanding this prevents a thousand future bugs."
estimatedMinutes: 13
prerequisites: [01-30-for-loops]
keyTerms: [variable]
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

Welcome to Volume 2. Where Volume 1 introduced Python's surface, Volume 2 looks underneath. We're going to study how Python represents data in memory — names, values, references, mutability — because the surface behavior makes sense only when you understand the model.

You met the "names not boxes" idea in Volume 1, lesson 16. This time we go deeper, with diagrams and concrete examples that show what's happening when you write `a = b`.

</Section>

<Section label="Three things to keep separate">

In Python, three concepts are easy to confuse:

1. **The value.** The actual object in memory — the integer 5, the string "hello", the list [1, 2, 3].
2. **The name.** The variable — `x`, `name`, `count`. A name is a label.
3. **The reference.** The arrow connecting the name to the value. Python's "names point to values" model is about references.

When you write `x = 5`, three things happen:
1. Python creates the value `5` (or reuses an existing one).
2. Python ensures the name `x` exists in the current scope.
3. Python makes `x` reference the value `5`.

When you write `x = 7`, the value `5` doesn't change. The reference is moved: `x` now points at `7`.

This is different from C, where `x = 5` actually writes the bits `00000101` into the memory location associated with `x`. Python's variables are *references*, not memory cells.

</Section>

<Section label="The id() function shows references">

Each Python value has an *identity* — a unique number that distinguishes it from every other value. The `id()` function returns it.

```python
a = 1000
b = 1000
print(id(a))   # some number
print(id(b))   # might be the same, might be different

c = a
print(id(c))   # SAME as id(a) — c references the same object
```

For small integers (-5 to 256) and short strings, Python often interns the values — there's only one object per distinct value. So `id(1) == id(1)` always. For larger integers, this is implementation-dependent.

The interesting case is `c = a`. This makes `c` reference the *same value* as `a`. Both names point at the same object in memory. `id(a) == id(c)` is guaranteed True.

</Section>

<Section label="The is operator">

Python has two equality-like operators:

- `==` — value equality. Are these two values equal?
- `is` — identity. Are these two names referencing the same object?

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)    # True — values equal
print(a is b)    # False — different list objects
print(a is c)    # True — same list object
```

When to use which? Use `==` for almost everything (testing for equal value). Use `is` for testing identity, especially with `None`:

```python
if x is None:    # the canonical None check
    ...
```

`None` is a singleton — there's only one `None` object — so `is None` is correct and idiomatic. Other comparisons should use `==`.

</Section>

<CodeRunner
  initial={`# Demonstrating identity vs equality.

a = [1, 2, 3]
b = [1, 2, 3]
c = a

print("a == b:", a == b)      # True (same values)
print("a is b:", a is b)      # False (different objects)
print("a is c:", a is c)      # True (same object)

# Mutating through one reference is visible through others:
c.append(4)
print("a after c.append:", a)
print("c after c.append:", c)

# But b is unaffected:
print("b unchanged:", b)`}
  caption="When c = a, c becomes a second reference to the same list. Mutating through c is visible through a. b is independent."
/>

<Section label="Mutable vs immutable, deeply">

The most important distinction in Python's data model:

**Immutable types** can't change in place. To "modify," you create a new value.
- `int`, `float`, `str`, `tuple`, `bool`, `frozenset`, `bytes`

**Mutable types** can change in place. Multiple references see the change.
- `list`, `dict`, `set`, `bytearray`, plus most user-defined classes

This split has big implications:

```python
# Immutable: rebinding doesn't affect other references.
a = "hello"
b = a
a = a + "!"      # creates a new string, rebinds a
print(a)         # "hello!"
print(b)         # "hello" — unaffected

# Mutable: mutating through one reference affects all.
x = [1, 2, 3]
y = x
x.append(4)      # modifies the list in place
print(x)         # [1, 2, 3, 4]
print(y)         # [1, 2, 3, 4] — sees the change!
```

This shapes a lot of Python conventions:
- Pass mutable defaults carefully (Volume 5 has a famous gotcha).
- Copy mutable values when you need independence (`x[:]`, `list(x)`, `copy.deepcopy(x)`).
- Use immutable types as dict keys; mutable types can't be hashed.

</Section>

<Exercise
  title="Predict the output"
  prompt="Walk through this code in your head, predict what gets printed, then run to verify."
  starter={`a = [1, 2, 3]
b = a
c = list(a)        # creates a copy

a.append(4)

print("a:", a)
print("b:", b)
print("c:", c)`}
  expected={`a: [1, 2, 3, 4]
b: [1, 2, 3, 4]
c: [1, 2, 3]`}
  hints={[
    "b = a creates an alias — b and a are the same list. Mutation visible through both.",
    "c = list(a) creates a copy — a separate list with the same contents. Independent."
  ]}
  solution={`a = [1, 2, 3]
b = a
c = list(a)

a.append(4)

print("a:", a)
print("b:", b)
print("c:", c)`}
/>

<Section label="What's coming in Volume 2">

The remaining lessons in Volume 2 dive into:

- Binary in detail — IEEE 754, two's complement, the deep representation.
- Strings deeply — Unicode normalization, slicing performance.
- The numeric tower — int, float, Decimal, Fraction, complex.
- None and the philosophy of "no value."
- Hashing and how dictionaries actually work underneath.

This is the volume where the surface behavior of Volume 1 starts to make sense from underneath.

</Section>

<Connection
  back={[{ id: '01-30-for-loops', title: 'For Loops and the Iteration Protocol' }]}
>

Volume 2 continues with deeper material. Each lesson here unlocks understanding of why Python behaves the way it does.

</Connection>
