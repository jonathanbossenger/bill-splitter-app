# Testing ML Kit Integration

This document describes how to test the ML Kit text recognition integration in the Bill Splitter app.

## Prerequisites

Before testing, ensure you have:
1. Installed all dependencies: `npm install`
2. Set up an iOS device/simulator (macOS) or Android device/emulator
3. Expo Go app installed on your device (optional)

## Testing on Real Devices

### iOS Testing

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on iOS:**
   ```bash
   npm run ios
   ```

3. **Test the camera functionality:**
   - Tap "📷 Take Photo" button
   - Grant camera permissions when prompted
   - Take a photo of a restaurant bill
   - Verify that ML Kit recognizes the text
   - Check that bill items are correctly parsed

4. **Test the gallery functionality:**
   - Tap "🖼️ Choose from Gallery" button
   - Grant photo library permissions when prompted
   - Select a bill image from your gallery
   - Verify that ML Kit recognizes the text
   - Check that bill items are correctly parsed

### Android Testing

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on Android:**
   ```bash
   npm run android
   ```

3. **Follow the same testing steps as iOS**

## ML Kit Features to Test

### 1. Text Recognition Accuracy
- Test with various bill formats (receipts, invoices, etc.)
- Test with different fonts and text sizes
- Test with different lighting conditions
- Test with angled or skewed images

### 2. Price Detection
The app should correctly identify prices in these formats:
- `$12.99`
- `12.99`
- `12,99`
- Multiple items with prices

### 3. Item Parsing
Verify that the app correctly:
- Extracts item names
- Extracts prices
- Filters out irrelevant text (headers, footers, etc.)
- Handles items without prices

### 4. Performance
- ML Kit should process images quickly (1-3 seconds typically)
- Processing should show loading indicator
- No UI freezing during processing

## Expected Behavior

### Success Case
1. User selects or takes photo of a bill
2. "Processing image..." message appears
3. Within a few seconds, bill items are displayed
4. Items show name and price in a list
5. User can tap "Scan Another Bill" to start over

### Error Cases
1. **Permission Denied:**
   - Alert shows "Permission Required" message
   - User can grant permissions in device settings

2. **Processing Error:**
   - Alert shows "Error" message with retry instruction
   - User can try again with a different image

3. **No Items Detected:**
   - Message shows "No items detected. Try another image."
   - User can scan another bill

## Sample Test Bills

For testing, use bills with:
- Clear, readable text
- Good lighting
- Straight (not angled) view
- Multiple items with prices
- Standard receipt format

## Debugging

### View Recognized Text
Check the console logs to see the raw text recognized by ML Kit:
```javascript
console.log('Recognized text:', recognizedText);
```

### Common Issues

1. **No text recognized:**
   - Ensure image has good lighting
   - Try a clearer image
   - Check that bill text is readable

2. **Incorrect prices:**
   - Verify price format matches regex: `/(\$?\d+[.,]\d{2})/`
   - Check console for recognized text

3. **Missing items:**
   - Some text may be filtered out
   - Check parsing logic in `parseReceiptText()`

## Performance Testing

Test ML Kit performance with:
- Small images (< 1MB)
- Large images (> 5MB)
- High resolution images
- Different image orientations (portrait, landscape)

Expected processing times:
- Small images: < 1 second
- Medium images: 1-2 seconds
- Large images: 2-3 seconds

## Verification Checklist

- [ ] Camera permission requested and granted
- [ ] Gallery permission requested and granted
- [ ] Photo capture works correctly
- [ ] Gallery selection works correctly
- [ ] ML Kit recognizes text from images
- [ ] Bill items are correctly parsed
- [ ] Prices are correctly extracted
- [ ] Item names are correctly extracted
- [ ] Processing indicator shows during OCR
- [ ] Results display after processing
- [ ] "Scan Another Bill" button resets the app
- [ ] Error handling works for failed recognition
- [ ] Console logs show recognized text

## Platform-Specific Notes

### iOS
- ML Kit uses on-device processing
- No internet connection required
- Permissions must be granted in app settings

### Android
- ML Kit uses on-device processing
- No internet connection required
- Permissions requested at runtime

## Additional Resources

- [ML Kit Documentation](https://developers.google.com/ml-kit/vision/text-recognition/v2)
- [@react-native-ml-kit/text-recognition](https://www.npmjs.com/package/@react-native-ml-kit/text-recognition)
- [React Native ML Kit GitHub](https://github.com/a7medev/react-native-ml-kit)
