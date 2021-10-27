import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import DoubleRing from "./components/UI/Loading/DoubleRing";
import { AuthContextProvider } from "./contextApi/authContext";
import "./index.scss";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <Suspense fallback={<DoubleRing />}>
        <App />
      </Suspense>
    </AuthContextProvider>
  </Router>,
  document.getElementById("root")
);
