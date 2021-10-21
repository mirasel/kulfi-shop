import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import Dropdown from "./Dropdown";
import { useAuthContext } from "../../contextApi/authContext";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const auth = useAuthContext();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          KULFIZZ!!
        </NavLink>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                exact
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && auth.user.isAdmin && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                exact
                to="/dashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && !auth.user.isAdmin && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                exact
                to="/order"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Order
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="nav-links" onClick={closeMobileMenu}>
                {auth.user.name} <i className="fas fa-caret-down" />
              </div>
              {dropdown && <Dropdown />}
            </li>
          )}
          {!auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                exact
                to="/login"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                exact
                to="/signup"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
