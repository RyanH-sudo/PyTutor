---
id: 00-5-history-in-brief
volume: volume-00-welcome
chapter: 1
number: 5
title: "A Brief History of Why Python Exists"
subtitle: "From counting clerks to Guido van Rossum's Christmas project."
estimatedMinutes: 12
prerequisites: [00-4-the-language-of-programmers]
keyTerms: [computer, python]
exerciseCount: 0
checkpoint: false
tags: [theory, history]
---

<Section label="The Opening">

To understand why Python looks the way it does, it helps to know how we got here. This is a quick history — not exhaustive, but enough to give Python a place in the timeline. Knowing the history will make a lot of small decisions in the language feel less arbitrary.

We're going to walk through, in roughly five-minute chunks: what a *computer* used to be, the first programming languages, why so many of them were ugly, what Guido van Rossum was trying to fix, and how Python came to dominate AI work in 2026.

</Section>

<Section label="Computers used to be people">

The word *computer* enters English in the 1640s, meaning "one who computes" — a person who does arithmetic for a living. Astronomers had teams of human computers calculating the positions of stars. Insurance companies had rooms full of clerks computing risk tables. The military had computing pools doing ballistics. NASA's early space program ran on human computers — the women in *Hidden Figures* were doing the literal job that the word originally named.

It wasn't until the late 1940s that "computer" started to refer to a machine first and a person second. The word *transistor* was coined in 1948. The first commercial computer, the UNIVAC I, shipped in 1951. By 1960, the human-computer profession had largely disappeared.

I tell you this because the language of computing is full of words that originally referred to humans doing the work. *Operator* (the person operating the machine), *executor* (the person carrying out the instructions), *interpreter* (the person translating). When we use these words for components of a program now, we're doing a kind of metaphor: the program is a society of little workers each doing the job a human used to do.

</Section>

<HistoryNote year="1843" who="Ada Lovelace">

Often called the first programmer, Lovelace wrote algorithms for Charles Babbage's Analytical Engine — a mechanical computer that was never actually built in her lifetime. Her notes on Babbage's machine include a procedure for calculating Bernoulli numbers, which is generally considered the first computer program. The U.S. Department of Defense's *Ada* programming language is named after her.

</HistoryNote>

<Section label="The first programming languages were terrible">

The first computers had to be programmed by physically rewiring them. By the 1940s, programmers were writing in *machine code* — sequences of binary instructions the processor executed directly. This was excruciating. You'd write something like `01001000 11000001 00000101` and you'd have to remember that the first eight bits meant "add" and the rest specified the operands.

In 1949, the first *assembly language* appeared. Instead of writing `01001000 11000001`, you could write `ADD A, 5`. An *assembler* (a program) translated this into machine code. This was an enormous improvement, but assembly language is still tied very closely to the specific machine you're running on. The same program would have to be rewritten if you switched processors.

In 1957, Fortran (Formula Translation) was the first widely used *high-level* language. You could now write `X = Y + Z` and the compiler would figure out the machine code. Fortran was made for scientists. Around the same time came Lisp (1958), Cobol (1959), and Algol (1960). Each was designed for a specific community: Fortran for scientific computing, Cobol for business, Lisp for AI research, Algol as a general academic language.

These languages were transformative — but most of them were also ugly. Cobol programs ran to thousands of lines for things that fit on a postcard in modern languages. Lisp had so many parentheses it became a punchline. Fortran wrote arithmetic in upper-case Greek-style notation that didn't match how mathematicians actually wrote on chalkboards.

</Section>

<Section label="The 1960s and 70s: An explosion">

By the 1970s, the field had splintered into dozens of languages, each fixing some problem with the others. C (1972) gave low-level system access with a more readable syntax than assembly. Pascal (1970) tried to teach beginners. Smalltalk (1972) introduced object-oriented programming. SQL (1974) made databases queryable in something that read like English. ML (1973) introduced strong static type systems.

This period also saw the rise of the *operating system* as something separate from the hardware: Unix (1969-1973), the C language's natural habitat, defined how operating systems would look for the next half century. When you use a Mac or a Linux server today, the underlying conventions are largely Unix conventions.

</Section>

<Section label="The 1980s: The home computer">

The 1980s put computers in homes — the IBM PC (1981), the Apple Macintosh (1984), the Commodore 64. Programming was suddenly a thing teenagers did in their bedrooms, not just professionals in air-conditioned rooms. BASIC was the language most beginners learned. C++ (1985) added object-oriented features to C. Perl (1987) became the duct-tape language of system administration.

The 1980s also saw the rise of the personal computer's most dangerous trait — *complexity*. Hardware was getting fast enough that you could waste cycles, and programmers did. Software started to accumulate features without rigor. Programs got buggier.

</Section>

<Section label="Python is born — Christmas 1989">

In December 1989, a Dutch programmer named Guido van Rossum was looking for a project to occupy himself over the Christmas break. He worked at CWI, a research institute in the Netherlands, and he'd been frustrated by a language called ABC that the institute had developed. ABC had nice ideas but was hard to extend.

Guido decided to write a new language — one that took ABC's readability seriously, fixed its extensibility problems, and added a few features he liked from C. He started writing it. He named it after Monty Python's Flying Circus, which he'd been reading the scripts of (the original idea was that the documentation would be funnier if the language had a silly name).

The first public release was in 1991. The version numbers crept upward. Python 2.0 came out in 2000. Python 3.0, with breaking changes that took ten years for the community to fully adopt, came out in 2008.

By 2020, Python had become the default language of data science and machine learning. Why? Several reasons. The syntax was cleaner than C++ or Java. The "batteries included" standard library let you do an enormous amount without external dependencies. The numerical libraries — NumPy, Pandas, scikit-learn, PyTorch, TensorFlow — were written by people who needed them and worked together because they all spoke Python.

By 2026, Python is the dominant language of applied AI engineering. When a researcher publishes a new model, the reference implementation is in Python. When a startup builds an AI product, the glue code is in Python. The Claude API, the OpenAI API, ChromaDB, LangChain, every major LLM tool — all have Python as their primary supported language.

This is why we're learning Python.

</Section>

<HistoryNote year="2018" who="Guido van Rossum">

Guido stepped down as Python's "Benevolent Dictator For Life" (BDFL — the title was a Monty Python joke that stuck) in 2018, after a contentious debate about adding the walrus operator (`:=`) to the language. He was tired. The community took over governance under a steering council. Guido later joined Microsoft to work on making Python faster.

</HistoryNote>

<Section label="What Python looks like, broadly">

A few characteristics that came from Guido's design choices and now feel like core "Python-ness":

- **Indentation matters.** Python uses indentation to define blocks of code, instead of curly braces or `begin/end` keywords. This is controversial; people who switch from C-family languages often hate it at first. The reason it's there: code is read more often than it's written, and indented code is unambiguous to read.
- **There should be one obvious way to do it.** Python's design philosophy, captured in *The Zen of Python* (we'll read it together in Volume 1), prefers a single canonical solution to a problem over many slightly-different alternatives. This is the opposite of Perl ("there's more than one way to do it") and gives Python its consistency.
- **Readability counts.** Programs are read by humans more than they're written. Python's syntax is optimized for reading.
- **Practicality beats purity.** When the elegant solution conflicts with the useful one, the useful one wins. This is what made Python a language for engineers, not just academics.

</Section>

<Section label="Why this all matters">

You're going to spend the next year or so writing Python. Knowing where it came from, knowing what frustrations its design was trying to fix, makes the language make sense. When we encounter the rule that indentation defines blocks, you'll remember it isn't arbitrary — it's a deliberate choice to make code easier to read. When we encounter the philosophy that "there should be one obvious way to do it," you'll have a frame for understanding why Python's standard library has so few redundant ways to do the same thing.

History is the long answer to *why is it like this?* You won't always be in the mood for the long answer, and that's fine. But the long answer is here when you want it.

</Section>

<Connection
  back={[{ id: '00-4-the-language-of-programmers', title: 'The Language of Programmers' }]}
  forward={[{ id: '00-6-fde-mindset', title: 'The Forward Deployed Mindset' }]}
>

Next: a short orientation about the FDE mindset, since it shapes how the curriculum threads from Python into applied AI work and the kind of job you're aiming at. Two more orientation lessons after that, and then Volume 1 begins for real.

</Connection>
