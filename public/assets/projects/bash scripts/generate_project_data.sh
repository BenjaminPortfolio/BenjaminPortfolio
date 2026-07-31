#!/bin/bash

echo
echo "===================================================="
echo "PROJECT DATA GENERATOR"
echo "This will scan subfolders and generate projectData.js"
echo "Run this inside your assets/projects folder"
echo "===================================================="
echo

read -p "Do you want to continue? (y/n): " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Cancelled."
    read -p "Press Enter to exit..."
    exit 0
fi

OUTPUT="projectData.js"
ID=1

echo "Generating $OUTPUT ..."

# Start file
cat > "$OUTPUT" <<EOL
// ============================================================
// PROJECTS DATA (AUTO GENERATED)
// ============================================================

export const CATEGORIES = [
  { id: "all", label: "All projects" },
  { id: "illustration", label: "Illustration" },
  { id: "motion", label: "Motion Graphics" },
  { id: "3d", label: "3D" },
  { id: "sketches", label: "Sketches" },
  { id: "freelance", label: "Freelance works" },
];

export const PROJECTS = [
EOL

# Function to convert folder name → category
get_category() {
    folder="$1"
    lower=$(echo "$folder" | tr '[:upper:]' '[:lower:]')

    case "$lower" in
        *illustration*) echo "illustration" ;;
        *motion*) echo "motion" ;;
        *3d*) echo "3d" ;;
        *sketch*) echo "sketches" ;;
        *freelance*) echo "freelance" ;;
        *) echo "misc" ;;
    esac
}

# Traverse all subfolders
find . -type f | while read -r file; do

    # skip script or output file
    if [[ "$file" == *"$OUTPUT"* ]]; then
        continue
    fi

    folder=$(basename "$(dirname "$file")")
    category=$(get_category "$folder")

    ext="${file##*.}"

    # detect type
    if [[ "$ext" == "mp4" || "$ext" == "mov" || "$ext" == "webm" ]]; then
        type="video"
    else
        type="image"
    fi

    # normalize path (remove leading ./)
    cleanPath=${file#./}

    cat >> "$OUTPUT" <<EOL
  {
    id: $ID,
    src: "/assets/projects/$cleanPath",
    type: "$type",
    category: "$category",
  },
EOL

    ((ID++))

done

# Close array
echo "];" >> "$OUTPUT"

echo
echo "DONE! File generated: $OUTPUT"
echo

read -p "Press Enter to exit..."