# Development Setup

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (installed via npx)
- For iOS development: macOS with Xcode
- For Android development: Android Studio with SDK

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/jonathanbossenger/bill-splitter-app.git
   cd bill-splitter-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator (macOS only)
   - Or press `w` for web browser

## Project Structure

```
bill-splitter-app/
├── App.js                  # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── README.md             # Project overview
├── FEATURES.md           # Feature documentation
├── DEVELOPMENT.md        # This file
├── .gitignore            # Git ignore rules
├── index.js              # App entry point
└── assets/               # App icons and images
    ├── icon.png
    ├── splash-icon.png
    ├── adaptive-icon.png
    └── favicon.png
```

## Key Dependencies

- **expo** - Core Expo framework
- **expo-camera** - Camera functionality
- **expo-image-picker** - Image selection
- **expo-file-system** - File system access
- **tesseract.js** - OCR text recognition
- **react-native** - React Native framework
- **react** - React library

## Development Workflow

### Making Changes

1. Edit `App.js` or create new components
2. Changes auto-reload in Expo Go app
3. Check console for errors
4. Test on both iOS and Android when possible

### Testing OCR

1. Prepare sample bill images
2. Test with various formats and qualities
3. Verify text extraction accuracy
4. Adjust parsing logic as needed

### Code Style

- Use functional components with hooks
- Follow React Native best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and reusable

## Building for Production

### Android APK

```bash
eas build --platform android --profile preview
```

### iOS IPA (macOS required)

```bash
eas build --platform ios --profile preview
```

Note: You need to set up an Expo Application Services (EAS) account and configure `eas.json` for production builds.

## Troubleshooting

### Metro bundler issues
```bash
# Clear Metro bundler cache
npm start -- --clear
```

### Dependency issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### iOS-specific issues
```bash
cd ios
pod install
cd ..
```

### Android-specific issues
```bash
cd android
./gradlew clean
cd ..
```

## Useful Commands

```bash
# Start with cleared cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web

# Check for outdated packages
npm outdated

# Update Expo SDK
npx expo upgrade
```

## Environment Variables

Currently, the app doesn't require environment variables. If you add API keys or secrets in the future:

1. Create `.env` file (already in .gitignore)
2. Use `expo-constants` to access them
3. Never commit secrets to version control

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Tesseract.js Documentation](https://tesseract.projectnaptha.com/)
- [React Navigation](https://reactnavigation.org/) (if you add navigation)
- [Expo Camera Docs](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo Image Picker Docs](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
