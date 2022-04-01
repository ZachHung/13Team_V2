import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
export default function PrivateRoute() {
  const user = useSelector((state) => state.user);
  const auth = user.current;
  return auth !== "null" ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
