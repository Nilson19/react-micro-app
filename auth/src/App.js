import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

const AuthApp = () => (
  <Routes>
    <Route index element={<LoginView />} />
    <Route path="/register" element={<RegisterView />} />
    <Route path="*" element={<div>Página no encontrada micro</div>} />
  </Routes>
);

export default AuthApp;