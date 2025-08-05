import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormProvider } from "./context/FormContext";
import "./index.css";
import { HashRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <FormProvider>
        <App />
      </FormProvider>
    </HashRouter>
  </React.StrictMode>
);