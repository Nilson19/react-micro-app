import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import { useShipmentTrackingViewModel } from "../viewmodels/useShipmentTrackingViewModel";

export default function ShipmentTrackingView({ shipmentId }) {
  const { status, socketId, updates } = useShipmentTrackingViewModel(shipmentId);

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Seguimiento de Envío
        </Typography>

        <Alert severity={status === "Conectado" ? "success" : "error"}>
          Estado: {status}
        </Alert>

        {socketId && (
          <Typography variant="body2" color="textSecondary">
            ID del Socket: {socketId}
          </Typography>
        )}

        <Box mt={2}>
          <Typography variant="subtitle1">Actualizaciones:</Typography>
          {updates.length === 0 ? (
            <Typography variant="body2">Sin actualizaciones aún.</Typography>
          ) : (
            <List dense>
              {updates.map((u, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`Estado: ${u.status}`}
                    secondary={`Envío ID: ${u.id}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Container>
  );
}
