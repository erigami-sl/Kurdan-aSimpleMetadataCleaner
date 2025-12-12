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
        <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 p-6 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                        {t('home.metadataViewer.title')}
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                {isEmpty ? (
                    <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                        {t('home.metadataViewer.noMetadata')}
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                            <tr>
                                <th className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 w-1/3">{t('home.metadataViewer.property')}</th>
                                <th className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">{t('home.metadataViewer.value')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {Object.entries(metadata).map(([key, value]) => (
                                <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                    <td className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">{key}</td>
                                    <td className="px-4 py-2 text-slate-800 dark:text-slate-200 break-all font-mono text-xs">
                                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
                {t('home.metadataViewer.warning')}
            </div>
        </div>
    );
}
