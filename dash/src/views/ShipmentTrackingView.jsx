import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useShipmentTrackingViewModel } from "../viewmodels/useShipmentTrackingViewModel";

export default function ShipmentTrackingView({ shipmentId }) {
  const { status, socketId, updates } = useShipmentTrackingViewModel(shipmentId);

  return (
    <Box mt={4} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Seguimiento de Envío #{shipmentId}
      </Typography>

      <Alert severity={status === "Conectado" ? "success" : "warning"}>
        Estado de la conexión: {status}
      </Alert>

      {status === "Conectado" && socketId && (
        <Typography variant="body2" color="textSecondary" mb={2}>
          ID del socket: {socketId}
        </Typography>
      )}

      {status === "Desconectado" && (
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="textSecondary">
            Intentando reconectar...
          </Typography>
        </Box>
      )}

      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          Actualizaciones recibidas:
        </Typography>
        {updates.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No hay actualizaciones aún.
          </Typography>
        ) : (
          <List dense>
            {updates.map((update, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText
                  primary={`Estado: ${update.status}`}
                  secondary={`Fecha: ${update.timestamp}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
