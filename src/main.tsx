// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import OutputPage from "./OutputPage";
// import { OutputPage } from './Components/Output'
import { UserContextProvider } from "./Context/UserContextProvider";
const router = createBrowserRouter(
  createRoutesFromElements(
    <BrowserRouter basename="/GrimTok">
      <Route>
        <Route path="" element={<App />} />
        <Route path="/output" element={<OutputPage />} />
      </Route>
    </BrowserRouter>
  )
);

createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
