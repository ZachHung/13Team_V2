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
import {useEffect, useState} from 'react';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";

function ItemsAdmin () {
  var index = 1;
  const [itemList, setItemList] = useState ([]);
  const [selectedItem, setSelectedItem] = useState ([]);
  useEffect (() => {
    userRequest().get ('admin/products').then (res => {
      setItemList (res.data.items);
    });
  }, []);
  const onDelete = (id, name) => {
    var confirmDelete = window.confirm (
      `Bạn có chắc chắn muốn xóa sản phẩm ${name} này không?`
    );
    if (confirmDelete) {
      axios
        .delete (hostServer + `/api/admin/products/delete/${id}`)
        .then (res => {
          setItemList (res.data.items);
        });
      window.location.reload (false);
    } else {
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
  const deleteManyItems = (selectedItem) => {
    const ids = [];
    selectedItem.forEach(element => {
      ids.push(element._id);
    });
    if (ids.length === 0) {
      window.confirm("Bạn chưa chọn sản phẩm nào!");
    }
    else {
      var doDelete = window.confirm("Bạn có thực sự muốn xóa các sản phẩm đã chọn?");
      if (doDelete){
        axios
          .delete(hostServer + "/api/admin/products/deleteMany", {data: ids})
          .then(res => {  
            setItemList(res.data.purchase);
          })
          .catch((error) => console.error({error: error.message}));
        window.location.reload (false);
      }
      else {}
    } 
  };
  const dateFormat = ()=>{
    const dateFormat = new Date();
    return dateFormat;
  };
  
  // Pagination
  const [currentPage, setCurrentPage] = useState (1);
  const [itemsPerPage, setItemsPerPage] = useState (7);
  const firstPageIndex = (currentPage - 1) * itemsPerPage;
  const lastPageIndex = firstPageIndex + itemsPerPage;
  const dataEachPage = itemList.slice (firstPageIndex, lastPageIndex);
  
  if (itemList.length === 0) return (<p>Không có sản phẩm nào</p>);
  return (
    <div className="listItemsAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4 qlsp">
          <h1 className="mr-3 fw-bold ProdTitle">
            <FontAwesomeIcon icon={faCube} /> Quản lý sản phẩm
          </h1>
          <a href="/admin/products/create/">
            <button className="btnAddNewItem btn btn-success">
              <FontAwesomeIcon icon={faCirclePlus} /> Thêm sản phẩm mới
            </button>
          </a>
          &nbsp;
          <button className="btnDeleteAllItems btn btn-danger" onClick={()=> deleteManyItems(selectedItem)}>
            <FontAwesomeIcon icon={faTrashAlt} /> Xóa tất cả sản phẩm
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
                  <a
                    href={`/admin/products/detail/${item._id}`}
                    className="linkToItem"
                  >
                    {item.name}
                  </a>
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
                  <a
                    className="formMethod"
                    href={`/admin/products/addOptions/${item._id}`}
                  >
                    <button className=" formMethod btnEditItem btn btn-outline-info">
                      Thêm lựa chọn <FontAwesomeIcon icon={faAdd} />
                    </button>
                  </a>  
                  <a
                    className="formMethod"
                    href={`/admin/products/update/${item._id}`}
                  >
                    <button className=" formMethod btnEditItem btn btn-outline-primary">
                      Sửa <FontAwesomeIcon icon={faFileEdit} />
                    </button>
                  </a>
                  &nbsp;
                  <button
                    className="formMethod btnDeleteItem btn btn-outline-danger"
                    onClick={() => onDelete (item._id, item.name)}
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
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={itemList.length}
        itemsPerPage={itemsPerPage}
        onPageChange={page => setCurrentPage (page)}
      />
    </div>
  );
}

export default ItemsAdmin;