import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import AuthProvider from "./contexts/AuthContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
