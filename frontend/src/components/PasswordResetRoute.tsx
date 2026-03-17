import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface PasswordResetRouteProps {
  children: JSX.Element
}

/**
 * Ruta especial para el flujo de recuperación de contraseña.
 * Permite acceso tanto a usuarios no autenticados como a los que están
 * en proceso de recuperación (autenticados automáticamente por Supabase).
 */
export default function PasswordResetRoute({ children }: PasswordResetRouteProps): JSX.Element {
  const { isAuthenticated } = useAuth()
  
  // Siempre permitir acceso a esta ruta
  // La página de reset-password se encarga de validar el token
  return children
}
