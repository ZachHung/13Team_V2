import React from "react";
import "./Register.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInPut from "../../components/TextInPut/TextInPut";
import VerifyPasswordInput from "../../components/VerifyPasswordInput/VerifyPasswordInput";
import {
  faPhone,
  faUser,
  faKey,
  faMailBulk,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [formCode, setFormCode] = useState({});
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidVeifyPassword, setIsValidVerifyPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);

  console.log({
    isValidName,
    isValidPhone,
    isValidEmail,
    isValidPassword,
    isValidVeifyPassword,
  });
  const [sendCode, setSendCode] = useState(false);
  const handleInput = (name, value) => {
    setErrorText("");
    setFormData({ ...formData, [name]: `${value}` });
  };
  const handleInputCode = (name, value) => {
    setFormCode({ ...formCode, [name]: `${value}` });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !(
        isValidName &&
        isValidPhone &&
        isValidEmail &&
        isValidPassword &&
        isValidVeifyPassword
      )
    ) {
      setErrorText("Thông Tin Không Chính Xác Vui Lòng Kiểm Tra Lại");
    } else {
      setSendCode(true);
    }
  };
  return (
    <div className="container_register">
      <div className="register row container-md">
        <div className="title col-xl-6 col-12">
          <p>Hi! My New Friend</p>
        </div>
        <div className="form_container col-xl-6 col-12">
          <div className="form_wrapper">
            <form className={sendCode ? "hide" : "form"}>
              <p className="form_title">Sign Up</p>
              <p className="form_error">{errorText}</p>

              <TextInPut
                icon={faUser}
                type="text"
                placeholder="Họ Và Tên"
                name="name"
                getInput={handleInput}
                checkValid={(value) => setIsValidName(value)}
              ></TextInPut>

              <TextInPut
                icon={faPhone}
                type="phone"
                placeholder="Số Điện Thoại"
                getInput={handleInput}
                name="phone"
                checkValid={(value) => setIsValidPhone(value)}
              ></TextInPut>

              <TextInPut
                icon={faMailBulk}
                type="email"
                placeholder="Nhập Email"
                name="email"
                getInput={handleInput}
                checkValid={(value) => setIsValidEmail(value)}
              ></TextInPut>

              <TextInPut
                icon={faKey}
                type="password"
                placeholder="Nhập Mật Khẩu"
                name="password"
                getInput={handleInput}
                checkValid={(value) => setIsValidPassword(value)}
                valuePassword={formData.verifyPassword}
              ></TextInPut>

              <TextInPut
                icon={faKey}
                type="password"
                placeholder="Xác Nhận Mật Khẩu"
                name="verifyPassword"
                getInput={handleInput}
                checkValid={(value) => setIsValidVerifyPassword(value)}
                valuePassword={formData.password}
              ></TextInPut>

              <input type="submit" onClick={(e) => handleSubmit(e)}></input>
            </form>
            <form className={sendCode ? "form" : "hide"}>
              <p className="form_title">Sign Up</p>
              <p className="form_error"></p>

              <TextInPut
                icon={faCode}
                type="text"
                placeholder="Nhập Mã Xác Nhận"
                name="code"
                getInput={handleInputCode}
                checkValid={(value) => setIsValidCode(value)}
              ></TextInPut>

              <input type="submit" onClick={(e) => handleSubmit(e)}></input>
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
