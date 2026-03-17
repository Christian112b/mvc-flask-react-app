# TaskForge - Project Management Application

Stack: Flask + React + Supabase

Proyecto de aprendizaje que demuestra el patron MVC con Flask (backend), React (frontend) y Supabase (base de datos).

## Features

- Kanban Board - Visual project management with draggable stages and tasks
- Secure Authentication - JWT-based authentication with Supabase Auth
- Dark/Light Theme - Dynamic theming with CSS Custom Properties
- Responsive Design - Works seamlessly on desktop, tablet, and mobile
- RESTful API - Well-structured endpoints following best practices
- PostgreSQL Database - Relational database with Row Level Security (RLS)

## Tech Stack

### Frontend
- React 18 - UI Library with hooks
- TypeScript - Type-safe development
- Vite - Next-generation build tool
- CSS Variables - Dynamic theming system

### Backend
- Flask - Lightweight WSGI web framework
- Python 3.11+ - Programming language
- Pydantic - Data validation
- PyJWT - JWT token handling

### Database & Auth
- Supabase - Backend-as-a-Service
- PostgreSQL - Relational database
- Row Level Security - Database-level security

## Project Structure

```
taskforge/
├── backend/                    # REST API (Flask)
│   ├── app.py                # Application entry point
│   ├── config.py              # Configuration settings
│   ├── models/                # Pydantic data models
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── stage.py
│   │   ├── subtask.py
│   │   └── category.py
│   ├── controllers/           # Business logic
│   │   ├── auth_controller.py
│   │   ├── project_controller.py
│   │   ├── stage_controller.py
│   │   └── subtask_controller.py
│   ├── views/                 # API route handlers
│   ├── middleware/            # JWT authentication
│   └── services/              # Supabase client
│
└── frontend/                   # SPA (React + TypeScript)
    └── src/
        ├── pages/             # Page components
        │   ├── HomePage/
        │   ├── ProjectsPage/  # Kanban board
        │   ├── LoginPage/
        │   ├── DocsPage/     # Documentation
        │   └── JwtDemoPage/
        ├── components/        # Reusable UI components
        ├── contexts/          # React Context (Auth, Theme)
        ├── layouts/           # Layout components
        └── lib/               # API client functions
```

## Architecture

```
FRONTEND
  React + TypeScript + Vite
  Context API (State)
  React Router (Navigation)
           |
      HTTP + JWT
           |
BACKEND
  Flask + Python
  Controllers (Logic)
  Pydantic (Validation)
  JWT Middleware (Security)
           |
SUPABASE
  PostgreSQL + Auth + RLS
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT |
| GET | /api/auth/me | Get current user |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | List all projects |
| POST | /api/projects | Create project |
| PUT | /api/projects/{id} | Update project |
| DELETE | /api/projects/{id} | Delete project |

### Stages & Subtasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stages/{project_id} | Get project stages |
| POST | /api/subtasks | Create subtask |
| PUT | /api/subtasks/{id} | Update subtask |
| DELETE | /api/subtasks/{id} | Delete subtask |

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Supabase Account (free tier)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/taskforge.git
   cd taskforge
   ```

2. Setup Backend
   ```
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. Configure Environment Variables
   Create .env file in backend/:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_key
   SECRET_KEY=your_secret_key
   ```

4. Run Backend Server
   ```
   python app.py
   # Server runs at http://localhost:5000
   ```

5. Setup Frontend
   ```
   cd frontend
   npm install
   npm run dev
   # App runs at http://localhost:5173
   ```

6. Open in Browser
   Navigate to http://localhost:5173 and create your account!

## Challenges Solved

- JWT Authentication - Implemented secure token-based auth with Supabase
- Dynamic Theming - CSS Custom Properties with React Context
- Relational Database Design - PostgreSQL schema with proper foreign keys
- MVC Architecture - Clean separation in Python backend

## Documentation

For detailed documentation, visit the in-app Docs page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
