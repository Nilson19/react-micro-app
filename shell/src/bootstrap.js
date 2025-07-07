import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from 'shell/store';
import AppRoutes from './AppRoutes';


// Create a root for React 18
const root = createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Router>
      <AppRoutes />
    </Router>
  </ContextProvider>
);

// Render the application