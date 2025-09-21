import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import OutputPage from "./OutputPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContextProvider";

createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <BrowserRouter basename="/GrimTok">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
