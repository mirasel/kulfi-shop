import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contextApi/authContext";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
