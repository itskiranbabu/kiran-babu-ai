import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import CopilotLayout from './components/CopilotLayout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Playground from './pages/Playground';
import BookCall from './pages/BookCall';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './components/ToastContext';
import CookieConsent from './components/CookieConsent';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// SaaS Features
import CRM from './pages/CRM';
import Analytics from './pages/Analytics';
import Funnels from './pages/Funnels';
import Referral from './pages/Referral';
import ClientPortal from './pages/ClientPortal';
import AIAvatar from './pages/AIAvatar';
import Templates from './pages/Templates';
// NEW FEATURES
import Repurpose from './pages/Repurpose';
import Copilot from './pages/Copilot';
import Workflows from './pages/Workflows';
import WorkflowDetail from './pages/WorkflowDetail';
import RunViewer from './pages/RunViewer';
import Calendar from './pages/Calendar';
import Onboarding from './pages/Onboarding';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Main Site Layout */}
                <Route element={<Layout><Outlet /></Layout>}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/playground" element={<Playground />} />
                  <Route path="/book" element={<BookCall />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/login" element={<Login />} />
                  
                  <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
                  <Route path="/repurpose" element={<ProtectedRoute><Repurpose /></ProtectedRoute>} />
                  <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                  <Route path="/funnels" element={<ProtectedRoute><Funnels /></ProtectedRoute>} />
                  <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />
                  <Route path="/client-portal" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>} />
                  <Route path="/ai-avatar" element={<ProtectedRoute><AIAvatar /></ProtectedRoute>} />
                  <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
                  
                  {/* Copilot Suite with Sub-Layout */}
                  <Route path="/copilot" element={<ProtectedRoute><CopilotLayout /></ProtectedRoute>}>
                      <Route index element={<Copilot />} />
                      <Route path="workflows" element={<Workflows />} />
                      <Route path="workflows/:id" element={<WorkflowDetail />} />
                      <Route path="runs/:id" element={<RunViewer />} />
                  </Route>

                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <CookieConsent />
            </Router>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
