import React, { useEffect, useState, Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './AdminProfile.scss';
import Tabs from "../../components/tabs/Tabs";

const api = axios.create ({
  baseURL: 'http://localhost:5000/api/',
});

function AdminProfile () {
  const [admin, setAdmin] = useState ([]);
  //const [tab, setTab] = useState (0);
  useEffect (() => {
    api.get ('/admin/settings').then (res => {
      setAdmin (res.data);
      console.log (res.data.user);
    });
  }, []);
  // const openTab = (tabname, tabcontent) => {
  //   var i, j;
  //   var x = document.getElementsByClassName ('fade');
  //   var y = document.getElementsByClassName ('list-group-item');
  //   for (i = 0; i < x.length; i++) {
  //     x[i].style.display = 'none';
  //   }
  //   console.log (y);
  //   for (j = 0; j < y.length; j++) {
  //     y[j].classList.remove ('active');
  //   }
  //   document.getElementById (tabname).className += ' active';
  //   document.getElementById (tabcontent).style.display = 'block';
  //   if (tabname === 'general') {
  //     setTab(0);
  //     document.getElementById (tabname).className += ' active';
  //     document.getElementById (tabcontent).style.display = 'block';
  //   }
  //   else if (tabname === 'password') {
  //     setTab(1);
  //     document.getElementById (tabname).className += ' active';
  //     document.getElementById (tabcontent).style.display = 'block';
  //   }
  //   else if (tabname === 'info') {
  //     setTab(2);
  //     document.getElementById (tabname).className += ' active';
  //     document.getElementById (tabcontent).style.display = 'block';
  //   }
  // };

    return (
      <div className="d-flex flex-column">
          <div className="container light-style flex-grow-1 container-p-y mb-5">
          {/* <div className="alert alert-danger" role="alert">ERROR IF</div>
                <div className="alert alert-primary" role="alert">SUCCESS IF</div> */}
          <form method="POST" action="/admin/settings/edit">
            <div
              className="card border-0"
            >
              <div className="bg-profile">
                <h1 className="font-weight-bold py-3 text-center">
                  7TEAM
                </h1>
              </div>
              <div>
                <div>
                  <Tabs>
                    <div label="Cài đặt chung">                    
                      <div
                        className="tab-pane fade show"
                        style={{'display': 'block'}} >
                        <div className="card-body align-items-center">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt="avatar"
                            className="d-block ui-w-80"
                          />
                          <h4 className="p-0 mt-5 text-danger font-weight-bold">
                            QUẢN TRỊ VIÊN
                          </h4>
                        </div>
                        <hr className="m-0" />
                        <div className="card-body">
                          <div className="form-group mb-3">
                            <label for="names" className="form-label labelTitle">
                              Họ tên
                            </label>
                            <input
                              name="name"
                              type="text"
                              id = "names"
                              className="form-control inputAdProfile"
                              value=""
                              required
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label for="emails" className="form-label labelTitle">
                              E-mail
                            </label>
                            <input
                              id="emails"
                              name="email"
                              type="email"
                              className="form-control inputAdProfile"
                              // value=""
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div label="Đổi mật khẩu">
                        <div
                          className="tab-pane fade show"
                          style={{'display': 'block'}}>
                          <div className="card-body pb-2">
                            <div className="form-group mb-3">
                              <label for="currentPasswords" className="form-label labelTitle">
                                Mật khẩu hiện tại</label>
                              <input
                                name="currentPassword"
                                id="currentPasswords"
                                type="password"
                                className="form-control inputAdProfile"
                              />
                            </div>
      
                            <div className="form-group mb-3">
                              <label for="newPasswords" className="form-label labelTitle">
                              Mật khẩu mới
                              </label>
                              <input
                                name="newPassword"
                                id="newPasswords"
                                type="password"
                                className="form-control inputAdProfile"
                              />
                            </div>
      
                            <div className="form-group mb-3">
                              <label for="newPasswordRepeats" className="form-label labelTitle">
                              Nhập lại mật khẩu
                              </label>
                              <input
                                name="newPasswordRepeat"
                                id="newPasswordRepeats"
                                type="password"
                                className="form-control inputAdProfile"
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                    <div label="Thông tin chi tiết">
                      <div
                        className="tab-pane fade show"
                        style={{'display': 'block'}}>
                        <div className="card-body pb-2">
                          <div className="form-group mb-3">
                            <h3 className="mb-4 font-weight-bold hightlightInfo">Thông tin cá nhân</h3>
                            <label className="form-label labelTitle">Tiểu sử</label>
                            <textarea className="form-control inputAdProfile" rows="5">
                              
                            </textarea>
                          </div>
                          <div className="form-group mb-3">
                            <label for="AdBirthday" className="form-label labelTitle">
                              Ngày sinh
                            </label>
                            <input
                              type="date" id="AdBirthday"
                              className="form-control inputAdProfile"            
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label for="genders" className="form-label labelTitle">
                              Giới tính
                            </label>
                            <select id="genders" className="form-control selectGender">
                              <option id="Nam" value="Nam">Nam</option>
                              <option id="Nu" value="Nữ">Nữ</option>
                            </select>
                          </div>
                          <div className="form-group mb-3">
                            <label for="addresses" className="form-label labelTitle">
                              Địa chỉ
                            </label>
                            <input
                              name="address"
                              id="addresses"
                              type="text"
                              className="form-control inputAdProfile"
                              value=""
                              required
                            />
                          </div>
                        </div>
                        <hr className="border-light m-0" />
                        <div className="card-body pb-2">
                          <h3 className="mb-4 font-weight-bold hightlightInfo">Thông tin liên lạc</h3>
                          <div className="form-group mb-3">
                            <label for="phoneNumbers" className="form-label labelTitle">
                              Điện thoại
                            </label>
                            <input
                              name="phoneNumber"
                              id="phoneNumbers"
                              type="text"
                              className="form-control inputAdProfile"
                              value=""
                              required
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label className="form-label labelTitle">
                              Trang web
                            </label>
                            <input 
                              type="text" 
                              className="form-control inputAdProfile" 
                              />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                  {/* <div
                    className="btn list-group-item list-group-item-action active"
                    id="general"
                    // onClick={openTab ("general", "account-general")}
                  >
                    <i className="fas fa-user fa-lg" />
                    <span className='catdatchung'>Cài đặt chung</span>
                  </div>
                  <div
                    className="btn list-group-item list-group-item-action"
                    id="password"
                    // onClick={openTab ('password', 'account-change-password')}
                  >
                    <i className="fas fa-lock fa-lg" />
                    <span className='catdatchung'>Đổi mật khẩu</span>
                  </div>
                  <div
                    className="btn list-group-item list-group-item-action"
                    id="info"
                    // onClick={openTab ("info", "account-info")}
                  >
                    <i className="fas fa-info-circle fa-lg" />
                    <span className='catdatchung'>Thông tin chi tiết</span>
                  </div> */}
                </div>
                {/* <div className="tab-content col-md-9" id="account-tabContent">
                  <div
                    className="tab-pane fade active show"
                    id="account-general"
                    role="tabpanel"
                    style={{'display': 'none'}}
                  >
  
                    <div className="card-body media align-items-center">
                      <img
                        src=""
                        alt="avatar"
                        className="d-block ui-w-80"
                      />
                      <h4 className="p-0 m-3 text-danger font-weight-bold">
                        QUẢN TRỊ VIÊN
                      </h4>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          Tên tài khoản
                        </label>
                        <input
                          name="username"
                          type="text"
                          className="form-control mb-1"
                          value="221515133"
                          required
                        />
                      </div>
                      <div className="form-group">
                         <label className="form-label font-weight-bold">Name</label>
                         <input name="fullname" type="text" className="form-control"
                              value="" required/>
                      </div>
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          E-mail
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="form-control mb-1"
                          value="51542"
                          required
                        />
                      </div>
                    </div>
  
                  </div>
                  <div
                    className="tab-pane fade active show"
                    id="account-change-password"
                    role="tabpanel"
                    style={{'display': 'none'}}
                  >
                    <div className="card-body pb-2">
  
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          Mật khẩu hiện tại                        </label>
                        <input
                          name="currentPassword"
                          type="password"
                          className="form-control"
                        />
                      </div>
  
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                        Mật khẩu mới
                        </label>
                        <input
                          name="newPassword"
                          type="password"
                          className="form-control"
                        />
                      </div>
  
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                        Nhập lại mật khẩu
                        </label>
                        <input
                          name="newPasswordRepeat"
                          type="password"
                          className="form-control"
                        />
                      </div>
  
                    </div>
                  </div>
                  <div
                    className="tab-pane fade active show"
                    id="account-info"
                    role="tabpanel"
                    style={{'display': 'none'}}
                  >
                    <div className="card-body pb-2">
  
                      <div className="form-group">
                        <label className="form-label font-weight-bold">Tiểu sử</label>
                        <textarea className="form-control" rows="5">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.
                        </textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          Ngày sinh
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value="May 3, 1995"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          Địa chỉ
                        </label>
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          value="2131321321"
                          required
                        />
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
  
                      <h3 className="mb-4 font-weight-bold">Thông tin liên lạc</h3>
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          Điện thoại
                        </label>
                        <input
                          name="phoneNumber"
                          type="text"
                          className="form-control"
                          value="0215463"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label font-weight-bold">
                          Trang web
                        </label>
                        <input type="text" className="form-control" value="" />
                      </div>
  
                    </div>
  
                  </div>
                </div> */}
              </div>
              <div
                className="text-right mt-3"
                style={{'padding-left': '1%', 'padding-bottom': 'auto'}}
              >
                <button type="submit" className="btn my-btn-checkout">
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
