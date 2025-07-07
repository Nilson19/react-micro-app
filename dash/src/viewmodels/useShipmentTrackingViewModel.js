import { useEffect, useState } from "react";
import { ShipmentTrackingController } from "../controllers/ShipmentTrackingController";

export function useShipmentTrackingViewModel(shipmentId) {
  const [status, setStatus] = useState(
    ShipmentTrackingController.isConnected() ? "Conectado" : "Desconectado"
  );
  const [socketId, setSocketId] = useState(null);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!shipmentId) return;

    if (ShipmentTrackingController.isConnected()) {
      setStatus("Conectado");
      setSocketId(window.socket?.id || null);
      ShipmentTrackingController.subscribeToShipment(shipmentId);
    } else {
      ShipmentTrackingController.connect(
        (id) => {
          setStatus("Conectado");
          setSocketId(id);
          ShipmentTrackingController.subscribeToShipment(shipmentId);
        },
        () => {
          setStatus("Desconectado");
          setSocketId(null);
        }
      );
    }

    const handleUpdate = (data) => {
      console.log("📦 Actualización recibida:", data);
      setUpdates((prev) => [...prev, data]);
    };

    ShipmentTrackingController.onShipmentUpdate(handleUpdate);

    return () => {
      console.log("🧹 Limpiando listener de shipment update...");
      ShipmentTrackingController.offShipmentUpdate(handleUpdate);
    };
  }, [shipmentId]);

  return { status, socketId, updates };
}
