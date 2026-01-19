import React from 'react';
import { FileText, Image, FileSpreadsheet, File, Presentation, CheckCircle, AlertCircle, Loader2, Download, Trash2, ChevronRight, FileAudio, FileVideo } from 'lucide-react';
import { saveAs } from 'file-saver';

export default function FileItem({ fileData, onRemove, onSelect, isSelected }) {
    const { originalFile, status, uploadProgress = 0, error, cleanedBlob, cleanedName } = fileData;

    const getSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getIcon = () => {
        const type = originalFile.type.toLowerCase();
        const name = originalFile.name.toLowerCase();

        // Images - Using Image icon with emerald color (vibrant in both themes)
        if (type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|bmp|svg|ico|tiff|heic|avif)$/.test(name)) {
            return <Image className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
        }

        // PDF - Using FileText icon with red color (standard document icon)
        if (type === 'application/pdf' || name.endsWith('.pdf')) {
            return <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />;
        }

        // Excel / Spreadsheets - Using green (traditional Excel color)
        if (type.includes('spreadsheet') || type.includes('excel') || /\.(xlsx|xls|csv|ods)$/.test(name)) {
            return <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />;
        }

        // Word / Documents - Using blue (traditional Word color)
        if (type.includes('word') || /\.(docx|doc|odt)$/.test(name)) {
            return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
        }

        // Plain text files - Using slate for neutral appearance
        if (/\.(txt|rtf|md|markdown)$/.test(name)) {
            return <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />;
        }

        // PowerPoint / Presentations - Using amber/orange (traditional PowerPoint color)
        if (type.includes('presentation') || type.includes('powerpoint') || /\.(pptx|ppt|odp)$/.test(name)) {
            return <Presentation className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
        }

        // Audio - Using purple (distinct from other types)
        if (type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|flac|aac|wma)$/.test(name)) {
            return <FileAudio className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
        }

        // Video - Using rose/pink (vibrant and distinct)
        if (type.startsWith('video/') || /\.(mp4|mov|avi|mkv|webm|wmv|flv)$/.test(name)) {
            return <FileVideo className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
        }

        // Default - Generic file icon with neutral color
        return <File className="w-5 h-5 text-slate-500 dark:text-slate-400" />;
    };

    const handleDownload = (e) => {
        e.stopPropagation();
        if (cleanedBlob) {
            saveAs(cleanedBlob, cleanedName);
        }
    };

    return (
        <div
            onClick={() => onSelect(fileData.id)}
            className={`
                relative px-4 py-5 md:px-6 md:py-5 flex items-center gap-6 cursor-pointer transition-colors group overflow-hidden
                ${isSelected ? 'bg-indigo-50/60 dark:bg-indigo-900/40' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}
            `}
        >
            {/* Upload Progress Bar (background) */}
            {status === 'uploading' && (
                <div
                    className="absolute inset-y-0 left-0 bg-indigo-100 dark:bg-indigo-900/50 transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                />
            )}
            {/* File Icon with Progress Overlay */}
            <div className="relative flex-shrink-0 z-10">
                <div className={`transition-opacity ${status === 'processing' ? 'opacity-40' : 'opacity-80 group-hover:opacity-100'}`}>
                    {getIcon()}
                </div>
                {status === 'processing' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    </div>
                )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 z-10">
                <span className={`text-sm font-medium truncate ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                    {originalFile.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    {getSize(originalFile.size)}
                </span>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-2 md:gap-3 z-10">
                {status === 'done' && <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
                {status === 'error' && <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400" title={error} />}

                {/* Vertical Divider (Hidden on mobile) */}
                <div className="hidden md:block w-px h-8 bg-slate-100 dark:bg-slate-700 mx-1"></div>

                {status === 'done' && (
                    <button
                        onClick={handleDownload}
                        className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        title="Download Cleaned File"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                )}

                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(fileData.id); }}
                    className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Remove File"
                >
                    <Trash2 className="w-4 h-4" />
                </button>

                {/* Expand Chevron Hint */}
                <div className={`transition-transform duration-200 ${isSelected ? 'rotate-90 text-indigo-500' : 'text-slate-300'}`}>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
