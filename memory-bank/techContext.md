# Technical Context: Kürdan

## Technologies Used

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool and dev server |
| Tailwind CSS | 4.1.17 | Utility-first CSS framework |
| React Router DOM | 7.10.1 | Client-side routing |
| Lucide React | 0.556.0 | Icon library |
| i18next | 25.7.2 | Internationalization |
| Framer Motion | 12.23.25 | Animations |
| JSZip | 3.10.1 | ZIP file creation for batch downloads |
| file-saver | 2.0.5 | File download utility |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | v18+ | Runtime environment |
| Express | 5.2.1 | Web framework |
| Multer | 2.0.2 | File upload handling |
| Sharp | 0.34.5 | High-performance image processing |
| pdf-lib | 1.17.1 | PDF manipulation |
| JSZip | 3.10.1 | Office document parsing |
| node-id3 | 0.2.9 | Audio ID3 tag handling |
| music-metadata | 11.10.3 | Audio metadata extraction |
| piexifjs | 1.0.6 | Legacy JPEG EXIF support |
| uuid | 13.0.0 | Unique ID generation |
| fs-extra | 11.3.2 | Enhanced file system operations |
| CORS | 2.8.5 | Cross-origin resource sharing |
| helmet | 8.1.0 | Security HTTP headers |
| express-rate-limit | 8.2.1 | API rate limiting |
| dotenv | 17.2.3 | Environment variable management |

## Development Setup

### Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)

### Installation Steps
```bash
# 1. Clone the repository
git clone <repository-url>

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd server
npm install
cd ..
```

### Running Locally
```bash
# Terminal 1: Start Backend API (port 3000)
cd server
node index.js

# Terminal 2: Start Frontend (port 5173)
npm run dev
```

### Build for Production
```bash
npm run build
# Output in /dist folder
```

## Technical Constraints

### Privacy Requirements
- **No file logging**: File names, IDs, and content must never be logged
- **Ephemeral processing**: Files processed in memory when possible
- **Immediate deletion**: Files deleted immediately after download
- **Anonymous stats only**: Only total files cleaned counter is tracked

### Performance Considerations
- Sharp library used for high-performance image processing
- Files streamed where possible to minimize memory usage
- Temporary files stored in `server/uploads/` and cleaned up after use

### Browser Compatibility
- Modern browsers with ES6+ support
- Clipboard API for paste functionality
- Drag and drop API for file uploads

## Dependencies

### Critical Dependencies
- **sharp**: Core image processing engine - handles EXIF, XMP, ICC profile removal
- **pdf-lib**: PDF manipulation - metadata field removal
- **node-id3**: Audio tag manipulation - ID3v1/v2 tag removal
- **JSZip**: Office document handling - core.xml parsing and modification

### Development Dependencies
- ESLint for code linting
- PostCSS for CSS processing
- Vite plugins for React refresh

## Tool Usage Patterns

### File Processing Flow
1. Frontend sends file via multipart form to `/api/upload`
2. Server saves to `uploads/` with UUID-prefixed filename
3. Server inspects file and returns metadata
4. On `/api/clean/:id`, server processes file type-specific cleaning
5. Cleaned file sent as download response
6. Both original and cleaned files deleted

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/upload` | POST | Upload file for inspection |
| `/api/clean/:id` | GET | Clean and download file |
| `/api/stats` | GET | Get anonymous statistics |

## Environment Configuration

### Default Ports
- Frontend: `5173` (Vite dev server)
- Backend: `3000` (Express)

### Proxy Configuration (vite.config.js)
Frontend proxies `/api` requests to backend:
```javascript
proxy: {
  '/api': 'http://localhost:3000'
}
```
