import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useQuoteViewModel } from "../viewmodels/useQuoteViewModel";

export default function QuoteView() {
  const {
    form,
    error,
    successMessage,
    quote,
    loading,
    creating,
    handleChange,
    handleQuote,
    handleCreate,
  } = useQuoteViewModel();

  return (
    <Container maxWidth="sm">
      <Box mt={6} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Cotizar Envío
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleQuote}>
          <TextField
            label="Código Postal Origen"
            name="originZip"
            fullWidth
            margin="normal"
            value={form.originZip}
            onChange={handleChange}
          />
          <TextField
            label="Código Postal Destino"
            name="destinationZip"
            fullWidth
            margin="normal"
            value={form.destinationZip}
            onChange={handleChange}
          />
          <TextField
            label="Peso (kg)"
            name="weight"
            type="number"
            fullWidth
            margin="normal"
            value={form.weight}
            onChange={handleChange}
          />
          <TextField
            label="Largo (cm)"
            name="length"
            type="number"
            fullWidth
            margin="normal"
            value={form.length}
            onChange={handleChange}
          />
          <TextField
            label="Ancho (cm)"
            name="width"
            type="number"
            fullWidth
            margin="normal"
            value={form.width}
            onChange={handleChange}
          />
          <TextField
            label="Alto (cm)"
            name="height"
            type="number"
            fullWidth
            margin="normal"
            value={form.height}
            onChange={handleChange}
          />

          <Box textAlign="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              Cotizar
            </Button>
          </Box>
        </form>

        {quote && (
          <Box mt={4} textAlign="center">
            <Alert severity="info">
              Precio estimado: <strong>${quote}</strong>
            </Alert>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCreate}
              disabled={creating}
            >
              {creating ? <CircularProgress size={20} /> : "Crear Envío"}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
