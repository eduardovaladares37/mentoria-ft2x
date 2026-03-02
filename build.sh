#!/bin/bash
# Download missing images and CSS before Vercel builds the project

mkdir -p assets/images
mkdir -p css

echo "Downloading assets from temporary hosting..."

curl -L -s https://files.catbox.moe/6r5ej0.png -o assets/images/hero-bg.png
curl -L -s https://files.catbox.moe/5yei97.jpeg -o assets/images/mentor-eduardo.jpeg
curl -L -s https://files.catbox.moe/apj4vs.png -o assets/images/light-long-logo.png
curl -L -s https://files.catbox.moe/zvzbfe.png -o assets/images/dark-long-logo.png
curl -L -s https://files.catbox.moe/p3pkgo.css -o css/components.css

echo "Downloaded missing assets successfully!"
exit 0
