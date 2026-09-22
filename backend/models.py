import uuid
from datetime import datetime
from sqlalchemy import String, Text, Boolean, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class ProjectModel(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    tagline: Mapped[str] = mapped_column(String, nullable=False)
    category: Mapped[str] = mapped_column(String, index=True, nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    architecture_markdown: Mapped[str] = mapped_column(Text, nullable=False)
    key_metrics: Mapped[dict] = mapped_column(JSON, default=list, nullable=False)
    tech_stack: Mapped[dict] = mapped_column(JSON, default=list, nullable=False)
    github_url: Mapped[str] = mapped_column(String, nullable=True)
    live_url: Mapped[str] = mapped_column(String, nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=True)
    image_url: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class ContactInquiryModel(Base):
    __tablename__ = "contact_inquiries"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, index=True, nullable=False)
    company: Mapped[str] = mapped_column(String, nullable=True)
    project_scope: Mapped[str] = mapped_column(String, nullable=False)
    budget_range: Mapped[str] = mapped_column(String, nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
