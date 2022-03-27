import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./style.scss";
import logo from "../../logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="contact">
        <div className="logo">
          <img src={logo} />
        </div>

        <div className="social">
          <a href="https://www.facebook.com/Tnhut813" className="icon">
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a href="https://twitter.com/CaptainSeapunk" className="icon">
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>
          <a href="https://www.instagram.com/_makimasimp_/" className="icon">
            <FontAwesomeIcon icon={faInstagramSquare} />
          </a>
        </div>
      </div>

      <div className="copyright">
        <img
          src="https://khmt.uit.edu.vn/wecode/it001.2020/images/logo_uit.png"
          alt="Logo UIT"
        />
        <div className="copyright-text">
          &copy; 2022. Sản phẩm của Trường Đại Học Công Nghệ Thông Tin
        </div>
      </div>
    </footer>
  );
};

export default Footer;
