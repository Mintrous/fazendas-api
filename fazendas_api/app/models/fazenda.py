from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geometry
from ..core.database import Base


class Fazenda(Base):
    __tablename__ = "primeira"
    __table_args__ = {"schema": "gis"}

    id = Column(Integer, primary_key=True, index=True)

    shape = Column(
        Geometry(
            geometry_type="MULTIPOLYGON",
            srid=4326,
        ),
        nullable=False,
    )

    nome = Column(String, nullable=True)

