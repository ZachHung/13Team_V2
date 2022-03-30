import HomePage from "./pages/home";
import PhonePage from "./pages/PhonePages/PhonePage";
import NotFound from "./pages/NotFound";

import "./App.scss";
import LoginPage from "./pages/login/Login";
import Register from "./pages/register/Register";
import Recovery from "./pages/recovery/Recovery";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AuthUserRoute from "./routes/AuthUserRoute";
import Admin from "./pages/Admin";
import ScrollButton from "./components/scrollBtn";
function App() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <Routes>
      {/* start publicRoute */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/phone" element={<PhonePage />} />
      {/* end publicRoute */}

      {/* start private Route */}
      <Route path="/*" element={<PrivateRoute></PrivateRoute>}>
        <Route path="cart" element={<LoginPage></LoginPage>} />
      </Route>
      {/* end private Route */}

      {/* start authRoute */}
      <Route path="/*" element={<AuthUserRoute></AuthUserRoute>}>
        <Route path="login" element={<LoginPage></LoginPage>} />
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="recovery" element={<Recovery></Recovery>}></Route>
      </Route>
      {/* end authRoute */}

      {/* start adminRoute */}
      {isAdmin ? (
        <Route path="/admin" element={<Admin></Admin>}></Route>
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {/* end adminRoute */}
    </Routes>
  );
}

export default App;
