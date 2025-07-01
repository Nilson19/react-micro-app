import socket from "../services/SocketService";

export const ShipmentTrackingController = {
  isConnected: () => socket.connected,

  connect: (onConnect, onDisconnect) => {
    // Importante: usar "once" para evitar duplicados
    socket.once("connect", () => {
      console.log("🟢 Conectado con ID:", socket.id);
      onConnect(socket.id);
    });

    socket.once("disconnect", () => {
      console.log("🔴 Desconectado");
      onDisconnect();
    });
  },

  subscribeToShipment: (shipmentId) => {
    console.log(`📨 Suscribiendo al envío #${shipmentId}`);
    socket.emit("subscribeToShipment", shipmentId);
  },

  onShipmentUpdate: (callback) => {
    socket.on("shipmentStatusUpdate", callback);
  },

  offShipmentUpdate: (callback) => {
    socket.off("shipmentStatusUpdate", callback);
  },
};
