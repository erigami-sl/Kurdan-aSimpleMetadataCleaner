#!/bin/bash

echo "📦 Preparing Release v1.1.1..."

# Stage potential remaining changes
git add .

# Commit version bump
git commit -m "chore(release): v1.1.1"

# Create tag
git tag -a v1.1.1 -m "Release v1.1.1: UI Polish & Core Fixes"

echo "✅ Release prepared locally."
echo "👉 NEXT STEP: Push to GitHub by running:"
echo "   git push origin main --tags"
