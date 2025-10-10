# ML Kit Integration Guide

This guide explains how ML Kit text recognition is integrated into the Bill Splitter app.

## Installation

The ML Kit text recognition package is already installed:

```bash
npm install @react-native-ml-kit/text-recognition
```

## Import

```javascript
import TextRecognition from '@react-native-ml-kit/text-recognition';
```

## Basic Usage

### Recognize Text from Image

```javascript
const processImage = async (imageUri) => {
  try {
    // Call ML Kit to recognize text
    const result = await TextRecognition.recognize(imageUri);
    
    // Extract the recognized text
    const recognizedText = result.text;
    
    // Process the text
    console.log('Recognized text:', recognizedText);
    
    return recognizedText;
  } catch (error) {
    console.error('Text recognition error:', error);
    throw error;
  }
};
```

### Response Structure

ML Kit returns a result object with the following structure:

```javascript
{
  text: string,              // Full recognized text
  blocks: [                  // Text blocks
    {
      text: string,          // Block text
      frame: {               // Bounding box
        x: number,
        y: number,
        width: number,
        height: number
      },
      lines: [               // Lines within the block
        {
          text: string,      // Line text
          frame: { ... },    // Line bounding box
          elements: [...]    // Individual text elements
        }
      ]
    }
  ]
}
```

## Advanced Usage

### Recognize Text with Specific Script

ML Kit supports multiple scripts. You can specify the script for better accuracy:

```javascript
import TextRecognition, { TextRecognitionScript } from '@react-native-ml-kit/text-recognition';

// For Latin script (default)
const result = await TextRecognition.recognize(imageUri, TextRecognitionScript.LATIN);

// For Chinese script
const result = await TextRecognition.recognize(imageUri, TextRecognitionScript.CHINESE);

// For Japanese script
const result = await TextRecognition.recognize(imageUri, TextRecognitionScript.JAPANESE);

// For Korean script
const result = await TextRecognition.recognize(imageUri, TextRecognitionScript.KOREAN);

// For Devanagari script
const result = await TextRecognition.recognize(imageUri, TextRecognitionScript.DEVANAGARI);
```

### Extract Structured Data

You can access individual text blocks and lines for more precise parsing:

```javascript
const processImage = async (imageUri) => {
  const result = await TextRecognition.recognize(imageUri);
  
  // Process each text block
  for (const block of result.blocks) {
    console.log('Block text:', block.text);
    console.log('Block frame:', block.frame);
    
    // Process each line in the block
    for (const line of block.lines) {
      console.log('Line text:', line.text);
      console.log('Line frame:', line.frame);
      
      // Process individual elements
      for (const element of line.elements) {
        console.log('Element text:', element.text);
      }
    }
  }
};
```

## Integration in Bill Splitter App

The app uses ML Kit in the `processImage` function:

```javascript
const processImage = async (imageUri) => {
  setIsProcessing(true);
  try {
    // Use ML Kit for text recognition
    const result = await TextRecognition.recognize(imageUri);
    
    // Extract the recognized text
    const recognizedText = result.text;
    
    // Parse the recognized text to extract bill items
    const extractedItems = parseReceiptText(recognizedText);
    
    setBillItems(extractedItems);
    
    // Log the recognized text for debugging
    console.log('Recognized text:', recognizedText);
  } catch (error) {
    console.error('Error processing image:', error);
    Alert.alert('Error', 'Failed to process the image. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};
```

## Text Parsing

After ML Kit recognizes the text, the app parses it to extract bill items:

```javascript
const parseReceiptText = (text) => {
  const lines = text.split('\n');
  const items = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.length > 0) {
      // Match prices in formats like: 12.99, 12,99, $12.99, etc.
      const priceMatch = trimmedLine.match(/(\$?\d+[.,]\d{2})/);
      
      if (priceMatch) {
        const price = priceMatch[0];
        const itemName = trimmedLine.replace(price, '').trim();
        
        if (itemName.length > 0) {
          items.push({
            id: `${index}-${Date.now()}`,
            name: itemName,
            price: price,
            fullText: trimmedLine,
          });
        }
      }
    }
  });
  
  return items;
};
```

## Performance Optimization

### Tips for Better Performance

1. **Image Quality:**
   - Use high-quality images for better recognition
   - Ensure good lighting
   - Avoid blurry or angled images

2. **Image Size:**
   - ML Kit works efficiently with images of various sizes
   - Consider resizing very large images (> 10MB) for faster processing

3. **Processing:**
   - ML Kit runs on-device, no network required
   - Processing is asynchronous, doesn't block UI
   - Typically completes in 1-3 seconds

### Example: Image Preprocessing

You can preprocess images before sending to ML Kit:

```javascript
import * as ImageManipulator from 'expo-image-manipulator';

const preprocessImage = async (imageUri) => {
  // Resize large images
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 1920 } }], // Resize to max width of 1920px
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );
  
  return manipulatedImage.uri;
};

const processImage = async (imageUri) => {
  setIsProcessing(true);
  try {
    // Preprocess the image
    const processedUri = await preprocessImage(imageUri);
    
    // Recognize text with ML Kit
    const result = await TextRecognition.recognize(processedUri);
    
    // Continue processing...
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsProcessing(false);
  }
};
```

## Error Handling

Always wrap ML Kit calls in try-catch blocks:

```javascript
try {
  const result = await TextRecognition.recognize(imageUri);
  // Process result
} catch (error) {
  if (error.code === 'E_ML_KIT_NOT_AVAILABLE') {
    Alert.alert('Error', 'ML Kit is not available on this device.');
  } else if (error.code === 'E_IMAGE_NOT_FOUND') {
    Alert.alert('Error', 'Image not found. Please try again.');
  } else {
    Alert.alert('Error', 'Failed to process the image. Please try again.');
  }
}
```

## Benefits of ML Kit

1. **On-Device Processing:**
   - Privacy-focused - no data sent to servers
   - Works offline - no internet required
   - Fast processing

2. **No API Costs:**
   - Free to use
   - No usage limits
   - No API keys needed

3. **Multi-Language Support:**
   - Supports multiple scripts
   - High accuracy for printed text
   - Recognizes various fonts

4. **Easy Integration:**
   - Simple API
   - Well-documented
   - Active community support

## Resources

- [ML Kit Official Documentation](https://developers.google.com/ml-kit/vision/text-recognition/v2)
- [@react-native-ml-kit/text-recognition NPM](https://www.npmjs.com/package/@react-native-ml-kit/text-recognition)
- [GitHub Repository](https://github.com/a7medev/react-native-ml-kit)
- [Simform Article](https://medium.com/simform-engineering/text-recognition-in-react-native-5421b769d07a)
