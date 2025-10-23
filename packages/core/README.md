# @cvians/core

Core components for the Cvians UI library, featuring Excel-like tables with advanced filtering and sorting capabilities.

## ✨ Features

- 🔍 **Excel-like filtering** - Checkbox-based filtering with unique values
- 📊 **Multi-column sorting** - Click headers to sort ascending/descending  
- 🎯 **Type-aware** - Handles string, number, date, and boolean data types
- 🎨 **Customizable** - Built with Tailwind CSS and shadcn/ui design system
- 📱 **Responsive** - Works seamlessly across all screen sizes
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🔧 **Easy to use** - Same syntax as regular HTML tables
- ⚡ **Framework agnostic** - Works with both React and Preact

## 🚀 Installation

```bash
npm install @cvians/core
```

Or using the CLI (recommended):

```bash
# Install CLI globally
npm install -g @cvians/cli

# Initialize your project
cvians init

# Add components
cvians add excel-table
```

## 📖 Quick Start

```tsx
import {
  ExcelTable,
  ExcelTableHeader,
  ExcelTableHead,
  ExcelTableBody,
  ExcelTableRow,
  ExcelTableCell,
} from "@cvians/core"

function MyTable() {
  const data = [
    { id: 1, name: "John Doe", age: 30, active: true },
    { id: 2, name: "Jane Smith", age: 25, active: false },
  ]

  return (
    <ExcelTable>
      <ExcelTableHeader>
        <ExcelTableRow>
          <ExcelTableHead sortable dataType="number">ID</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="string">Name</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="number">Age</ExcelTableHead>
          <ExcelTableHead filterable dataType="boolean">Active</ExcelTableHead>
        </ExcelTableRow>
      </ExcelTableHeader>
      <ExcelTableBody>
        {data.map((row) => (
          <ExcelTableRow key={row.id}>
            <ExcelTableCell>{row.id}</ExcelTableCell>
            <ExcelTableCell>{row.name}</ExcelTableCell>
            <ExcelTableCell>{row.age}</ExcelTableCell>
            <ExcelTableCell>{row.active ? 'Yes' : 'No'}</ExcelTableCell>
          </ExcelTableRow>
        ))}
      </ExcelTableBody>
    </ExcelTable>
  )
}
```

## 🎯 Data Types

The component supports different data types for proper sorting and filtering:

- **`string`** - Text data (default)
- **`number`** - Numeric data with proper numerical sorting
- **`date`** - Date values (accepts various date formats)
- **`boolean`** - Boolean values (true/false)

## 📚 API Reference

### ExcelTable

Main container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Table content |
| `className` | `string` | - | Additional CSS classes |

### ExcelTableHead

Table header cell with filtering and sorting capabilities.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content |
| `filterable` | `boolean` | `false` | Enable filtering for this column |
| `sortable` | `boolean` | `false` | Enable sorting for this column |
| `dataType` | `'string' \| 'number' \| 'date' \| 'boolean'` | `'string'` | Data type for proper filtering/sorting |
| `className` | `string` | - | Additional CSS classes |

## 🎨 Styling

The components use Tailwind CSS and follow the shadcn/ui design system. Customize appearance using:

- **className props** on any component
- **CSS variables** for theming
- **Tailwind modifiers** for responsive design

## 🔧 Framework Compatibility

### React
Works out of the box with React 16.8+

### Preact
Compatible with Preact 10+ using preact/compat

## 📄 License

MIT License

## 🔗 Links

- [Documentation](https://cvians.dev)
- [GitHub](https://github.com/cod-vista/cvians)
- [CLI Tool](https://www.npmjs.com/package/@cvians/cli)