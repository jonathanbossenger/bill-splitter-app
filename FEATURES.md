# App Features Documentation

## Overview
The Bill Splitter app is a React Native mobile application built with Expo that enables users to scan restaurant bills and extract itemized information using OCR technology.

## Key Features

### 1. Camera Integration
- Users can capture bill images directly using their device camera
- Utilizes `expo-camera` for camera access
- Requests camera permissions on first use

### 2. Gallery Image Selection
- Users can select bill images from their device photo gallery
- Utilizes `expo-image-picker` for image selection
- Supports image editing before selection

### 3. OCR Processing
- Demonstrates bill processing workflow
- Shows how to structure OCR integration
- Currently uses sample data for demonstration
- Ready for cloud OCR service integration

### Cloud OCR Integration Options

For production deployment, you can integrate with:

**Google Cloud Vision API**
```javascript
import vision from '@google-cloud/vision';

const processImage = async (imageUri) => {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection(imageUri);
  const text = result.fullTextAnnotation.text;
  return parseReceiptText(text);
};
```

**AWS Textract**
```javascript
import AWS from 'aws-sdk';

const textract = new AWS.Textract();
const processImage = async (imageUri) => {
  const params = { Document: { Bytes: imageData } };
  const result = await textract.detectDocumentText(params).promise();
  const text = result.Blocks.map(block => block.Text).join('\n');
  return parseReceiptText(text);
};
```

**Azure Computer Vision**
```javascript
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';

const processImage = async (imageUri) => {
  const result = await client.recognizePrintedText(true, imageUri);
  const text = extractTextFromResult(result);
  return parseReceiptText(text);
};
```

### 4. Bill Item Parsing
- Automatically identifies items and prices from extracted text
- Matches price patterns: $12.99, 12.99, 12,99
- Filters out non-item text
- Displays items in a clean, organized list

### 5. User Interface
- Clean, modern design with intuitive navigation
- Visual feedback during image processing
- Ability to scan multiple bills in sequence

## App Flow

1. **Home Screen**
   - Displays two primary buttons
   - "Take Photo" - Opens camera
   - "Choose from Gallery" - Opens photo picker

2. **Permission Request**
   - First-time users are prompted for permissions
   - Camera permission for taking photos
   - Media library permission for gallery access

3. **Image Capture/Selection**
   - User captures or selects a bill image
   - Image can be edited/cropped before confirmation

4. **Processing**
   - Loading indicator shown during OCR processing
   - "Processing image... This may take a moment" message

5. **Results Display**
   - Captured image displayed at top
   - List of extracted items with names and prices
   - "Bill Items (X)" header showing item count

6. **Reset/Continue**
   - "Scan Another Bill" button to start over
   - Returns to home screen for new scan

## Technical Implementation

### State Management
```javascript
const [image, setImage] = useState(null);           // Current bill image URI
const [billItems, setBillItems] = useState([]);     // Extracted bill items
const [isProcessing, setIsProcessing] = useState(false); // Processing status
```

### OCR Processing
The app demonstrates the OCR workflow:
- Creates a processing state while analyzing
- Shows loading indicator to user
- Currently uses sample data for demonstration
- Designed to be replaced with actual OCR service

### Text Parsing
Smart parsing algorithm that:
- Splits text into lines
- Identifies price patterns using regex
- Extracts item names by removing prices
- Filters out irrelevant lines

## Permissions Required

### iOS
- `NSCameraUsageDescription`: Camera access for scanning bills
- `NSPhotoLibraryUsageDescription`: Photo library access for selecting images

### Android
- `CAMERA`: Camera access
- `READ_EXTERNAL_STORAGE`: Read photos from storage
- `WRITE_EXTERNAL_STORAGE`: Save captured photos

## Performance Considerations

- OCR processing happens on-device
- Processing time varies based on image quality and size
- Better image quality = better OCR results
- Recommended: Well-lit, clear bill images

## Future Enhancements

1. **Bill Splitting**
   - Split total among multiple people
   - Assign items to specific individuals
   - Calculate per-person totals

2. **Tip Calculator**
   - Add tip percentage
   - Calculate final amounts with tip

3. **History**
   - Save scanned bills
   - View past bills
   - Export to PDF or share

4. **Enhanced OCR**
   - Support for multiple languages
   - Better accuracy with preprocessing
   - Recognition of restaurant names and dates

5. **Social Features**
   - Share split bills with friends
   - Payment integration (Venmo, PayPal, etc.)
   - Group expense tracking

## Troubleshooting

### No items detected
- Ensure good lighting when capturing image
- Make sure text is clear and readable
- Try different angles or cropping
- Use high-quality images

### Permission issues
- Check device settings for app permissions
- Re-install app if permissions are stuck
- Grant permissions when prompted

### Processing takes too long
- Large images take longer to process
- Crop image to show only relevant content
- Ensure device has sufficient memory

## Development Tips

### Running the App
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator (macOS only)
npm run web        # Run in web browser
```

### Debugging
- Use React DevTools for component inspection
- Check Metro bundler console for errors
- Use `console.log` for debugging OCR results

### Testing OCR
- Start with simple, clear bill images
- Test with various bill formats
- Verify parsing logic with different price formats
