import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import License from './pages/License';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SupportModal from './components/SupportModal';
import LanguageToggle from './components/LanguageToggle';
import { useTranslation } from 'react-i18next';

export default function App() {
  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-6 px-4 font-sans transition-colors duration-200">
      <div className="max-w-[800px] w-full mx-auto space-y-8 flex-1">

        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div className="flex flex-col">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('app.title')}</h1>
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t('app.subtitle')}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="group flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-lg transition-colors text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20"
              title={t('app.supportMe')}
            >
              <Heart className="w-5 h-5 sm:w-4 sm:h-4 group-hover:fill-current" />
              <span className="hidden sm:inline text-sm font-medium">{t('app.supportMe')}</span>
            </button>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </header>

        {/* Main Content (Routes) */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/license" element={<License />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

      </div>
      <Footer />
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
