---
id: 10-2-claude-api-first-call
volume: volume-10-applied-ai
chapter: 1
number: 2
title: "The Claude API — A First Call"
subtitle: "From zero to a working AI integration in 30 lines."
estimatedMinutes: 12
prerequisites: [10-1-how-llms-work]
keyTerms: []
exerciseCount: 0
checkpoint: false
tags: [theory, practice, fde]
---

<Section label="The Opening">

You can't call the Claude API from inside this in-browser editor (it requires an API key and outbound HTTP, neither of which Pyodide has). But the code is short, and once you have a key, you can run this on your own laptop in five minutes.

This lesson walks through the Anthropic SDK call structure — what the request looks like, what the response looks like, and the patterns you'll use repeatedly.

</Section>

<Section label="Setup">

On your local machine:

```bash
pip install anthropic
```

Get an API key from console.anthropic.com. Set it as an environment variable:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

Never commit the key to git. It's a secret.

</Section>

<Section label="The basic call">

```python
import anthropic

client = anthropic.Anthropic()
# Reads ANTHROPIC_API_KEY from environment by default.

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude. What's your name?"}
    ]
)

print(response.content[0].text)
```

That's the whole minimal program. Walking through it:

- `anthropic.Anthropic()` creates a client. It reads the API key from env.
- `client.messages.create(...)` sends a message and gets a response.
- `model="claude-opus-4-7"` selects which Claude version to use. Opus is the largest and most capable. Sonnet is faster and cheaper. Haiku is the fastest and cheapest.
- `max_tokens=1024` caps the response length.
- `messages=[...]` is the conversation history. Each message has a `role` ("user" or "assistant") and `content` (the text).
- The response is structured. `response.content[0].text` gives you the assistant's reply as a string.

</Section>

<Section label="Multi-turn conversations">

To have a real conversation, append to the messages list:

```python
messages = [
    {"role": "user", "content": "What's the capital of France?"}
]

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=messages,
)

# Append the response.
messages.append({
    "role": "assistant",
    "content": response.content[0].text
})

# Continue the conversation.
messages.append({"role": "user", "content": "And the capital of Germany?"})

response2 = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=messages,
)
print(response2.content[0].text)
```

Every turn, you send the *full conversation so far* and get back a single new assistant turn. The API is stateless — each call is independent. You manage the conversation history yourself.

</Section>

<Section label="System prompts">

A system prompt sets the assistant's persona, behavior, or task at the start of the conversation:

```python
response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    system="You are a senior Python engineer. Be terse and precise. No filler.",
    messages=[
        {"role": "user", "content": "What's the difference between == and is?"}
    ]
)
```

The system prompt is separate from the messages list. It's a way to "configure" Claude's behavior for this conversation. Use it for persona, format constraints, refusal rules, output structure.

</Section>

<Section label="Streaming">

For long responses, streaming is better — tokens appear as they're generated:

```python
with client.messages.stream(
    model="claude-opus-4-7",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a haiku about Python."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

The `stream.text_stream` is an iterable of text chunks. As each chunk arrives, you print it. The user sees the response building in real time, which is way better UX than waiting 5 seconds for the full response.

</Section>

<Section label="Tool use">

Claude can call functions you define. This is the foundation of agentic systems. Briefly:

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city.",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string"}
            },
            "required": ["city"]
        }
    }
]

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather in Chiang Mai?"}
    ]
)
```

Claude inspects the tools, decides which to call, and returns a tool-use block in its response. Your code then runs the actual function (calls a weather API, returns data), sends the result back to Claude in another message, and Claude responds to the user with the resolved info.

We'll cover tool use in detail later in Volume 10.

</Section>

<Section label="Cost considerations">

API calls cost money — billed per token, both input and output. The big knobs:

- **Model size.** Opus > Sonnet > Haiku, both in capability and cost. Use the smallest model that does the job.
- **Context length.** Big context windows means lots of input tokens means high cost. Don't stuff context unnecessarily.
- **Output length.** Capping `max_tokens` prevents runaway responses.
- **Caching.** Anthropic supports prompt caching — common prefixes are cached server-side, reducing input cost on repeated calls. Use it for system prompts that repeat.

For local development, the cost is usually pennies per session. For production, it can be substantial. FDEs at AI companies regularly think about cost-per-task — what's the cost of solving one customer ticket, one document review, one analysis?

</Section>

<FDEConnection>

The pattern of an FDE prototyping a new use case:

1. *Get a working call in 30 lines.* The code above is the starting point.
2. *Iterate on prompts.* Try different framings. See what works.
3. *Measure quality.* Build a small eval set — known-good outputs you compare against. We'll cover evals soon.
4. *Productionize.* Add error handling, rate limiting, logging, monitoring.
5. *Optimize cost.* Smaller model? Caching? Truncation?

Steps 1-2 take a day. Steps 3-5 take weeks. The unglamorous parts are where production AI lives.

</FDEConnection>

<InterviewPhrase setup="When asked 'walk me through how you'd use the Claude API,' something like this works.">

The basic shape is: instantiate a client with the API key, build a list of messages with role and content, call client.messages.create with model and max_tokens, and parse response.content[0].text. For production, you'd add streaming for UX, tool definitions for agentic behavior, prompt caching for cost, and a system prompt for persona. The API itself is straightforward; the engineering is in the harness around it — evals, error handling, observability.

</InterviewPhrase>

<Connection
  back={[{ id: '10-1-how-llms-work', title: 'How LLMs Work — A Working Engineer\'s Mental Model' }]}
  forward={[{ id: '10-3-embeddings-explained', title: 'Embeddings — Vectors of Meaning' }]}
>

Next: embeddings. The other half of the modern AI toolkit — vectors that represent meaning, used for similarity search, RAG, and clustering.

</Connection>
