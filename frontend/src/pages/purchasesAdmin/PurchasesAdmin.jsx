import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCirclePlus, faFileEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './PurchasesAdmin.scss';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


const URL = "http://localhost:5000/api/";
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function PurchasesAdmin() {
  var index = 1;
  const [purchaseList, setPurchaseList] = useState([]);
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  useEffect(() => {
    api.get('/admin/orders').then(res => {
      setPurchaseList(res.data.purchase);
    });
  }, []);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    api.get('/admin/customers').then(res => {
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
          setPurchaseList(res.data.purchase);
        });
      window.location.reload(false);
    } else { }
  };
  const handleCheckbox = (e, data) => {
    const {name, checked} = e.target;
    if (checked){
      if (name === 'allSelect') {
        setSelectedPurchases(purchaseList);
      }
      else {
        setSelectedPurchases([...selectedPurchases, data]);
      }
    }
    else {
      if (name === 'allSelect'){
        setSelectedPurchases([]);
      }
      else {
        let tempSelectedPurchase = selectedPurchases.filter((p) => p._id !== data._id)
        setSelectedPurchases(tempSelectedPurchase);
      }
    }
  };
  const deleteManyPurchases = (selectedPurchases) => {
    const ids = [];
    selectedPurchases.forEach(element => {
      ids.push(element._id);
    });
    if (ids.length === 0) {
      window.confirm("Bạn chưa chọn đơn hàng nào!");
    }
    else {
      var doDelete = window.confirm("Bạn có thực sự muốn xóa các đơn hàng đã chọn?");
      if (doDelete){
        axios
          .delete("http://localhost:5000/api/admin/orders/deleteMany", {data: ids})
          .then(res => {  
            setPurchaseList(res.data.purchase);
          })
          .catch((error) => console.error({error: error.message}));
        window.location.reload (false);
      }
      else {}
    } 
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage, setPurchasesPerPage] = useState(7);
  const firstPageIndex = (currentPage - 1) * purchasesPerPage;
  const lastPageIndex = firstPageIndex + purchasesPerPage;
  const dataEachPage = purchaseList.slice(firstPageIndex, lastPageIndex);
  
  if (purchaseList.length === 0) return (<p>Không có đơn hàng nào</p>);
  return (
    <div className="listPurchasesAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4 qlsp">
          <h1 className="mr-3 fw-bold"><FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon> Quản lý đơn hàng</h1>
          <a href="/admin/orders/create/">
            <button className="btnAddNewPurchase btn btn-success">
            <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> Thêm đơn hàng mới
            </button>
          </a>
          &nbsp;
          <button className="btnDeleteAllPurs btn btn-danger" onClick={()=> deleteManyPurchases(selectedPurchases)}>
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Xóa tất cả đơn hàng
          </button>      
        </div>
        <table className="table table-striped table-hover border-primary table-bordered">
          <thead>
            <tr>
                <th scope="col" style={{"width":"4%"}}>
                  <input type="checkbox" name="allSelect" className='form-check-input' checked={selectedPurchases?.length === purchaseList?.length} onChange={(e)=>{handleCheckbox(e,purchaseList)}}>
                  </input>
                </th>
                <th scope="col" style={{"width":"4%"}}>#</th>
                <th scope="col" style={{"width":"10%"}}>Mã đơn hàng</th>
                <th scope="col" style={{"width":"7%"}}>Tên khách hàng</th>
                <th scope="col" style={{"width":"10%"}}>Ngày đặt hàng</th>
                {/* <th scope="col">Tổng tiền</th> */}
                <th scope="col" style={{"width":"10%"}}>Phương thức thanh toán</th> 
                <th scope="col" style={{"width":"10%"}}>Tình trạng thanh toán</th>         
                <th scope="col" style={{"width":"10%"}}>Tình trạng giao hàng</th>             
                <th scope="col" style={{"width":"10%"}}>Thời gian</th>
                <th scope="col" style={{"width":"18%"}}>Tùy chọn</th>
              </tr>
          </thead>
          <tbody>
            {dataEachPage?.map((purchase) => (

              <tr key={purchase._id}>
                <td><input type="checkbox" className="form-check-input" name={purchase.id} checked={selectedPurchases.some((i) => i?._id === purchase._id)} onChange={(e)=>handleCheckbox(e, purchase)}></input></td>
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
                  { (purchase.status !== "Đã giao hàng" && purchase.status !== "Đã hủy" ) ? "" : format(
                    new Date (purchase.updatedAt),
                    'yyyy-MM-dd kk:mm:ss'
                  )}
                </td>
                <td>
                  <a className='formMethod' href={`/admin/orders/update/${purchase._id}`}>
                      <button className=" formMethod btnDeletePurchase btn btn-outline-primary" >
                        Cập nhật trạng thái <FontAwesomeIcon icon={faFileEdit} />
                      </button>
                  </a>
                  &nbsp;
                  <button
                    className="formMethod btnDeletePurchase btn btn-outline-danger"
                    onClick={() => onDelete (purchase._id)}
                    >Xóa đơn hàng <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
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
