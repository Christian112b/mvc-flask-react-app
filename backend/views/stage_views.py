# Stage Views
from flask import Blueprint, jsonify
from middleware.auth_middleware import jwt_required
from controllers import stage_controller

stage_bp = Blueprint('stages', __name__, url_prefix='/api/stages')

@stage_bp.route('', methods=['GET'])
@jwt_required
def get_stages():
    """Obtener todos los stages"""
    stages = stage_controller.get_all_stages()
    return jsonify(stages)
