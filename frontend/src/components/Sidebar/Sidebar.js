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
            <NavLink to={`${url}/kulfis`}>
              <span>All Kulfis</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink to={`${url}/addkulfi`}>
              <span>Add Kulfi</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink to={`${url}/categories`}>
              <span>All categories</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink to={`${url}/addcategory`}>
              <span>Add category</span>
            </NavLink>
          </li>
          <li className="sidebar-text">
            <NavLink to={`${url}/orders`}>
              <span>All Orders</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Sidebar;
