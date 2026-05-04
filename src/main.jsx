import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AnimeProvider } from "./context/AnimeContext";
import "./tailwind/output.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AnimeProvider>
        <App />
      </AnimeProvider>
    </HashRouter>
  </StrictMode>
);
