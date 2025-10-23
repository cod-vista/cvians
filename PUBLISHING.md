# Publishing Guide for Cvians UI Components

This guide will help you publish the Cvians UI component library to npm so everyone can use it.

## 📋 Prerequisites

1. **npm account** - Create an account at [npmjs.com](https://npmjs.com)
2. **npm CLI** - Ensure npm is installed and you're logged in:
   ```bash
   npm login
   ```
3. **GitHub repository** - Push your code to GitHub first

## 🏷️ Package Naming

The packages will be published under the `@cvians` scope:
- `@codvista/cvians-core` - Core components
- `@codvista/cvians-cli` - CLI installation tool

If `@cvians` is unavailable, consider:
- `@your-username/cvians-core`
- `@your-org/cvians`
- `cvians-ui`

## 🚀 Publishing Steps

### 1. Verify Package Names

The package names are already set correctly:
- `@codvista/cvians-core`
- `@codvista/cvians-cli`
- `@cvians/root` (private)

### 2. Initialize Changesets

```bash
pnpm changeset init
```

### 3. Create Your First Changeset

```bash
pnpm changeset
```

Select packages to release and provide a description.

### 4. Version and Publish

```bash
# Version packages
pnpm changeset version

# Build all packages
pnpm build

# Publish to npm
pnpm changeset publish
```

## 🔐 Automated Publishing (Recommended)

### GitHub Actions Setup

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Packages
        run: pnpm build

      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Setup Repository Secrets

In your GitHub repository settings, add:
- `NPM_TOKEN` - Your npm automation token

## 📦 Package Structure for Publishing

Your final package structure:

```
@codvista/cvians-core/
├── dist/
│   ├── index.js      # ESM build
│   ├── index.cjs     # CommonJS build
│   └── index.d.ts    # TypeScript declarations
├── package.json
└── README.md

@codvista/cvians-cli/
├── dist/
│   ├── cli.js        # CLI executable
│   └── index.js      # Library exports
├── package.json
└── README.md
```

## 🎯 Installation for Users

After publishing, users can install with:

```bash
# Core components
npm install @codvista/cvians-core

# CLI tool (global)
npm install -g @codvista/cvians-cli
```

Or use the CLI:
```bash
npx @codvista/cvians-cli init
npx @codvista/cvians-cli add excel-table
```

### Alternative Installation (local CLI)
```bash
# Install locally in project
npm install @codvista/cvians-cli
npx cvians init
npx cvians add excel-table
```

## 📖 Documentation

Consider hosting documentation on:
- **GitHub Pages** - Free static hosting
- **Vercel** - Easy deployment from GitHub
- **Netlify** - Alternative static hosting
- **Storybook** - Component documentation

## 🏷️ Version Management

Use semantic versioning:
- `0.1.0` - Initial release
- `0.1.1` - Bug fixes
- `0.2.0` - New features
- `1.0.0` - Stable API

## 🧪 Testing Before Publishing

1. **Pack locally**:
   ```bash
   pnpm --filter @your-username/excel-table-core pack
   ```

2. **Test in another project**:
   ```bash
   npm install ./path/to/packed-file.tgz
   ```

3. **Test CLI**:
   ```bash
   npm link
   cvians --help
   ```

## 📝 Checklist Before Publishing

- [ ] All tests pass
- [ ] Documentation is complete
- [ ] Examples work correctly
- [ ] Package names are available on npm (@cvians scope)
- [ ] README has installation instructions
- [ ] License file is included
- [ ] TypeScript declarations are generated
- [ ] Both ESM and CommonJS builds work
- [ ] CLI tool is executable
- [ ] Version numbers are correct

## 🔄 Continuous Updates

After initial publishing:

1. **Fix bugs** → patch version (0.1.1)
2. **Add features** → minor version (0.2.0)
3. **Breaking changes** → major version (1.0.0)

Always use changesets for version management:
```bash
pnpm changeset
pnpm changeset version
pnpm changeset publish
```

## 🌟 Promotion

After publishing:
- Share on social media
- Post on Reddit (r/reactjs, r/webdev)
- Write a blog post
- Submit to awesome lists
- Create demo videos

Your Cvians UI component library is now ready to be shared with the world! 🎉