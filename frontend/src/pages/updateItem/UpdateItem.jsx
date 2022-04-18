import React from 'react';
import './UpdateItem.scss';
import { userRequest } from "../../utils/CallApi";
import { hostServer } from "../../utils/const";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { storage } from '../../firebase';

function UpdateItem() {
    const params = useParams();
    const [item, setPhone] = useState([]);
    const [image, setImage] = useState(null);
    const [urlImage, setUrl] = useState("");
    
    useEffect(() => {
        userRequest()
            .get(`admin/products/edit/${params.id}`)
            .then((res) => {
                setPhone(res.data.items);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = e => {
        document.getElementById("isLoading").style.display = "block"
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setUrl(url)
                        document.getElementById("image-new").name = "image";
                        document.getElementById("my-image").style.display = "block";
                        document.getElementById("isLoading").style.display = "none"
                    });
            }
        );
    }

    return (
        <div className="container mt-4 mb-4">
            <h1 className="text-center heading">Chỉnh sửa thông tin sản phẩm</h1>

            {item.map(item => (
                <form className="mt-4" method="POST" action={hostServer + "/api/admin/products/update/" + item._id + "?_method=PUT"}>
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
                        <div id='my-image' className='add-image'>
                            <input type="text" className="form-control mt-4 my-input-tag newImage" defaultValue={urlImage} placeholder='Nhập vào đường dẫn' id="image-new" />
                        </div>
                        <div id='isLoading' className='mt-4 add-info' >
                            <h3 className='text-center'>Đang tải...</h3>
                        </div>

                        <div className="mb-4 mt-4">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh sản phẩm</label>
                                    <input className="form-control my-input-tag" type="file" onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <a className="btn btn-primary upload-bnt" onClick={handleUpload}>Tải lên</a>
                                </div>
                            </div>
                        </div>
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
                        <label className="form-label label_level_1">Thông tin về công nghệ</label>
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

//check for delete image of item
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
