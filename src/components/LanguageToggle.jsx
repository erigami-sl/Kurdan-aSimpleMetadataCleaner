import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] text-muted-500 dark:text-muted-400 hover:bg-cream-300 dark:hover:bg-[var(--color-dark-border)] transition-colors"
            title="Toggle Language / Dili Değiştir"
        >
            <span className={`text-xs font-bold leading-none ${i18n.language === 'tr' ? 'text-sage-600 dark:text-sage-400' : 'text-muted-400 dark:text-muted-500'}`}>TR</span>
            <span className="text-cream-400 dark:text-[var(--color-dark-border)] text-[10px] leading-none select-none">|</span>
            <span className={`text-xs font-bold leading-none ${i18n.language === 'en' ? 'text-sage-600 dark:text-sage-400' : 'text-muted-400 dark:text-muted-500'}`}>EN</span>
        </button>
    );
}
