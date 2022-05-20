import React from 'react';
import './createItem.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from "../../utils/CallApi";
import { userRequest } from "../../utils/CallApi";

import { storage } from '../../firebase';

import { toast, ToastClassName, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePhoneAdminPage() {

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [brandimage, setBrandImage] = useState('');
    const [UrlBrandimage, setUrlBrandImage] = useState('');
    const [decription, setDecription] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [revolution, setRevolution] = useState('');
    const [size, setSize] = useState('');
    const [typescreen, setTypescreen] = useState('');
    const [triple, setTriple] = useState('');
    const [video, setVideo] = useState('');
    const [ram, setRam] = useState('');
    const [cpu, setCpu] = useState('');

    const [errorText, setErrorText] = useState("");
    const [formData, setFormData] = useState({});
    // const [image, setImage] = useState(null);
    const [urlImages, setUrls] = useState([]);
    //Upload anh thuong hieu
    function handleChangeBrandImage(e) {
        if (e.target.files[0])
            setBrandImage(e.target.files[0]);

    }
    const validateNotNull = () => {
        const msg = {};
        if (name == null || name == "") {
            msg.name = "Tên không được để trống";


        }
        setErrorText(msg);



    }
    const validateAll = () => {
        const msg = {};
        if (name == "" || name == null) {
            msg.name = "Tên không được để trống";
        }
        else {
            if (slug == "" || slug == null) {
                msg.slug = "Từ khóa không được viết tắt";
            }
            else {
                if (brand == "" || brand == null) {
                    msg.brand = "Thương hiệu không được để trống";
                }
                else {
                    if (decription == "" || decription == null) {
                        msg.decription = "Mô tả không được để trống";
                    }
                    else {
                        if (size == "" || size == null) {
                            msg.size = "Kích thước màn hình không được để trống";
                        }
                        else {
                            if (typescreen == "" || typescreen == null) {
                                msg.typescreen = "Loại màn hình không được để trống."
                            }
                            else {
                                if (revolution == "" || revolution == null) {
                                    msg.revolution = "Độ phân giải màn hình không được để trống";
                                }
                                else {
                                    if (triple == "" || triple == null || parseInt(triple <= 0)) {
                                        msg.triple = "Số camera không được để trống hoặc không thể nhỏ hơn hoặc bằng 0";
                                    }
                                    else {
                                        if (video == "" || video == null) {
                                            msg.video = "Thông tin về quay video không được để trống";
                                        }
                                        else {
                                            if (cpu == "" || cpu == null) {
                                                msg.cpu = "Chip xử lý không được để trống";
                                            }
                                            else {
                                                var regex = /^\d+[G][B]$/;
                                                if (ram == "" || ram == null || !regex.test(ram)) {
                                                    msg.ram = "Thông tin về ram không được để trống hoặc thông tin không đúng định dạng";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        setErrorText(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const handleUploadBrandImage = e => {

        document.getElementById("isLoading-brand").style.display = "block"
        const uploadTask = storage.ref(`images/${brandimage.name}`).put(brandimage);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(brandimage.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setFormData({ ...formData, ["brandimage"]: `${url}` });
                        setUrlBrandImage(url);

                        //console.log(UrlBrandimage);
                        //setFormData({...formData,["brandimage"]:`${UrlBrandimage}`});
                        //console.log(formData);
                        // console.log(formData);

                        document.getElementById("image-new-brand").name = "brandimage";
                        document.getElementById("my-image-brand").style.display = "block";
                        document.getElementById("isLoading-brand").style.display = "none";
                    });
            }
        );
    }
    //Upload anh
    const handleChange = e => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    }

    const handleUpload = e => {
        const promises = [];
        images.map((image) => {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(urls => {
                            console.log(urls);

                            handleInput("image", urls);
                            setUrls((prevState) => [...prevState, urls]);

                            document.getElementById("image-new").name = "image";
                            document.getElementById("my-image").style.display = "block";
                            document.getElementById("isLoading").style.display = "none"
                        });
                }
            );
        })
        document.getElementById("isLoading").style.display = "block"
        Promise.all(promises)

            .then(() => alert("Tất cả ảnh được upload"))
            .catch((err) => console.log(err))
        // console.log("urls: ", urlImages);
        // console.log("imges", images);
        // console.log("urls length",urlImages.length);
        // console.log("urls thu o la  ", urlImages[0]);
    }

    const handleInput = (name, value) => {
        setErrorText("");
        //console.log(name,value);
        setFormData({ ...formData, [name]: `${value}` });


    };
    //console.log(formData);
    //console.log(Object.keys(formData));
    const handleSubmit = (e) => {
        const isValid = validateAll();
        if (!isValid) {
            //alert("Vui lòng điền đủ thông ");
            toast.error("Vui Lòng Điền Đầy Đủ Thông Tin", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        e.preventDefault();
        setFormData({ ...formData, ['image']: urlImages });

        alert(formData);

        //dispatch(loginStart());
        userRequest()
            .post("admin/products", formData).then((res) => {
                console.log(res.data);

                toast.success("Thêm Thành Công", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(res.data.message);




            })
            .catch((res) => {
                console.log(res);
                toast.error('Không thêm sản phẩm được!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });

    };
    const handleChangeType = e => {
        // console.log(e.target.value);
        setType(e.target.value);
        // console.log("Giá trị của type",type);
        handleInput("type", e.target.value);
    }

    return (
        <div className='container'>
            <h1 className="control-label">THÊM SẢN PHẨM MỚI </h1>
            {/* method="POST" action="http://localhost:5000/api/admin/products" */}
            <form id="createPhoneinfo">
                <div className="form-group">
                    <label className="form-label">Tên sản phẩm</label>

                    <input type="text" id="name" name='name' value={name} className="form-control my-input-tag " onBlur={validateAll} onChange={(e) => { setName(e.target.value); handleInput("name", e.target.value); }} />
                    <p className='text-danger thongbaoloi'>{errorText.name}</p>
                    <label className="form-label" name='slug' >Slug</label>
                    <input type="text" id="slug" name="slug" value={slug} onBlur={validateAll} onChange={(e) => { setSlug(e.target.value); handleInput("slug", e.target.value); }} className="form-control input-lg my-input-tag" />
                </div>
                <p className='text-danger thongbaoloi'>{errorText.slug}</p>
                <label className="form-label label-select my-input-tag">Chọn loại sản phẩm </label>
                <select className="type_device my-input-tag" name='type' id="type" value={type} onChange={handleChangeType}  >
                    <option value="phone">Phone</option>
                    <option value="tablet">Tablet</option>
                    <option value="laptop">Laptop</option>
                    <option value="acessory">Accessory</option>
                </select>
                <h2 className='form-label themmargin' >Thương hiệu</h2>
                <label className='form-label' >Tên thương hiệu</label>
                <input type="text" name='brand' placeholder='Apple' id="brand" className="form-control my-input-tag" onBlur={validateAll} value={brand} onChange={(e) => { setBrand(e.target.value); handleInput("brand", e.target.value) }}  ></input>
                <p className='text-danger thongbaoloi'>{errorText.brand}</p>

                <div id='my-image-brand' className='add-image-brand'>
                    <input type="text" className="form-control mt-4 my-input-tag newImage-brand" defaultValue={UrlBrandimage} placeholder='Nhập vào đường dẫn' id="image-new-brand" />


                </div>
                <div className="col">
                    <a className="btn btn-primary upload-bnt" onClick={handleUploadBrandImage}>Tải lên</a>
                </div>


                        <div className="mb-4 mt-4">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh thương hiệu</label>
                                    <input className="form-control my-input-tag" type="file"   onChange={handleChangeBrandImage}  />
                                    
                                </div>
                                <div className="col">
                                    <a className="btn btn-primary upload-bnt" onClick={handleUploadBrandImage}>Tải lên</a>
                                </div>
                            </div>
                        </div>
                    
                <div className="mb-3">
                    <label  className="form-label">Mô tả sản phẩm</label>
                    <textarea className="form-control textareafont" id="description" rows="3" name='decription' onBlur={validateAll} value={decription} onChange={(e)=>{setDecription(e.target.value);handleInput("decription",e.target.value);}}  ></textarea>
                    <p className='text-danger thongbaoloi'>{errorText.decription}</p>
                </div>
                <div id='my-image' className='add-image'>
                            <input type="text" className="form-control mt-4 my-input-tag newImage" defaultValue={urlImages} onChange={(e)=>{handleInput("image",e.target.value)}} placeholder='Nhập vào đường dẫn' id="image-new" />
                        </div>
                        <div id='isLoading' className='mt-4 add-info' >
                            <h3 className='text-center'>Đang tải...</h3>
                        </div>

                        <div className="mb-4 mt-4">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh sản phẩm</label>
                                    <input className="form-control my-input-tag" type="file" onChange={handleChange} multiple={true} />
                                </div>
                                <div className="col">
                                    <a className="btn btn-primary upload-bnt" onClick={handleUpload}>Tải lên</a>
                                </div>
                            </div>
                        </div>
                
                <h2>Thông tin về công nghệ</h2>
                <h3  >Thông tin màn hình</h3>
                
                <label className='form-label' >Kích thước màn hình</label>
                <input type="text" className="form-control textareafont" id="size" name='size' onBlur={validateAll} value={size} onChange={(e)=>{setSize(e.target.value);handleInput("size",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.size}</p>
                <label className='form-label' >Công nghệ màn hình</label>
                <input type="text" className="form-control textareafont" id="typescreen" name='typescreen' onBlur={validateAll} value={typescreen} onChange={(e)=>{setTypescreen(e.target.value);handleInput("typescreen",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.typescreen}</p>
                <label className='form-label' >
                    Độ phân giải
                </label>
                <input type="text" className="form-control textareafont" id="revolution" name='resolution' onBlur={validateAll} value={revolution} onChange={(e)=>{setRevolution(e.target.value);handleInput("resolution",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.revolution}</p>
                <h3>Camera Sau</h3>
                <label className='form-label' >Số camera</label>
                <input type="number" className="form-control textareafont" id="triple" name='triple' onBlur={validateAll} value={triple} onChange={(e)=>{setTriple(e.target.value);handleInput("triple",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.triple}</p>
                <label className='form-label' >Quay video</label>
                <input type="text"className="form-control textareafont" id="video" name='video' onBlur={validateAll} value={video} onChange={(e)=>{setVideo(e.target.value);handleInput("video",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.video}</p>
                <label className='form-label' >CPU</label>
                <input type="text"className="form-control textareafont"  id="cpu" name='cpu' onBlur={validateAll} value={cpu} onChange={(e)=>{setCpu(e.target.value);handleInput("cpu",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.cpu}</p>
                <label className='form-label' >Ram</label>
                
                <input type="text"className="form-control textareafont"  placeholder='4GB' id="ram" name='ram' onBlur={validateAll} value={ram} onChange={(e)=>{setRam(e.target.value);handleInput("ram",e.target.value);}} ></input>
                <p className='text-danger thongbaoloi'>{errorText.ram}</p>
                <button type='button' className="btn btn-primary btn-lg btn-block form-control" onClick={handleSubmit} >Thêm sản phẩm mới</button>
            </form >
        <ToastContainer></ToastContainer>

        </div >

    );
}

export default CreatePhoneAdminPage;