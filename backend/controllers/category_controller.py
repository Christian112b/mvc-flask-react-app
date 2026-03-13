# Category Controller
from services.supabase_client import supabase_client
from models.category import CategoryCreate, CategoryUpdate
import uuid
import traceback

def get_categories(user_id: str):
    """Obtener todas las categorías"""
    try:
        result = supabase_client.select('task_categories', {})
        return result if result else []
    except Exception as e:
        print(f"Error: {e}")
        return []

def get_category(category_id: str, user_id: str):
    """Obtener una categoría por ID"""
    try:
        result = supabase_client.select('task_categories', {'id': category_id})
        return result[0] if result else None
    except Exception as e:
        print(f"Error: {e}")
        return None

def create_category(category: CategoryCreate, user_id: str):
    """Crear una nueva categoría"""
    data = {
        'id': str(uuid.uuid4()),
        'name': category.name,
        'color': category.color,
        'icon': category.icon
    }
    
    try:
        result = supabase_client.insert('task_categories', data)
        return result[0] if result else None
    except Exception as e:
        print(f"Error al crear categoría: {e}")
        traceback.print_exc()
        raise Exception(f"Error al crear categoría: {str(e)}")

def update_category(category_id: str, category: CategoryUpdate, user_id: str):
    """Actualizar una categoría"""
    update_data = {}
    if category.name is not None:
        update_data['name'] = category.name
    if category.color is not None:
        update_data['color'] = category.color
    if category.icon is not None:
        update_data['icon'] = category.icon
    
    if not update_data:
        return None
    
    try:
        result = supabase_client.update('task_categories', {'id': category_id}, update_data)
        return result[0] if result else None
    except Exception as e:
        print(f"Error: {e}")
        return None

def delete_category(category_id: str, user_id: str):
    """Eliminar una categoría"""
    try:
        result = supabase_client.delete('task_categories', {'id': category_id})
        return result
    except Exception as e:
        print(f"Error: {e}")
        return None
