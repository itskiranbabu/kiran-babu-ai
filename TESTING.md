# Testing Guide for KeySpark AI

This document provides comprehensive information about testing in the KeySpark AI project.

## Table of Contents

- [Overview](#overview)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Coverage](#coverage)
- [Best Practices](#best-practices)

## Overview

KeySpark AI uses **Vitest** as the testing framework along with **React Testing Library** for component testing. This combination provides:

- ⚡ Fast test execution with Vite's speed
- 🎯 Component testing with React Testing Library
- 📊 Built-in coverage reporting
- 🔄 Watch mode for development
- 🎨 Optional UI for interactive testing

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Run tests with UI (interactive mode)
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- tests/components/Layout.test.tsx

# Run tests matching a pattern
npm test -- --grep="ErrorBoundary"
```

### CI/CD Integration

Tests automatically run on:
- Pull requests
- Pushes to main branch
- Pre-deployment checks

## Test Structure

```
tests/
├── setup.ts                    # Global test configuration
├── components/                 # Component tests
│   ├── Layout.test.tsx
│   └── ErrorBoundary.test.tsx
├── utils/                      # Utility function tests
│   └── env.test.ts
└── integration/                # Integration tests (future)
```

## Writing Tests

### Component Testing Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const { user } = render(<MyComponent />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Utility Function Testing Example

```typescript
import { describe, it, expect } from 'vitest';
import { myUtilityFunction } from '../../utils/myUtil';

describe('myUtilityFunction', () => {
  it('returns expected value', () => {
    const result = myUtilityFunction('input');
    expect(result).toBe('expected output');
  });

  it('handles edge cases', () => {
    expect(myUtilityFunction('')).toBe('');
    expect(myUtilityFunction(null)).toBeUndefined();
  });
});
```

### Testing with Context Providers

```typescript
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

// Usage
renderWithProviders(<MyComponent />);
```

## Coverage

### Viewing Coverage

After running `npm run test:coverage`, open `coverage/index.html` in your browser to see detailed coverage reports.

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Excluded from Coverage

- Configuration files (`*.config.ts`)
- Type definitions (`*.d.ts`)
- Mock data files
- Node modules

## Best Practices

### 1. Test Behavior, Not Implementation

❌ **Bad**: Testing internal state
```typescript
expect(component.state.count).toBe(5);
```

✅ **Good**: Testing user-visible behavior
```typescript
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

### 2. Use Descriptive Test Names

❌ **Bad**:
```typescript
it('works', () => { ... });
```

✅ **Good**:
```typescript
it('displays error message when API call fails', () => { ... });
```

### 3. Arrange-Act-Assert Pattern

```typescript
it('increments counter on button click', async () => {
  // Arrange
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  
  // Act
  await userEvent.click(button);
  
  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 4. Mock External Dependencies

```typescript
import { vi } from 'vitest';

vi.mock('../../services/api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mock' })),
}));
```

### 5. Clean Up After Tests

```typescript
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

### 6. Test Accessibility

```typescript
it('is accessible', () => {
  const { container } = render(<MyComponent />);
  
  // Check for proper ARIA labels
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  
  // Check for keyboard navigation
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('tabIndex', '0');
});
```

## Common Testing Patterns

### Testing Async Operations

```typescript
it('loads data asynchronously', async () => {
  render(<DataComponent />);
  
  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
  
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

### Testing Error States

```typescript
it('displays error message on failure', async () => {
  // Mock API to return error
  vi.mocked(api.fetchData).mockRejectedValue(new Error('API Error'));
  
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

### Testing Forms

```typescript
it('submits form with valid data', async () => {
  const onSubmit = vi.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
```

## Troubleshooting

### Tests Failing Locally But Passing in CI

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for environment-specific issues
- Ensure consistent Node.js versions

### Slow Tests

- Use `vi.mock()` to mock heavy dependencies
- Avoid unnecessary `waitFor()` calls
- Use `screen.getBy*` instead of `screen.findBy*` when possible

### Flaky Tests

- Avoid testing implementation details
- Use `waitFor()` for async operations
- Don't rely on timing (use proper async utilities)

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:
1. Write tests first (TDD approach recommended)
2. Ensure all tests pass before submitting PR
3. Maintain or improve coverage percentage
4. Add integration tests for critical user flows
