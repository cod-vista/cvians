import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'class-variance-authority', 'clsx', 'lucide-react', 'tailwindcss', 'tailwindcss-animate'],
  esbuildOptions: (options) => {
    // Use React.createElement instead of jsx runtime to avoid bundling issues
    options.jsx = 'transform'
    options.jsxFactory = 'React.createElement'
    options.jsxFragment = 'React.Fragment'
  },
  // Add global for React to ensure proper deduplication
  globalName: 'CviansCore',
  onSuccess: async () => {
    console.log('Build completed successfully!')
  }
})