import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faDatabase, faCode, faPalette, faNetworkWired, faBox, faCube, faShieldAlt, faRoute, faBookOpen, faLayerGroup, faDatabase as faDb, faKey, faExchangeAlt, faFolder, faFileCode, faFileAlt, faArrowRight, faArrowDown, faSync, faUser, faLock, faEnvelope, faProjectDiagram, faTable, faLink, faColumns, faList } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../../../contexts/LanguageContext'
import type { JSX } from 'react'

type TechSection = 'architecture' | 'stack' | 'api' | 'database' | 'patterns'

export default function TechnicalDocs(): JSX.Element {
  const [activeSubsection, setActiveSubsection] = useState<TechSection>('architecture')
  const { t } = useLanguage()

  const subsections: { id: TechSection; labelKey: string }[] = [
    { id: 'architecture', labelKey: 'tech.architecture' },
    { id: 'stack', labelKey: 'tech.stack' },
    { id: 'database', labelKey: 'tech.database' },
    { id: 'api', labelKey: 'tech.api' },
    { id: 'patterns', labelKey: 'tech.patterns' },
  ]

  const renderSubsection = () => {
    switch (activeSubsection) {
      case 'architecture':
        return <Architecture />
      case 'stack':
        return <TechStack />
      case 'database':
        return <DatabaseSchema />
      case 'api':
        return <APIReference />
      case 'patterns':
        return <DesignPatterns />
      default:
        return <Architecture />
    }
  }

  return (
    <div className="doc-section">
      <h2 className="doc-section__title">{t('tech.title')}</h2>
      
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

function Architecture(): JSX.Element {
  const { t } = useLanguage()

  return (
    <div className="doc-subsection">
      <h3>{t('tech.systemArchitecture')}</h3>
      
      <p>
        {t('tech.systemArchitecture.desc')}
      </p>

      <div className="doc-architecture-diagram">
        <div className="doc-arch-layer doc-arch-layer--frontend">
          <FontAwesomeIcon icon={faCode} className="doc-arch-layer__icon" />
          <h4>{t('tech.frontend')}</h4>
          <ul>
            <li>Single Page Application</li>
            <li>TypeScript</li>
            <li>React Router</li>
            <li>Context API</li>
          </ul>
        </div>
        <div className="doc-arch-arrow">
          <FontAwesomeIcon icon={faExchangeAlt} />
        </div>
        <div className="doc-arch-layer doc-arch-layer--backend">
          <FontAwesomeIcon icon={faServer} className="doc-arch-layer__icon" />
          <h4>{t('tech.backend')}</h4>
          <ul>
            <li>MVC Pattern</li>
            <li>JWT Authentication</li>
            <li>RESTful Endpoints</li>
            <li>Supabase Client</li>
          </ul>
        </div>
        <div className="doc-arch-arrow">
          <FontAwesomeIcon icon={faExchangeAlt} />
        </div>
        <div className="doc-arch-layer doc-arch-layer--database">
          <FontAwesomeIcon icon={faDatabase} className="doc-arch-layer__icon" />
          <h4>{t('tech.database')}</h4>
          <ul>
            <li>PostgreSQL</li>
            <li>Row Level Security</li>
            <li>Auth Service</li>
          </ul>
        </div>
      </div>

      {/* Project Structure */}
      <h4>{t('tech.projectStructure')}</h4>
      <p>
        {t('tech.projectStructure.desc')}
      </p>

      <div className="doc-structure-tree">
        {/* Root */}
        <div className="doc-tree-line">
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">taskforge</span>
          <span className="doc-tree-slash">/</span>
        </div>

        {/* Backend */}
        <div className="doc-tree-line">
          <span className="doc-tree-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">backend</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Flask API</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFileCode} /></span>
          <span className="doc-tree-file">app.py</span>
          <span className="doc-tree-comment"># Application entry point</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFileCode} /></span>
          <span className="doc-tree-file">config.py</span>
          <span className="doc-tree-comment"># Configuration settings</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">models</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Data models (SQLAlchemy)</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">controllers</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Business logic</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">views</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># API route handlers</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">middleware</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># JWT authentication</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">services</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># External service clients</span>
        </div>

        {/* Frontend */}
        <div className="doc-tree-line">
          <span className="doc-tree-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">frontend</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># React SPA</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-double-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">src</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Source code</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-triple-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">pages</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Page components</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-triple-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">components</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Reusable UI components</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-triple-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">contexts</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># React contexts (state)</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-triple-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">layouts</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># Layout components</span>
        </div>
        <div className="doc-tree-line">
          <span className="doc-tree-triple-indent"></span>
          <span className="doc-tree-icon"><FontAwesomeIcon icon={faFolder} /></span>
          <span className="doc-tree-folder">lib</span>
          <span className="doc-tree-slash">/</span>
          <span className="doc-tree-comment"># API client functions</span>
        </div>
      </div>

      <h4>{t('tech.dataFlow')}</h4>
      <p>
        {t('tech.dataFlow.desc')}
      </p>

      {/* Data Flow Diagram */}
      <div className="doc-dataflow-diagram">
        {/* Authentication Flow */}
        <div className="doc-dataflow-section">
          <h5><FontAwesomeIcon icon={faLock} /> Authentication Flow</h5>
          <div className="doc-dataflow-steps">
            <div className="doc-dataflow-step">
              <div className="doc-dataflow-icon"><FontAwesomeIcon icon={faUser} /></div>
              <span>User Registers</span>
            </div>
            <div className="doc-dataflow-arrow"><FontAwesomeIcon icon={faArrowDown} /></div>
            <div className="doc-dataflow-step">
              <div className="doc-dataflow-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
              <span>Supabase Auth</span>
            </div>
            <div className="doc-dataflow-arrow"><FontAwesomeIcon icon={faArrowDown} /></div>
            <div className="doc-dataflow-step">
              <div className="doc-dataflow-icon"><FontAwesomeIcon icon={faKey} /></div>
              <span>JWT Token</span>
            </div>
          </div>
        </div>

        {/* API Request Flow */}
        <div className="doc-dataflow-section">
          <h5><FontAwesomeIcon icon={faSync} /> API Request Flow</h5>
          <div className="doc-dataflow-steps">
            <div className="doc-dataflow-step">
              <div className="doc-dataflow-icon"><FontAwesomeIcon icon={faCode} /></div>
              <span>React Client</span>
            </div>
            <div className="doc-dataflow-arrow"><FontAwesomeIcon icon={faArrowDown} /></div>
            <div className="doc-dataflow-step">
              <div className="doc-dataflow-icon"><FontAwesomeIcon icon={faServer} /></div>
              <span>Flask API</span>
            </div>
            <div className="doc-dataflow-arrow"><FontAwesomeIcon icon={faArrowDown} /></div>
            <div className="doc-dataflow-step">
              <div className="doc-dataflow-icon"><FontAwesomeIcon icon={faDatabase} /></div>
              <span>Supabase DB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TechStack(): JSX.Element {
  const { t } = useLanguage()

  const stack = [
    {
      category: 'Frontend',
      icon: faCode,
      technologies: [
        { name: 'React', desc: 'UI Library - Component-based user interface', version: '18.x' },
        { name: 'TypeScript', desc: 'Type safety and better developer experience', version: '5.x' },
        { name: 'Vite', desc: 'Next-generation build tool', version: '5.x' },
        { name: 'React Router', desc: 'Client-side routing', version: '6.x' },
        { name: '@dnd-kit', desc: 'Drag and drop functionality for Kanban', version: '6.x' },
      ],
    },
    {
      category: 'Backend',
      icon: faServer,
      technologies: [
        { name: 'Flask', desc: 'Lightweight WSGI web framework', version: '3.x' },
        { name: 'Python', desc: 'Programming language', version: '3.11+' },
        { name: 'Pydantic', desc: 'Data validation using Python type annotations', version: '2.x' },
        { name: 'PyJWT', desc: 'JWT token handling', version: '2.x' },
        { name: 'Flask-CORS', desc: 'Cross-origin resource sharing', version: '4.x' },
      ],
    },
    {
      category: 'Database & Auth',
      icon: faDb,
      technologies: [
        { name: 'Supabase', desc: 'Open-source Firebase alternative', version: 'Free' },
        { name: 'PostgreSQL', desc: 'Relational database', version: '15+' },
        { name: 'Row Level Security', desc: 'Database-level security policies', version: '-' },
        { name: 'Supabase Auth', desc: 'Built-in authentication service', version: '-' },
      ],
    },
    {
      category: 'Development Tools',
      icon: faBox,
      technologies: [
        { name: 'ESLint', desc: 'Code linting and style enforcement', version: '8.x' },
        { name: 'Git', desc: 'Version control system', version: '2.x' },
        { name: 'VS Code', desc: 'Recommended code editor', version: 'Latest' },
      ],
    },
  ]

  return (
    <div className="doc-subsection">
      <h3>{t('tech.techStack')}</h3>
      
      <p>
        {t('tech.techStack.desc')}
      </p>
      
      <div className="doc-stack-grid">
        {stack.map((category, index) => (
          <div key={index} className="doc-stack-category">
            <div className="doc-stack-category__header">
              <FontAwesomeIcon icon={category.icon} className="doc-stack-category__icon" />
              <h4>{category.category}</h4>
            </div>
            <ul>
              {category.technologies.map((tech, i) => (
                <li key={i}>
                  <strong>{tech.name}</strong>
                  <span className="doc-stack-category__version">v{tech.version}</span>
                  <p>{tech.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function DatabaseSchema(): JSX.Element {
  const { t } = useLanguage()

  const tables = [
    {
      name: 'users',
      icon: faUser,
      description: 'Stores registered user information',
      fields: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
        { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE, NOT NULL' },
        { name: 'password_hash', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' },
      ]
    },
    {
      name: 'categories',
      icon: faList,
      description: 'User-defined categories for organizing projects',
      fields: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
        { name: 'color', type: 'VARCHAR(7)', constraints: 'Hex color code' },
        { name: 'user_id', type: 'UUID', constraints: 'REFERENCES users(id)' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' },
      ]
    },
    {
      name: 'projects',
      icon: faProjectDiagram,
      description: 'Main project containers',
      fields: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(200)', constraints: 'NOT NULL' },
        { name: 'description', type: 'TEXT', constraints: 'Nullable' },
        { name: 'user_id', type: 'UUID', constraints: 'REFERENCES users(id)' },
        { name: 'category_id', type: 'UUID', constraints: 'REFERENCES categories(id)' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' },
      ]
    },
    {
      name: 'stages',
      icon: faColumns,
      description: 'Kanban board columns within projects',
      fields: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
        { name: 'project_id', type: 'UUID', constraints: 'REFERENCES projects(id)' },
        { name: 'user_id', type: 'UUID', constraints: 'REFERENCES users(id)' },
        { name: 'order_index', type: 'INTEGER', constraints: 'Column position' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' },
      ]
    },
    {
      name: 'subtasks',
      icon: faLink,
      description: 'Individual tasks within stages',
      fields: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
        { name: 'name', type: 'VARCHAR(200)', constraints: 'NOT NULL' },
        { name: 'description', type: 'TEXT', constraints: 'Nullable' },
        { name: 'status', type: 'VARCHAR(20)', constraints: "Default: 'todo'" },
        { name: 'is_completed', type: 'BOOLEAN', constraints: 'Default: false' },
        { name: 'stage_id', type: 'UUID', constraints: 'REFERENCES stages(id)' },
        { name: 'user_id', type: 'UUID', constraints: 'REFERENCES users(id)' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' },
      ]
    },
  ]

  const relationships = [
    { from: 'projects', to: 'categories', type: 'Many-to-One', description: 'Each project belongs to one category' },
    { from: 'projects', to: 'users', type: 'Many-to-One', description: 'Each project belongs to one user' },
    { from: 'stages', to: 'projects', type: 'Many-to-One', description: 'Each stage belongs to one project' },
    { from: 'subtasks', to: 'stages', type: 'Many-to-One', description: 'Each subtask belongs to one stage' },
    { from: 'categories', to: 'users', type: 'Many-to-One', description: 'Each category belongs to one user' },
  ]

  return (
    <div className="doc-subsection">
      <h3>Database Schema</h3>
      
      <p>
        TaskForge uses PostgreSQL via Supabase with Row Level Security (RLS) policies to ensure data isolation between users.
      </p>

      <h4><FontAwesomeIcon icon={faTable} /> Database Tables</h4>
      
      <div className="doc-tables-grid">
        {tables.map((table, index) => (
          <div key={index} className="doc-table-card">
            <div className="doc-table-card__header">
              <FontAwesomeIcon icon={table.icon} className="doc-table-card__icon" />
              <h5>{table.name}</h5>
            </div>
            <p className="doc-table-card__desc">{table.description}</p>
            <table className="doc-table-card__fields">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Constraints</th>
                </tr>
              </thead>
              <tbody>
                {table.fields.map((field, i) => (
                  <tr key={i}>
                    <td><code>{field.name}</code></td>
                    <td><code>{field.type}</code></td>
                    <td>{field.constraints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <h4><FontAwesomeIcon icon={faLink} /> Table Relationships</h4>
      
      <div className="doc-relationships">
        {relationships.map((rel, index) => (
          <div key={index} className="doc-relationship">
            <span className="doc-relationship__from">{rel.from}</span>
            <span className="doc-relationship__arrow"><FontAwesomeIcon icon={faArrowRight} /></span>
            <span className="doc-relationship__to">{rel.to}</span>
            <span className="doc-relationship__type">{rel.type}</span>
            <span className="doc-relationship__desc">{rel.description}</span>
          </div>
        ))}
      </div>

      <div className="doc-security-info">
        <h4><FontAwesomeIcon icon={faShieldAlt} /> Security: Row Level Security (RLS)</h4>
        <p>
          All tables have RLS policies enabled ensuring users can only access their own data:
        </p>
        <pre className="doc-section__code">
{`-- Example RLS Policy for Projects
CREATE POLICY "Users can only see own projects" 
ON projects FOR ALL 
USING (auth.uid() = user_id);`}
        </pre>
      </div>
    </div>
  )
}

function APIReference(): JSX.Element {
  const { t } = useLanguage()

  const endpoints = [
    { method: 'POST', path: '/auth/register', desc: 'Register a new user with email and password', auth: 'No' },
    { method: 'POST', path: '/auth/login', desc: 'Login and receive JWT authentication token', auth: 'No' },
    { method: 'GET', path: '/projects', desc: 'Retrieve all projects for the authenticated user', auth: 'Yes' },
    { method: 'POST', path: '/projects', desc: 'Create a new project with name and description', auth: 'Yes' },
    { method: 'PUT', path: '/projects/:id', desc: 'Update an existing projects information', auth: 'Yes' },
    { method: 'DELETE', path: '/projects/:id', desc: 'Delete a project and all associated data', auth: 'Yes' },
    { method: 'GET', path: '/categories', desc: 'Get all categories for the user', auth: 'Yes' },
    { method: 'POST', path: '/categories', desc: 'Create a new category', auth: 'Yes' },
    { method: 'GET', path: '/stages/:project_id', desc: 'Get all stages for a specific project', auth: 'Yes' },
    { method: 'POST', path: '/stages', desc: 'Create a new stage in a project', auth: 'Yes' },
    { method: 'PUT', path: '/stages/:id', desc: 'Update stage details or order', auth: 'Yes' },
    { method: 'DELETE', path: '/stages/:id', desc: 'Delete a stage and its subtasks', auth: 'Yes' },
    { method: 'GET', path: '/subtasks/:stage_id', desc: 'Get all subtasks for a stage', auth: 'Yes' },
    { method: 'POST', path: '/subtasks', desc: 'Create a new subtask', auth: 'Yes' },
    { method: 'PUT', path: '/subtasks/:id', desc: 'Update subtask details or status', auth: 'Yes' },
    { method: 'DELETE', path: '/subtasks/:id', desc: 'Delete a subtask', auth: 'Yes' },
  ]

  return (
    <div className="doc-subsection">
      <h3>{t('tech.endpoints')}</h3>
      
      <p>
        {t('tech.systemArchitecture.desc').split('.')[0]}. All endpoints (except authentication) require a valid JWT token.
      </p>
      
      <div className="doc-api-info">
        <div className="doc-api-info__item">
          <strong>Base URL:</strong>
          <code>http://localhost:5000</code>
        </div>
        <div className="doc-api-info__item">
          <strong>Content-Type:</strong>
          <code>application/json</code>
        </div>
      </div>

      <h4>{t('tech.authentication')}</h4>
      <p>
        {t('tech.authentication.desc')}
      </p>
      <pre className="doc-section__code">
Authorization: Bearer {'{'}your_jwt_token{'}'}
      </pre>

      <h4>{t('tech.endpoints')}</h4>
      <div className="doc-endpoints">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="doc-endpoint">
            <span className={`doc-endpoint__method doc-endpoint__method--${endpoint.method.toLowerCase()}`}>
              {endpoint.method}
            </span>
            <code className="doc-endpoint__path">{endpoint.path}</code>
            <span className="doc-endpoint__desc">{endpoint.desc}</span>
            <span className={`doc-endpoint__auth ${endpoint.auth === 'Yes' ? 'doc-endpoint__auth--yes' : 'doc-endpoint__auth--no'}`}>
              {endpoint.auth === 'Yes' ? <><FontAwesomeIcon icon={faKey} /> Auth</> : <><FontAwesomeIcon icon={faShieldAlt} /> Public</>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DesignPatterns(): JSX.Element {
  const { t } = useLanguage()

  const patterns = [
    {
      icon: faLayerGroup,
      titleKey: 'patterns.mvc',
      descriptionKey: 'patterns.mvc.desc',
      details: [
        'Models: Define data structures using Pydantic (Project, Stage, Subtask, Category)',
        'Controllers: Handle business logic and data processing',
        'Views: API route handlers that return JSON responses',
      ],
    },
    {
      icon: faBox,
      titleKey: 'patterns.repository',
      descriptionKey: 'patterns.repository.desc',
      details: [
        'projectsApi.ts - Project CRUD operations',
        'stagesApi.ts - Stage management',
        'subtasksApi.ts - Subtask operations',
        'categoriesApi.ts - Category management',
      ],
    },
    {
      icon: faCube,
      titleKey: 'patterns.context',
      descriptionKey: 'patterns.context.desc',
      details: [
        'AuthContext: User authentication state, login/logout functions, JWT token management',
        'ThemeContext: Dark/light mode preferences, theme toggle function',
      ],
    },
    {
      icon: faRoute,
      titleKey: 'patterns.routes',
      descriptionKey: 'patterns.routes.desc',
      details: [
        'ProtectedRoute: Redirects unauthenticated users to login page',
        'GuestRoute: Redirects authenticated users away from login/register pages',
      ],
    },
    {
      icon: faShieldAlt,
      titleKey: 'patterns.jwt',
      descriptionKey: 'patterns.jwt.desc',
      details: [
        'Token extraction from Authorization header',
        'User ID extraction from JWT payload',
        'Request context enrichment with user information',
        'Error handling for invalid/expired tokens',
      ],
    },
  ]

  return (
    <div className="doc-subsection">
      <h3>{t('patterns.title')}</h3>
      
      <p>
        {t('patterns.desc')}
      </p>
      
      <div className="doc-patterns">
        {patterns.map((pattern, index) => (
          <div key={index} className="doc-pattern">
            <div className="doc-pattern__header">
              <FontAwesomeIcon icon={pattern.icon} className="doc-pattern__icon" />
              <h4>{t(pattern.titleKey)}</h4>
            </div>
            <p>{t(pattern.descriptionKey)}</p>
            <ul>
              {pattern.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
