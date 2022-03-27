import React from "react";
import "./Register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInPut from "../../components/TextInPut/TextInPut";
import {
  faPhone,
  faUser,
  faKey,
  faMailBulk,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handdleShowPassword = () => {
    setShowPassword((value) => !value);
  };
  return (
    <div className="container_register">
      <div className="register row container-md">
        <div className="title col-xl-6 col-12">
          <p>Hi! My New Friend</p>
        </div>
        <div className="form_container col-xl-6 col-12">
          <div className="form_wrapper">
            <form>
              <p className="form_title">Sign Up</p>

              <TextInPut
                icon={faUser}
                type="text"
                placeholder="Họ Và Tên"
                name="name"
              ></TextInPut>

              <TextInPut
                icon={faPhone}
                type="phone"
                placeholder="Số Điện Thoại"
                name="phone"
              ></TextInPut>

              <TextInPut
                icon={faMailBulk}
                type="email"
                placeholder="Nhập Email"
                name="email"
              ></TextInPut>

              <TextInPut
                icon={faKey}
                type="password"
                placeholder="Nhập Mật Khẩu"
                name="password"
              ></TextInPut>

              <TextInPut
                icon={faKey}
                type="password"
                placeholder="Xác Nhận Mật Khẩu"
                name="verifyPassword"
              ></TextInPut>
              <input type="submit"></input>
            </form>
            <div className="login_footer">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                <p>Turn Back Login Here </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
