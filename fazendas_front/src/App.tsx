import { useState } from "react"
import { useFazendas } from "./hooks/useFazendas"
import { SearchPanel } from "./components/SearchPanel"
import { FazendaResult } from "./components/FazendaResult"
import { Container, Typography, Paper } from "@mui/material"

export default function App() {
  const {
    data,
    loading,
    error,
    page,
    setPage,
    buscarPorId,
    buscarPorCodImovel,
    buscarPorPonto,
    buscarPorRaio,
  } = useFazendas()

  const [id, setId] = useState(1)
  const [codImovel, setCodImovel] = useState("")
  const [lat, setLat] = useState(-20.041805)
  const [lng, setLng] = useState(-47.747061)
  const [raio, setRaio] = useState(30)

  const [lastSearch, setLastSearch] =
    useState<"id" | "cod" | "ponto" | "raio">("raio")

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage)

    if (lastSearch === "ponto") {
      buscarPorPonto(lat, lng, newPage)
    }

    if (lastSearch === "raio") {
      buscarPorRaio(lat, lng, raio, newPage)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Consulta de Fazendas
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <SearchPanel
          id={id}
          setId={setId}
          codImovel={codImovel}
          setCodImovel={setCodImovel}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          raio={raio}
          setRaio={setRaio}
          loading={loading}
          onBuscarPorId={() => {
            setLastSearch("id")
            buscarPorId(id)
          }}
          onBuscarPorCodImovel={() => {
            setLastSearch("cod")
            buscarPorCodImovel(codImovel)
          }}
          onBuscarPorPonto={() => {
            setPage(1)
            setLastSearch("ponto")
            buscarPorPonto(lat, lng, 1)
          }}
          onBuscarPorRaio={() => {
            setPage(1)
            setLastSearch("raio")
            buscarPorRaio(lat, lng, raio, 1)
          }}
        />
      </Paper>

      {loading && <Typography>Carregando...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <FazendaResult
          data={data}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  )
}
