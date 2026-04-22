#!/bin/bash

# Nurture2D Site Update Script
# This script commits and pushes all changes to GitHub

echo "🚀 Nurture2D Site Update Script"
echo "================================"
echo ""

# Check if there are any changes
if [[ -z $(git status -s) ]]; then
    echo "✅ No changes to commit. Your site is up to date!"
    exit 0
fi

# Show what will be committed
echo "📝 Changes detected:"
git status -s
echo ""

# Ask for commit message
read -p "Enter commit message (or press Enter for default): " commit_msg

# Use default message if none provided
if [[ -z "$commit_msg" ]]; then
    commit_msg="Update site files"
fi

echo ""
echo "📦 Staging all changes..."
git add -A

echo "💾 Committing changes..."
git commit -m "$commit_msg"

if [ $? -eq 0 ]; then
    echo "⬆️  Pushing to GitHub..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Success! Your site has been updated."
        echo "🌐 Changes will be live on GitHub Pages in a few minutes."
    else
        echo ""
        echo "❌ Failed to push to GitHub. Check your internet connection."
        exit 1
    fi
else
    echo ""
    echo "❌ Failed to commit changes."
    exit 1
fi
