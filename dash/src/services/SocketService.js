// services/SocketService.js
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
