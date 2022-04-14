import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./style.scss";
import logo from "../../logo.svg";

const Footer = ({ color }) => {
  return (
    <>
      <div className="footer-spacer" style={{ backgroundColor: color }}></div>
      <footer>
        <div className="contact">
          <div className="logo">
            <img src={logo} alt="" />
          </div>

          <div className="social">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/Tnhut813"
              className="icon"
            >
              <FontAwesomeIcon icon={faFacebookSquare} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/CaptainSeapunk"
              className="icon"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/_makimasimp_/"
              className="icon"
            >
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
            &copy; 2022. Trường Đại Học Công Nghệ Thông Tin
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
