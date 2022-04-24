import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFileEdit, faTrashAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './UsersAdmin.scss';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";
import Dialog, { DialogOK } from '../../components/deleteConfirm/Dialog';
import { Link } from "react-router-dom";

function UsersAdmin() {
  var index = 1;
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    userRequest().get('admin/customers').then(res => {
      setUserList(res.data.user);
    });
  }, []);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameUser: ""
  });
  const [dialogs, setDialogs] = useState({
    message: "",
    isLoading: false,
    //Update
    nameUser: ""
  });
  const [dialogOK, setDialogOK] = useState({
    message: "",
    isLoading: false,
  });
  const idUserRef = useRef();
  const handleDialog = (message, isLoading, nameUser) => {
    setDialog({
      message,
      isLoading,
      //Update
      nameUser
    });
  };
  const handleDialogs = (message, isLoading, nameUser) => {
    setDialogs({
      message,
      isLoading,
      //Update
      nameUser
    });
  };
  const handleDialogOK = (message, isLoading) => {
    setDialogOK({
      message,
      isLoading,
    });
  };
  const handleDelete = (id, user) => {
    //Update
    const index = userList.findIndex((p) => p._id === id);
    handleDialog(`Bạn có chắc chắn muốn xóa ${user.isAdmin? "quản trị viên": "khách hàng"} ${user.name} này không?`, true, `Xóa: ${user.isAdmin? "Quản trị viên ": "Khách hàng "}` + userList[index].name);
    idUserRef.current = id;
  };

  const handleDeleteMany = () => {
    handleDialogs("Bạn có chắc chắn muốn xóa hết người dùng đã chọn?", true);
  };

  const handleButtonOK=(choose)=>{
    if (choose){
      handleDialogOK("", false);
    }
  }

  const areUSureDelete = (choose) => {
    if (choose) {
      setUserList(userList.filter((p) => p._id !== idUserRef.current));
      axios
        .delete(hostServer + `/api/admin/customers/delete/${idUserRef.current}`)
        .then(res => {
          setUserList(res.data.user);
        });
      handleDialog("", false);
      window.location.reload (false);
    } else {
      handleDialog("", false);
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
  const handleDeleteManyUsers = (choose) => {
    if (choose){
      if (selectedUsers.length !== 0){
        const ids = [];
        selectedUsers.forEach(element => {
          ids.push(element._id);
        });
        axios
          .delete(hostServer + "/api/admin/customers/deleteMany", {data: ids})
          .then(res => {  
            setUserList(res.data.user);
          })
        handleDialogs("", false);
        window.location.reload (false);
      }
      else {
        handleDialogs("", false);
        handleDialogOK("Bạn chưa chọn người dùng nào để xóa", true);
      }
    }
    else{
      handleDialogs("", false);
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
          <h1 className="mr-3 fw-bold UserTitle"><FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon> Quản lý người dùng</h1>
          <Link to={`/admin/customers/create/`}>
            <button className="btnAddNewUser btn btn-success">
            <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> Thêm người dùng mới
            </button>
          </Link>
          <button className="btnDeleteAllUsers btn btn-danger" onClick={()=>handleDeleteMany()}>
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Xóa tất cả người dùng
          </button>
          &nbsp;
          <h2 className="fw-bold totalCountPur">(<FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon> Tất cả: {userList.length} người dùng)</h2>
        </div>
        <table className="table tableOfUser table-striped table-hover border-primary table-bordered">
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
                  <Link
                    to={`/admin/customers/detail/id=${user._id}`}
                    className="linkToUser"
                  >
                    {user.name}
                  </Link>
                </td>
                <td style={{ "width": "1%" }}>{user.email}</td>
                <td style={{ "width": "5%" }}>{user.phone}</td>
                <td style={{ "width": "5%" }}>{user.gender}</td>
                <td style={{ "width": "8%" }}>{user.birthday}</td>
                <td style={{ "width": "11%" }}>{user.address.addressdetail === "" ? "" : `${user.address.addressdetail},`} {user.address.ward === "" ? "" : `${user.address.ward},`} {user.address.district === "" ? "" : `${user.address.district},`} {user.address.province === "" ? "" : `${user.address.province}`}</td>
                <td style={{ "width": "8%" }}>
                  {user.isAdmin === true ? 'Quản trị viên' : 'Khách hàng'}
                </td>
                <td style={{ "width": "8%" }}>
                  {format(new Date(user.updatedAt), 'yyyy-MM-dd kk:mm:ss')}
                </td>

                <td style={{ "width": "12%" }}>
                  <Link className='formMethod' to={`/admin/customers/update/${user._id}`}>
                    <button className="formMethod btnEditUser btn btn-outline-primary">
                      Sửa <FontAwesomeIcon icon={faFileEdit} />
                    </button>
                  </Link>
                  &nbsp;
                  <button
                    className=" formMethod btnEditUser btn btn-outline-danger"
                    // onClick={() => onDelete(user._id, user)}
                    onClick={() => handleDelete(user._id, user)}
                  >
                    {' '}
                    Xóa <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
            {dialog.isLoading && (
              <Dialog
                //Update
                nameUser={dialog.nameUser}
                onDialog={areUSureDelete}
                message={dialog.message}
                />
            )}
            {dialogs.isLoading && (
              <Dialog
                //Update
                nameUser={dialogs.nameUser}
                onDialog={handleDeleteManyUsers}
                message={dialogs.message}
                />
            )}
            {dialogOK.isLoading && (
              <DialogOK
                onDialog={handleButtonOK}
                message={dialogOK.message}
                />
            )}
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
