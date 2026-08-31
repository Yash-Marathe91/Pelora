from sqlalchemy import Column, String, DateTime, JSON
from datetime import datetime
from app.database.base_class import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    action = Column(String(100), nullable=False, index=True)
    performed_by = Column(String(255), default="System")
    target_resource = Column(String(255), nullable=False)
    details = Column(JSON, nullable=True)
    ip_address = Column(String(50), nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
