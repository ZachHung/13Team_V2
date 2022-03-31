import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUser,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
const VerifyPasswordInput = ({
  placeholder,
  icon,
  type,
  name,
  valuePassword,
  checkValid,
  getInput,
}) => {
  const [valueError, setValueError] = useState("");
  const [valueText, setValueText] = useState("");
  const [valuePass, setValuePass] = useState();

  const handleTextChange = (e, name) => {
    setValueText(e.target.name);
    getInput(e.target.name, e.target.value);
    handleVerifyPasswordTextChange(e.target.value);
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

  return (
    <div>
      <div className="Textinput row">
        <FontAwesomeIcon icon={icon} className="icon col-1" />

        <input
          value={valueText}
          className="col-9"
          type={type}
          placeholder={placeholder}
          onChange={(e) => handleTextChange(e, name)}
          name={name}
        ></input>
      </div>
      <p className="Error">{valueError}</p>
    </div>
  );
};

export default VerifyPasswordInput;
