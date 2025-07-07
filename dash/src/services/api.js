import { useEffect } from "react";
import axios from "axios";

const useAxiosInterceptor = (token) => {
  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";
    axios.defaults.headers.common["Content-Type"] = "application/json";

    const interceptorId = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          delete config.headers?.Authorization;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, []);
};

export default useAxiosInterceptor;
