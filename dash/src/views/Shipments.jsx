import React from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useShipmentsViewModel } from "../viewmodels/useShipmentsViewModel";

export default function ShipmentsListView() {
  const { shipments, loading, error, reload } = useShipmentsViewModel();

  return (
    <Container maxWidth="md">
      <Box mt={6}>
        <Typography variant="h5" gutterBottom align="center">
          Lista de Envíos
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && shipments.length === 0 && (
          <Alert severity="info">No hay envíos registrados.</Alert>
        )}

        {!loading && shipments.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Estado</TableCell>
                <TableCell>Creado</TableCell>
                <TableCell>Actualizado</TableCell>
                <TableCell>Costo</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Destino</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((s, idx) => (
                <TableRow key={idx}>
                  <TableCell>{s.status}</TableCell>
                  <TableCell>{new Date(s.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(s.updated_at).toLocaleString()}</TableCell>
                  <TableCell>${s.total_cost}</TableCell>
                  <TableCell>{s.origin_zip}</TableCell>
                  <TableCell>{s.destination_zip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={reload}>
            Recargar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
