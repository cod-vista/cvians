import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'preact'],
  esbuildOptions: (options) => {
    // Use React.createElement instead of jsx runtime to avoid bundling issues
    options.jsx = 'transform'
    options.jsxFactory = 'React.createElement'
    options.jsxFragment = 'React.Fragment'
  },
  onSuccess: async () => {
    console.log('Build completed successfully!')
  }
})