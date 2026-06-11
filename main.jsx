import React from "react";
import ReactDOM from "react-dom/client";
import SantéExpress from "./pharmaci.jsx"; // ← ton fichier principal

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SantéExpress />
  </React.StrictMode>
);
