# Project Brief: Kürdan - A Simple Metadata Cleaner

## Project Overview

**Kürdan** is a privacy-focused, server-side metadata cleaning tool designed to strip sensitive information from files without compromising their quality. The name "Kürdan" is Turkish for "toothpick," symbolizing the tool's ability to cleanly and precisely remove metadata.

## Core Requirements

### Primary Goals
1. **Privacy First**: Implement a strict "No Logs" policy where files are processed in ephemeral memory and immediately deleted after download
2. **Broad Format Support**: Support multiple file types including images, audio, PDFs, and Office documents
3. **User Experience**: Provide a modern, responsive UI with clear visual feedback
4. **Security**: Ensure no file names, IDs, or user data are logged

### Target Users
- Privacy-conscious individuals
- Security professionals
- Anyone who needs to remove sensitive metadata before sharing files

## Scope

### In Scope
- Server-side metadata removal via REST API
- React-based frontend with drag-and-drop upload
- Support for: JPEG, PNG, WebP, GIF, HEIC, AVIF, TIFF, MP3, WAV, OGG, M4A, FLAC, PDF, DOCX, XLSX, PPTX, ODS, ODT, ODP
- Anonymous statistics tracking (total files cleaned counter only)
- Dark mode support
- Multi-language support (i18n)

### Out of Scope
- User authentication/accounts
- Cloud storage integration
- File history/logs
- Analytics or tracking

## Success Metrics
- Files are successfully cleaned without quality loss
- No metadata remains after processing
- Files are deleted immediately after download
- Zero user data logging
