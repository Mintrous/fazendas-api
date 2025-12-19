import { useState } from "react"
import {
  buscarFazendaPorId,
  buscarFazendaPorCodImovel,
  buscarFazendasPorPonto,
  buscarFazendasPorRaio,
} from "../api/fazendas"
import type { Fazenda } from "../types/fazenda"

export function useFazendas() {
  const [data, setData] = useState<Fazenda[] | Fazenda | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const page_size = 10

  async function buscarPorId(id: number) {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarFazendaPorId(id)
      setData(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function buscarPorCodImovel(cod: string) {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarFazendaPorCodImovel(cod)
      setData(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function buscarPorPonto(lat: number, lng: number, page: number) {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarFazendasPorPonto({
        latitude: lat,
        longitude: lng,
        page,
        page_size,
      })
      setData(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function buscarPorRaio(lat: number, lng: number, raio: number, page: number) {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarFazendasPorRaio({
        latitude: lat,
        longitude: lng,
        raio_km: raio,
        page,
        page_size,
      })
      setData(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    page,
    setPage,
    buscarPorId,
    buscarPorCodImovel,
    buscarPorPonto,
    buscarPorRaio,
  }
}
