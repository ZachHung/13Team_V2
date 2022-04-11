import React from 'react';
import './UpdateUser.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const URL = 'http://localhost:5000/api/';
const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

function UpdateUser() {
    const params = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        api.get("admin/customers/edit/" + params.id).then((res) => {
            setUser(res.data.user);
        });
    }, []);

    const [province, setaddress] = useState([]);
    useEffect(() => {
        api.get("address/getalladress/").then((res) => {
            setaddress(res.data.address);
        });
    }, []);

    const [district, setdistrict] = useState([]);
    const Getdistrictbyprovince = () => {
        var province = document.getElementById("province").value;
        document.getElementById("district").value = "";
        document.getElementById("ward").value = "";


        console.log(province);
        axios.get(URL + 'address/district/' + province).then((res) => {
            setdistrict(res.data.address);
        });
    }

    const [ward, setward] = useState([]);
    const Getwardbydistrict = () => {
        var province = document.getElementById("province").value;
        var district = document.getElementById("district").value;
        document.getElementById("ward").value = "";
        axios.get(URL + 'address/ward/' + province + '/' + district).then((res) => {
            setward(res.data.address);
        });
    }



    return (
        <div className="container mt-4 mb-4">
            <h1 className="text-center heading">Cập nhật thông tin người dùng</h1>
            <form className="mt-4" method="POST" action={URL + "admin/customers/update/" + user._id}>
                <div class="mb-4 check">
                    <input class="form-check-input my-check-tag" type="checkbox" name='isAdmin' defaultChecked={user.isAdmin} id="flexCheckDefault"/>
                        <label class="form-check-label lable_level_1" for="flexCheckDefault">
                            Admin
                        </label>
                </div>
                <div className="mb-4">
                    <label className="form-label lable_level_1">Tên người dùng</label>
                    <input type="text" className="form-control my-input-tag" id='name' name='name' defaultValue={user.name} />
                </div>
                <div className="mb-4">
                    <label className="form-label lable_level_1">Số điện thoại</label>
                    <input type="text" className="form-control my-input-tag" id='phone' name='phone' defaultValue={user.phone} />
                </div>
                <div className="mb-4">
                    <label className="form-label lable_level_1">Địa chỉ email</label>
                    <input type="text" className="form-control my-input-tag" id='email' name='email' defaultValue={user.email} />
                </div>
                <div className="mb-4">
                    <label className="form-label lable_level_1">Giới tính</label>
                    <select class="form-select my-input-tag" name='gender' aria-label=".form-select-sm example">
                        <option hidden selected>{user.gender}</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label lable_level_1">Ngày sinh</label>
                    <input type="text" className="form-control my-input-tag" id='birthday' name='birthday' defaultValue={user.birthday} />
                </div>

                <label className="form-label lable_level_1">Địa chỉ</label>

                <div className='lavel_2'>
                    <div className="mb-4">
                        <label className="form-label lable_level_2">Thành phố/tỉnh</label>
                        <select class="form-select my-input-tag" id='province' name='address.province' onChange={Getdistrictbyprovince} aria-label=".form-select-sm example">
                            <option hidden selected>{user.address?.province}</option>
                            {
                                province?.map((province) => (
                                    <option value={province.name}>{province.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label lable_level_2">Quận/huyện</label>
                        <select class="form-select my-input-tag" id='district' name='address.district' onChange={Getwardbydistrict} aria-label=".form-select-sm example">
                            <option id="slt-dis" hidden selected>{user.address?.district}</option>
                            {
                                district.districts?.map((district) => (
                                    <option value={district.name}>{district.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label lable_level_2">Phường/xã</label>
                        <select class="form-select my-input-tag" id='ward' name='address.ward' aria-label=".form-select-sm example">
                            <option hidden selected>{user.address?.ward}</option>
                            {
                                ward.wards?.map((ward) => (
                                    <option value={ward.name}>{ward.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label lable_level_2">Địa chỉ cụ thể</label>
                        <input type="text" className="form-control my-input-tag" id='addressdetail' name='address.addressdetail' defaultValue={user.address?.addressdetail} />
                    </div>
                </div>

                <a className="btn btn-primary my-bnt bnt-back" href='/admin/customers'>Quay lại</a>
                <button type="submit" className="btn btn-primary my-bnt">Lưu lại</button>
            </form>
        </div>
    );
}



export default UpdateUser;