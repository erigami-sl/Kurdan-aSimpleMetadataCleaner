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
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-[var(--color-dark-bg)] bg-grain text-ink-700 dark:text-[var(--color-dark-text)] transition-colors duration-300">

      {/* Header */}
      <header className="w-full">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-6 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="font-serif text-2xl md:text-[1.7rem] font-medium italic tracking-wide text-ink-700 dark:text-cream-50">
                {t('app.title')}
              </h1>
            </a>
            <span className="hidden sm:block text-sm text-muted-500 dark:text-muted-400 font-sans">
              {t('app.subtitle')}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="group flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] transition-colors text-muted-500 hover:text-sage-600 hover:bg-cream-200 dark:text-muted-400 dark:hover:bg-[var(--color-dark-card)] dark:hover:text-sage-400"
              title={t('app.supportMe')}
            >
              <Heart className="w-4 h-4 group-hover:fill-current" />
              <span className="hidden sm:inline text-sm font-medium">{t('app.supportMe')}</span>
            </button>
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/license" element={<License />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      <Footer />
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
