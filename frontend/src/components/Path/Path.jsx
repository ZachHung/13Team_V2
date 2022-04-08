import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faHome } from "@fortawesome/free-solid-svg-icons";
import "./Path.scss";
const Path = ({ path }) => {
  return (
    <div className="path__container">
      <div className="path">
        <div className="path__item">
          <FontAwesomeIcon
            icon={faHome}
            className="path__icon"
          ></FontAwesomeIcon>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span>Trang Chủ</span>
          </Link>
        </div>
        {path.map((item, index) => (
          <div className="path__item" key={index}>
            <FontAwesomeIcon
              icon={faGreaterThan}
              className="path__icon"
            ></FontAwesomeIcon>
            <Link
              to={item.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span>{item.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Path;
