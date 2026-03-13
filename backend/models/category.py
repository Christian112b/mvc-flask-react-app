# Category Model
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    color: str = "#6b7280"
    icon: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    icon: Optional[str] = None

class CategoryResponse(CategoryBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
