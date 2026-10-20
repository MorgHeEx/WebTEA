import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyDisplaySettings, loadDisplaySettings } from "./lib/displaySettingsStorage";
import "./index.css";

applyDisplaySettings(loadDisplaySettings());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
