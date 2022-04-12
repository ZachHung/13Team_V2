import React from 'react';
import './createItem.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from "../../utils/CallApi";
const api = axios.create ({
    baseURL: 'http://localhost:5000/api',
  });
function CreatePhoneAdminPage() {
    
    const [name,setName]=useState('');
    const [slug,setSlug]=useState('');
    const [type,setType]=useState('');
    const[brand,setBrand]=useState('');
    const[brandimage,setBrandImage]=useState('');
    const [decription,setDecription]=useState('');
    const [image, setImage]=useState('');
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
    const handleInput = (name, value) => {
        setErrorText("");
        setFormData({ ...formData, [name]: `${value}` });
      };
      const handleSubmit = (e) => {
        //e.preventDefault();
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
                    <input type="text" id="slug" name="slug"   value={slug} onChange={(e)=>setSlug(e.target.value)} className="form-control input-lg" />
                </div>
                <select className="type_device" name='type'  id="type" value={type} onChange={(e)=>setType(e.target.value)}  getInput={handleInput}>
                    <option disabled  >Loại sản phẩm</option>
                    <option value="Phone">Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Acessory">Accessory</option>
                </select>
                <h2 className='form-label themmargin' >Thương hiệu</h2>
                <label className='form-label' >Tên thương hiệu</label>
                <input type="text" name='brand' placeholder='Apple' id="brand"  className="form-control" value={brand} onChange={(e)=>setBrand(e.target.value)}  getInput={handleInput}></input>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >Tải lên</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" name='brandimage' value={brandimage} onChange={(e)=>setBrandImage(e.target.value)} id="image" aria-describedby="inputGroupFileAddon01"  accept="image/*"/>
                            <label className="custom-file-label"  getInput={handleInput}>Choose file</label>
                    </div>
                </div>


                <div className="mb-3">
                    <label  className="form-label">Mô tả sản phẩm</label>
                    <textarea className="form-control" id="description" rows="3" name='decription' value={decription} onChange={(e)=>setDecription(e.target.value)} getInput={handleInput} ></textarea>
                </div>
                <label className='form-label' >Hình ảnh sản phẩm</label>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Tải lên</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" name='image' value={image} onChange={(e)=>setImage(e.target.value)} id="image"  multiple="multiple" aria-describedby="inputGroupFileAddon01"  accept="image/*"/>
                            <label className="custom-file-label"  getInput={handleInput}>Choose file</label>
                    </div>
                </div>
                <h2>Thông tin về công nghệ</h2>
                <label className='form-label' >Công nghệ màn hình</label>
                <input type="text" className="form-control" id="Display" name='display' value={display} onChange={(e)=>setDisplay(e.target.value)}  getInput={handleInput}></input>
                <label className='form-label' >Kích thước màn hình</label>
                <input type="text" className="form-control" id="size" name='size' value={size} onChange={(e)=>setSize(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >Công nghệ màn hình</label>
                <input type="text" className="form-control" id="typescreen" name='typescreen' value={typescreen} onChange={(e)=>setTypescreen(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >
                    Độ phân giải
                </label>
                <input type="text" className="form-control" id="revolution" name='resolution' value={revolution} onChange={(e)=>setRevolution(e.target.value)} getInput={handleInput}></input>
                <h3>Camera Sau</h3>
                <label className='form-label' >Số camera</label>
                <input type="text" className="form-control" id="triple" name='triple' value={triple} onChange={(e)=>setTriple(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >Quay video</label>
                <input type="text"className="form-control" id="video" name='video' value={video} onChange={(e)=>setVideo(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >CPU</label>
                <input type="text"className="form-control" id="cpu" name='cpu' value={cpu} onChange={(e)=>setCpu(e.target.value)} getInput={handleInput}></input>
                <label className='form-label' >Ram</label>
                
                <input type="text"className="form-control" id="ram" name='ram' value={ram} onChange={(e)=>setRam(e.target.value)} getInput={handleInput}></input>
                <button type="submit" className="btn btn-primary btn-lg btn-block form-control" onClick={handleSubmit} >Thêm sản phẩm mới</button>
            </form>
            
        </div>
        
    );
}

export default CreatePhoneAdminPage;