import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './ItemsAdmin.scss';
import {useEffect, useState} from 'react';
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
  const onDelete = (id) => {
    var confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete){
    axios.delete(`http://localhost:5000/api/admin/customers/delete/${id}`).then((res) =>{
      console.log (res.data);
      setItemList (res.data.items);  
    });
    window.location.reload(false); }
    else {}
  }
    
  return (
    
    <div className="listItemsAdminTitle d-flex flex-column">
      <div className="p-3">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mr-3">Quản lý sản phẩm</h1>
          <a href="admin/customers/create/">
            <button className="btnAddNewItem btn btn-success">
              Thêm mới sản phẩm
            </button>
          </a>
        </div>

        <table className="table table-hover table-striped">

          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Phân loại</th>
              <th scope="col">Hãng</th>
              {/* <th scope="col">Cập nhật lúc</th> */}
              <th scope="col">Tùy chọn</th>
            </tr>
          </thead>

          <tbody>
            {itemList.map(item => (
              <tr key={item._id}>
                <th scope="row">{index++}</th>
                <td>
                  <a href={`/admin/products/id=${item._id}`} className="linkToItem">
                    {item.name}
                  </a>
                </td>
                <td>{item.type === "phone" ? "Điện thoại" : item.type === "tablet" ? "Máy tính bảng": item.type === "accessory" ? "Phụ kiện" : item.type === "laptop" ? "Laptop": ""}</td>
                <td>{item.brand.name}</td>
                {/* <td>{format(new Date(item.updatedAt), 'yyyy-MM-dd kk:mm:ss')}</td> */}
                <td>
                  {/* <a className='formMethod' href='admin/products/edit/'> */}
                      <button className=" formMethod btnEditItem btn btn-outline-primary">
                        Sửa <FontAwesomeIcon icon={faFileEdit} />
                      </button>
                  {/* </a> */}
                  &nbsp;
                  {/* <a className='formMethod' href>                   */}
                      <button className=" formMethod btnDeleteItem btn btn-outline-danger" onClick={()=> onDelete(item._id)}>                       
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

export default ItemsAdmin;
