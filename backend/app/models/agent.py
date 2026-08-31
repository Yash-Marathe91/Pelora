from sqlalchemy import Column, String, Float, DateTime, JSON
from datetime import datetime
from app.database.base_class import Base


class AgentExecution(Base):
    __tablename__ = "agent_executions"

    query_id = Column(String(100), nullable=False, index=True)
    agent_name = Column(String(100), nullable=False, index=True)
    task_description = Column(String(500), nullable=False)
    status = Column(String(50), default="COMPLETED")  # STARTED, RUNNING, COMPLETED, FAILED
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, default=datetime.utcnow)
    duration_ms = Column(Float, default=0.0)
    tools_invoked = Column(JSON, nullable=True)
    sources_consulted = Column(JSON, nullable=True)
    output_summary = Column(String(2000), nullable=True)
    verification_status = Column(String(50), default="VERIFIED")


class AgentArtifact(Base):
    __tablename__ = "agent_artifacts"

    execution_id = Column(Base.id.type, nullable=False)
    artifact_type = Column(String(50), nullable=False)  # MAP_POLYGON, CHART_DATASET, REPORT_TEXT, ROUTE_GEOJSON
    title = Column(String(255), nullable=False)
    content = Column(JSON, nullable=False)
    metadata_json = Column(JSON, nullable=True)
