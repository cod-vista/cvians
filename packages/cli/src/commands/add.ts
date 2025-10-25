import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'

const COMPONENTS = {
  'excel-table': {
    name: 'excel-table',
    dependencies: ['lucide-react'],
    registryDependencies: [],
    files: [
      {
        name: 'excel-table.tsx',
        content: () => getExcelTableContent()
      }
    ]
  }
}

async function getExcelTableContent(): Promise<string> {
  // Dynamic content generation - reads from the actual component file
  const componentPath = path.resolve(process.cwd(), '../../excel-table/src/components/excel-table.tsx')
  try {
    const content = await fs.readFile(componentPath, 'utf-8')
    return content
  } catch {
    // Fallback content if file not found
    return `// Excel Table Component - Install @codvista/cvians-excel-table for full functionality
export * from '@codvista/cvians-excel-table'`
  }
}

export async function installComponent(componentName: string, _options: { yes?: boolean } = {}) {
  const spinner = ora('Installing component...').start()
  
  try {
    const component = COMPONENTS[componentName as keyof typeof COMPONENTS]
    
    if (!component) {
      spinner.fail(chalk.red(`Component "${componentName}" not found`))
      return
    }

    // Create components directory if it doesn't exist
    const componentsDir = path.join(process.cwd(), 'components', 'ui')
    await fs.ensureDir(componentsDir)

    // Install component files
    for (const file of component.files) {
      const filePath = path.join(componentsDir, file.name)
      const content = typeof file.content === 'function' ? await file.content() : file.content
      await fs.writeFile(filePath, content)
      spinner.text = `Created ${file.name}`
    }

    spinner.succeed(chalk.green(`Successfully installed ${componentName}`))
    
    console.log(chalk.blue('\\nNext steps:'))
    console.log(chalk.gray('1. Install peer dependencies if needed'))
    console.log(chalk.gray('2. Import and use the component in your project'))
    
  } catch (error) {
    spinner.fail(chalk.red('Failed to install component'))
    console.error(error)
  }
}