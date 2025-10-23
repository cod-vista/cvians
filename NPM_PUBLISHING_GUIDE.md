# 📦 NPM Publishing Setup Guide

## ✅ Issues Resolved

Your Cvians UI library now has all major issues fixed:

### 🔧 **Linting Issues Fixed**
- ✅ Added comprehensive ESLint configuration
- ✅ Fixed all TypeScript type errors
- ✅ Resolved HTML element global type issues
- ✅ Fixed unused variable warnings
- ✅ Replaced `any` types with proper type annotations
- ✅ All packages now pass linting successfully

### 🚀 **CI/CD Issues Fixed**
- ✅ Updated pnpm version compatibility
- ✅ Fixed GitHub Actions workflows
- ✅ Improved lockfile handling
- ✅ Added proper error handling for first-time publishing

## 📋 NPM Publishing Checklist

### 1. **Create NPM Account & Get Token**

**If you don't have an npm account:**
```bash
# Go to https://npmjs.com and sign up
# Verify your email address
```

**Login and create automation token:**
```bash
# Login to npm locally
npm login

# Verify you're logged in
npm whoami
```

**Create automation token:**
1. Go to https://npmjs.com
2. Click your profile → Access Tokens
3. Create new token → **Automation** token
4. Copy the token (starts with `npm_...`)

### 2. **Add NPM Token to GitHub**

1. Go to your GitHub repository: https://github.com/cod-vista/cvians
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm automation token
6. Click **Add secret**

### 3. **Check Package Name Availability**

```bash
# Check if your desired package names are available
npm info @codvista/cvians-core
npm info @codvista/cvians-cli
```

**If packages don't exist (good!):**
- You'll see: `npm ERR! 404 Not Found`
- This means the names are available

**If packages exist:**
- You'll need to use different names
- Consider: `@cod-vista/cvians-core` and `@cod-vista/cvians-cli`

### 4. **Email Compatibility Issue**

You mentioned GitHub and npm emails might differ. Here's how to handle this:

**Option A: Use the same email (recommended)**
```bash
# Check your npm email
npm profile get

# Update npm email to match GitHub
npm profile set email your-github-email@example.com
```

**Option B: Add GitHub email as additional npm email**
```bash
# Add GitHub email to your npm profile
npm profile set email your-github-email@example.com
```

**Option C: Configure git locally**
```bash
# Ensure git uses the right email for commits
git config user.email "your-npm-email@example.com"
```

### 5. **Alternative Package Names (If @cvians is taken)**

If `@cvians` scope is not available, update your package.json files:

**Update packages/core/package.json:**
```json
{
  "name": "@cod-vista/cvians-core"
}
```

**Update packages/cli/package.json:**
```json
{
  "name": "@cod-vista/cvians-cli",
  "bin": {
    "cvians": "./dist/cli.js"
  }
}
```

### 6. **Publishing Process**

Once NPM_TOKEN is set up in GitHub:

```bash
# Create your first changeset (this will trigger publishing)
pnpm changeset

# Select packages to publish (both core and cli)
# Choose 'minor' for first release (0.1.0 → 0.2.0)
# Add description: "Initial release of Cvians UI components"

# The changeset will create a file in .changeset/
# Commit and push this changeset
git add .
git commit -m "chore: add changeset for initial release"
git push origin main
```

**What happens next:**
1. GitHub Actions will create a "Version Packages" PR
2. When you merge that PR, packages will be automatically published to npm
3. You'll get GitHub releases created automatically

### 7. **Manual Publishing (Alternative)**

If you prefer to publish manually:

```bash
# Apply changeset and version packages
pnpm changeset version

# Build everything
pnpm build

# Publish to npm
pnpm changeset publish
```

## 🔍 Troubleshooting Publishing Issues

### **"Package already exists"**
- Check if package names are available with `npm info`
- Use alternative names with your scope: `@cod-vista/cvians-core`

### **"Authentication failed"**
- Verify NPM_TOKEN is correctly added to GitHub secrets
- Make sure token has "Automation" permissions
- Check token hasn't expired

### **"Email mismatch"**
- Use `npm profile get` to check your npm email
- Update npm email to match GitHub: `npm profile set email`

### **"No permission to publish"**
- Ensure you're logged in: `npm whoami`
- Check if you have rights to the package scope

## 🎉 Success Indicators

Your setup is working when you see:

- ✅ GitHub Actions show green checkmarks
- ✅ Packages appear on npmjs.com
- ✅ CLI installs globally: `npm install -g @codvista/cvians-cli`
- ✅ Components can be imported: `import { ExcelTable } from '@codvista/cvians-core'`

## 📊 After Publishing

Test your published packages:

```bash
# Test global CLI installation
npm install -g @codvista/cvians-cli
cvians --help

# Test in a new project
mkdir test-cvians
cd test-cvians
npm init -y
npm install @codvista/cvians-core
```

## 🔗 Monitoring

- **NPM packages**: https://npmjs.com/package/@codvista/cvians-core
- **GitHub releases**: https://github.com/cod-vista/cvians/releases
- **Download stats**: https://npmjs.com/package/@codvista/cvians-core

---

**Current Status**: All technical issues resolved! ✅  
**Next**: Set up NPM_TOKEN and create your first changeset! 🚀

**Ready to publish? Start with:**
```bash
pnpm changeset
```