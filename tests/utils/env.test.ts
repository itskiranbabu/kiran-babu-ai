import { describe, it, expect, beforeEach, vi } from 'vitest';

// We need to test the actual implementation, not the mock
vi.unmock('../utils/env');

describe('getEnv utility', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns fallback when key is not found', async () => {
    const { getEnv } = await import('../../utils/env');
    const result = getEnv('NON_EXISTENT_KEY', 'fallback-value');
    expect(result).toBe('fallback-value');
  });

  it('returns undefined when no fallback provided and key not found', async () => {
    const { getEnv } = await import('../../utils/env');
    const result = getEnv('NON_EXISTENT_KEY');
    expect(result).toBeUndefined();
  });

  it('handles process.env access safely', async () => {
    const { getEnv } = await import('../../utils/env');
    // Should not throw even if process is undefined
    expect(() => getEnv('ANY_KEY')).not.toThrow();
  });
});
