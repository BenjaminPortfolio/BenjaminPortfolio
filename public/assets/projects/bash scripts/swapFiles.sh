#!/bin/bash

# swap.sh

select_file() {
    local baseName=$1

    matches=($(find . -maxdepth 1 -type f | grep "/${baseName}\."))

    if [ ${#matches[@]} -eq 0 ]; then
        echo "File not found: $baseName"
        return 1
    fi

    # If only one match exists, use it directly
    if [ ${#matches[@]} -eq 1 ]; then
        echo "${matches[0]}"
        return 0
    fi

    # Multiple files with same basename found
    echo
    echo "Multiple files found for '$baseName':"

    for i in "${!matches[@]}"; do
        file=$(basename "${matches[$i]}")
        echo "$((i + 1))) $file"
    done

    echo
    read -p "Choose file number: " choice

    selected="${matches[$((choice - 1))]}"

    if [ -z "$selected" ]; then
        echo "Invalid selection."
        return 1
    fi

    echo "$selected"
}

echo
read -e -p "Enter first filename (without extension): " file1Base
read -e -p "Enter second filename (without extension): " file2Base

file1=$(select_file "$file1Base")
if [ $? -ne 0 ]; then
    read -p "Press Enter to exit..."
    exit 1
fi

file2=$(select_file "$file2Base")
if [ $? -ne 0 ]; then
    read -p "Press Enter to exit..."
    exit 1
fi

ext1="${file1##*.}"
ext2="${file2##*.}"

temp="./__temp_swap__.$ext1"

# Safe swap
mv "$file1" "$temp"
mv "$file2" "./${file1Base}.${ext2}"
mv "$temp" "./${file2Base}.${ext1}"

echo
echo "Swap completed successfully:"
echo "$(basename "./${file1Base}.${ext2}")"
echo "$(basename "./${file2Base}.${ext1}")"
echo

read -p "Press Enter to exit..."