import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import psycopg2
from app.core.config import settings

def check():
    print("Testing connection...")
    try:
        conn = psycopg2.connect(settings.DATABASE_URL + "?sslmode=require", connect_timeout=10)
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
        tables = cur.fetchall()
        print("Connected! Existing public tables:", [t[0] for t in tables])
        conn.close()
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    check()
