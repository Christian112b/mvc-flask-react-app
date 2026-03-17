import { useState, type FormEvent, type JSX } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ForgotPasswordPage(): JSX.Element {
  const { resetPassword } = useAuth()
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)
    
    try {
      await resetPassword(email)
      setSuccessMessage('Se ha enviado un correo de recuperación. Por favor revisa tu bandeja de entrada.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el correo de recuperación')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-page__card">
        <h1 className="login-page__title">Recuperar contraseña</h1>
        <p className="login-page__subtitle">Ingresa tu correo electrónico</p>
        
        {error && <p className="login-page__error">{error}</p>}
        {successMessage && <p className="login-page__success">{successMessage}</p>}
        
        <form className="login-page__form" onSubmit={handleSubmit}>
          <label className="login-page__label" htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            className="login-page__input"
            placeholder="tu@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit" className="login-page__button" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar correo de recuperación'}
          </button>
        </form>

        <p className="login-page__footer">
          <Link to="/login" className="login-page__link">Volver a iniciar sesión</Link>
        </p>
      </div>
    </main>
  )
}
