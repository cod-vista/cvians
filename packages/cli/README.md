# @cvians/cli

CLI tool for installing Cvians UI components. Install components in your project similar to shadcn/ui.

## ✨ Features

- 🚀 **Quick setup** - Initialize your project with one command
- 📦 **Component installation** - Add components individually as needed
- 🔧 **Smart configuration** - Automatically configures paths and dependencies
- 🎯 **Framework agnostic** - Works with React, Next.js, Vite, and more
- 📁 **Organized structure** - Follows shadcn/ui conventions

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g @cvians/cli
```

### Local Installation

```bash
npm install @cvians/cli
```

## 📖 Usage

### Initialize Project

Set up your project to use Cvians components:

```bash
cvians init
```

This will:
- Create `components/ui` directory
- Add utility functions
- Create `components.json` configuration
- Set up necessary dependencies

### Add Components

Install specific components:

```bash
cvians add excel-table
```

Available components:
- `excel-table` - Excel-like table with filtering and sorting

### CLI Options

```bash
cvians --help
```

#### Commands

- `cvians init [options]` - Initialize your project
- `cvians add <component> [options]` - Add a component

#### Options

- `-y, --yes` - Skip confirmation prompts
- `-h, --help` - Display help information
- `-V, --version` - Display version number

## 🏗️ Project Structure

After initialization, your project will have:

```
your-project/
├── components/
│   └── ui/
│       └── (components will be added here)
├── lib/
│   └── utils.ts
└── components.json
```

## 🔧 Framework Support

### Next.js

Works out of the box with Next.js 13+ (App Router and Pages Router)

### Vite

Compatible with Vite + React projects

### Create React App

Works with CRA projects (may require eject for full customization)

### Other Frameworks

Any React-based framework that supports:
- TypeScript
- Tailwind CSS
- ES modules

## ⚙️ Configuration

The `components.json` file controls:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 🎯 Requirements

- Node.js 18+
- A React project with Tailwind CSS
- TypeScript (recommended)

## 📦 Core Package

This CLI installs components from [@cvians/core](https://www.npmjs.com/package/@cvians/core).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/cod-vista/cvians/blob/main/CONTRIBUTING.md).

## 📄 License

MIT License

## 🔗 Links

- [Core Components](https://www.npmjs.com/package/@cvians/core)
- [Documentation](https://cvians.dev)
- [GitHub](https://github.com/cod-vista/cvians)
- [Issues](https://github.com/cod-vista/cvians/issues)