import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto">
            {/* Divider */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20">
                <div className="h-px bg-cream-300 dark:bg-[var(--color-dark-border)] w-full" />
            </div>

            {/* 3-Column Grid */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

                    {/* Column 1: Logo + Description + Social */}
                    <div className="space-y-5">
                        <div>
                            <h3 className="font-serif text-xl font-medium italic text-ink-700 dark:text-cream-50">
                                🌿 {t('app.title')}
                            </h3>
                            <p className="text-sm text-muted-500 dark:text-muted-400 mt-2 leading-relaxed max-w-[280px]">
                                {t('footer.description')}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] flex items-center justify-center text-muted-500 hover:text-sage-600 hover:bg-cream-300 dark:hover:bg-[var(--color-dark-border)] transition-colors"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] flex items-center justify-center text-muted-500 hover:text-sage-600 hover:bg-cream-300 dark:hover:bg-[var(--color-dark-border)] transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:contact@kurdancleaner.com"
                                className="w-9 h-9 rounded-full bg-cream-200 dark:bg-[var(--color-dark-card)] flex items-center justify-center text-muted-500 hover:text-sage-600 hover:bg-cream-300 dark:hover:bg-[var(--color-dark-border)] transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Useful Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-700 dark:text-cream-50">
                            {t('footer.usefulLinks')}
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            <Link
                                to="/privacy"
                                className="text-sm text-muted-500 dark:text-muted-400 hover:text-sage-600 dark:hover:text-sage-400 transition-colors"
                            >
                                {t('footer.privacy')}
                            </Link>
                            <Link
                                to="/terms"
                                className="text-sm text-muted-500 dark:text-muted-400 hover:text-sage-600 dark:hover:text-sage-400 transition-colors"
                            >
                                {t('footer.terms')}
                            </Link>
                            <Link
                                to="/license"
                                className="text-sm text-muted-500 dark:text-muted-400 hover:text-sage-600 dark:hover:text-sage-400 transition-colors"
                            >
                                {t('footer.license')}
                            </Link>
                            <Link
                                to="/contact"
                                className="text-sm text-muted-500 dark:text-muted-400 hover:text-sage-600 dark:hover:text-sage-400 transition-colors"
                            >
                                {t('footer.contact')}
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Privacy Info Card */}
                    <div>
                        <div className="bg-cream-100 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] rounded-[var(--radius-md)] p-5">
                            <h4 className="text-sm font-semibold text-ink-700 dark:text-cream-50 mb-2">
                                {t('footer.privacyCardTitle')}
                            </h4>
                            <p className="text-xs text-muted-500 dark:text-muted-400 leading-relaxed">
                                {t('footer.privacyCardDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 pb-8">
                <div className="text-center text-xs text-muted-400 dark:text-muted-500 font-medium">
                    &copy; {currentYear} {t('app.title')}. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
}
