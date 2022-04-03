import HomePage from "./pages/home";
import PhonePage from "./pages/PhonePages/PhonePage";
import NotFound from "./pages/NotFound";

import "./App.scss";
import LoginPage from "./pages/login/Login";
import Register from "./pages/register/Register";
import Recovery from "./pages/recovery/Recovery";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

import PrivateRoute from "./routes/PrivateRoute";
import AuthUserRoute from "./routes/AuthUserRoute";
import Admin from "./pages/Admin";
import CartPage from "./pages/Cart";
import ScrollButton from "./components/scrollBtn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blank from "./pages/Blank";

//import scss va boxicon cho dashboard
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'

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
        <Route path="cart" element={<CartPage></CartPage>} />
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

      <Route path="/admin/*" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Blank />} />
        <Route path="products" element={<Blank />} />
        <Route path="customers" element={<Blank />} />
        <Route path="settings" element={<Blank />} />
        <Route path="stats" element={<Blank />} />
      </Route>  
      {/* end adminRoute */}
    </Routes>
  );
}

export default App;
