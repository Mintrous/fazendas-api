FROM python:3.11

WORKDIR /seed

RUN pip install --no-cache-dir \
    geopandas \
    psycopg2-binary \
    shapely \
    fiona \
    pyproj \
    requests \
    gdown

COPY . /seed

CMD ["python", "seed_db.py"]
