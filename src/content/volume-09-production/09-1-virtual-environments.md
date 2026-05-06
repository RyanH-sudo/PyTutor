---
id: 09-1-virtual-environments
volume: volume-09-production
chapter: 1
number: 1
title: "Virtual Environments — Why and How"
subtitle: "Isolating Python projects so they don't fight each other."
estimatedMinutes: 11
prerequisites: []
keyTerms: []
exerciseCount: 0
checkpoint: false
tags: [theory]
---

<Section label="The Opening">

When you start working on a real Python project, you'll run into a problem fast: project A needs `requests` 2.28, but project B needs `requests` 2.30. If you install one globally, the other breaks. The solution is *virtual environments* — isolated Python installations, one per project.

This lesson covers why virtual environments exist, how to create one, how to use it, and modern alternatives like Poetry and uv.

This is theory-only because we can't actually create venvs in the browser. When you eventually run Python locally, this is the first thing to set up.

</Section>

<Section label="The dependency-conflict problem">

Python packages live in a single global location by default. When you `pip install requests`, it goes there, available to every Python script.

The trouble:

- Project A uses requests 2.28 and you've tested everything against it.
- Project B needs the new feature in requests 2.30.
- Update requests globally, and project A might break.
- Don't update, and project B can't run.

Without isolation, your Python install becomes a fragile shared state across all your projects. Virtual environments isolate per-project: each project has its own `requests`, its own `numpy`, its own everything.

</Section>

<Section label="What a virtual environment is">

A virtual environment is just a directory containing:

- A copy (or symlink) of the Python interpreter.
- A folder for installed packages.
- Activation scripts that adjust your PATH so commands run from the venv.

When the venv is *activated*, `python` and `pip` refer to the venv's copies. Packages you install go into the venv, not your system Python. Deactivate, and you're back to system Python.

Virtual environments are cheap (a few MB) and easy to throw away. The convention is to create one per project.

</Section>

<Section label="Creating a venv with the standard library">

Python ships with `venv`, the standard tool for creating virtual environments:

```bash
# Create:
python3 -m venv .venv

# Activate (Unix/Mac):
source .venv/bin/activate

# Activate (Windows PowerShell):
.\.venv\Scripts\Activate.ps1

# Now `python` and `pip` refer to the venv:
python --version
pip install requests

# When done:
deactivate
```

The `.venv` directory holds the venv. The leading dot is convention — it makes the directory hidden in most file managers. You can name it whatever, but `.venv` is the de facto standard.

`.venv` should be added to `.gitignore` — it's a build artifact, not source code. Each developer creates their own.

</Section>

<Section label="requirements.txt">

To share which packages a project depends on, write a `requirements.txt` file. Each line is a package, optionally with a version pin:

```
requests==2.30.0
numpy>=1.24,<2.0
pandas
```

Anyone with the source can recreate the environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Generate the file from a working venv with:

```bash
pip freeze > requirements.txt
```

This produces an exact pin of every installed package, including transitive dependencies. Commit it to git so others can reproduce your environment exactly.

</Section>

<Section label="Modern alternatives">

`venv` + `pip` is the baseline. Modern tooling improves on it:

**Poetry** (poetry-py.org). A package manager that handles venvs, dependency resolution, and publishing. Configuration in `pyproject.toml`. The standard for new projects since around 2020.

**uv** (astral.sh/uv). A blazingly fast venv and package manager written in Rust. Drop-in compatible with pip but 10-100x faster. Increasingly popular as of 2025.

**pipenv**. Older alternative to Poetry. Less popular now but you'll see it in legacy projects.

**Conda**. Used in scientific computing. Manages non-Python dependencies too (C libraries, CUDA). Different model from pip.

For most new Python projects today, the choice is Poetry or uv. Both are mature.

</Section>

<Section label="Project structure conventions">

A typical Python project looks like:

```
my-project/
├── .venv/                  (gitignored; created locally)
├── .gitignore
├── pyproject.toml          (Poetry/uv) OR requirements.txt
├── README.md
├── src/
│   └── my_package/
│       ├── __init__.py
│       └── main.py
└── tests/
    ├── __init__.py
    └── test_main.py
```

The `src/` layout (with code in `src/my_package/`) is recommended over the older flat layout. It avoids subtle import bugs.

We'll cover packaging, testing, type checking, and the rest of "production Python" through the rest of Volume 9.

</Section>

<FDEConnection>

Every customer engagement starts with replicating their environment. Knowing virtual environments cold means you can sit down at a customer's machine, create an isolated workspace, install the dependencies, and run their stack without polluting their system Python. It's the kind of unglamorous skill that signals competence.

When you write deployment instructions for customers, the venv setup is usually the first three lines. Precision matters: `python3.12 -m venv .venv` makes it clear which Python version is needed.

</FDEConnection>

<Connection>

Volume 9 continues with testing (pytest), type checking (mypy), code style (ruff), logging, and the patterns of writing Python that scales beyond a single script.

</Connection>
