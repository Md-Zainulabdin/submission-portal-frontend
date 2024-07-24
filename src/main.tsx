import React from "react";
import ReactDOM from "react-dom/client";

// Routes Config
import { RouterProvider } from "react-router-dom";
import router from "@/routes/router.tsx";

// Auth Context
import { AuthProvider } from "@/context/AuthContext.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
