# Active Context: Kürdan

## Current Work Focus
Transitioned to **Local Node.js Development** environment for faster testing and iteration. Docker is now reserved strictly for production deployment.

## Recent Changes (January 30, 2026)

### Completed
- **Local Dev Transition**:
  - Removed `docker-compose.dev.yml`
  - Configured `concurrently` for single-command dev start (`npm run dev:all`)
  - Updated `.gitignore`
- **Security**: Hardening phases completed previously.

### Security Fixes Implemented
- **Path Traversal Protection**: UUID validation + path.resolve checks
- **CORS Restriction**: Origin whitelist from environment variables
- **File Upload Limits**: 150MB size, MIME whitelist, max 10 files
- **Auto Cleanup**: 30-minute old file deletion
- **Rate Limiting**: API (100/min), Upload (50/15min)
- **Security Headers**: Helmet middleware
- **Filename Sanitization**: Special char removal
- **Global Error Handler**: Multer errors + production mode
- **Environment Variables**: dotenv support
- UI refinements and bug fixes
- **Design Overhaul (Expert Refinement)**: 
  - **Light Mode**: Stone-50 specific background, White Cards, Amber-tinted Dropzone, Elevated Shadows
  - **Dark Mode**: High Contrast (Amber Buttons), Dark Green/Black BG (#1A201A), Border-based separation
  - **Color Swap**: Swapped Button (Green/Safe) and Progress Bar (Amber/Processing) colors for semantic clarity
  - **Accessibility**: Improved contrast ratios (WCAG AA), Reduced visual vibration
  - **Primary Color**: Reverted to Amber/Orange (#F59E0B) for high visibility on dark backgrounds
- **Real-time Stats**: Polling (10s) + Optimistic UI updates
- **Backend Fix**: Solved race condition in stats counting (switched to sync writes)
- Removed "breathing" animations completely to resolve mobile performance issues
- Download filename fix ensuring correct original filenames
- Addition of UI hint instructing users to click files to view metadata
- Migration from client-side to server-side architecture
- Implementation of no-logs policy (removal of console logging)
- File icon improvements for better theme compatibility
- **HTTPS Enforcement**: Made conditional on `FORCE_HTTPS` env var to support local Docker testing without SSL errors
- **API Cleanliness**: Moved root health check to `/api/health` to allow static file serving at `/`
- **Documentation**: Created `DEPLOYMENT.md` for comprehensive server setup instructions

## Next Steps

### Potential Improvements
1. **Performance**: Consider implementing chunked uploads for large files
2. **Formats**: Expand supported formats (SVG, video files)
3. **Testing**: Add automated test suite
4. **Documentation**: Expand API documentation

### Maintenance Tasks
- Keep dependencies updated
- Monitor for security vulnerabilities
- Address any reported bugs

## Active Decisions and Considerations

### Architecture
- **Server-side processing**: Current architecture uses server-side processing for better library support. Client-side was attempted earlier but migrated to server-side.
- **No database**: Files stored temporarily in filesystem, no persistence needed.

### Privacy
- **Strict no-logs policy**: No file names, IDs, or user data logged
- **Anonymous stats only**: Only total cleaned counter tracked
- **Immediate deletion**: Files deleted right after download

## Important Patterns and Preferences

### Code Style
- React functional components with hooks
- ES modules (ESM) throughout
- Tailwind CSS for styling
- i18next for translations

### File Naming
- Components: PascalCase (e.g., `FileItem.jsx`)
- Pages: PascalCase (e.g., `Home.jsx`)
- Utilities: camelCase
- CSS: Component-scoped or global in `index.css`

### API Design
- RESTful endpoints under `/api/`
- File IDs use UUID + original filename pattern
- JSON responses for data, file downloads use `res.download()`

## Learnings and Project Insights

### What Worked Well
1. **Sharp library**: High-performance, reliable image processing
2. **Tailwind CSS**: Rapid UI development with dark mode
3. **Multer**: Simple file upload handling
4. **pdf-lib**: Clean PDF manipulation API

### Challenges Encountered
1. **Audio metadata removal**: Required multiple libraries (node-id3, music-metadata)
2. **Office document structure**: XML parsing complexity within ZIP structure
3. **Download filename handling**: Content-Disposition header parsing across browsers
4. **Clipboard paste**: Browser API inconsistencies

### Solutions Applied
1. Combined node-id3 (for writing/removing) with music-metadata (for reading)
2. Used JSZip to navigate Office document XML structure
3. Implemented fallback filename extraction from file ID
4. Added both keydown and paste event listeners for robust clipboard support

## Current State Summary

| Aspect | Status |
|--------|--------|
| Core Functionality | ✅ Complete |
| UI/UX | ✅ Complete |
| Dark Mode | ✅ Complete |
| i18n | ✅ Complete |
| Privacy/No-Logs | ✅ Complete |
| Documentation | ✅ Memory Bank created |
| Security Phase 1 | ✅ Critical fixes done |
| Security Phase 2 | ✅ High priority done |
| Security Phase 3 | ✅ Medium priority done |
| Security Phase 4 | ✅ Low priority done |
| README Updated | ✅ Complete |
| Testing | ⏳ Not implemented |
| Deployment | ⏳ Local development only |
