import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MetadataViewer({ fileData, onClose }) {
    const { t } = useTranslation();

    // Safety check
    if (!fileData) return null;

    const { metadata } = fileData;
    const keys = metadata ? Object.keys(metadata) : [];
    const isEmpty = keys.length === 0;

    return (
        <div className="bg-cream-100 dark:bg-[var(--color-dark-card)] border-t border-cream-300 dark:border-[var(--color-dark-border)] p-8 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                    <h3 className="font-serif text-xl font-medium text-ink-900 dark:text-cream-50">
                        {t('home.metadataViewer.title')}
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-cream-200 dark:hover:bg-[var(--color-dark-border)] text-muted-400 dark:text-muted-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-white dark:bg-[var(--color-dark-bg)] rounded-[var(--radius-md)] border border-cream-300 dark:border-[var(--color-dark-border)] overflow-hidden shadow-card">
                {isEmpty ? (
                    <div className="p-8 text-center text-muted-400 dark:text-muted-500 text-sm">
                        {t('home.metadataViewer.noMetadata')}
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-cream-50 dark:bg-[var(--color-dark-card)] text-muted-500 dark:text-muted-400 font-medium">
                            <tr>
                                <th className="px-4 py-3 border-b border-cream-300 dark:border-[var(--color-dark-border)] w-1/3">{t('home.metadataViewer.property')}</th>
                                <th className="px-4 py-3 border-b border-cream-300 dark:border-[var(--color-dark-border)]">{t('home.metadataViewer.value')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-200 dark:divide-[var(--color-dark-border)]">
                            {Object.entries(metadata).map(([key, value]) => (
                                <tr key={key} className="hover:bg-cream-50/50 dark:hover:bg-[var(--color-dark-card)] transition-colors">
                                    <td className="px-4 py-3 text-ink-800 dark:text-cream-100 font-medium">{key}</td>
                                    <td className="px-4 py-3 text-ink-900 dark:text-cream-50 break-all font-mono text-xs opacity-90">
                                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-5 text-xs text-muted-400 dark:text-muted-500 text-center font-medium">
                {t('home.metadataViewer.warning')}
            </div>
        </div>
    );
}
