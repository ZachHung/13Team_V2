import React from "react";
import TextInPut from "../../components/TextInPut/TextInPut";
import { publicRequest, userRequest } from "../../utils/CallApi";
import { Link } from "react-router-dom";
import { faKey, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { loginStart, loginSuccess } from "../../redux/userRedux";
import { setQuantity } from "../../redux/cart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
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
            dispatch(loginSuccess(res.data));
            setTimeout(() => {
              userRequest()
                .get(`cart/${res.data._id}`)
                .then((res) => {
                  dispatch(setQuantity(res.data.list));
                });
              navigate("/");
            }, 500);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  const googleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/login/success", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          setTimeout(() => {
            userRequest()
              .get(`cart/${res.data._id}`)
              .then((resNew) => {
                dispatch(setQuantity(resNew.data.list));
              });
            navigate("/");
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header color="#CAE5E8" />
      <div className="container_login">
        <div className="login row container-md">
          <div className="title col-xl-6 col-12">
            <p>Chào Mừng Trở Lại!</p>
          </div>

          <div className="form_container col-xl-6 col-12">
            <div className="form_wrapper">
              <form>
                <p className="form_title">Đăng Nhập</p>
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

                <input
                  type="submit"
                  onClick={handleSubmit}
                  value="Đăng Nhập"
                ></input>
                <Link
                  to="/recovery"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p className="login_recovery">Bạn Quên Mật Khẩu?</p>
                </Link>
              </form>
              <div className="login__line">
                <span>HOẶC</span>
              </div>
              <div className="login__icon ">
                <div className="login__icon--row">
                  <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                  <span style={{ padding: "0 0" }}>Đăng Nhập với Facebook</span>
                </div>
              </div>
              <div className="login__icon" onClick={googleLogin}>
                <div className="login__icon--row">
                  <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                  <span>Đăng Nhập với Google</span>
                </div>
              </div>
              <div className="login_footer">
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p>Bạn Muốn Tạo Tài Khoản Mới? </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer color="#CAE5E8" />
    </>
  );
}
