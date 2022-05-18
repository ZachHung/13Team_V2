import React, { useEffect, useRef, useState } from "react";
import { publicRequest, userRequest } from "../../utils/CallApi";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userRedux";
import "./UserInfo.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [gender, setGender] = useState();
  const [ward, setWard] = useState([]);
  const [detail, setDetail] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const user = useSelector((state) => state.user.current);

  const showError = (e, Error) => {
    e.target.parentElement.parentElement.getElementsByClassName(
      "error-message"
    )[0].innerText = Error;
  };
  const showErrorAddress = (e, Error) => {
    e.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
      "error-message"
    )[0].innerText = Error;
  };
  const provinceEle = useRef();
  const districtEle = useRef();
  const wardEle = useRef();
  const detailEle = useRef();
  const disPatch = useDispatch();
  const handleName = (e) => {
    setName(e.target.value);
    showError(e, "");
  };
  const handleErrorName = (e) => {
    if (name === "") {
      showError(e, "Trường Này Không Được Trống");
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    showError(e, "");
  };
  const handleErrorEmail = (e) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "") {
      showError(e, "Trường Này Không Được Trống");
    } else if (!regex.test(email)) {
      showError(e, "Trường Này Phải Là Email");
    }
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    showError(e, "");
  };
  const handleErrorPhone = (e) => {
    const regex = /^0\d{9}$/;
    if (phone === "") {
      showError(e, "Trường Này Không Được Trống");
    } else if (!regex.test(phone)) {
      showError(e, "Số Điện Thoại Không Đúng");
    }
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handleProvince = () => {
    publicRequest
      .get(`address/district?province=${provinceEle.current.value}`)
      .then((res) => {
        setDistrict(res.data);
        districtEle.current.value = "";
        wardEle.current.value = "";
        detailEle.current.disabled = true;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDistrict = () => {
    publicRequest
      .get(
        `address/district/ward?province=${provinceEle.current.value}&district=${districtEle.current.value}`
      )
      .then((res) => {
        setWard(res.data);
        detailEle.current.disabled = true;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleWard = () => {
    detailEle.current.disabled = false;
  };
  const checkError = () => {
    let check = true;
    const error = document.querySelectorAll(".error-message");
    error.forEach((item, index) => {
      if (item.innerText !== "") check = false;
    });
    return check;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (provinceEle.current.value !== "" && districtEle.current.value === "") ||
      (provinceEle.current.value !== "" && wardEle.current.value === "")
    ) {
      toast.warn("Vui Lòng Nhập Thông Tin Địa Chỉ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (checkError()) {
      userRequest()
        .post(`user/update/${user._id}`, {
          username: name,
          phone: phone,
          gender: gender,
          birthday: birthday,
          email: email,
          province: provinceEle.current.value,
          district: districtEle.current.value,
          ward: wardEle.current.value,
          addressDetail: detail,
        })
        .then((res) => {
          console.log("Đã gửi");
          disPatch(
            loginSuccess({ ...res.data, accessToken: user.accessToken })
          );
          toast.success("Cập Nhật Thành Công", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error("Vui Lòng Điền Đầy Đủ Thông Tin", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDetail = (e) => {
    setDetail(e.target.value);
    showErrorAddress(e, "");
  };
  const handleErrorDetail = (e) => {
    if (detail === "") {
      showErrorAddress(e, "Trường Này Không Được Trống");
    }
  };
  useEffect(() => {
    userRequest()
      .get(`user/info/${user._id}`)
      .then((res) => {
        setProvince(res.data.province);
        setDistrict(res.data.district);
        setWard(res.data.ward);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setBirthday(res.data.user.birthday);
        setGender(res.data.user.gender);
        setCurrentUser(res.data.user);
        setDetail(user.address.addressdetail);
        setLoading(false);

        if (user.address.province !== "") {
          provinceEle.current.value = user.address.province;

          districtEle.current.value = user.address.district;

          wardEle.current.value = user.address.ward;
        } else {
          detailEle.current.disabled = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <>
      <Header></Header>
      {loading ? (
        <></>
      ) : (
        <div className="info__container">
          <div className="info">
            <form>
              <h2 className="info__title">Thông Tin Người Dùng</h2>
              <div className="form-group">
                <div className="form-row">
                  <input
                    type="text"
                    id="userinfo-name"
                    name="username"
                    value={name}
                    placeholder="Tên người dùng"
                    onChange={handleName}
                    onBlur={handleErrorName}
                  />
                  <label htmlFor="userinfo-name">Họ Và Tên </label>
                </div>
                <p className="error-message"></p>
              </div>

              <div className="form-group">
                <div className="form-row">
                  <input
                    type="text"
                    name="email"
                    id="userinfo-email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmail}
                    onBlur={handleErrorEmail}
                  />

                  <label htmlFor="userinfo-email">Email </label>
                </div>
                <p className="error-message"></p>
              </div>

              <div className="form-group">
                <div className="form-row">
                  <input
                    type="text"
                    name="phone"
                    id="userinfo-phone"
                    value={phone}
                    placeholder="Số Điện Thoại"
                    onChange={handlePhone}
                    onBlur={handleErrorPhone}
                  />
                  <label htmlFor="userinfo-phone">Số Điện Thoại</label>
                </div>
                <p className="error-message"></p>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div id="userinfo-gender" data="{{user.gender}}">
                    <div className="gender__option">
                      <input
                        type="radio"
                        id="gender-male"
                        name="gender"
                        defaultValue="Nam"
                        defaultChecked={gender === "Nam" ? true : false}
                        onClick={(e) => handleGender(e)}
                      />
                      <label htmlFor="gender-male">Nam</label>
                    </div>

                    <div className="gender__option">
                      <input
                        type="radio"
                        id="gender-female"
                        name="gender"
                        defaultValue="Nữ"
                        defaultChecked={gender === "Nữ" ? true : false}
                        onClick={(e) => handleGender(e)}
                      />
                      <label htmlFor="gender-female">Nữ</label>
                    </div>

                    <div className="gender__option">
                      <input
                        type="radio"
                        id="gender-LGBT"
                        name="gender"
                        defaultValue="Khác"
                        defaultChecked={gender === "Khác" ? true : false}
                        onClick={(e) => handleGender(e)}
                      />
                      <label htmlFor="gender-LGBT">Khác</label>
                    </div>
                  </div>

                  <label htmlFor="userinfo-gender">Giới Tính</label>
                </div>
                <p className="error-message"></p>
              </div>
              <div className="form-group">
                <div className="form-row row-birthday">
                  <input
                    type="date"
                    id="user-birthday"
                    name="birthday"
                    value={birthday}
                    min="1997-01-01"
                    max="2030-12-31"
                    onChange={handleBirthday}
                  />
                  <label htmlFor="user-birthday">Ngày Sinh</label>
                </div>
                <p className="error-message"></p>
              </div>
              <div className="form-group">
                <div className="form-row row-address">
                  <div id="userinfo-address">
                    <div className="address-overall ">
                      <select
                        id="address__province"
                        name="address__province"
                        defaultValue={""}
                        data={currentUser.address.province}
                        ref={provinceEle}
                        onChange={handleProvince}
                      >
                        <option disabled value="">
                          Tỉnh / Thành Phố
                        </option>
                        {province.map((item, index) => {
                          return (
                            <option value={item.name} key={item._id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>

                      <select
                        id="address__district"
                        name="address__district"
                        data={user.address.district}
                        defaultValue={""}
                        onChange={handleDistrict}
                        ref={districtEle}
                      >
                        <option disabled value="" id="district__default">
                          Quận / Huyện
                        </option>
                        {district.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        id="address__ward"
                        name="address__ward"
                        data={user.address.ward}
                        defaultValue={""}
                        onChange={handleWard}
                        ref={wardEle}
                      >
                        <option disabled value="" id="ward__default">
                          Phường / Xã
                        </option>
                        {ward.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <input
                        id="address__detail"
                        name="address__detail"
                        type="text"
                        placeholder="Địa chỉ cụ thể ví dụ: 31 QL 13"
                        value={detail}
                        onChange={handleDetail}
                        onBlur={handleErrorDetail}
                        ref={detailEle}
                      />
                    </div>
                  </div>

                  <label htmlFor="userinfo-address">Địa chỉ</label>
                </div>
                <p className="error-message"></p>
              </div>
              <input type="submit" value="Cập Nhật" onClick={handleSubmit} />
            </form>
          </div>
        </div>
      )}

      <Footer></Footer>
    </>
  );
};
export default UserInfo;
