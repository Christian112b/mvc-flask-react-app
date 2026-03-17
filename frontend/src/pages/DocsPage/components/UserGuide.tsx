import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faCog, faPlay, faExternalLinkAlt, faPlus, faEdit, faTrash, faFolderOpen, faListOl, faLightbulb, faQuestionCircle, faDatabase, faLayerGroup, faCheckSquare, faWrench } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../../../contexts/LanguageContext'
import type { JSX } from 'react'

type UserGuideSection = 'platform' | 'dev'

export default function UserGuide(): JSX.Element {
  const [activeSubsection, setActiveSubsection] = useState<UserGuideSection>('platform')
  const { t } = useLanguage()

  const subsections: { id: UserGuideSection; labelKey: string }[] = [
    { id: 'platform', labelKey: 'userGuide.platformGuide' },
    { id: 'dev', labelKey: 'userGuide.devGuide' },
  ]

  const renderSubsection = () => {
    switch (activeSubsection) {
      case 'platform':
        return <PlatformGuide />
      case 'dev':
        return <DevGuide />
      default:
        return <PlatformGuide />
    }
  }

  return (
    <div className="doc-section">
      <h2 className="doc-section__title">{t('userGuide.title')}</h2>
      
      <div className="doc-subsection__tabs">
        {subsections.map((sub) => (
          <button
            key={sub.id}
            type="button"
            className={`doc-subsection__tab ${
              activeSubsection === sub.id ? 'doc-subsection__tab--active' : ''
            }`}
            onClick={() => setActiveSubsection(sub.id)}
          >
            {t(sub.labelKey)}
          </button>
        ))}
      </div>

      <div className="doc-subsection__content">
        {renderSubsection()}
      </div>
    </div>
  )
}

function PlatformGuide(): JSX.Element {
  const { t } = useLanguage()

  const features = [
    {
      icon: faPlus,
      titleKey: 'userGuide.features.projectCreation',
      descriptionKey: 'userGuide.features.projectCreation.desc',
    },
    {
      icon: faFolderOpen,
      titleKey: 'userGuide.features.categoryManagement',
      descriptionKey: 'userGuide.features.categoryManagement.desc',
    },
    {
      icon: faListOl,
      titleKey: 'userGuide.features.stageManagement',
      descriptionKey: 'userGuide.features.stageManagement.desc',
    },
    {
      icon: faLayerGroup,
      titleKey: 'userGuide.features.subtaskTracking',
      descriptionKey: 'userGuide.features.subtaskTracking.desc',
    },
    {
      icon: faEdit,
      titleKey: 'userGuide.features.inlineEditing',
      descriptionKey: 'userGuide.features.inlineEditing.desc',
    },
    {
      icon: faTrash,
      titleKey: 'userGuide.features.deleteOperations',
      descriptionKey: 'userGuide.features.deleteOperations.desc',
    },
  ]

  return (
    <div className="doc-subsection">
      <h3>{t('userGuide.platformGuide')}</h3>
      
      <p>
        {t('userGuide.platformGuide') === 'Guia de la Plataforma' 
          ? 'Aprende a usar TaskForge para gestionar tus proyectos de manera efectiva.'
          : 'Learn how to use TaskForge to manage your projects effectively.'}
      </p>

      <h4>{t('userGuide.features')}</h4>
      <p>{t('userGuide.features.subtitle')}</p>

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
    </div>
  )
}

function DevGuide(): JSX.Element {
  const { t } = useLanguage()

  const isSpanish = t('userGuide.devGuide') === 'Guia para Desarrolladores'

  const prerequisites = [
    { 
      icon: faTerminal, 
      title: 'Node.js 18+', 
      description: isSpanish ? 'Requerido para ejecutar el frontend' : 'Required for running the frontend' 
    },
    { 
      icon: faTerminal, 
      title: 'Python 3.9+', 
      description: isSpanish ? 'Requerido para ejecutar el backend' : 'Required for running the backend' 
    },
    { 
      icon: faDatabase, 
      title: isSpanish ? 'Cuenta de Supabase' : 'Supabase Account', 
      description: isSpanish ? 'El tier gratuito es suficiente para desarrollo' : 'Free tier is sufficient for development' 
    },
  ]

  const steps = [
    {
      titleKey: 'userGuide.cloneBackend',
      descriptionKey: 'userGuide.setupBackend',
      code: isSpanish 
        ? `cd backend
python -m venv venv

# Windows:
venv\\Scripts\\activate

# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt`
        : `cd backend
python -m venv venv

# Windows:
venv\\Scripts\\activate

# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt`,
    },
    {
      titleKey: 'userGuide.configureEnv',
      descriptionKey: 'userGuide.createEnv',
      code: `SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
SECRET_KEY=your_secret_key`,
      tipKey: 'userGuide.tip',
    },
    {
      titleKey: 'userGuide.setupFrontend',
      descriptionKey: 'userGuide.installDeps',
      code: isSpanish
        ? `cd frontend
npm install
npm run dev`
        : `cd frontend
npm install
npm run dev`,
    },
    {
      titleKey: 'userGuide.accessApp',
      descriptionKey: 'userGuide.openBrowser',
      code: 'http://localhost:5173',
      finalNoteKey: 'userGuide.testCredentials',
    },
  ]

  return (
    <div className="doc-subsection">
      <h3>{t('userGuide.devGuide')}</h3>
      
      <p>
        {isSpanish
          ? 'Esta guia te llevara a traves de la configuracion de TaskForge en tu maquina local.'
          : 'This guide will walk you through setting up TaskForge on your local machine.'}
      </p>

      <h4>{t('userGuide.prerequisites')}</h4>
      <div className="doc-prereq-grid">
        {prerequisites.map((prereq, index) => (
          <div key={index} className="doc-prereq-card">
            <FontAwesomeIcon icon={prereq.icon} className="doc-prereq-card__icon" />
            <div>
              <strong>{prereq.title}</strong>
              <p>{prereq.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h4>{t('userGuide.installationSteps')}</h4>
      
      {steps.map((step, index) => (
        <div key={index} className="doc-section__step">
          <div className="doc-section__step-number">{index + 1}</div>
          <div>
            <strong>{t(step.titleKey)}</strong>
            <p>{t(step.descriptionKey)}</p>
            <pre className="doc-section__code">{step.code}</pre>
            {step.tipKey && (
              <p className="doc-step-note">
                <FontAwesomeIcon icon={faLightbulb} /> 
                {t(step.tipKey)}
              </p>
            )}
            {step.finalNoteKey && (
              <p>{t(step.finalNoteKey)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
