# Cvians UI Components

[![npm version](https://badge.fury.io/js/@codvista%2Fcvians-core.svg)](https://badge.fury.io/js/@codvista%2Fcvians-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A modern React/Preact component library providing Excel-like table functionality with advanced filtering, sorting, and data type awareness while maintaining the familiar HTML table syntax. Built for scalability with plans for comprehensive UI components across multiple categories.

## ✨ Features

- 🔍 **Excel-like filtering** - Checkbox-based filtering with unique values
- 📊 **Multi-column sorting** - Click headers to sort ascending/descending  
- 🎯 **Type-aware** - Handles string, number, date, and boolean data types
- 🎨 **Customizable** - Built with Tailwind CSS and shadcn/ui design system
- 📱 **Responsive** - Works seamlessly across all screen sizes
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🔧 **Easy to use** - Same syntax as regular HTML tables
- ⚡ **Framework agnostic** - Works with both React and Preact
- 🚀 **Modern tooling** - TypeScript, ESM, and tree-shaking support

## 🚀 Quick Start

### Installation

Using npm:
```bash
npm install @codvista/cvians-core
```

**Using pnpm:**
```bash
pnpm add @codvista/cvians-core
```

**Using yarn:**
```bash
yarn add @codvista/cvians-core
```

### CLI Installation (Recommended)

Install the CLI tool globally:
```bash
npm install -g @codvista/cvians-cli
```

Initialize your project:
```bash
cvians init
```

Add components:
```bash
cvians add excel-table
```

## 📖 Basic Usage

```tsx
import {
  ExcelTable,
  ExcelTableHeader,
  ExcelTableHead,
  ExcelTableBody,
  ExcelTableRow,
  ExcelTableCell,
} from "@codvista/cvians-core"

function BasicExample() {
  const data = [
    { id: 1, name: "John Doe", age: 30, active: true, joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", age: 25, active: false, joinDate: "2023-03-20" },
    { id: 3, name: "Bob Johnson", age: 35, active: true, joinDate: "2022-11-10" },
  ]

  return (
    <ExcelTable>
      <ExcelTableHeader>
        <ExcelTableRow>
          <ExcelTableHead sortable dataType="number">ID</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="string">Name</ExcelTableHead>
          <ExcelTableHead filterable sortable dataType="number">Age</ExcelTableHead>
          <ExcelTableHead filterable dataType="boolean">Active</ExcelTableHead>
          <ExcelTableHead sortable dataType="date">Join Date</ExcelTableHead>
        </ExcelTableRow>
      </ExcelTableHeader>
      <ExcelTableBody>
        {data.map((row) => (
          <ExcelTableRow key={row.id}>
            <ExcelTableCell>{row.id}</ExcelTableCell>
            <ExcelTableCell>{row.name}</ExcelTableCell>
            <ExcelTableCell>{row.age}</ExcelTableCell>
            <ExcelTableCell>{row.active ? 'true' : 'false'}</ExcelTableCell>
            <ExcelTableCell>{row.joinDate}</ExcelTableCell>
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

### Other Components

All other components (`ExcelTableHeader`, `ExcelTableBody`, `ExcelTableRow`, `ExcelTableCell`) accept standard HTML table attributes plus optional `className` prop.

## 🎨 Styling

The components use Tailwind CSS and follow the shadcn/ui design system. Customize appearance using:

1. **className props** on any component
2. **CSS variables** for theming
3. **Tailwind modifiers** for responsive design

Example custom styling:
```tsx
<ExcelTable className="border-2 border-blue-200">
  <ExcelTableHeader className="bg-blue-50">
    <ExcelTableRow>
      <ExcelTableHead className="text-blue-900 font-bold">
        Custom Header
      </ExcelTableHead>
    </ExcelTableRow>
  </ExcelTableHeader>
</ExcelTable>
```

## 🔧 Framework Compatibility

### React
Works out of the box with React 16.8+

### Preact
Compatible with Preact 10+ using preact/compat:

```bash
npm install preact
```

Configure your bundler to alias React to Preact:
```js
// vite.config.js
export default {
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  }
}
```

## 📦 Package Structure

This is a monorepo containing:

- `@codvista/cvians-core` - Core components including Excel-like tables
- `@codvista/cvians-cli` - CLI installation tool

## 🔮 Roadmap

Cvians is designed to be a comprehensive component library with multiple categories:

- **Tables & Data Display** - Excel-like tables, data grids, charts
- **Forms & Inputs** - Advanced form components, validators
- **Navigation** - Menus, breadcrumbs, pagination
- **Feedback** - Modals, notifications, progress indicators
- **Layout** - Responsive containers, grids, sidebars

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](./DOCUMENTATION.md)
- [Examples](./examples/README.md)
- [GitHub](https://github.com/cod-vista/cvians)
- [npm](https://www.npmjs.com/package/@codvista/cvians-core)