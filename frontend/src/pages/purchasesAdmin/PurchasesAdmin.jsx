import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './PurchasesAdmin.scss';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function PurchasesAdmin() {
  var index = 1;
  const [purchaseList, setPurchaseList] = useState([]);
  useEffect(() => {
    api.get('/admin/orders').then(res => {
      console.log(res.data);
      setPurchaseList(res.data.purchase);
    });
  }, []);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    api.get('/admin/customers').then(res => {
      console.log(res.data);
      setUserList(res.data.user);
    });
  }, []);

  const userIndicate = (userList, purchaseUserID) => {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i]._id === purchaseUserID) return userList[i].name;
    }
  }
  const onDelete = id => {
    var confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa đơn hàng ${id} này không?`
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/admin/orders/delete/${id}`)
        .then(res => {
          console.log(res.data);
          setPurchaseList(res.data.purchase);
        });
      window.location.reload(false);
    } else { }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage, setPurchasesPerPage] = useState(10);
  const firstPageIndex = (currentPage - 1) * purchasesPerPage;
  const lastPageIndex = firstPageIndex + purchasesPerPage;
  const dataEachPage = purchaseList.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="listPurchasesAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mr-3 fw-bold">Quản lý đơn hàng</h1>
          <a href="/admin/orders/create/">
            <button className="btnAddNewPurchase btn btn-success">
              Thêm mới đơn hàng
            </button>
          </a>
        </div>
        <table className="table table-striped table-hover border-primary table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ "width": "4%" }}>#</th>
              <th scope="col" style={{ "width": "10%" }}>ID</th>
              <th scope="col" style={{ "width": "15%" }}>Tên khách hàng</th>
              <th scope="col" style={{ "width": "10%" }}>Ngày đặt hàng</th>
              {/* <th scope="col">Tổng tiền</th> */}
              <th scope="col" style={{ "width": "10%" }}>Phương thức thanh toán</th>
              <th scope="col" style={{ "width": "10%" }}>Tình trạng thanh toán</th>
              <th scope="col" style={{ "width": "15%" }}>Tình trạng giao hàng</th>
              <th scope="col" style={{ "width": "10%" }}>Đã giao hàng lúc</th>
              <th scope="col" style={{ "width": "17%" }}>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {dataEachPage.map((purchase) => (

              <tr key={purchase._id}>
                <th scope="row">{index++}</th>
                <td>
                  <a
                    href={`/admin/orders/detail/${purchase._id}`}
                    className="linkToItem"
                  >
                    {purchase._id}
                  </a>
                </td>
                <td>{userIndicate(userList, purchase.userID)}</td>
                <td>
                  {format(
                    new Date(purchase.createdAt),
                    'yyyy-MM-dd kk:mm:ss'
                  )}
                </td>
                <td></td>
                <td></td>
                <td>{purchase.status}</td>
                <td>
                  {purchase.status !== "Đã giao hàng" ? "" : format(
                    new Date(purchase.updatedAt),
                    'yyyy-MM-dd kk:mm:ss'
                  )}
                </td>
                <td>
                  {/* <button
                      className=" formMethod btnDeletePurchase btn btn-outline-primary"
                      onClick={() => onEdit (purchase._id)}
                    >
                      Sửa <FontAwesomeIcon icon={faFileEdit} />
                    </button> */}
                  {/* &nbsp; */}
                  {/* <a className='formMethod' href>                   */}
                  <a className='formMethod' href={`/admin/orders/update/${purchase._id}`}>
                      <button className=" formMethod btnDeletePurchase btn btn-outline-primary" >
                        Cập nhật trạng thái <FontAwesomeIcon icon={faFileEdit} />
                      </button>
                  </a>
                  <button
                    className=" formMethod btnDeletePurchase btn btn-outline-danger mt-2"
                    onClick={() => onDelete(purchase._id)}
                  >Xóa <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  {/* </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationAdmin
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={purchaseList.length}
        itemsPerPage={purchasesPerPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

export default PurchasesAdmin;
