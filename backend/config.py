import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = ".DEV API"
    VERSION: str = "1.0.0"

    API_V1_STR: str = "/api/v1"
    
    # Database Config
    DATABASE_URL_ENV: str = os.getenv("DATABASE_URL", "")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "nexus_db")
    
    # Redis Config
    REDIS_URL: str = os.getenv("REDIS_URL", "")
    
    @property
    def DATABASE_URL(self) -> str:
        if self.DATABASE_URL_ENV:
            # Render/Heroku sometimes pass postgres:// which SQLAlchemy 2.0 requires as postgresql+asyncpg://
            url = self.DATABASE_URL_ENV
            if url.startswith("postgres://"):
                url = url.replace("postgres://", "postgresql+asyncpg://", 1)
            elif url.startswith("postgresql://") and not url.startswith("postgresql+asyncpg://"):
                url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
            return url

        if self.POSTGRES_SERVER and self.POSTGRES_SERVER != "localhost":
            return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

        # Lightweight fallback SQLite for zero-config hosting (e.g. Render standalone)
        return "sqlite+aiosqlite:///./nexus.db"
    
    @property
    def SYNC_DATABASE_URL(self) -> str:
        if self.DATABASE_URL_ENV:
            return self.DATABASE_URL_ENV.replace("postgresql+asyncpg://", "postgresql://", 1)
        if self.POSTGRES_SERVER and self.POSTGRES_SERVER != "localhost":
            return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        return "sqlite:///./nexus.db"

    class Config:
        case_sensitive = True

settings = Settings()
