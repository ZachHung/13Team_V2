import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./TextInPut.scss";
const TextInPut = ({
  icon,
  type,
  placeholder,
  name,
  getInput,
  checkValid,
  valuePassword,
}) => {
  const [valueText, setValueText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handdleShowPassword = () => {
    setShowPassword((value) => !value);
  };
  const [valueError, setValueError] = useState("");
  const handleTextChange = (e, name) => {
    getInput(e.target.name, e.target.value);
    setValueText(e.target.value);
    if (name === "email") handleEmailTextChange(e.target.value);
    else if (name === "name" || name === "code")
      handleNameTextChange(e.target.value);
    else if (name === "phone") handlePhoneTextChange(e.target.value);
    else if (name === "verifyPassword")
      handleVerifyPasswordTextChange(e.target.value);
    else if (name === "password") handlePasswordTextChange(e.target.value);
  };

  const handleEmailTextChange = (value) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value === "") {
      checkValid(false);
      setValueError("Trường Này Không Được Trống");
    } else if (!regex.test(value)) {
      checkValid(false);
      setValueError("Trường Này Phải Là Email");
    } else {
      setValueError("");
      checkValid(true);
    }
  };
  const handlePasswordTextChange = (value) => {
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
      checkValid(false);
    } else if (value.length < 6) {
      setValueError("Mật Khẩu Có Ít Nhất 6 Kí Tự");
      checkValid(false);
    } else {
      setValueError("");
      checkValid(true);
    }
  };
  const handleVerifyPasswordTextChange = (value) => {
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
      checkValid(false);
    } else if (value.length < 6) {
      setValueError("Mật Khẩu Có Ít Nhất 6 Kí Tự");
      checkValid(false);
    } else if (
      typeof valuePassword === "undefined" ||
      valuePassword !== value
    ) {
      checkValid(false);
      setValueError("Không Khớp Với Mật Khẩu");
    } else {
      setValueError("");
      checkValid(true);
    }
  };
  const handleNameTextChange = (value) => {
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
      checkValid(false);
    } else {
      setValueError("");
      checkValid(true);
    }
  };
  const handlePhoneTextChange = (value) => {
    const regex = /^0\d{9}$/;
    if (value === "") {
      setValueError("Trường Này Không Được Trống");
      checkValid(false);
    } else if (!regex.test(value)) {
      checkValid(false);
      setValueError("Số Điện Thoại Không Đúng");
    } else {
      setValueError("");
      checkValid(true);
    }
  };

  return (
    <div>
      <div className="Textinput row">
        <FontAwesomeIcon icon={icon} className="icon col-1" />
        {type === "password" ? (
          <>
            <input
              value={valueText}
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
            value={valueText}
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
