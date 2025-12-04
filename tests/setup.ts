import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.mock('../utils/env', () => ({
  getEnv: (key: string, fallback?: string) => {
    const mockEnv: Record<string, string> = {
      'VITE_GEMINI_API_KEY': 'test-api-key',
      'VITE_SUPABASE_URL': 'https://test.supabase.co',
      'VITE_SUPABASE_ANON_KEY': 'test-anon-key',
      'API_KEY': 'test-api-key',
    };
    return mockEnv[key] || fallback || '';
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;
