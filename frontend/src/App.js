import logo from "./logo.svg";
import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Recovery from "./pages/recovery/Recovery";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/recovery" element={<Recovery></Recovery>}></Route>
      </Routes>
    </>
  );
}

export default App;
