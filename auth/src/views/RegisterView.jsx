import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline, Star, StarBorder } from "@mui/icons-material";
import { useRegisterViewModel } from "../viewmodels/useRegisterViewModel";

export default function RegisterView() {
  const {
    form,
    error,
    handleChange,
    handleAddressChange,
    addAddress,
    removeAddress,
    setDefaultAddress,
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
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            name="last_name"
            fullWidth
            margin="normal"
            value={form.last_name}
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

          <Box mt={3} mb={1}>
            <Typography variant="subtitle1">Direcciones</Typography>
          </Box>

          {form.addresses.map((addr, idx) => (
            <Box
              key={idx}
              mb={2}
              p={2}
              border="1px solid #ddd"
              borderRadius={1}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2">
                  Dirección #{idx + 1}
                </Typography>
                <IconButton onClick={() => setDefaultAddress(idx)}>
                  {addr.is_default ? (
                    <Star color="primary" />
                  ) : (
                    <StarBorder />
                  )}
                </IconButton>
              </Box>

              <TextField
                label="Calle"
                fullWidth
                margin="dense"
                value={addr.street}
                onChange={(e) => handleAddressChange(idx, "street", e.target.value)}
              />
              <TextField
                label="Ciudad"
                fullWidth
                margin="dense"
                value={addr.city}
                onChange={(e) => handleAddressChange(idx, "city", e.target.value)}
              />
              <TextField
                label="Departamento/Estado"
                fullWidth
                margin="dense"
                value={addr.state}
                onChange={(e) => handleAddressChange(idx, "state", e.target.value)}
              />
              <TextField
                label="Código Postal"
                fullWidth
                margin="dense"
                value={addr.zip_code}
                onChange={(e) => handleAddressChange(idx, "zip_code", e.target.value)}
              />
              <TextField
                label="País"
                fullWidth
                margin="dense"
                value={addr.country}
                onChange={(e) => handleAddressChange(idx, "country", e.target.value)}
              />

              <Box display="flex" alignItems="center" mt={1}>
                <IconButton
                  onClick={() => removeAddress(idx)}
                  disabled={form.addresses.length === 1}
                >
                  <RemoveCircleOutline />
                </IconButton>
                {idx === form.addresses.length - 1 && (
                  <IconButton onClick={addAddress}>
                    <AddCircleOutline />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
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
