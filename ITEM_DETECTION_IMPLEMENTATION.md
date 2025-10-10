# Bill Item Detection Implementation

## Overview
This document describes the implementation of the `markItemLines` function and the updated `parseReceiptText` logic to properly detect and parse bill items, including multi-line item descriptions.

## Key Changes

### 1. Added `markItemLines` Function
This function determines which lines in the receipt text are part of bill items.

```javascript
const markItemLines = (lines) => {
  const priceRegex = /[\$\€\£]?\d+([.,]\d{2})?$/;
  const result = new Array(lines.length).fill(false);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const hasPrice = priceRegex.test(line);
    
    if (hasPrice) {
      // This line ends with a price, so mark it as an item line
      result[i] = true;
      
      // Also check if previous line(s) might be part of the same item (multiline description)
      let j = i - 1;
      while (j >= 0 && !priceRegex.test(lines[j].trim()) && lines[j].trim() !== '') {
        result[j] = true;
        j--;
      }
    }
  }
  
  return result;
};
```

**How it works:**
- Iterates through each line of the receipt text
- Tests if the line ends with a price pattern (currency symbol + number + optional decimals)
- When a price is found, marks that line and all preceding non-empty lines without prices as part of the same item
- Returns a boolean array where `true` indicates the line is part of a bill item

**Supported price formats:**
- `$12.99` - Dollar with decimals
- `€15,50` - Euro with comma decimal separator
- `£8.25` - Pound with decimals
- `10.50` - Plain number with decimals
- `5` - Plain number without decimals
- Any combination of `$`, `€`, `£` symbols with numbers

### 2. Updated `parseReceiptText` Function
The function now uses `markItemLines` to accurately identify and parse bill items.

**Key improvements:**
- Only processes lines marked as item lines by `markItemLines`
- Properly handles multi-line item descriptions
- Accumulates name lines until a price is found
- Combines multi-line names into a single item
- No longer includes non-item text (headers, footers, etc.) as "N/A" items

**Multi-line handling example:**
```
Input:
Super Delicious
Special Pasta
with Extra Cheese $25.99

Output:
name: "Super Delicious Special Pasta with Extra Cheese"
price: "$25.99"
```

### 3. Removed Fallback Logic
The previous implementation included a fallback that added lines without prices as items with "N/A" prices:

```javascript
// OLD - REMOVED
else if (trimmedLine.length > 3 && !trimmedLine.match(/^[\d\s\-\+\*\/\=]+$/)) {
  items.push({
    id: `${index}-${Date.now()}`,
    name: trimmedLine,
    price: 'N/A',
    fullText: trimmedLine,
  });
}
```

This caused issues where restaurant names, addresses, and other non-item text were included in the results. The new implementation only includes lines that are confirmed to be part of actual bill items.

## Benefits

1. **More Accurate Item Detection**: Only lines that end with prices (or are part of multi-line items) are included
2. **Multi-line Support**: Items with descriptions spanning multiple lines are properly combined
3. **International Support**: Works with multiple currency symbols (£, €, $)
4. **Cleaner Results**: Headers, footers, and other non-item text are automatically excluded
5. **Flexible Decimal Format**: Supports both period (12.99) and comma (12,99) as decimal separators

## Testing

### Test Case 1: Simple Items
```
Input:
Burger $12.99
Fries $4.50
Drink $2.99

Output:
- Burger: $12.99
- Fries: $4.50
- Drink: $2.99
```

### Test Case 2: Multi-line Items
```
Input:
Super Delicious
Special Pasta
with Extra Cheese $25.99
Regular Burger $10.50

Output:
- Super Delicious Special Pasta with Extra Cheese: $25.99
- Regular Burger: $10.50
```

### Test Case 3: Mixed Headers and Items
```
Input:
Restaurant Name
123 Main St

Coffee $4.50
Tea $3.20

Total $7.70

Output:
- Coffee: $4.50
- Tea: $3.20
- Total: $7.70

Note: "Restaurant Name" and "123 Main St" are correctly excluded
```

### Test Case 4: Different Currency Symbols
```
Input:
Coffee €4.50
Tea £3.20
Juice $5.00

Output:
- Coffee: €4.50
- Tea: £3.20
- Juice: $5.00
```

## Known Limitations

1. **Year Detection**: Lines ending with years (e.g., "Date: 2024") may be incorrectly detected as prices since 4-digit numbers match the price pattern. In practice, this is rare as dates are typically formatted differently.

2. **Price-only Lines**: If a line contains only a price with no item name, it will be included but with an empty name (which is then filtered out).

3. **Complex Formatting**: Very unusual receipt formats with prices not at the end of lines won't be detected. The algorithm assumes prices appear at the end of the line.

## Implementation Details

### Item ID Generation
Items are assigned unique IDs based on:
- The starting line index (for multi-line items) or current line index
- Current timestamp
- Item count (to ensure uniqueness within the same timestamp)

Format: `{lineIndex}-{timestamp}-{itemCount}`

### Full Text Preservation
The `fullText` field preserves the original multi-line structure for debugging:
- Single-line items: Contains the original line
- Multi-line items: Contains all lines joined with `\n`

This is useful for debugging and understanding what the OCR detected.
