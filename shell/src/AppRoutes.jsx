import React, { Suspense, use, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "shell/store";
import AuthApp from "auth/AuthApp";
import DashboardApp from "dashboard/DashboardApp";

export default function AppRoutes() {
  const { user } = useAuthContext();

  console.log("user:", user);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/auth/*"
        element={
          <Suspense>
            <AuthApp />
          </Suspense>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          user ? (
            <Suspense>
              <DashboardApp />
            </Suspense>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}
