import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
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
  // Configuración de producción
  build: {
    // En producción, las llamadas a /api se hacen al backend
    // Usar variable de entorno VITE_API_URL o assumir same-origin
  },
  // Variables de entorno
  envPrefix: ['VITE_', 'PUBLIC_'],
  define: {
    // Hacer disponible la URL del API en tiempo de build
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || ''),
  },
}))
