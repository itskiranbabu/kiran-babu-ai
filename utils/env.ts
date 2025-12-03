/**
 * Safely retrieves environment variables.
 * Prioritizes window.__ENV__ injected by Vite config.
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  let value: string | undefined;

  // 1. Try window object (Injected by vite.config.ts define)
  if (typeof window !== 'undefined') {
    // @ts-ignore
    value = window.__ENV__?.[key];
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
      // import.meta unavailable
    }
  }

  return value || fallback;
}
