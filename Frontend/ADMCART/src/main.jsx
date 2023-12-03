import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Global } from "./Context/context.jsx";
import { GlobalB } from "./Context/search.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Global>
    <GlobalB>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalB>
  </Global>
);
