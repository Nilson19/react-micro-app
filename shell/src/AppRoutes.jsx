import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "shell/store";
import AuthApp from "auth/AuthApp";
import DashboardApp from "dashboard/DashboardApp";

const Loading = () => <div>Cargando...</div>;

export default function AppRoutes() {
  const { user } = useAuthContext();

  console.log("AppRoutes user:", user);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={user?.token ? "/dashboard" : "/auth"}
              replace
            />
          }
        />

        <Route path="/auth/*" element={
          user?.token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthApp />
          )
        } />

        <Route
          path="/dashboard/*"
          element={
            user?.token ? (
              <DashboardApp />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </Suspense>
  );
}
