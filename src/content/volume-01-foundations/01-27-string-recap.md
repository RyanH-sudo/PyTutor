---
id: 01-27-string-recap
volume: volume-01-foundations
chapter: 5
number: 27
title: "String Chapter Recap"
subtitle: "Combined practice on indexing, methods, formatting, parsing."
estimatedMinutes: 12
prerequisites: [01-26-encoding-and-bytes]
keyTerms: []
exerciseCount: 3
checkpoint: true
tags: [practice]
---

<Section label="The Opening">

A checkpoint lesson. We've covered strings from intro through encoding — that's a lot of material. Before we move into control flow (chapter 6, lessons 28-45), let's do three combined exercises that mix everything.

</Section>

<Exercise
  title="Word counter"
  prompt="Given the sentence below, count how many words it contains, find the longest word, and print both. Use split() to break it into words."
  starter={`text = "The quick brown fox jumps over the lazy dog"

words = text.split()
word_count = len(words)

# Find the longest word.
longest = ""
for w in words:
    if len(w) > len(longest):
        longest = w

print(f"word count: {word_count}")
print(f"longest word: {longest}")`}
  expected={`word count: 9
longest word: quick`}
  hints={[
    "split() with no argument splits on whitespace.",
    "The longest finder loops, comparing each word's length to the current longest."
  ]}
  solution={`text = "The quick brown fox jumps over the lazy dog"

words = text.split()
word_count = len(words)

longest = ""
for w in words:
    if len(w) > len(longest):
        longest = w

print(f"word count: {word_count}")
print(f"longest word: {longest}")`}
/>

<Exercise
  title="Build a CSV row"
  prompt="Given name 'Ryan Haig', age 37, and balance 1234.56, build a CSV-formatted line `Ryan Haig,37,1234.56` using f-strings. The balance should have exactly 2 decimal places."
  starter={`name = "Ryan Haig"
age = 37
balance = 1234.56

line = f"___"
print(line)`}
  expected="Ryan Haig,37,1234.56"
  hints={[
    "f\"{name},{age},{balance:.2f}\""
  ]}
  solution={`name = "Ryan Haig"
age = 37
balance = 1234.56

line = f"{name},{age},{balance:.2f}"
print(line)`}
/>

<Exercise
  title="Parse a key=value line"
  prompt="Given the string 'name=Ryan; age=37; city=Chiang Mai', parse out each key-value pair and print them, one per line, formatted as 'key -> value'. Use split() twice (once on '; ', once on '=')."
  starter={`text = "name=Ryan; age=37; city=Chiang Mai"

# Step 1: split on "; "
pairs = text.split("; ")

# Step 2: for each pair, split on "=", then print.
for p in pairs:
    key, value = p.split("=")
    print(f"{key} -> {value}")`}
  expected={`name -> Ryan
age -> 37
city -> Chiang Mai`}
  hints={[
    "p.split('=') returns a 2-element list. We unpack into `key, value`. (We'll cover unpacking properly in Volume 3.)"
  ]}
  solution={`text = "name=Ryan; age=37; city=Chiang Mai"

pairs = text.split("; ")
for p in pairs:
    key, value = p.split("=")
    print(f"{key} -> {value}")`}
/>

<Section label="What's next">

Chapter 6 (lessons 28-45) is control flow: if/elif/else, while loops, for loops, break and continue, the range function, nested loops, and a few of the most common loop patterns. By the end of Volume 1 you'll have a small project: a configurable greeter that handles command-line arguments.

Strings are the type you'll work with most. The methods we've seen — split, join, strip, replace, find, format with f-strings — are the daily bread of Python work. If any feel shaky, the corresponding lesson is the place to revisit.

</Section>

<Connection
  back={[{ id: '01-26-encoding-and-bytes', title: 'Encoding and Bytes — The Hidden Layer' }]}
  forward={[{ id: '01-28-control-flow-intro', title: 'Control Flow — Making Decisions' }]}
>

Next: control flow. We'll start with `if`, `elif`, `else` — the foundation of all decision-making in code.

</Connection>
