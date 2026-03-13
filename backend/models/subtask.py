# Subtask Model
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubtaskBase(BaseModel):
    name: str
    status: str = "todo"
    project_id: str
    description: Optional[str] = None
    category_id: Optional[str] = None

class SubtaskCreate(SubtaskBase):
    pass

class SubtaskUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[str] = None

class SubtaskResponse(SubtaskBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
