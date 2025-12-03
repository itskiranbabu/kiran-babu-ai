/**
 * Safely retrieves environment variables.
 * Compatible with both Vite local dev and Vercel production builds.
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
      // import.meta unavailable
    }
  }

  return value || fallback;
}
