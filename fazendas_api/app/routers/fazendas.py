from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from ..core.database import get_db
from ..schemas.fazenda import (
    FazendaResponse,
    BuscaPontoRequest,
    BuscaRaioRequest,
)

router = APIRouter(
    prefix="/fazendas",
    tags=["Fazendas"]
)


@router.get("/{id}", response_model=FazendaResponse)
def buscar_fazenda_por_id(
    id: int,
    db: Session = Depends(get_db)
):
    sql = text("""
        SELECT
            id,
            cod_imovel,
            municipio,
            num_area,
            shape
        FROM gis.primeira
        WHERE id = :id
    """)

    result = db.execute(sql, {"id": id}).fetchone()

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Fazenda não encontrada"
        )

    return result


@router.get("/cod-imovel/{cod_imovel}", response_model=FazendaResponse)
def buscar_fazenda_por_cod_imovel(
    cod_imovel: str,
    db: Session = Depends(get_db)
):
    sql = text("""
        SELECT
            id,
            cod_imovel,
            municipio,
            num_area,
            shape
        FROM gis.primeira
        WHERE cod_imovel = :cod_imovel
        LIMIT 1
    """)

    result = db.execute(
        sql,
        {"cod_imovel": cod_imovel}
    ).fetchone()

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Fazenda não encontrada"
        )

    return result


@router.post(
    "/busca-ponto",
    response_model=list[FazendaResponse]
)
def buscar_fazendas_por_ponto(
    payload: BuscaPontoRequest,
    db: Session = Depends(get_db)
):
    offset = (payload.page - 1) * payload.page_size

    sql = text("""
        SELECT
            id,
            cod_imovel,
            municipio,
            num_area
        FROM gis.primeira
        WHERE ST_Contains(
            shape,
            ST_SetSRID(
                ST_MakePoint(:lng, :lat),
                4326
            )
        )
        ORDER BY id
        LIMIT :limit OFFSET :offset
    """)

    result = db.execute(
        sql,
        {
            "lat": payload.latitude,
            "lng": payload.longitude,
            "limit": payload.page_size,
            "offset": offset,
        }
    )

    return result.fetchall()


@router.post(
    "/busca-raio",
    response_model=list[FazendaResponse]
)
def buscar_fazendas_por_raio(
    payload: BuscaRaioRequest,
    db: Session = Depends(get_db)
):
    raio_metros = payload.raio_km * 1000
    offset = (payload.page - 1) * payload.page_size

    sql = text("""
        SELECT
            id,
            cod_imovel,
            municipio,
            num_area
        FROM gis.primeira
        WHERE ST_DWithin(
            shape::geography,
            ST_SetSRID(
                ST_MakePoint(:lng, :lat),
                4326
            )::geography,
            :raio
        )
        ORDER BY id
        LIMIT :limit OFFSET :offset
    """)

    result = db.execute(
        sql,
        {
            "lat": payload.latitude,
            "lng": payload.longitude,
            "raio": raio_metros,
            "limit": payload.page_size,
            "offset": offset,
        }
    )

    return result.fetchall()

