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
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```
   Com a docker engine executando, execute:
   ```docker compose up --build```

## Acessos

Frontend: http://localhost:3000
API (Swagger): http://localhost:8000/docs

## Principais endpoints

1. GET /fazendas/{id}
2. GET /fazendas/cod-imovel/{cod_imovel}
3. POST /fazendas/busca-ponto
4. POST /fazendas/busca-raio
