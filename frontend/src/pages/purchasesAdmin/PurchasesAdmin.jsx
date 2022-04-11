import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './PurchasesAdmin.scss';
import {useEffect, useState} from 'react';
import { format } from 'date-fns';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function PurchasesAdmin () {
    var index = 1;
    const [purchaseList, setPurchaseList] = useState([]);
    useEffect(() => {
      api.get('/admin/purchases').then((res) => {
        console.log(res.data);
        setPurchaseList(res.data.purchase);
      });
    }, []);
    const onDelete = (id) => {
      var confirmDelete = window.confirm("Do you want to delete?");
      if (confirmDelete){
        axios.delete(`http://localhost:5000/api/admin/purchases/delete/${id}`).then((res) =>{
          console.log (res.data);
          setPurchaseList (res.data.purchase);  
        });
        window.location.reload(false); 
      }
      else {}
    }

  return (
    <div className="listPurchasesAdminTitle d-flex flex-column">
      <section className="p-3">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mr-3">Quản lý đơn hàng</h1>
          {/* <a href="/purchases/create/">
            <button className="btnAddNewPurchase btn btn-success">Add new purchase
            </button>
          </a> */}
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Mã Khách hàng</th>
              {/* <th scope="col">Tổng tiền</th> */}
              {/* <th scope="col">Phương thức thanh toán</th> */}
              {/* <th scope="col">Tình trạng thanh toán</th> */}
              <th scope="col">Trạng thái đơn hàng</th>
              <th scope="col">Cập nhật lúc</th>
              <th scope="col" className='text-center'>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {
              purchaseList.map((purchase) => (
            <tr key = {purchase._id}> 
              <th scope="row">{index++}</th>
              <td>
                  <a href={`/admin/purchases/detail/id=${purchase._id}`} className="linkToItem">
                    {purchase._id}
                  </a>
                </td>
              <td>{purchase.userID}</td>
              {/* <td>D5</td>
              <td>D6</td>
              <td>D7</td> */}
              <td>{purchase.status}</td>
              <td>{format(new Date(purchase.updatedAt), 'yyyy-MM-dd kk:mm:ss')}</td>
              <td className='text-center'>
                  <a className='formMethod' href={`/admin/orders/update/${purchase._id}`}>
                      <button className=" formMethod btnDeletePurchase btn btn-outline-primary" >
                        Cập nhật trạng thái <FontAwesomeIcon icon={faFileEdit} />
                      </button>
                  </a>
                  &nbsp;
                  <div className='mt-4'>                  
                      <button className=" formMethod btnDeletePurchase btn btn-outline-danger" onClick={()=> onDelete(purchase._id)}>                       
                        Xóa <FontAwesomeIcon icon={faTrashAlt}/>
                      </button>                   
                  </div>
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
      </section>
    </div>
  );
}

export default PurchasesAdmin;