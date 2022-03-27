import './App.scss';
import Login from './pages/login/login';
import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <div className="App">
        <h1>markintosh</h1>
        <nav className="navBar">
          <Link to="/phone">Điện THoại |</Link>
          <Link to="/laptop"> Laptop |</Link>
          <Link to="/login"> Đăng nhập |</Link>
        </nav>
        {/* <Login></Login> */}
      </div>
    </>
  );
}

export default App;
