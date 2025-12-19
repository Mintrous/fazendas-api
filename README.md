# Buscando fazendas com dados geográficos

A aplicação utiliza **FastAPI + PostgreSQL/PostGIS** no backend e **React (Vite)** no frontend.  
O sistema permite buscar fazendas por **ID**, **código do imóvel**, **ponto geográfico** ou **ponto geográfico + raio em quilômetros**.

Todo o ambiente é orquestrado com **Docker Compose**, incluindo **seed automático** dos dados geográficos.

---

## Pré-requisitos

- Docker
- Docker Compose

---

## Como rodar o projeto

1. Clone o repositório
2. Suba toda a aplicação com: `docker compose up --build`

## Acessos

Frontend: http://localhost:3000
API (Swagger): http://localhost:8000/docs

## Principais endpoints

GET /fazendas/{id}
GET /fazendas/cod-imovel/{cod_imovel}
POST /fazendas/busca-ponto
POST /fazendas/busca-raio