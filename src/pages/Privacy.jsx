import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Privacy() {
    const { t } = useTranslation();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t('privacy.title')}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{t('privacy.lastUpdated')}</p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('privacy.intro')}
            </p>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section1Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section1Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section2Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section2Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section3Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section3Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section4Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section4Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section5Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section5Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section6Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section6Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section7Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section7Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section8Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section8Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section9Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section9Desc')}
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{t('privacy.section10Title')}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('privacy.section10Desc')}
                </p>
            </section>
        </div>
    );
}
