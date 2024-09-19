import React from "react";
import ReactDOM from "react-dom/client";
import { BrowerRouter, BrowserRouter } from "react-router-dom";
import App from "./components/App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
