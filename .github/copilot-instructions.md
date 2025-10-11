# Copilot Instructions for Bill Splitter App

## Project Overview

This is a React Native mobile app built with Expo that allows users to scan restaurant bills using their device camera or gallery. The app uses Google's ML Kit for on-device OCR (Optical Character Recognition) to extract and display bill items with prices.

## Technology Stack

- **Framework**: React Native with Expo SDK ~54.0.12
- **OCR Engine**: Google ML Kit (@react-native-ml-kit/text-recognition v2.0.0)
- **Camera**: expo-camera (v17.0.8)
- **Image Selection**: expo-image-picker (v17.0.8)
- **React Version**: 19.1.0
- **React Native Version**: 0.81.4

## Key Architecture Principles

### Single Component Structure
- The entire app logic is in `App.js` (~270 lines)
- Uses functional components with React hooks
- No separate component files (intentionally kept simple)

### State Management
- Uses React's `useState` hook exclusively
- Three main state variables:
  - `image`: URI of the selected/captured image
  - `billItems`: Array of parsed bill items
  - `isProcessing`: Boolean for loading states

### ML Kit Integration
- **IMPORTANT**: This app uses native modules and CANNOT run in Expo Go
- Must use Expo Development Build (EAS Build)
- OCR processing is on-device (offline, privacy-focused)
- Text recognition typically completes in 1-3 seconds

## Development Guidelines

### Code Style
- Use functional components with hooks (no class components)
- Follow React Native best practices
- Use meaningful variable names
- Add comments for complex logic only
- Keep the single-file structure unless there's a strong reason to refactor

### File Structure
```
bill-splitter-app/
├── App.js                  # Main application (DO NOT SPLIT unless necessary)
├── app.json               # Expo configuration with permissions
├── package.json           # Dependencies
├── eas.json              # EAS Build configuration
├── index.js              # Entry point (minimal, just renders App)
├── assets/               # App icons and images
└── [Multiple .md files]  # Comprehensive documentation
```

### Building and Testing

**CRITICAL**: This app requires native modules:
1. Cannot use `expo start` with Expo Go
2. Must build with: `eas build --profile development --platform [android|ios]`
3. For testing changes, use development build workflow
4. Web platform has limited support (camera APIs not available)

### Running the Development Server
```bash
npm install                    # Install dependencies
eas build --profile development --platform android  # Build for testing
npx expo start --dev-client   # Start server for dev build
```

### Common Commands
- `npm start`: Start Expo dev server (requires dev build, not Expo Go)
- `npm run android`: Run Android build
- `npm run ios`: Run iOS build (macOS only)
- `npm run web`: Run web version (limited functionality)

## Code Modification Guidelines

### When Adding Features
1. **Permissions**: Always check and request permissions before using camera/gallery
2. **Error Handling**: Use try-catch blocks for async operations
3. **User Feedback**: Show loading states and error messages via Alert
4. **ML Kit Usage**: Always handle potential ML Kit errors gracefully

### OCR Processing Pattern
```javascript
try {
  const result = await TextRecognition.recognize(imageUri);
  // Process result.text and result.blocks
} catch (error) {
  Alert.alert('Error', 'Failed to process image');
}
```

### Text Parsing Logic
- Current parsing looks for patterns like: `$12.99`, `12.99`, `12,99`
- Matches item names followed by prices
- Be cautious when modifying regex patterns in the parsing function

### Styling
- Uses React Native StyleSheet
- All styles defined at bottom of App.js
- Follows a clean, minimal design with blue (#007AFF) as primary color

## Dependencies Management

### Adding Dependencies
- Always use `npx expo install <package>` instead of `npm install`
- This ensures compatibility with the Expo SDK version
- Check package compatibility with Expo SDK 54

### Native Module Considerations
- If adding packages with native code, the app will need rebuilding
- Update the eas.json configuration if needed
- Test on both iOS and Android platforms

## Testing Considerations

### Manual Testing Checklist
1. Test camera permissions on first launch
2. Test gallery permissions
3. Test with various bill formats
4. Test with different lighting conditions
5. Test parsing accuracy with different currencies
6. Test error scenarios (no permissions, cancelled selection, etc.)

### Known Limitations
- OCR works best with printed text (not handwritten)
- Requires good lighting for accurate text recognition
- Complex bill layouts may not parse perfectly
- App needs device build (cannot use Expo Go)

## Documentation

The repository includes extensive documentation:
- **README.md**: Project overview and installation
- **DEVELOPMENT.md**: Development setup guide
- **FEATURES.md**: Detailed feature documentation
- **ARCHITECTURE.md**: System architecture
- **ML_KIT_GUIDE.md**: ML Kit integration guide
- **TESTING.md**: Testing guide
- **USAGE.md**: Usage examples and tips
- **QUICKSTART.md**: Quick start guide

**When making changes, update relevant documentation files.**

## Common Pitfalls to Avoid

1. **Don't suggest using Expo Go** - This app requires native modules
2. **Don't split App.js unnecessarily** - Keep the simple structure unless there's a compelling reason
3. **Don't add Tesseract.js** - We use ML Kit, not Tesseract (despite some outdated docs)
4. **Don't forget permissions** - Always handle camera/gallery permissions
5. **Don't ignore error handling** - ML Kit operations can fail
6. **Don't modify parsing without testing** - The regex patterns are tuned for common bill formats

## Security and Privacy

- All OCR processing happens on-device
- No data is sent to external servers
- No API keys required
- Respect user privacy - don't log sensitive bill data

## Future Enhancement Areas

If extending functionality, consider:
- Bill splitting calculations (currently only displays items)
- Bill history storage
- Export functionality
- Multiple currency support
- Enhanced parsing for complex bill formats
- Receipt scanning from multiple photos
- Share functionality

## Environment Configuration

- No environment variables currently required
- If adding API keys, use `.env` file (already in .gitignore)
- Never commit secrets to version control

## Build Configuration

### eas.json Profiles
- `development`: For testing with dev client
- `preview`: For testing builds
- `production`: For app store releases

When suggesting build commands, always specify the correct profile.
