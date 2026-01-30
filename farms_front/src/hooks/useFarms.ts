import { useState } from "react"
import {
  searchFarmById,
  searchFarmByPropertyCode,
  searchFarmsByPoint,
  searchFarmsByRadius,
} from "../api/farms"
import type { Farm } from "../types/farm"

export function useFarms() {
  const [data, setData] = useState<Farm[] | Farm | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const page_size = 10

  async function searchById(id: number) {
    setLoading(true)
    setError(null)
    try {
      const result = await searchFarmById(id)
      setData(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function searchByPropertyCode(code: string) {
    setLoading(true)
    setError(null)
    try {
      const result = await searchFarmByPropertyCode(code)
      setData(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function searchByPoint(lat: number, lng: number, page: number) {
    setLoading(true)
    setError(null)
    try {
      const result = await searchFarmsByPoint({
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

  async function searchByRadius(lat: number, lng: number, radius: number, page: number) {
    setLoading(true)
    setError(null)
    try {
      const result = await searchFarmsByRadius({
        latitude: lat,
        longitude: lng,
        radius_km: radius,
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
    searchById,
    searchByPropertyCode,
    searchByPoint,
    searchByRadius,
  }
}
