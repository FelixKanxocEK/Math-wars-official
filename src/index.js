import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </BrowserRouter>
);
