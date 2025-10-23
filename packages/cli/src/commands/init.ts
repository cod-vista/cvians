import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'

export async function initProject(options: { yes?: boolean } = {}) {
  const spinner = ora('Initializing Cvians UI project...').start()
  
  try {
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const hasPackageJson = await fs.pathExists(packageJsonPath)
    
    if (!hasPackageJson) {
      spinner.fail(chalk.red('No package.json found. Please run this command in a valid Node.js project.'))
      return
    }

    // Create necessary directories
    const componentsDir = path.join(process.cwd(), 'components', 'ui')
    const libDir = path.join(process.cwd(), 'lib')
    
    await fs.ensureDir(componentsDir)
    await fs.ensureDir(libDir)

    // Create utils file
    const utilsContent = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`

    await fs.writeFile(path.join(libDir, 'utils.ts'), utilsContent)

    // Create components.json config
    const componentsConfig = {
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

    await fs.writeFile(
      path.join(process.cwd(), 'components.json'), 
      JSON.stringify(componentsConfig, null, 2)
    )

    spinner.succeed(chalk.green('Cvians UI initialized successfully!'))
    
    console.log(chalk.blue('\\nNext steps:'))
    console.log(chalk.gray('1. Install dependencies: npm install clsx tailwind-merge'))
    console.log(chalk.gray('2. Set up Tailwind CSS if not already configured'))
    console.log(chalk.gray('3. Add components: cvians add excel-table'))
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize Cvians UI project'))
    console.error(error)
  }
}