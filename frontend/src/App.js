import LoginPage from "./pages/login/login";
import Footer from "./components/footer";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import PhonePage from "./pages/PhonePages/PhonePage";
// import Header from './components/header';
// import Footer from './components/footer';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route />
        <Route />
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
