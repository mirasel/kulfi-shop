import { Switch, Route, NavLink } from "react-router-dom";
import "./App.scss";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <NavLink to="/login">Login</NavLink>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
