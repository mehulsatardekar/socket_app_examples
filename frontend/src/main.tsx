import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Counter from "./components/Counter/Counter.tsx";
import Messages from "./components/Messages/Messages.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/counter-app" element={<Counter />} />
        <Route path="/message-app" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
