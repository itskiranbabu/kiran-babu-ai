
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
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

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book" element={<BookCall />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Catch all route handles 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <CookieConsent />
      </Router>
    </ToastProvider>
  );
};

export default App;
