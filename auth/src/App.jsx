import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import useAxiosInterceptor from "./services/api";

const AuthApp = () => {
  // Initialize Axios interceptor for API requests
  useAxiosInterceptor();
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
};

export default AuthApp;
