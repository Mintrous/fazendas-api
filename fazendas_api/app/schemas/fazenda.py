from pydantic import BaseModel, Field
from typing import Optional


class Paginacao(BaseModel):
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=100)


class BuscaPontoRequest(Paginacao):
    latitude: float
    longitude: float


class BuscaRaioRequest(Paginacao):
    latitude: float
    longitude: float
    raio_km: float


class FazendaResponse(BaseModel):
    id: int
    cod_imovel: Optional[str]
    municipio: Optional[str]
    num_area: Optional[float]

    class Config:
        orm_mode = True
