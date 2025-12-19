from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from .core.database import check_db
from .routers.fazendas import router as fazendas_router

app = FastAPI(
    title="API de Fazendas",
    description="API geoespacial para consulta de fazendas",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro dos routers
app.include_router(fazendas_router)


@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    try:
        check_db()
        return {
            "status": "ok",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "error",
            "database": "disconnected",
            "detail": str(e)
        }
