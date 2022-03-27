import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./TextInPut.scss";
const TextInPut = ({ icon, type, placeholder, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handdleShowPassword = () => {
    setShowPassword((value) => !value);
  };
  const [valueError, setValueError] = useState("");
  const handleTextChange = (e, name) => {
    if (name === "email") handleEmailTextChange(e.target.value);
    else if (name === "password" || name === "verifyPassword")
      handlePasswordTextChange(e.target.value);
    else if (name === "name") handleNameTextChange(e.target.value);
    else if (name === "phone") handlePhoneTextChange(e.target.value);
  };
  const handleEmailTextChange = (value) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
    } else if (!regex.test(value)) {
      setValueError("Trường Này Phải Là Email");
    } else {
      setValueError("");
    }
  };
  const handlePasswordTextChange = (value) => {
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
    } else if (value.length < 6) {
      setValueError("Mật Khẩu Có Ít Nhất 6 Kí Tự");
    } else {
      setValueError("");
    }
  };
  const handleNameTextChange = (value) => {
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
    }
  };
  const handlePhoneTextChange = (value) => {
    const regex = /^0\d{9}$/;
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
    } else if (!regex.test(value)) {
      setValueError("Số Điện Thoại Không Đúng");
    } else {
      setValueError("");
    }
  };

  return (
    <div>
      <div className="Textinput row">
        <FontAwesomeIcon icon={icon} className="icon col-1" />
        {type === "password" ? (
          <>
            <input
              className="col-8"
              type={showPassword ? "test" : "password"}
              placeholder="Nhập Mật Khẩu"
              onChange={(e) => handleTextChange(e, name)}
              name={name}
            ></input>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="icon col-1 icon_eye"
              onClick={handdleShowPassword}
            />
          </>
        ) : (
          <input
            className="col-9"
            type={type}
            placeholder={placeholder}
            onChange={(e) => handleTextChange(e, name)}
            name={name}
          ></input>
        )}
      </div>
      <p className="Error">{valueError}</p>
    </div>
  );
};

export default TextInPut;
