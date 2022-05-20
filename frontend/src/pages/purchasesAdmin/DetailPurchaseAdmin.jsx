import React from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import './DetailPurchaseAdmin.scss';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {useParams, Link} from 'react-router-dom';
import { userRequest } from "../../utils/CallApi";
import { currentChange } from "../../utils/const";

function DetailPurchaseAdmin () {
  var index = 1;
  const params = useParams ();
  const [purchaseDetail, setPurchaseDetail] = useState ([]);
  useEffect (() => {
    userRequest().get ('admin/orders/detail/' + params.id).then (res => {
      setPurchaseDetail (res.data.purchase);
    });
  }, []);

    var totals = 0, fee = 25000;
    const updateTotalOne = (total) => {
        totals+= total;
    };
    const updateFee = (fee) => {
        return fee;
    }

  return (
    <div
      className="d-flex flex-column marginTop">
   <Link className='btn btnback' to='/admin/orders/'>&#8592; Quay lại</Link>

    {/* <FontAwesomeIcon >{faTrashAlt}<a className='btn btn-outline-primary btndelete' href='/admin/orders/'>Xóa đơn hàng</a> </FontAwesomeIcon> */}
    {purchaseDetail?.map ((purchase) => (
        <div className="purCart text-white" style={{"border": '2px solid #0c517d'}}>
            <div className="p-3">
                <div className="d-flex justify-content-between">
                    <h2>Mã đơn hàng: {purchase._id}</h2>
                    <h2>7Team</h2>
                </div>
                <div className="purchaseInfo d-flex bg-white text-dark p-3 justify-content-between">
                    <div>
                        <h2>Thông tin vận chuyển:</h2>
                         <p className='px-2 mt-3'><b>Họ tên: </b>{purchase.userID.name}
                        </p>
                        <p className='px-2'><b>Số điện thoại: </b>
                            {purchase.userID.phone}
                        </p>
                        <p className='px-2'><b>Email: </b>
                                {purchase.userID.email}
                        </p>
                        <p className='px-2'><b>Địa chỉ: </b>
                                {purchase.userID.address.addressdetail === "" ? "" : `${purchase.userID.address.addressdetail},`} {purchase.userID.address.ward === "" ? "" : `${purchase.userID.address.ward},`} {purchase.userID.address.district === "" ? "" : `${purchase.userID.address.district},`} {purchase.userID.address.province === "" ? "" : `${purchase.userID.address.province}`}
                        </p>
                    </div>
                    <div>
                        <h2 className="mb-3">Tình trạng đơn hàng:</h2>
                        <p>
                            { 
                                purchase.status === "Đang giao hàng" ?
                                    <div className='redStatus'>
                                        <p>Đã xác nhận bởi quản trị viên</p>
                                        <p>Đơn hàng đang được giao</p>
                                    </div> 
                                : purchase.status === "Đã giao hàng" ?                                    
                                    <span className='redStatus'>Đã giao hàng lúc {format (new Date(purchase.updatedAt), "yyyy-MM-dd kk:mm:ss")}</span>                                   
                                : purchase.status === "Đã hủy" ?
                                    <span className='redStatus'>Đơn hàng đã bị hủy</span>
                                :
                                    <span className='redStatus'>Đơn hàng không xác định</span>
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="cart-bottom">
                    <div className="purchaseTable">
                        <table className='table tableDetail'>
                            <thead>
                                <tr className="main-heading h4">
                                    <th style={{width: "auto", height: 'auto'}}>#</th>
                                    {/* <th style={{width: "auto", height: 'auto'}}>Ảnh</th> */}
                                    <th style={{width: "auto", height: 'auto'}}>Tên</th>
                                    <th style={{width: "auto", height: 'auto'}}>Màu</th>
                                    <th style={{width: "auto", height: 'auto'}}>Số lượng</th>          
                                    <th style={{width: "auto", height: 'auto'}}>Đơn giá</th>
                                    <th style={{width: "auto", height: 'auto'}}>Giảm giá</th>
                                    <th style={{width: "auto", height: 'auto'}}>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                { purchaseDetail?.map(purchaseDe => (                               
                                    purchaseDe.list?.map(listOpts => (                                   
                                    <tr className='cake-top' key={listOpts._id}>
                                        <td className='h5'>{index++}</td>
                                        {/* <td className="cakes">
                                            <a href={`/admin/products/detail/`} className="product-img" style={{'width': '100px', 'height': '100px;'}}> 
                                                 <Link to={`../`}> 
                                                     <img className='imgDetailPurchase' style={{'object-fit': 'cover', 'width': '100%', 'height': '100%'}}
                                                        src={`http://localhost:5000/public/${listOpts.optionID.color.image}`} alt={listOpts.optionID.slug}/>            
                                                 </Link>                                                             
                                            </a>
                                        </td>  */}
                                                                
                                        <td className="cake-text align-middle">
                                            <a href={`/admin/products/detail/${0}`} className="align-middle h5">
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
                                                {currentChange(total += (color_price.price) * (listOpts.quantity) * (100 - color_price.discount)/100)}   
                                                {updateTotalOne(total)}
                                            </td>                             
                                            </>  
                                        ))}
                                    </tr>                                
                                    ))  
                                ))}
                                <tr>
                                    <th colSpan={6} className="text-right_pur h3">Phí vận chuyển:</th>
                                    <td colSpan={1} className="align-middle h3" id="fee">
                                        {`${currentChange(updateFee(fee))}`}
                                    </td>    
                                </tr>
                                <tr>
                                    <th colSpan={6} className="text-right_pur h3">Tổng tiền đơn hàng:</th>
                                    <td colSpan={1} className="align-middle h3" id="total">
                                        {`${currentChange(totals + updateFee(fee))}`}
                                    </td>
                                </tr>                             
                            </tbody>
                            <tfoot>
                                
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
