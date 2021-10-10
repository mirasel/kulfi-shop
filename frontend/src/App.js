import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import AuthContext from "./contextApi/authContext";
import "./App.scss";
import Verified from "./pages/auth/Verified";
import Verify from "./pages/auth/Verify";

function App() {
  const auth = useContext(AuthContext);
  // console.log("access token - ", auth.accessToken);
  // console.log("user id - ", auth.user.id);
  // console.log("Admin - ", auth.user.isAdmin);
  // console.log("Verified - ", auth.user.isVerified);
  return (
    <React.Fragment>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/verified/:userId">
            <Verified />
          </Route>
          <Route exact path="/email/verify">
            {!auth.isLoggedIn && <Redirect to="/login" />}
            {auth.isLoggedIn && !auth.user.isVerified && <Verify />}
            {auth.isLoggedIn && auth.user.isVerified && <Redirect to="/" />}
          </Route>
          <Route exact path="/order">
            {!auth.isLoggedIn && <Redirect to="/login" />}
            {auth.isLoggedIn && !auth.user.isVerified && (
              <Redirect exact to="/email/verify" />
            )}
            {auth.isLoggedIn && auth.user.isVerified && (
              <div>This is order page</div>
            )}
          </Route>
          <Route exact path="/login">
            {!auth.isLoggedIn && <Login />}
            {auth.isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
