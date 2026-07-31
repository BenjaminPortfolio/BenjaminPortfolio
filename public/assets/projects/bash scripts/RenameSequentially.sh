#!/bin/bash

# rename_sequential.sh

echo
echo "===================================================="
echo "WARNING:"
echo "All files in the following folder will be renamed:"
echo "$(pwd)"
echo
echo "Files will be renamed sequentially (e.g., p1, p2, p3...)"
echo "This operation is destructive in naming and cannot be auto-undone."
echo "===================================================="
echo

read -p "Do you want to continue? (y/n): " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Operation cancelled."
    read -p "Press Enter to exit..."
    exit 0
fi

echo
read -e -p "Enter prefix name (example: p): " prefix

if [[ -z "$prefix" ]]; then
    echo "Prefix cannot be empty."
    read -p "Press Enter to exit..."
    exit 1
fi

echo
echo "Renaming files..."

count=1

# Step 1: Rename everything to temp names (avoid conflicts)
for file in *; do
    if [[ -f "$file" ]]; then
        ext=""
        if [[ "$file" == *.* ]]; then
            ext=".${file##*.}"
        fi

        mv "$file" "__temp__$count$ext"
        ((count++))
    fi
done

count=1

# Step 2: Rename to final sequential names
for file in __temp__*; do
    if [[ -f "$file" ]]; then
        ext=""
        if [[ "$file" == *.* ]]; then
            ext=".${file##*.}"
        fi

        newName="${prefix}${count}${ext}"

        mv "$file" "$newName"

        echo "Renamed -> $newName"

        ((count++))
    fi
done

echo
echo "All files renamed successfully."
echo

# Keep terminal open
read -p "Press Enter to exit..."