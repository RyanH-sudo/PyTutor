---
id: 01-4-instructions-to-languages
volume: volume-01-foundations
chapter: 2
number: 4
title: "From Instructions to Languages"
subtitle: "Machine code, assembly, and the layers above. Why high-level exists."
estimatedMinutes: 13
prerequisites: [01-3-anatomy-of-a-computer]
keyTerms: [code, compile, interpret]
exerciseCount: 0
checkpoint: false
tags: [theory, history]
---

<Section label="The Opening">

You now know that the CPU runs a small set of operations on bits. So how on earth does a CPU end up running Python? There are several layers between a Python source file and the bits the CPU is shuffling, and this lesson maps them.

The trick to understanding the picture is to start from the bottom — what the CPU actually executes — and work upward. Each layer is a translation from a more human-readable language to a less-readable one, until at the very bottom we hit the bits the silicon understands. Every higher language exists because the lower one was painful for humans to write directly.

</Section>

<Section label="Machine code — what the CPU eats">

The most fundamental form of code is *machine code* — sequences of bits the CPU's instruction decoder reads directly. A single instruction might be 32 bits long, with parts of it identifying the operation and other parts identifying the data. For example, on x86-64 (the architecture in most laptops), the instruction:

```
01001000 11000111 11000000 00000101 00000000 00000000 00000000 00000000
```

means "move the value 5 into the register named rax." Forty bytes — and that's just one instruction. A whole program is millions of these.

You will not ever write machine code by hand. Nobody does. It's not even readable to humans. What this layer is for is *what the CPU actually does* — the lowest level. Every program, no matter how high-level it looks at the source, ends up as patterns like this when it runs.

</Section>

<EtymologyCard
  term="code"
  origin="Latin"
  rootForm="codex"
  rootMeaning="a wooden tablet bound into book form"
  story="The Latin word 'codex' originally meant a tablet of wax-coated wood that could be written on, then bound into a book of pages. By the early Middle Ages, 'codex' meant a manuscript book — the form that replaced the scroll. The English word 'code' (from Old French 'code' from Latin 'codex') came to mean any organized system of laws or rules: 'the legal code,' 'the moral code.' In the 19th century the term was extended to systems of signals and ciphers ('Morse code,' 'naval signal code'). Computer code inherits this sense — a system of symbols that follow rules a machine can interpret."
  entryToComputing="The phrase 'computer code' was used routinely by the 1950s. Machine code, source code, object code, byte code — all variants of the same metaphor: a structured system of symbols that means something specific."
  insight="Notice how 'code' and 'codex' connect: code is a kind of book, written for a reader. The reader just happens to be a machine. When senior engineers talk about 'reading code' or 'writing code,' they're using a metaphor that's been alive for 1,800 years."
/>

<Section label="Assembly — machine code with names">

The first innovation above machine code was *assembly language*. Assembly is a thin wrapper over machine code: each assembly instruction corresponds to one machine-code instruction, but assembly uses memorable names instead of bit patterns.

The same instruction we saw above, in assembly, looks like:

```
mov rax, 5
```

Which reads as "move 5 into the rax register." The mnemonic `mov` stands for "move." `rax` is the name of one specific register on x86-64 CPUs. Anyone who's seen the assembly language will recognize this immediately.

The job of an *assembler* (a program) is to take this assembly text and translate it into the corresponding machine-code bits. One-to-one — every line of assembly becomes one instruction in machine code.

Assembly is still used today, but only in very specific contexts: writing operating system internals, optimizing performance-critical code (game engines, compilers, cryptography), or programming embedded systems with no room for higher-level overhead. Most software engineers never touch it.

The reason is that assembly is *tied to a specific CPU architecture*. Code written in x86-64 assembly won't run on an ARM CPU, and vice versa. Plus, even with mnemonics, you spend most of your time managing low-level details (which register holds what, how to lay out memory) instead of solving the actual problem. A skilled assembly programmer might write 100 lines of assembly to do what a Python programmer does in 3 lines.

</Section>

<Section label="High-level languages — finally readable">

The breakthrough came in the late 1950s with the invention of *high-level languages*. The first was Fortran (1957). The promise of a high-level language is that you write something that resembles English or mathematics, and a *compiler* translates it down to machine code.

Here's the difference, illustrated. A snippet of assembly that adds two numbers and stores the result:

```
mov rax, 5
mov rbx, 3
add rax, rbx
mov [result], rax
```

The same logic in Python:

```python
result = 5 + 3
```

One line vs. four. And the Python line works on any CPU that has Python — x86-64, ARM, RISC-V, anything — because Python's compiler produces architecture-independent code that's interpreted at runtime by an architecture-specific interpreter.

This is the foundational trade. High-level languages give you portability and readability at a small performance cost. The cost has dropped over the decades — modern CPUs are so fast that the overhead of an interpreter is rarely the bottleneck — and the benefits have grown — programs now ship in hours that would have taken months in assembly.

</Section>

<Section label="The two main strategies: compile, or interpret">

When you have a high-level language, there are two ways to translate it down to something the CPU can run: *compile* it ahead of time, or *interpret* it as you go.

**Compile.** A compiler reads your entire source file, translates it into machine code, and writes the result as a separate executable file. You then run the executable. C, C++, Rust, Go, and Swift are compiled languages. The compile step happens once; the resulting executable runs as fast as native machine code.

The advantage: maximum runtime speed. The cost: the compile step takes time (sometimes minutes for large programs), and the executable is tied to a specific platform.

**Interpret.** An interpreter reads your source code, parses one statement at a time, and *executes* it directly — without producing a separate executable file. Python, JavaScript, Ruby, and PHP are (primarily) interpreted languages. There's no separate compile step from your perspective.

The advantage: you can run code instantly. The interactive REPL — type a line, see it run — is a direct consequence of being interpreted. The cost: each statement has to be parsed and dispatched at runtime, which is slower than running pre-compiled machine code.

The reality is more nuanced. Python uses a hybrid approach: when you run a `.py` file, Python first compiles it to *bytecode* (a simplified, compact form) and then interprets the bytecode. The bytecode is cached in `.pyc` files so subsequent runs skip the compile step. We'll see how this works in detail in Volume 9.

</Section>

<EtymologyCard
  term="compile"
  origin="Latin"
  rootForm="compilare"
  rootMeaning="to plunder, to gather together"
  story="The Latin 'compilare' meant 'to plunder' — to gather goods from a campaign — and by extension, to gather together (anything). By the 1500s, English had 'compile' meaning 'to assemble a document from various sources,' which is what writers and editors still mean by 'compiling a book.' In computing the term was first used in the 1950s for the process of gathering source code and translating it into machine code — assembling a runnable program from human-written instructions."
  entryToComputing="Grace Hopper coined 'compiler' in 1952 for her A-0 system, which translated mathematical formulas into machine code. The metaphor stuck because it captured what the program was doing — gathering pieces of code, looking up implementations, and assembling them into a runnable whole."
  insight="When someone says 'I'm compiling the project,' they're using a metaphor about gathering — gathering all the source files, all the libraries, all the dependencies, and producing one finished artifact. The verb implies the integrative work the compiler does, not just translation."
/>

<EtymologyCard
  term="interpret"
  origin="Latin"
  rootForm="interpretari"
  rootMeaning="to explain, to translate"
  story="From Latin 'interpres' (a negotiator, a translator), via 'interpretari' (to explain). The word entered English in the 1300s meaning 'to translate from one language to another' — a translator was an interpreter. The musical sense ('to interpret a piece of music') and the everyday sense ('I interpret his silence as agreement') developed later. The computing sense — to read and execute high-level code at runtime — appeared in the 1950s and is a direct extension of the original meaning."
  entryToComputing="An interpreter is a translator that runs in real time, the way a human interpreter at a UN meeting translates speech as it happens, sentence by sentence. The metaphor is exact."
  insight="A programming-language interpreter does exactly what a human interpreter at a multilingual conference does: takes input in one language, produces output in another, in real time, sentence by sentence. The computing sense isn't a stretch — it's a direct translation of the original meaning."
/>

<Section label="Where Python sits">

Python is interpreted. When you write `print("hello")` and run it, Python's interpreter reads the line, parses it (figures out it's a function call to `print` with the argument `"hello"`), and executes it on the spot.

The choice to be an interpreted language was deliberate. It made Python easy to use interactively, easy to debug, easy to develop quickly. The trade-off was raw speed: Python is generally slower than compiled C or Rust by a factor of 10x to 100x for CPU-bound code.

But here's the surprise: for most production work, the speed difference doesn't matter. Why? Because the slow parts of most programs are I/O-bound (waiting for the network, waiting for the database, waiting for the disk), not CPU-bound. Whether your code spent 1 millisecond or 5 milliseconds in Python is invisible if the program is also waiting 200 milliseconds for a database query. And when you do hit a CPU-bound bottleneck in Python, you can usually drop down into a pre-compiled library written in C — NumPy, SciPy, PyTorch, every major numerical library is C under the hood with a Python API on top. You write Python; the heavy work happens in C.

This is why Python won the AI/data-science world. Pythonists got the productive surface (interactive notebooks, fast iteration, readable code) and the performance underneath (C and CUDA libraries doing the math). The combination is unbeatable for most engineering work.

</Section>

<Section label="The big picture, summarized">

Reading from the metal upward:

1. **Bits.** Tiny on/off states in physical circuits.
2. **Machine code.** Patterns of bits that the CPU's decoder recognizes as instructions.
3. **Assembly.** Human-readable mnemonics for machine code, one-to-one.
4. **High-level languages.** Languages that abstract away the details of specific CPUs. Compiled (C, Go, Rust) or interpreted (Python, JavaScript, Ruby) or hybrid (Java, C# — they compile to a virtual-machine bytecode that's then interpreted at runtime).
5. **Domain-specific languages.** Even higher-level: SQL for database queries, HTML for web markup, regex for pattern matching.

When you write Python, you're operating at level 4. The Python interpreter handles the descent through level 3 (bytecode, kind of like assembly) and level 2 (the CPU instructions that ultimately execute the bytecode). You don't have to think about it. But you can, when curiosity strikes.

</Section>

<Callout kind="tip" title="The 'leaky abstraction' principle">

A famous essay by software engineer Joel Spolsky argues that "all non-trivial abstractions are *leaky*" — meaning the higher-level layer never perfectly hides the lower-level details. Once in a while, the lower layer surfaces, and you'd better understand it.

For example: Python's integers are unbounded — `2 ** 1000` works fine. But Python's floats are stored in 64 bits and can only represent certain values exactly. When you compute `0.1 + 0.2` you don't get `0.3`, you get `0.30000000000000004`. The abstraction "Python numbers" leaks the underlying binary representation.

Most of the time, you don't think about leaks. But when something feels wrong, the leak is often where the cause is. The mental model we're building in Volume 1 is your map for reasoning about leaks.

</Callout>

<Connection
  back={[{ id: '01-3-anatomy-of-a-computer', title: 'Anatomy of a Computer' }]}
  forward={[{ id: '01-5-meet-python', title: 'Meet Python' }]}
>

Next: a closer look at Python specifically — its philosophy, its interpreter, the Zen of Python, and why it became the language of AI engineering. Then we install (or rather, discover the already-installed) interpreter and write our first real program.

</Connection>
