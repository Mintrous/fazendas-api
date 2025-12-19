import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Stack,
  Box,
} from "@mui/material"
import type { Fazenda } from "../types/fazenda"

interface Props {
  data: Fazenda[] | Fazenda
  page: number
  onPageChange: (event: unknown, page: number) => void
}

export function FazendaResult({ data, page, onPageChange }: Props) {
  if (!data) return null

  if (!Array.isArray(data)) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Fazenda</Typography>
        <Stack spacing={1} mt={1}>
          <Box><strong>ID:</strong> {data.id}</Box>
          <Box><strong>Código:</strong> {data.cod_imovel}</Box>
          <Box><strong>Município:</strong> {data.municipio}</Box>
          <Box><strong>Área:</strong> {data.num_area}</Box>
        </Stack>
      </Paper>
    )
  }

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Município</TableCell>
            <TableCell>Área</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.id}</TableCell>
              <TableCell>{f.cod_imovel}</TableCell>
              <TableCell>{f.municipio}</TableCell>
              <TableCell>{f.num_area}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          page={page}
          onChange={onPageChange}
          count={data.length === 10 ? page + 1 : page}
        />
      </Box>
    </>
  )
}
