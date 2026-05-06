---
id: 10-3-embeddings-explained
volume: volume-10-applied-ai
chapter: 1
number: 3
title: "Embeddings — Vectors of Meaning"
subtitle: "How text becomes numbers, and why that's powerful."
estimatedMinutes: 13
prerequisites: [10-2-claude-api-first-call]
keyTerms: [embedding]
exerciseCount: 0
checkpoint: false
tags: [theory, fde]
---

<Section label="The Opening">

Most production AI systems aren't just an LLM with a prompt. They're built on a pair: an LLM (for generation) and an *embedding model* (for similarity search). Embeddings are how text becomes searchable by meaning. They power RAG, semantic search, deduplication, clustering, and recommendation.

This lesson explains what embeddings are at a working-engineer level, what they're used for, and the typical embedding workflow.

</Section>

<EtymologyCard
  term="embedding"
  origin="English"
  rootForm="to embed"
  rootMeaning="to fix into a surrounding mass"
  story="The verb 'to embed' (originally 'imbed') has been in English since the 1700s, meaning 'to fix firmly in a surrounding mass.' The noun 'embedding' in mathematics means a structure-preserving mapping from one space to another. In machine learning, 'embedding' refers specifically to a learned mapping from discrete things (words, sentences, images) into a continuous vector space, where similar things are close. The metaphor is exact: the discrete object is 'embedded' into a geometric space."
  insight="When you compute an embedding for a sentence, you're saying 'place this sentence at a point in a high-dimensional space — a point near other semantically similar sentences.' The embedding is the location. Similarity is measured by closeness."
/>

<Section label="The fundamental idea">

An embedding model takes a piece of text (or other input) and produces a list of numbers — typically 256 to 1536 of them — called a *vector* or *embedding*. The numbers aren't human-meaningful individually. Collectively they represent the semantic content of the input.

The magic property: **semantically similar inputs produce numerically similar vectors.** "Dogs are pets" and "Dogs are domestic animals" produce embeddings that are close in vector space. "Dogs are pets" and "The Roman Empire fell in 476 AD" produce embeddings that are far apart.

This sounds abstract until you realize what it lets you do: search for "what's the company's vacation policy" and find documents that say "PTO entitlement is..." even though the words are different. The meaning matches; the embeddings are close.

</Section>

<Section label="Why this is powerful">

Old-school text search (SQL `LIKE`, grep, basic full-text search) is *keyword-based*. You search for "vacation policy" and find documents containing those exact words. If the document uses "PTO" instead, you miss it.

Semantic search via embeddings is *meaning-based*. You can find documents that are *about* the same topic, even if they use different words.

This is the foundation of RAG (Retrieval-Augmented Generation), the most common production AI deployment pattern. The flow:

1. **Index time:** Take your corpus of documents. Chunk each into small pieces. Embed each chunk. Store the (chunk, embedding) pairs in a *vector database*.
2. **Query time:** User asks a question. Embed the question. Search the vector database for the chunks with embeddings most similar to the question's embedding. Pass those chunks to the LLM as context. Ask the LLM to answer using the chunks.

This is how almost every "chat with your documents" system works. The LLM doesn't memorize the documents — they're retrieved on demand based on semantic similarity.

</Section>

<Section label="A typical embedding API call">

Anthropic doesn't provide an embedding API directly (as of writing). For embeddings, common options are:

- OpenAI's `text-embedding-3-small` or `text-embedding-3-large`.
- Voyage AI's models.
- Open-source models like all-MiniLM-L6-v2 via the `sentence-transformers` library.

Example (OpenAI):

```python
import openai

client = openai.OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Dogs are domestic animals."
)

embedding = response.data[0].embedding
print(len(embedding))     # 1536 — a list of 1536 floats
```

The embedding is just a list of numbers. You then do whatever you want with it — store it, compare it, search.

</Section>

<Section label="Cosine similarity">

To measure how similar two embeddings are, the standard metric is *cosine similarity* — basically, the cosine of the angle between the two vectors when you treat them as arrows from the origin.

```python
import math

def cosine_similarity(a, b):
    """Return the cosine similarity between two vectors."""
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x ** 2 for x in a))
    norm_b = math.sqrt(sum(y ** 2 for y in b))
    return dot / (norm_a * norm_b)
```

Result is between -1 and 1. Higher means more similar. Identical vectors get 1. Random vectors hover around 0. Opposite vectors get -1 (rare in practice for text).

In practice, you'd use NumPy or a dedicated library for performance — computing similarities by hand on 1536-dim vectors over a million documents would be slow.

</Section>

<Section label="Vector databases">

A *vector database* (or vector store) is a database optimized for fast similarity search over high-dimensional vectors. Given a query vector, it returns the K most similar vectors in the database, fast.

Common options:

- **ChromaDB.** Simple, embedded, good for prototypes. Free.
- **Pinecone.** Managed cloud. Easy to use. Paid.
- **Weaviate.** Self-hosted or cloud. Open source.
- **FAISS.** Facebook's library. Pure Python/C++. Used as a building block.
- **PGvector.** Postgres extension. Use Postgres as your vector DB.

For most projects, ChromaDB is a great starting point. Local, free, simple API:

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_docs")

# Add documents (ChromaDB embeds them automatically).
collection.add(
    documents=["Dogs are domestic animals.", "Cats are independent."],
    ids=["d1", "d2"]
)

# Query.
results = collection.query(
    query_texts=["What are pets?"],
    n_results=2
)
print(results)
```

ChromaDB embeds, stores, and searches all for you. Great for getting started.

</Section>

<Section label="Chunking strategy">

The trick that separates good RAG from bad RAG is *chunking* — how you split your documents into pieces before embedding.

If chunks are too big, the embedding represents too many ideas at once and similarity search gets noisy. If chunks are too small, the chunks don't have enough context to be meaningful.

Common chunk sizes: 500-1500 characters or 100-500 tokens. With overlap (say, 100 characters of overlap between consecutive chunks) so context isn't lost at boundaries.

Smarter approaches: chunk on natural boundaries (paragraphs, headings, sentences) rather than arbitrary character counts. Keep semantically coherent text in single chunks.

This is one of the things FDEs tune per customer. The right chunk size depends on the document type and the typical question. We'll spend a whole lesson on chunking strategies later.

</Section>

<FDEConnection>

When deploying RAG for a customer:

1. *Pilot first.* Take 50-100 of their documents. Build a working prototype. Have them ask 20-30 typical questions. Measure quality.
2. *Tune chunking.* Different document types need different chunk sizes. Contracts: paragraph-level. Code: function-level. Tickets: full-ticket-level.
3. *Tune retrieval.* Top-K varies. Sometimes K=3 is right; sometimes K=10. Sometimes hybrid (semantic + keyword) beats pure semantic.
4. *Build evals.* Automated checks that the system retrieves the right chunks and produces the right answers.
5. *Productionize.* Logging, error handling, observability, cost monitoring.

The retrieval layer is where 80% of RAG project effort goes. The LLM at the end is the easy part.

</FDEConnection>

<InterviewPhrase setup="If asked 'how would you build a RAG system,' something like this works.">

Index time: chunk the documents into pieces of roughly 500-1000 tokens with some overlap, embed each chunk with a model like text-embedding-3-small, and store (chunk, embedding) pairs in a vector database like ChromaDB or Pinecone. Query time: embed the user's question, retrieve the top K most similar chunks via cosine similarity, format them into a prompt with the question, and pass to the LLM. The hard parts are chunking strategy, retrieval relevance, and evaluation — the LLM call itself is the easy 20%.

</InterviewPhrase>

<Connection
  back={[{ id: '10-2-claude-api-first-call', title: 'The Claude API — A First Call' }]}
>

Volume 10 continues with chunking strategies, hybrid retrieval, prompt vs context engineering, evals, agentic patterns, and Model Context Protocol — the full applied AI toolkit.

</Connection>
