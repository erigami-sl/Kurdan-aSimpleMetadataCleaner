import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Dropzone({ onFilesAdded, onHoverChange, forceActive }) {
    const { t } = useTranslation();
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesAdded(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesAdded(Array.from(e.target.files));
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    // Active state logic: Dragging OR Forced Active (from parent hover)
    const isActive = isDragActive || forceActive;

    return (
        <div
            className={`
                relative group transition-all duration-300 ease-out cursor-pointer
                w-full md:w-[520px] aspect-square max-h-[540px]
                rounded-[var(--radius-lg)] bg-white dark:bg-[var(--color-dark-card)]
                flex flex-col items-center justify-center p-8 text-center
                border border-cream-300 dark:border-[var(--color-dark-border)]
                ${isActive 
                    ? 'shadow-organic-lg scale-[1.01] border-sage-300 dark:border-sage-600 ring-4 ring-sage-50 dark:ring-sage-900/30' 
                    : 'shadow-organic hover:shadow-organic-lg hover:-translate-y-1 hover:border-cream-400 dark:hover:border-sage-800'
                }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
            onMouseEnter={() => onHoverChange && onHoverChange(true)}
            onMouseLeave={() => onHoverChange && onHoverChange(false)}
        >
            <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp,audio/mpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={handleChange}
            />

            {/* Premium Icon Container */}
            <div className={`
                w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-colors duration-300
                ${isActive 
                    ? 'bg-sage-100 text-sage-600 dark:bg-sage-900/50 dark:text-sage-300' 
                    : 'bg-cream-100 text-sage-600 dark:bg-[var(--color-dark-border)] dark:text-sage-400 group-hover:bg-cream-200 dark:group-hover:bg-sage-900/30'
                }
            `}>
                <Upload className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <h3 className="font-serif text-3xl text-ink-900 dark:text-cream-50 mb-3 font-medium">
                {t('home.dropzoneTitle')}
            </h3>
            
            <p className="text-muted-500 dark:text-muted-400 text-sm mb-10 leading-relaxed max-w-[280px]">
                {t('home.dropzoneNote')}
            </p>

            <button className="bg-sage-600 hover:bg-sage-700 text-white dark:bg-sage-500 dark:hover:bg-sage-400 dark:text-ink-900 px-8 py-3.5 rounded-2xl text-sm font-medium transition-colors shadow-sm w-[200px]">
                {t('home.dropzoneSubtitle')}
            </button>
            
            {/* Soft decorative background gradient inside card */}
            <div className="absolute inset-0 rounded-[var(--radius-lg)] bg-gradient-to-br from-cream-50/50 to-transparent dark:from-white/5 pointer-events-none" />
        </div>
    );
}
