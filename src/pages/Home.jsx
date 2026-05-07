import React, { useState, useCallback, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ShieldCheck, Zap, EyeOff, Download, Trash2, CloudUpload, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Dropzone from '../components/Dropzone';
import FileItem from '../components/FileItem';
import MetadataViewer from '../components/MetadataViewer';
import StatsCard from '../components/StatsCard';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [globalStats, setGlobalStats] = useState({ total: 0, cleaned: 0 });
    const [globalTotalCleaned, setGlobalTotalCleaned] = useState(0);
    const [isInteractionActive, setIsInteractionActive] = useState(false);

    // Fetch global stats on mount and poll every 10 seconds
    const fetchStats = useCallback(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => setGlobalTotalCleaned(data.totalCleaned || 0))
            .catch(() => { });
    }, []);

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 10000); // 10 seconds
        return () => clearInterval(interval);
    }, [fetchStats]);

    const handleFilesAdded = useCallback(async (newFiles) => {
        // Optimistic UI updates
        const newEntries = newFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9), // Temp ID until server responds
            originalFile: file,
            status: 'uploading', // Initial status
            uploadProgress: 0, // Upload progress percentage
            error: null,
            cleanedBlob: null,
            cleanedName: file.name.replace(/(\.[\w\d]+)$/, '_cleaned$1'),
            metadata: null,
            serverId: null // To store ID from server
        }));

        setFiles(prev => [...prev, ...newEntries]);

        // Upload each file with progress tracking
        newEntries.forEach((entry) => {
            const formData = new FormData();
            formData.append('file', entry.originalFile);

            const xhr = new XMLHttpRequest();

            // Progress event
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    setFiles(prev => prev.map(f =>
                        f.id === entry.id ? { ...f, uploadProgress: percent } : f
                    ));
                }
            });

            // Load complete
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        setFiles(prev => prev.map(f =>
                            f.id === entry.id ? {
                                ...f,
                                status: 'pending',
                                uploadProgress: 100,
                                metadata: data.metadata,
                                serverId: data.id
                            } : f
                        ));
                    } catch (e) {
                        setFiles(prev => prev.map(f =>
                            f.id === entry.id ? { ...f, status: 'error', error: 'Parse Error' } : f
                        ));
                    }
                } else {
                    setFiles(prev => prev.map(f =>
                        f.id === entry.id ? { ...f, status: 'error', error: 'Upload Failed' } : f
                    ));
                }
            });

            // Error event
            xhr.addEventListener('error', () => {
                setFiles(prev => prev.map(f =>
                    f.id === entry.id ? { ...f, status: 'error', error: 'Network Error' } : f
                ));
            });

            xhr.open('POST', '/api/upload');
            xhr.send(formData);
        });
    }, []);

    // Keyboard Shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // Delete Key: Remove selected file
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedFileId) {
                handleRemoveFile(selectedFileId);
            }

            // Paste (Ctrl+V): Handle file paste
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                navigator.clipboard.read().then(async items => {
                    const pastedFiles = [];
                    for (const item of items) {
                        // We can only reliably get images from clipboard API usually
                        // But standard file paste might not be fully exposed via this API in all browsers without permission
                        // Simpler fallback: listen to 'paste' event on window
                    }
                }).catch(err => {
                    // fall back to window event listener logic below if needed
                });
            }
        };

        const handlePaste = (e) => {
            if (e.clipboardData && e.clipboardData.files.length > 0) {
                e.preventDefault(); // Prevent pasting into inputs if focused? Maybe check target.
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    handleFilesAdded(Array.from(e.clipboardData.files));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('paste', handlePaste);
        };
    }, [selectedFileId, handleFilesAdded]);

    const handleRemoveFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
        if (selectedFileId === id) setSelectedFileId(null);
    };

    const handleSelectFile = (id) => {
        setSelectedFileId(prev => prev === id ? null : id);
    };

    const clearAll = () => {
        setFiles([]);
        setSelectedFileId(null);
        setGlobalStats({ total: 0, cleaned: 0 });
    };

    const processAll = async () => {
        setIsProcessing(true);
        let cleanedCount = 0;

        const validFiles = files.filter(f => f.status !== 'done' && f.status !== 'error' && f.serverId);

        // Update status to processing
        setFiles(prev => prev.map(f => validFiles.find(vf => vf.id === f.id) ? { ...f, status: 'processing' } : f));

        await Promise.all(validFiles.map(async (fileData) => {
            try {
                const res = await fetch(`/api/clean/${fileData.serverId}`);

                if (!res.ok) throw new Error("Cleaning failed");

                const blob = await res.blob();

                // --- Filename Extraction Logic ---
                let finalName = fileData.originalFile ? fileData.originalFile.name : "cleaned_file";

                try {
                    const disposition = res.headers.get('Content-Disposition') || res.headers.get('content-disposition');

                    if (disposition) {
                        const filenameMatch = disposition.match(/filename\*?=['"]?([^;\r\n"']*)['"]?/i);
                        if (filenameMatch && filenameMatch[1]) {
                            const extracted = decodeURIComponent(filenameMatch[1].replace(/UTF-8''/i, ''));
                            if (extracted && extracted.trim().length > 0) {
                                finalName = extracted;
                            }
                        }
                    }
                } catch (e) {
                    // Filename parsing failed silently
                }

                // Fallback: If header failed and we have serverId (uuid-filename), try that
                if (finalName === "cleaned_file" && fileData.serverId && fileData.serverId.length > 37) {
                    finalName = fileData.serverId.substring(37);
                }

                setFiles(prev => prev.map(f =>
                    f.id === fileData.id
                        ? { ...f, status: 'done', cleanedBlob: blob, cleanedName: finalName, error: null, metadata: {} }
                        : f
                ));
                cleanedCount++;
            } catch (err) {
                setFiles(prev => prev.map(f =>
                    f.id === fileData.id
                        ? { ...f, status: 'error', error: "Cleaning Failed" }
                        : f
                ));
            }
        }));

        setGlobalStats(prev => ({ ...prev, cleaned: prev.cleaned + cleanedCount }));
        setGlobalTotalCleaned(prev => prev + cleanedCount); // Optimistic update
        setIsProcessing(false);
    };

    const downloadAll = async () => {
        const doneFiles = files.filter(f => f.status === 'done' && f.cleanedBlob);
        if (doneFiles.length === 0) return;

        if (doneFiles.length === 1) {
            saveAs(doneFiles[0].cleanedBlob, doneFiles[0].cleanedName);
            return;
        }

        const zip = new JSZip();
        doneFiles.forEach(f => {
            zip.file(f.cleanedName, f.cleanedBlob);
        });

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "cleaned_files.zip");
    };

    const doneCount = files.filter(f => f.status === 'done').length;
    const pendingCount = files.filter(f => f.status === 'pending').length; // Ready to clean
    const uploadingCount = files.filter(f => f.status === 'uploading').length;
    const selectedFileData = files.find(f => f.id === selectedFileId);

    return (
        <>
            {/* 1. Hero Section (2-Column) */}
            <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mb-20 relative">
                
                {/* Atmospheric Depth (No heavy blur) */}
                <div className="absolute top-0 left-0 w-full h-[800px] bg-atmosphere-sage pointer-events-none -z-10" />

                {/* Left Column: Editorial Messaging */}
                <div className="flex-1 max-w-xl w-full">
                    {/* Feature Pills (Moved to top) */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-up-editorial delay-40 will-change-transform contain-paint">
                        <div className="inline-flex items-center gap-1.5 bg-cream-200/60 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] rounded-full px-3 py-1 text-xs font-medium text-ink-700 dark:text-cream-100 shadow-sm">
                            <EyeOff className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                            {t('app.noLogs')}
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-cream-200/60 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] rounded-full px-3 py-1 text-xs font-medium text-ink-700 dark:text-cream-100 shadow-sm">
                            <Zap className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                            {t('app.fastProcessing')}
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-cream-200/60 dark:bg-[var(--color-dark-card)] border border-cream-300 dark:border-[var(--color-dark-border)] rounded-full px-3 py-1 text-xs font-medium text-ink-700 dark:text-cream-100 shadow-sm">
                            <CloudUpload className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                            {t('app.cloudPowered')}
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-ink-900 dark:text-cream-50 mb-6 tracking-tight animate-fade-up-editorial delay-80 will-change-transform contain-paint">
                        {t('app.heroHeadlineLine1')} <br />
                        {t('app.heroHeadlineLine2')}
                        <span className="text-sage-600 dark:text-sage-400 italic font-medium">{t('app.heroHeadlineMatters')}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-muted-500 dark:text-muted-400 leading-relaxed mb-12 max-w-[480px] animate-fade-up-editorial delay-120 will-change-transform contain-paint">
                        {t('app.heroDesc')}
                    </p>


                </div>

                {/* Right Column: Upload Card */}
                <div className="flex-1 w-full flex justify-center lg:justify-end relative animate-fade-up-editorial delay-160 will-change-transform">
                    {/* Botanical Leaf Decoration */}
                    <img src="/botanical_leaf_remomved.png" alt="" className="absolute -right-16 top-[-100px] md:-right-32 md:top-[-150px] w-[500px] h-[800px] object-cover opacity-30 dark:opacity-10 pointer-events-none -z-20" />

                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-atmosphere-glow pointer-events-none -z-10" />
                    
                    <Dropzone
                        onFilesAdded={handleFilesAdded}
                        onHoverChange={setIsInteractionActive}
                        forceActive={isInteractionActive}
                    />
                </div>
            </section>

            {/* 2. File List Box & Actions */}
            {files.length > 0 && (
                <section className="bg-cream-50 dark:bg-[var(--color-dark-bg)] rounded-[var(--radius-md)] shadow-organic border border-cream-300 dark:border-[var(--color-dark-border)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20 -mt-10 relative z-10">
                    <div className="p-5 border-b border-cream-300 dark:border-[var(--color-dark-border)] flex items-center justify-between bg-cream-100 dark:bg-[var(--color-dark-card)]">
                        <div>
                            <h2 className="font-semibold text-ink-900 dark:text-cream-50 text-sm uppercase tracking-wider">{t('home.fileQueue')} ({files.length})</h2>
                            <p className="text-xs text-muted-500 dark:text-muted-400 mt-1">{t('home.clickToViewMetadata')}</p>
                        </div>
                        {doneCount > 0 && (
                            <span className="text-xs font-medium text-sage-600 bg-sage-200 dark:text-sage-300 dark:bg-sage-900/50 px-3 py-1 rounded-full">
                                {doneCount} {t('home.cleaned')}
                            </span>
                        )}
                    </div>

                    <div className="divide-y divide-cream-300 dark:divide-[var(--color-dark-border)] max-h-[400px] overflow-y-auto custom-scrollbar">
                        {files.map(file => (
                            <FileItem
                                key={file.id}
                                fileData={file}
                                onRemove={handleRemoveFile}
                                onSelect={handleSelectFile}
                                isSelected={file.id === selectedFileId}
                            />
                        ))}
                    </div>

                    {/* Metadata Viewer (Expandable between List and Action Area) */}
                    <div className="overflow-hidden">
                        {selectedFileId && selectedFileData && (
                            <MetadataViewer
                                fileData={selectedFileData}
                                onClose={() => setSelectedFileId(null)}
                            />
                        )}
                    </div>

                    {/* Action Area (Bottom Right) */}
                    <div className="bg-cream-100 dark:bg-[var(--color-dark-card)] p-5 border-t border-cream-300 dark:border-[var(--color-dark-border)] flex items-center justify-end gap-4">
                        <button
                            onClick={clearAll}
                            className="text-sm text-muted-500 dark:text-muted-400 hover:text-red-600 dark:hover:text-red-400 font-medium px-4 py-2 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            {t('home.clearQueue')}
                        </button>

                        {/* Success State / Download Button */}
                        {doneCount > 0 && doneCount === files.length ? (
                            <button
                                onClick={downloadAll}
                                className="bg-sage-600 hover:bg-sage-700 text-white dark:bg-sage-500 dark:hover:bg-sage-400 dark:text-ink-900 px-6 py-2.5 rounded-2xl font-medium shadow-sm transition-all flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                {t('home.downloadAll')} ({doneCount})
                            </button>
                        ) : (
                            /* Clean Button */
                            <button
                                onClick={processAll}
                                disabled={isProcessing || pendingCount === 0 || uploadingCount > 0}
                                className={`
                  bg-ink-900 hover:bg-ink-800 text-cream-50 dark:bg-ink-800 dark:hover:bg-ink-700 px-6 py-2.5 rounded-2xl font-medium shadow-sm transition-all flex items-center gap-2
                  ${(isProcessing || pendingCount === 0 || uploadingCount > 0) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                            >
                                {isProcessing ? <Zap className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                {uploadingCount > 0 ? t('home.uploading') : (isProcessing ? t('home.processing') : t('home.removeMetadata'))}
                            </button>
                        )}
                    </div>
                </section>
            )}

            {/* 3. Stats & How It Works */}
            <StatsCard totalCleaned={globalTotalCleaned} />
            <HowItWorks />
        </>
    );
}
