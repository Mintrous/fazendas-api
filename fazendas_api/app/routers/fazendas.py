from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from ..core.database import get_db
from ..schemas.fazenda import (
    FarmResponse,
    SearchPointRequest,
    SearchRadiusRequest,
)

router = APIRouter(
    prefix="/farms",
    tags=["Farms"]
)


@router.get("/{id}", response_model=FarmResponse)
def search_farm_by_id(
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
            detail="Farm not found"
        )

    return result


@router.get("/property-code/{property_code}", response_model=FarmResponse)
def search_farm_by_property_code(
    property_code: str,
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
        WHERE cod_imovel = :property_code
        LIMIT 1
    """)

    result = db.execute(
        sql,
        {"property_code": property_code}
    ).fetchone()

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Farm not found"
        )

    return result


@router.post(
    "/search-point",
    response_model=list[FarmResponse]
)
def search_farms_by_point(
    payload: SearchPointRequest,
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
    "/search-radius",
    response_model=list[FarmResponse]
)
def search_farms_by_radius(
    payload: SearchRadiusRequest,
    db: Session = Depends(get_db)
):
    radius_meters = payload.radius_km * 1000
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
            :radius
        )
        ORDER BY id
        LIMIT :limit OFFSET :offset
    """)

    result = db.execute(
        sql,
        {
            "lat": payload.latitude,
            "lng": payload.longitude,
            "radius": radius_meters,
            "limit": payload.page_size,
            "offset": offset,
        }
    )

    return result.fetchall()

