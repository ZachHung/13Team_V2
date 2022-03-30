import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute({ child }) {
  const auth = useSelector((state) => state.user.current);
  console.log(auth);
  return auth ? <Navigate to="/login"></Navigate> : child;
}
