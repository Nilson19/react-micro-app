import axios from "axios";
import { useAuthStore } from "shell/store";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Interceptor que añade el token dinámico
api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
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
