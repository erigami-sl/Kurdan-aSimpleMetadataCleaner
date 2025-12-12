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

## Tech Stack

-   **Frontend**: React + Vite + Tailwind CSS v4 + Lucide Icons + i18next
-   **Backend**: Node.js + Express + Multer
-   **Core Libraries**:
    -   `sharp` (High-performance image processing)
    -   `node-id3` & `music-metadata` (Audio metadata handling)
    -   `pdf-lib` (PDF manipulation)
    -   `jszip` (Office document parsing)
    -   `piexifjs` (Legacy JPEG support)

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
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

### Running the Application

You need to run both the frontend and backend servers.

1.  **Start the Backend API**:
    ```bash
    cd server
    node index.js
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
|---|---|---|
| `/api/upload` | POST | Upload a file for metadata inspection |
| `/api/clean/:id` | GET | Clean and download a processed file |
| `/api/stats` | GET | Get anonymous stats (total files cleaned) |

## Privacy

Kürdan operates with a strict **No-Logs Policy**:
- ✅ No file names or IDs logged
- ✅ No user IP addresses collected
- ✅ No analytics or tracking
- ✅ Files deleted immediately after processing
- ✅ Only anonymous counter (total files cleaned) is tracked

## License

This project is licensed under the MIT License.
