import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DashboardApp from "./App";
import { ContextProvider } from "shell/store";

// Create a root for React 18
const root = createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <DashboardApp />
    </BrowserRouter>
  </ContextProvider>
);