import { useState, type JSX, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import './MainLayout.css'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  // Obtener iniciales del usuario para el avatar
  const getUserInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <nav className="main-layout__nav">
          <Link to="/" className="main-layout__logo">MVC App</Link>
          
          {isAuthenticated && (
            <div className="main-layout__links">
              <Link 
                to="/" 
                className={`main-layout__link ${location.pathname === '/' ? 'main-layout__link--active' : ''}`}
              >
                Proyectos
              </Link>
            </div>
          )}
        </nav>
        
        {isAuthenticated && (
          <div className="main-layout__user-menu">
            <button
              type="button"
              className="main-layout__user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="main-layout__avatar">
                {getUserInitials()}
              </div>
              <span className="main-layout__dropdown-arrow">▼</span>
            </button>
            
            {dropdownOpen && (
              <div className="main-layout__dropdown">
                <button
                  type="button"
                  className="main-layout__dropdown-item"
                  onClick={() => {
                    toggleTheme()
                    setDropdownOpen(false)
                  }}
                >
                  {theme === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro'}
                </button>
                <div className="main-layout__dropdown-divider"></div>
                <button
                  type="button"
                  className="main-layout__dropdown-logout"
                  onClick={() => {
                    logout()
                    setDropdownOpen(false)
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <section className="main-layout__content">
        {children}
      </section>
    </div>
  )
}
