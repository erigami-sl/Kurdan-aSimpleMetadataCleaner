import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ShieldCheck, Zap, EyeOff, Download, Trash2, CloudUpload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Dropzone from '../components/Dropzone';
import FileItem from '../components/FileItem';
import MetadataViewer from '../components/MetadataViewer';

export default function Home() {
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [globalStats, setGlobalStats] = useState({ total: 0, cleaned: 0 });

    const handleFilesAdded = useCallback(async (newFiles) => {
        // Optimistic UI updates
        const newEntries = newFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9), // Temp ID until server responds
            originalFile: file,
            status: 'uploading', // Initial status
            error: null,
            cleanedBlob: null,
            cleanedName: file.name.replace(/(\.[\w\d]+)$/, '_cleaned$1'),
            metadata: null,
            serverId: null // To store ID from server
        }));

        setFiles(prev => [...prev, ...newEntries]);

        // Upload each file
        newEntries.forEach(async (entry) => {
            const formData = new FormData();
            formData.append('file', entry.originalFile);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error("Upload failed");

                const data = await res.json();

                setFiles(prev => prev.map(f =>
                    f.id === entry.id ? {
                        ...f,
                        status: 'pending',
                        metadata: data.metadata,
                        serverId: data.id
                    } : f
                ));

            } catch (e) {
                setFiles(prev => prev.map(f =>
                    f.id === entry.id ? {
                        ...f,
                        status: 'error',
                        error: "Upload Failed"
                    } : f
                ));
            }
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
            {/* Info features */}
            <div className="flex items-center justify-center gap-6 text-xs font-medium text-slate-400 dark:text-slate-500 mb-8">
                <span className="flex items-center gap-1"><EyeOff className="w-3 h-3" /> {t('app.noLogs')}</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {t('app.fastProcessing')}</span>
                <span className="flex items-center gap-1"><CloudUpload className="w-3 h-3" /> {t('app.cloudPowered')}</span>
            </div>

            {/* 1. Main Upload Area */}
            <section className="w-full">
                <Dropzone onFilesAdded={handleFilesAdded} />
            </section>

            {/* 2. File List Box & Actions */}
            {files.length > 0 && (
                <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                        <div>
                            <h2 className="font-semibold text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wider">{t('home.fileQueue')} ({files.length})</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t('home.clickToViewMetadata')}</p>
                        </div>
                        {doneCount > 0 && (
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                                {doneCount} {t('home.cleaned')}
                            </span>
                        )}
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[400px] overflow-y-auto custom-scrollbar">
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
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-3">
                        <button
                            onClick={clearAll}
                            className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 font-medium px-4 py-2 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            {t('home.clearQueue')}
                        </button>

                        {/* Success State / Download Button */}
                        {doneCount > 0 && doneCount === files.length ? (
                            <button
                                onClick={downloadAll}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2"
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
                  bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2
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
        </>
    );
}
