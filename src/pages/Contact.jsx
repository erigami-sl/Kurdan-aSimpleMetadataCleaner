import React from 'react';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <div className="max-w-2xl mx-auto space-y-12 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-serif text-ink-900 dark:text-cream-50 font-medium">{t('contact.title')}</h1>
                <p className="text-muted-600 dark:text-muted-300 text-lg max-w-lg mx-auto">
                    {t('contact.desc')}
                </p>
            </div>

            <div className="bg-white dark:bg-[var(--color-dark-card)] p-10 rounded-[var(--radius-lg)] border border-cream-300 dark:border-[var(--color-dark-border)] shadow-organic max-w-md mx-auto">
                <div className="w-16 h-16 bg-cream-200 dark:bg-[var(--color-dark-border)] rounded-full flex items-center justify-center mb-6 text-sage-600 dark:text-sage-400 mx-auto">
                    <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-medium text-ink-900 dark:text-cream-50 mb-3 text-center">{t('contact.feedbackContact')}</h3>
                <p className="text-sm text-muted-500 dark:text-muted-400 mb-8 text-center leading-relaxed">
                    {t('contact.emailDesc')}
                </p>
                <div className="space-y-3">
                    <a
                        href="mailto:contact@kurdancleaner.com"
                        className="block text-center text-sm font-medium text-ink-900 dark:text-cream-50 hover:bg-sage-600 hover:text-white dark:hover:bg-sage-500 dark:hover:text-ink-900 bg-cream-200 dark:bg-[var(--color-dark-border)] py-3.5 px-4 rounded-2xl transition-colors shadow-sm"
                    >
                        contact@kurdancleaner.com
                    </a>
                </div>
            </div>
        </div>
    );
}
