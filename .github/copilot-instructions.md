# Excel UI Components Library

This is a modern React TypeScript component library focused on creating Excel-like table components with advanced filtering, sorting, and data type awareness.

## Project Structure

- `packages/core` - Core Excel Table component
- `packages/cli` - CLI tool for component installation (similar to shadcn-ui)
- `apps/docs` - Documentation and examples  
- `apps/playground` - Development playground
- Built with TypeScript, Vite, Tailwind CSS, and shadcn/ui components

## Development Guidelines

- Use shadcn's table components as the base for Excel Table
- Maintain HTML table syntax for ease of use
- Focus on TypeScript-first development
- Follow modern React patterns with hooks and context
- Ensure components are accessible and responsive
- Write comprehensive tests for all components

## Component Standards

- All components should be type-safe
- Use Tailwind CSS for styling with CSS variables for theming
- Support data types: string, number, date, boolean
- Implement Excel-like filtering with checkbox selection
- Support multi-column sorting
- Dynamic content generation for CLI installation scripts

## Publishing

Ready for npm publishing with:
- Automated CI/CD with GitHub Actions
- Changesets for version management
- TypeScript declarations
- ESM and CommonJS builds
- CLI tool with proper executable setup