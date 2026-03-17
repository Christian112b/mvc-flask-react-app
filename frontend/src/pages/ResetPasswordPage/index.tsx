import { useState, useEffect, type FormEvent, type JSX } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export default function ResetPasswordPage(): JSX.Element {
  const navigate = useNavigate()
  const { updatePassword, isAuthenticated } = useAuth()
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)

  useEffect(() => {
    // Verificar si hay un token de recuperación en la URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const queryParams = new URLSearchParams(window.location.search)
    
    const accessToken = hashParams.get('access_token') || queryParams.get('access_token')
    const type = hashParams.get('type') || queryParams.get('type')
    const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token')
    
    // Siempre permitir acceso si hay token o tipo de recuperación en la URL
    if (accessToken || type === 'recovery' || type === 'password_change') {
      setIsValidToken(true)
      
      // Si hay tokens, establecer sesión
      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        }).then(({ error }) => {
          if (error) {
            console.error('Error setting session:', error)
          }
        })
      }
    } else {
      // No hay token en URL - verificar si hay sesión activa
      if (isAuthenticated) {
        setIsValidToken(true)
      } else {
        setIsValidToken(false)
      }
    }
  }, [isAuthenticated])

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    setIsLoading(true)
    
    try {
      await updatePassword(password)
      setSuccessMessage('Contraseña actualizada exitosamente')
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la contraseña')
    } finally {
      setIsLoading(false)
    }
  }

  // Mientras se verifica el token, mostrar estado de carga
  if (isValidToken === null) {
    return (
      <main className="login-page">
        <div className="login-page__card">
          <p className="login-page__subtitle">Verificando enlace...</p>
        </div>
      </main>
    )
  }

  // Si el token no es válido Y el usuario no está autenticado, mostrar error
  if (!isValidToken && !isAuthenticated) {
    return (
      <main className="login-page">
        <div className="login-page__card">
          <h1 className="login-page__title">Enlace inválido</h1>
          <p className="login-page__subtitle">El enlace de recuperación no es válido o ha expirado</p>
          <p className="login-page__footer">
            <Link to="/forgot-password" className="login-page__link">Solicitar un nuevo enlace</Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="login-page">
      <div className="login-page__card">
        <h1 className="login-page__title">Nueva contraseña</h1>
        <p className="login-page__subtitle">Ingresa tu nueva contraseña</p>
        
        {error && <p className="login-page__error">{error}</p>}
        {successMessage && <p className="login-page__success">{successMessage}</p>}
        
        <form className="login-page__form" onSubmit={handleSubmit}>
          <label className="login-page__label" htmlFor="password">Nueva contraseña</label>
          <input
            id="password"
            type="password"
            className="login-page__input"
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <label className="login-page__label" htmlFor="confirm-password">Confirmar contraseña</label>
          <input
            id="confirm-password"
            type="password"
            className="login-page__input"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit" className="login-page__button" disabled={isLoading}>
            {isLoading ? 'Actualizando...' : 'Cambiar contraseña'}
          </button>
        </form>

        <p className="login-page__footer">
          <Link to="/login" className="login-page__link">Volver a iniciar sesión</Link>
        </p>
      </div>
    </main>
  )
}
