import {
  Button,
  TextField,
  Stack,
} from "@mui/material"

interface Props {
  id: number
  setId: (v: number) => void
  codImovel: string
  setCodImovel: (v: string) => void
  lat: number
  lng: number
  raio: number
  setLat: (v: number) => void
  setLng: (v: number) => void
  setRaio: (v: number) => void
  loading: boolean
  onBuscarPorId: () => void
  onBuscarPorCodImovel: () => void
  onBuscarPorPonto: () => void
  onBuscarPorRaio: () => void
}

export function SearchPanel(props: Props) {
  const {
    id,
    setId,
    codImovel,
    setCodImovel,
    lat,
    lng,
    raio,
    setLat,
    setLng,
    setRaio,
    loading,
    onBuscarPorId,
    onBuscarPorCodImovel,
    onBuscarPorPonto,
    onBuscarPorRaio,
  } = props

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="ID"
          type="text"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          size="small"
        />
        <Button
          variant="outlined"
          disabled={loading}
          onClick={onBuscarPorId}
        >
          Buscar por ID
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Código do Imóvel"
          value={codImovel}
          onChange={(e) => setCodImovel(e.target.value)}
          size="small"
          fullWidth
        />
        <Button
          variant="outlined"
          disabled={loading || !codImovel}
          onClick={onBuscarPorCodImovel}
        >
          Buscar
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Latitude"
          type="text"
          value={lat}
          onChange={(e) => setLat(Number(e.target.value))}
          size="small"
        />
        <TextField
          label="Longitude"
          type="text"
          value={lng}
          onChange={(e) => setLng(Number(e.target.value))}
          size="small"
        />
        <Button
          variant="outlined"
          disabled={loading}
          onClick={onBuscarPorPonto}
        >
          Buscar por ponto
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Raio (km)"
          type="text"
          value={raio}
          onChange={(e) => setRaio(Number(e.target.value))}
          size="small"
        />
        <Button
          variant="outlined"
          disabled={loading}
          onClick={onBuscarPorRaio}
        >
          Buscar por raio
        </Button>
      </Stack>
    </Stack>
  )
}
