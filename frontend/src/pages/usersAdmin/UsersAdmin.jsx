import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './UsersAdmin.scss';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';

const api = axios.create ({
  baseURL: 'http://localhost:5000/api/',
});

function UsersAdmin () {
  var index = 1;
  const [userList, setUserList] = useState ([]);
  useEffect (() => {
    api.get ('admin/customers').then (res => {
      console.log (res.data);
      setUserList (res.data.user);
    });
  }, []);

  const onDelete = (id, name) => {
    var confirmDelete = window.confirm (
      `Bạn có chắc chắn muốn xóa người dùng ${name} này không?`
    );
    if (confirmDelete) {
      axios
        .delete (`http://localhost:5000/api/admin/customers/delete/${id}`)
        .then (res => {
          console.log (res.data);
          setUserList (res.data.user);
        });
      window.location.reload (false);
    } else {
    }
  };
  const onEdit = id => {};

  // Pagination
  const [currentPage, setCurrentPage] = useState (1);
  const [usersPerPage, setUsersPerPage] = useState (10);
  const firstPageIndex = (currentPage - 1) * usersPerPage;
  const lastPageIndex = firstPageIndex + usersPerPage;
  const dataEachPage = userList.slice (firstPageIndex, lastPageIndex);

  return (
    <div className="listUsersAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mr-3 fw-bold">Quản lý người dùng</h1>
          <a href="/admin/customers/create/">
            <button className="btnAddNewUser btn btn-success">
              Thêm mới người dùng
            </button>
          </a>
        </div>
        <table className="table table-striped table-hover border-primary table-bordered">
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
            {dataEachPage.map (user => (
              <tr key={user._id}>
                <th scope="row" style={{"width":"4%"}}>{index++}</th>
                <td style={{"width":"10%"}}>
                  <a
                    href={`/admin/customers/detail/id=${user._id}`}
                    className="linkToUser"
                  >
                    {user.name}
                  </a>
                </td>
                <td style={{"width":"5%"}}>{user.email}</td>
                <td style={{"width":"5%"}}>{user.phone}</td>
                <td style={{"width":"5%"}}>{user.gender}</td>
                <td style={{"width":"8%"}}>{user.birthday}</td>
                <td style={{"width":"11%"}}>{user.address.addressdetail}</td>
                <td style={{"width":"8%"}}>
                  {user.isAdmin === true ? 'Quản trị viên' : 'Khách hàng'}
                </td>
                <td style={{"width":"10%"}}>
                  {format (new Date (user.updatedAt), 'yyyy-MM-dd kk:mm:ss')}
                </td>

                <td style={{"width":"10%"}}>
                  {/* <a className='formMethod' href='/admin/customers/edit/'> */}
                  <button
                    className=" formMethod btnEditUser btn btn-outline-primary"
                    onClick={() => onEdit (user._id)}
                  >
                    Sửa <FontAwesomeIcon icon={faFileEdit} />
                  </button>
                  {/* </a> */}
                  &nbsp;
                  {/* <a className='formMethod' href>                   */}
                  <button
                    className=" formMethod btnEditUser btn btn-outline-danger"
                    onClick={() => onDelete (user._id, user.name)}
                  >
                    {' '}
                    Xóa <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  {/* </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationAdmin
          className={"pagination-bar"}
          currentPage={currentPage}
          totalCount={userList.length}
          itemsPerPage={usersPerPage}
          onPageChange={page => setCurrentPage (page)}
        />
    </div>
  );
}

export default UsersAdmin;
