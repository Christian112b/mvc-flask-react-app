import type { JSX } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import GuestRoute from './components/GuestRoute'
import JwtDemoPage from './pages/JwtDemoPage'
import ProjectsPage from './pages/ProjectsPage'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Guardar ruta actual en localStorage cuando cambia
  useEffect(() => {
    if (location.pathname !== '/login') {
      localStorage.setItem('lastRoute', location.pathname)
    }
  }, [location])
  
  // Restaurar ruta al cargar si existe
  useEffect(() => {
    const lastRoute = localStorage.getItem('lastRoute')
    if (lastRoute && location.pathname === '/') {
      navigate(lastRoute, { replace: true })
    }
  }, [])
  
  return (
    <ThemeProvider>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#1f2937',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1f2937',
            },
          },
        }}
      />
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/jwt-demo"
            element={
              <ProtectedRoute>
                <JwtDemoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
