import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import "./Sidebar.scss";

function Sidebar() {
  let { url } = useRouteMatch();
  return (
    <React.Fragment>
      <nav className="sidebar-menu">
        <ul className="sidebar-menu-items">
          <li className="sidebar-text">
            <NavLink activeClassName="sideActive" to={`${url}/kulfis`}>
              <span>All Kulfis</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink activeClassName="sideActive" to={`${url}/addkulfi`}>
              <span>Add Kulfi</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink activeClassName="sideActive" to={`${url}/categories`}>
              <span>All categories</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink activeClassName="sideActive" to={`${url}/addcategory`}>
              <span>Add category</span>
            </NavLink>
          </li>
          {/* <li className="sidebar-text">
            <NavLink activeClassName="sideActive" to={`${url}/orders`}>
              <span>All Orders</span>
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Sidebar;
