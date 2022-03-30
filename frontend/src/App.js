import HomePage from "./pages/home";
import PhonePage from "./pages/PhonePages/PhonePage";
import NotFound from "./pages/NotFound";

import "./App.scss";
import LoginPage from "./pages/login/Login";
import Register from "./pages/register/Register";
import Recovery from "./pages/recovery/Recovery";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AuthUserRoute from "./routes/AuthUserRoute";
import Admin from "./pages/Admin";
import ScrollButton from "./components/scrollBtn";
function App() {
  console.log(useSelector((state) => state.user.isAdmin));
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<AuthUserRoute></AuthUserRoute>}>
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="register" element={<Register></Register>}></Route>
          <Route path="recovery" element={<Recovery></Recovery>}></Route>
          <Route path="admin" element={<Admin></Admin>}></Route>
        </Route>
        <Route path="/phone" element={<PhonePage />} />
      </Routes>
      <ScrollButton />
    </>
  );
}

export default App;
