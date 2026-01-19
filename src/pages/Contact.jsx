import React from 'react';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t('contact.title')}</h1>
                <p className="text-slate-600 dark:text-slate-300">
                    {t('contact.desc')}
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow max-w-md mx-auto">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 mx-auto">
                    <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 text-center">{t('contact.feedbackContact')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
                    {t('contact.emailDesc')}
                </p>
                <div className="space-y-3">
                    <a
                        href="mailto:contact@kurdancleaner.com"
                        className="block text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline bg-indigo-50 dark:bg-indigo-900/20 py-3 px-4 rounded-lg transition-colors"
                    >
                        contact@kurdancleaner.com
                    </a>
                </div>
            </div>
        </div>
    );
}
