import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFileEdit, faTrashAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './UsersAdmin.scss';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

function UsersAdmin() {
  var index = 1;
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    api.get('admin/customers').then(res => {
      setUserList(res.data.user);
    });
  }, []);

  const onDelete = (id, user) => {
    var confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa ${user.isAdmin? "quản trị viên": "khách hàng"} ${user.name} này không?`
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/admin/customers/delete/${id}`)
        .then(res => {
          setUserList(res.data.user);
        });
      window.location.reload(false);
    } else {
    }
  };
  const handleCheckbox = (e, data)=>{
    const {name, checked} = e.target;
    if (checked) {
      if (name === 'allSelect'){
        setSelectedUsers(userList);
      }
      else {
        setSelectedUsers([...selectedUsers, data]);
      }
    }
    else {
      if (name === 'allSelect'){
        setSelectedUsers([]);
      }
      else {
        let tempSeletedUsers = selectedUsers.filter((u) => u._id !== data._id);
        setSelectedUsers(tempSeletedUsers);
      }
    }
  }
  const deleteManyUsers = (selectedUsers) => {
    const ids = [];
    selectedUsers.forEach(element => {
      ids.push(element._id);
    });
    if (ids.length === 0) {
      window.confirm("Bạn chưa chọn người dùng nào!");
    }
    else {
      var doDelete = window.confirm("Bạn có thực sự muốn xóa các người dùng đã chọn?");
      if (doDelete){
        axios
          .delete("http://localhost:5000/api/admin/customers/deleteMany", {data: ids})
          .then(res => {  
            setUserList(res.data.user);
          })
          .catch((error) => console.error({error: error.message}));
        window.location.reload (false);
      }
      else {}
    } 
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(7);
  const firstPageIndex = (currentPage - 1) * usersPerPage;
  const lastPageIndex = firstPageIndex + usersPerPage;
  const dataEachPage = userList.slice(firstPageIndex, lastPageIndex);

  if (userList.length === 0) return (<p>Không có người dùng nào</p>)
  return (
    <div className="listUsersAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4 qlsp">
          <h1 className="mr-3 fw-bold"><FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon> Quản lý người dùng</h1>
          <a href="/admin/customers/create/">
            <button className="btnAddNewUser btn btn-success">
            <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> Thêm người dùng mới
            </button>
          </a>
          <button className="btnDeleteAllUsers btn btn-danger" onClick={()=>deleteManyUsers(selectedUsers)}>
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Xóa tất cả người dùng
          </button>
        </div>
        <table className="table table-striped table-hover border-primary table-bordered">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" className='form-check-input' name="allSelect" checked={selectedUsers?.length === userList.length} onChange={(e)=>handleCheckbox(e, userList)}></input>
              </th>
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
            {dataEachPage.map(user => (
              <tr key={user._id}>
                <td style={{ "width": "3%" }}>
                  <input type="checkbox" className='form-check-input' name={user._id} checked={selectedUsers.some((u) => u._id === user._id)} onChange={(e)=>handleCheckbox(e, user)}></input>
                </td>
                <th scope="row" style={{ "width": "4%" }}>{index++}</th>
                <td style={{ "width": "5%" }}>
                  <a
                    href={`/admin/customers/detail/id=${user._id}`}
                    className="linkToUser"
                  >
                    {user.name}
                  </a>
                </td>
                <td style={{ "width": "1%" }}>{user.email}</td>
                <td style={{ "width": "5%" }}>{user.phone}</td>
                <td style={{ "width": "5%" }}>{user.gender}</td>
                <td style={{ "width": "8%" }}>{user.birthday}</td>
                <td style={{ "width": "11%" }}>{`${user.address.addressdetail} ${user.address.ward} - ${user.address.district} - ${user.address.province}`}</td>
                <td style={{ "width": "8%" }}>
                  {user.isAdmin === true ? 'Quản trị viên' : 'Khách hàng'}
                </td>
                <td style={{ "width": "8%" }}>
                  {format(new Date(user.updatedAt), 'yyyy-MM-dd kk:mm:ss')}
                </td>

                <td style={{ "width": "12%" }}>
                  <a className='formMethod' href={`/admin/customers/update/${user._id}`}>
                    <button className=" formMethod btnEditUser btn btn-outline-primary">
                      Sửa <FontAwesomeIcon icon={faFileEdit} />
                    </button>
                  </a>
                  &nbsp;
                  <button
                    className=" formMethod btnEditUser btn btn-outline-danger"
                    onClick={() => onDelete(user._id, user)}
                  >
                    {' '}
                    Xóa <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
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
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

export default UsersAdmin;
