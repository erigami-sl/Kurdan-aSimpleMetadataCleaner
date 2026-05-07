import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function StatsCard({ totalCleaned }) {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-white dark:bg-[var(--color-dark-card)] rounded-[var(--radius-lg)] dropzone-editorial p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 z-10 relative animate-fade-up-scroll delay-80 will-change-transform contain-paint">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-cream-200 dark:bg-[var(--color-dark-border)] flex items-center justify-center text-sage-600 dark:text-sage-400">
                    <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                    <div className="font-serif text-4xl text-ink-900 dark:text-cream-50 font-medium mb-1 transition-colors flex items-center gap-3">
                        {totalCleaned.toLocaleString()}
                        <div className="w-2 h-2 rounded-full bg-sage-500/80 animate-pulse-slow"></div>
                    </div>
                    <div className="text-muted-500 dark:text-muted-400 text-sm transition-colors">
                        {t('home.globalStatsSuffix')}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Generated Avatar Group Image */}
                <img src="/avatar_group.png" alt="Trusted by users" className="h-[48px] rounded-full object-cover shadow-sm mix-blend-multiply dark:mix-blend-lighten" />
                <div className="text-sm font-medium text-muted-500 dark:text-muted-400 max-w-[150px] leading-snug">
                    {t('app.statsTrustedBy')}
                </div>
            </div>
        </div>
    );
}
