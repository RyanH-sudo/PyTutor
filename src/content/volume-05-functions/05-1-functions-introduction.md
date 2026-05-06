---
id: 05-1-functions-introduction
volume: volume-05-functions
chapter: 1
number: 1
title: "Functions — Naming a Process"
subtitle: "The single most important abstraction in programming."
estimatedMinutes: 12
prerequisites: []
keyTerms: [function, argument, parameter]
exerciseCount: 2
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

A function is a named, reusable block of code. You give it inputs (arguments), it does some work, and it gives you an output (return value). That's the whole idea.

Functions are the foundation of every non-trivial program. They let you name a process so you can call it by name. They let you reuse logic without copying it. They let you organize complexity. By the end of this volume, you'll be writing functions reflexively.

</Section>

<Section label="Defining a function">

Use the `def` keyword:

```python
def greet(name):
    """Print a greeting for the given name."""
    print(f"Hello, {name}!")
```

Reading it character by character:

- `def` — keyword that introduces a function definition.
- `greet` — the function's name. By convention, lowercase with underscores.
- `(name)` — the parameter list. Inside the parens, names that will receive the arguments.
- `:` — the colon required after the parameter list.
- The indented block — the function's body.
- `"""..."""` — an optional docstring (lesson 9 covered these).

After this definition, the name `greet` is bound to a function object. You call it with `greet("Ryan")`, which executes the body with `name = "Ryan"`.

</Section>

<Section label="Calling a function">

```python
greet("Ryan")              # prints "Hello, Ryan!"
greet("Sarah")             # prints "Hello, Sarah!"
```

The value you pass in (`"Ryan"`) is the *argument*. It binds to the parameter (`name`) inside the function. After the function returns, the parameter is gone.

</Section>

<CodeRunner
  initial={`def greet(name):
    """Print a greeting for the given name."""
    print(f"Hello, {name}!")

# Call it.
greet("Ryan")
greet("Sarah")
greet("the world")

# Functions are first-class — you can store and pass them.
my_function = greet
my_function("again")`}
  caption="Notice that `greet` is just a name. We can bind it to another name (my_function) and call it through the new name. Functions in Python are first-class values."
/>

<Section label="Returning a value">

Functions can return values with the `return` keyword:

```python
def add(x, y):
    """Return the sum of two numbers."""
    return x + y

result = add(2, 3)         # 5
print(result)
```

`return` exits the function immediately and gives back the value. Without `return`, a function returns `None` implicitly. The two are different:

```python
def f():
    print("hello")          # side effect: prints

def g():
    return "hello"          # returns the string

f()                          # prints "hello"; result is None
g()                          # nothing visible; result is "hello"

print(f())                   # prints "hello", then prints None
print(g())                   # prints "hello"
```

If you want a function to *give you* a value (so you can use it elsewhere), use `return`. If you want it to *do something* (print, write a file), the side effect is in the body.

</Section>

<Section label="Multiple parameters and arguments">

```python
def greet(name, greeting):
    return f"{greeting}, {name}!"

print(greet("Ryan", "Hi"))                    # positional
print(greet(name="Ryan", greeting="Hi"))      # keyword
print(greet(greeting="Hi", name="Ryan"))      # keyword, any order
print(greet("Ryan", greeting="Hi"))            # mixed (positional first)
```

Arguments can be passed by *position* (in the order the parameters were defined) or by *keyword* (named explicitly). Keyword arguments are clearer when there are several parameters.

</Section>

<Section label="Default values">

Parameters can have default values. If the caller doesn't provide a value, the default is used.

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Ryan")              # "Hello, Ryan!" — uses default
greet("Ryan", "Hi")         # "Hi, Ryan!"
greet("Ryan", greeting="Hi")  # "Hi, Ryan!" — explicit keyword
```

Defaults make functions easier to call. They specify the "common case" so you don't have to provide it every time.

A famous gotcha: don't use mutable defaults.

```python
def add_item(item, items=[]):     # DON'T — mutable default!
    items.append(item)
    return items
```

The `[]` is created *once* when the function is defined and reused across all calls. The standard fix:

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

We'll cover this gotcha in detail later.

</Section>

<Section label="Why functions matter">

Three reasons:

**Reuse.** Define logic once, call it many times. Without functions, you'd copy-paste, and copies drift apart over time, accumulating bugs.

**Naming.** A function name is a label for what it does. `compute_tax_amount(income, rate)` is clearer than 10 lines of inline arithmetic. The name is the *abstraction* — you can think about *what* it does without remembering *how*.

**Testing.** Functions are the unit of testing. You can call a function with known inputs and verify the output. We'll cover testing in Volume 9.

The general principle: **if you find yourself writing the same logic twice, extract a function**. The function is named, reusable, testable. Three benefits for one small refactor.

</Section>

<Exercise
  title="Define and call"
  prompt="Define a function `is_even(n)` that returns True if n is even and False otherwise. Then test it on 4, 5, 0, and -2."
  starter={`def is_even(n):
    """Return True if n is even, False otherwise."""
    return ___

print(is_even(4))
print(is_even(5))
print(is_even(0))
print(is_even(-2))`}
  expected={`True
False
True
True`}
  hints={[
    "A number is even if n % 2 == 0.",
    "Return n % 2 == 0 directly — the comparison already returns a bool."
  ]}
  solution={`def is_even(n):
    """Return True if n is even, False otherwise."""
    return n % 2 == 0

print(is_even(4))
print(is_even(5))
print(is_even(0))
print(is_even(-2))`}
/>

<Exercise
  title="Compose simple functions"
  prompt="Define two functions: `double(n)` returns n*2, and `add_one(n)` returns n+1. Use them together to compute double(3) + add_one(4). Print the result."
  starter={`def double(n):
    return ___

def add_one(n):
    return ___

result = double(3) + add_one(4)
print(result)`}
  expected="11"
  hints={[
    "double(3) is 6, add_one(4) is 5, total is 11."
  ]}
  solution={`def double(n):
    return n * 2

def add_one(n):
    return n + 1

result = double(3) + add_one(4)
print(result)`}
/>

<Connection>

Volume 5 continues with scope (LEGB), closures, decorators, lambda, *args/**kwargs, and type hints — the full Python function model.

</Connection>
