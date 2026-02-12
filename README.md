# Geospatial Farm Search API

A RESTful API built with **FastAPI + PostgreSQL/PostGIS** to perform spatial queries on rural property data.

This project was developed to explore **geospatial data modeling**, **spatial indexing**, and advanced SQL queries using the **PostGIS** extension.

The API enables spatial search operations such as point containment and radius-based proximity queries directly at the database level.

---

## Architecture Overview

- **Backend:** FastAPI
- **Database:** PostgreSQL with PostGIS extension
- **ORM:** SQLAlchemy
- **Containerization:** Docker & Docker Compose
- **Data Initialization:** Automatic geospatial seed on startup
- **Frontend:** React (Vite)

The entire environment is orchestrated via Docker Compose, including database setup, PostGIS activation, and dataset population.

---

## Project Goals

The primary objective of this project was to:

- Model and store geospatial geometries in PostgreSQL with PostGIS extension
- Explore and use PostGIS spatial functions for querying
- Apply spatial indexing for performance optimization
- Work with SRIDs and coordinate reference systems

---

## Geospatial Concepts Applied

- Geometry storage (Polygon / MultiPolygon)
- SRID configuration
- Spatial indexing (GiST indexes)
- Distance-based filtering
- Point-in-polygon queries

### Core PostGIS Functions Used

`ST_SetSRID`, `ST_MakePoint`, `ST_DWithin`, `ST_Contains`;

All spatial logic is executed at the database layer.

---

## API Capabilities

- Retrieve a farm by internal ID
- Retrieve a farm by property code
- Check which farm contains a given geographic point
- Search farms within a given radius (in kilometers) from a geographic point

All responses are JSON-based and documented via Swagger.

---

## Running the Project

### Prerequisites

- Docker
- Docker Compose

### Steps

```bash
git clone https://github.com/Mintrous/geospatial-api.git
cd farms-api
docker compose up --build
```

### This will:

- Start PostgreSQL with PostGIS enabled
- Automatically run database migrations
- Seed the database with geospatial farm data
- Start the FastAPI server

## API Documentation

### Swagger UI: 
```
http://localhost:8000/docs
```

### Main endpoints

#### Get farm by ID
- GET /farms/{id}

#### Get farm by property code
- GET /farms/property-code/{property_code}

#### Search farm by geographic point
- POST /farms/search-point -> request body must follow this example:
```bash
{
  "latitude": -18.9,
  "longitude": -48.2
}
```

#### Search farms by geographic point and radius
- POST /farms/search-radius -> the request body must follow this example:
```bash
{
  "latitude": -18.9,
  "longitude": -48.2,
  "radius_km": 10
}
```

## Data model
<img width="294" height="326" alt="image" src="https://github.com/user-attachments/assets/e78d1121-8913-4408-846e-611978a8d1f0" />

### Example of farms territory delimitations visualization:
<img width="1466" height="781" alt="image" src="https://github.com/user-attachments/assets/13aed293-5dfe-4fdd-a590-bb27bad4bfd6" />

## Project motivation

This project was built as a practical exploration of: spatial databases and queries, PostGIS internals, backend API design with FastAPI, containerized database environments

