# Cvians UI Components - Examples

This directory contains usage examples for the Cvians UI Components library.

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
} from '@codvista/cvians-excel-table'

// Your component implementation
```

## Installation

To use these components in your project:

```bash
# Install the core package
npm install @codvista/cvians-excel-table

# Or use the CLI tool
npm install -g @codvista/cvians-cli
cvians init
cvians add excel-table
```

## Notes

- The examples use relative imports for development purposes
- In a real project, you would import from the published npm package: `@codvista/cvians-excel-table`
- All examples are fully typed with TypeScript
- Components work with both React and Preact