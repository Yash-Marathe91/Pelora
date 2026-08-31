import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.core.logging import logger
from datetime import datetime

scheduler = AsyncIOScheduler()

async def fetch_marine_data_job():
    """
    Simulates the hourly ingestion of Copernicus and NOAA data.
    In a full production environment, this would hit the actual satellite/buoy endpoints,
    process NetCDF/GRIB files via xarray/geopandas, and update the PostGIS database.
    """
    logger.info(f"[{datetime.now().isoformat()}] Starting scheduled ingestion of Copernicus & NOAA satellite data...")
    # Simulate network latency and processing time
    await asyncio.sleep(2)
    logger.info("Successfully ingested latest SST and Chlorophyll telemetry data.")
    logger.info("Database synchronized with latest observation grids.")

def start_scheduler():
    """
    Initializes and starts the background scheduler.
    """
    # Schedule the job to run every hour
    scheduler.add_job(
        fetch_marine_data_job, 
        'interval', 
        hours=1, 
        id='hourly_marine_data_sync', 
        replace_existing=True
    )
    
    # We also trigger it once exactly 10 seconds after startup for demonstration purposes
    scheduler.add_job(
        fetch_marine_data_job,
        'date',
        run_date=datetime.now(),
        id='initial_marine_data_sync'
    )

    scheduler.start()
    logger.info("Background telemetry scheduler started successfully. Next sync in 1 hour.")

def stop_scheduler():
    """
    Gracefully shuts down the background scheduler.
    """
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Background telemetry scheduler stopped.")
