import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Terms() {
    const { t } = useTranslation();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t('terms.title')}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{t('terms.lastUpdated')}</p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('terms.intro')}
            </p>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section1Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section1Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section2Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section2Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section3Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section3Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section4Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section4Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section5Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section5Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section6Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section6Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section7Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section7Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section8Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section8Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section9Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section9Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section10Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section10Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('terms.section11Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('terms.section11Desc')}
                </p>
            </section>
        </div>
    );
}
