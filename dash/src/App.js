import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, TextField, Button } from "@mui/material";
import QuoteView from "./views/QuoteView";
import ShipmentsListView from "./views/Shipments";
import ShipmentTrackingView from "./views/ShipmentTrackingView";

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [shipmentInput, setShipmentInput] = useState("");
  const [shipmentId, setShipmentId] = useState(null);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleStartTracking = () => {
    if (shipmentInput.trim() !== "") {
      setShipmentId(parseInt(shipmentInput, 10));
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Cotizar Envío" />
        <Tab label="Mis Envíos" />
        <Tab label="Seguimiento" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && (
          <Box>
            <QuoteView />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <ShipmentsListView />
          </Box>
        )}
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

            {shipmentId && (
              <ShipmentTrackingView shipmentId={shipmentId} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
