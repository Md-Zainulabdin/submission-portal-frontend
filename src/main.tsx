import React from "react";
import ReactDOM from "react-dom/client";

// Redux Config
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";

// Routes Config
import { RouterProvider } from "react-router-dom";
import router from "@/routes/router.tsx";

// Auth Context
import { AuthProvider } from "@/context/AuthContext.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
