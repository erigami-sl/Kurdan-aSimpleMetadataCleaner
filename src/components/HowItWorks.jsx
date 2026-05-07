import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloudUpload, Sparkles, Download } from 'lucide-react';

export default function HowItWorks() {
    const { t } = useTranslation();

    return (
        <section className="w-full flex flex-col items-center text-center mb-24 relative">
            {/* Pill Label */}
            <div className="inline-flex items-center justify-center bg-cream-100 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] rounded-full px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-ink-700 dark:text-cream-50 mb-6">
                {t('app.howItWorks')}
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink-900 dark:text-cream-50 mb-16 font-medium">
                {t('app.howItWorksTitle')}
            </h2>

            {/* Steps Container */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                
                {/* Connecting Lines (Desktop only) */}
                <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-px bg-cream-300 dark:bg-[var(--color-dark-border)] -z-10" />

                {/* Step 1 */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] flex items-center justify-center text-ink-700 dark:text-cream-50 shadow-sm mb-6 bg-gradient-to-br from-white to-transparent dark:from-white/5">
                        <CloudUpload className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-ink-900 dark:text-cream-50 text-lg mb-2">{t('app.step1Title')}</h3>
                    <p className="text-sm text-muted-500 dark:text-muted-400 max-w-[200px] leading-relaxed">{t('app.step1Desc')}</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] flex items-center justify-center text-ink-700 dark:text-cream-50 shadow-sm mb-6 bg-gradient-to-br from-white to-transparent dark:from-white/5">
                        <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-ink-900 dark:text-cream-50 text-lg mb-2">{t('app.step2Title')}</h3>
                    <p className="text-sm text-muted-500 dark:text-muted-400 max-w-[200px] leading-relaxed">{t('app.step2Desc')}</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] flex items-center justify-center text-ink-700 dark:text-cream-50 shadow-sm mb-6 bg-gradient-to-br from-white to-transparent dark:from-white/5">
                        <Download className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-ink-900 dark:text-cream-50 text-lg mb-2">{t('app.step3Title')}</h3>
                    <p className="text-sm text-muted-500 dark:text-muted-400 max-w-[200px] leading-relaxed">{t('app.step3Desc')}</p>
                </div>

            </div>
        </section>
    );
}
