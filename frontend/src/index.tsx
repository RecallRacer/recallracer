import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// The "root" element is correctly typed as an HTML element (HTMLElement | null)
const rootElement = document.getElementById("root");

// Ensure TypeScript knows the rootElement is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  console.error("Failed to find the root element. Application cannot render.");
}