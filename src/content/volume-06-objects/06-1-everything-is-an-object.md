---
id: 06-1-everything-is-an-object
volume: volume-06-objects
chapter: 1
number: 1
title: "Everything Is an Object"
subtitle: "What 'object-oriented' actually means in Python."
estimatedMinutes: 11
prerequisites: []
keyTerms: [object, class, instance]
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

In Python, *everything* is an object. The integer 5. The string "hello". The list [1,2,3]. Functions. Classes. Modules. Even types themselves. There's a uniform model underneath that explains a lot of Python's behavior.

This is the first lesson of Volume 6. We'll cover OOP from scratch — what classes are, why they exist, how to define them, the magic methods that customize behavior, and when *not* to use OOP.

</Section>

<EtymologyCard
  term="object"
  origin="Medieval Latin"
  rootForm="objectum"
  rootMeaning="thing thrown before the mind"
  story="From Medieval Latin 'objectum,' a noun meaning 'thing presented to the senses or mind.' From 'ob-' (toward) plus 'jacere' (to throw). An object, in the original sense, is something thrown into your awareness — anything you can perceive or think about. The philosophical sense — 'a material thing' — has been in English since the 1300s. In computing, the term was adopted in the 1960s for 'a thing the program is manipulating' — a piece of data with associated behavior. In Smalltalk (1972) and the languages that followed, an object is a self-contained unit that bundles state (data) and behavior (methods)."
  insight="Etymology gives us the right intuition: an object is a thing presented to the program — a coherent unit you can refer to, examine, and operate on. Calling integers, strings, and functions all 'objects' makes sense in this older meaning: each is a coherent thing the program can hold and manipulate."
/>

<Section label="What does it mean for everything to be an object">

It means every value has:

- A **type** (its class). `type(5)` is `int`. `type("hi")` is `str`. `type(print)` is `builtin_function_or_method`.
- An **identity** (its location in memory). `id(5)` returns a unique number.
- **Attributes** (data and methods accessible via `.`). `"hello".upper()`, `[1,2,3].append(4)`, `(5).bit_length()`.

You can verify this for any value:

```python
n = 5
print(type(n))        # <class 'int'>
print(id(n))          # some number
print(n.bit_length()) # 3 — the integer 5 has methods!

s = "hello"
print(type(s))        # <class 'str'>
print(s.upper())      # 'HELLO'
print(s.__class__)    # <class 'str'> — same as type(s)

def my_function():
    pass

print(type(my_function))  # <class 'function'>
print(my_function.__name__)  # 'my_function'
```

Even functions are objects with attributes. This uniformity is one of Python's defining traits.

</Section>

<Section label="Classes define types">

A *class* is a blueprint for creating objects. When you write:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"
```

You're defining a new type called `Dog`. You can then create *instances* of this type:

```python
d1 = Dog("Rex", 5)
d2 = Dog("Buddy", 3)

print(d1.name)        # "Rex"
print(d1.bark())      # "Rex says woof!"
print(type(d1))       # <class 'Dog'>
```

`d1` and `d2` are *instances* of the `Dog` class. Each has its own `name` and `age` attributes. They share the same `bark` method (defined once in the class).

</Section>

<Section label="The four pillars">

Object-oriented programming has four traditional concepts:

1. **Encapsulation** — bundling data and behavior together. A `Dog` object has its name *and* its bark method.
2. **Abstraction** — hiding implementation details. You call `dog.bark()` without knowing how barking works internally.
3. **Inheritance** — a class can inherit attributes and methods from another. A `Poodle` class can inherit from `Dog`.
4. **Polymorphism** — different classes can have methods with the same name that do appropriate things. Both `Dog` and `Cat` might have a `speak()` method.

Python supports all four, with its own particular flavors. We'll explore each over Volume 6.

</Section>

<CodeRunner
  initial={`# Defining and using a class.

class Dog:
    """A dog has a name and an age, and can bark."""

    def __init__(self, name, age):
        """Initialize a new Dog."""
        self.name = name
        self.age = age

    def bark(self):
        """Return the dog's bark."""
        return f"{self.name} says woof!"

    def describe(self):
        """Return a description of the dog."""
        return f"{self.name} is {self.age} years old."


# Create instances.
rex = Dog("Rex", 5)
buddy = Dog("Buddy", 3)

# Use them.
print(rex.bark())
print(rex.describe())
print(buddy.bark())
print(buddy.describe())

# Each instance has its own attributes.
rex.age = 6           # rex had a birthday!
print(rex.describe())
print(buddy.describe())  # buddy is unchanged`}
  caption="Two dogs, sharing the same Dog class but each with their own name and age. The methods are defined once but operate on each instance's own data via `self`."
/>

<Section label="When (not) to use classes">

Python supports OOP, but it's not religious about it. Many Python programs use classes minimally. Functions and dicts are often enough for simple data and operations.

Use a class when:
- You have data and behavior that belong together (a `Customer` with methods like `total_spent()`).
- Multiple instances of the same shape need to coexist.
- You want polymorphism — different objects responding to the same method name differently.
- You're modeling a domain concept that has identity (an Order, a User, a Pipeline).

Don't use a class when:
- A simple function or dict will do. Don't wrap a single function in a class with one method.
- You're tempted to use class state to avoid passing arguments. (This is "global state in disguise.")
- The data is just a record — consider `dataclass` (Volume 6 covers this) or just a dict.

The mature instinct: *reach for the simplest tool that handles the case*. A function for behavior. A dict for data. A dataclass for structured records. A class for things with identity and behavior.

</Section>

<Exercise
  title="Define a simple class"
  prompt="Define a class `Point` with x and y attributes. Add a method `distance_from_origin()` that returns the Euclidean distance from (0,0). Test with the point (3, 4) — the distance should be 5."
  starter={`import math

class Point:
    """A 2D point with x and y coordinates."""

    def __init__(self, x, y):
        self.x = ___
        self.y = ___

    def distance_from_origin(self):
        """Return distance from (0, 0)."""
        return math.sqrt(___)


p = Point(3, 4)
print(p.distance_from_origin())`}
  expected="5.0"
  hints={[
    "In __init__: self.x = x; self.y = y.",
    "Distance: sqrt(x² + y²) → math.sqrt(self.x ** 2 + self.y ** 2)."
  ]}
  solution={`import math

class Point:
    """A 2D point with x and y coordinates."""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance_from_origin(self):
        """Return distance from (0, 0)."""
        return math.sqrt(self.x ** 2 + self.y ** 2)


p = Point(3, 4)
print(p.distance_from_origin())`}
/>

<Connection>

Volume 6 continues with __init__ in detail, properties, magic methods, inheritance, dataclasses, and when each is the right tool.

</Connection>
