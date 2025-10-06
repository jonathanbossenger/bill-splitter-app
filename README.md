# Bill Splitter App

A React Native mobile app built with Expo that allows users to scan restaurant bills using their device camera or select images from their gallery. The app uses OCR (Optical Character Recognition) to extract and display bill items.

## Features

- 📷 **Camera Integration**: Take photos of bills directly from your device camera
- 🖼️ **Gallery Support**: Select bill images from your device gallery
- 🔍 **OCR Text Recognition**: Automatically extract text and items from bill images
- 📋 **Item Display**: View parsed bill items with names and prices
- 🎨 **User-Friendly UI**: Clean and intuitive interface

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jonathanbossenger/bill-splitter-app.git
cd bill-splitter-app
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Development Server
Start the Expo development server:
```bash
npm start
```

### Platform-Specific Commands

**Android:**
```bash
npm run android
```

**iOS:** (macOS required)
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

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
- **expo-camera**: Camera functionality
- **expo-image-picker**: Image selection from gallery
- **Tesseract.js**: OCR text extraction from images

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
2. **OCR Processing**: The image is processed using text recognition
3. **Text Parsing**: Extracted text is parsed to identify items and prices
4. **Display**: Items are displayed in a clean, organized list

## Future Enhancements

- Split bill between multiple people
- Calculate individual shares and tips
- Export bill details
- Save bill history
- Enhanced OCR accuracy with ML models

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
