import { useState } from "react"
import { useFarms } from "./hooks/useFarms"
import { SearchPanel } from "./components/SearchPanel"
import { FarmResult } from "./components/FarmResult"
import { Container, Typography, Paper } from "@mui/material"

export default function App() {
  const {
    data,
    loading,
    error,
    page,
    setPage,
    searchById,
    searchByPropertyCode,
    searchByPoint,
    searchByRadius,
  } = useFarms()

  const [id, setId] = useState(1)
  const [propertyCode, setPropertyCode] = useState("")
  const [lat, setLat] = useState(-20.041805)
  const [lng, setLng] = useState(-47.747061)
  const [radius, setRadius] = useState(30)

  const [lastSearch, setLastSearch] =
    useState<"id" | "code" | "point" | "radius">("radius")

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage)

    if (lastSearch === "point") {
      searchByPoint(lat, lng, newPage)
    }

    if (lastSearch === "radius") {
      searchByRadius(lat, lng, radius, newPage)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Farm Search
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <SearchPanel
          id={id}
          setId={setId}
          propertyCode={propertyCode}
          setPropertyCode={setPropertyCode}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
          radius={radius}
          setRadius={setRadius}
          loading={loading}
          onSearchById={() => {
            setLastSearch("id")
            searchById(id)
          }}
          onSearchByPropertyCode={() => {
            setLastSearch("code")
            searchByPropertyCode(propertyCode)
          }}
          onSearchByPoint={() => {
            setPage(1)
            setLastSearch("point")
            searchByPoint(lat, lng, 1)
          }}
          onSearchByRadius={() => {
            setPage(1)
            setLastSearch("radius")
            searchByRadius(lat, lng, radius, 1)
          }}
        />
      </Paper>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <FarmResult
          data={data}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  )
}
