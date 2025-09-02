import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    outDir: './esm',
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: true,
  },
  plugins: [
  ],
})
