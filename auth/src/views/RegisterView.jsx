import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useRegisterViewModel } from "../viewmodels/useRegisterViewModel";

export default function RegisterView() {
  const {
    form,
    error,
    handleChange,
    handleAddressChange,
    addAddress,
    removeAddress,
    handleSubmit,
    navigate,
  } = useRegisterViewModel();

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Crear Cuenta
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="firstName"
            fullWidth
            margin="normal"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            name="lastName"
            fullWidth
            margin="normal"
            value={form.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Teléfono"
            name="phone"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <Box mt={2} mb={1}>
            <Typography variant="subtitle1">Direcciones</Typography>
          </Box>
          {form.addresses.map((addr, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={1}>
              <TextField
                label={`Dirección #${idx + 1}`}
                fullWidth
                value={addr}
                onChange={(e) => handleAddressChange(idx, e)}
              />
              <IconButton
                onClick={() => removeAddress(idx)}
                disabled={form.addresses.length === 1}
                sx={{ ml: 1 }}
              >
                <RemoveCircleOutline />
              </IconButton>
              {idx === form.addresses.length - 1 && (
                <IconButton onClick={addAddress} sx={{ ml: 1 }}>
                  <AddCircleOutline />
                </IconButton>
              )}
            </Box>
          ))}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Registrar
          </Button>
          <Button
            onClick={() => navigate("/")}
            fullWidth
            sx={{ mt: 1 }}
            color="inherit"
          >
            Volver al login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
