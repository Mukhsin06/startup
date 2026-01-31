import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SubmitPage from './pages/SubmitPage';
import LaunchPage from './pages/LaunchPage';
import { useI18n } from './i18n';

const NavLink = ({ to, active, children }: { to: string, active: boolean, children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      active 
      ? 'text-neon-blue bg-neon-blue/10' 
      : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {children}
  </Link>
);

const Navigation = () => {
  const { t, language, setLanguage } = useI18n();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-bold text-black text-xs group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-shadow">
               SR
            </div>
            <span className="font-mono font-bold tracking-wider text-white">{t('brand.title')}</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
             <NavLink to="/" active={isActive('/')}>{t('nav.home')}</NavLink>
             <NavLink to="/submit" active={isActive('/submit')}>{t('nav.submit')}</NavLink>
             <NavLink to="/launch" active={isActive('/launch')}>{t('nav.launch')}</NavLink>
             <select
               aria-label="language"
               value={language}
               onChange={(e) => setLanguage(e.target.value as typeof language)}
               className="bg-white/5 border border-white/10 text-sm text-white rounded-md px-2 py-1 focus:outline-none focus:border-neon-blue"
             >
               <option value="uz">UZ</option>
               <option value="en">EN</option>
               <option value="ru">RU</option>
             </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="mt-20 py-8 border-t border-white/5 text-center text-slate-600 text-sm font-mono">
      <p>{t('footer.company')}</p>
      <p className="mt-2">{t('footer.location')}</p>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans text-white selection:bg-neon-pink selection:text-white">
        <Navigation />
        
        <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 relative">
           {/* Decorative background blobs */}
           <div className="fixed top-20 left-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
           <div className="fixed bottom-20 right-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
           
           <Routes>
             <Route path="/" element={<LandingPage />} />
             <Route path="/submit" element={<SubmitPage />} />
             <Route path="/launch" element={<LaunchPage />} />
           </Routes>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
