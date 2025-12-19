# Busca de Fazendas com Dados Geoespaciais

Aplicação full stack para consulta de fazendas utilizando **dados geoespaciais**, construída com:

- **Backend:** FastAPI + PostgreSQL/PostGIS  
- **Frontend:** React (Vite)  
- **Infraestrutura:** Docker + Docker Compose  

O sistema permite buscar fazendas por **ID**, **código do imóvel**, **ponto geográfico** ou **ponto geográfico com raio em quilômetros**.

Todo o ambiente é iniciado com um único comando, incluindo **seed automático dos dados geográficos**.

---

## Pré-requisitos

- Docker
- Docker Compose

---

## Como rodar o projeto

Clone o repositório:
   ```bash
   git clone https://github.com/Mintrous/fazendas-api.git
   cd fazendas-api
   ```
   Com a docker engine executando, execute:
   ```docker compose up --build```

## Acessos

Frontend: http://localhost:3000

API (Swagger): http://localhost:8000/docs

Health check: http://localhost:8000/health

## Principais endpoints

1. GET /fazendas/{id}
2. GET /fazendas/cod-imovel/{cod_imovel}
3. POST /fazendas/busca-ponto
4. POST /fazendas/busca-raio

## PostGIS

As queries utilizando o PostGIS estão em: ```fazendas_api/app/routers/fazendas.py```

