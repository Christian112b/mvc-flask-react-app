import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  // Configuración para producción
  build: {
    // En producción, el proxy no funciona
    // El frontend se serve desde un CDN y llama directamente al backend
    // Por defecto, usa el mismo origen
  },
  // Variables de entorno disponibles
  envPrefix: ['VITE_', 'PUBLIC_'],
})
