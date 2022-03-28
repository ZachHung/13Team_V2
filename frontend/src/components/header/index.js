import React, { useState } from "react";
import logo from "../../logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { Link } from "react-router-dom";

const Header = ({ color }) => {
  const [menuState, setMenuState] = useState(false);
  const handleMenuBtn = () => {
    setMenuState(!menuState);
  };
  return (
    <>
      <header>
        <div className="header-container">
          <Link to="/" className="logo">
            <img src={logo} />
          </Link>
          <button
            aria-expanded={menuState}
            className={`toggle-menu${menuState ? " opened" : ""}`}
            onClick={handleMenuBtn}
            aria-label="Main Menu"
          >
            <svg width="47" height="47" className="" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
          <div className={`links${menuState ? " active" : ""}`}>
            <Link to="/phone" id="phone">
              Điện Thoại
            </Link>
            <Link to="/laptop" id="laptop">
              Laptop
            </Link>
            <Link to="/tablet" id="tablet">
              Tablet
            </Link>
            <Link to="/accessory" id="accessory">
              Phụ Kiện
            </Link>
          </div>

          <div className={`utility${menuState ? " active" : ""}`}>
            <div className="searchbox icon">
              {menuState ? (
                <>
                  <input
                    id="searchBox"
                    className="input"
                    type="text"
                    name="search"
                    placeholder="Tìm kiếm"
                  />
                  <button className="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </>
              ) : (
                <>
                  <button className="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <input
                    id="searchBox"
                    className="input"
                    type="text"
                    name="search"
                    placeholder="Tìm kiếm"
                  />
                </>
              )}
            </div>
            <Link to="/cart" className="icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <Link to="/login" className="icon">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </header>
      <div className="header-spacer" style={{ backgroundColor: color }}></div>
    </>
  );
};

export default Header;
