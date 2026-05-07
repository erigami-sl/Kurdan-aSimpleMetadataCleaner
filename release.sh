#!/bin/bash

echo "📦 Preparing Release v2.0.0..."

# Stage potential remaining changes
git add .

# Commit version bump
git commit -m "chore(release): v2.0.0"

# Create tag
git tag -a v2.0.0 -m "Release v2.0.0: Premium UI/UX Redesign (Soft Organic Modernism)"

echo "✅ Release prepared locally."
echo "👉 NEXT STEP: Push to GitHub by running:"
echo "   git push origin main --tags"
