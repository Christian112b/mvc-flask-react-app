# Subtask Views
from flask import Blueprint, request, jsonify
from middleware.auth_middleware import jwt_required
from controllers import subtask_controller
from models.subtask import SubtaskCreate, SubtaskUpdate

subtask_bp = Blueprint('subtasks', __name__, url_prefix='/api/subtasks')

@subtask_bp.route('/project/<project_id>', methods=['GET'])
@jwt_required
def get_subtasks(project_id):
    """Obtener todas las subtareas de un proyecto"""
    user_id = getattr(request, 'user_id', None)
    subtasks = subtask_controller.get_subtasks_by_project(project_id, user_id)
    return jsonify(subtasks)

@subtask_bp.route('', methods=['POST'])
@jwt_required
def create_subtask():
    """Crear una nueva subtarea"""
    user_id = getattr(request, 'user_id', None)
    data = request.get_json()
    
    # Validar datos requeridos
    if not data or not data.get('name') or not data.get('project_id'):
        return jsonify({'error': 'name y project_id son requeridos'}), 400
    
    subtask = SubtaskCreate(
        name=data['name'],
        status=data.get('status', 'todo'),
        project_id=data['project_id'],
        description=data.get('description'),
        category_id=data.get('category_id')
    )
    
    result = subtask_controller.create_subtask(subtask, user_id)
    
    if result:
        return jsonify(result), 201
    return jsonify({'error': 'Error al crear subtarea'}), 500

@subtask_bp.route('/<subtask_id>', methods=['PUT'])
@jwt_required
def update_subtask(subtask_id):
    """Actualizar una subtarea"""
    user_id = getattr(request, 'user_id', None)
    data = request.get_json()
    
    subtask = SubtaskUpdate(
        name=data.get('name'),
        status=data.get('status'),
        description=data.get('description'),
        category_id=data.get('category_id')
    )
    
    result = subtask_controller.update_subtask(subtask_id, subtask, user_id)
    
    if result:
        return jsonify(result)
    return jsonify({'error': 'Subtarea no encontrada'}), 404

@subtask_bp.route('/<subtask_id>', methods=['DELETE'])
@jwt_required
def delete_subtask(subtask_id):
    """Eliminar una subtarea"""
    user_id = getattr(request, 'user_id', None)
    result = subtask_controller.delete_subtask(subtask_id, user_id)
    
    if result:
        return jsonify({'message': 'Subtarea eliminada'})
    return jsonify({'error': 'Subtarea no encontrada'}), 404
