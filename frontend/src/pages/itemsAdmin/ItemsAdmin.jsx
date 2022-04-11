import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './ItemsAdmin.scss';
import {useEffect, useState} from 'react';
import PaginationAdmin from '../../components/paginationAdmin/Pagination';
import { format } from 'date-fns';

const api = axios.create ({
  baseURL: 'http://localhost:5000/api',
});

function ItemsAdmin () {
  var index = 1;
  const [itemList, setItemList] = useState ([]);
  useEffect (() => {
    api.get ('/admin/products').then (res => {
      console.log (res.data);
      setItemList (res.data.items);
    });
  }, []);
  const onDelete = (id, name) => {
    var confirmDelete = window.confirm (
      `Bạn có chắc chắn muốn xóa sản phẩm ${name} này không?`
    );
    if (confirmDelete) {
      axios
        .delete (`http://localhost:5000/api/admin/products/delete/${id}`)
        .then (res => {
          console.log (res.data);
          setItemList (res.data.items);
        });
      window.location.reload (false);
    } else {
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState (1);
  const [itemsPerPage, setItemsPerPage] = useState (10);
  const firstPageIndex = (currentPage - 1) * itemsPerPage;
  const lastPageIndex = firstPageIndex + itemsPerPage;
  const dataEachPage = itemList.slice (firstPageIndex, lastPageIndex);
  return (
    <div className="listItemsAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mr-3 fw-bold">Quản lý sản phẩm</h1>
          <a href="/admin/products/create/">
            <button className="btnAddNewItem btn btn-success">
              Thêm sản phẩm mới
            </button>
          </a>
        </div>

        <table className="table table-hover table-striped border-primary table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{"width":"5%"}}>#</th>
              <th scope="col" style={{"width":"25%"}}>Tên sản phẩm</th>
              <th scope="col" style={{"width":"25%"}}>Phân loại</th>
              <th scope="col" style={{"width":"25%"}}>Hãng</th>
              <th scope="col" style={{"width":"20%"}}>Tùy chọn</th>
            </tr>
          </thead>

          <tbody>
            {dataEachPage.map (item => (
              <tr key={item._id}>
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
                <td> 
                  <a
                    className="formMethod"
                    href={`/admin/products/update/${item._id}`}
                  >
                    <button className=" formMethod btnEditItem btn btn-outline-primary">
                      Sửa <FontAwesomeIcon icon={faFileEdit} />
                    </button>
                  </a>
                  &nbsp;
                  {/* <a className='formMethod' href>                   */}
                  <button
                    className=" formMethod btnDeleteItem btn btn-outline-danger"
                    onClick={() => onDelete (item._id, item.name)}
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
