import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faTasks, faCheckCircle, faLock, faServer, faDatabase, faCode, faPalette, faMobileAlt, faRocket } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../../../contexts/LanguageContext'
import type { JSX } from 'react'

export default function Introduction(): JSX.Element {
  const { t } = useLanguage()

  const features = [
    {
      icon: faProjectDiagram,
      titleKey: 'features.projectManagement',
      descriptionKey: 'features.projectManagement.desc',
    },
    {
      icon: faTasks,
      titleKey: 'features.kanbanBoards',
      descriptionKey: 'features.kanbanBoards.desc',
    },
    {
      icon: faCheckCircle,
      titleKey: 'features.taskManagement',
      descriptionKey: 'features.taskManagement.desc',
    },
    {
      icon: faLock,
      titleKey: 'features.secureAuth',
      descriptionKey: 'features.secureAuth.desc',
    },
  ]

  const highlights = [
    'intro.highlights',
  ]

  return (
    <div className="doc-section">
      <h2 className="doc-section__title">{t('intro.title')}</h2>
      
      <p className="doc-section__text">
        {t('intro.description1')}
      </p>

      <p className="doc-section__text">
        {t('intro.description2')}
      </p>

      <h3 className="doc-section__subtitle">{t('intro.keyFeatures')}</h3>
      <div className="doc-features-grid">
        {features.map((feature, index) => (
          <div key={index} className="doc-feature-card">
            <div className="doc-feature-card__icon-wrapper">
              <FontAwesomeIcon icon={feature.icon} className="doc-feature-card__icon" />
            </div>
            <h4>{t(feature.titleKey)}</h4>
            <p>{t(feature.descriptionKey)}</p>
          </div>
        ))}
      </div>

      <h3 className="doc-section__subtitle">{t('intro.highlights')}</h3>
      <ul className="doc-highlights-list">
        <li>
          <FontAwesomeIcon icon={faCheckCircle} className="doc-highlights-list__icon" />
          {t('intro.highlight.1')}
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckCircle} className="doc-highlights-list__icon" />
          {t('intro.highlight.2')}
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckCircle} className="doc-highlights-list__icon" />
          {t('intro.highlight.3')}
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckCircle} className="doc-highlights-list__icon" />
          {t('intro.highlight.4')}
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckCircle} className="doc-highlights-list__icon" />
          {t('intro.highlight.5')}
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckCircle} className="doc-highlights-list__icon" />
          {t('intro.highlight.6')}
        </li>
      </ul>

      <div className="doc-section__cta">
        <p>
          {t('intro.cta')}
        </p>
      </div>
    </div>
  )
}
