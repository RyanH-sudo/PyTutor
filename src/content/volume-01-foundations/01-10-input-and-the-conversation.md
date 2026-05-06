---
id: 01-10-input-and-the-conversation
volume: volume-01-foundations
chapter: 2
number: 10
title: "Input and the Two-Way Conversation"
subtitle: "Programs that listen, then respond. The fundamental shape of an interactive program."
estimatedMinutes: 12
prerequisites: [01-9-comments-and-docstrings]
keyTerms: [function, argument, string]
exerciseCount: 2
checkpoint: false
tags: [practice]
---

<Section label="The Opening">

Until now, our programs have been one-way — Python prints, we read. To make a program that *responds* to a user, we need a way to *receive input from the user*. That's what the `input()` function does.

`input()` is the conversational partner of `print()`. Where `print()` shows things to the user, `input()` waits for the user to type something and gives that text back to the program. With both, you have a complete two-way conversation: the program asks, the user answers, the program responds. This is the fundamental shape of every interactive program.

A note about the in-browser environment: the editor we use here doesn't easily support real keyboard input the way a terminal does. We'll write programs that *would* read input, and we'll test them by hardcoding the input value. When you eventually run Python on your own computer, `input()` will work the natural way. The concept transfers either way.

</Section>

<Section label="What input() does, exactly">

`input()` is a built-in function. When called, it does three things:

1. If you pass it a string, it prints that string as a prompt — without a trailing newline.
2. It pauses the program and waits for the user to type a line of text and press Enter.
3. It returns the typed text (without the trailing newline) as a string.

Here's the canonical use:

```python
name = input("What is your name? ")
print("Hello, " + name + "!")
```

When you run this in a terminal, the program prints `What is your name? ` (with the cursor right after the question mark, no newline), waits for the user to type, then continues with whatever was typed. If the user typed `Ryan`, then `name` becomes `"Ryan"` and the next line prints `Hello, Ryan!`.

In our in-browser editor, `input()` doesn't have a real terminal to read from. So we'll simulate by assigning a variable directly — but the conceptual shape is the same.

</Section>

<Section label="The simulated version">

Try this. We'll skip `input()` and just assign a value, but the rest of the program is exactly what you'd write in a terminal context.

<CodeRunner
  initial={`# Imagine we asked: input("What is your name? ")
# and the user typed "Ryan".
# In our environment, we'll just hardcode the result.

name = "Ryan"  # would be: input("What is your name? ")

# Now build a personalized response.
print("Hello, " + name + "!")
print("Welcome to Python.")`}
  expected={`Hello, Ryan!
Welcome to Python.`}
  caption="In a terminal, the first line would be a real input() call. Here we hardcode the value because the in-browser editor doesn't have a TTY."
/>

When you eventually run Python locally, the actual `input()` version is what you'd write:

```python
name = input("What is your name? ")
print("Hello, " + name + "!")
print("Welcome to Python.")
```

</Section>

<Section label="Input always returns a string">

Here's the most important thing to know about `input()`. *It always returns a string.* Even if the user types digits, `input()` gives you a string of those digit characters, not a number. This is a frequent surprise for beginners.

```python
age = input("How old are you? ")  # user types "25"
# age is now the string "25", NOT the integer 25.

# This breaks:
next_year = age + 1
# TypeError: can only concatenate str (not "int") to str
```

The fix is to convert the string to a number explicitly using `int()` (or `float()` for decimals).

```python
age_text = input("How old are you? ")  # "25"
age = int(age_text)                    # 25 (now an int)
next_year = age + 1                    # 26
print("Next year you'll be " + str(next_year))
```

Or more compactly:

```python
age = int(input("How old are you? "))
print("Next year you'll be " + str(age + 1))
```

Notice both directions of conversion: `int(...)` to turn a string into a number; `str(...)` to turn a number back into a string when concatenating.

The reason `input()` returns a string is universality. The function doesn't know what you want to do with the input — you might want a number, a name, a yes/no, anything. So it gives you the raw text and lets you parse it however you need.

</Section>

<CodeRunner
  initial={`# Simulating input that's a number.

age_text = "25"  # would be: input("How old are you? ")

# Convert it to an integer for arithmetic.
age = int(age_text)

# Now we can do math with it.
print("Next year you'll be " + str(age + 1) + ".")
print("In ten years you'll be " + str(age + 10) + ".")`}
  expected={`Next year you'll be 26.
In ten years you'll be 35.`}
  caption="Converting between strings and ints is one of the most common operations in Python. Notice the symmetry: int(text) parses, str(number) formats."
/>

<Section label="A complete interactive program (simulated)">

Putting it all together, here's the kind of program you'd write as one of your first real Python scripts:

<CodeRunner
  initial={`# A small interactive greeter.
# In a terminal, the inputs would come from the user.

# Hardcoded for in-browser. Replace with input() in real Python.
name = "Ryan"           # input("What is your name? ")
age_text = "37"         # input("How old are you? ")

age = int(age_text)
years_to_50 = 50 - age

print("Hello, " + name + "!")
if years_to_50 > 0:
    print("You'll be 50 in " + str(years_to_50) + " years.")
elif years_to_50 == 0:
    print("Happy 50th birthday!")
else:
    print("You passed 50, " + str(-years_to_50) + " years ago.")

print("Goodbye, " + name + ".")`}
  expected={`Hello, Ryan!
You'll be 50 in 13 years.
Goodbye, Ryan.`}
  caption="A complete program with simulated input, conditional logic, and personalized output. We'll cover if/elif/else properly in Volume 4 — for now, treat it as 'choose one of these branches based on the condition.'"
/>

This is more code than we've seen so far, but every line is something we've already discussed:

- Comments explain intent.
- Variables are assigned with `=`.
- `int()` and `str()` convert between strings and integers.
- Arithmetic uses `+` and `-`.
- Comparison uses `>`, `==`, and (implicitly via the `else`) `<`.
- `if`/`elif`/`else` chooses one branch based on a condition.
- `print()` writes to the output.

You don't need to fully understand the `if`/`elif`/`else` structure yet — we'll go deep on it in Volume 4. The point is that you can already read this and roughly follow what it does.

</Section>

<Exercise
  title="Make a simulated dialogue"
  prompt="Write a program that simulates asking the user for two numbers, then prints their sum, difference, and product. Use hardcoded values (instead of real input) — say, `5` and `3`. The output should be three lines: the sum is 8, the difference is 2, the product is 15."
  starter={`# Simulated input.
a_text = "5"
b_text = "3"

# Convert to integers.
a = ___
b = ___

# Print the three results.
print(...)
print(...)
print(...)`}
  expected={`the sum is 8
the difference is 2
the product is 15`}
  hints={[
    "Use int(a_text) and int(b_text) to convert.",
    "Each print should look like: print(\"the sum is \" + str(a + b)).",
    "Pay attention to spaces and case in the expected output."
  ]}
  solution={`a_text = "5"
b_text = "3"

a = int(a_text)
b = int(b_text)

print("the sum is " + str(a + b))
print("the difference is " + str(a - b))
print("the product is " + str(a * b))`}
/>

<Exercise
  title="String input, string output"
  prompt="Write a program that simulates the user entering a city name (use 'Chiang Mai') and prints two lines: 'Hello from [city]!' and 'The city has [length] characters.' For the length, use Python's built-in `len()` function — `len(\"hello\")` returns 5."
  starter={`city = "Chiang Mai"

# Print the greeting.
print(...)

# Print the length. Remember to convert the int to a string with str().
print(...)`}
  expected={`Hello from Chiang Mai!
The city has 10 characters.`}
  hints={[
    "First print: \"Hello from \" + city + \"!\"",
    "Second print: \"The city has \" + str(len(city)) + \" characters.\". Note `len(city)` returns 10, the number of characters in 'Chiang Mai' including the space."
  ]}
  solution={`city = "Chiang Mai"

print("Hello from " + city + "!")
print("The city has " + str(len(city)) + " characters.")`}
/>

<Section label="What you can do now">

After ten lessons, you can:

- Read and write Python source code with confidence about each character's meaning.
- Use comments and docstrings to explain *why* you wrote what you wrote.
- Define string and integer variables.
- Concatenate strings with `+`.
- Convert between strings and integers using `str()` and `int()`.
- Call built-in functions like `print()`, `input()`, `len()`.
- Reason about the difference between syntax errors and runtime errors.
- Use a REPL (or our editor) to test small ideas quickly.

You're not yet writing programs that solve real problems, but you've crossed a threshold. The vocabulary is starting to feel native. The next chapter of Volume 1 (lessons 11-20) goes deeper into Python's data types — numbers, strings, booleans — and lays the foundation for everything that follows.

We've reached the end of the first ten lessons. Take a break. Walk around. Come back tomorrow if you can — sleep is one of the best learning techniques.

When you do come back, the next chapter awaits.

</Section>

<Connection
  back={[{ id: '01-9-comments-and-docstrings', title: 'Comments, Docstrings, and Talking to Future You' }]}
>

Volume 1 continues. Lessons 11–45 will cover types in depth, expressions and operators, control flow, our first functions, and end with a small project: a configurable greeter that handles command-line arguments. New lessons are added regularly.

</Connection>
