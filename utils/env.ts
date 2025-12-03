/**
 * Safely retrieves environment variables across different build tools (Vite, Next.js, Node).
 * Prioritizes window.__ENV__ (injected by our vite.config.ts) to bypass Vercel limitations.
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  let value: string | undefined;

  // 1. Try window object (Injected by vite.config.ts define)
  if (typeof window !== 'undefined') {
    // @ts-ignore
    value = window.__ENV__?.[key];
  }

  // 2. Try import.meta.env (Vite standard fallback)
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

  // 3. Try process.env (Node/Fallback)
  if (!value) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        value = process.env[key];
      }
    } catch (e) {
      // process undefined
    }
  }

  return value || fallback;
}
