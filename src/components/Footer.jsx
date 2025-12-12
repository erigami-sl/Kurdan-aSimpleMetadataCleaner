import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 pb-8 text-sm text-slate-500 dark:text-slate-400">
            {/* Divider Line (Constrained to content width) */}
            <div className="max-w-[800px] mx-auto px-4">
                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full mb-8"></div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 flex flex-col gap-8">

                {/* Links Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left Group */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                        <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{t('footer.privacy')}</Link>
                        <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{t('footer.terms')}</Link>
                        <Link to="/license" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{t('footer.license')}</Link>
                    </div>

                    {/* Right Group */}
                    <div className="flex gap-6">
                        <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{t('footer.contact')}</Link>
                    </div>
                </div>

                {/* Bottom Center: Copyright */}
                <div className="text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
                    &copy; {currentYear} Kürdan. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
}
