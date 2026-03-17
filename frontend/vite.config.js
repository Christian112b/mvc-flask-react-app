import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        // Copy _redirects to dist after build
        const src = './public/_redirects'
        const dest = './dist/_redirects'
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
          console.log('Copied _redirects to dist')
        }
      }
    }
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  // Variables de entorno disponibles
  envPrefix: ['VITE_', 'PUBLIC_'],
})
