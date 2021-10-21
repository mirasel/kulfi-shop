import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import { useAuthContext } from "./contextApi/authContext";
import "./App.scss";
import Verified from "./pages/Auth/Verified";
import Verify from "./pages/Auth/Verify";
import EmailForm from "./pages/Auth/password/EmailForm";
import ResetForm from "./pages/Auth/password/ResetForm";
import { ToastContainer } from "react-toastify";
import Denied from "./pages/Auth/Denied";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/NotFound";
import Order from "./pages/User/Order";

function App() {
  const auth = useAuthContext();

  console.log("from app");
  console.log(
    "il-",
    auth.isLoggedIn,
    "\nid-",
    auth.user.id,
    "\nname-",
    auth.user.name,
    "\nia-",
    auth.user.isAdmin,
    "\niv-",
    auth.user.isVerified
  );
  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/password/reset/:token">
            {auth.isLoggedIn ? <Redirect to="/" /> : <ResetForm />}
          </Route>

          <Route exact path="/verified/:userId">
            {auth.isLoggedIn ? <Verified /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/password/reset">
            {!auth.isLoggedIn ? <EmailForm /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/email/verify">
            {!auth.isLoggedIn ? (
              <Redirect to="/login" />
            ) : auth.user.isVerified ? (
              <Redirect to="/" />
            ) : (
              <Verify />
            )}
          </Route>

          <Route exact path="/denied">
            {!auth.isLoggedIn ? (
              <Redirect to="/login" />
            ) : auth.user.isAdmin ? (
              <Redirect to="/" />
            ) : (
              <Denied />
            )}
          </Route>

          <Route exact path="/order">
            {!auth.isLoggedIn ? (
              <Redirect to="/login" />
            ) : auth.user.isAdmin ? (
              <Redirect to="/" />
            ) : !auth.user.isVerified ? (
              <Redirect to="/email/verify" />
            ) : (
              <Order />
            )}
          </Route>

          <Route path="/dashboard">
            {auth.isLoggedIn ? (
              auth.user.isAdmin ? (
                auth.user.isVerified ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/email/verify" />
                )
              ) : (
                <Redirect to="/denied" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/login">
            {auth.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>

          <Route exact path="/signup">
            {auth.isLoggedIn ? <Redirect to="/" /> : <Register />}
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </React.Fragment>
  );
}

export default App;
