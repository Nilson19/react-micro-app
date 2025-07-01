import React, { Suspense, use, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./application/context/AuthContext";


const AuthApp = React.lazy(() => import("auth/AuthApp"));
const DashboardApp = React.lazy(() => import("dashboard/DashboardApp"));

export default function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  console.log("isAuthenticated:", isAuthenticated);
  

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando…</div>}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />
            }
          />
          <Route path="/auth/*" element={<AuthApp />} />
          <Route
            path="/dashboard/*"
            element={isAuthenticated ? <DashboardApp /> : <Navigate to="/" />}
          />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
