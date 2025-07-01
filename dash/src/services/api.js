import axios from "axios";
import { useAuthStore } from "shell/store"; // Asegúrate de usar la ruta correcta

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Interceptor que añade el token dinámico
api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState(); // 💡 Aquí sacas el user en runtime
    if (user?.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${user.token}`;
    } else {
      delete config.headers?.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
