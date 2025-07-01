import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";

export default function LoginView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    navigate,
  } = useLoginViewModel();

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
          <Button onClick={() => navigate("register")} fullWidth sx={{ mt: 1 }}>
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
}
