import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Global } from "./Context/context.jsx";
import { GlobalB } from "./Context/search.jsx";
import { GlobalCart } from "./Context/Cart.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Global>
    <GlobalB>
      <GlobalCart>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalCart>
    </GlobalB>
  </Global>
);
