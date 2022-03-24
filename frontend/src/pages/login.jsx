import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/pages/login.scss";
import { useState } from "react";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handdleShowPassword = () => {
    setShowPassword((value) => !value);
  };
  return (
    <div className="container_login">
      <div className="login row container-md">
        <div className="title col-xl-6 col-12">
          <p>Welcome Back!</p>
        </div>
        <div className="form_container col-xl-6 col-12">
          <div className="form_wrapper">
            <form>
              <p className="form_title">Login</p>
              <div className="Textinput row">
                <FontAwesomeIcon icon={faUser} className="icon col-1" />
                <input
                  className="col-9"
                  type="text"
                  placeholder="Nhập Email"
                ></input>
              </div>
              <div className="Textinput row">
                <FontAwesomeIcon icon={faKey} className="icon col-1" />
                <input
                  className="col-8"
                  type={showPassword ? "test" : "password"}
                  placeholder="Nhập Mật Khẩu"
                ></input>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="icon col-1 icon_eye"
                  onClick={handdleShowPassword}
                />
              </div>
              <input type="submit"></input>
              <p>Forgot your password?</p>
            </form>
            <div className="login_footer">
              <p>Want to create a new account Sign Up here? </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
