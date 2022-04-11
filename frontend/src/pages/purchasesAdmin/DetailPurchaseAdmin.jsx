import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './DetailPurchaseAdmin.scss';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faElementor } from '@fortawesome/free-brands-svg-icons';

const api = axios.create ({
  baseURL: 'http://localhost:5000/api/',
});
const URL = 'http://localhost:5000/api/';

function DetailPurchaseAdmin () {
  var index = 1;
  const params = useParams ();
  const [purchaseDetail, setPurchaseDetail] = useState ([]);
  useEffect (() => {
    api.get ('admin/orders/detail/' + params.id).then (res => {
      console.log (res.data);
      setPurchaseDetail (res.data.purchase);
    });
  }, []);

    const [userList, setUserList] = useState ([]);
    useEffect (() => {
      api.get ('admin/customers').then (res => {
        console.log (res.data);
        setUserList (res.data.user);
      });
    }, []);

    const userIndicate = (userList, purchaseUID) => {
      for (let i = 0; i < userList.length; i++) {
        if (userList[i]._id === purchaseUID.userID)
            return userList[i];
      }
    };
  //   const onDelete = id => {
  //     var confirmDelete = window.confirm (
  //       `Bạn có chắc chắn muốn xóa đơn hàng ${id} này không?`
  //     );
  //     if (confirmDelete) {
  //       axios
  //         .delete (`http://localhost:5000/api/admin/orders/delete/${id}`)
  //         .then (res => {
  //           console.log (res.data);
  //           setPurchase (res.data.purchase);
  //         });
  //       window.location.reload (false);
  //     } else {
  //     }
  //   };
    var totals = 0, fee = 10000;
    const updateTotalOne = (total) => {
        totals+= total;
    };
    const updateFee = (fee) => {
        return fee;
    }
    const currentChange = (price) => {
        price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        }).format(price);
        return price;
    };
    
  return (
    <div
      className="d-flex flex-column marginTop">
    <a className='btn btn-outline-primary btnback' href='/admin/orders/'>&#8592; Quay lại</a>
    {/* <FontAwesomeIcon >{faTrashAlt}<a className='btn btn-outline-primary btndelete' href='/admin/orders/'>Xóa đơn hàng</a> </FontAwesomeIcon> */}
    {purchaseDetail?.map ((purchase) => (
        <div className="purCart text-white" style={{"border": '2px solid #0c517d'}}>
            <div className="p-3">
                <div className="d-flex justify-content-between">
                    <h3>Mã đơn hàng: {purchase._id}</h3>
                    <h3>7Team</h3>
                </div>
                <div className="d-flex bg-white text-dark p-3 justify-content-between">
                        <div className="my-grow-shrink purchaseInfo">
                            <h3>Thông tin vận chuyển:</h3>
                            <p><b>Họ tên: </b>{userIndicate(userList, purchase).name}
                            </p>
                            <p><b>Số điện thoại: </b>
                                {userIndicate(userList, purchase).phone}
                            </p>
                            <p><b>Email: </b>
                                {userIndicate(userList, purchase).email}
                            </p>
                            <p><b>Địa chỉ: </b>
                                {userIndicate(userList, purchase).detailaddress}
                            </p>
                        </div>
                        <div className="my-grow-shrink">
                            <h3>Tình trạng đơn hàng:</h3>
                                { 
                                    purchase.status === "Đang giao hàng" ?
                                    <div>
                                        <span className='redStatus'>Đã xác nhận bởi quản trị viên</span>
                                        <p className='redStatus'>Đơn hàng đang được giao</p>
                                    </div> 
                                    : purchase.status === "Đã giao hàng" ?
                                        <p className='redStatus'>Giao hàng lúc {format (new Date(purchase.updatedAt), "yyyy-MM-dd kk:mm:ss")}
                                        </p>
                                    : purchase.status === "Chưa xác nhận" ?
                                    <p className='redStatus'>Đơn hàng cần được xác nhận</p> 
                                    : <p className='redStatus'>Không xác định</p>
                                }
                        </div>
                    </div>
            </div>
            <div className="cart-bottom">
                    <div className="purchaseTable">
                        <table className="w-100">
                            <tbody>
                                <tr className="main-heading h4">
                                    <th>#</th>
                                    <th>Ảnh</th>
                                    <th className="long-txt">Tên</th>
                                    <th>Màu</th>
                                    <th>Số lượng</th>          
                                    <th>Đơn giá</th>
                                    <th>Giảm giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                                { purchaseDetail?.map(purchaseDe => (                               
                                    purchaseDe.list?.map(listOpts => ( 
                                    <tr className='cake-top' key={listOpts._id}>
                                        <td className='h5'>{index++}</td>
                                        <td className="cakes">
                                            <a href={`/admin/products/detail/`} className="product-img" style={{'width': '100px', 'height': '100px;'}}> 
                                            <Link to={`/`}>
                                                <img style={{'object-fit': 'cover', 'width': '100%', 'height': '100%'}}
                                                    src={`http://localhost:5000/${listOpts.optionID.color.image}`} alt={listOpts.optionID.slug}/>           
                                            </Link>  
                                                                                
                                            </a>
                                        </td> 
                                                                
                                        <td className="cake-text align-middle h-100">
                                            <a href={`/admin/products/detail/${0}`} className="my-link h5">
                                                {listOpts.optionID.item.name}
                                            </a>
                                        </td>
                                        
                                        <td className="align-middle h5">
                                            {listOpts.color}
                                        </td>
                                        <td className="align-middle h5">
                                            {listOpts.quantity}
                                        </td>
                                        {listOpts.optionID.color?.map((color_price, total) => (
                                            
                                            <>
                                            
                                            <td className="align-middle h5">
                                                {currentChange(color_price.price)} 
                                            </td>
                                            <td className="align-middle h5">
                                                {`${color_price.discount}%`}   
                                            </td>
                                            <td className="align-middle h5">
                                                {currentChange(total += (color_price.price) * (100 - color_price.discount)/100)}   
                                                {updateTotalOne(total)}
                                            </td>
                                                
                                            </>
                                            
                                        ))}
                                    </tr> 
                                    ))  
                                ))}                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={7} className="text-right h3">Phí vận chuyển:</th>
                                    <th colSpan={1} className="align-middle h3" id="fee">
                                        {`${currentChange(updateFee(fee))}`}
                                    </th>    
                                </tr>
                                <tr>
                                    <th colSpan={7} className="text-right h3">Tổng tiền đơn hàng:</th>
                                    <th colSpan={1} className="align-middle h3" id="total">
                                        {`${currentChange(totals + updateFee(fee))}`}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
        </div>
      ))}     
    </div>
  );
}

export default DetailPurchaseAdmin;
