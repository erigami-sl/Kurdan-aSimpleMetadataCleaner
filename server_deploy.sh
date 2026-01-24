#!/bin/bash

echo "🔄 Deploying Kurdan v1.1.1..."

# 1. Pull latest code
echo "📥 Pulling latest changes..."
git pull origin main

# 2. Build and restart containers (using prod config)
echo "🏗️ Building and restarting containers..."
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build

echo "✅ Deployment complete! Server is running v1.1.1"
