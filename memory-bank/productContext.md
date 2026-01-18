# Product Context: Kürdan

## Why This Project Exists

In an era of increasing digital privacy concerns, files often contain hidden metadata that can reveal sensitive information such as:
- Location coordinates (GPS data in photos)
- Author names and organization details
- Creation/modification timestamps
- Software and device information
- Camera settings and serial numbers

Kürdan addresses the need for a **simple, trustworthy tool** that removes this metadata without:
- Requiring software installation
- Storing or logging user files
- Compromising file quality
- Complex user interfaces

## Problems It Solves

### 1. Privacy Leakage
When users share files (especially images), they often unknowingly share personal metadata. Kürdan removes this data at the source.

### 2. Trust Issues with Online Tools
Many online metadata removers are opaque about what they do with uploaded files. Kürdan's strict no-logs policy and open-source nature addresses this concern.

### 3. Format Fragmentation
Users often need different tools for different file types. Kürdan provides a unified solution for images, audio, PDFs, and Office documents.

### 4. Technical Complexity
Removing metadata can be technically challenging for non-technical users. Kürdan makes it as simple as drag-and-drop.

## How It Should Work

### User Flow
1. User visits the web application
2. Drag and drop files (or click to upload)
3. Files upload to server for metadata inspection
4. User sees detected metadata
5. Click "Remove Metadata" to clean files
6. Download cleaned files (single or as ZIP for multiple)
7. Server deletes all file traces immediately

### System Behavior
- Server processes files in memory
- No logging of file names, IDs, or content
- Immediate deletion after download
- Only anonymous counter (total files cleaned) is tracked

## User Experience Goals

### Primary Goals
- **Instant Understanding**: Users should immediately understand what the tool does
- **Zero Learning Curve**: Drag, drop, click, download
- **Confidence**: Users should trust their files are safe and deleted
- **Speed**: Processing should be fast and responsive

### Visual Design Principles
- Clean, minimalist interface
- Clear status indicators (uploading, ready, processing, done)
- Mobile-responsive layout
- Dark mode support for low-light environments
- Professional, trustworthy appearance

### Accessibility
- Keyboard shortcuts for power users (Delete/Backspace to remove files, Ctrl+V to paste)
- Clear visual feedback for all states
- Responsive design for mobile devices
