import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./application/context/AuthContext";

const AuthApp = React.lazy(() => import("auth/AuthApp"));
const DashboardApp = React.lazy(() => import("dashboard/DashboardApp"));

export default function AppRoutes() {
  const {user} = useAuthStore();

  console.log("AppRoutes initialized with user:", user);

  const token = user?.token;


  return (
      <BrowserRouter>
        <Suspense fallback={<div>Cargando…</div>}>
          <Routes>
            <Route
              path="/"
              element={
                token ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />
              }
            />
            <Route path="/auth/*" element={<AuthApp />} />
            <Route
              path="/dashboard/*"
              element={
                token ? <DashboardApp user={user} /> : <Navigate to="/" />
              }
            />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}
