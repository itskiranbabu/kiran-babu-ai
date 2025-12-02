
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Github, Instagram, Linkedin, Twitter, Zap, LayoutDashboard, Youtube, Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import { APP_NAME, NAVIGATION_LINKS, SAAS_LINKS } from '../constants';
import ChatBot from './ChatBot';
import { useTheme } from './ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Go to Home">
                <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#7B2FF7] to-[#FF9D0A] rounded-xl shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 group-hover:scale-105 transition-all duration-300">
                    <Zap size={22} className="text-white relative z-10 fill-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-dark-text leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7B2FF7] group-hover:to-[#FF9D0A] transition-all">
                        {APP_NAME}
                    </span>
                    <span className="text-[10px] font-medium text-dark-muted uppercase tracking-widest">
                        The Creator OS
                    </span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              {NAVIGATION_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-brand-500 font-bold' : 'text-dark-muted hover:text-dark-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Only show Dashboard Link if logged in, or generic Work button */}
              {!user ? (
                 <Link 
                    to="/login"
                    className="text-sm font-medium text-dark-muted hover:text-dark-text transition-colors"
                  >
                    Login
                  </Link>
              ) : (
                 <div className="relative">
                     <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-dark-muted hover:text-dark-text transition-colors focus:outline-none"
                     >
                         <span>Dashboard</span> <ChevronDown size={14} />
                     </button>
                     
                     {isUserMenuOpen && (
                         <div className="absolute top-full right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-xl shadow-xl py-1 animate-in fade-in zoom-in duration-200">
                             {SAAS_LINKS.map(link => (
                                 <Link 
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5"
                                 >
                                     {link.label}
                                 </Link>
                             ))}
                             <div className="border-t border-dark-border my-1"></div>
                             <button 
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2"
                             >
                                 <LogOut size={14} /> Sign Out
                             </button>
                         </div>
                     )}
                 </div>
              )}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-dark-muted hover:text-dark-text transition-colors rounded-full hover:bg-dark-card"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link 
                to="/book"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A] hover:opacity-90 rounded-lg transition-opacity shadow-lg shadow-brand-600/20"
              >
                Start Creating
              </Link>
              
              {user && (
                 <div className="w-8 h-8 rounded-full bg-brand-600 border border-brand-400 overflow-hidden">
                     <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                 </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-4">
              <button
                onClick={toggleTheme}
                className="text-dark-muted hover:text-dark-text"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-dark-muted hover:text-dark-text focus:outline-none"
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
                      isActive ? 'text-brand-500 bg-dark-border/50' : 'text-dark-muted hover:text-dark-text hover:bg-dark-border/30'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              {user && (
                  <>
                    <div className="border-t border-dark-border my-2 pt-2">
                        <p className="px-3 text-xs text-gray-500 font-bold uppercase mb-2">Creator Tools</p>
                         {SAAS_LINKS.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                    isActive ? 'text-brand-500 bg-dark-border/50' : 'text-dark-muted hover:text-dark-text hover:bg-dark-border/30'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <button 
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 flex items-center gap-2 mt-2"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                  </>
              )}
              
              {!user && (
                   <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-dark-muted hover:text-white"
                  >
                    Login to Dashboard
                  </Link>
              )}

              <div className="pt-2 pb-2">
                  <Link 
                    to="/book"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-white bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A] hover:opacity-90 rounded-lg font-bold"
                  >
                    Start Creating
                  </Link>
                  <p className="text-center text-[10px] text-gray-500 mt-2">by Kiran Babu</p>
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
      <footer className="bg-dark-card border-t border-dark-border py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B2FF7] to-[#FF9D0A] flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-dark-text group-hover:text-brand-500 transition-colors">{APP_NAME}</span>
            </Link>
            <p className="text-dark-muted max-w-sm mb-6">
              The Creator OS. Automating your digital empire with AI, Systems, and Content.
              <br/><span className="text-xs opacity-70">Powered by Keyrun & ContentSpark.</span>
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={Youtube} href="https://www.youtube.com/@itskiranbabu" />
              <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/itskiranbabu" />
              <SocialLink icon={Twitter} href="https://x.com/itscontentspark" />
              <SocialLink icon={Instagram} href="https://www.instagram.com/itskiranbabu/" />
              <SocialLink icon={Github} href="https://github.com/itskiranbabu" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dark-text uppercase tracking-wider mb-4">Brands</h4>
            <ul className="space-y-3 text-dark-muted">
              <li><a href="#" className="hover:text-brand-500">@itskiranbabu</a></li>
              <li><a href="#" className="hover:text-brand-500">@itskeyrun.ai</a></li>
              <li><a href="#" className="hover:text-brand-500">@itscontentspark</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dark-text uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3 text-dark-muted">
              <li><Link to="/privacy" className="hover:text-dark-text">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-dark-text">Terms of Service</Link></li>
              <li><Link to="/book" className="hover:text-dark-text">Contact Support</Link></li>
              <li><Link to="/dashboard" className="hover:text-dark-text">Client Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-dark-border text-center text-dark-muted text-sm">
          &copy; {new Date().getFullYear()} {APP_NAME}. Built by Kiran Babu.
        </div>
      </footer>
    </div>
  );
};

const SocialLink = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-dark-muted hover:text-brand-500 transition-colors"
  >
    <Icon size={20} />
  </a>
);

export default Layout;
