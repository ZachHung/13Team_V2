import LoginPage from "./pages/login/login";
import Footer from "./components/footer";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
