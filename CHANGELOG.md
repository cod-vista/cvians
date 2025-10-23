# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING**: Rebranded from "Excel UI" to "Cvians" across all packages
- Updated package names:
  - `@excel-ui/core` → `@cvians/core`
  - `@excel-ui/cli` → `@cvians/cli`
  - `@excel-ui/examples` → `@cvians/examples`
- Updated CLI command from `excel-ui` to `cvians`
- Updated all documentation and README files
- Enhanced project description to reflect broader component library vision

### Added
- Created comprehensive roadmap for future component categories
- Added CHANGELOG.md for version tracking
- Expanded keywords for better discoverability

## [0.1.0] - 2024-01-XX

### Added
- Initial release of Excel UI components (now Cvians)
- Excel-like table component with filtering and sorting capabilities
- CLI tool for component installation
- TypeScript support with full type definitions
- React and Preact compatibility
- Tailwind CSS styling with shadcn/ui design system
- Monorepo structure with PNPM workspaces
- Build system with Turbo and TSUP
- GitHub Actions for CI/CD
- Comprehensive documentation and examples

### Features
- **ExcelTable Component**:
  - Multi-column sorting (ascending/descending)
  - Excel-like filtering with checkbox selection
  - Data type awareness (string, number, date, boolean)
  - Responsive design
  - Keyboard accessibility
  - Custom styling support

- **CLI Tool**:
  - `init` command for project initialization
  - `add` command for component installation
  - Dynamic component registry
  - Dependency management

- **Developer Experience**:
  - TypeScript-first development
  - ESM and CommonJS builds
  - Tree-shaking support
  - Hot reload in development
  - Comprehensive examples