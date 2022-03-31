import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
export default function PrivateRoute() {
  const auth = useSelector((state) => state.user.current);

  return auth ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
}
