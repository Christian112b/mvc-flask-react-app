import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faBug, faCodeBranch, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../../../contexts/LanguageContext'
import type { JSX } from 'react'

export default function About(): JSX.Element {
  const { t } = useLanguage()

  return (
    <div className="doc-section">
      <h2 className="doc-section__title">{t('about.title')}</h2>
      
      <div className="doc-about">
        <div className="doc-about__simple">
          <p>
            TaskForge es un proyecto de gestión de tareas basado en la metodología Kanban, 
            construido con React, Flask y Supabase.
          </p>
          
          <div className="doc-about__links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="doc-about__link">
              <FontAwesomeIcon icon={faCodeBranch} />
              <span>Ver código fuente</span>
            </a>
            <a href="https://github.com/issues" target="_blank" rel="noopener noreferrer" className="doc-about__link">
              <FontAwesomeIcon icon={faBug} />
              <span>Reportar bugs</span>
            </a>
            <a href="https://github.com/discussions" target="_blank" rel="noopener noreferrer" className="doc-about__link">
              <FontAwesomeIcon icon={faCommentDots} />
              <span>Deja tus recomendaciones</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
