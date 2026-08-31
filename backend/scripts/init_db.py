import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.config import settings
from app.core.logging import logger
from app.database.session import engine
from app.models import Base, DataSource, User, Organization, UserRole


def init_db():
    logger.info(f"Initializing Pelora Database Tables on {settings.POSTGRES_HOST}...")
    try:
        # Create all tables defined in app.models
        Base.metadata.create_all(bind=engine)
        logger.info("Successfully created all domain tables on Supabase PostgreSQL database!")

        # Verify created tables
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        logger.info(f"Active database tables ({len(tables)} total):")
        for table in sorted(tables):
            logger.info(f"  • {table}")

        return True
    except Exception as e:
        logger.error(f"Failed to initialize database tables: {e}")
        return False


if __name__ == "__main__":
    init_db()
