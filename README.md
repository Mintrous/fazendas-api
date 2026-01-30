# Farm Search with Geospatial Data

The application uses **FastAPI + PostgreSQL/PostGIS** in the backend and **React (Vite)** in the frontend.  
The system allows searching for farms by **ID**, **property code**, **geographic point**, or **geographic point + radius in kilometers**.

The entire environment is orchestrated with **Docker Compose**, including **automatic seed** of geospatial data.

---

## Prerequisites

- Docker
- Docker Compose

---

## How to run the project

1. Clone the repository
2. Start the entire application with: `docker compose up --build`

## Access

Frontend: http://localhost:3000

API (Swagger): http://localhost:8000/docs

## Main endpoints

GET /farms/{id}
GET /farms/property-code/{property_code}
POST /farms/search-point
POST /farms/search-radius
