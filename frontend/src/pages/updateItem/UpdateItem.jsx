import React from 'react';
import './UpdateItem.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const URL = 'http://localhost:5000/api/';
const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

function UpdateItem() {
    const params = useParams();
    const [item, setPhone] = useState([]);
    useEffect(() => {
        api.get("admin/products/edit/" + params.id).then((res) => {
            setPhone(res.data.items);
            // console.log(res.data.items);
            // console.log(params.id);
        });
    }, []);

    return (
        <div className="container mt-4 mb-4">
            <h1 className="text-center heading">Chỉnh sửa thông tin sản phẩm</h1>
            {item.map(item => (
                <form className="mt-4" method="POST" action={URL + "admin/products/update/" + item._id + "?_method=PUT"} encType="multipart/form-data">
                    <a href={`/admin/products/updateDetail/${item._id}`} className="btn btn-primary bnt-more">Sửa chi tiết</a>
                    <br></br>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label label_level_1">Tên sản phẩm</label>
                        <input type="text" className="form-control my-input-tag" defaultValue={item.name} id="name" name="name" />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="form-label label_level_1">Loại sản phẩm</label>
                        <input type="text" className="form-control my-input-tag" defaultValue={item.type} id="type" name="type" />
                    </div>

                    <div className="mb-4">

                        <label className="form-label label_level_1 mb-0">Hình ảnh sản phẩm</label>


                        <p className='decri'>Xóa đường dẫn để xóa hình ảnh sản phẩm đó</p>
                        {item.image?.map(images => (
                            <div>
                                <input type="text" onBlur={CheckImage} className="form-control mt-4 my-input-tag image" placeholder='Hình này sẽ bị xóa' defaultValue={images} id="image" name="image" />
                            </div>
                        ))}
                        <div className="mb-4 mt-4">
                            <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh sản phẩm</label>
                            <input className="form-control my-input-tag" type="file" id='upload' name='upload' />
                        </div>
                        {/* <div id='my-image' className='add-image'>
                            <input type="text" className="form-control mt-4 my-input-tag" placeholder='Nhập vào đường dẫn' id="image-new" />
                        </div> */}
                    </div>



                    <div className="mb-4">
                        <label htmlFor="description" className="form-label label_level_1">Mô tả sản phẩm</label>
                        <textarea className="form-control my-area-tag" id="description" name="description" defaultValue={item.description} />
                    </div>

                    <label className="label_level_1">Thương hiệu</label>
                    <div className="lavel_2">
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label label_level_2">Tên thương hiệu</label>
                            <input type="text" className="form-control my-input-tag" defaultValue={item.brand.name} id="brand.name" name="brand.name" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="brandImage" className="form-label label_level_2">Ảnh thương hiệu</label>
                            <input type="text" className="form-control my-input-tag" defaultValue={item.brand.brandImage} id="brand.brandImage" name="brand.brandImage" />
                        </div>
                    </div>


                    <div className="mb-4">
                        <h1 className="form-label label_level_1">Thông tin về công nghệ</h1>
                        {item.techInfo?.map((techInfos, index_1) => (
                            <div className='lavel_2'>
                                <label className="form-label label_level_2">{techInfos.infoType}</label>
                                {techInfos.infoDetail?.map((infoDetails, index_2) => (
                                    <div className='mb-4'>
                                        <label className="form-label label_level_3">{infoDetails.infoName}</label>
                                        <textarea className="form-control my-area-tag" id="infoNum" name="infoNum" defaultValue={infoDetails.infoNum} />
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                    <a className="btn btn-primary my-bnt bnt-back" href='/admin/products'>Quay lại</a>
                    <button type="submit" className="btn btn-primary my-bnt">Lưu lại</button>
                </form>
            ))}

        </div>
    );
}

// function AddImageShow() {

//     var x = document.getElementById("my-image");
//     var imagenew = document.getElementById("image-new");
//     var addimagebnt = document.getElementById("add-image");
//     if (x.style.display !== "block") {
//         imagenew.name = "image";
//         x.style.display = "block";
//         addimagebnt.innerText = "-"
//         imagenew.focus();

//     } else {
//         x.style.display = "none";
//         imagenew.name = "";
//         addimagebnt.innerText = "+"
//     }
// }


function CheckImage() {
    var image = document.getElementsByClassName('image');
    for (var i = 0; i < image.length; i++) {
        if (image[i].value === "") {
            image[i].name = "";
        } else {
            image[i].name = "image";
        }
    }

}

export default UpdateItem;
