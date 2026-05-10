/**
 * Pyodide runtime — Python in the browser.
 *
 * Pyodide is a port of CPython compiled to WebAssembly. When you call
 * `getPyodide()`, we lazy-load the runtime from the official CDN, attach
 * it to a singleton, and reuse it for the lifetime of the page.
 *
 * Why a singleton? Loading Pyodide costs ~10MB and ~2 seconds even on a
 * fast connection. Loading it more than once would be cruel.
 *
 * The execution model is:
 *   1. User types code into Monaco
 *   2. They press Run
 *   3. We pass the code to `runPython(code)` here
 *   4. Pyodide redirects sys.stdout/stderr to JS callbacks
 *   5. We capture stdout, stderr, and the final value (if any)
 *   6. We return a structured result
 *
 * Error handling: Python errors come back as a string via Pyodide's
 * `console_log` mechanism. We catch them and return them as `stderr`
 * so the UI can highlight them in red.
 */

declare global {
  interface Window {
    loadPyodide?: (options?: {
      indexURL?: string;
      stdout?: (s: string) => void;
      stderr?: (s: string) => void;
    }) => Promise<PyodideInterface>;
  }
}

export interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (s: string) => void }) => void;
  setStderr: (options: { batched: (s: string) => void }) => void;
  globals: {
    get: (name: string) => unknown;
    set: (name: string, value: unknown) => void;
  };
  loadPackagesFromImports: (code: string) => Promise<void>;
  version: string;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  durationMs: number;
  ok: boolean;
}

const PYODIDE_VERSION = '0.27.0';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodideInstance: PyodideInterface | null = null;
let loadPromise: Promise<PyodideInterface> | null = null;

/**
 * Inject the Pyodide loader script if it isn't already on the page.
 * Pyodide's main script must be loaded as a `<script>` tag, not via
 * dynamic import, because it expects to attach `loadPyodide` to `window`.
 */
function ensureLoaderScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Pyodide can only be loaded in the browser.'));
      return;
    }
    if (window.loadPyodide) {
      resolve();
      return;
    }
    const existing = document.querySelector(
      'script[data-pyodide-loader]'
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Pyodide loader failed to load.'))
      );
      return;
    }
    const s = document.createElement('script');
    s.src = `${PYODIDE_CDN}pyodide.js`;
    s.async = true;
    s.dataset.pyodideLoader = 'true';
    s.onload = () => resolve();
    s.onerror = () =>
      reject(new Error('Failed to fetch Pyodide loader script.'));
    document.head.appendChild(s);
  });
}

/**
 * Get (or initialize) the Pyodide singleton. Safe to call many times.
 */
export async function getPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    await ensureLoaderScript();
    if (!window.loadPyodide) {
      throw new Error('window.loadPyodide is missing after script load.');
    }
    const py = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    pyodideInstance = py;
    return py;
  })();

  return loadPromise;
}

/**
 * Run a chunk of Python and return structured output.
 *
 * The execution is wrapped so an exception becomes stderr text rather
 * than a thrown JS error. That matches how a learner experiences a
 * traceback in a regular Python REPL.
 */
export async function runPython(code: string): Promise<RunResult> {
  const start = performance.now();
  const stdoutChunks: string[] = [];
  const stderrChunks: string[] = [];

  let py: PyodideInterface;
  try {
    py = await getPyodide();
  } catch (e) {
    return {
      stdout: '',
      stderr: `Could not load Python runtime: ${(e as Error).message}`,
      durationMs: performance.now() - start,
      ok: false,
    };
  }

  // Pyodide's `batched` stdout callback fires once per print() call and
  // strips the trailing newline. Re-add it so that successive print() calls
  // render on separate lines (otherwise they all run together).
  py.setStdout({ batched: (s) => stdoutChunks.push(s + '\n') });
  py.setStderr({ batched: (s) => stderrChunks.push(s + '\n') });

  let ok = true;
  try {
    // loadPackagesFromImports lets us silently install pure-Python
    // packages the user might import (numpy, etc.). It is a no-op for
    // code that doesn't import third-party packages.
    await py.loadPackagesFromImports(code);
    await py.runPythonAsync(code);
  } catch (e) {
    ok = false;
    stderrChunks.push((e as Error).message ?? String(e));
  }

  return {
    stdout: stdoutChunks.join(''),
    stderr: stderrChunks.join(''),
    durationMs: performance.now() - start,
    ok,
  };
}

/**
 * Reset the Python interpreter's globals. Useful between exercises so
 * variables don't leak from one cell to the next when the lesson
 * intends them to be isolated.
 */
export async function resetPython(): Promise<void> {
  const py = await getPyodide();
  await py.runPythonAsync(`
import sys
for name in list(globals().keys()):
    if not name.startswith('_'):
        del globals()[name]
`);
}

export function getPyodideStatus(): 'idle' | 'loading' | 'ready' | 'error' {
  if (pyodideInstance) return 'ready';
  if (loadPromise) return 'loading';
  return 'idle';
}
