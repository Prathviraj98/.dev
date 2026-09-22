from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
import redis.asyncio as aioredis
from config import settings
import logging

logger = logging.getLogger(__name__)

# SQLAlchemy Async Engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
    pool_size=10,
    max_overflow=20,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Redis async connection client helper
async def get_redis():
    try:
        redis_client = aioredis.from_url(settings.REDIS_URL, decode_responses=True)
        yield redis_client
        await redis_client.close()
    except Exception as e:
        logger.warning(f"Redis unavailable: {e}")
        yield None
