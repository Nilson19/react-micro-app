import { useEffect } from "react";
import axios from "axios";

const useAxiosInterceptor = () => {
  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";
    axios.defaults.headers.common["Content-Type"] = "application/json";
  }, []);
};

export default useAxiosInterceptor;
