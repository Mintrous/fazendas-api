from pydantic import BaseModel, Field
from typing import Optional


class Pagination(BaseModel):
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=100)


class SearchPointRequest(Pagination):
    latitude: float
    longitude: float


class SearchRadiusRequest(Pagination):
    latitude: float
    longitude: float
    radius_km: float


class FarmResponse(BaseModel):
    id: int
    cod_imovel: Optional[str]
    municipio: Optional[str]
    num_area: Optional[float]

    class Config:
        orm_mode = True
