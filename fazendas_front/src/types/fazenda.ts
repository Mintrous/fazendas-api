export interface Fazenda {
  id: number
  cod_imovel?: string
  municipio?: string
  num_area?: number
  lat?: number
  lng?: number
}

export interface BuscaPontoRequest {
  latitude: number
  longitude: number
  page: number
  page_size: number
}

export interface BuscaRaioRequest {
  latitude: number
  longitude: number
  raio_km: number
  page: number
  page_size: number
}
