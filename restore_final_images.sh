#!/bin/bash
# This script restores the correct image files from git history.

# The commit hash where the correct images were introduced.
COMMIT_HASH="67a520a"

# Define the files to restore and their original paths
FILES_TO_RESTORE=(
  "src/assets/gagan-profile.jpg"
  "src/assets/delhidevs-logo.png"
)

# Define the destination for the restored images
DESTINATION_DIR="public/assets"

# Ensure the destination directory exists
mkdir -p "$DESTINATION_DIR"

# Loop through each file, restore it, and move it to the correct location
for file_path in "${FILES_TO_RESTORE[@]}"; do
  filename=$(basename "$file_path")
  echo "Attempting to restore $filename..."
  
  # Checkout the file from the specific commit
  git checkout "$COMMIT_HASH" -- "$file_path"
  
  # Check if the checkout was successful before moving
  if [ -f "$file_path" ]; then
    # Move the restored file to the public assets directory, overwriting if necessary
    mv -f "$file_path" "$DESTINATION_DIR/$filename"
    echo "Successfully restored and moved $filename to $DESTINATION_DIR."
  else
    echo "Error: Could not restore $file_path from commit $COMMIT_HASH."
  fi
done

# Clean up the 'src/assets' directory if it was created and is now empty
if [ -d "src/assets" ]; then
  rmdir "src/assets" 2>/dev/null
fi

echo "Image restoration process complete."