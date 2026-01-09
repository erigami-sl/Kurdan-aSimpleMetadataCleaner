# Kürdan - A Simple Metadata Cleaner

Kürdan is a privacy-focused, server-side metadata cleaning tool designed to strip sensitive information from your files without compromising their quality. It supports a wide range of formats including Images, Audio, PDFs, and Office documents.

## Features

-   **Privacy First**: Strict "No Logs" policy. Files are processed in ephemeral memory and immediately deleted after download. No file names, IDs, or user data are logged.
-   **Stats Counter**: Anonymous file counter available via `/api/stats` for site integration.
-   **Broad Format Support**:
    -   **Images**: JPEG, PNG, WebP, GIF, HEIC, AVIF, TIFF (Removes EXIF, XMP, ICC Profiles).
    -   **Audio**: MP3, WAV, OGG, M4A, FLAC (Removes ID3v1 & ID3v2 tags including cover art).
    -   **PDFs**: Removes Author, Producer, Keywords, XMP Metadata, and resets dates.
    -   **Office Docs (DOCX, XLSX, PPTX, ODS, ODT, ODP)**: Cleans core properties (Creator, Last Modified By, Company, etc.).
-   **Modern & Responsive UI**:
    -   **Visual Feedback**: Circular progress indicators and clear status icons.
    -   **Metadata Shield**: Verifies and displays "Cleaned" status for processed files.
    -   **Mobile Ready**: Optimized layout for seamless use on mobile devices.
    -   **Dark Mode**: Fully supported dark theme for low-light environments.
-   **Productivity**:
    -   **Keyboard Shortcuts**: Use `Delete` or `Backspace` to remove files, and `Ctrl+V` to paste files directly from clipboard.
    -   **Drag & Drop**: Robust drag-and-drop support.

## Security

Kürdan implements comprehensive security measures to protect both users and the server:

### Server Security

| Feature | Description |
|---------|-------------|
| **Helmet** | Security headers (X-Content-Type-Options, X-Frame-Options, etc.) |
| **Rate Limiting** | 100 req/min for API, 50 uploads per 15 minutes |
| **CORS** | Configurable allowed origins via environment variables |
| **Path Traversal Protection** | UUID validation + path.basename() + resolved path checks |
| **File Upload Limits** | 50MB max file size, 10 files max per upload |
| **MIME Validation** | Only whitelisted file types accepted |
| **Filename Sanitization** | Null bytes and special characters removed |
| **Auto Cleanup** | Files automatically deleted after 30 minutes |
| **HTTPS Redirect** | Automatic HTTPS enforcement in production |
| **Proxy Support** | Configurable for nginx/Cloudflare deployments |
| **Global Error Handler** | Safe error messages in production |

### Privacy

Kürdan operates with a strict **No-Logs Policy**:
- ✅ No file names or IDs logged
- ✅ No user IP addresses collected
- ✅ No analytics or tracking
- ✅ Files deleted immediately after processing
- ✅ Only anonymous counter (total files cleaned) is tracked

## Tech Stack

-   **Frontend**: React + Vite + Tailwind CSS v4 + Lucide Icons + i18next
-   **Backend**: Node.js + Express 5 + Multer
-   **Security**: Helmet + express-rate-limit + dotenv
-   **Core Libraries**:
    -   `sharp` (High-performance image processing)
    -   `node-id3` & `music-metadata` (Audio metadata handling)
    -   `pdf-lib` (PDF manipulation)
    -   `jszip` (Office document parsing)
    -   `piexifjs` (Legacy JPEG support)

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    # Install frontend dependencies
    npm install

    # Install backend dependencies
    cd server
    npm install
    cd ..
    ```

3.  **Configure environment** (optional):
    ```bash
    cd server
    cp .env.example .env
    # Edit .env as needed
    ```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated CORS origins |
| `NODE_ENV` | `development` | Environment (`development`/`production`) |
| `BEHIND_PROXY` | `false` | Set to `true` if behind nginx/Cloudflare |

### Running the Application

You need to run both the frontend and backend servers.

1.  **Start the Backend API**:
    ```bash
    cd server
    npm start
    # Or for development with auto-reload:
    npm run dev
    ```
    (Runs on `http://localhost:3000`)

2.  **Start the Frontend**:
    ```bash
    # In a new terminal from the root folder
    npm run dev
    ```
    (Runs on `http://localhost:5173`)

3.  Open your browser and navigate to the frontend URL shown in the terminal.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API status check |
| `/api/upload` | POST | Upload a file for metadata inspection |
| `/api/clean/:id` | GET | Clean and download a processed file |
| `/api/stats` | GET | Get anonymous stats (total files cleaned) |

## Production Deployment

For production deployments, ensure:

1. Set `NODE_ENV=production` in your environment
2. Configure `ALLOWED_ORIGINS` to your frontend domain
3. If behind a reverse proxy, set `BEHIND_PROXY=true`
4. Use HTTPS (automatic redirect enabled in production)

## License

This project is licensed under the MIT License.
