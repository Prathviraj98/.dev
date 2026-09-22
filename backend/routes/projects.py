import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import redis.asyncio as aioredis

from database import get_db, get_redis
from models import ProjectModel
from schemas import ProjectResponse
from services.github_sync import sync_github_projects

router = APIRouter(prefix="/projects", tags=["projects"])

CACHE_KEY_ALL = "dev:projects:all"
CACHE_TTL = 3600  # 1 hour

@router.get("", response_model=List[ProjectResponse])
async def list_projects(
    category: Optional[str] = Query(None, description="Filter by category"),
    db: AsyncSession = Depends(get_db),
    redis_client: Optional[aioredis.Redis] = Depends(get_redis),
):
    # Try Redis Cache first if no specific filter
    if redis_client and not category:
        try:
            cached_data = await redis_client.get(CACHE_KEY_ALL)
            if cached_data:
                return json.loads(cached_data)
        except Exception:
            pass

    # Query Database
    query = select(ProjectModel)
    if category and category != "All":
        query = query.where(ProjectModel.category == category)
    query = query.order_by(ProjectModel.created_at.desc())

    result = await db.execute(query)
    projects = result.scalars().all()

    # Convert to response dictionary for cache storage
    projects_data = [ProjectResponse.model_validate(p).model_dump(mode="json") for p in projects]

    # Store in Redis if fetching full catalog
    if redis_client and not category and projects_data:
        try:
            await redis_client.set(CACHE_KEY_ALL, json.dumps(projects_data), ex=CACHE_TTL)
        except Exception:
            pass

    return projects_data


@router.post("/sync")
async def trigger_github_sync(
    db: AsyncSession = Depends(get_db),
    redis_client: Optional[aioredis.Redis] = Depends(get_redis),
):
    """Triggers an automatic synchronization of repositories from GitHub."""
    synced_count = await sync_github_projects(db)
    if redis_client:
        try:
            await redis_client.delete(CACHE_KEY_ALL)
        except Exception:
            pass
    return {
        "status": "success",
        "synced_projects": synced_count,
        "message": f"Successfully synchronized {synced_count} repositories from GitHub."
    }


@router.get("/{slug}", response_model=ProjectResponse)
async def get_project_by_slug(
    slug: str,
    db: AsyncSession = Depends(get_db),
    redis_client: Optional[aioredis.Redis] = Depends(get_redis),
):
    cache_key = f"dev:project:{slug}"
    if redis_client:
        try:
            cached = await redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
        except Exception:
            pass

    query = select(ProjectModel).where(ProjectModel.slug == slug)
    result = await db.execute(query)
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project case study not found")

    project_data = ProjectResponse.model_validate(project).model_dump(mode="json")

    if redis_client:
        try:
            await redis_client.set(cache_key, json.dumps(project_data), ex=CACHE_TTL)
        except Exception:
            pass

    return project_data
