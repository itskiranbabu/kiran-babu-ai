/**
 * Safely retrieves environment variables.
 * Prioritizes standard Vite/Process injection.
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  let value: string | undefined;

  // 1. Try process.env (Injected by vite.config.ts define)
  try {
    if (typeof process !== 'undefined' && process.env) {
      value = process.env[key];
    }
  } catch (e) {
    // process might not be defined in strict browser environments
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

  // 3. Fallback for potential window injections (optional safety net)
  if (!value && typeof window !== 'undefined') {
    // @ts-ignore
    value = window.__ENV__?.[key];
  }

  return value || fallback;
}
