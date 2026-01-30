export interface Farm {
  id: number
  cod_imovel?: string
  municipio?: string
  num_area?: number
  lat?: number
  lng?: number
}

export interface SearchPointRequest {
  latitude: number
  longitude: number
  page: number
  page_size: number
}

export interface SearchRadiusRequest {
  latitude: number
  longitude: number
  radius_km: number
  page: number
  page_size: number
}
