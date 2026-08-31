import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import redis
from app.core.config import settings

def test_redis():
    print(f"Connecting to Upstash Redis at {settings.REDIS_URL.split('@')[-1]}...")
    try:
        r = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
        r.set("pelora:health_check", "operational", ex=60)
        val = r.get("pelora:health_check")
        print(f"Successfully connected to Upstash Redis! Test Key Value: '{val}'")
        return True
    except Exception as e:
        print(f"Redis Connection Error: {e}")
        return False

if __name__ == "__main__":
    test_redis()
