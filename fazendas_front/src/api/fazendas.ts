import type {
  Fazenda,
  BuscaPontoRequest,
  BuscaRaioRequest,
} from "../types/fazenda"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function buscarFazendaPorId(id: number): Promise<Fazenda> {
  const res = await fetch(`${API_BASE_URL}/fazendas/${id}`)

  if (!res.ok) {
    throw new Error("Fazenda não encontrada")
  }

  return res.json()
}

export async function buscarFazendaPorCodImovel(
  cod_imovel: string
): Promise<Fazenda> {
  const res = await fetch(
    `${API_BASE_URL}/fazendas/cod-imovel/${cod_imovel}`
  )

  if (!res.ok) {
    throw new Error("Fazenda não encontrada")
  }

  return res.json()
}


export async function buscarFazendasPorPonto(
  payload: BuscaPontoRequest
): Promise<Fazenda[]> {
  const res = await fetch(`${API_BASE_URL}/fazendas/busca-ponto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Erro na busca por ponto")
  }

  return res.json()
}

export async function buscarFazendasPorRaio(
  payload: BuscaRaioRequest
): Promise<Fazenda[]> {
  const res = await fetch(`${API_BASE_URL}/fazendas/busca-raio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Erro na busca por raio")
  }

  return res.json()
}
