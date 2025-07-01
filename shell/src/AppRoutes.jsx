import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AuthApp = React.lazy(() => import("auth/AuthApp"));
const DashboardApp = React.lazy(() => import("dashboard/DashboardApp"));

export default function AppRoutes() {

  const user = false;

  return (
      <BrowserRouter>
        <Suspense fallback={<div>Cargando…</div>}>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />
              }
            />
            <Route path="/auth/*" element={<AuthApp />} />
            <Route
              path="/dashboard/*"
              element={
                user ? <DashboardApp user={user} /> : <Navigate to="/" />
              }
            />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}
