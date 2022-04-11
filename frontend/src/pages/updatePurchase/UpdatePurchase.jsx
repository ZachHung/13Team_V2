import React from 'react';
import './UpdatePurchase.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const URL = 'http://localhost:5000/api/';
const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

function UpdatePurchase() {
    const params = useParams();
    const [purchase, setPhone] = useState([]);
    useEffect(() => {
        api.get("admin/orders/edit/" + params.id).then((res) => {
            setPhone(res.data.purchase);
        });
    }, []);

    return (
        <div className="container mt-4 mb-4">
            <h1 className="text-center heading">Cập nhật trạng thái đơn hàng</h1>
            <form className="mt-4" method="POST" action={URL + "admin/orders/update/" + purchase._id + "?_method=PUT"}>
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
                    <select className="form-select my-input-tag" name='status'>
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
                                <label className="form-label label_level_2">Mã sản phẩm</label>
                                <input disabled type="text" className="form-control my-input-tag" defaultValue={list.optionID} />
                            </div>
                            <div className="lavel_2">
                                <div className="mb-4">
                                    <label htmlFor="color" className="form-label label_level_3">Màu sắc</label>
                                    <input disabled type="text" className="form-control my-input-tag" defaultValue={list.color} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="form-label label_level_3">Số lượng</label>
                                    <input disabled type="text" className="form-control my-input-tag" defaultValue={list.quantity} />
                                </div>
                            </div>
                        </div>
                    ))
                }

                <a className="btn btn-primary my-bnt bnt-back" href='/admin/orders'>Quay lại</a>
                <button type="submit" className="btn btn-primary my-bnt">Lưu lại</button>
            </form>
        </div>
    );
}


export default UpdatePurchase;
