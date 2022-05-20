import React from 'react';
import './UpdateItem.scss';
import { userRequest } from "../../utils/CallApi";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { storage } from '../../firebase';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
                        document.getElementById("image-new").classList.add("image");
                        document.getElementById("my-image").style.display = "block";
                        document.getElementById("isLoading").style.display = "none"
                    });
            }
        );
    }


    const CheckImage = (e) => {
        if (e.target.value === "") {
            e.target.classList.add("remove")
            e.target.classList.remove("image")
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        var a = document.getElementsByClassName("image");
        var b = document.getElementsByClassName("infoNum");
        var imageStr = [];
        for (var i = 0; i < a.length; i++) {
            imageStr[i] = a[i].value;
        }


        var KTMH = b[0].value;
        var CNMH = b[1].value;
        var DPGMH = b[2].value;
        var CAM = b[3].value;
        var QUAY = b[4].value;
        var CHIP = b[5].value;
        var BONHO = b[6].value;

        var name = document.getElementById("name").value;
        var type = document.getElementById("type").value;
        var description = document.getElementById("description").value;
        var brandname = document.getElementById("brand.name").value;
        var brandImage = document.getElementById("brand.brandImage").value;



        userRequest()
            .put(`admin/products/update/${params.id}`, {
                infoNum: [KTMH, CNMH, DPGMH, CAM, QUAY, CHIP, BONHO],
                name: name,
                type: type,
                image: imageStr,
                description: description,
                'brand.name': brandname,
                'brand.brandImage': brandImage,

            })
            .then(() => {
                toast.success("Cập Nhật Thành Công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((err) => {
                toast.error("Đã xảy ra lỗi, cập nhật thất bại", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err)
            });
    };

    return (
        <div className="container mt-4 mb-4">
            <h1 className="text-center heading">Chỉnh sửa thông tin sản phẩm</h1>

            {item.map(item => (
                // <form className="mt-4" method="POST" action={hostServer + "/api/admin/products/update/" + item._id + "?_method=PUT"}>
                <form className="mt-4">
                    <Link to={`/admin/products/updateDetail/${item._id}`} className="btn btn-primary bnt-more">Sửa chi tiết</Link>
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
                                        <textarea className="form-control my-area-tag infoNum" id="infoNum" name="infoNum" defaultValue={infoDetails.infoNum} />
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                    <Link className="btn btn-primary my-bnt bnt-back" to='/admin/products'>Quay lại</Link>
                    <button onClick={handleSubmit} className="btn btn-primary my-bnt">Lưu lại</button>
                </form>
            ))}

        </div>
    );
}

//check for delete image of item
// function CheckImage() {
//     var image = document.getElementsByClassName('image');
//     console.log("oke")
//     for (var i = 0; i < image.length; i++) {
//         if (image[i].value === "") {
//             image[i].name = "";
//             document.getElementsByClassName('image').classList.remove("image")
//         } else {
//             image[i].name = "image";
//         }
//     }
// }

export default UpdateItem;
