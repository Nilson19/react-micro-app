import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useShipmentTrackingViewModel(shipmentId) {
  const [status, setStatus] = useState("Desconectado");
  const [socketId, setSocketId] = useState(null);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!shipmentId) return;

    // Crear conexión SOLO UNA VEZ por shipmentId
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      setStatus("Conectado");
      setSocketId(socket.id);
      console.log("🟢 Conectado:", socket.id);

      // Suscribirse al envío específico
      socket.emit("subscribeToShipment", shipmentId);
    });

    socket.on("shipmentStatusUpdate", (data) => {
      console.log("📦 Actualización recibida:", data);
      setUpdates((prev) => [...prev, data]);
    });

    socket.on("disconnect", () => {
      setStatus("Desconectado");
      setSocketId(null);
      console.log("🔴 Desconectado");
    });

    // IMPORTANTE: limpiar la conexión al desmontar
    return () => {
      console.log("🧹 Desconectando socket");
      socket.disconnect();
    };
  }, [shipmentId]); // Solo reiniciar si shipmentId cambia

  return { status, socketId, updates };
}
