# Subtask Controller
from services.supabase_client import supabase_client
from models.subtask import SubtaskCreate, SubtaskUpdate
import traceback

def get_subtasks_by_project(project_id: str, user_id: str):
    """Obtener todas las subtareas de un proyecto"""
    try:
        # Usar service key para RLS
        result = supabase_client.select('subtasks', {'project_id': project_id})
        return result if result else []
    except Exception as e:
        print(f"Error: {e}")
        return []

def create_subtask(subtask: SubtaskCreate, user_id: str):
    """Crear una nueva subtarea"""
    data = {
        'name': subtask.name,
        'status': subtask.status,
        'project_id': subtask.project_id
    }
    
    # Agregar description si existe
    if subtask.description is not None:
        data['description'] = subtask.description
    
    # Agregar category_id si existe
    if subtask.category_id is not None:
        data['category_id'] = subtask.category_id
    
    try:
        # Usar service key, no el token del usuario
        result = supabase_client.insert('subtasks', data)
        return result[0] if result else None
    except Exception as e:
        print(f"Error al crear subtarea: {e}")
        traceback.print_exc()
        raise Exception(f"Error al crear subtarea: {str(e)}")

def update_subtask(subtask_id: str, subtask: SubtaskUpdate, user_id: str):
    """Actualizar una subtarea"""
    update_data = {}
    if subtask.name is not None:
        update_data['name'] = subtask.name
    if subtask.status is not None:
        update_data['status'] = subtask.status
    if subtask.description is not None:
        update_data['description'] = subtask.description
    if subtask.category_id is not None:
        update_data['category_id'] = subtask.category_id
    
    if not update_data:
        return None
    
    try:
        # Usar service key para RLS
        result = supabase_client.update('subtasks', {'id': subtask_id}, update_data)
        return result[0] if result else None
    except Exception as e:
        print(f"Error: {e}")
        return None

def delete_subtask(subtask_id: str, user_id: str):
    """Eliminar una subtarea"""
    try:
        # Usar service key para RLS
        result = supabase_client.delete('subtasks', {'id': subtask_id})
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None
