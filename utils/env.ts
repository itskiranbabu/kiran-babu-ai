/**
 * Safely retrieves environment variables across different build tools (Vite, Next.js, Node).
 * Prioritizes process.env (often injected by defines) then falls back to import.meta.env.
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  let value: string | undefined;

  // 1. Try process.env (Vite 'define' or Node)
  try {
    if (typeof process !== 'undefined' && process.env) {
      value = process.env[key];
    }
  } catch (e) {
    // process might not be defined in strict browser environments
  }

  // 2. Try import.meta.env (Vite standard)
  if (!value) {
    try {
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        value = import.meta.env[key];
      }
    } catch (e) {
      // import.meta might not be available
    }
  }

  // 3. Try window object (Optional runtime injection)
  if (!value && typeof window !== 'undefined') {
    // @ts-ignore
    value = window.__ENV__?.[key];
  }

  return value || fallback;
}