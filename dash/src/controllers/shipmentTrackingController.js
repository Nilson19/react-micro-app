import socket from "../services/SocketService";

export const ShipmentTrackingController = {
  connect: (onConnect, onDisconnect) => {
    socket.on("connect", () => {
      console.log("🟢 Conectado con ID:", socket.id);
      onConnect(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Desconectado");
      onDisconnect();
    });
  },

  subscribeToShipment: (shipmentId) => {
    console.log(`📨 Suscribiendo al envío #${shipmentId}`);
    socket.emit("subscribeToShipment", shipmentId);
  },

  onShipmentUpdate: (callback) => {
    socket.on("shipmentStatusUpdate", (data) => {
      console.log("📦 Actualización recibida:", data);
      callback(data);
    });
  },
};
