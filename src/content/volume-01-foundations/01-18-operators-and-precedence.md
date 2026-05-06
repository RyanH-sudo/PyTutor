---
id: 01-18-operators-and-precedence
volume: volume-01-foundations
chapter: 4
number: 18
title: "Operators and Precedence"
subtitle: "Who runs first when there are no parentheses, and why parentheses are your friend."
estimatedMinutes: 10
prerequisites: [01-17-expressions-vs-statements]
keyTerms: [operator]
exerciseCount: 1
checkpoint: false
tags: [theory, practice]
---

<Section label="The Opening">

When you write `2 + 3 * 4`, Python doesn't evaluate left-to-right and give you `20`. It first does `3 * 4 = 12`, then `2 + 12 = 14`. The reason is *operator precedence* — a built-in priority order that determines who goes first.

Operator precedence is partly mathematical convention (in math, multiplication binds tighter than addition) and partly language design. Most operators behave as you'd expect from math class. A few are surprising. This lesson goes through the rules so the surprises don't bite later.

The summary, in a sentence: *when in doubt, use parentheses*. Parentheses always force the evaluation order you want, and they cost nothing.

</Section>

<EtymologyCard
  term="operator"
  origin="Latin"
  rootForm="operari"
  rootMeaning="to work"
  story="From Latin 'operari' (to work), itself from 'opus' (a work). An *operator* in the original sense is one who works — a worker. The word entered English meaning a person who operates a machine. In mathematics, by the 1700s, an 'operator' meant a symbol that performs an operation on numbers — `+` is an operator, `×` is an operator. Programming inherited this directly: a programming-language operator is a symbol that performs work on values."
  entryToComputing="Every programming language has operators, drawing on the mathematical heritage. Some languages allow you to define your own operators (Python supports it via 'magic methods' — we'll see them in Volume 6); others don't. The intuition is constant: an operator is a worker that takes operands and produces a result."
  insight="The word 'operand' is the partner of 'operator': the operands are what the operator works *on*. The operator does work; the operands are the material. Plus is the operator. The two numbers are the operands."
/>

<Section label="The precedence table, from highest to lowest">

Higher in the table = evaluated first.

```
1.  ()                          parentheses (always wins)
2.  **                          exponentiation (right-to-left!)
3.  +x, -x, ~x                  unary plus, minus, bitwise not
4.  *, /, //, %                 multiplication, division, modulo
5.  +, -                        addition, subtraction
6.  <<, >>                      bitwise shifts
7.  &                           bitwise AND
8.  ^                           bitwise XOR
9.  |                           bitwise OR
10. ==, !=, <, <=, >, >=, is, in   comparisons
11. not                         logical NOT
12. and                         logical AND
13. or                          logical OR
14. =, +=, -=, etc.             assignment (lowest)
```

Within the same precedence level, most operators are *left-associative* — they evaluate left to right. So `10 - 5 - 2` is `(10 - 5) - 2 = 3`, not `10 - (5 - 2) = 7`.

The exception is `**`, which is right-associative. `2 ** 3 ** 2` is `2 ** (3 ** 2) = 2 ** 9 = 512`, not `(2 ** 3) ** 2 = 64`.

</Section>

<Section label="Practical examples">

```python
print(2 + 3 * 4)              # 14 — multiplication first
print((2 + 3) * 4)            # 20 — parens override
print(2 ** 3 ** 2)            # 512 — right-associative
print((2 ** 3) ** 2)          # 64 — parens override

# Comparisons happen after arithmetic.
print(2 + 3 > 4)              # True — equivalent to (2 + 3) > 4
# but not 2 + (3 > 4) which would be 2 + True = 3

# Logical operators are last.
print(2 + 3 == 5 and 4 < 6)   # True — both sides evaluated, then anded
```

A common stumbling point: comparisons like `==` have lower precedence than arithmetic, but higher than logical operators. So `2 + 3 == 5 and 4 < 6` is grouped as `((2+3) == 5) and (4 < 6)` — first the arithmetic and comparison, then the logical and.

<CodeRunner
  initial={`# Operator precedence in action.

print(2 + 3 * 4)               # 14 — * before +
print((2 + 3) * 4)             # 20 — parens override

print(2 ** 3 ** 2)             # 512 — right-associative
print((2 ** 3) ** 2)           # 64

print(10 - 5 - 2)              # 3 — left-associative
print(10 - (5 - 2))             # 7

# Unary minus has high precedence.
print(-2 ** 2)                 # -4 — interpreted as -(2**2)
print((-2) ** 2)               # 4 — explicit grouping

# Comparisons after arithmetic.
print(5 + 3 > 6)               # True

# Logical operators last.
print(5 > 3 and 2 < 1)         # False`}
  caption="The fourth example is sneaky: -2 ** 2 is -(2**2) = -4, not (-2)**2 = 4. Many beginners write this and get the 'wrong' answer."
/>

</Section>

<Callout kind="warning" title="The unary minus and exponent trap">

`-2 ** 2` evaluates to `-4`, not `4`. The reason: `**` has higher precedence than unary `-`. So `-2 ** 2` is parsed as `-(2 ** 2)` = `-(4)` = `-4`.

If you want `(-2) ** 2`, write the parentheses explicitly. This is one of the most common precedence surprises in Python.

</Callout>

<Section label="When in doubt, parenthesize">

Most of the time, you don't need to memorize the full precedence table. The two operations that matter most:

1. *Arithmetic before comparison.* `x + 1 > 5` works without parens.
2. *Comparison before logical.* `x > 0 and y < 10` works without parens.

For everything else, *use parentheses*. They're free. They make your code unambiguous to a reader who doesn't have the precedence table memorized. They prevent the rare bug from a precedence assumption that turns out wrong.

This is especially important with logical operators. The grouping of `a and b or c and d` is correct (it's `(a and b) or (c and d)`) but reading it requires knowing precedence. Writing `(a and b) or (c and d)` leaves no doubt.

```python
# Both correct, but the second is clearer to a reader.
result = a and b or c and d
result = (a and b) or (c and d)
```

</Section>

<Section label="Augmented assignment operators">

Beyond plain `=`, Python has a family of *augmented assignment* operators:

```python
x += 5    # equivalent to: x = x + 5
x -= 3    # equivalent to: x = x - 3
x *= 2    # equivalent to: x = x * 2
x /= 4    # equivalent to: x = x / 4
x //= 2   # equivalent to: x = x // 2
x %= 3    # equivalent to: x = x % 3
x **= 2   # equivalent to: x = x ** 2
```

Plus the bitwise variants (`&=`, `|=`, `^=`, `<<=`, `>>=`) which we'll cover later.

These are conveniences. They're idiomatic in Python — when you see `count += 1`, that's the canonical way to increment.

For mutable values like lists, augmented assignment can have a subtle difference from the explicit form. `lst += [4]` modifies the existing list in place; `lst = lst + [4]` creates a new list and rebinds. We'll cover that when we get to lists.

<CodeRunner
  initial={`# Augmented assignment.

count = 0
count += 1
count += 1
count += 1
print(count)        # 3

x = 100
x *= 2
x -= 50
x //= 3
print(x)            # 50

# Useful in loops:
total = 0
for n in [1, 2, 3, 4, 5]:
    total += n
print(total)        # 15`}
  caption="`count += 1` is the canonical 'increment a counter' pattern in Python."
/>

</Section>

<Exercise
  title="Predict, then run"
  prompt="Write each result without running first, then run to verify. The numbers being computed: 12 + 4 * 2, (12 + 4) * 2, 2 ** 3 ** 2, -3 ** 2, 10 % 3 + 1."
  starter={`# Predict each result first. Then run.

print(12 + 4 * 2)
print((12 + 4) * 2)
print(2 ** 3 ** 2)
print(-3 ** 2)
print(10 % 3 + 1)`}
  expected={`20
32
512
-9
2`}
  hints={[
    "12 + 4*2 → 12 + 8 → 20.",
    "(12+4)*2 → 16*2 → 32.",
    "2**3**2 is right-associative → 2**(3**2) → 2**9 → 512.",
    "-3**2 is -(3**2) → -9 (not 9).",
    "10 % 3 + 1 → (10%3) + 1 → 1 + 1 → 2."
  ]}
  solution={`print(12 + 4 * 2)
print((12 + 4) * 2)
print(2 ** 3 ** 2)
print(-3 ** 2)
print(10 % 3 + 1)`}
/>

<Connection
  back={[{ id: '01-17-expressions-vs-statements', title: 'Expressions vs Statements' }]}
  forward={[{ id: '01-19-the-print-function', title: 'The Print Function in Detail' }]}
>

Next: a careful look at `print()` itself. It has more options than you might expect — separators, end-of-line, file redirection. Learning print well makes debugging easier.

</Connection>
