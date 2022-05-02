import React from 'react';
import './createItem.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from "../../utils/CallApi";
import { storage } from '../../firebase';
const api = axios.create ({
    baseURL: 'http://localhost:5000/api',
  });
function CreatePhoneAdminPage() {
    
    const [name,setName]=useState('');
    const [slug,setSlug]=useState('');
    const [type,setType]=useState('');
    const[brand,setBrand]=useState('');
    const[brandimage,setBrandImage]=useState('');
    const[UrlBrandimage,setUrlBrandImage]=useState('');
    const [decription,setDecription]=useState('');
    const [image, setImage]=useState('');
    const [images, setImages]=useState([]);
    const [display,setDisplay]=useState('');
    const [revolution,setRevolution]=useState('');
    const [size, setSize]=useState('');
    const [typescreen,setTypescreen]=useState('');
    const [triple,setTriple]=useState('');
    const [video,setVideo]=useState('');
    const [ram,setRam]=useState('');
    const [cpu,setCpu]=useState('');
    const [errorText, setErrorText] = useState("");
    const [formData, setFormData] = useState({});
   // const [image, setImage] = useState(null);
    const [urlImages, setUrls] = useState([]);
    //Upload anh thuong hieu
    function handleChangeBrandImage(e) {
        if (e.target.files[0])
        setBrandImage(e.target.files[0]);
        
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
                        setUrlBrandImage(url);
                        setFormData({...formData,["brandimage"]:`${UrlBrandimage}`});
                        document.getElementById("image-new-brand").name = "brandimage";
                        document.getElementById("my-image-brand").style.display = "block";
                        document.getElementById("isLoading-brand").style.display = "none";
                    });
            }
        );
    }
    //Upload anh
    const handleChange = e => {
        for(let i=0;i<e.target.files.length;i++)
        {
            const newImage=e.target.files[i];
            newImage["id"]=Math.random();
            setImages((prevState)=>[...prevState,newImage]);
        }
    }
    
    const handleUpload = e => {
        const promises=[];
        images.map((image)=>{
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                async  () => {
                    await storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(urls => {
                            console.log(urls);
                            setUrls((prevState)=>[...prevState,urls]);
                            document.getElementById("image-new").name = "image";
                            document.getElementById("my-image").style.display = "block";
                            document.getElementById("isLoading").style.display = "none"
                        });
                }
            );
        })
        document.getElementById("isLoading").style.display = "block"
        Promise.all(promises)
        .then(()=>alert("Tất cả ảnh được upload"))
        .catch((err)=>console.log(err))
        console.log("urls: ", urlImages);
        console.log("imges", images);
        console.log("urls length",urlImages.length);
        console.log("urls thu o la  ", urlImages[0]);
    }
    
    const handleInput = (name, value) => {
        setErrorText("");
        setFormData({ ...formData, [name]: `${value}` });
      };
      const handleSubmit = (e) => {
        //e.preventDefault();
        setFormData({...formData,['image']:urlImages});
        
        console.log(formData);
        
          //dispatch(loginStart());
          api.post("/createItems").then((res) => {
              console.log(res.data);
              if (res.status === 202) {
                setErrorText(res.data.message);
                console.log(res.data.message);
              } else {
                console.log(res.data);
                
                
              }
            })
            .catch((res) => {
              console.log(res);
            });
        
      };
    return (
        <div className='container'>
            <h1 className="control-label">THÊM SẢN PHẨM MỚI </h1>
            <form id="createPhoneinfo" method="POST" action="http://localhost:5000/api/admin/products" >
                <div className="form-group">
                    <label className="form-label">Tên sản phẩm</label>
                    <input type="text" id="name" name='name' value={name} className="form-control my-input-tag " onChange={(e)=>setName(e.target.value)}  getInput={handleInput} />
                    <label  className="form-label" name='slug' >Slug</label>
                    <input type="text" id="slug" name="slug"   value={slug} onChange={(e)=>setSlug(e.target.value)} className="form-control input-lg my-input-tag" />
                </div>
                <label className="form-label label-select">Chọn loại sản phẩm </label>
                <select className="type_device" name='type'  id="type" value={type} onChange={(e)=>setType(e.target.value)}  getInput={handleInput}>
                    <option value="Phone">Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Acessory">Accessory</option>
                </select>
                <h2 className='form-label themmargin' >Thương hiệu</h2>
                <label className='form-label' >Tên thương hiệu</label>
                <input type="text" name='brand' placeholder='Apple' id="brand"  className="form-control my-input-tag" value={brand} onChange={(e)=>setBrand(e.target.value)}  getInput={handleInput}></input>
                {/* <label className="form-label label-select">Chọn ảnh của thương hiệu </label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >Tải lên</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input"  name='brandimage' value={brandimage} onChange={(e)=>setBrandImage(e.target.value)} id="image" aria-describedby="inputGroupFileAddon01"  accept="image/*"/>
                            <label className="custom-file-label"  getInput={handleInput}>Choose file</label>
                    </div>
                </div> */}
                {/*  */}
                <div id='my-image-brand' className='add-image-brand'>
                            <input type="text" className="form-control mt-4 my-input-tag newImage-brand" defaultValue={UrlBrandimage} placeholder='Nhập vào đường dẫn' id="image-new-brand" />
                        </div>
                        <div id='isLoading-brand' className='mt-4 add-info' >
                            <h3 className='text-center'>Đang tải...</h3>
                        </div>

                        <div className="mb-4 mt-4">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh thương hiệu</label>
                                    <input className="form-control my-input-tag" type="file"  onChange={handleChangeBrandImage}  />
                                </div>
                                <div className="col">
                                    <a className="btn btn-primary upload-bnt" onClick={handleUploadBrandImage}>Tải lên</a>
                                </div>
                            </div>
                        </div>
                    
                <div className="mb-3">
                    <label  className="form-label">Mô tả sản phẩm</label>
                    <textarea className="form-control textareafont" id="description" rows="3" name='decription' value={decription} onChange={(e)=>setDecription(e.target.value)} getInput={handleInput} ></textarea>
                </div>
                <div id='my-image' className='add-image'>
                            <input type="text" className="form-control mt-4 my-input-tag newImage" defaultValue={urlImages} placeholder='Nhập vào đường dẫn' id="image-new" />
                        </div>
                        <div id='isLoading' className='mt-4 add-info' >
                            <h3 className='text-center'>Đang tải...</h3>
                        </div>

                        <div className="mb-4 mt-4">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh sản phẩm</label>
                                    <input className="form-control my-input-tag" type="file" onChange={handleChange} multiple="true" />
                                </div>
                                <div className="col">
                                    <a className="btn btn-primary upload-bnt" onClick={handleUpload}>Tải lên</a>
                                </div>
                            </div>
                        </div>
                 {/* <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Tải lên</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" name='image' value={image} onChange={(e)=>setImage(e.target.value)} id="image"  multiple="multiple" aria-describedby="inputGroupFileAddon01"  accept="image/*"/>
                            <label className="custom-file-label"  getInput={handleInput}>Choose file</label>
                    </div>
                </div> */}
                <h2>Thông tin về công nghệ</h2>
                <label className='form-label' >Công nghệ màn hình</label>
                <input type="text" className="form-control textareafont" id="Display" name='display' value={display} onChange={(e)=>setDisplay(e.target.value)}  getInput={handleInput}></input>
                <label className='form-label' >Kích thước màn hình</label>
                <input type="text" className="form-control textareafont" id="size" name='size' value={size} onChange={(e)=>setSize(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >Công nghệ màn hình</label>
                <input type="text" className="form-control textareafont" id="typescreen" name='typescreen' value={typescreen} onChange={(e)=>setTypescreen(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >
                    Độ phân giải
                </label>
                <input type="text" className="form-control textareafont" id="revolution" name='resolution' value={revolution} onChange={(e)=>setRevolution(e.target.value)} getInput={handleInput}></input>
                <h3>Camera Sau</h3>
                <label className='form-label' >Số camera</label>
                <input type="text" className="form-control textareafont" id="triple" name='triple' value={triple} onChange={(e)=>setTriple(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >Quay video</label>
                <input type="text"className="form-control textareafont" id="video" name='video' value={video} onChange={(e)=>setVideo(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >CPU</label>
                <input type="text"className="form-control textareafont" id="cpu" name='cpu' value={cpu} onChange={(e)=>setCpu(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >Ram</label>
                
                <input type="text"className="form-control textareafont" id="ram" name='ram' value={ram} onChange={(e)=>setRam(e.target.value)} getInput={handleInput}></input>
                <button type="submit" className="btn btn-primary btn-lg btn-block form-control" onClick={handleSubmit} >Thêm sản phẩm mới</button>
            </form>
            
        </div>
        
    );
}

export default CreatePhoneAdminPage;