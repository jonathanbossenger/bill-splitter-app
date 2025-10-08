# Bill Splitter App

A React Native mobile app built with Expo that allows users to scan restaurant bills using their device camera or select images from their gallery. The app uses OCR (Optical Character Recognition) to extract and display bill items.

## Features

- 📷 **Camera Integration**: Take photos of bills directly from your device camera
- 🖼️ **Gallery Support**: Select bill images from your device gallery
- 🔍 **OCR Text Recognition**: Real text recognition using Google's ML Kit (on-device)
- 📋 **Item Display**: View parsed bill items with names and prices
- 🎨 **User-Friendly UI**: Clean and intuitive interface
- 🔒 **Privacy-Focused**: All processing happens on your device (offline)

## OCR Implementation

This app uses **Google's ML Kit** for on-device text recognition, providing:
- ✅ Real text recognition from bill images
- ✅ Offline processing (no internet required)
- ✅ Privacy-focused (data stays on device)
- ✅ Fast performance (1-3 seconds)
- ✅ Multi-language support

**Important:** ML Kit requires native modules and **cannot run in Expo Go**. You must use **Expo Development Build** to test and run this app.

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo account (free) - [Sign up here](https://expo.dev)
- EAS CLI for building the app

### Step 1: Clone and Install

1. Clone the repository:
```bash
git clone https://github.com/jonathanbossenger/bill-splitter-app.git
cd bill-splitter-app
```

2. Install dependencies:
```bash
npm install
```

### Step 2: Set Up EAS Build (Required for ML Kit)

Since this app uses ML Kit (a native module), you **cannot use Expo Go**. You need to create a development build:

1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Log in to your Expo account:
```bash
eas login
```

3. Configure the project for EAS:
```bash
eas build:configure
```

This will create an `eas.json` file in your project.

## Building and Running the App

### Option 1: Build Development Version for Testing (Recommended)

This creates a development build that you can install on your device for testing.

#### For Android:

1. Build the development APK:
```bash
eas build --profile development --platform android
```

2. Once the build completes, you'll get a download link. Download and install the APK on your Android device.

3. Start the development server:
```bash
npx expo start --dev-client
```

4. Scan the QR code with your development build app.

#### For iOS:

1. Build the development version:
```bash
eas build --profile development --platform ios
```

2. For testing on a physical device, you'll need to:
   - Register your device UDID with your Apple Developer account
   - Or use the internal distribution method
   
   Follow the EAS CLI prompts to register your device.

3. Download and install the build on your iOS device using the provided link.

4. Start the development server:
```bash
npx expo start --dev-client
```

5. Scan the QR code with your development build app.

### Option 2: Build for Simulator/Emulator

#### Android Emulator:

1. Build for Android simulator:
```bash
eas build --profile development --platform android
```

2. Download the APK and install it on your emulator:
```bash
adb install path/to/downloaded.apk
```

3. Start the development server:
```bash
npx expo start --dev-client
```

#### iOS Simulator (macOS only):

1. Build for iOS simulator:
```bash
eas build --profile development --platform ios --local
```

2. The build will create a `.app` file that you can drag into the iOS Simulator.

3. Start the development server:
```bash
npx expo start --dev-client
```

### Option 3: Local Development Build (Advanced)

If you prefer to build locally instead of using EAS cloud builds:

#### Android:
```bash
npx expo run:android
```

This will:
- Build the native Android app locally
- Install it on your connected device/emulator
- Start the Metro bundler

#### iOS (macOS only):
```bash
npx expo run:ios
```

This will:
- Build the native iOS app locally using Xcode
- Install it on your simulator
- Start the Metro bundler

**Note:** Local builds require Android Studio (for Android) or Xcode (for iOS) to be installed.

## Quick Start Guide

If you just want to test the app quickly:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for your platform** (choose one):
   
   **Android (easiest):**
   ```bash
   eas build --profile development --platform android
   npx expo start --dev-client
   ```
   
   **iOS:**
   ```bash
   eas build --profile development --platform ios
   npx expo start --dev-client
   ```

3. **Install the build** on your device using the download link from EAS

4. **Open the app** and scan the QR code from the terminal

## Troubleshooting

### "Module not found" or "Native module not found" errors

This means you're trying to use Expo Go, which doesn't support native modules. You must build a development build using the instructions above.

### Build fails on EAS

- Make sure you're logged in: `eas login`
- Check your internet connection
- Verify your app.json configuration is valid
- Check EAS build logs for specific errors

### App crashes on startup

- Make sure you built with the `development` profile
- Check that expo-dev-client is installed: `npx expo install expo-dev-client`
- Clear the app data and reinstall

### OCR not working

- Make sure you granted camera permissions
- Try with a clear, well-lit image
- Check the console logs for error messages
- Verify the image is not too large (try reducing quality)

## Development Notes

### Why Not Expo Go?

Expo Go is a pre-built app that can run JavaScript-based Expo apps. However, it **cannot run apps with native modules** like ML Kit because:

1. Native modules require native code compilation
2. Expo Go is pre-compiled and cannot add new native modules
3. ML Kit requires platform-specific (Android/iOS) native code

**Solution:** Use Expo Development Build, which creates a custom version of your app with all the native modules you need.

### What is Expo Development Build?

A development build is like Expo Go, but customized for your app:
- ✅ Includes your native modules (ML Kit)
- ✅ Works just like Expo Go (hot reload, fast refresh)
- ✅ Can be installed on your device for testing
- ✅ Supports all Expo SDK features

### EAS Build vs Local Build

**EAS Build (Recommended for beginners):**
- Builds happen in the cloud
- No need to install Android Studio or Xcode
- Consistent build environment
- Easier to set up

**Local Build:**
- Builds happen on your machine
- Requires Android Studio/Xcode installed
- Faster builds (no upload/download)
- Good for advanced developers

## Usage

1. Launch the app on your device or emulator
2. Grant camera and media library permissions when prompted
3. Choose one of two options:
   - **Take Photo**: Use your device camera to capture a bill
   - **Choose from Gallery**: Select an existing bill image
4. The app will process the image and extract bill items
5. View the extracted items with their names and prices
6. Tap "Scan Another Bill" to process a new bill

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **@react-native-ml-kit/text-recognition**: Google ML Kit for on-device OCR
- **expo-dev-client**: Custom development builds
- **expo-camera**: Camera functionality
- **expo-image-picker**: Image selection from gallery
- **expo-image-manipulator**: Image processing utilities

## Permissions

The app requires the following permissions:
- **Camera**: To capture bill images
- **Photo Library**: To select images from gallery

## Project Structure

```
bill-splitter-app/
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── assets/               # Image assets
└── node_modules/         # Dependencies
```

## How It Works

1. **Image Capture**: User captures or selects a bill image
2. **ML Kit OCR**: The image is processed using Google's ML Kit on-device
3. **Text Parsing**: Extracted text is parsed to identify items and prices
4. **Display**: Items are displayed in a clean, organized list

### OCR Processing Flow

```
Image → ML Kit Text Recognition → Parse Text → Extract Items → Display
```

The app uses ML Kit's `recognize()` method which:
- Runs entirely on the device
- Works offline
- Processes images in 1-3 seconds
- Supports multiple languages and scripts

## Future Enhancements

- Split bill between multiple people
- Calculate individual shares and tips
- Export bill details
- Save bill history
- Support for multiple languages with ML Kit's script support

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
