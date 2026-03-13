# Stage Controller
from services.supabase_client import supabase_client

def get_all_stages():
    """Obtener todos los stages ordenados por orden"""
    try:
        # Usar service key para omitir RLS
        result = supabase_client.select('stages', None, '*')
        if result:
            # Ordenar por 'order'
            return sorted(result, key=lambda x: x.get('order', 0))
        return []
    except Exception as e:
        print(f"Error: {e}")
        return []
