---
id: 01-5-meet-python
volume: volume-01-foundations
chapter: 2
number: 5
title: "Meet Python"
subtitle: "The Zen of Python, the GIL, the indentation thing — what makes Python *Python*."
estimatedMinutes: 13
prerequisites: [01-4-instructions-to-languages]
keyTerms: [python, syntax]
exerciseCount: 0
checkpoint: false
tags: [theory, history]
---

<Section label="The Opening">

We've talked about computers in general and languages in general. Now we focus on the specific language we're learning: Python. This lesson is about Python's character — the philosophy that shaped it, the choices that distinguish it from other languages, and the cultural artifacts that come with it (yes, Monty Python jokes are still funny).

By the end you'll have a sense not just of *what* Python is but *who* it is. Languages have personalities, and Python's is unusually deliberate.

</Section>

<Section label="The story of how it began">

We covered some of this in Volume 0, but let's get more specific about why Python feels the way it does.

In 1989, Guido van Rossum was working on the Amoeba operating system at CWI, the Dutch national research institute for math and computer science. He'd worked previously on a language called ABC, which was designed to teach beginners. ABC had some lovely features — readable syntax, indentation-based blocks, a small core — but it had problems too. It was hard to extend with new features. It couldn't easily call C libraries. It had no community.

Guido decided to write a new language that kept ABC's good parts and fixed its bad parts. His goals, in his own retrospective writings, were:

1. **An easy and intuitive language just as powerful as major competitors.**
2. **Open source, so anyone can contribute to its development.**
3. **Code that is as understandable as plain English.**
4. **Suitability for everyday tasks, allowing for short development times.**

He started in December 1989, named the language after Monty Python's Flying Circus (he was reading the scripts), and released the first public version in 1991. It was Python 0.9.0.

By 2000, Python 2.0 was out. By 2008, Python 3.0 — with breaking changes from 2.x — split the community for a decade. By 2020, Python 3 had won, and Python 2 was officially retired.

</Section>

<Section label="The Zen of Python">

Inside the Python interpreter, if you type `import this`, you get a small poem:

<CodeRunner
  initial={`import this`}
  caption="The Zen of Python — written by Tim Peters in 1999. It's a kind of constitution. Read it slowly."
/>

When you run that, you'll see:

```
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of them!
```

This is not just a cute Easter egg. The Zen is taken seriously. When the Python community debates whether to add a feature, somebody usually quotes the relevant Zen line. The values are:

- **Readability over cleverness.** Code is read more often than it's written. Make the reading easy.
- **One obvious way.** When there are many ways to do a thing, the language tends to have a "right" way. The community develops around it.
- **Explicit over implicit.** When something is happening, it should be visible in the code, not hidden by magic.
- **Refuse to guess.** When the meaning of a piece of code is ambiguous, the interpreter should raise an error rather than guess what you meant.
- **Errors are loud.** Failures shouldn't be silent. If something goes wrong, you should know.

These values are why Python feels the way it does. When you write Python and it feels like there's a "natural" way to express your idea — that's the Zen at work.

</Section>

<Section label="The indentation thing">

Most programming languages use punctuation to delimit blocks of code:

```c
// C, C++, Java, JavaScript style:
if (x > 0) {
    print("positive");
} else {
    print("not positive");
}
```

Python uses indentation:

```python
# Python style:
if x > 0:
    print("positive")
else:
    print("not positive")
```

This is one of the most distinctive features of Python and one of the most divisive. Programmers from C-family backgrounds often hate it at first ("the *whitespace* is meaningful?"). After a few weeks of writing Python, most come around to it.

Why did Guido choose this? Because *programmers indent their code anyway*. In C, you indent inside braces purely as a visual aid for readers. The compiler doesn't care about the indentation — only the braces. But the indentation is what your eye uses. Guido's argument was: if the indentation is what we read, why have a separate syntactic mechanism (braces) that can disagree with the indentation? Just make the indentation itself the syntax. One source of truth for what's inside what.

The downside is that you have to be careful about indentation. Mixing tabs and spaces produces invisible bugs. Python 3 disallows the mixing (it's a `TabError`), so the issue is largely solved, but in editors not configured for Python, it's still possible to fight your tool. The convention is: *four spaces per level, never tabs*. Most editors handle this for you when configured for Python.

</Section>

<Section label="Dynamic typing">

Another distinguishing feature: Python is *dynamically typed*. This means you don't have to declare what type a variable is — Python figures it out at runtime.

In Java:

```java
int x = 5;
String name = "Ryan";
```

In Python:

```python
x = 5
name = "Ryan"
```

The Python interpreter figures out at runtime that `5` is an int and `"Ryan"` is a string. You can even reassign variables to different types:

```python
x = 5            # x is now an int
x = "five"       # x is now a string
```

This flexibility is great for fast development and small scripts. It's also the source of many runtime bugs: if you accidentally pass a string to a function that expects an int, the error doesn't show up until that function actually runs. Statically typed languages catch these mistakes at compile time; dynamically typed languages catch them at runtime, sometimes only on certain code paths.

Python has been adding *type hints* over the years to address this — you can optionally annotate variables and functions with types, and external tools like `mypy` check them for you. We'll cover type hints in Volume 5. For now, just know that Python's default is dynamic typing.

</Section>

<Section label="The standard library">

Python's standard library is unusually large. The phrase "batteries included" is sometimes used to describe it. Here's a sample of what comes built-in, no installation needed:

- `os` and `pathlib` — interact with the operating system, files, paths.
- `sys` — talk to the Python interpreter.
- `re` — regular expressions.
- `json` — read and write JSON.
- `csv` — read and write CSV files.
- `datetime` — work with dates and times.
- `collections` — extra container types (Counter, deque, defaultdict, OrderedDict).
- `itertools` and `functools` — functional-programming utilities.
- `math` and `statistics` — numerical functions.
- `random` — random number generation.
- `urllib` and `http` — make HTTP requests.
- `socket` — low-level networking.
- `threading` and `multiprocessing` — concurrent execution.
- `unittest` — testing framework.
- `argparse` — command-line argument parsing.
- `logging` — structured logging.

We'll meet these gradually. The point is that for many tasks you don't need any external library at all. You just `import` something from the standard library and start using it. We'll explore the most useful parts of the stdlib in Volume 7.

</Section>

<Section label="The package ecosystem">

Beyond the standard library, Python has a massive third-party ecosystem. The package index, called PyPI (Python Package Index), hosts hundreds of thousands of libraries. To install one, you use `pip`:

```
pip install requests
```

This downloads the `requests` library (a popular HTTP client) and installs it so your Python programs can use it. The major AI ecosystem — `numpy`, `pandas`, `pytorch`, `tensorflow`, `transformers`, `langchain`, `anthropic`, `openai`, `chromadb` — all live on PyPI. We'll get hands-on with several of these in Volumes 9–12.

</Section>

<Section label="The GIL — Python's most-discussed quirk">

Python (the standard CPython implementation) has a *Global Interpreter Lock* — the GIL. The GIL is a mutex (a lock) that ensures only one thread executes Python bytecode at a time within a process. This means that even on a multi-core CPU, a single Python program can't actually run multiple threads in parallel, even when threads are doing CPU-bound work.

This sounds bad. Sometimes it is. But:

- The GIL only locks Python code. C extensions (like NumPy) can release the GIL and run truly in parallel.
- For I/O-bound work, the GIL releases automatically when waiting on I/O, so threads do help.
- For CPU-bound parallelism, you use the `multiprocessing` module to run multiple Python *processes* (each with its own GIL).

The Python community has been working for years to remove the GIL or make it optional. Python 3.13 (2024) introduced an experimental no-GIL build. By the late 2020s, no-GIL Python may be standard. For now, the GIL is a thing you should know about. It's interview trivia, but it's also important context for designing concurrent programs.

</Section>

<Section label="Python in 2026">

Where does Python sit in the language landscape today?

- **AI and machine learning:** dominant. Every major framework has Python as its primary API.
- **Data science and analysis:** dominant. NumPy, Pandas, Jupyter notebooks are the default.
- **Scripting and automation:** dominant. Python has replaced shell scripts and Perl in most contexts.
- **Web backend:** common. Django and FastAPI are popular, though Go and Node.js are also strong.
- **System programming:** rare. C, C++, Rust, Go are preferred for high-performance system code.
- **Mobile apps:** rare. Swift (iOS), Kotlin (Android) dominate.
- **Game development:** rare. C++ and C# dominate.
- **Embedded systems:** growing. MicroPython and CircuitPython have niches.

You're learning the language that's increasingly the lingua franca of applied AI. That timing is good for the career path you're aiming at.

</Section>

<InterviewPhrase setup="If asked 'why Python for this work?' something like this works.">

Python wins for applied AI because it sits at the right point on the trade-off curve. The high-level surface — readable syntax, dynamic typing, batteries-included standard library — makes development fast. The C-extension underbelly gives access to performance-critical libraries like NumPy and PyTorch. The ecosystem coalesces around Python: every major LLM API has a Python SDK first. For an FDE working with customer data and frontier models, Python is the path of least resistance for getting from "we have a problem" to "we have a working prototype" in days rather than weeks.

</InterviewPhrase>

<Connection
  back={[{ id: '01-4-instructions-to-languages', title: 'From Instructions to Languages' }]}
  forward={[{ id: '01-6-the-repl', title: 'The REPL — A Conversation with the Interpreter' }]}
>

Next: the REPL. We talk about what it is, why it exists, and we use it.

</Connection>
