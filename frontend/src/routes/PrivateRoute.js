import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login/Login";
export default function PrivateRoute() {
  const state = JSON.parse(localStorage.getItem("persist:root"));
  const auth = state.current;
  return auth !== "null" ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
