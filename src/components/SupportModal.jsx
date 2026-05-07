import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SupportModal({ isOpen, onClose }) {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-cream-50 dark:bg-[var(--color-dark-card)] rounded-[var(--radius-lg)] shadow-organic-lg max-w-sm w-full p-8 relative border border-cream-300 dark:border-[var(--color-dark-border)]"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-muted-400 hover:text-ink-700 dark:hover:text-cream-50 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-cream-200 dark:bg-[var(--color-dark-border)] flex items-center justify-center text-ink-700 dark:text-cream-50">
                        <AlertCircle className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-serif text-2xl font-medium text-ink-900 dark:text-cream-50">{t('home.serviceUnavailable')}</h3>
                        <p className="text-sm text-muted-500 dark:text-muted-400 leading-relaxed">
                            {t('home.serviceUnavailableMsg')}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-4 w-full bg-ink-900 hover:bg-ink-800 text-cream-50 dark:bg-sage-600 dark:hover:bg-sage-500 rounded-2xl py-3 font-medium transition-colors"
                    >
                        {t('home.gotIt')}
                    </button>
                </div>
            </div>
        </div>
    );
}
