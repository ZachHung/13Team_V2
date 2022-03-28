import HomePage from "./pages/home";
import PhonePage from "./pages/PhonePages/PhonePage";
import NotFound from "./pages/NotFound";

import "./App.scss";
import LoginPage from "./pages/login/Login";
import Register from "./pages/register/Register";
import Recovery from "./pages/recovery/Recovery";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/recovery" element={<Recovery></Recovery>}></Route>
      </Routes>
    </>
  );
}

export default App;
