import psycopg2
import sys
import os

# Ensure path is set
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.core.config import settings


def init_supabase_extensions():
    print(f"Connecting to Supabase Database at {settings.POSTGRES_HOST}...")
    try:
        conn = psycopg2.connect(settings.DATABASE_URL)
        cur = conn.cursor()

        extensions = ["postgis", "vector", "uuid-ossp"]
        for ext in extensions:
            print(f"Activating extension: {ext}...")
            cur.execute(f"CREATE EXTENSION IF NOT EXISTS \"{ext}\";")
        
        conn.commit()

        # Verify active extensions
        cur.execute("SELECT extname, extversion FROM pg_extension;")
        active_exts = cur.fetchall()
        print("\n--- ACTIVE SUPABASE POSTGRESQL EXTENSIONS ---")
        for name, version in active_exts:
            print(f"  • {name}: v{version}")

        cur.close()
        conn.close()
        print("\nSuccessfully initialized all database extensions!")
        return True
    except Exception as e:
        print(f"Error activating database extensions: {e}")
        return False


if __name__ == "__main__":
    init_supabase_extensions()
