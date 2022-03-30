import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Admin from "../pages/Admin";
// import LoginPage from "./pages/login/Login";
const AdminRoute = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return isAdmin ? (
    <React.Fragment>
      <Route path="admin" element={<Admin></Admin>}></Route>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
export default AdminRoute;
