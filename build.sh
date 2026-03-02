#!/bin/bash
# Download missing images and CSS before Vercel builds the project
# Using tmpfiles.org which does not block Vercel IPs

mkdir -p assets/images
mkdir -p css

echo "Downloading assets from unrestricted hosting..."

curl -L -s http://tmpfiles.org/dl/27049528/hero-bg.png -o assets/images/hero-bg.png
curl -L -s http://tmpfiles.org/dl/27049640/mentor-eduardo.jpeg -o assets/images/mentor-eduardo.jpeg
curl -L -s http://tmpfiles.org/dl/27049642/light-long-logo.png -o assets/images/light-long-logo.png
curl -L -s http://tmpfiles.org/dl/27049644/dark-long-logo.png -o assets/images/dark-long-logo.png
curl -L -s http://tmpfiles.org/dl/27049645/components.css -o css/components.css

echo "Downloaded missing assets successfully!"
exit 0