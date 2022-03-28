import React from "react";
import TextInPut from "../../components/TextInPut/TextInPut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Recovery.scss";
import { useState } from "react";
export default function Recovery() {
  const [showPassword, setShowPassword] = useState(false);
  const handdleShowPassword = () => {
    setShowPassword((value) => !value);
  };
  return (
    <div className="container_recovery">
      <div className="recovery row container-md">
        <div className="title col-xl-6 col-12">
          <p>Don't Worry! This Is Just a Small Problem! </p>
        </div>
        <div className="form_container col-xl-6 col-12">
          <div className="form_wrapper">
            <form>
              <p className="form_title">Recovery</p>

              <TextInPut
                icon={faMailBulk}
                type="email"
                placeholder="Nhập Email Đã Đăng Kí"
                name="email"
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
}
