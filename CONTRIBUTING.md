# Contributing to Cvians UI Components

Thank you for your interest in contributing to Cvians! This guide will help you get started.

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+ 
- pnpm 8+ (recommended package manager)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/cod-vista/cvians.git
   cd cvians
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build all packages**
   ```bash
   pnpm build
   ```

4. **Start development**
   ```bash
   pnpm dev
   ```

## 📁 Project Structure

```
cvians/
├── packages/
│   ├── core/              # Core components (tables, forms, etc.)
│   └── cli/               # CLI installation tool
├── apps/
│   ├── docs/              # Documentation site
│   └── playground/        # Development playground
├── tools/                 # Build and development tools
└── examples/              # Usage examples
```

## 🚀 Scripts

- `pnpm build` - Build all packages
- `pnpm dev` - Start development mode
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm type-check` - Check TypeScript types
- `pnpm clean` - Clean all build outputs

## 🧪 Testing

We use Jest and React Testing Library for testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests for specific package
pnpm --filter @cvians/core test
```

## 📝 Code Style

- **TypeScript** - All code must be written in TypeScript
- **ESLint** - Follow the configured ESLint rules
- **Prettier** - Code formatting is handled by Prettier
- **Conventional Commits** - Use conventional commit messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer(s)]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```bash
feat(core): add new filtering options to ExcelTable
fix(cli): resolve component installation path issue
docs(readme): update installation instructions
```

## 🔄 Pull Request Process

1. **Fork the repository** and create your branch from `main`

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and add tests if applicable

4. **Ensure tests pass**
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

5. **Update documentation** if needed

6. **Create a changeset** for your changes
   ```bash
   pnpm changeset
   ```

7. **Commit your changes** using conventional commits

8. **Push to your fork** and create a pull request

### Pull Request Requirements

- ✅ All tests pass
- ✅ No linting errors
- ✅ TypeScript types are correct
- ✅ Documentation is updated
- ✅ Changeset is created (if applicable)
- ✅ Conventional commit messages

## 🎯 Development Guidelines

### Component Development

1. **Follow existing patterns** - Look at existing components for consistency
2. **Type safety** - All components must be fully typed
3. **Accessibility** - Ensure components are accessible (ARIA, keyboard navigation)
4. **Responsive design** - Components should work on all screen sizes
5. **Performance** - Consider performance implications of your changes

### Adding New Components

1. Create component in `packages/core/src/components/`
2. Export from `packages/core/src/index.ts`
3. Add to CLI registry in `packages/cli/src/commands/add.ts`
4. Write comprehensive tests
5. Update documentation
6. Create usage examples

### Updating Existing Components

1. Maintain backward compatibility when possible
2. Update tests to cover new functionality
3. Update documentation and examples
4. Consider deprecation warnings for breaking changes

## 🐛 Bug Reports

When filing a bug report, please include:

- **Environment details** (OS, Node.js version, package versions)
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Minimal reproduction** (CodeSandbox, repository, etc.)
- **Screenshots** if applicable

## 💡 Feature Requests

Before requesting a feature:

1. **Search existing issues** to avoid duplicates
2. **Consider the use case** - is it broadly applicable?
3. **Think about the API** - how should it work?
4. **Consider backward compatibility**

## 📖 Documentation

We use several documentation formats:

- **README files** - Overview and quick start guides
- **API documentation** - Generated from TypeScript types
- **Examples** - Real-world usage examples
- **Storybook** - Interactive component documentation

When contributing documentation:

- Keep it concise and clear
- Include code examples
- Test all code examples
- Update related documentation

## 🔧 Troubleshooting

### Common Issues

**Build failures:**
```bash
pnpm clean
pnpm install
pnpm build
```

**Type errors:**
```bash
pnpm type-check
```

**Linting errors:**
```bash
pnpm lint --fix
```

### Getting Help

- 💬 [GitHub Discussions](https://github.com/cod-vista/cvians/discussions)
- 🐛 [GitHub Issues](https://github.com/cod-vista/cvians/issues)
- 📧 Email: maintainer@example.com

## 📋 Release Process

Releases are automated using Changesets:

1. **Create changeset** - `pnpm changeset`
2. **Version packages** - `pnpm version-packages`
3. **Publish** - `pnpm release`

Only maintainers can publish releases.

## 🙏 Recognition

Contributors will be recognized in:

- GitHub contributors list
- CHANGELOG.md
- Documentation credits
- Social media acknowledgments

Thank you for contributing to Cvians! 🎉