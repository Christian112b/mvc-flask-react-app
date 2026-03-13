# Project Stage Model
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectStageBase(BaseModel):
    project_id: str
    stage_id: str
    stage_name: str
    stage_color: str = "#6b7280"
    stage_order: int = 0

class ProjectStageCreate(ProjectStageBase):
    pass

class ProjectStageUpdate(BaseModel):
    stage_name: Optional[str] = None
    stage_color: Optional[str] = None
    stage_order: Optional[int] = None

class ProjectStageResponse(ProjectStageBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
