import React from 'react';

export default function BackgroundDecoration() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">

            {/* 1. Sol Üst - Minimal Sarmaşık (Trailing Vine) */}
            <svg
                className="absolute -top-12 -left-12 w-64 h-80 md:w-96 md:h-[30rem] text-slate-200 dark:text-white/5 opacity-40 dark:opacity-80 transform -rotate-12"
                viewBox="0 0 100 150"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Ana Gövde */}
                <path d="M30 0 C 30 40, 10 70, 40 110 C 50 130, 40 145, 45 150"
                    stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" />

                {/* Minimal Yapraklar */}
                <path d="M31 35 Q 45 30 42 45 Q 35 48 31 35" />
                <path d="M18 65 Q 5 60 8 75 Q 15 78 18 65" />
                <path d="M36 95 Q 50 90 48 105 Q 40 108 36 95" />
                <path d="M25 120 Q 15 125 20 135 Q 30 135 25 120" />
            </svg>

            {/* 2. Sağ Üst - Sadeleşmiş Yaprak Grupları */}
            <svg
                className="absolute -top-16 -right-16 w-72 h-72 md:w-[28rem] md:h-[28rem] text-slate-200 dark:text-white/5 opacity-30 dark:opacity-70"
                viewBox="0 0 120 120"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Büyük yaprak formu */}
                <path d="M120 0 Q 80 10 60 60 Q 100 80 120 20 Z" opacity="0.6" />
                {/* İnce yaprak formu */}
                <path d="M120 0 Q 40 20 20 80 Q 70 90 120 40 Z" opacity="0.4" />
                {/* Küçük detay */}
                <path d="M120 0 Q 90 50 50 90 Q 70 110 120 70 Z" opacity="0.2" />
            </svg>

            {/* 3. Sağ Alt - Modern Dağ ve Minimal Bitki */}
            <svg
                className="absolute -bottom-10 -right-10 w-80 h-80 md:w-[35rem] md:h-[35rem] text-slate-100 dark:text-white/5 opacity-50 dark:opacity-90"
                viewBox="0 0 150 150"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Arka plan tepe/dağ formu */}
                <path d="M150 150 L 50 150 Q 80 100 110 110 Q 130 80 150 100 Z" opacity="0.3" />
                {/* Önde duran basit dal */}
                <path d="M120 150 Q 110 110 130 80" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="130" cy="80" r="3" />
                <circle cx="118" cy="115" r="2" opacity="0.6" />
            </svg>

            {/* 4. Sol Alt - Yükselen Yapraklar (Fern Style) */}
            <svg
                className="absolute -bottom-12 -left-8 w-64 h-64 md:w-96 md:h-96 text-slate-100 dark:text-white/5 opacity-40 dark:opacity-80"
                viewBox="0 0 100 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g transform="rotate(-15 50 50)">
                    {/* Ana sap */}
                    <path d="M20 100 Q 30 50 50 20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    {/* Karşılıklı basit yapraklar */}
                    <ellipse cx="28" cy="85" rx="6" ry="3" transform="rotate(-30 28 85)" />
                    <ellipse cx="42" cy="75" rx="6" ry="3" transform="rotate(-30 42 75)" />
                    <ellipse cx="52" cy="60" rx="5" ry="2.5" transform="rotate(-30 52 60)" />

                    <ellipse cx="18" cy="70" rx="6" ry="3" transform="rotate(30 18 70)" />
                    <ellipse cx="28" cy="55" rx="5" ry="2.5" transform="rotate(30 28 55)" />
                </g>
            </svg>
        </div>
    );
}