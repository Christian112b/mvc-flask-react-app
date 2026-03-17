import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faCogs, faTrophy, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext'
import Introduction from './components/Introduction'
import UserGuide from './components/UserGuide'
import TechnicalDocs from './components/TechnicalDocs'
import Challenges from './components/Challenges'
import './DocsPage.css'
import './components/DocsComponents.css'

type DocSection = 'introduction' | 'user-guide' | 'technical' | 'challenges'

function DocsPageContent() {
  const [activeSection, setActiveSection] = useState<DocSection>('introduction')
  const { language, setLanguage, t } = useLanguage()

  const sections: { id: DocSection; labelKey: string; icon: typeof faHome }[] = [
    { id: 'introduction', labelKey: 'nav.introduction', icon: faHome },
    { id: 'user-guide', labelKey: 'nav.userGuide', icon: faBook },
    { id: 'technical', labelKey: 'nav.technical', icon: faCogs },
    { id: 'challenges', labelKey: 'nav.challenges', icon: faTrophy },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return <Introduction />
      case 'user-guide':
        return <UserGuide />
      case 'technical':
        return <TechnicalDocs />
      case 'challenges':
        return <Challenges />
      default:
        return <Introduction />
    }
  }

  return (
    <div className="docs-page">
      <header className="docs-page__header">
        <div className="docs-page__header-top">
          <h1 className="docs-page__title">
            <FontAwesomeIcon icon={faBook} style={{ color: 'var(--color-primary)' }} />
            {t('nav.introduction') === 'Introduccion' ? 'Documentacion' : 'Documentation'}
          </h1>
          <div className="docs-page__language-selector">
            <FontAwesomeIcon icon={faGlobe} className="docs-page__language-icon" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="docs-page__language-select"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <p className="docs-page__subtitle">
          TaskForge - {t('intro.subtitle').split(' - ')[1] || 'Project Management with Flask, React & Supabase'}
        </p>
      </header>

      <div className="docs-page__container">
        <nav className="docs-page__sidebar">
          <ul className="docs-page__nav">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className={`docs-page__nav-item ${
                    activeSection === section.id ? 'docs-page__nav-item--active' : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="docs-page__nav-icon">
                    <FontAwesomeIcon icon={section.icon} />
                  </span>
                  <span className="docs-page__nav-label">{t(section.labelKey)}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="docs-page__content">
          <div className="docs-page__card">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DocsPage() {
  return (
    <LanguageProvider>
      <DocsPageContent />
    </LanguageProvider>
  )
}
