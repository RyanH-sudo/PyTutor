---
id: 01-26-encoding-and-bytes
volume: volume-01-foundations
chapter: 5
number: 26
title: "Encoding and Bytes — The Hidden Layer"
subtitle: "How strings become bytes (and back) when they leave Python."
estimatedMinutes: 11
prerequisites: [01-25-escapes-and-raw-strings]
keyTerms: [bytes, unicode]
exerciseCount: 1
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

Python's strings are sequences of Unicode characters. But when a string is sent over a network, written to a file, or printed to a terminal, it has to be converted to *bytes* — sequences of 8-bit numbers. The conversion is called *encoding*. The reverse (bytes → string) is *decoding*.

This is one of those topics that feels abstract until it bites you. The first time you read a CSV with non-English characters and get garbage, you'll wish you'd understood encoding. So we cover it briefly here.

</Section>

<EtymologyCard
  term="encoding"
  origin="French"
  rootForm="encoder"
  rootMeaning="to put into code"
  story="From the French 'encoder' (to put into code), built on the same root as 'code.' The verb form has been in English since the 1900s; in computing, 'encoding' specifically means converting data from one representation to another. A character encoding is a system for representing characters as bits: ASCII encodes 'A' as 01000001, UTF-8 encodes 'é' as 11000011 10101001."
  insight="An encoding is a *mapping* — a rule for converting one set of symbols into another. The choice of encoding matters because the same character can be encoded differently in different systems, and a mismatch produces garbage."
/>

<Section label="The story so far">

Recall from Volume 1's binary lesson: characters in computers are stored as numbers. The letter 'A' is the number 65. Lowercase 'a' is 97. The mapping of characters to numbers is a *character set*. The most basic is ASCII, which covers English letters, digits, and basic punctuation — 128 characters total, fitting in 7 bits.

ASCII is fine for English. It's not fine for French (é), German (ü), Chinese (中), Arabic (ع), or emoji (🐍). To handle every script in every language, the world settled on **Unicode** — a character set with over 150,000 characters covering essentially every writing system.

Each Unicode character has a *code point* — a unique number. 'A' is U+0041 (65). 'é' is U+00E9 (233). '中' is U+4E2D (20013). '😀' is U+1F600 (128512).

But Unicode is just a numbering. To actually *store* these numbers as bytes, you need an encoding.

</Section>

<Section label="UTF-8: the universal encoding">

The dominant encoding today is **UTF-8**. It encodes Unicode code points as variable-length byte sequences:

- Code points 0-127 (basic ASCII): 1 byte (the same byte ASCII would use).
- Code points 128-2047: 2 bytes.
- Code points 2048-65535: 3 bytes.
- Code points 65536+: 4 bytes.

This is brilliant for two reasons. First, ASCII text is a valid UTF-8 byte sequence — old data works unchanged. Second, common Western languages take few bytes per character, while less-common scripts use more.

The cost: a UTF-8 string can have variable byte lengths per character. `len("café")` in Python is 4 (Unicode characters), but the same string encoded to UTF-8 is 5 bytes.

Other encodings exist (UTF-16, UTF-32, Latin-1, Windows-1252, GB18030, Shift-JIS) but UTF-8 has won the web. When in doubt, use UTF-8.

</Section>

<Section label="Encoding and decoding in Python">

Python has a separate type for raw bytes: `bytes`. You convert with `.encode()` and `.decode()`.

```python
# String to bytes.
s = "café"
b = s.encode("utf-8")
print(b)             # b'caf\xc3\xa9' — the bytes
print(len(b))        # 5 — five bytes
print(len(s))        # 4 — four characters

# Bytes back to string.
b2 = b'caf\xc3\xa9'
s2 = b2.decode("utf-8")
print(s2)            # café
```

Notice how 'é' takes 2 bytes (`\xc3\xa9`) but the other letters take 1 each.

If you decode with the wrong encoding, you get garbage or an error:

```python
b = "café".encode("utf-8")
print(b.decode("latin-1"))    # 'cafÃ©' — wrong characters but no error
print(b.decode("ascii"))      # UnicodeDecodeError — bytes contain non-ASCII
```

</Section>

<Section label="When this matters in practice">

You'll encounter encoding issues in three places:

**Reading files.** Python's `open()` defaults to a system encoding (often UTF-8 on Mac/Linux, but cp1252 on Windows). Specify the encoding explicitly to avoid surprises:

```python
with open("data.csv", "r", encoding="utf-8") as f:
    data = f.read()
```

**Network requests.** HTTP responses come as bytes. The `requests` library decodes for you, but knowing the encoding the server claims (in the `Content-Type` header) lets you handle it correctly.

**Database connections.** Most databases use UTF-8 by default, but legacy databases sometimes use Latin-1 or others. Mismatch produces garbled text.

The general advice: **use UTF-8 everywhere**. Set it explicitly when you can. When you receive data from a system that uses a different encoding, decode it once at the boundary, work in Unicode internally, and encode once when sending out.

</Section>

<CodeRunner
  initial={`# Encoding examples.

s = "café 🐍"
print(f"string: {s}")
print(f"length (chars): {len(s)}")

# Encode to different encodings.
utf8 = s.encode("utf-8")
print(f"utf-8 bytes: {utf8}")
print(f"utf-8 byte length: {len(utf8)}")

# UTF-16 takes 2 bytes minimum per char.
utf16 = s.encode("utf-16")
print(f"utf-16 bytes: {utf16}")
print(f"utf-16 byte length: {len(utf16)}")

# Round trip.
back = utf8.decode("utf-8")
print(f"decoded back: {back}")
print(f"matches original: {back == s}")`}
  caption="The string 'café 🐍' is 6 characters. UTF-8 encodes it as 11 bytes (the snake emoji is 4 bytes). UTF-16 uses 16 bytes (2 per character minimum, 4 for the emoji)."
/>

<Section label="The bytes literal">

Python has a literal syntax for bytes — the `b` prefix:

```python
b = b"hello"            # a bytes object containing ASCII 'hello'
print(b)                # b'hello'
print(type(b))          # <class 'bytes'>
print(b[0])             # 104 — bytes indexed give integers, not characters

# Non-ASCII in bytes literal must be escaped:
b2 = b'\xc3\xa9'        # the bytes for 'é' in utf-8
print(b2.decode('utf-8'))  # 'é'
```

Bytes literals can contain ASCII directly and use hex escapes for non-ASCII bytes. This is mostly useful for protocols that work with binary data — wire formats, image bytes, encrypted data, etc.

</Section>

<Exercise
  title="Encode and verify"
  prompt="Take the string 'naïve résumé' and encode it as UTF-8. Print the byte sequence, the byte length, and then decode it back to confirm equality with the original."
  starter={`s = "naïve résumé"

b = ___
print(f"bytes: {b}")
print(f"byte length: {len(b)}")

decoded = ___
print(f"matches: {decoded == s}")`}
  expected_contains="matches: True"
  hints={[
    "b = s.encode('utf-8'); decoded = b.decode('utf-8')."
  ]}
  solution={`s = "naïve résumé"

b = s.encode("utf-8")
print(f"bytes: {b}")
print(f"byte length: {len(b)}")

decoded = b.decode("utf-8")
print(f"matches: {decoded == s}")`}
/>

<Connection
  back={[{ id: '01-25-escapes-and-raw-strings', title: 'Escapes, Raw Strings, and Special Characters' }]}
  forward={[{ id: '01-27-string-recap', title: 'String Chapter Recap' }]}
>

Next: a recap of the string chapter, with combined exercises that touch indexing, methods, formatting, and parsing.

</Connection>
