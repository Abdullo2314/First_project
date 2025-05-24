// src/main-admin.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AdminPanel from "./components/AdminPanel";

ReactDOM.createRoot(document.getElementById("admin-root")).render(
    <React.StrictMode>
    <AdminPanel />
  </React.StrictMode>
);