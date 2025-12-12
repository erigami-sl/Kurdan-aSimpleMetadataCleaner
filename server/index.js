import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import NodeID3 from 'node-id3';
import * as mm from 'music-metadata';

// -- Setup --
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const STATS_FILE = path.join(__dirname, 'stats.json');

// -- Stats Counter (Privacy-Safe) --
const loadStats = () => {
    try {
        if (fs.existsSync(STATS_FILE)) {
            return JSON.parse(fs.readFileSync(STATS_FILE, 'utf-8'));
        }
    } catch (e) {
        // Stats file corrupted, reset
    }
    return { totalCleaned: 0, lastUpdated: null };
};

const saveStats = (stats) => {
    try {
        fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
    } catch (e) {
        // Failed to save stats silently
    }
};

const incrementCleanedCount = () => {
    const stats = loadStats();
    stats.totalCleaned += 1;
    stats.lastUpdated = new Date().toISOString();
    saveStats(stats);
    return stats.totalCleaned;
};

// Ensure upload directory exists
fs.ensureDirSync(UPLOAD_DIR);

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint check
app.get('/', (req, res) => {
    res.send({ status: 'Metadata Remover API is running', version: '1.0.0' });
});

// Stats endpoint (for future site integration)
app.get('/api/stats', (req, res) => {
    const stats = loadStats();
    res.json({
        totalCleaned: stats.totalCleaned,
        lastUpdated: stats.lastUpdated
    });
});

// Multer Storage (Temp)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// -- Inspection Logic --
import piexif from 'piexifjs';
import { PDFDocument, PDFName } from 'pdf-lib';
import JSZip from 'jszip';

const inspectFile = async (filePath, mimetype) => {
    const data = {};

    try {
        const buffer = await fs.readFile(filePath);

        // 1. Images (JPG, PNG, WebP, GIF, HEIC/AVIF via sharp)
        if (mimetype.startsWith('image/')) {
            try {
                const metadata = await sharp(buffer).metadata();

                if (metadata.exif) {
                    // Try to parse EXIF if piexifjs supports it (mainly JPEG)
                    // or just verify its existence. 
                    // For simplicity, we flag that metadata exists.
                    // Pulling specific tags from raw buffer is complex for non-JPG without tools like exiftool.
                    // Sharp metadata gives us technical specs (width, height, density) but not "Artist".
                    // Let's stick to piexif for standard JPEG EXIF details users care about (GPS, Camera).
                    if (mimetype === 'image/jpeg' || mimetype === 'image/jpg') {
                        const binary = buffer.toString('binary');
                        try {
                            const exifObj = piexif.load(binary);
                            if (exifObj['0th']) {
                                if (exifObj['0th'][piexif.ImageIFD.Make]) data['Camera Make'] = exifObj['0th'][piexif.ImageIFD.Make];
                                if (exifObj['0th'][piexif.ImageIFD.Model]) data['Camera Model'] = exifObj['0th'][piexif.ImageIFD.Model];
                                if (exifObj['0th'][piexif.ImageIFD.DateTime]) data['Date/Time'] = exifObj['0th'][piexif.ImageIFD.DateTime];
                            }
                            if (exifObj['GPS'] && Object.keys(exifObj['GPS']).length > 0) {
                                data['GPS'] = "Location Data Present";
                            }
                        } catch (e) { /* corrupted or no exif */ }
                    } else {
                        // For PNG/WebP/GIF, just showing we found metadata
                        data['Metadata Block'] = `${metadata.format.toUpperCase()} Metadata Present`;
                        if (metadata.icc) data['ICC Profile'] = 'Present';
                        if (metadata.xmp) data['XMP Data'] = 'Present';
                    }
                }
            } catch (e) {
                // Invalid image
            }
        }
        // 2. PDF
        else if (mimetype === 'application/pdf') {
            try {
                const pdfDoc = await PDFDocument.load(buffer);
                const title = pdfDoc.getTitle();
                if (title) data['Title'] = title;
                const author = pdfDoc.getAuthor();
                if (author) data['Author'] = author;
                const creator = pdfDoc.getCreator();
                if (creator) data['Creator'] = creator;
                const producer = pdfDoc.getProducer();
                if (producer) data['Producer'] = producer;
                const creation = pdfDoc.getCreationDate();
                if (creation) data['Creation Date'] = creation.toISOString();
            } catch (e) {
                // PDF Error
            }
        }
        // 3. Audio (MP3)
        else if (mimetype === 'audio/mpeg' || mimetype === 'audio/mp3') {
            try {
                const audioMetadata = await mm.parseFile(filePath);
                if (audioMetadata.common) {
                    if (audioMetadata.common.title) data['Title'] = audioMetadata.common.title;
                    if (audioMetadata.common.artist) data['Artist'] = audioMetadata.common.artist;
                    if (audioMetadata.common.album) data['Album'] = audioMetadata.common.album;
                    if (audioMetadata.common.year) data['Year'] = audioMetadata.common.year;
                }
            } catch (e) {
                // Audio error
            }
        }
        // 4. Office Docs
        else if (
            mimetype.includes('officedocument') ||
            mimetype.includes('msword') ||
            mimetype.includes('vnd.openxmlformats')
        ) {
            try {
                const zip = await JSZip.loadAsync(buffer);
                if (zip.file("docProps/core.xml")) {
                    const core = await zip.file("docProps/core.xml").async("text");
                    const creator = core.match(/<dc:creator>(.*?)<\/dc:creator>/)?.[1];
                    if (creator) data['Creator'] = creator;
                    const lastMod = core.match(/<cp:lastModifiedBy>(.*?)<\/cp:lastModifiedBy>/)?.[1];
                    if (lastMod) data['Modified By'] = lastMod;
                }
                if (zip.file("docProps/app.xml")) {
                    const app = await zip.file("docProps/app.xml").async("text");
                    const company = app.match(/<Company>(.*?)<\/Company>/)?.[1];
                    if (company) data['Company'] = company;
                }
            } catch (e) {
                // Zip Error
            }
        }

        return Object.keys(data).length > 0 ? data : { "Status": "No Cleanable Metadata Found" };

    } catch (err) {
        return { "Error": "Inspection Failed" };
    }
};

const cleanImage = async (buffer, mimetype) => {
    try {
        // Use Sharp for robust metadata stripping on all formats (JPG, PNG, WebP, GIF, AVIF, TIFF)
        // .withMetadata(false) is the key.
        return await sharp(buffer)
            .withMetadata(false) // Explicitly remove all metadata
            .toBuffer();
    } catch (e) {
        return buffer;
    }
};

const cleanAudio = async (filePath) => {
    try {
        // NodeID3.removeTags returns boolean or validation error
        // It modifies the file in place or returns buffer? 
        // Sync version writes to file. Async needs callback.
        // Let's use buffer interface to be safe and consistent.
        // NodeID3.removeTagsFromBuffer(buffer)

        const buffer = await fs.readFile(filePath);
        // removeTagsFromBuffer returns the buffer without tags
        const cleanedBuffer = NodeID3.removeTagsFromBuffer(buffer);
        return cleanedBuffer;
    } catch (e) {
        return await fs.readFile(filePath);
    }
};

const cleanPDF = async (buffer) => {
    try {
        const pdfDoc = await PDFDocument.load(buffer);

        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('\u200B');
        pdfDoc.setCreator('\u200B');

        pdfDoc.setCreationDate(new Date());
        pdfDoc.setModificationDate(new Date());

        try {
            pdfDoc.catalog.delete(PDFName.of('Metadata'));
        } catch (err) {
            // XMP removal failed silently
        }

        const cleanedBytes = await pdfDoc.save();
        return Buffer.from(cleanedBytes);
    } catch (e) {
        return buffer;
    }
};

const cleanOfficeFile = async (buffer) => {
    try {
        const zip = await JSZip.loadAsync(buffer);

        if (zip.file("docProps/core.xml")) {
            let core = await zip.file("docProps/core.xml").async("text");
            const tagsToRemove = [
                'dc:creator', 'dc:title', 'dc:subject', 'dc:description',
                'cp:lastModifiedBy', 'cp:category', 'cp:contentStatus'
            ];

            tagsToRemove.forEach(tag => {
                const regex = new RegExp(`<${tag}>.*?</${tag}>`, 'g');
                core = core.replace(regex, `<${tag}></${tag}>`);
            });
            zip.file("docProps/core.xml", core);
        }

        if (zip.file("docProps/app.xml")) {
            let app = await zip.file("docProps/app.xml").async("text");
            const tagsToRemove = ['Company', 'Manager'];
            tagsToRemove.forEach(tag => {
                const regex = new RegExp(`<${tag}>.*?</${tag}>`, 'g');
                app = app.replace(regex, `<${tag}></${tag}>`);
            });
            zip.file("docProps/app.xml", app);
        }

        return await zip.generateAsync({ type: "nodebuffer" });

    } catch (e) {
        return buffer;
    }
};

const processFile = async (filePath, mimetype) => {
    // Read file
    const buffer = await fs.readFile(filePath);
    let cleanedBuffer = buffer;

    if (mimetype.startsWith('image/')) {
        cleanedBuffer = await cleanImage(buffer, mimetype);
    }
    else if (mimetype === 'audio/mpeg' || mimetype === 'audio/mp3') {
        cleanedBuffer = await cleanAudio(filePath); // NodeID3 likes path or buffer
    }
    else if (mimetype === 'application/pdf') {
        cleanedBuffer = await cleanPDF(buffer);
    }
    else if (
        mimetype.includes('officedocument') ||
        mimetype.includes('msword') ||
        mimetype.includes('vnd.openxmlformats')
    ) {
        cleanedBuffer = await cleanOfficeFile(buffer);
    }

    const parsedPath = path.parse(filePath);
    const cleanedPath = path.join(parsedPath.dir, `cleaned-${parsedPath.base}`);

    await fs.writeFile(cleanedPath, cleanedBuffer);

    return cleanedPath;
};

// -- Routes --

// 1. Upload & Inspect
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const metadata = await inspectFile(req.file.path, req.file.mimetype);

        res.json({
            id: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            mimeType: req.file.mimetype,
            metadata: metadata
        });
    } catch (err) {
        res.status(500).json({ error: 'Upload failed' });
    }
});

// 2. Clean & Download
app.get('/api/clean/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const filePath = path.join(UPLOAD_DIR, fileId);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found or expired' });
        }

        const originalName = fileId.substring(37);
        // Process file (Strip metadata)
        // Try to infer mimetype from extension since we don't store it in a DB
        const ext = path.extname(originalName).toLowerCase();
        const baseName = path.basename(originalName, ext);
        const downloadName = `${baseName}_cleaned${ext}`;

        let mimeType = 'application/octet-stream';

        // Extended MIME mapping
        if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        else if (ext === '.png') mimeType = 'image/png';
        else if (ext === '.gif') mimeType = 'image/gif';
        else if (ext === '.webp') mimeType = 'image/webp';
        else if (ext === '.pdf') mimeType = 'application/pdf';
        else if (ext === '.mp3') mimeType = 'audio/mpeg';
        else if (ext === '.docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        else if (ext === '.xlsx') mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        else if (ext === '.pptx') mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

        const finalPath = await processFile(filePath, mimeType);

        // Increment counter on successful processing
        const totalCleaned = incrementCleanedCount();
        console.log(`[Stats] Total files cleaned: ${totalCleaned}`);

        // Download the cleaned file
        res.download(finalPath, downloadName, (err) => {
            if (filePath !== finalPath) {
                fs.unlink(finalPath, () => { });
            }
            fs.unlink(filePath, () => { });
        });

    } catch (err) {
        console.error('[Error] Processing failed');
        res.status(500).json({ error: 'Processing failed' });
    }
});


// Start
app.listen(PORT, async () => {
    const stats = loadStats();
    console.log(`[Server] Started on port ${PORT}`);
    console.log(`[Stats] Total files cleaned so far: ${stats.totalCleaned}`);
});
