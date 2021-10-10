import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
