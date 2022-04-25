import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const VerifyPasswordInput = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [verifyPassword, setShowPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [openVerifyPassword, setOpenVerifyPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorVerify, setErrorVerify] = useState("");
  const handleShowPassword = () => {
    setOpenPassword((value) => !value);
  };
  const handdleShowVerifyPassword = () => {
    setOpenVerifyPassword((value) => !value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleVerifyChange = (e) => {
    setShowPassword(e.target.value);
  };
  const handleBlurPass = () => {
    if (passwordValue === "null") {
      setErrorPassword("Vui Lòng Nhập Trường Này");
    } else if (passwordValue.length <= 6) {
      setErrorPassword("Trường Này Ít Nhất 6 Kí Tự");
    } else if (verifyPassword !== "null" && passwordValue !== verifyPassword) {
      setErrorPassword("Mật Khẩu Không Khớp");
    }
  };
  return (
    <>
      <div>
        <div className="Textinput row">
          <FontAwesomeIcon icon={faKey} className="icon col-1" />
          <input
            value={passwordValue}
            className="col-8"
            type={openPassword ? "test" : "password"}
            placeholder="Nhập Mật Khẩu"
            onChange={(e) => handlePasswordChange(e)}
            name="password"
            onBlur={handleBlurPass}
          ></input>
          <FontAwesomeIcon
            icon={openPassword ? faEye : faEyeSlash}
            className="icon col-1 icon_eye"
            onClick={handleShowPassword}
          />
        </div>
        <p className="Error">{errorPassword}</p>
      </div>
      <div>
        <div className="Textinput row">
          <FontAwesomeIcon icon={faKey} className="icon col-1" />

          <input
            value={verifyPassword}
            className="col-8"
            type={openVerifyPassword ? "test" : "password"}
            placeholder="Xác Nhận Mật Khẩu"
            onChange={(e) => handleVerifyChange(e)}
            name="verifypassword"
          ></input>
          <FontAwesomeIcon
            icon={openVerifyPassword ? faEye : faEyeSlash}
            className="icon col-1 icon_eye"
            onClick={handdleShowVerifyPassword}
          />
        </div>
        <p className="Error">{errorVerify}</p>
      </div>
    </>
  );
};

export default VerifyPasswordInput;
