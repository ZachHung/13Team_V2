import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './AdminProfile.scss';
import { useSelector } from 'react-redux';
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function AdminProfile () {
  const [admin, setAdmin] = useState ([]);
  const [getCurPwd, setGetCurPwd] = useState ([]);
  const [toggleState, setToggleState] = useState (1);
  const user = useSelector((state) => state.user);  
  const [district, setdistrict] = useState([]);
  const [province, setaddress] = useState([]);
  const [ward, setward] = useState([]);
  
  useEffect(() => {
    userRequest().get (`admin/settings/${user.current._id}`).then ((res) => {
      console.log(res.data);
      setAdmin (res.data.user);
      setGetCurPwd(res.data.currentPwd);
    });
  }, []);

  const toggleTab = index => {
    setToggleState (index);
  };

  useEffect (() => {
    userRequest().get ('address/getalladress/').then (res => {
      setaddress (res.data.address);
    });
  }, []);

  const Getdistrictbyprovince = () => {
    var province = document.getElementById("province").value;
    document.getElementById("district").value = "";
    document.getElementById("ward").value = "";
    console.log(province);
    axios.get(hostServer + '/api/address/district/' + province).then((res) => {
        setdistrict(res.data.address);
    });
}

const Getwardbydistrict = () => {
    var province = document.getElementById("province").value;
    var district = document.getElementById("district").value;
    document.getElementById("ward").value = "";
    axios.get(hostServer + '/api/address/ward/' + province + '/' + district).then((res) => {
        setward(res.data.address);
    });
}

const [curPwd, setCurPwd] = useState("");
const [showCurPassword, setShowCurPassword] = useState(false);
const handleShowCurPassword = () => {setShowCurPassword((value) => !value);};

const [newPwd, setNewPwd] = useState("");
const [showNewPassword, setShowNewPassword] = useState(false);
const handleShowNewPassword = () => {setShowNewPassword((value) => !value);};

const [RePwd, setRePwd] = useState("");
const [showRePassword, setShowRePassword] = useState(false);
const handleShowRePassword = () => {setShowRePassword((value) => !value);};

const handleCurPassChange = (e) =>{
  console.log(e.target.value);
  if (e.target.value !== "" && e.target.value !== getCurPwd) document.getElementById('CurPassAlert').innerText = "Mật khẩu hiện tại không đúng, vui lòng nhập lại";
  else document.getElementById('CurPassAlert').innerText = "";
  setCurPwd(e.target.value);
}
const handleNewPassChange = (e) =>{
  console.log(e.target.value);
  if (e.target.value.length < 6 && e.target.value.length > 0) {
    document.getElementById('NewPassAlert').innerText = "Mật khẩu cần ít nhất 6 ký tự";
  } else document.getElementById('NewPassAlert').innerText = "";
  setNewPwd(e.target.value);
}
const handleRePassChange = (e) =>{
  console.log(e.target.value);
  if (e.target.value.length > 0) {
    if (e.target.value.length < 6) {
      document.getElementById('RePassAlert').innerText = "Mật khẩu cần ít nhất 6 ký tự";
      if (e.target.value !== "" && e.target.value !== newPwd) document.getElementById('RePassAlert').innerText += "\nMật khẩu nhập vào không trùng khớp";
    }
    else if (e.target.value.length >= 6) {
      document.getElementById('RePassAlert').innerText = ""
      if (e.target.value !== "" && e.target.value !== newPwd) document.getElementById('RePassAlert').innerText += "Mật khẩu nhập vào không trùng khớp";
    }
  }
  else if (e.target.value.length === 0) document.getElementById('RePassAlert').innerText = "";
  setRePwd(e.target.value);
}

const checkValid = (e) =>{
  e.preventDefault()
  if (curPwd === "" && newPwd === "" && RePwd === "") document.getElementById('btnSubmitAdProfile').disabled = false;
  else document.getElementById('btnSubmitAdProfile').disabled = true;
}


  return (

    <div className="d-flex flex-column font-weight-bold" >
      <div className="container light-style flex-grow-1 container-p-y mb-5">
      <form method="POST" action={hostServer + "/api/admin/settings/update/" + admin._id + "?_method=PUT"}>
          <div className="card overflow-hidden border-0">
            <div className="bg-profile">
              <h1 className="py-3">
                7TEAM
              </h1>
            </div>
            <div className="row no-gutters row-bordered row-border-light">
              <div
                className="list-group list-group-flush account-settings-links col-md-3 pt-0"
                id="account-tab"
              >
                <div
                  className={`btn list-group-item list-group-item-action ${toggleState === 1 ? 'active' : ''}`}
                  id="general"
                  onClick={() => toggleTab (1)}
                >
                  <i className="fas fa-user fa-lg icontabpanel" />
                  <span className="catdatchung">Cài đặt chung</span>
                </div>
                <div
                  className={`btn list-group-item list-group-item-action ${toggleState === 2 ? 'active' : ''}`}
                  id="password"
                  onClick={() => toggleTab (2)}
                >
                  <i className="fas fa-lock fa-lg icontabpanel" />
                  <span className="catdatchung">Đổi mật khẩu</span>
                </div>
                <div
                  className={`btn list-group-item list-group-item-action ${toggleState === 3 ? 'active' : ''}`}
                  id="info"
                  onClick={() => toggleTab (3)}
                >
                  <i className="fas fa-info-circle fa-lg icontabpanel" />
                  <span className="catdatchung">Thông tin chi tiết</span>
                </div>
              </div>

              <div className="tab-content col-md-8" id="account-tabContent">
                <div
                  className={`tab-pane fade show ${toggleState === 1 ? 'active' : ''}`}
                  id="account-general"
                  role="tabpanel"
                >
                  <div className="card-body align-items-center adminBackground">
                    {/* <img
                      src="https://res.cloudinary.com/cake-shop/image/upload/v1647313324/fhrml4yumdl42kk88jll.jpg?fbclid=IwAR1RAMOwX07c3l5KiHc22jGz89cISo9DG0gDFfXcXLIWzQVvDy5LntEN2YQ"
                      alt="avatar"
                      className="d-block ui-w-80 imgAdmin"
                    /> */}
                    <h4 className="mt-4 p-0 textLarger hightlightInfo">
                      QUẢN TRỊ VIÊN
                    </h4>
                  </div>
                  <hr className="m-0" />
                  <div className="card-body">
                    <div className="form-group mb-3">
                      <label htmlFor="emails" className="form-label labelTitle">
                        E-mail
                      </label>
                      <input disabled
                        id="emails"
                        name="email"
                        type="email"
                        className="form-control inputAdProfile"
                        defaultValue={admin.email}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor='names' className="form-label labelTitle">
                        Họ tên
                      </label>
                      <input
                        id='names'
                        name="name"
                        type="text"
                        className="form-control inputAdProfile"
                        defaultValue={admin.name}
                      />
                    </div>
                    
                  </div>

                </div>
                <div
                  className={`tab-pane fade show ${toggleState === 2 ? 'active' : ''}`}
                  id="account-change-password"
                  role="tabpanel"
                >
                  <div className="card-body pb-2">
                  
                    <h4 className="p-0 mt-4 textLarger hightlightInfo">
                        ĐỔI MẬT KHẨU
                    </h4>
                    <hr className="mb-4" />
                    <div className="form-group mb-3">
                      <label
                        htmlFor="currentPasswords"
                        className="form-label labelTitle"
                      >
                        Mật khẩu hiện tại
                      </label>
                      <div>
                        <input
                          name="currentPassword"                        
                          id="currentPasswords" 
                          className="form-control inputAdProfile inputAdPass col-9"
                          defaultValue={''}    
                          type={showCurPassword ? "string" : "password"}
                          value={curPwd}
                          onChange={(e) => handleCurPassChange(e)} 
                                          
                        />
                        <FontAwesomeIcon
                            icon={showCurPassword ? faEye : faEyeSlash}
                            className="icon col-1 icon_eyeAdmin"
                            onClick={handleShowCurPassword}
                        />
                      </div>
                      <div id='CurPassAlert'></div>
                    </div>

                    <div className="form-group mb-3">
                      <label
                        htmlFor="newPasswords"
                        className="form-label labelTitle"
                      >
                        Mật khẩu mới
                      </label>
                      <div>
                        <input
                          name="newPassword"
                          id="newPasswords"
                          className="form-control inputAdProfile inputAdPass"
                          defaultValue={''}           
                          type={showNewPassword ? "string" : "password"}
                          value={newPwd}
                          onChange={(e) => handleNewPassChange(e)}                                        
                        />
                        <FontAwesomeIcon
                            icon={showNewPassword ? faEye : faEyeSlash}
                            className="icon col-1 icon_eyeAdmin"
                            onClick={handleShowNewPassword}
                          />
                      </div>
                      <div id='NewPassAlert'></div>
                    </div>

                    <div className="form-group mb-3">
                      <label
                        htmlFor="newPasswordRepeats"
                        className="form-label labelTitle"
                      >
                        Nhập lại mật khẩu
                      </label>
                      <div>
                        <input
                          name="newPasswordRepeat"
                          id="newPasswordRepeats"
                          className="form-control inputAdProfile inputAdPass"
                          defaultValue={''}
                          type={showRePassword ? "string" : "password"}
                          value={RePwd}
                          onChange={(e) => handleRePassChange(e)}                                        
                        />
                        <FontAwesomeIcon
                            icon={showRePassword ? faEye : faEyeSlash}
                            className="icon col-1 icon_eyeAdmin"
                            onClick={handleShowRePassword}
                          />
                      </div>
                      <div id='RePassAlert'></div>
                    </div>

                  </div>
                </div>
                <div
                  className={`tab-pane fade show ${toggleState === 3 ? 'active' : ''}`}
                  id="account-info"
                  role="tabpanel"
                >
                  <div className="card-body pb-2 mt-4">
                    <div className="form-group mb-3">
                      <h3 className="textLarger hightlightInfo">
                        THÔNG TIN CÁ NHÂN
                      </h3>
                      <hr className="border-light mb-3" />
                    </div>
                    <div className="form-group mb-3">
                      <label
                        htmlFor="AdBirthday"
                        className="form-label labelTitle"
                      >
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name='birthday'
                        id="AdBirthday"
                        className="form-control inputAdProfile"
                        defaultValue={admin.birthday}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label
                        htmlFor="genders"
                        className="form-label labelTitle"
                      >
                        Giới tính
                      </label>
                      <select
                        id="genders"
                        name='gender'
                        className="form-control selectGender"
                      >
                        <option hidden defaultValue={admin.gender}>{admin.gender}</option>
                        <option id="Nam" value="Nam">Nam</option>
                        <option id="Nu" value="Nữ">Nữ</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label
                        htmlFor="addresses" 
                        className="form-label labelTitle"
                      >
                        Địa chỉ
                      </label>

                      <div className='lavel_2'>
                        <div className="mb-4">
                            <label className="form-label label_level_2">Thành phố/tỉnh</label>
                            <select className="form-select my-input-tag" id='province' name='province' onChange={Getdistrictbyprovince} aria-label=".form-select-sm example">
                                <option hidden selected>{admin.address?.province}</option>
                                {
                                    province?.map((province) => (
                                        <option key={province.name} value={province.name}>{province.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label label_level_2">Quận/huyện</label>
                            <select className="form-select my-input-tag" id='district' name='district' onChange={Getwardbydistrict} aria-label=".form-select-sm example">
                                <option id="slt-dis" hidden selected>{admin.address?.district}</option>
                                {
                                    district.districts?.map((district) => (
                                        <option key={district.name} value={district.name}>{district.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label label_level_2">Phường/xã</label>
                            <select className="form-select my-input-tag" id='ward' name='ward' aria-label=".form-select-sm example">
                                <option hidden selected>{admin.address?.ward}</option>
                                {
                                    ward.wards?.map((ward) => (
                                        <option key={ward.name} value={ward.name}>{ward.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label label_level_2">Địa chỉ cụ thể</label>
                            <input type="text" className="form-control my-input-tag" id='addressdetail' name='addressdetail' defaultValue={admin.address?.addressdetail} />
                        </div>
                    </div>
                    </div>
                  </div>
                  <div className="card-body pb-2 mt-3">
                    <h3 className="hightlightInfo">
                      THÔNG TIN LIÊN LẠC
                    </h3>
                    <hr className="border-light mb-3" />
                    <div className="form-group mb-3">
                      <label
                        htmlFor="phoneNumbers"
                        className="form-label labelTitle"
                      >
                        Điện thoại
                      </label>
                      <input
                        name="phoneNumber"
                        id="phoneNumbers"
                        type="text"
                        className="form-control inputAdProfile"
                        defaultValue={admin.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="btn my-btn-checkout" id="btnSubmitAdProfile" type='submit' onBlur={(e)=>checkValid(e)}>
                    Thay đổi
              </button>     
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
