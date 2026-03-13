# Project Stage Controller
from services.supabase_client import supabase_client
from models.project_stage import ProjectStageCreate, ProjectStageUpdate
import traceback

def get_project_stages(project_id: str, user_id: str):
    """Obtener todas las etapas de un proyecto"""
    try:
        result = supabase_client.select('project_stages', {'project_id': project_id})
        return result if result else []
    except Exception as e:
        print(f"Error: {e}")
        return []

def get_project_stage(project_stage_id: str, user_id: str):
    """Obtener una etapa de proyecto por ID"""
    try:
        result = supabase_client.select('project_stages', {'id': project_stage_id})
        return result[0] if result else None
    except Exception as e:
        print(f"Error: {e}")
        return None

def create_project_stage(project_stage: ProjectStageCreate, user_id: str):
    """Crear una nueva etapa de proyecto"""
    data = {
        'project_id': project_stage.project_id,
        'stage_id': project_stage.stage_id,
        'stage_name': project_stage.stage_name,
        'stage_color': project_stage.stage_color,
        'stage_order': project_stage.stage_order
    }
    
    try:
        result = supabase_client.insert('project_stages', data)
        return result[0] if result else None
    except Exception as e:
        print(f"Error al crear etapa de proyecto: {e}")
        traceback.print_exc()
        raise Exception(f"Error al crear etapa de proyecto: {str(e)}")

def update_project_stage(project_stage_id: str, project_stage: ProjectStageUpdate, user_id: str):
    """Actualizar una etapa de proyecto"""
    update_data = {}
    if project_stage.stage_name is not None:
        update_data['stage_name'] = project_stage.stage_name
    if project_stage.stage_color is not None:
        update_data['stage_color'] = project_stage.stage_color
    if project_stage.stage_order is not None:
        update_data['stage_order'] = project_stage.stage_order
    
    if not update_data:
        return None
    
    try:
        result = supabase_client.update('project_stages', {'id': project_stage_id}, update_data)
        return result[0] if result else None
    except Exception as e:
        print(f"Error: {e}")
        return None

def delete_project_stage(project_stage_id: str, user_id: str):
    """Eliminar una etapa de proyecto"""
    try:
        result = supabase_client.delete('project_stages', {'id': project_stage_id})
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None

def initialize_project_stages(project_id: str, user_id: str):
    """Inicializar etapas por defecto para un proyecto"""
    default_stages = [
        {'stage_id': 'todo', 'stage_name': 'Por hacer', 'stage_color': '#6b7280', 'stage_order': 0},
        {'stage_id': 'in_progress', 'stage_name': 'En progreso', 'stage_color': '#3b82f6', 'stage_order': 1},
        {'stage_id': 'review', 'stage_name': 'En revisión', 'stage_color': '#f59e0b', 'stage_order': 2},
        {'stage_id': 'done', 'stage_name': 'Completado', 'stage_color': '#10b981', 'stage_order': 3}
    ]
    
    created_stages = []
    for stage in default_stages:
        data = {
            'project_id': project_id,
            'stage_id': stage['stage_id'],
            'stage_name': stage['stage_name'],
            'stage_color': stage['stage_color'],
            'stage_order': stage['stage_order']
        }
        try:
            result = supabase_client.insert('project_stages', data)
            if result:
                created_stages.append(result[0])
        except Exception as e:
            print(f"Error al crear etapa {stage['stage_name']}: {e}")
    
    return created_stages
