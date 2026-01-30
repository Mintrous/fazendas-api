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
import type { Farm } from "../types/farm"

interface Props {
  data: Farm[] | Farm
  page: number
  onPageChange: (event: unknown, page: number) => void
}

export function FarmResult({ data, page, onPageChange }: Props) {
  if (!data) return null

  if (!Array.isArray(data)) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Farm</Typography>
        <Stack spacing={1} mt={1}>
          <Box><strong>ID:</strong> {data.id}</Box>
          <Box><strong>Code:</strong> {data.cod_imovel}</Box>
          <Box><strong>County:</strong> {data.municipio}</Box>
          <Box><strong>Area:</strong> {data.num_area}</Box>
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
            <TableCell>Code</TableCell>
            <TableCell>County</TableCell>
            <TableCell>Area</TableCell>
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
