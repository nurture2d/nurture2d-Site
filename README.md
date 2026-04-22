# Nurture2D Website

Official website for Nurture2D - Traditional 2D Animation Software

## Quick Update Script

To quickly commit and push changes to the site, use the update script:

```bash
./update-site.sh
```

The script will:
- Show you what files have changed
- Ask for a commit message (or use a default one)
- Stage all changes
- Commit and push to GitHub
- Your GitHub Pages site will update automatically

## Manual Git Commands

If you prefer to do it manually:

```bash
git status                          # Check what changed
git add .                           # Stage all changes
git commit -m "Your message here"   # Commit changes
git push origin main                # Push to GitHub
```

## Site Structure

- `index.html` - Main homepage
- `download.html` - Download page with version selector
- `styles.css` - Main stylesheet
- `download.css` - Download page styles
- `script.js` - JavaScript for animations and interactions
- `assets/` - Images and icons

## Updating Download Links

Edit the `downloads` object in `download.html` to add new versions or update file names.
