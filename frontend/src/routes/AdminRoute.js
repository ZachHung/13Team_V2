import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return isAdmin ? <Outlet></Outlet> : <Navigate to="/"></Navigate>;
};
export default AdminRoute;
