# Excel UI Components - Examples

This directory contains usage examples for the Excel UI Components library.

## Files

- `basic-usage.tsx` - Comprehensive examples showing different use cases

## Examples Included

### 1. Basic Employee Table
Demonstrates basic filtering and sorting with employee data.

### 2. Vehicle Management Table  
Shows advanced styling and status indicators.

### 3. Simple Product Table
Minimal example with just a few columns.

## Features Demonstrated

- ✅ Filterable columns with checkbox selection
- ✅ Sortable columns (ascending/descending)
- ✅ Data type awareness (string, number, date, boolean)
- ✅ Custom styling with Tailwind CSS
- ✅ HTML table syntax preservation

## Usage

These examples show how to use the Excel Table components in your React applications:

```tsx
import {
  ExcelTable,
  ExcelTableHeader,
  ExcelTableHead,
  ExcelTableBody,
  ExcelTableRow,
  ExcelTableCell,
} from '@excel-ui/core'

// Your component implementation
```

## Notes

- The examples use relative imports for development purposes
- In a real project, you would import from the published npm package
- All examples are fully typed with TypeScript
- Components work with both React and Preact