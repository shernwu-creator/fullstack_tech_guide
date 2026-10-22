import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites are served from /<repository-name>/.
export default defineConfig({
  base: '/fullstack_tech_guide/',
  plugins: [react()],
  build: {
    target: 'es2022',
  },
})
