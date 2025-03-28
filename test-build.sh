#!/bin/bash

# Script to test build process locally before deploying to Netlify

echo "🚀 Starting build test process..."

# Clean previous build artifacts
echo "🧹 Cleaning previous build artifacts..."
rm -rf dist

# Run the build script
echo "🔨 Running build process..."
./build-netlify.sh

# Check if build was successful
if [ -d "dist/public" ]; then
  echo "✅ Build successful! Output directory created at dist/public/"
  echo "📊 Build output summary:"
  find dist/public -type f | wc -l | xargs echo "   Total files:"
  find dist/public -name "*.js" | wc -l | xargs echo "   JavaScript files:"
  find dist/public -name "*.css" | wc -l | xargs echo "   CSS files:"
  find dist/public -name "*.html" | wc -l | xargs echo "   HTML files:"
  echo ""
  echo "🔍 To verify static files are working, you can run:"
  echo "npx serve -s dist/public"
else
  echo "❌ Build failed! Check for errors above."
  exit 1
fi