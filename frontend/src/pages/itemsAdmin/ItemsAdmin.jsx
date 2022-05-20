import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faCirclePlus,
  faCube,
  faFileEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './ItemsAdmin.scss';
import {useEffect, useState, useRef} from 'react';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";
import Dialog, { DialogOK } from '../../components/deleteConfirm/Dialog';
import { Link } from "react-router-dom";
import { ceil } from 'lodash';
function ItemsAdmin () {
  var index = 1;
  const [itemList, setItemList] = useState ([]);
  const itemListLength = itemList.length;
  const [selectedItem, setSelectedItem] = useState ([]);
  useEffect (() => {
    userRequest().get ('admin/products').then (res => {
      setItemList (res.data.items);
    });
  }, []);
  
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameItem: ""
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
  const idItemRef = useRef();
  const handleDialog = (message, isLoading, nameItem) => {
    setDialog({
      message,
      isLoading,
      //Update
      nameItem
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
  const handleDelete = (id, item) => {
    //Update
    //const index = itemList.findIndex((p) => p._id === id);
    handleDialog(`Bạn có chắc chắn muốn xóa ${item.type === 'phone'? 'Điện thoại' : item.type === 'tablet' ? 'Máy tính bảng' : item.type === 'accessory'? 'Phụ kiện' : item.type === 'laptop' ? 'Laptop' : ''} ${item.name} của hãng ${item.brand.name} không?`, true, `Xóa: ${item.type === 'phone'? 'Điện thoại' : item.type === 'tablet' ? 'Máy tính bảng' : item.type === 'accessory'? 'Phụ kiện' : item.type === 'laptop' ? 'Laptop' : ''} ${item.name}`);
    idItemRef.current = id;
  };
  
  const handleDeleteMany = () => {
    handleDialogs("Bạn có chắc chắn muốn xóa hết sản phẩm đã chọn?", true);
  };

  const handleButtonOK=(choose)=>{
    if (choose){
      handleDialogOK("", false);
    }
  };
  const areUSureDelete = (choose) => {
    if (choose) {
      setItemList(itemList.filter((p) => p._id !== idItemRef.current));
      axios
        .delete(hostServer + `/api/admin/orders/delete/${idItemRef.current}`)
        .then(res => {
          setItemList(res.data.items);
        });
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const handleCheckbox = (e, data) => {
    const {name, checked} = e.target;
    if (checked) {
      if (name === 'allSelect') {
        setSelectedItem (itemList);
      } else {
        setSelectedItem ([...selectedItem, data]);
      }
    } else {
      if (name === 'allSelect') {
        setSelectedItem ([]);
      }
      else {
        let tempItem = selectedItem.filter((i) => i._id !== data._id);
        setSelectedItem(tempItem);
      }
    }
  };
  const handleDeleteManyItems = (choose) => {
    if (choose){
      if (selectedItem.length !== 0){
        const ids = [];
        selectedItem.forEach(element => {
          ids.push(element._id);
        });
        setItemList(itemList.filter(i => selectedItem.indexOf(i) === -1));
        axios
          .delete(hostServer + "/api/admin/products/deleteMany", {data: ids})
          .then(res => {  
            setItemList(res.data.items);
          })
        handleDialogs("", false);
      }
      else {
        handleDialogs("", false);
        handleDialogOK("Bạn chưa chọn sản phẩm nào để xóa!", true);
      }
    }
    else{
      handleDialogs("", false);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState (1);
  const [itemsPerPage, setItemsPerPage] = useState (7);
  const firstPageIndex = (currentPage - 1) * itemsPerPage;
  const lastPageIndex = firstPageIndex + itemsPerPage;
  const dataEachPage = itemList.slice (firstPageIndex, lastPageIndex);

  const handleChangeItemsPerPage = () =>{
    var queryItemsPerPage = parseInt(document.getElementById('getNumPerPage').value);
    var renderItemsPerPage = queryItemsPerPage <= 0 ? 1 : queryItemsPerPage > itemListLength ? itemListLength : queryItemsPerPage;
    setItemsPerPage(renderItemsPerPage);
    document.getElementById('gotoPageNum').value = 1;
    setCurrentPage(1);
  }
  const handleGoToPageNum = (e) =>{
    var queryPageToGo = parseInt(document.getElementById('gotoPageNum').value);
    var pageToGo = queryPageToGo <= 0 ? 1 : queryPageToGo > ceil(itemListLength/itemsPerPage) ? ceil(itemListLength/itemsPerPage) : queryPageToGo; 
    document.getElementById('gotoPageNum').value = pageToGo;
    setCurrentPage(pageToGo);
  }
  
  if (itemList.length === 0) return (<p>Không có sản phẩm nào</p>);
  return (
    <div className="listItemsAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4 qlsp">
          <h1 className="mr-3 fw-bold ProdTitle">
            <FontAwesomeIcon icon={faCube} /> Quản lý sản phẩm
          </h1>
          <Link to={`/admin/products/create/`}>
            <button className="btnAddNewItem btn btn-success">
              <FontAwesomeIcon icon={faCirclePlus} /> Thêm sản phẩm mới
            </button>
          </Link>
          &nbsp;
          <button className="btnDeleteAllItems btn btn-danger" onClick={()=> handleDeleteMany()}>
              <FontAwesomeIcon icon={faTrashAlt} /> Xóa sản phẩm
          </button>
          &nbsp;
          <h2 className="fw-bold totalCountPur">(<FontAwesomeIcon icon={faCube}></FontAwesomeIcon> Tất cả: {itemList.length} sản phẩm)</h2>
        </div>

        <table className="table tableofItem table-hover table-striped border-primary table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{width: '4%'}}>
                <input type="checkbox" className='form-check-input' name="allSelect" checked={selectedItem?.length === itemList?.length} onChange={(e) => handleCheckbox(e, itemList)}>
                </input>
              </th>
              <th scope="col" style={{width: '5%'}}>#</th>
              <th scope="col" style={{width: '25%'}}>Tên sản phẩm</th>
              <th scope="col" style={{width: '25%'}}>Phân loại</th>
              <th scope="col" style={{width: '25%'}}>Hãng</th>
              <th scope="col" style={{width: '20%'}}>Tùy chọn</th>
            </tr>
          </thead>

          <tbody>
            {dataEachPage && dataEachPage.map ((item) => (
              <tr key={item._id} id={item._id}>
                <td>
                  <input type="checkbox" className="form-check-input" name={item.name} checked={selectedItem.some((i) => i?._id === item._id)} onChange={(e)=> handleCheckbox(e, item)}>
                  </input>
                </td>
                <th scope="row">{index++}</th>
                <td>
                  <Link to={`/admin/products/update/${item._id}`}
                    className="linkToItem"
                  >
                    {item.name}
                  </Link>
                </td>
                <td>
                  {item.type === 'phone'
                    ? 'Điện thoại'
                    : item.type === 'tablet'
                        ? 'Máy tính bảng'
                        : item.type === 'accessory'
                            ? 'Phụ kiện'
                            : item.type === 'laptop' ? 'Laptop' : ''}
                </td>
                <td>{item.brand.name}</td>
                {/* <td>{format(new Date(item.createdAt), "yyyy-MM-dd")}</td> */}
                <td>
                  <Link 
                    to={`/admin/products/addOptions/${item._id}`}
                    className="formMethod"
                  >
                    <button className=" formMethod btnEditItem btn btn-outline-info mb-2">
                      Thêm lựa chọn <FontAwesomeIcon icon={faAdd} />
                    </button>
                  </Link>  
                  <Link to={`/admin/products/update/${item._id}`}
                    className="formMethod"
                  >
                    <button className=" formMethod btnEditItem btn btn-outline-primary">
                      Sửa <FontAwesomeIcon icon={faFileEdit} />
                    </button>
                  </Link>
                  &nbsp;
                  <Link to={'/admin/products/'}>
                    <button
                      className="formMethod btnDeleteItem btn btn-outline-danger"
                      onClick={() => handleDelete (item._id, item)}
                    >
                      {' '}
                      Xóa <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {dialog.isLoading && (
              <Dialog
                //Update
                nameDelete={dialog.nameItem}
                onDialog={areUSureDelete}
                message={dialog.message}
                />
            )}
            {dialogs.isLoading && (
              <Dialog
                //Update
                nameUser={dialogs.nameUser}
                onDialog={handleDeleteManyItems}
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
        totalCount={itemListLength}
        itemsPerPage={itemsPerPage}
        onPageChange={page => setCurrentPage (page)}
      />
      <div className='divCustomBtn'> 
        <label htmlFor='getNumPerPage'>Số lượng sản phẩm/trang: </label>
        <input  type={'number'} id='getNumPerPage' min={1} max={itemListLength} defaultValue={itemsPerPage}></input>
        <button className='myCustomBtn btn btn-outline-primary' onClick={()=> handleChangeItemsPerPage()}>OK</button>
        <br></br>
        <label htmlFor='gotoPageNum'>Đi nhanh đến trang: </label>
        <input type={'number'} id='gotoPageNum' min={1} max={ceil(itemListLength/itemsPerPage)} defaultValue={1}></input>
        <button className='myCustomBtn btn btn-outline-primary' onClick={(e)=>handleGoToPageNum(e)}>OK</button>
      </div>
    </div>
  );
}

export default ItemsAdmin;