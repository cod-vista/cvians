# 📖 Cvians UI - Documentation Index

Welcome to the complete documentation for Cvians UI Components - a modern React/Preact component library with Excel-like functionality.

## 🚀 Quick Start

### Installation
```bash
# Install CLI globally
npm install -g @codvista/cvians-cli

# Install core components
npm install @codvista/cvians-excel-table
```

### Basic Usage
```tsx
import { ExcelTable } from '@codvista/cvians-excel-table';

const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'San Francisco' }
];

export default function App() {
  return <ExcelTable data={data} />;
}
```

## 📚 Documentation Structure

### 🏗️ **Getting Started**
| Document | Description | Link |
|----------|-------------|------|
| **Main README** | Project overview, installation, quick start | [README.md](./README.md) |
| **Setup Guide** | Complete project setup instructions | [SETUP_SUMMARY.md](./SETUP_SUMMARY.md) |
| **Contributing** | Guidelines for contributors | [CONTRIBUTING.md](./CONTRIBUTING.md) |

### 🧩 **Components**
| Component | Description | Link |
|-----------|-------------|------|
| **Excel Table** | Main table component with filtering/sorting | [Core README](./packages/core/README.md) |
| **CLI Tool** | Command-line installation tool | [CLI README](./packages/cli/README.md) |

### 💡 **Examples & Usage**
| Resource | Description | Link |
|----------|-------------|------|
| **Examples Overview** | All usage examples and demos | [Examples README](./examples/README.md) |
| **Basic Usage** | TypeScript examples with different data types | [basic-usage.tsx](./examples/basic-usage.tsx) |

### 🚀 **Development & Publishing**
| Document | Description | Link |
|----------|-------------|------|
| **Publishing Guide** | How to publish to npm | [PUBLISHING.md](./PUBLISHING.md) |
| **NPM Setup** | Detailed npm publishing instructions | [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md) |
| **GitHub Integration** | CI/CD setup and GitHub Actions | [GITHUB_INTEGRATION.md](./GITHUB_INTEGRATION.md) |
| **Publishing Instructions** | Step-by-step publishing process | [PUBLISHING_INSTRUCTIONS.md](./PUBLISHING_INSTRUCTIONS.md) |

### 🔧 **Maintenance & Support**
| Document | Description | Link |
|----------|-------------|------|
| **Troubleshooting** | Common issues and solutions | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| **Roadmap** | Future features and development plans | [ROADMAP.md](./ROADMAP.md) |
| **Changelog** | Version history and changes | [CHANGELOG.md](./CHANGELOG.md) |

## 🔗 **External Links**

### NPM Packages
- **Core Components**: [`@codvista/cvians-excel-table`](https://www.npmjs.com/package/@codvista/cvians-excel-table)
- **CLI Tool**: [`@codvista/cvians-cli`](https://www.npmjs.com/package/@codvista/cvians-cli)

### GitHub Resources
- **Repository**: [cod-vista/cvians](https://github.com/cod-vista/cvians)
- **Issues**: [GitHub Issues](https://github.com/cod-vista/cvians/issues)
- **Actions/CI**: [GitHub Actions](https://github.com/cod-vista/cvians/actions)
- **Releases**: [GitHub Releases](https://github.com/cod-vista/cvians/releases)

## 🎯 **Quick Navigation**

### For Users
1. **Install**: `npm install @codvista/cvians-excel-table`
2. **Learn**: Check [Examples](./examples/README.md)
3. **Implement**: Use [Core README](./packages/core/README.md)
4. **Support**: See [Troubleshooting](./TROUBLESHOOTING.md)

### For Contributors
1. **Setup**: Follow [Setup Guide](./SETUP_SUMMARY.md)
2. **Contribute**: Read [Contributing Guidelines](./CONTRIBUTING.md)
3. **Publish**: Use [Publishing Guide](./PUBLISHING.md)
4. **Develop**: Check [Main README](./README.md) development section

### For CLI Users
1. **Install**: `npm install -g @codvista/cvians-cli`
2. **Initialize**: `cvians init`
3. **Add Components**: `cvians add excel-table`
4. **Help**: `cvians --help`

## 📊 **Component Overview**

| Component | Status | Features | Package |
|-----------|--------|----------|---------|
| **ExcelTable** | ✅ Released | Filtering, Sorting, Type-aware | `@codvista/cvians-excel-table` |
| **CLI Tool** | ✅ Released | Component installation, Project init | `@codvista/cvians-cli` |

## 🏷️ **Current Version**
- **Core**: `v0.2.0`
- **CLI**: `v0.2.0`
- **Status**: 🟢 **Stable & Published**

---

## 💬 **Get Help**

1. 📖 **Documentation**: Start with this index
2. 💡 **Examples**: Check [examples directory](./examples/)
3. 🐛 **Issues**: [Report on GitHub](https://github.com/cod-vista/cvians/issues)
4. 💬 **Discussions**: [GitHub Discussions](https://github.com/cod-vista/cvians/discussions)

---

**Built with ❤️ by [Taha Kazmi](https://github.com/cod-vista)**