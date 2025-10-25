# Cvians UI Components Documentation

Welcome to the comprehensive documentation for the Cvians UI component library.

## 📚 Table of Contents

### Getting Started
- [Installation & Setup](./README.md#installation)
- [Quick Start Guide](./README.md#quick-start)
- [Project Setup](./SETUP_SUMMARY.md)

### Components
- [Excel Table Component](./packages/core/README.md)
- [CLI Tool](./packages/cli/README.md)

### Examples
- [Basic Usage Examples](./examples/README.md)
- [Excel Table Examples](./examples/basic-usage.tsx)

### Development
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Development Setup](./README.md#development)
- [Building & Testing](./README.md#development-commands)

### Publishing & Deployment
- [Publishing Guide](./PUBLISHING.md)
- [NPM Publishing Instructions](./NPM_PUBLISHING_GUIDE.md)
- [GitHub Integration](./GITHUB_INTEGRATION.md)

### Reference
- [Troubleshooting](./TROUBLESHOOTING.md)
- [Roadmap](./ROADMAP.md)
- [Changelog](./CHANGELOG.md)

## 🚀 Quick Links

### Installation
```bash
# Install CLI globally
npm install -g @codvista/cvians-cli

# Install core components
npm install @codvista/cvians-excel-table
```

### Usage
```bash
# Initialize in your project
cvians init

# Add components
cvians add excel-table
```

```tsx
// Use in your React/Preact app
import { ExcelTable } from '@codvista/cvians-excel-table';

const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'San Francisco' }
];

function App() {
  return <ExcelTable data={data} />;
}
```

## 🔗 External Resources

- **NPM Packages**: 
  - [@codvista/cvians-excel-table](https://www.npmjs.com/package/@codvista/cvians-excel-table)
  - [@codvista/cvians-cli](https://www.npmjs.com/package/@codvista/cvians-cli)
- **GitHub Repository**: [cod-vista/cvians](https://github.com/cod-vista/cvians)
- **Issues & Support**: [GitHub Issues](https://github.com/cod-vista/cvians/issues)

## 💡 Need Help?

1. Check our [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Browse [Examples](./examples/README.md)
3. Read component-specific documentation
4. Open an [issue on GitHub](https://github.com/cod-vista/cvians/issues)

---

Built with ❤️ by [Taha Kazmi](https://github.com/cod-vista)