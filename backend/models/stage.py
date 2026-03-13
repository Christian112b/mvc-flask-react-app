# Stage Model
from pydantic import BaseModel
from typing import Optional

class StageBase(BaseModel):
    id: str
    name: str
    order: int
    color: Optional[str] = "#667eea"

class StageResponse(StageBase):
    class Config:
        from_attributes = True
