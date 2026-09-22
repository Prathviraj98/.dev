from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class KeyMetricSchema(BaseModel):
    label: str
    value: str

class ProjectBase(BaseModel):
    slug: str
    title: str
    tagline: str
    category: str
    summary: str
    architecture_markdown: str
    key_metrics: List[KeyMetricSchema]
    tech_stack: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = True
    image_url: str

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = None
    project_scope: str = Field(..., min_length=3)
    budget_range: str = Field(..., min_length=2)
    message: str = Field(..., min_length=10, max_length=5000)

class ContactResponse(BaseModel):
    success: bool
    message: str
    inquiry_id: str
