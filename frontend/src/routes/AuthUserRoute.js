import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const AuthUserRoute = () => {
  const user = useSelector((state) => state.user.current);
  return user ? <Navigate to="/"></Navigate> : <Outlet></Outlet>;
};

export default AuthUserRoute;
