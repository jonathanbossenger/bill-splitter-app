# App Architecture

## Component Flow Diagram

```
┌─────────────────────────────────────────────────┐
│              Bill Splitter App                  │
│                  (App.js)                       │
└─────────────────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │    Initial State        │
        │  - image: null          │
        │  - billItems: []        │
        │  - isProcessing: false  │
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │     Home Screen         │
        │  ┌──────────────────┐   │
        │  │  📷 Take Photo   │   │
        │  └──────────────────┘   │
        │  ┌──────────────────┐   │
        │  │ 🖼️  Gallery     │   │
        │  └──────────────────┘   │
        └─────────────────────────┘
              │              │
              │              │
    ┌─────────┴──┐      ┌───┴──────────┐
    │            │      │              │
    ▼            ▼      ▼              ▼
┌────────┐  ┌────────┐ ┌────────┐  ┌────────┐
│Request │  │Launch  │ │Request │  │Launch  │
│Camera  │→ │Camera  │ │Gallery │→ │Image   │
│Permit  │  │        │ │Permit  │  │Picker  │
└────────┘  └────────┘ └────────┘  └────────┘
    │            │          │            │
    └────────────┴──────────┴────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  Image Selected  │
            │  - setImage()    │
            └──────────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  processImage()  │
            │  ┌────────────┐  │
            │  │ Tesseract  │  │
            │  │ OCR Worker │  │
            │  └────────────┘  │
            └──────────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  Text Extracted  │
            └──────────────────┘
                      │
                      ▼
          ┌────────────────────────┐
          │   parseReceiptText()   │
          │  ┌──────────────────┐  │
          │  │ Split into lines │  │
          │  │ Match prices     │  │
          │  │ Extract items    │  │
          │  │ Filter text      │  │
          │  └──────────────────┘  │
          └────────────────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  setBillItems()  │
            └──────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │    Results Screen       │
        │  ┌──────────────────┐   │
        │  │ [Image Preview]  │   │
        │  └──────────────────┘   │
        │                         │
        │  Bill Items (X)         │
        │  ┌──────────────────┐   │
        │  │ Item 1    $12.99 │   │
        │  │ Item 2    $8.50  │   │
        │  │ Item 3    $15.00 │   │
        │  └──────────────────┘   │
        │                         │
        │  ┌──────────────────┐   │
        │  │ Scan Another     │   │
        │  └──────────────────┘   │
        └─────────────────────────┘
```

## Data Flow

```
User Action → Permission Check → Image Capture → OCR Processing → Text Parsing → Display Results
```

### Detailed Data Flow

1. **User Input**
   - Button press (Camera or Gallery)
   
2. **Permission Layer**
   ```javascript
   requestPermissions()
   ├── Camera.requestCameraPermissionsAsync()
   └── ImagePicker.requestMediaLibraryPermissionsAsync()
   ```

3. **Image Capture Layer**
   ```javascript
   takePhoto() or pickImage()
   ├── ImagePicker.launchCameraAsync()
   └── ImagePicker.launchImageLibraryAsync()
   ```

4. **Processing Layer**
   ```javascript
   processImage(imageUri)
   ├── createWorker('eng')
   ├── worker.recognize(imageUri)
   ├── Extract text
   └── worker.terminate()
   ```

5. **Parsing Layer**
   ```javascript
   parseReceiptText(text)
   ├── Split text into lines
   ├── Match price patterns: /(\$?\d+[.,]\d{2})/
   ├── Extract item names
   ├── Filter irrelevant text
   └── Return array of items
   ```

6. **Display Layer**
   ```javascript
   FlatList
   ├── renderItem()
   └── Display items with prices
   ```

## State Management

```
┌─────────────────────────────────┐
│         App State               │
├─────────────────────────────────┤
│ image: string | null            │
│ billItems: Array<BillItem>      │
│ isProcessing: boolean           │
└─────────────────────────────────┘

BillItem {
  id: string
  name: string
  price: string
  fullText: string
}
```

## Technology Stack Layers

```
┌──────────────────────────────────────┐
│         User Interface               │
│  React Native Components             │
│  (View, Text, TouchableOpacity, etc) │
└──────────────────────────────────────┘
                  │
┌──────────────────────────────────────┐
│         Business Logic               │
│  - Permission handling               │
│  - Image processing                  │
│  - Text parsing                      │
└──────────────────────────────────────┘
                  │
┌──────────────────────────────────────┐
│         Native APIs                  │
│  - expo-camera                       │
│  - expo-image-picker                 │
└──────────────────────────────────────┘
                  │
┌──────────────────────────────────────┐
│         OCR Engine                   │
│  - Tesseract.js                      │
│  - WASM-based text recognition       │
└──────────────────────────────────────┘
                  │
┌──────────────────────────────────────┐
│      Platform (iOS/Android/Web)      │
│  - Camera hardware                   │
│  - File system                       │
│  - Permissions system                │
└──────────────────────────────────────┘
```

## File Organization

```
bill-splitter-app/
│
├── App.js                    # Main application logic
│   ├── Component definition
│   ├── State hooks
│   ├── Permission functions
│   ├── Image capture functions
│   ├── OCR processing
│   ├── Text parsing
│   ├── UI rendering
│   └── Styles
│
├── index.js                  # Entry point (renders App)
│
├── app.json                  # Expo configuration
│   ├── Platform configs
│   ├── Permissions
│   └── Plugins
│
├── package.json              # Dependencies
│   ├── expo packages
│   ├── React Native
│   └── Tesseract.js
│
├── assets/                   # App resources
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
└── Documentation/
    ├── README.md            # Overview
    ├── FEATURES.md          # Feature details
    ├── DEVELOPMENT.md       # Dev setup
    ├── USAGE.md             # Usage guide
    ├── SUMMARY.md           # Implementation summary
    └── ARCHITECTURE.md      # This file
```

## Permission Flow

```
                  App Launch
                      │
                      ▼
            First Camera/Gallery Access
                      │
                      ▼
          ┌────────────────────────┐
          │  requestPermissions()  │
          └────────────────────────┘
                │            │
         ┌──────┴───┐   ┌───┴──────┐
         ▼          ▼   ▼          ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │ Camera │  │Gallery │  │ Camera │
    │ Prompt │  │ Prompt │  │Granted │
    └────────┘  └────────┘  └────────┘
         │          │          │
         ▼          ▼          ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │ Grant  │  │ Grant  │  │Gallery │
    │        │  │        │  │Granted │
    └────────┘  └────────┘  └────────┘
         │          │          │
         └──────────┴──────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Both Granted  │
            │ return true   │
            └───────────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Proceed with  │
            │ image capture │
            └───────────────┘
```

## Error Handling Flow

```
Any Function Call
      │
      ▼
  try-catch
      │
      ├─ Success → Continue
      │
      └─ Error
           │
           ▼
      console.error()
           │
           ▼
      Alert.alert()
           │
           ▼
    User Notification
           │
           ▼
      Graceful Fallback
```

## Processing States

```
Initial State
    │
    ├─ image: null
    ├─ billItems: []
    └─ isProcessing: false
    
Capturing State
    │
    ├─ image: null
    ├─ billItems: []
    └─ isProcessing: false
    
Processing State
    │
    ├─ image: "file://..."
    ├─ billItems: []
    └─ isProcessing: true
    
Complete State
    │
    ├─ image: "file://..."
    ├─ billItems: [{...}, {...}]
    └─ isProcessing: false
```

## UI Component Hierarchy

```
App
├── StatusBar
└── View (container)
    ├── View (header)
    │   ├── Text (title)
    │   └── Text (subtitle)
    │
    └── Conditional Render
        │
        ├── [No Image] View (buttonContainer)
        │   ├── TouchableOpacity (Take Photo)
        │   │   └── Text
        │   └── TouchableOpacity (Gallery)
        │       └── Text
        │
        └── [Has Image] ScrollView (resultContainer)
            ├── Image (bill preview)
            │
            ├── [Processing] View
            │   ├── Text (processing)
            │   └── Text (subtext)
            │
            └── [Complete] Fragment
                ├── Text (items header)
                ├── FlatList
                │   └── View (itemContainer) [repeated]
                │       ├── Text (name)
                │       └── Text (price)
                └── TouchableOpacity (reset)
                    └── Text
```

## Performance Considerations

1. **OCR Processing**
   - Runs in Web Worker (Tesseract.js)
   - Doesn't block UI thread
   - Can take 5-15 seconds

2. **Image Handling**
   - Images stored as URIs
   - Not loaded into memory until needed
   - Native image components handle optimization

3. **List Rendering**
   - FlatList for efficient scrolling
   - Only renders visible items
   - Proper key extraction

4. **State Updates**
   - Minimal re-renders
   - State updates are batched
   - No unnecessary computations

## Security Considerations

1. **Permissions**
   - Explicit user permission requests
   - Clear permission messages
   - Graceful permission denial handling

2. **Data Privacy**
   - All processing happens on-device
   - No data sent to servers
   - No data persistence (yet)

3. **Image Handling**
   - Images stay in device storage
   - Temporary URIs used
   - No cloud uploads
