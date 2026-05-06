---
id: 01-1-what-is-a-computer
volume: volume-01-foundations
chapter: 1
number: 1
title: "What Is a Computer, Really?"
subtitle: "We start at the bottom. There's only one thing happening in there."
estimatedMinutes: 14
prerequisites: [00-8-the-pact]
keyTerms: [computer, bit, binary]
exerciseCount: 0
checkpoint: false
tags: [theory, history]
---

<Section label="The Opening">

To understand Python, you have to understand, even loosely, what's happening underneath it. We don't need to design transistors. We just need to know what a computer *is*, mechanically — what it can do and what it can't.

Here is the truth that took humans a long time to figure out, and is in some sense the entire foundation of computer science: **all a computer does is move and arrange tiny bits of information**. Numbers, letters, images, music, this app — every last thing — is, at the deepest level, patterns of "on" and "off." Patterns moving from one place to another. Patterns being combined and rearranged.

That's it. That's the whole machine.

If this sounds reductive, it's because it is — and the reduction is the magic. Every Photoshop filter, every YouTube video, every conversation you've ever had with Claude is patterns of on and off being moved around really fast. The reason this isn't dismissive is that *moving and arranging patterns* turns out to be a fully general kind of work. From those simple ingredients, you can build everything we now call computing.

</Section>

<EtymologyCard
  term="computer"
  origin="Latin"
  rootForm="computare"
  rootMeaning="to count up, to reckon"
  story="From 'com-' (together) plus 'putare' (to think, to reckon). The verb to compute meant 'to determine by reckoning' — to figure out a sum or a calculation by stepping through the math. The English noun computer first appears in the 1640s and meant a person who computes for a living: a clerk, often female, doing arithmetic by hand for astronomers, navigators, or insurance companies. NASA had teams of human computers well into the 1960s. The shift to meaning the machine took until the 1940s. As the machines took over the job, they took the title."
  entryToComputing="When ENIAC was unveiled in 1946 — the first general-purpose electronic computer — newspapers called it 'the giant brain' or 'the electronic computer.' The latter stuck. Within a decade, 'computer' usually meant a machine first."
  insight="When you call something a 'computer,' you're naming it after the human profession it replaced. The machine is doing the clerk's job. This shapes how the rest of programming vocabulary developed: the *operator* operates the machine, the *processor* processes data, the *interpreter* interprets instructions — every one of those words named a person before it named a part of a machine."
/>

<Section label="The single instruction underneath everything">

A modern processor — the chip in your laptop, your phone, the server running Pyodide right now — is, deep down, a thing that knows how to do a few dozen "instructions." Each instruction is incredibly small. Examples of what a single instruction can do:

- Read the value at a particular spot in memory.
- Write a value to a particular spot in memory.
- Add two numbers.
- Compare two numbers and say which is bigger.
- If something is true, jump to a different instruction; otherwise continue.

That is *almost* the whole list. There are some instructions for moving data between different parts of the chip, some for handling input/output, some for special-purpose operations. But the basic shape is: read, write, arithmetic, compare, conditional jump.

What's amazing is that *these tiny instructions, repeated billions of times per second, can simulate anything*. The mathematician Alan Turing proved this in 1936 — that any computational task you can describe precisely can be done with a machine that has just a handful of basic operations, given enough time and memory. We call such a machine *Turing-complete*. Your laptop is Turing-complete. Your phone is Turing-complete. A grid of cells in Conway's Game of Life is Turing-complete. The Python language is Turing-complete.

This is the deepest fact about computing: *generality emerges from simplicity*. A small set of operations, applied billions of times in patterns, produces every program that has ever existed.

</Section>

<HistoryNote year="1936" who="Alan Turing">

Turing's paper, "On Computable Numbers, with an Application to the Entscheidungsproblem," is the founding document of theoretical computer science. He described an abstract machine — now called a Turing machine — that has just a tape, a read/write head, and a small set of states. He proved that this machine can compute anything *computable*, and also that there are problems no such machine can ever solve (the famous halting problem). The conceptual frame of his paper underlies every programming language, including Python.

</HistoryNote>

<Section label="The bit">

The smallest unit of information in a computer is a *bit*. A bit is just a thing with two possible states. Inside a chip, a bit is a tiny circuit that's either holding a charge or not — physically, an electron either is or isn't sitting in a particular spot. We call those two states *1* and *0*, but we could just as easily call them *yes* and *no*, or *on* and *off*, or *up* and *down*. The label doesn't matter; the two-ness is what matters.

Why two states? Because two states are easy to make reliable. A switch can be definitively up or down. A wire can definitively carry voltage or not. A magnetic dot on a disk can definitely be polarized one way or the other. Two-state systems are robust — they tolerate noise. An almost-on signal still reads as on. A slightly-off signal still reads as off. If we tried to make a *ten-state* system, the boundaries between states would be fuzzy and errors would compound.

So computers are built out of two-state things. A single bit, by itself, can represent two possibilities — *yes/no, on/off, true/false*. Two bits together can represent four possibilities (00, 01, 10, 11). Three bits, eight possibilities. Eight bits — a *byte* — can represent 256 possibilities.

</Section>

<EtymologyCard
  term="bit"
  origin="English"
  rootForm="binary digit"
  rootMeaning="a single 0 or 1"
  story="Coined in 1948 by John W. Tukey, a statistician at Bell Labs. He was looking for a short word for 'binary digit.' Earlier writers had tried 'bigit' and 'binit,' which both feel awkward. Tukey wrote 'bit' on the back of an envelope while preparing a memo for Claude Shannon. Shannon used it in his 1948 paper 'A Mathematical Theory of Communication,' which is the founding paper of information theory. The word stuck."
  entryToComputing="By the 1950s, 'bit' was the standard unit of digital information. Modern terms like 'bit rate' (how many bits per second), 'bitmap' (a 2D array of bits representing an image), and 'bitwise operation' all derive from this single coinage."
  insight="The word 'bit' has another older meaning in English — a small portion, as in 'a bit of bread.' This is a happy accident: the new technical term and the old English word reinforce each other. A bit of information really is a tiny portion."
/>

<Section label="From bits to everything">

If a single bit holds two values, and eight bits hold 256 values, you might wonder how you get from there to text, images, video. The answer is *encoding* — agreeing in advance which patterns of bits stand for which things.

Take text. The letter "A" — what is it, to a computer? It is, by convention, the bit pattern `01000001`. The letter "B" is `01000010`. The letter "a" (lowercase) is `01100001`. The space character is `00100000`. These are not arbitrary — they're defined by an encoding standard called ASCII (and later, Unicode), which we'll explore in detail in Volume 2. But the point right now is that *text is just an agreement* about which bit patterns mean which letters.

Take a number. The integer 5 is, in binary, `101`. The integer 42 is `101010`. The integer 65 is `01000001` — the same pattern as the letter "A" above. So how does the computer know whether `01000001` means 65 or "A"? It depends on context — what *type* the program said the data was. We'll come back to this in Volume 2 when we talk about types.

Take an image. A photo is a grid of colored dots (pixels). Each pixel's color is encoded as three numbers — the red, green, and blue intensities — each fitting in 8 bits. So one pixel is 24 bits. A 1000-by-1000 pixel image is about 24 million bits. The computer stores those bits in order, knows where in memory the image starts, and treats them as a grid.

Take audio. Sound is air pressure changing over time. A microphone measures the pressure many thousands of times per second and stores each measurement as a number. Play the numbers back through a speaker fast enough and you've reconstructed the sound.

Take this app. The text you're reading is encoded as bits. The fonts are encoded as bits (the shape of each letter is a tiny program, also bits). The colors are encoded as bits. The buttons that respond when you click are bits. The Python interpreter is bits. *All of it.*

</Section>

<Section label="The processor cycles">

Inside the computer, a *processor* (the central chip, sometimes called the CPU — Central Processing Unit) is doing the same thing over and over, billions of times per second:

1. Read the next instruction from memory.
2. Decode it — figure out which of the few-dozen operations it is.
3. Execute it — do the operation.
4. Repeat.

This is called the *fetch-decode-execute cycle*. The processor's clock — the heart of the chip — sets the pace. A 3 GHz processor cycles three billion times per second. Each cycle, the processor advances one tiny step.

When you run a Python program, somewhere underneath, the processor is doing trillions of these tiny cycles. Each one moves a few bits from one place to another. The Python `print("hello")` you ran in the previous lesson involved millions of these cycles. The illusion that Python is "high-level" is built on a foundation of these tiny mechanical motions.

This is why programmers care about efficiency. The processor doesn't get tired. It doesn't get bored. It does what you tell it. But it's bounded — there are only so many cycles per second. If your program tells it to do unnecessary work, the program is slow. If your program tells it to do clever work, the program is fast. We won't worry about this in Volume 1, but it's good to know it's the bottom truth.

</Section>

<Callout kind="tip" title="The mental model to keep">

Whenever something in Python feels mysterious, remember the bottom layer. *There is just a processor doing tiny operations on patterns of bits.* Python is making this bearable for humans. Whatever Python feature you're looking at, it ultimately compiles down to a sequence of tiny operations on bits. The richer your Python knowledge gets, the more you can imagine what's happening underneath. That mental model — even a fuzzy version of it — is what makes you a *fluent* programmer rather than just a Python user.

</Callout>

<Section label="Why this matters for you">

You may think this is too abstract — that you're just here to learn Python and the bits stuff is for hardware engineers. The reason I'm starting here is because *understanding the bottom changes how you think about the top*.

When we talk about Python's `int` type vs `float` type later, you'll know the distinction comes from how those numbers are encoded in bits. When we talk about strings being immutable, you'll have a sense of why mutating fixed-width memory in place is harder than allocating new memory. When we talk about why some operations are fast and others slow, you'll have the right mental picture.

You don't need to memorize anything from this lesson. You need to walk away with a feeling: *there's a real machine underneath all of this, doing real physical work, and Python is a layer of abstraction over that work*. We'll keep coming back to this layer, and you'll keep building intuition about it.

</Section>

<InterviewPhrase setup="If asked to explain what a computer is doing when it 'runs Python,' something like this works.">

A computer at the bottom is a processor reading patterns of bits from memory and applying a small set of operations to them — read, write, add, compare, jump. Python is a high-level language that gets translated, layer by layer, into those underlying operations. When I write `print("hello")`, the Python interpreter handles the translation and the operating system handles the actual I/O, but underneath it's still the same fetch-decode-execute cycle running billions of times a second.

</InterviewPhrase>

<Connection
  back={[{ id: '00-8-the-pact', title: 'The Pact' }]}
  forward={[{ id: '01-2-binary-and-base-2', title: 'Binary, Base-2, and Why Computers Use It' }]}
>

In the next lesson we go one level lower — into binary numbers themselves. Why is base-2 the natural language of computers? How do you actually count in binary? We'll do it slowly, with examples, until it's second nature.

</Connection>
