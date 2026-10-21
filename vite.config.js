import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base keeps the built site portable on static hosts and sub-paths.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
})
