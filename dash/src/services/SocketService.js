import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Cambia si tu backend tiene otra URL

export default socket;
