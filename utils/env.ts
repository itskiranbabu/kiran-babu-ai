/**
 * Safely retrieves environment variables across different build tools (Vite, Next.js, Node).
 */
export function getEnv(key: string, fallback?: string): string | undefined {
  let value: string | undefined;

  // 1. Try import.meta.env (Vite standard)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      value = import.meta.env[key];
    }
  } catch (e) {
    // Ignore
  }

  // 2. Try process.env (Node/Vercel standard)
  if (!value) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        value = process.env[key];
      }
    } catch (e) {
      // Ignore
    }
  }

  return value || fallback;
}