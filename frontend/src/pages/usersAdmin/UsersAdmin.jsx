import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './UsersAdmin.scss';
import {useEffect, useState} from 'react';
import { format } from 'date-fns';


const api = axios.create ({
  baseURL: 'http://localhost:5000/api',
});

function UsersAdmin () {
  var index = 1;
  const [userList, setUserList] = useState ([]);
  useEffect (() => {
    api.get ('/admin/customers').then (res => {
      console.log (res.data);
      setUserList (res.data.user);
    });
  }, []);
  const onDelete = (id) => {
    var confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete){
      axios.delete(`http://localhost:5000/api/admin/customers/delete/${id}`).then((res) =>{
        console.log (res.data);
        setUserList (res.data.user);  
      });
      window.location.reload(false); 
    }
    else {}
  }
  const onEdit = (id) => {
    
  }
  return (
    <div className="listUsersAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mr-3 RightMargin">Quản lý người dùng</h1>
          <a href="/admin/customers/create/">
            <button className="btnAddNewUser btn btn-success">
              Thêm mới người dùng
            </button>
          </a>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Vai trò</th>
              <th scope="col">Thời gian cập nhật</th>
              <th scope="col">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {userList.map (user => (
              <tr key={user._id}>
                <th scope="row">{index++}</th>
                <td>
                  <a href={`/admin/customers/detail/id=${user._id}`} className="linkToUser">{user.name}</a>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.birthday}</td>               
                <td>{user.address.addressdetail}</td>
                <td>{user.isAdmin === true ? "Admin" : "User"}</td>
                <td>{format(new Date(user.updatedAt), 'yyyy-MM-dd kk:mm:ss')}</td>

                <td>
                  {/* <a className='formMethod' href='/admin/customers/edit/'> */}
                      <button className=" formMethod btnDeletePurchase btn btn-outline-primary" onClick={()=>onEdit(user._id)}>
                        Sửa <FontAwesomeIcon icon={faFileEdit} />
                      </button>
                  {/* </a> */}
                  &nbsp;
                  {/* <a className='formMethod' href>                   */}
                      <button className=" formMethod btnDeletePurchase btn btn-outline-danger" onClick={()=> onDelete(user._id)}>                       
                        Xóa <FontAwesomeIcon icon={faTrashAlt}/>
                      </button>                   
                  {/* </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="pagination">
          <span id="page1">1</span>
          <span id="page2">2</span>
          <span id="page3">3</span>
          <span id="page4">4</span>

          <span className="icon">...</span>
          <span className="last" id="pageLast">
            Last
          </span>
        </ul>
      </div>
    </div>
  );
}

export default UsersAdmin;
