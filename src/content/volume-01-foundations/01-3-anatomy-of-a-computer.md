---
id: 01-3-anatomy-of-a-computer
volume: volume-01-foundations
chapter: 1
number: 3
title: "Anatomy of a Computer"
subtitle: "CPU, RAM, storage, I/O — the four boxes you'll keep meeting."
estimatedMinutes: 12
prerequisites: [01-2-binary-and-base-2]
keyTerms: []
exerciseCount: 0
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

If you opened up your laptop, you would find — past the keyboard and the screen — a green board with various chunks of black plastic on it. Those black chunks are the parts of the computer. The rest is plumbing: wires, connectors, power supplies, cooling.

The number of parts is small. Once you can name them and what each one does, you can have an intelligent conversation about any computer ever built. The names recur in operating-system theory, in programming, in cloud services. They're worth a careful tour.

</Section>

<Section label="Four roles, three layers">

A computer has four roles to play. They map to physical components, but the roles are what matter conceptually:

1. **Computation.** Do arithmetic. Make decisions. Move data around. This is the *processor* (CPU).
2. **Working memory.** Hold the data the computation needs *right now*. This is *RAM* (Random Access Memory).
3. **Long-term storage.** Hold the data even when the power is off. This is *storage* — historically a hard disk, today usually a solid-state drive (SSD).
4. **Input and output.** Talk to the world. This is the *I/O* — keyboard, screen, network, microphone, speakers, etc.

These roles are organized in three layers, fastest to slowest:

- **Innermost (fastest):** The CPU has tiny on-chip caches and registers. Reading from these takes literally a billionth of a second.
- **Middle:** RAM. Reading from RAM takes about 100 nanoseconds — roughly 100 times slower than cache.
- **Outermost (slowest):** Storage and I/O. Reading from an SSD takes about 100 microseconds — 1000 times slower than RAM. Reading over the network can take milliseconds — another 10x slower than that.

These speed differences shape almost everything about how programs are written. If you can keep your data in cache, your program flies. If you have to keep going back to RAM, it's still fast but slower. If you have to read from disk, it's slower again. If you have to wait for the network, you're glacial. We'll come back to this throughout the curriculum.

</Section>

<Section label="The CPU — Central Processing Unit">

The CPU is the chip that does the computation. We talked about it last lesson — it runs the fetch-decode-execute cycle billions of times per second. Modern CPUs have several distinct parts:

- **Cores.** A core is a complete CPU. Modern chips have multiple cores (4, 8, 16, sometimes more) so they can do multiple things at once. When you hear "8-core processor," it means there are 8 independent fetch-decode-execute machines on one chip. Cores can cooperate on hard problems by splitting the work.
- **Cache.** A small amount of very fast memory built right into the chip. The CPU keeps recently-used data here so it doesn't have to keep going out to RAM. Cache is divided into levels: L1 cache (tiniest, fastest, per-core), L2 cache (larger, per-core), L3 cache (largest, shared between cores). L1 cache is usually a few hundred kilobytes; L3 might be tens of megabytes.
- **Registers.** The smallest, fastest storage — a handful of named slots inside each core that the processor uses for the immediate data of the current instruction. When the CPU does `5 + 3`, the 5 and 3 are in registers when the addition happens.
- **Instruction set.** The list of operations the CPU knows how to do. Different CPU families have different instruction sets — `x86-64` (made by Intel and AMD, what most laptops use), `ARM` (made by various companies including Apple, what most phones and Macs now use). Programs compiled for one instruction set won't run on the other without translation.

You don't need to remember the technical specifics. The conceptual picture matters: the CPU is the worker, the cache is its desk, RAM is the filing cabinet across the room, storage is the warehouse downstairs, the network is the post office across town.

</Section>

<HistoryNote year="1971" who="Intel">

The Intel 4004 (1971) was the first commercial microprocessor — a complete CPU on a single chip. It ran at 740 kHz and had 2,300 transistors. Modern CPUs run at 3-5 GHz (about 5,000x faster) and contain tens of billions of transistors. The pace of improvement was captured in *Moore's Law* — the observation by Gordon Moore in 1965 that the number of transistors per chip roughly doubled every two years. The doubling continued for about fifty years and has only recently slowed.

</HistoryNote>

<Section label="RAM — Random Access Memory">

RAM is the working memory. When you open an application — a browser, an editor, a Python interpreter — the operating system loads the program from storage into RAM. The CPU then runs the program by reading instructions from RAM, processing them, and writing results back into RAM.

The "Random Access" part of the name distinguishes RAM from older sequential storage like magnetic tapes. With RAM, the CPU can read or write any memory location in essentially the same amount of time, regardless of where it is. With a tape, you'd have to fast-forward to the right spot. The flexibility of random access is what makes RAM useful as working memory.

A few things to know:

- **RAM is volatile.** When the power goes off, RAM is wiped. This is why your work disappears if your laptop dies before you save. Storage is non-volatile — it keeps data without power.
- **RAM is addressed by bytes.** Every byte of RAM has a unique numeric address. When the CPU wants to read memory, it specifies an address; the memory system returns the byte at that address. Modern computers can address 64-bit addresses, allowing for absurdly large memory sizes (theoretically 18 exabytes — far more than any actual computer has).
- **RAM is finite.** A typical laptop has 8GB, 16GB, 32GB, or 64GB of RAM. When a program needs more memory than RAM contains, the operating system starts using storage as a *swap* — slower, but it works. We'll see how Python's memory model interacts with this in Volume 2.

</Section>

<Section label="Storage">

Storage is where your files live. When you save a file, the operating system writes it to storage. When you open the file later, the OS reads it from storage back into RAM.

The two main types of storage today are:

- **HDD (Hard Disk Drive).** Spinning magnetic platters with moving read/write heads. Cheap, large, slow. Reads take about 10 milliseconds because the head has to physically move to the right track. HDDs are mostly obsolete in laptops but still used in data centers for cheap bulk storage.
- **SSD (Solid State Drive).** Flash memory chips. No moving parts. Reads take about 100 microseconds — 100x faster than HDDs. Modern laptops all use SSDs.

You'll also encounter:

- **Network storage.** Files stored on a server you access over the network. Cloud storage (S3, Google Drive) is this. Reads take milliseconds at minimum, often longer.
- **Object storage.** A particular kind of cloud storage that treats files as opaque "objects" with unique IDs. Amazon S3 is the prototype.

When we talk about programming, the working assumption is usually that data lives in RAM and is loaded from storage when needed. Reading from storage is hundreds or thousands of times slower than RAM, so well-written programs minimize disk access.

</Section>

<Section label="I/O — Input and Output">

Input/output is everything that connects the computer to the outside world. The category includes:

- **Display.** The screen. Output.
- **Keyboard, mouse, touchscreen.** Input.
- **Network adapter.** Both — packets in and packets out.
- **USB ports, Bluetooth.** Both — depending on what you plug in.
- **Microphone.** Input.
- **Speakers.** Output.
- **Camera.** Input.

I/O operations are the slowest things a program can do (besides waiting for humans, who are slower still). Reading from a network is slow. Reading from a file on disk is slow. Even reading a single keypress is slow compared to CPU operations. A Python program that's "doing something" but feels like it's doing nothing is usually waiting on I/O.

This is why programmers care about *asynchronous I/O* — patterns that let a program do other useful work while waiting for an I/O operation to complete. We'll see this much later in Volume 5 when we talk about `async` functions in Python.

</Section>

<Section label="Operating systems sit between you and the hardware">

There's one more layer worth naming. Between your Python program and the actual hardware sits an *operating system* — Windows, macOS, Linux, etc. The OS is itself a program (an enormous one), but it has special privileges. Among other things, it:

- Allocates RAM to applications.
- Schedules which application gets to use the CPU at each instant.
- Mediates I/O — when a program asks "read this file," the OS does the actual disk operation and returns the bytes.
- Provides isolation — one program can't directly read another program's memory, because the OS won't let it.
- Runs device drivers — small programs that know how to talk to specific hardware (the screen, the network adapter).

When your Python program calls `print("hello")`, the call eventually goes to an OS function that writes those characters to the standard-output stream — usually the terminal or, in our browser case, the lesson's output panel. The OS is doing the actual work; Python is asking it to.

This isn't something we'll dwell on much. But knowing the OS is there helps explain things. Why does Python need an OS-specific install? Because it's calling OS-specific functions. Why does code that runs on macOS sometimes break on Linux? Because the underlying OS calls are slightly different.

</Section>

<Callout kind="info" title="Where Python fits">

Python — as a language — is just text in a file. To *run* Python, you need a Python interpreter installed on your computer (or running in your browser, as Pyodide is now). The interpreter is itself a program written in another language (CPython, the most common implementation, is written in C). The interpreter reads your `.py` file, parses it, and executes it by issuing the appropriate CPU operations and OS calls.

In our case, Pyodide is the CPython interpreter compiled to WebAssembly so it runs in your browser. The browser is the operating environment; WebAssembly is the "machine code" the browser executes; Pyodide is the Python interpreter; your code is what Pyodide runs.

Layers all the way down. This is a feature, not a bug — each layer hides complexity from the next.

</Callout>

<Section label="A short FDE perspective">

Knowing the anatomy of a computer matters in your future job because customer environments are often weirder than developer environments. A customer might say "the application runs slow on our servers" — and the cause might be that their servers have HDDs instead of SSDs, or that they're running on a virtual machine with limited RAM, or that their network has high latency. Diagnosing these problems requires the mental model we just built. *Where is the bottleneck — CPU, RAM, storage, or network?* Without that frame, you can't find the issue.

</Section>

<FDEConnection>

In NinjaToolKit, when you wrote a 4,400-line firewall audit engine, you were making implicit decisions about all four parts of the computer: how much data you held in RAM at once, how often you wrote to storage, how much CPU time the parsing consumed, how the I/O of reading config files dominated end-to-end timing. You probably didn't think about it consciously — but the choices were there. As FDEs deploy systems for customers, they make these decisions explicitly: "this RAG pipeline needs more RAM than we expected because the embeddings are larger than estimated; we should bump the instance type from 16GB to 64GB."

</FDEConnection>

<Connection
  back={[{ id: '01-2-binary-and-base-2', title: 'Binary, Base-2, and Why Computers Use It' }]}
  forward={[{ id: '01-4-instructions-to-languages', title: 'From Instructions to Languages' }]}
>

Next: how we got from machine code (the actual binary instructions a CPU executes) up to high-level languages like Python. The story of compilers, interpreters, and the layers of abstraction in between.

</Connection>
