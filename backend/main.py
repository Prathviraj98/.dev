import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config import settings
from database import engine, Base
from routes.projects import router as projects_router
from routes.contact import router as contact_router
from seed import seed_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nexus_api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB tables and seed data
    try:
        logger.info("Initializing database schema and initial seed data...")
        await seed_database()
    except Exception as e:
        logger.warning(f"Could not connect to database on startup: {e}. API will run in stateless mode.")
    yield
    # Shutdown
    await engine.dispose()
    logger.info("Database connection closed.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(contact_router, prefix=settings.API_V1_STR)

@app.get("/health")
async def health_check():
    return {"status": "online", "version": settings.VERSION, "service": settings.PROJECT_NAME}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
