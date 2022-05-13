import React from 'react';
import './UpdatePurchase.scss';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";

function UpdatePurchase() {
    const params = useParams();
    const [purchase, setpurchase] = useState([]);
    const [purchaseID, setPurchaseID] = useState();
    const [status, setStatus] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        userRequest().get("admin/orders/edit/" + params.id).then((res) => {
            console.log(res.data.purchase)
            setpurchase(res.data.purchase);
        });
    }, []);

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        userRequest()
            .put(`admin/orders/update/${params.id}`, {
                status: status,
            })
            .then((res) => {

            })
            .catch((err) => console.log(err));
    };

    return (

        <div className="container mt-4 mb-4">
            {purchase.map((purchase) => (
                <div>
                    <h1 className="text-center heading">Cập nhật trạng thái đơn hàng</h1>
                    {/* <form className="mt-4" method="POST" action={hostServer + "/api/admin/orders/update/" + purchase._id + "?_method=PUT"}> */}
                    <form className="mt-4">
                        <div className="mb-4">
                            <label className="form-label label_level_1">Mã đơn hàng</label>
                            <input disabled type="text" className="form-control my-input-tag" defaultValue={purchase._id} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label label_level_1">Mã khách hàng</label>
                            <input disabled type="text" className="form-control my-input-tag" defaultValue={purchase.userID} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="form-label label_level_1">Trạng thái đơn hàng</label>
                            <select className="form-select my-input-tag" name='status' onChange={handleStatus}>
                                <option hidden selected>{purchase.status}</option>
                                <option value="Đang giao hàng">Đang giao hàng</option>
                                <option value="Đã giao hàng">Đã giao hàng</option>
                                <option value="Đã hủy">Đã hủy</option>
                            </select>
                        </div>
                        <label htmlFor="status" className="form-label label_level_1">Chi tiết đơn hàng</label>
                        {
                            purchase.list?.map((list) => (
                                <div >
                                    <div className="mb-4">
                                        <label className="form-label label_level_2">Tên sản phẩm</label>
                                        <input disabled type="text" className="form-control my-input-tag" defaultValue={list.optionID.item.name} />
                                    </div>
                                    <div className="lavel_2">
                                        <div className="mb-4">
                                            <label htmlFor="color" className="form-label label_level_3">Màu sắc</label>
                                            <input disabled type="text" className="form-control my-input-tag" defaultValue={list.color} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="quantity" className="form-label label_level_3">Bộ nhớ</label>
                                            <input disabled type="text" className="form-control my-input-tag" defaultValue={list.optionID.detail} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="quantity" className="form-label label_level_3">Số lượng</label>
                                            <input disabled type="text" className="form-control my-input-tag" defaultValue={list.quantity} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <Link className="btn btn-primary my-bnt bnt-back" to='/admin/orders'>Quay lại</Link>
                        <button className="btn btn-primary my-bnt" onClick={handleSubmit}>Lưu lại</button>
                    </form>
                </div>
            ))}



        </div>
    );
}


export default UpdatePurchase;
