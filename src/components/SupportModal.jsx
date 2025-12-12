import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function SupportModal({ isOpen, onClose }) {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-sm w-full p-6 relative border border-slate-200 dark:border-slate-700"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <AlertCircle className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('home.serviceUnavailable')}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t('home.serviceUnavailableMsg')}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 font-medium transition-colors"
                    >
                        {t('home.gotIt')}
                    </button>
                </div>
            </div>
        </div>
    );
}
