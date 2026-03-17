import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faLightbulb, faExclamationTriangle, faRocket, faMobileAlt, faChartLine, faUsers, faCloud, faBrain, faCheckCircle, faGraduationCap, faClock, faShieldAlt, faPalette, faDatabase, faServer, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../../../contexts/LanguageContext'
import type { JSX } from 'react'

export default function Challenges(): JSX.Element {
  const { t } = useLanguage()
  
  const isSpanish = t('userGuide.devGuide') === 'Guia para Desarrolladores'

  const challenges = [
    {
      icon: faShieldAlt,
      title: isSpanish ? 'Autenticación Segura con JWT' : 'Secure JWT Authentication',
      problem: isSpanish 
        ? 'Necesitaba implementar un sistema de autenticación seguro que funcionara con Supabase Auth'
        : 'Needed to implement a secure authentication system that worked with Supabase Auth',
      solution: isSpanish
        ? 'Middleware personalizado que extrae y valida tokens JWT de las solicitudes entrantes, extrayendo el user_id del payload'
        : 'Custom middleware that extracts and validates JWT tokens from incoming requests, extracting user_id from the payload',
      highlight: isSpanish ? 'Aprendí a manejar tokens JWT y autenticación basada en headers' : 'Learned to handle JWT tokens and header-based authentication'
    },
    {
      icon: faPalette,
      title: isSpanish ? 'Sistema de Temas Dinámicos' : 'Dynamic Theming System',
      problem: isSpanish
        ? 'Quería ofrecer una experiencia de usuario personalizada con modo oscuro/claro'
        : 'Wanted to offer a personalized user experience with dark/light mode',
      solution: isSpanish
        ? 'CSS Custom Properties combinadas con React Context para persistencia y cambio dinámico de temas'
        : 'CSS Custom Properties combined with React Context for persistence and dynamic theme switching',
      highlight: isSpanish ? 'Entendí el poder de CSS Variables y estado global en React' : 'Understood the power of CSS Variables and global state in React'
    },
    {
      icon: faDatabase,
      title: isSpanish ? 'Diseño de Esquema Relacional' : 'Relational Schema Design',
      problem: isSpanish
        ? 'Diseñar una base de datos que soportara proyectos, etapas y subtareas con relaciones correctas'
        : 'Designing a database that supported projects, stages, and subtasks with correct relationships',
      solution: isSpanish
        ? 'Esquema con claves foráneas apropiadas y políticas RLS para seguridad a nivel de base de datos'
        : 'Schema with appropriate foreign keys and RLS policies for database-level security',
      highlight: isSpanish ? 'Dominé el diseño de bases de datos relacionales y seguridad con PostgreSQL' : 'Mastered relational database design and security with PostgreSQL'
    },
    {
      icon: faCodeBranch,
      title: isSpanish ? 'Arquitectura MVC en Python' : 'MVC Architecture in Python',
      problem: isSpanish
        ? 'Necesitaba una estructura de backend organizada y mantenible'
        : 'Needed an organized and maintainable backend structure',
      solution: isSpanish
        ? 'Patrón MVC con Pydantic para modelos, Controllers para lógica de negocio, y Views como handlers de API'
        : 'MVC pattern with Pydantic for models, Controllers for business logic, and Views as API handlers',
      highlight: isSpanish ? 'Aprendí a estructurar aplicaciones Python de manera profesional' : 'Learned to structure Python applications professionally'
    }
  ]

  const lessons = [
    {
      icon: faCheckCircle,
      title: isSpanish ? 'Separación de Responsabilidades' : 'Separation of Concerns',
      description: isSpanish
        ? 'Separar la lógica de negocio en controllers, los modelos de datos en Pydantic, y los handlers en views hace el código más mantenible'
        : 'Separating business logic in controllers, data models in Pydantic, and handlers in views makes code more maintainable'
    },
    {
      icon: faGraduationCap,
      title: isSpanish ? 'TypeScript Previene Errores' : 'TypeScript Prevents Errors',
      description: isSpanish
        ? 'El tipado estático de TypeScript captura errores en tiempo de desarrollo, reduciendo bugs en producción'
        : 'TypeScript static typing catches errors at development time, reducing bugs in production'
    },
    {
      icon: faClock,
      title: isSpanish ? 'Flask Simplifica el Desarrollo' : 'Flask Simplifies Development',
      description: isSpanish
        ? 'Flask es ligero y flexible, permitiendo crear APIs rapidamente con extensiones utiles'
        : 'Flask is lightweight and flexible, allowing you to quickly create APIs with useful extensions'
    },
    {
      icon: faShieldAlt,
      title: isSpanish ? 'Seguridad en Capas' : 'Layered Security',
      description: isSpanish
        ? 'Combinar RLS en base de datos con validación JWT en backend crea múltiples capas de protección'
        : 'Combining RLS in database with JWT validation in backend creates multiple protection layers'
    },
    {
      icon: faBrain,
      title: isSpanish ? 'Context API para Estado Global' : 'Context API for Global State',
      description: isSpanish
        ? 'React Context es suficiente para necesidades de estado global sin necesidad de Redux'
        : 'React Context is sufficient for global state needs without requiring Redux'
    }
  ]

  const futureWork = [
    {
      icon: faMobileAlt,
      title: isSpanish ? 'Aplicación Móvil' : 'Mobile Application',
      description: isSpanish
        ? 'Implementar React Native para crear aplicaciones iOS y Android nativas'
        : 'Implement React Native to create native iOS and Android apps',
      priority: 'Medium'
    },
    {
      icon: faUsers,
      title: isSpanish ? 'Colaboración en Tiempo Real' : 'Real-Time Collaboration',
      description: isSpanish
        ? 'Permitir que múltiples usuarios trabajen en el mismo proyecto simultáneamente usando Supabase Realtime'
        : 'Allow multiple users to work on the same project simultaneously using Supabase Realtime',
      priority: 'High'
    },
    {
      icon: faChartLine,
      title: isSpanish ? 'Dashboard de Analytics' : 'Analytics Dashboard',
      description: isSpanish
        ? 'Agregar métricas de productividad, gráficos de progreso y estadísticas de tareas'
        : 'Add productivity metrics, progress charts, and task statistics',
      priority: 'Low'
    },
    {
      icon: faCloud,
      title: isSpanish ? 'Notificaciones Push' : 'Push Notifications',
      description: isSpanish
        ? 'Implementar notificaciones para recordatorios de tareas y actualizaciones de proyectos'
        : 'Implement notifications for task reminders and project updates',
      priority: 'Medium'
    },
    {
      icon: faBrain,
      title: isSpanish ? 'Integración con IA' : 'AI Integration',
      description: isSpanish
        ? 'Agregar sugerencias inteligentes de tareas, priorización automática y análisis de productividad'
        : 'Add intelligent task suggestions, automatic prioritization, and productivity analysis',
      priority: 'Low'
    }
  ]

  return (
    <div className="doc-section">
      <h2 className="doc-section__title">
        <FontAwesomeIcon icon={faTrophy} style={{ color: 'var(--color-primary)' }} />
        {isSpanish ? 'Desafíos y Lecciones' : 'Challenges & Lessons'}
      </h2>
      
      <p className="doc-section__text">
        {isSpanish
          ? 'Esta sección destaca los principales desafíos técnicos que enfrenté y las soluciones que implementé, demostrando mis habilidades de resolución de problemas.'
          : 'This section highlights the main technical challenges I faced and the solutions I implemented, demonstrating my problem-solving skills.'}
      </p>

      {/* Challenges Section */}
      <h3 className="doc-section__subtitle">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        {isSpanish ? 'Desafíos Técnicos' : 'Technical Challenges'}
      </h3>
      
      <div className="doc-challenges-grid">
        {challenges.map((challenge, index) => (
          <div key={index} className="doc-challenge-card">
            <div className="doc-challenge-card__header">
              <FontAwesomeIcon icon={challenge.icon} className="doc-challenge-card__icon" />
              <h4>{challenge.title}</h4>
            </div>
            <div className="doc-challenge-card__content">
              <div className="doc-challenge-card__problem">
                <strong>{isSpanish ? 'Problema:' : 'Problem:'}</strong>
                <p>{challenge.problem}</p>
              </div>
              <div className="doc-challenge-card__solution">
                <strong>{isSpanish ? 'Solución:' : 'Solution:'}</strong>
                <p>{challenge.solution}</p>
              </div>
              <div className="doc-challenge-card__highlight">
                <FontAwesomeIcon icon={faLightbulb} />
                <span>{challenge.highlight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lessons Learned Section */}
      <h3 className="doc-section__subtitle">
        <FontAwesomeIcon icon={faGraduationCap} />
        {isSpanish ? 'Lecciones Aprendidas' : 'Lessons Learned'}
      </h3>
      
      <div className="doc-lessons-list">
        {lessons.map((lesson, index) => (
          <div key={index} className="doc-lesson-item">
            <FontAwesomeIcon icon={lesson.icon} className="doc-lesson-item__icon" />
            <div>
              <h4>{lesson.title}</h4>
              <p>{lesson.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Future Work Section */}
      <h3 className="doc-section__subtitle">
        <FontAwesomeIcon icon={faRocket} />
        {isSpanish ? 'Trabajo Futuro' : 'Future Work'}
      </h3>
      
      <p className="doc-section__text">
        {isSpanish
          ? 'Características y mejoras planificadas para futuras iteraciones del proyecto:'
          : 'Features and improvements planned for future iterations of the project:'}
      </p>
      
      <div className="doc-future-grid">
        {futureWork.map((feature, index) => (
          <div key={index} className="doc-future-card">
            <div className="doc-future-card__header">
              <FontAwesomeIcon icon={feature.icon} className="doc-future-card__icon" />
              <h4>{feature.title}</h4>
              <span className={`doc-future-card__priority doc-future-card__priority--${feature.priority.toLowerCase()}`}>
                {feature.priority}
              </span>
            </div>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Summary CTA */}
      <div className="doc-section__cta">
        <p>
          <FontAwesomeIcon icon={faTrophy} />
          {isSpanish
            ? ' Este proyecto demuestra mi capacidad para construir aplicaciones full-stack completas con tecnologías modernas.'
            : ' This project demonstrates my ability to build complete full-stack applications with modern technologies.'}
        </p>
      </div>
    </div>
  )
}
