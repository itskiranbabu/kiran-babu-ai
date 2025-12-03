import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../../components/Layout';
import { ThemeProvider } from '../../components/ThemeContext';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock child components to simplify testing
vi.mock('../../components/ChatBot', () => ({
  default: () => <div data-testid="chatbot">ChatBot</div>,
}));

const renderWithProviders = (children: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Layout Component', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders navigation elements', () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    
    // Check for KeySpark branding
    const brandElements = screen.getAllByText(/KeySpark/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders footer', () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    
    // Footer should contain copyright or brand info
    const footer = screen.getByText(/©/i) || screen.getByText(/KeySpark/i);
    expect(footer).toBeInTheDocument();
  });
});
