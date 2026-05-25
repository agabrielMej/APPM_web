import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";

import {
  StorageProvider,
} from "./context/StorageProvider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <StorageProvider>
      <App />
    </StorageProvider>
  </React.StrictMode>
);