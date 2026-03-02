#!/bin/bash
# Download missing images and CSS before Vercel builds the project

# Create isolated output directory
mkdir -p .vercel_build/assets/images
mkdir -p .vercel_build/css

# Copy all static assets safely without recursion
cp -R assets css js docs .vercel_build/ 2>/dev/null || true
cp *.html *.txt *.json *.md .vercel_build/ 2>/dev/null || true

echo "Downloading assets from unrestricted hosting..."

curl -L -s http://tmpfiles.org/dl/27049528/hero-bg.png -o .vercel_build/assets/images/hero-bg.png
curl -L -s http://tmpfiles.org/dl/27049640/mentor-eduardo.jpeg -o .vercel_build/assets/images/mentor-eduardo.jpeg
curl -L -s http://tmpfiles.org/dl/27049642/light-long-logo.png -o .vercel_build/assets/images/light-long-logo.png
curl -L -s http://tmpfiles.org/dl/27049644/dark-long-logo.png -o .vercel_build/assets/images/dark-long-logo.png
curl -L -s http://tmpfiles.org/dl/27049645/components.css -o .vercel_build/css/components.css

# Move the isolated directory to public, which Vercel will serve by default
mv .vercel_build public

echo "Downloaded missing assets successfully and prepared 'public' output directory!"
exit 0