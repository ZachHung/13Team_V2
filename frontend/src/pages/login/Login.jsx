import React from "react";
import TextInPut from "../../components/TextInPut/TextInPut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCoffee,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import "./Login.scss";
import { useState } from "react";
export default function Login() {
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
              <TextInPut
                icon={faUser}
                type="email"
                placeholder="Email"
                name="email"
              ></TextInPut>
              <TextInPut
                icon={faKey}
                type="password"
                placeholder="Nhập Password"
                name="password"
              ></TextInPut>

              <input type="submit"></input>
              <Link
                to="/recovery"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="login_recovery">Forgot your password?</p>
              </Link>
            </form>
            <div className="login_footer">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>Want to create a new account Sign Up here? </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
