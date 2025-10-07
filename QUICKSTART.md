# Quick Start Guide

Get the Bill Splitter app running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- Smartphone with Expo Go app (for mobile testing)
- OR Android/iOS emulator (for simulator testing)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/jonathanbossenger/bill-splitter-app.git
cd bill-splitter-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Expo SDK (~54.0.12)
- expo-camera (^17.0.8)
- expo-image-picker (^17.0.8)
- tesseract.js (^6.0.1)
- And other required packages

**Wait time:** ~1-2 minutes

### 3. Start the Development Server

```bash
npm start
```

You'll see:
```
Starting project at /path/to/bill-splitter-app
Starting Metro Bundler

› Metro waiting on http://localhost:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### 4. Run the App

**Option A: On Your Phone (Recommended)**

1. Install Expo Go app:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code:
   - iOS: Use Camera app
   - Android: Use Expo Go app

3. Wait for app to load (~30 seconds)

**Option B: On Android Emulator**

```bash
npm run android
```

Prerequisites:
- Android Studio installed
- Android emulator configured
- Android SDK installed

**Option C: On iOS Simulator** (macOS only)

```bash
npm run ios
```

Prerequisites:
- Xcode installed
- iOS simulator configured

**Option D: In Web Browser** (Limited Features)

```bash
npm run web
```

Note: Camera access limited in browsers

## First Run

When you first open the app:

1. You'll see the home screen with two buttons
2. Tap "Take Photo" or "Choose from Gallery"
3. Grant camera/gallery permissions when prompted
4. Capture or select a bill image
5. Wait for OCR processing (5-15 seconds)
6. View the extracted bill items!

## Testing Tips

### Test with Sample Bills

For best results when testing:

1. **Use good lighting** - Natural light works best
2. **Hold phone steady** - Avoid blurry images
3. **Fill the frame** - Get close to the bill
4. **Keep it flat** - No wrinkles or folds

### Sample Test Images

You can test with:
- Restaurant receipts
- Store receipts
- Invoices with itemized lists
- Any printed document with items and prices

### Expected Results

Good OCR results should show:
- Item names clearly
- Prices accurately extracted
- Minimal false positives
- Clean, organized list

## Troubleshooting

### Metro Bundler Won't Start

```bash
# Clear cache and restart
npm start -- --clear
```

### Can't Connect to Development Server

1. Make sure phone and computer are on same WiFi
2. Check firewall settings
3. Try using tunnel mode: `npm start --tunnel`

### Dependencies Won't Install

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### App Crashes on Launch

1. Check Node.js version: `node --version` (should be 14+)
2. Clear Expo cache: `npx expo start -c`
3. Reinstall Expo Go app

### Permissions Not Working

1. Delete and reinstall the app
2. Check device settings → Privacy → Camera/Photos
3. Grant permissions manually if needed

### OCR Not Working

1. Ensure internet connection (first run only, for worker download)
2. Check image quality
3. Try with a simpler bill
4. Wait longer (up to 30 seconds)

## Development Workflow

### Making Changes

1. Edit `App.js` or other files
2. Save the file
3. App auto-reloads in Expo Go
4. See your changes immediately

### Debugging

**Console Logs:**
```javascript
console.log('Debug message');
```
- Appears in terminal where Metro bundler is running

**React DevTools:**
```bash
# Install globally
npm install -g react-devtools

# Run
react-devtools
```

**Remote Debugging:**
- Shake device (or Cmd+D/Ctrl+M in simulator)
- Tap "Debug JS Remotely"
- Opens Chrome DevTools

### Common Commands

```bash
# Start development server
npm start

# Start with cleared cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run in web browser
npm run web

# Check for updates
npx expo upgrade

# Install new package
npm install package-name
```

## Next Steps

Once you have the app running:

1. **Read the documentation:**
   - [README.md](README.md) - Overview
   - [FEATURES.md](FEATURES.md) - Features
   - [USAGE.md](USAGE.md) - Usage guide
   - [DEVELOPMENT.md](DEVELOPMENT.md) - Development details
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture

2. **Try the features:**
   - Take a photo of a bill
   - Select from gallery
   - Test with different bill formats

3. **Customize the app:**
   - Change colors in styles
   - Modify parsing logic
   - Add new features

4. **Build for production:**
   - Set up EAS Build
   - Create production builds
   - Publish to app stores

## Quick Reference

### Project Structure
```
bill-splitter-app/
├── App.js              # Main app code
├── app.json           # Expo config
├── package.json       # Dependencies
└── assets/            # Images
```

### Key Files
- **App.js** - All app logic and UI
- **app.json** - Permissions and settings
- **package.json** - Dependencies list

### Key Technologies
- React Native - Mobile framework
- Expo - Development platform
- Tesseract.js - OCR engine

### Useful Links
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Tesseract.js Docs](https://tesseract.projectnaptha.com/)

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [DEVELOPMENT.md](DEVELOPMENT.md) guide
3. Search Expo documentation
4. Check GitHub issues
5. Ask in Expo Discord/Forums

## Success! 🎉

If you can see the app on your device and scan a bill, you're all set!

**What you've achieved:**
- ✅ Installed and configured the app
- ✅ Started the development server
- ✅ Launched the app on a device
- ✅ Tested OCR functionality
- ✅ Ready to develop!

**Next:**
- Explore the code in App.js
- Try adding new features
- Read the architecture docs
- Build something awesome!

---

**Total setup time:** ~5 minutes  
**Dependencies installed:** ~730 packages  
**App size:** ~50MB (with all dependencies)  
**First load time:** ~30 seconds  

Happy coding! 🚀
