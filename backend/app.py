from flask import Flask
from flask_cors import CORS
from views.auth_views import auth_bp
from views.protected_views import protected_bp
from views.project_views import projects_bp
from views.subtask_views import subtask_bp
from views.stage_views import stage_bp
from views.category_views import category_bp
from views.project_stage_views import project_stage_bp


def create_app():
    """Crea y configura la aplicación Flask"""
    
    app = Flask(__name__)
    
    # Habilitar CORS para permitir solicitudes desde el frontend
    CORS(app, 
         origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    
    # Registrar blueprints (rutas)
    app.register_blueprint(auth_bp)
    app.register_blueprint(protected_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(subtask_bp)
    app.register_blueprint(stage_bp)
    app.register_blueprint(category_bp)
    app.register_blueprint(project_stage_bp)
    
    # Ruta raíz
    @app.route('/')
    def index():
        return {
            'message': 'API de Flask - MVC Pattern',
            'version': '1.0.0',
            'endpoints': {
                'auth': {
                    'register': 'POST /api/auth/register',
                    'login': 'POST /api/auth/login',
                    'me': 'GET /api/auth/me',
                    'logout': 'POST /api/auth/logout'
                },
                'projects': {
                    'list': 'GET /api/projects',
                    'create': 'POST /api/projects',
                    'get': 'GET /api/projects/<id>',
                    'update': 'PUT /api/projects/<id>',
                    'delete': 'DELETE /api/projects/<id>',
                    'kanban': 'GET /api/projects/kanban',
                    'move': 'PUT /api/projects/<id>/move'
                },
                'categories': {
                    'list': 'GET /api/categories',
                    'create': 'POST /api/categories',
                    'update': 'PUT /api/categories/<id>',
                    'delete': 'DELETE /api/categories/<id>'
                },
                'project_stages': {
                    'list': 'GET /api/project-stages/project/<id>',
                    'create': 'POST /api/project-stages/project/<id>',
                    'update': 'PUT /api/project-stages/<id>',
                    'delete': 'DELETE /api/project-stages/<id>',
                    'initialize': 'POST /api/project-stages/project/<id>/initialize'
                }
            }
        }
    
    # Ruta de health check
    @app.route('/health')
    def health():
        return {'status': 'healthy'}
    
    return app


# Crear la aplicación
app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
