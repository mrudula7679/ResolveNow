import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Mount the React app to the root div in index.html
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
