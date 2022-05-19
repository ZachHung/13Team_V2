import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFileEdit, faReceipt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './PurchasesAdmin.scss';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";
import Dialog, { DialogOK } from '../../components/deleteConfirm/Dialog';
import { Link } from "react-router-dom";
import { ceil } from 'lodash';
function PurchasesAdmin() {
  var index = 1;
  const [purchaseList, setPurchaseList] = useState([]);
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  useEffect(() => {
    userRequest().get('admin/orders').then(res => {
      setPurchaseList(res.data.purchase);
    });
  }, []);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    namePurchase: ""
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
  const idPurchaseRef = useRef();
  const handleDialog = (message, isLoading, namePurchase) => {
    setDialog({
      message,
      isLoading,
      //Update
      namePurchase
    });
  };
  const handleDelete = (id, purchase) => {
    //Update
    const index = purchaseList.findIndex((p) => p._id === id);
    handleDialog(`Bạn có chắc chắn muốn xóa đơn hàng của khách hàng ${purchase.userID.name} không?`, true, "Xóa: Đơn hàng " + purchaseList[index]._id);
    idPurchaseRef.current = id;
  };
  
  const handleDeleteMany = () => {
    handleDialogs("Bạn có chắc chắn muốn xóa hết đơn hàng đã chọn?", true);
  };

  const handleButtonOK = (choose)=>{
    if (choose){
      handleDialogOK("", false);
    }
  }
  const areUSureDelete = (choose) => {
    if (choose) {
      setPurchaseList(purchaseList.filter((p) => p._id !== idPurchaseRef.current));
      userRequest()
        .delete(hostServer + `/api/admin/orders/delete/${idPurchaseRef.current}`)
        .then(res => {
          setPurchaseList(res.data.purchase);
        });
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
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

  const handleDeleteManyPurchases = (choose) => {
    if (choose){
      if (selectedPurchases.length !== 0){
        const ids = [];
        selectedPurchases.forEach(element => {
          ids.push(element._id);
        });
        setPurchaseList(purchaseList.filter(x => selectedPurchases.indexOf(x) === -1));
        userRequest()
        .delete(hostServer + '/api/admin/orders/deleteMany', {data: ids})
          .then(res => {  
            setPurchaseList(res.data.purchase);
          })
          handleDialogs("", false);
      }
      else {
        handleDialogs("", false);
        handleDialogOK("Bạn chưa chọn đơn hàng nào để xóa!", true);
      }
    }
    else{
      handleDialogs("", false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage, setPurchasesPerPage] = useState(7);
  const firstPageIndex = (currentPage - 1) * purchasesPerPage;
  const lastPageIndex = firstPageIndex + purchasesPerPage;
  const dataEachPage = purchaseList.slice(firstPageIndex, lastPageIndex);

  const handleChangePurchasesPerPage = () =>{
    var queryPurchasesPerPage = parseInt(document.getElementById('getNumPurPerPage').value);
    var renderPurchasesPerPage = queryPurchasesPerPage <= 0 ? 1 : queryPurchasesPerPage > purchaseList.length ? purchaseList.length : queryPurchasesPerPage;
    setPurchasesPerPage(renderPurchasesPerPage);
    document.getElementById('gotoPagePurNum').value = 1;
    setCurrentPage(1);
  }
  const handleGoToPageNum = (e) =>{
    var queryPageToGo = parseInt(document.getElementById('gotoPagePurNum').value);
    var pageToGo = queryPageToGo <= 0 ? 1 : queryPageToGo > ceil(purchaseList.length/purchasesPerPage) ? ceil(purchaseList.length/purchasesPerPage) : queryPageToGo; 
    document.getElementById('gotoPagePurNum').value = pageToGo;
    setCurrentPage(pageToGo);
  }

  if (purchaseList.length === 0) return (<p>Không có đơn hàng nào</p>);
  return (
    <div className="listPurchasesAdminTitle d-flex flex-column ">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4 qlsp">
          <h1 className="mr-3 fw-bold PurTitle"><FontAwesomeIcon icon={faReceipt}></FontAwesomeIcon> Quản lý đơn hàng</h1>
          <Link to={`/admin/orders/create/`}>
            <button className="btnAddNewPurchase btn btn-success">
            <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon> Thêm đơn hàng mới
            </button>
          </Link>
          &nbsp;
          <button className="btnDeleteAllPurs btn btn-danger" onClick={()=>handleDeleteMany()}>
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Xóa đơn hàng  
          </button>
          &nbsp;
          <h2 className="fw-bold totalCountPur">(<FontAwesomeIcon icon={faReceipt}></FontAwesomeIcon> Tất cả: {purchaseList.length} đơn hàng)</h2>     
        </div>
        <table className="table tableOfPur table-striped table-hover border-primary table-bordered">
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
                  <Link
                    to={`/admin/orders/detail/${purchase._id}`}
                    className="linkToItem"
                  >
                    {purchase._id}
                  </Link>
                </td>
                <td>{purchase.userID.name}</td>
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
                  <Link className='formMethod' to={`/admin/orders/update/${purchase._id}`}>
                      <button className=" formMethod btnDeletePurchase btn btn-outline-primary" >
                        Cập nhật trạng thái <FontAwesomeIcon icon={faFileEdit} />
                      </button>
                  </Link>
                  &nbsp;
                  <Link className='formMethod' to={'/admin/orders/'}>
                    <button
                      className="formMethod btnDeletePurchase btn btn-outline-danger"
                      onClick={() => handleDelete (purchase._id, purchase)}
                      >Xóa đơn hàng <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {dialog.isLoading && (
              <Dialog
                //Update
                nameDelete={dialog.namePurchase}
                onDialog={areUSureDelete}
                message={dialog.message}
                />
            )}
            {dialogs.isLoading && (
              <Dialog
                //Update
                nameUser={dialogs.nameUser}
                onDialog={handleDeleteManyPurchases}
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
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={purchaseList.length}
        itemsPerPage={purchasesPerPage}
        onPageChange={page => setCurrentPage(page)}
      />
      <div className='divCustomBtn'> 
        <label htmlFor='getNumPurPerPage'>Số lượng đơn hàng/trang: </label>
        <input  type={'number'} id='getNumPurPerPage' min={1} max={purchaseList.length} defaultValue={purchasesPerPage}></input>
        <button className='myCustomBtn btn btn-outline-primary' onClick={()=> handleChangePurchasesPerPage()}>OK</button>
        <br></br>
        <label htmlFor='gotoPagePurNum'>Đi nhanh đến trang: </label>
        <input type={'number'} id='gotoPagePurNum' min={1} max={ceil(purchaseList.length/purchasesPerPage)} defaultValue={1}></input>
        <button className='myCustomBtn btn btn-outline-primary' onClick={(e)=>handleGoToPageNum(e)}>OK</button>
      </div>
    </div>
  );
}

export default PurchasesAdmin;
