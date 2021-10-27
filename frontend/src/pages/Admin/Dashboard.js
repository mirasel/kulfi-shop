import React from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddCategory from "./AddCategory";
import AddKulfi from "./AddKulfi";
import AllKulfi from "./AllKulfi";
import "./Dashboard.scss";
import UpdateKulfi from "./UpdateKulfi";

function Dashboard({ user, ...props }) {
  console.log("from dashborad");
  let { path } = useRouteMatch();
  return (
    <main className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Route exact path={path}>
          <Redirect to="/dashboard/kulfis" />
        </Route>
        <Route exact path="/dashboard/kulfis">
          <AllKulfi />
        </Route>
        <Route exact path="/dashboard/addkulfi">
          <AddKulfi />
        </Route>
        <Route exact path="/dashboard/editkulfi/:kulfiId">
          <UpdateKulfi />
        </Route>
        <Route exact path="/dashboard/categories">
          <div>all categories......</div>
        </Route>
        <Route exact path="/dashboard/addcategory">
          <AddCategory />
        </Route>
        <Route exact path="/dashboard/orders">
          <div>orders.....</div>
        </Route>
      </div>
    </main>
  );
}

export default Dashboard;
