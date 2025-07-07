import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

const AuthApp = () => (
  <Routes>
    <Route path="/" element={<LoginView />} />
    <Route path="/login" element={<LoginView />} />
    <Route path="/register" element={<RegisterView />} />
    <Route path="*" element={<div>Página no encontrada</div>} />
  </Routes>
);

export default AuthApp;
