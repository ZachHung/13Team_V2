import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute() {
  const user = useSelector((state) => state.user);
  const auth = user.current;
  return auth ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
}
