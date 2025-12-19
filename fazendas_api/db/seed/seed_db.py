from psycopg2 import connect, OperationalError
from psycopg2.extras import execute_batch
import geopandas as gpd
import os
import time
import zipfile
from pathlib import Path
import gdown

GOOGLE_DRIVE_FILE_ID = "15ghpnwzdDhFqelouqvQwXlbzovtPhlFe"

ZIP_PATH = "/seed/data.zip"
EXTRACT_DIR = "/seed/data"
SHAPEFILE_PATH = "/seed/data/AREA_IMOVEL_1.shp"

DB_PARAMS = {
    "host": os.getenv("POSTGRES_HOST", "db"),
    "port": 5432,
    "dbname": os.getenv("POSTGRES_DB", "postgres"),
    "user": os.getenv("POSTGRES_USER", "postgres"),
    "password": os.getenv("POSTGRES_PASSWORD", "postgres"),
}

SCHEMA = "gis"
TABLE = "primeira"
GEOM_COLUMN = "shape"
SRID = 4326


def wait_for_db():
    print("Aguardando banco ficar disponível...")
    while True:
        try:
            conn = connect(**DB_PARAMS)
            conn.close()
            print("Banco disponível.")
            break
        except OperationalError:
            time.sleep(2)


def download_and_extract():
    if Path(SHAPEFILE_PATH).exists():
        print("Dados já disponíveis, pulando download.")
        return

    print("Baixando dados geoespaciais do Google Drive...")
    gdown.download(
        id=GOOGLE_DRIVE_FILE_ID,
        output=ZIP_PATH,
        quiet=False
    )

    print("Extraindo arquivos...")
    os.makedirs(EXTRACT_DIR, exist_ok=True)
    with zipfile.ZipFile(ZIP_PATH, "r") as zip_ref:
        zip_ref.extractall(EXTRACT_DIR)

    print("Download e extração concluídos.")


def pg_type(dtype):
    dtype = str(dtype).lower()
    if "int" in dtype:
        return "INTEGER"
    if "float" in dtype:
        return "DOUBLE PRECISION"
    if "bool" in dtype:
        return "BOOLEAN"
    return "TEXT"


def main():
    wait_for_db()
    download_and_extract()

    print("Lendo shapefile...")
    gdf = gpd.read_file(SHAPEFILE_PATH)

    if gdf.crs is None:
        raise RuntimeError("Shapefile sem CRS definido")

    if gdf.crs.to_epsg() != SRID:
        print("Reprojetando shapefile para EPSG:4326...")
        gdf = gdf.to_crs(epsg=SRID)

    with connect(**DB_PARAMS) as conn:
        with conn.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
            cur.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA};")
            cur.execute(f"SET search_path = {SCHEMA}, public;")

            attr_columns = []
            attr_names = []

            for col, dtype in gdf.dtypes.items():
                if col == gdf.geometry.name:
                    continue
                attr_columns.append(f"{col} {pg_type(dtype)}")
                attr_names.append(col)

            cur.execute(f"""
                CREATE TABLE IF NOT EXISTS {SCHEMA}.{TABLE} (
                    id SERIAL PRIMARY KEY,
                    {", ".join(attr_columns)},
                    {GEOM_COLUMN} geometry(GEOMETRY, {SRID})
                );
            """)

            cur.execute(f"TRUNCATE TABLE {SCHEMA}.{TABLE};")

            insert_sql = f"""
                INSERT INTO {SCHEMA}.{TABLE}
                ({", ".join(attr_names)}, {GEOM_COLUMN})
                VALUES (
                    {", ".join(["%s"] * len(attr_names))},
                    ST_GeomFromText(%s, {SRID})
                );
            """

            data = [
                [row[col] for col in attr_names] + [row.geometry.wkt]
                for _, row in gdf.iterrows()
            ]

            execute_batch(cur, insert_sql, data, page_size=1000)

            cur.execute(f"""
                CREATE INDEX IF NOT EXISTS idx_{TABLE}_shape
                ON {SCHEMA}.{TABLE}
                USING GIST ({GEOM_COLUMN});
            """)

            conn.commit()

    print("Banco populado com sucesso.")


if __name__ == "__main__":
    main()
