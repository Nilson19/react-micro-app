import React from 'react';
import { useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, Button } from "@mui/material";
import QuoteView from "./views/QuoteView";
import ShipmentsListView from "./views/Shipments";
import ShipmentTrackingView from "./views/ShipmentTrackingView";
import { useAuthContext } from "shell/store";

const DashboardApp = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shipmentInput, setShipmentInput] = useState("");
  const [shipmentId, setShipmentId] = useState(null);
  const { setUser } = useAuthContext();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleStartTracking = () => {
    if (shipmentInput.trim() !== "") {
      setShipmentId(parseInt(shipmentInput, 10));
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Cotizar Envío" />
          <Tab label="Mis Envíos" />
          <Tab label="Seguimiento" />
        </Tabs>

        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && <QuoteView />}
        {tabIndex === 1 && <ShipmentsListView />}
        {tabIndex === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ingresar ID de Envío
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="ID del Envío"
                value={shipmentInput}
                onChange={(e) => setShipmentInput(e.target.value)}
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleStartTracking}
                disabled={!shipmentInput.trim()}
              >
                Ver seguimiento
              </Button>
            </Box>
            {shipmentId && <ShipmentTrackingView shipmentId={shipmentId} />}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DashboardApp;