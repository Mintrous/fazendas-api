import {
  Button,
  TextField,
  Stack,
} from "@mui/material"

interface Props {
  id: number
  setId: (v: number) => void
  propertyCode: string
  setPropertyCode: (v: string) => void
  lat: number
  lng: number
  radius: number
  setLat: (v: number) => void
  setLng: (v: number) => void
  setRadius: (v: number) => void
  loading: boolean
  onSearchById: () => void
  onSearchByPropertyCode: () => void
  onSearchByPoint: () => void
  onSearchByRadius: () => void
}

export function SearchPanel(props: Props) {
  const {
    id,
    setId,
    propertyCode,
    setPropertyCode,
    lat,
    lng,
    radius,
    setLat,
    setLng,
    setRadius,
    loading,
    onSearchById,
    onSearchByPropertyCode,
    onSearchByPoint,
    onSearchByRadius,
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
          onClick={onSearchById}
        >
          Search by ID
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Property Code"
          value={propertyCode}
          onChange={(e) => setPropertyCode(e.target.value)}
          size="small"
          fullWidth
        />
        <Button
          variant="outlined"
          disabled={loading || !propertyCode}
          onClick={onSearchByPropertyCode}
        >
          Search
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
          onClick={onSearchByPoint}
        >
          Search by point
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Radius (km)"
          type="text"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          size="small"
        />
        <Button
          variant="outlined"
          disabled={loading}
          onClick={onSearchByRadius}
        >
          Search by radius
        </Button>
      </Stack>
    </Stack>
  )
}
