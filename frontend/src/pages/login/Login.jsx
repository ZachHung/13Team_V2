import React from "react";
import TextInPut from "../../components/TextInPut/TextInPut";
import { publicRequest } from "../../utils/CallApi";
import { Link } from "react-router-dom";
import { faKey, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import "./login.scss";
import { loginStart, loginSuccess } from "../../redux/userRedux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (name, value) => {
    setErrorText("");
    setFormData({ ...formData, [name]: `${value}` });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(isValidEmail && isValidPassword)) {
      setErrorText("Thông Tin Không Chính Xác Vui Lòng Kiểm Tra Lại");
    } else {
      dispatch(loginStart());
      publicRequest
        .post("account/login", formData)
        .then((res) => {
          if (res.status === 202) {
            setErrorText(res.data.message);
            console.log(res.data.message);
          } else {
            console.log(res.data);
            dispatch(loginSuccess(res.data));
            navigate("/");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
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
              <p className="form_error">{errorText}</p>
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

              <input type="submit" onClick={handleSubmit}></input>
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