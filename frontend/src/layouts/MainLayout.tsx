import { useState, type JSX, ReactNode, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/AuthContext'
import './MainLayout.css'

interface MainLayoutProps {
  children: ReactNode
}

// Page titles based on route
const pageTitles: Record<string, string> = {
  '/': 'Proyectos - TaskForge',
  '/login': 'Iniciar Sesion - TaskForge',
  '/docs': 'Documentacion - TaskForge',
  '/jwt-demo': 'JWT Demo - TaskForge',
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  // Update document title based on current route
  useEffect(() => {
    const title = pageTitles[location.pathname] || 'TaskForge'
    document.title = title
  }, [location.pathname])

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
          <Link to="/" className="main-layout__logo">
            <FontAwesomeIcon icon={faHammer} className="main-layout__logo-icon" />
            Task<span className="main-layout__logo-forge">Forge</span>
          </Link>
          
          <div className="main-layout__links">
            {isAuthenticated && (
              <Link 
                to="/" 
                className={`main-layout__link ${location.pathname === '/' ? 'main-layout__link--active' : ''}`}
              >
                Proyectos
              </Link>
            )}
            <Link 
              to="/docs" 
              className={`main-layout__link ${location.pathname === '/docs' ? 'main-layout__link--active' : ''}`}
            >
              Docs
            </Link>
          </div>
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
                  className="main-layout__dropdown-logout"
                  onClick={() => {
                    logout()
                    setDropdownOpen(false)
                  }}
                >
                  Cerrar sesion
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
