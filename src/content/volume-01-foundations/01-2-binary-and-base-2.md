---
id: 01-2-binary-and-base-2
volume: volume-01-foundations
chapter: 1
number: 2
title: "Binary, Base-2, and Why Computers Use It"
subtitle: "How to count when you only have two fingers."
estimatedMinutes: 15
prerequisites: [01-1-what-is-a-computer]
keyTerms: [binary, bit, byte]
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

You count in base 10 — using ten digits, 0 through 9. When you run out of digits, you carry over to a new place: 9, then 10, then 99, then 100. The reason you count in base 10 is almost certainly that humans have ten fingers. Every culture that developed counting (and most did, independently) settled on a base related to body parts — base 10 from fingers, base 20 from fingers and toes, base 12 from finger joints. There's nothing mathematical about base 10. It's an accident of biology.

Computers count in *base 2*. Their "fingers" are bits, and they only have two of them — *on* and *off*. So everything has to be expressed using just 0 and 1. This sounds restrictive. It is and it isn't. Restrictive in the sense that you need more digits to express the same number; not restrictive in the sense that you can express *any* number you want, given enough digits.

In this lesson we're going to make base 2 feel as natural as base 10. We're going to count in it. We're going to see how it relates to the bits we talked about last lesson. By the end you should be able to look at `1011` and recognize it as the number 11.

</Section>

<EtymologyCard
  term="binary"
  origin="Latin"
  rootForm="binarius"
  rootMeaning="consisting of two"
  story="From Latin 'binarius,' from 'bini' (two-by-two, paired). The word entered English in the 1600s as a general adjective meaning 'composed of two parts.' By the 1700s mathematicians were using 'binary number' for base-2 numbers, but the system was a curiosity, not in widespread use. Gottfried Wilhelm Leibniz, the philosopher and mathematician, wrote about binary in 1703 and was fascinated by its connection to Chinese hexagrams. It took the invention of digital computers in the 1940s for binary to become practically important."
  entryToComputing="Binary's adoption was driven entirely by the physics of electronic circuits. Two-state systems (on/off, high voltage/low voltage) are reliable. Multi-state systems are not. By the 1940s, every electronic computer was binary."
  insight="The word 'binary' carries a pair-ness that base-10 'decimal' doesn't have. When we say a system is 'binary,' we mean fundamentally two-fold — yes/no, true/false, 1/0. The word's older everyday meaning ('a binary star,' 'a binary opposition') reinforces this same intuition."
/>

<Section label="How counting works in any base">

To make base 2 feel less alien, let's think clearly about how base 10 works first. The number `347` is a kind of shorthand. What it really means is:

```
3 × 100 + 4 × 10 + 7 × 1
= 3 × 10² + 4 × 10¹ + 7 × 10⁰
```

Each *position* in the number is worth a power of 10. The rightmost position is worth 10⁰ (which is 1). The next is worth 10¹ (which is 10). The next, 10² (which is 100). The next, 10³ (1000). And so on. The digit in each position tells you how many of that power of 10 to add.

That's the whole structure of base 10.

Now base 2 works exactly the same way, but with powers of 2 instead of 10. The number `1011` in binary means:

```
1 × 8 + 0 × 4 + 1 × 2 + 1 × 1
= 1 × 2³ + 0 × 2² + 1 × 2¹ + 1 × 2⁰
```

So `1011` in base 2 equals 11 in base 10.

Each position's value, going right to left, doubles: 1, 2, 4, 8, 16, 32, 64, 128. If you're old enough to have used a calculator with a "doubling" trick, you've already seen this sequence.

</Section>

<Section label="Counting in binary">

Let's count from 0 to 15 in binary. Watch the pattern.

| Decimal | Binary  |
|---------|---------|
| 0       | `0`     |
| 1       | `1`     |
| 2       | `10`    |
| 3       | `11`    |
| 4       | `100`   |
| 5       | `101`   |
| 6       | `110`   |
| 7       | `111`   |
| 8       | `1000`  |
| 9       | `1001`  |
| 10      | `1010`  |
| 11      | `1011`  |
| 12      | `1100`  |
| 13      | `1101`  |
| 14      | `1110`  |
| 15      | `1111`  |

The mechanic is the same as base 10: when you reach the last digit (1 in base 2, 9 in base 10), the next number rolls over and adds a digit on the left. In base 10 you go 9 → 10 (added a "1" position). In base 2 you go 1 → 10 (added a "2" position).

A useful observation: binary numbers grow longer faster than base-10 numbers do. To express the number 1000 in binary takes 10 digits (`1111101000`). To express 1,000,000 takes 20 digits (`11110100001001000000`). This is one reason humans don't naturally use binary — it's compact in *bits* but verbose in *digits*.

</Section>

<Section label="Trying it in Python">

Python understands both decimal and binary literals. You write a binary literal by prefixing it with `0b`. Try this:

<CodeRunner
  initial={`# Python knows binary.
# 0b prefix means "this is a binary literal."

print(0b1011)        # should print 11
print(0b101)         # should print 5
print(0b1111)        # should print 15
print(0b10000000)    # should print 128

# You can also convert decimal to binary
# using the built-in bin() function:

print(bin(11))       # should print 0b1011
print(bin(255))      # should print 0b11111111`}
  caption="Run this. Read each line. Notice the pattern: each binary digit shifted one place doubles the value."
/>

What you should see:

```
11
5
15
128
0b1011
0b11111111
```

Stop for a second and look at the last line — `0b11111111`. That's 255 in decimal. Eight 1s. *Eight bits all set to 1* equals 255. We're going to come back to this number in a moment because it's the magic number behind so much of computing.

</Section>

<Section label="The byte: 8 bits">

A *byte* is 8 bits. Why 8 specifically? Historically because in the 1960s, IBM standardized on 8-bit groups for the System/360 architecture, and 8 was both small enough to be efficient and large enough to represent a useful range of values. But the deeper reason is that 8 bits gives you 256 distinct values, which is exactly enough to represent every letter of English plus punctuation plus digits plus a few control characters — the original ASCII encoding fit in 7 bits, and 8 bits gave one extra bit of headroom.

A byte can represent the numbers 0 through 255. That's why you see 255 a lot. It's also why colors are often expressed as triplets like `(255, 0, 0)` for red — each component is one byte. It's why network addresses are written as `192.168.1.1` — each piece is one byte. It's why "small integer" types in many languages are 8 bits and have a max of 255 (unsigned) or 127 (signed).

The byte is *the* unit of computer memory. When you ask "how big is this file" the answer is in bytes. When you read about a "16 GB stick of RAM" the GB is gigabytes — billions of bytes. Memory is byte-addressable, meaning every byte has a unique numeric location, and the processor can read or write any byte by name.

</Section>

<EtymologyCard
  term="byte"
  origin="English"
  rootForm="bite (deliberately misspelled)"
  rootMeaning="a small portion (and a deliberate respelling of bite to avoid confusion with bit)"
  story="Coined in 1956 by Werner Buchholz, an IBM engineer, while working on the Stretch computer. He needed a word for a group of bits processed together, and 'bite' was the natural choice — a small mouthful — but it would have been pronounced exactly like 'bit' and caused confusion. He respelled it 'byte.' The 'y' makes it visually distinct without changing the pronunciation. The trick worked: bit and byte sound the same when spoken, but readers can tell them apart on a page."
  entryToComputing="The 8-bit byte became standard with IBM's System/360 in 1964. Earlier computers used different group sizes (6 bits, 9 bits, 12 bits — anything you wanted). After System/360, the world agreed on 8."
  insight="Knowing that 'byte' was deliberately respelled to avoid confusion with 'bit' makes it easier to remember which is which. A bit is a single binary digit; a byte is the standard mouthful of 8 bits."
/>

<Section label="Why does this all matter?">

You may be thinking, "okay, computers use binary, neat — but I'm going to write Python, not flip switches. Why do I need this?" The reason is that several quirks of Python (and every other language) are downstream consequences of the binary nature of computers. When we run into them later, they'll feel arbitrary unless you have this background.

For example: Python's integers are unbounded — they can be as large as you want. But Python's *floats* (decimal numbers) have a maximum precision, because they're stored in a fixed number of bits. When you do `0.1 + 0.2` in Python, you don't get exactly `0.3`. You get `0.30000000000000004`. This is not Python's fault — it's a fact about binary representation of decimal numbers. We'll dive into this in Volume 2, but the foundation is here: *the bit-level representation determines what numbers can be stored exactly and which can't*.

Another example: when we talk about how `int` and `bytes` and `str` differ in Python, the underlying difference is what kind of bit patterns the language is treating them as. An `int` is bit pattern interpreted as a number. A `bytes` is bit pattern with no interpretation. A `str` is bit pattern interpreted as Unicode characters.

Programming gets clearer when you understand the layer beneath. We don't dwell here long. But the foundation matters.

</Section>

<Exercise
  title="Convert by hand, then verify"
  prompt="Without using any built-in conversion, calculate by hand what the binary number `110101` is in decimal. Then check your answer in Python by printing `0b110101`. The output should be the number you computed."
  starter={`# Step 1: Compute by hand on a piece of paper.
# Each digit's place value, from right to left:
# 1, 2, 4, 8, 16, 32

# Step 2: Print the value Python sees.
print(0b110101)`}
  expected="53"
  hints={[
    "Reading right to left: position 0 has value 1, position 1 has value 2, position 2 has value 4, etc.",
    "The digits in 110101 from right to left are: 1, 0, 1, 0, 1, 1. So we're adding the place values where the digit is 1.",
    "Position 0 (1×1=1) + position 2 (1×4=4) + position 4 (1×16=16) + position 5 (1×32=32) = 1 + 4 + 16 + 32 = 53."
  ]}
  solution={`# 110101 in binary:
# = 1*32 + 1*16 + 0*8 + 1*4 + 0*2 + 1*1
# = 32 + 16 + 4 + 1
# = 53
print(0b110101)`}
/>

<Section label="Hexadecimal — a kindness for humans">

One last note. Programmers often see numbers written in *hexadecimal* — base 16. Hex digits are 0-9 then A-F (where A=10, B=11, …, F=15). A hex literal in Python uses the prefix `0x`: `0xFF` is 255.

Why does hex exist? Because binary is verbose and hex is compact. A single hex digit is exactly 4 bits, and two hex digits is exactly 8 bits — one byte. This means programmers can write a byte's value as two hex characters: `0xFF` is `11111111`, `0xA0` is `10100000`. It's much easier to read `0xDEADBEEF` than `11011110101011011011111011101111`. They mean the same number; the hex form is humane.

You'll see hex frequently in colors (`#FF6600` is an orange — three bytes: red 255, green 102, blue 0), in memory addresses, and in any context where we want to show the bits in a compact form. Python supports it as a literal:

<CodeRunner
  initial={`print(0xFF)        # 255
print(0xFF == 0b11111111)   # True - same number
print(hex(255))    # '0xff'
print(0xDEADBEEF)  # a famous "magic" hex number`}
  caption="Each hex digit is exactly 4 bits. Two hex digits = 1 byte."
/>

We'll use binary and hex notation occasionally throughout the curriculum, but always with reminders. You don't need to memorize how to convert. You need to recognize the prefixes — `0b` for binary, `0x` for hex — and know that they're just different ways of writing the same numbers.

</Section>

<Section label="Where we are">

In two lessons we've established:

1. A computer is a machine that does tiny operations on patterns of bits.
2. A bit has two states (0 or 1).
3. A byte is 8 bits — 256 possible values.
4. Numbers in binary work just like base 10, but with powers of 2 instead of powers of 10.
5. Hex is a compact human-friendly way to write binary.

This is enough background to start talking about how Python represents numbers, characters, and other data — which is the material of Volume 2. But we have more groundwork to lay first. Next lesson: the components of a computer (memory, processor, I/O) and how they fit together.

</Section>

<Connection
  back={[{ id: '01-1-what-is-a-computer', title: 'What Is a Computer, Really?' }]}
  forward={[{ id: '01-3-anatomy-of-a-computer', title: 'Anatomy of a Computer' }]}
>

Next: the parts of a computer and what each one does. CPU, memory, storage, I/O. The vocabulary you need to talk about computers like an engineer.

</Connection>
