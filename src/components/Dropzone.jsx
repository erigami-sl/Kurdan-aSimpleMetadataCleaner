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
    // If Forced Active: Apply hover styles manually
    const isActive = isDragActive || forceActive;

    return (
        <div
            className={`
                relative group rounded-xl border-2 border-dashed transition-all duration-200 ease-out cursor-pointer
                flex flex-col items-center justify-center py-8 px-4 md:py-12 md:px-6
                ${isDragActive
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400 shadow-none scale-[0.99]'
                    : forceActive
                        ? 'border-indigo-400 dark:border-indigo-500 bg-white dark:bg-slate-800 shadow-none animate-none'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-slate-800 animate-box-glow-pulse hover:animate-none hover:shadow-none transition-shadow'
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

            <div className={`p-4 rounded-full mb-4 transition-colors ${isDragActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20'}`}>
                <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
                {isDragActive ? t('home.dropzoneTitle') : t('home.dropzoneTitle')}
            </h3>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 text-center max-w-sm">
                {t('home.dropzoneNote')}
            </p>

            <button className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {t('home.dropzoneSubtitle')}
            </button>
        </div>
    );
}
