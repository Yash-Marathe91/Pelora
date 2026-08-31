from sqlalchemy import Column, String, Boolean, Enum, ForeignKey
from sqlalchemy.orm import relationship
import enum
from app.database.base_class import Base


class UserRole(str, enum.Enum):
    FISHER = "Fisher"
    RESEARCHER = "Researcher"
    AUTHORITY = "Authority"
    OPERATOR = "Operator"
    FLEET_MANAGER = "Fleet Manager"
    ENVIRONMENTAL_ANALYST = "Environmental Analyst"
    ADMIN = "Admin"


class Organization(Base):
    __tablename__ = "organizations"

    name = Column(String(255), nullable=False, index=True)
    code = Column(String(50), unique=True, nullable=False)
    description = Column(String(500), nullable=True)

    users = relationship("User", back_populates="organization")


class User(Base):
    __tablename__ = "users"

    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default=UserRole.OPERATOR.value, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)

    organization_id = Column(Base.id.type, ForeignKey("organizations.id", ondelete="SET NULL"), nullable=True)
    organization = relationship("Organization", back_populates="users")
