import type {
  Farm,
  SearchPointRequest,
  SearchRadiusRequest,
} from "../types/farm"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function searchFarmById(id: number): Promise<Farm> {
  const res = await fetch(`${API_BASE_URL}/farms/${id}`)

  if (!res.ok) {
    throw new Error("Farm not found")
  }

  return res.json()
}

export async function searchFarmByPropertyCode(
  property_code: string
): Promise<Farm> {
  const res = await fetch(
    `${API_BASE_URL}/farms/property-code/${property_code}`
  )

  if (!res.ok) {
    throw new Error("Farm not found")
  }

  return res.json()
}


export async function searchFarmsByPoint(
  payload: SearchPointRequest
): Promise<Farm[]> {
  const res = await fetch(`${API_BASE_URL}/farms/search-point`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Error searching by point")
  }

  return res.json()
}

export async function searchFarmsByRadius(
  payload: SearchRadiusRequest
): Promise<Farm[]> {
  const res = await fetch(`${API_BASE_URL}/farms/search-radius`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Error searching by radius")
  }

  return res.json()
}
