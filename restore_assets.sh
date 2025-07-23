#!/bin/bash

# This script restores specific files from a known good commit.

# The commit hash before the assets were deleted
COMMIT_HASH="67a520a"

# The list of files to restore
FILES_TO_RESTORE=(
  "src/assets/gagan-profile.jpg"
  "src/assets/delhidevs-logo.png"
)

# The destination directory
DESTINATION_DIR="public/assets"

# Loop through the files and restore them
for file in "${FILES_TO_RESTORE[@]}"; do
  # get just the filename
  filename=$(basename "$file")
  if [ ! -f "$DESTINATION_DIR/$filename" ]; then
    echo "Restoring $file..."
    git checkout $COMMIT_HASH -- "$file"
    mv "$file" "$DESTINATION_DIR/$filename"
  else
    echo "$file already exists. Skipping."
  fi
done

# Restore hero-bg.jpg and gagan-portrait.jpg from a different commit
COMMIT_HASH="6273a44"
FILES_TO_RESTORE=(
  "src/assets/gagan-portrait.jpg"
  "src/assets/hero-bg.jpg"
)
for file in "${FILES_TO_RESTORE[@]}"; do
  # get just the filename
  filename=$(basename "$file")
  if [ ! -f "$DESTINATION_DIR/$filename" ]; then
    echo "Restoring $file..."
    git checkout $COMMIT_HASH -- "$file"
    mv "$file" "$DESTINATION_DIR/$filename"
  else
    echo "$file already exists. Skipping."
  fi
done

echo "Asset restoration complete."
