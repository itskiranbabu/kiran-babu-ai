
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Github, Instagram, Linkedin, Twitter, BrainCircuit, LayoutDashboard } from 'lucide-react';
import { APP_NAME, NAVIGATION_LINKS } from '../constants';
import ChatBot from './ChatBot';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Go to Home">
                <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-brand-600 to-violet-500 rounded-xl shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 group-hover:scale-105 transition-all duration-300">
                    <BrainCircuit size={20} className="text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-white leading-tight group-hover:text-brand-200 transition-colors">
                        {APP_NAME}
                    </span>
                    <span className="text-[10px] font-medium text-brand-400 uppercase tracking-widest">
                        AI Architect
                    </span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {NAVIGATION_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-brand-400' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition-colors"
                title="Go to Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>
              <Link 
                to="/book"
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-lg shadow-brand-600/20"
              >
                Work With Me
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-card border-b border-dark-border animate-in slide-in-from-top-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAVIGATION_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive ? 'text-brand-400 bg-dark-border' : 'text-gray-300 hover:text-white hover:bg-dark-border'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-4 pb-2 border-t border-dark-border mt-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-border rounded-md font-medium"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
              </div>
              <div className="pt-2 pb-2">
                  <Link 
                    to="/book"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-white bg-brand-600 hover:bg-brand-700 rounded-lg font-bold"
                  >
                    Work With Me
                  </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* AI Chat Bot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-dark-card border-t border-dark-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform">
                <BrainCircuit size={18} />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{APP_NAME}</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Empowering creators and solopreneurs with AI-driven systems, high-converting designs, and content strategies.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={Instagram} href="#" />
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Linkedin} href="#" />
              <SocialLink icon={Github} href="#" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Brands</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-brand-400">@itskiranbabu</a></li>
              <li><a href="#" className="hover:text-brand-400">@itskeyrun.ai</a></li>
              <li><a href="#" className="hover:text-brand-400">@itscontentspark</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/book" className="hover:text-white">Contact</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Client Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-dark-border text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Kiran Babu. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const SocialLink = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a href={href} className="text-gray-400 hover:text-brand-400 transition-colors">
    <Icon size={20} />
  </a>
);

export default Layout;
