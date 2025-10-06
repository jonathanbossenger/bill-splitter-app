# Usage Examples

## Example 1: Scanning a Restaurant Bill

### Scenario
You're at a restaurant with friends and want to split the bill. Here's how to use the app:

### Steps

1. **Launch the App**
   - Open the Bill Splitter app on your device
   - You'll see the home screen with two options

2. **Grant Permissions (First Time Only)**
   - When prompted, tap "Allow" for camera access
   - When prompted, tap "Allow" for photo library access

3. **Capture the Bill**
   - Tap "📷 Take Photo"
   - Point camera at the bill
   - Ensure good lighting and the text is clear
   - Tap the capture button
   - Adjust/crop if needed
   - Tap "Use Photo"

4. **Wait for Processing**
   - The app will display "Processing image..."
   - This usually takes 5-15 seconds
   - OCR extraction is happening

5. **Review the Results**
   - See the captured image at the top
   - Below, see "Bill Items (X)" with the count
   - Each item shows:
     - Item name on the left
     - Price on the right

6. **Scan Another Bill**
   - Tap "Scan Another Bill" to process a new bill
   - Returns to the home screen

## Example 2: Using Gallery Images

### Scenario
You took a photo of the bill earlier and want to process it now.

### Steps

1. **Open the App**
   - Launch Bill Splitter

2. **Select from Gallery**
   - Tap "🖼️ Choose from Gallery"
   - Browse your photo library
   - Select the bill image
   - Crop/adjust if needed
   - Tap "Choose"

3. **Processing and Results**
   - Same as Example 1, steps 4-6

## Sample OCR Output

### Input Bill:
```
Mario's Italian Restaurant
123 Main Street

Spaghetti Carbonara    $18.99
Caesar Salad           $12.50
Margherita Pizza       $16.99
Garlic Bread           $6.50
Tiramisu               $8.99
Espresso               $4.50

Subtotal              $68.47
Tax                    $6.85
Total                 $75.32
```

### App Output:
```
Bill Items (9)

Item Name                    Price
─────────────────────────────────
Spaghetti Carbonara         $18.99
Caesar Salad                $12.50
Margherita Pizza            $16.99
Garlic Bread                 $6.50
Tiramisu                     $8.99
Espresso                     $4.50
Subtotal                    $68.47
Tax                          $6.85
Total                       $75.32
```

## Tips for Best Results

### Lighting
- ✅ Use natural light when possible
- ✅ Ensure text is well-lit
- ❌ Avoid shadows on the bill
- ❌ Avoid glare from lights

### Image Quality
- ✅ Hold camera steady
- ✅ Keep bill flat and straight
- ✅ Fill the frame with the bill
- ❌ Don't blur the image
- ❌ Avoid tilted angles

### Bill Preparation
- ✅ Flatten crumpled bills
- ✅ Clean off any dirt or stains
- ✅ Ensure text is legible
- ❌ Don't fold the bill

### What Gets Detected
The app looks for:
- Item names (text)
- Prices (numbers with decimals)
- Common formats: $12.99, 12.99, 12,99

## Common Scenarios

### Scenario 1: Long Receipt
**Problem**: Receipt is too long to fit in one photo

**Solution**: 
- Take a photo of just the itemized section
- Or take multiple photos and scan separately

### Scenario 2: Handwritten Bill
**Problem**: OCR struggles with handwriting

**Solution**:
- OCR works best with printed text
- For handwritten bills, may need manual entry
- Consider requesting printed receipt

### Scenario 3: Poor Quality Image
**Problem**: No items detected or incorrect items

**Solution**:
- Retake photo with better lighting
- Use camera instead of gallery
- Hold phone steady
- Ensure focus is sharp

### Scenario 4: Multiple Bills
**Problem**: Need to scan several bills

**Solution**:
- Scan first bill
- Tap "Scan Another Bill"
- Repeat process
- (Future: App could save history)

## Expected Results

### Good Results
- Clear item names
- Accurate prices
- All items detected
- Minimal false positives

### Factors Affecting Accuracy
1. **Image Quality** (most important)
   - Resolution
   - Focus
   - Lighting
   
2. **Bill Format**
   - Printed vs handwritten
   - Font size and style
   - Layout clarity

3. **OCR Processing**
   - Language support (English)
   - Text recognition model
   - Device performance

## Advanced Usage

### Custom Parsing
If certain items aren't detected correctly, the parsing algorithm can be adjusted in the code to handle specific formats.

### Multiple Currencies
Currently supports common formats:
- USD: $12.99
- EUR: 12,99
- Generic: 12.99

### Date and Time
Currently not extracted, but could be added to identify:
- Restaurant name
- Date/time of transaction
- Server name
- Table number

## Limitations

Current limitations to be aware of:

1. **OCR Accuracy**
   - Not 100% accurate
   - Depends on image quality
   - May miss some items

2. **No Bill Splitting**
   - Only extracts items
   - Doesn't calculate splits yet
   - Manual split needed

3. **No History**
   - Doesn't save scanned bills
   - Each scan is independent
   - Screenshots needed for records

4. **Language Support**
   - Currently English only
   - Other languages may work but untested

## Next Steps

After scanning your bill:
1. Verify all items are detected
2. Manual entry for missing items
3. Use calculator for splitting
4. Share results with friends

Future versions will add:
- Automatic bill splitting
- History and saved bills
- Export and sharing features
- Improved accuracy
