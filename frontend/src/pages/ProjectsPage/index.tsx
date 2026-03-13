import { useState, useEffect, type JSX } from 'react'
import {
  DndContext,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { projectsApi } from '../../lib/projectsApi'
import { subtasksApi } from '../../lib/subtasksApi'
import { projectStagesApi } from '../../lib/projectStagesApi'
import { categoriesApi, type Category } from '../../lib/categoriesApi'
import './ProjectsPage.css'
import toast from 'react-hot-toast'

// Colores predefinidos para etapas
const STAGE_COLORS = [
  '#6b7280', // gray
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
]

interface Stage {
  id: string
  stage_id: string
  stage_name: string
  stage_color: string
  stage_order: number
}

interface Task {
  id: string
  project_id: string
  name: string
  status: string
  description?: string
  category_id?: string
}

interface Project {
  id: string
  project_id: string
  name: string
  description: string
  created_at?: string
  deadline?: string
  icon?: string
}

interface ProjectWithTasks extends Project {
  tasks: Task[]
  stages: Stage[]
}

// Modal para crear proyecto
interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, description: string, deadline: string, icon: string) => Promise<void>
}

function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectDeadline, setProjectDeadline] = useState('')
  const [projectIcon, setProjectIcon] = useState('folder')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectName.trim()) {
      setError('El nombre del proyecto es requerido')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onSubmit(projectName, projectDescription, projectDeadline, projectIcon)
      setProjectName('')
      setProjectDescription('')
      setProjectDeadline('')
      setProjectIcon('folder')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear proyecto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Crear Nuevo Proyecto</h2>
          <button className="modal__close" onClick={onClose} disabled={loading}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal__content">
          {error && <p className="modal__error">{error}</p>}
          
          <div className="form-group">
            <label>Nombre del Proyecto</label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="Mi Proyecto"
              className="form-input"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Descripción (opcional)</label>
            <textarea
              value={projectDescription}
              onChange={e => setProjectDescription(e.target.value)}
              placeholder="Descripción del proyecto"
              className="form-input"
              rows={2}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha Límite (opcional)</label>
              <input
                type="date"
                value={projectDeadline}
                onChange={e => setProjectDeadline(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Icono</label>
              <select
                value={projectIcon}
                onChange={e => setProjectIcon(e.target.value)}
                className="form-input"
                disabled={loading}
              >
                <option value="folder">Carpeta</option>
                <option value="briefcase">Maleta</option>
                <option value="code">Código</option>
                <option value="rocket">Cohete</option>
                <option value="heart">Corazón</option>
                <option value="star">Estrella</option>
                <option value="target">Objetivo</option>
                <option value="lightbulb">Idea</option>
              </select>
            </div>
          </div>

          <div className="modal__actions">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><span className="loading-spinner loading-spinner--small"></span> Creando...</> : 'Crear Proyecto'}
            </button>
          </div>
        </form>
        
        {loading && (
          <div className="modal__loading-overlay">
            <div className="loading-spinner loading-spinner--large"></div>
            <span>Creando proyecto...</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface TaskCardProps {
  task: Task
  onDelete: (taskId: string) => void
  stageColor?: string
  category?: Category
}

function SortableTaskCard({ task, onDelete, stageColor, category }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    borderLeftColor: stageColor || 'var(--color-primary)',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card"
    >
      {category && (
        <span 
          className="task-card__category" 
          style={{ backgroundColor: category.color }}
        >
          {category.name}
        </span>
      )}
      <span className="task-card__title">{task.name}</span>
      {task.description && (
        <span className="task-card__description">{task.description}</span>
      )}
      <button 
        className="task-card__delete"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(task.id)
        }}
      >
        ×
      </button>
    </div>
  )
}

interface KanbanColumnProps {
  stage: Stage
  tasks: Task[]
  categories: Category[]
  onDeleteTask: (taskId: string) => void
  onAddTask: (stageId: string, taskName: string, description?: string, categoryId?: string) => void
}

function KanbanColumn({ stage, tasks, categories, onDeleteTask, onAddTask }: KanbanColumnProps) {
  const [newTask, setNewTask] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  const { setNodeRef } = useDroppable({
    id: stage.stage_id,
  })

  const getCategoryById = (categoryId?: string) => {
    return categories.find(c => c.id === categoryId)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      onAddTask(stage.stage_id, newTask, newDescription || undefined, newCategoryId || undefined)
      setNewTask('')
      setNewDescription('')
      setNewCategoryId('')
      setShowForm(false)
    }
  }

  return (
    <div className="kanban-column" ref={setNodeRef}>
      <div 
        className="kanban-column__header"
        style={{ 
          borderTopColor: stage.stage_color,
          backgroundColor: stage.stage_color 
        }}
      >
        <h3 className="kanban-column__title">{stage.stage_name}</h3>
        <span className="kanban-column__count">{tasks.length}</span>
      </div>
      <div className="kanban-column__content">
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              stageColor={stage.stage_color}
              category={getCategoryById(task.category_id)}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
        
        {showForm ? (
          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nombre de tarea"
              autoFocus
              className="task-form__input"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              className="task-form__input task-form__textarea"
            />
            {categories.length > 0 && (
              <select
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
                className="task-form__input"
              >
                <option value="">Sin categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}
            <div className="task-form__buttons">
              <button type="submit" className="task-form__add">+</button>
              <button type="button" onClick={() => setShowForm(false)} className="task-form__cancel">×</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="add-task-btn">
            + Agregar tarea
          </button>
        )}
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: ProjectWithTasks
  onDelete: (projectId: string) => void
}

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [stages, setStages] = useState<Stage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  // Sensores para drag and drop - fuera del JSX
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Cargar etapas del proyecto y tareas cuando se expande
  useEffect(() => {
    if (expanded) {
      loadProjectData()
    }
  }, [expanded])

  const loadProjectData = async () => {
    setLoading(true)
    try {
      // Usar endpoint unificado - una sola llamada HTTP
      const data = await projectsApi.getFull(project.project_id)
      
      // Las etapas ya vienen ordenadas del backend
      setStages(data.stages)
      
      // Las tareas
      setTasks(data.tasks)
      
      // Las categorías
      setCategories(data.categories)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Agrupar tareas por estado
  const tasksByStage = stages.map(stage => ({
    stage,
    tasks: tasks.filter(t => t.status === stage.stage_id)
  }))

  const getCategoryById = (categoryId?: string) => {
    return categories.find(c => c.id === categoryId)
  }

  const handleAddTask = async (stageId: string, taskName: string, description?: string, categoryId?: string) => {
    try {
      const created = await subtasksApi.create(project.project_id, taskName, stageId, description, categoryId)
      setTasks([...tasks, created])
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await subtasksApi.delete(taskId)
      setTasks(tasks.filter(t => t.id !== taskId))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Encontrar la tarea activa
    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    // Determinar el nuevo estado
    let newStatus = ''
    
    // Verificar si es una columna
    const overStage = stages.find(s => s.stage_id === overId)
    if (overStage) {
      newStatus = overStage.stage_id
    } else {
      // Es otra tarea, usar su estado
      const overTask = tasks.find(t => t.id === overId)
      if (overTask) {
        newStatus = overTask.status
      }
    }

    if (newStatus && newStatus !== activeTask.status) {
      setTasks(prev => prev.map(t => 
        t.id === activeId ? { ...t, status: newStatus } : t
      ))
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const task = tasks.find(t => t.id === activeId)
    
    if (task) {
      try {
        await subtasksApi.update(task.id, { status: task.status })
      } catch (err) {
        console.error('Error:', err)
        loadProjectData() // Recargar en caso de error
      }
    }
  }

  return (
    <div className="project-card">
      <div className="project-card__header" onClick={() => setExpanded(!expanded)}>
        <div className="project-card__title-row">
          <h3 className="project-card__title">{project.name}</h3>
          <span className="project-card__expand">{expanded ? '▼' : '▶'}</span>
        </div>
        <button 
          className="project-card__delete"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(project.project_id)
          }}
        >
          ×
        </button>
      </div>

      {expanded && (
        <div className="project-card__board">
          {loading ? (
            <p className="project-card__loading">Cargando...</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={rectIntersection}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {tasksByStage.map(({ stage, tasks: stageTasks }) => (
                <KanbanColumn
                  key={stage.stage_id}
                  stage={stage}
                  tasks={stageTasks}
                  categories={categories}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={handleAddTask}
                />
              ))}
            </DndContext>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProjectsPage(): JSX.Element {
  const [projects, setProjects] = useState<ProjectWithTasks[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<ProjectWithTasks | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState<ProjectWithTasks | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showStageModal, setShowStageModal] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedProjectData, setSelectedProjectData] = useState<{
    stages: Stage[];
    tasks: Task[];
    categories: Category[];
  } | null>(null)
  const [loadingProject, setLoadingProject] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'created_at' | 'deadline'>('created_at')

  // Cargar proyectos
  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await projectsApi.getAll()
      
      // Convertir al formato de proyecto con tareas
      const projectsWithTasks: ProjectWithTasks[] = data.map((p: any) => ({
        id: p.id,
        project_id: p.id,
        name: p.name,
        description: p.description || '',
        created_at: p.created_at,
        deadline: p.deadline,
        icon: p.icon || 'folder',
        tasks: [],
        stages: []
      }))
      
      setProjects(projectsWithTasks)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleCreateProject = async (
    name: string,
    description: string,
    deadline: string,
    icon: string
  ) => {
    try {
      // Crear el proyecto (las etapas se crean dentro del proyecto)
      await projectsApi.create(name, description, deadline, icon)
      
      loadProjects()
      toast.success('Proyecto creado correctamente')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear')
      toast.error('Error al crear el proyecto')
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await projectsApi.delete(projectId)
      setProjects(projects.filter(p => p.project_id !== projectId))
      toast.success('Proyecto eliminado correctamente')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
      toast.error('Error al eliminar el proyecto')
    }
  }

  const handleUpdateProject = async (
    projectId: string,
    name: string,
    description: string,
    deadline: string,
    icon: string
  ) => {
    try {
      setIsEditing(true)
      await projectsApi.update(projectId, { name, description, deadline, icon })
      
      // Actualizar la lista de proyectos
      setProjects(projects.map(p => 
        p.project_id === projectId 
          ? { ...p, name, description, deadline, icon }
          : p
      ))
      setProjectToEdit(null)
      toast.success('Proyecto actualizado correctamente')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
      toast.error('Error al actualizar el proyecto')
    } finally {
      setIsEditing(false)
    }
  }

  // Agregar una etapa al proyecto
  const handleAddStage = async (stageName: string, stageColor: string) => {
    if (!selectedProjectId || !stageName.trim()) return
    
    try {
      const stagesCount = selectedProjectData?.stages.length || 0
      await projectStagesApi.create(selectedProjectId, {
        stage_id: `stage_${stagesCount}`,
        stage_name: stageName,
        stage_color: stageColor,
        stage_order: stagesCount
      })
      
      // Recargar los datos del proyecto
      const data = await projectsApi.getFull(selectedProjectId)
      setSelectedProjectData({
        stages: data.stages,
        tasks: data.tasks,
        categories: data.categories
      })
      toast.success('Etapa agregada correctamente')
    } catch (err) {
      toast.error('Error al agregar etapa')
    }
  }
  const handleSelectProject = async (projectId: string) => {
    try {
      setSelectedProjectId(projectId)  // Primero cambiar a la vista del proyecto
      setLoadingProject(true)
      const data = await projectsApi.getFull(projectId)
      setSelectedProjectData({
        stages: data.stages,
        tasks: data.tasks,
        categories: data.categories
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar proyecto')
      setSelectedProjectId(null)  // Volver a la lista en caso de error
    } finally {
      setLoadingProject(false)
    }
  }

  // Volver a la lista de proyectos
  const handleBackToList = () => {
    setSelectedProjectId(null)
    setSelectedProjectData(null)
  }

  // Handlers para drag and drop del kanban
  const kanbanSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const [kanbanTasks, setKanbanTasks] = useState<Task[]>([])

  // Sincronizar tareas cuando se carga el proyecto
  useEffect(() => {
    if (selectedProjectData) {
      setKanbanTasks(selectedProjectData.tasks)
    }
  }, [selectedProjectData])

  const handleKanbanDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || !selectedProjectData) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeTask = kanbanTasks.find(t => t.id === activeId)
    if (!activeTask) return

    let newStatus = ''
    
    const overStage = selectedProjectData.stages.find(s => s.stage_id === overId)
    if (overStage) {
      newStatus = overStage.stage_id
    } else {
      const overTask = kanbanTasks.find(t => t.id === overId)
      if (overTask) {
        newStatus = overTask.status
      }
    }

    if (newStatus && newStatus !== activeTask.status) {
      setKanbanTasks(prev => prev.map(t => 
        t.id === activeId ? { ...t, status: newStatus } : t
      ))
    }
  }

  const handleKanbanDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || !selectedProjectData) return

    const activeId = active.id as string
    const task = kanbanTasks.find(t => t.id === activeId)
    
    if (task) {
      try {
        await subtasksApi.update(task.id, { status: task.status })
        // Actualizar el estado local
        setSelectedProjectData(prev => prev ? {
          ...prev,
          tasks: kanbanTasks
        } : null)
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }

  const handleKanbanDeleteTask = async (taskId: string) => {
    try {
      await subtasksApi.delete(taskId)
      setKanbanTasks(prev => prev.filter(t => t.id !== taskId))
      setSelectedProjectData(prev => prev ? {
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      } : null)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleKanbanAddTask = async (stageId: string, taskName: string, description?: string, categoryId?: string) => {
    if (!selectedProjectId) return
    try {
      const created = await subtasksApi.create(selectedProjectId, taskName, stageId, description, categoryId)
      setKanbanTasks(prev => [...prev, created])
      setSelectedProjectData(prev => prev ? {
        ...prev,
        tasks: [...prev.tasks, created]
      } : null)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  if (loading) {
    return <div className="projects-page"><p>Cargando...</p></div>
  }

  // Vista de kanban (cuando hay un proyecto seleccionado)
  if (selectedProjectId) {
    const selectedProject = projects.find(p => p.project_id === selectedProjectId)
    
    return (
      <div className="projects-page">
        <div className="projects-page__header">
          <button 
            className="projects-page__back-btn"
            onClick={handleBackToList}
            disabled={loadingProject}
          >
            ← Volver
          </button>
          <h1 className="projects-page__title">{selectedProject?.name || 'Proyecto'}</h1>
        </div>
        
        {loadingProject ? (
          <div className="projects-page__loading-overlay">
            <div className="loading-spinner loading-spinner--large"></div>
            <span className="projects-page__loading-text">Cargando proyecto...</span>
          </div>
        ) : selectedProjectData ? (
          <div className="kanban-board">
            <DndContext
              sensors={kanbanSensors}
              collisionDetection={rectIntersection}
              onDragOver={handleKanbanDragOver}
              onDragEnd={handleKanbanDragEnd}
            >
              {selectedProjectData.stages.length === 0 ? (
                <div className="kanban-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <div className="kanban-empty__icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                      <line x1="15" y1="3" x2="15" y2="21" />
                    </svg>
                  </div>
                  <p className="kanban-empty__text">Este proyecto no tiene etapas</p>
                  <button 
                    type="button" 
                    className="kanban-empty__btn"
                    style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}
                    onClick={() => setShowStageModal(true)}
                  >
                    + Agregar etapas al proyecto
                  </button>
                </div>
              ) : (
                selectedProjectData.stages.map((stage) => (
                  <KanbanColumn
                    key={stage.stage_id}
                    stage={stage}
                    tasks={selectedProjectData.tasks.filter(t => t.status === stage.stage_id)}
                    categories={selectedProjectData.categories}
                    onDeleteTask={handleKanbanDeleteTask}
                    onAddTask={handleKanbanAddTask}
                  />
                ))
              )}
            </DndContext>
          </div>
        ) : (
          <p className="projects-page__error">Error al cargar el proyecto</p>
        )}
      </div>
    )
  }

  // Vista de lista de proyectos (selección)
  // Filtrar y ordenar proyectos
  const filteredProjects = projects
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'deadline') {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      } else {
        const dateA = a.created_at || ''
        const dateB = b.created_at || ''
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      }
    })

  return (
    <div className="projects-page">
      <div className="projects-page__header">
        <div className="projects-page__header-left">
          <div className="projects-search">
            <svg className="projects-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="projects-search__input"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'created_at' | 'deadline')}
            className="projects-sort__select"
          >
            <option value="created_at">Más recientes</option>
            <option value="name">Nombre A-Z</option>
            <option value="deadline">Fecha límite</option>
          </select>
        </div>
        <button 
          className="projects-page__add-btn"
          onClick={() => setShowModal(true)}
        >
          + Nuevo Proyecto
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.project_id} 
            className="project-card"
            onClick={() => handleSelectProject(project.project_id)}
          >
            <div className="project-card__header">
              <div className="project-card__icon">
                {project.icon === 'briefcase' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                )}
                {project.icon === 'code' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                )}
                {project.icon === 'rocket' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                )}
                {project.icon === 'heart' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                )}
                {project.icon === 'star' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
                {project.icon === 'target' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                )}
                {project.icon === 'lightbulb' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                )}
                {(project.icon === 'folder' || !project.icon) && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                )}
              </div>
              <div className="project-card__actions-top">
                <button 
                  className="project-card__edit-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setProjectToEdit(project)
                  }}
                  title="Editar proyecto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button 
                  className="project-card__delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setProjectToDelete(project)
                  }}
                  title="Eliminar proyecto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="project-card__content">
              <h3 className="project-card__title">{project.name}</h3>
              <p className="project-card__description">{project.description || 'Sin descripción'}</p>
            </div>
            <div className="project-card__footer">
              <div className="project-card__dates">
                <span className="project-card__date">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {project.created_at ? new Date(project.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : 'Sin fecha'}
                </span>
                {project.deadline && (
                  <span className="project-card__date project-card__date--deadline">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {new Date(project.deadline).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
              <span className="project-card__arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación de eliminación */}
      {projectToDelete && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>Eliminar Proyecto</h3>
            <p>¿Estás seguro de eliminar "{projectToDelete.name}"? Esta acción no se puede deshacer.</p>
            <div className="confirm-modal__actions">
              <button 
                className="confirm-modal__btn confirm-modal__btn--cancel"
                onClick={() => setProjectToDelete(null)}
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button 
                className="confirm-modal__btn confirm-modal__btn--delete"
                onClick={async () => {
                  setIsDeleting(true)
                  await handleDeleteProject(projectToDelete.project_id)
                  setProjectToDelete(null)
                  setIsDeleting(false)
                }}
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición de proyecto */}
      {projectToEdit && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>Editar Proyecto</h3>
            <form 
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                await handleUpdateProject(
                  projectToEdit.project_id,
                  formData.get('name') as string,
                  formData.get('description') as string,
                  formData.get('deadline') as string,
                  formData.get('icon') as string
                )
              }}
            >
              <div className="form-group">
                <label>Nombre del Proyecto</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={projectToEdit.name}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción (opcional)</label>
                <textarea
                  name="description"
                  defaultValue={projectToEdit.description || ''}
                  className="form-input"
                  rows={2}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Límite (opcional)</label>
                  <input
                    type="date"
                    name="deadline"
                    defaultValue={projectToEdit.deadline || ''}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Icono</label>
                  <select
                    name="icon"
                    defaultValue={projectToEdit.icon || 'folder'}
                    className="form-input"
                  >
                    <option value="folder">Carpeta</option>
                    <option value="briefcase">Maleta</option>
                    <option value="code">Código</option>
                    <option value="rocket">Cohete</option>
                    <option value="heart">Corazón</option>
                    <option value="star">Estrella</option>
                    <option value="target">Objetivo</option>
                    <option value="lightbulb">Idea</option>
                  </select>
                </div>
              </div>

              <div className="confirm-modal__actions">
                <button 
                  type="button"
                  className="confirm-modal__btn confirm-modal__btn--cancel"
                  onClick={() => setProjectToEdit(null)}
                  disabled={isEditing}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="confirm-modal__btn confirm-modal__btn--delete"
                  disabled={isEditing}
                >
                  {isEditing ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateProject}
      />

      {/* Modal para agregar etapa */}
      {showStageModal && (
        <AddStageModal
          onClose={() => setShowStageModal(false)}
          onSubmit={handleAddStage}
        />
      )}
    </div>
  )
}

// Modal simple para agregar etapa
interface AddStageModalProps {
  onClose: () => void
  onSubmit: (stageName: string, stageColor: string) => Promise<void>
}

function AddStageModal({ onClose, onSubmit }: AddStageModalProps) {
  const [stageName, setStageName] = useState('')
  const [stageColor, setStageColor] = useState('#6b7280')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stageName.trim()) return
    
    setLoading(true)
    try {
      await onSubmit(stageName, stageColor)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--small" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Agregar Etapa</h2>
          <button className="modal__close" onClick={onClose} disabled={loading}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal__content">
          <div className="form-group">
            <label>Nombre de la etapa</label>
            <input
              type="text"
              value={stageName}
              onChange={e => setStageName(e.target.value)}
              placeholder="Ej: Por hacer, En progreso..."
              className="form-input"
              autoFocus
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input
              type="color"
              value={stageColor}
              onChange={e => setStageColor(e.target.value)}
              className="form-input form-input--color"
              disabled={loading}
            />
          </div>
          <div className="modal__actions">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !stageName.trim()}>
              {loading ? 'Agregando...' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
