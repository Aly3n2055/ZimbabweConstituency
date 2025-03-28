#!/bin/bash

# Kuwadzana West Constituency Web App Build Script for Netlify
# This script prepares the application for deployment on Netlify

echo "🚀 Starting Netlify build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run build process
echo "🔨 Building application..."
npm run build

# Create Netlify _redirects file
echo "⚡ Setting up Netlify redirects..."
echo "/*    /index.html   200" > dist/public/_redirects

# Create a small readme in the output directory
echo "📝 Creating deployment info file..."
cat > dist/public/deployment-info.txt << EOL
Kuwadzana West Constituency Web App
Deployed: $(date)
Build: Netlify
EOL

echo "✅ Build completed successfully!"