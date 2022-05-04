import React from 'react';
import './addItemDetail.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { storage } from '../../firebase';
const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
});
function AddOptions() {

    const params = useParams();
    const [item, setPhone] = useState(null);
    const [image, setImage] = useState(null);
    const [urlImage, setUrl] = useState([]);
    var image1;

    useEffect(() => {
        
              api.get("options/" + params.id)
         .then((res) => {
            setPhone(res.data.item);
            //console.log(res.data.items);
        })
        .catch(err=>{console.log(err)})
 
    },[]);
    
    const  handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            image1=e.target.files[0];
        }
    }

    function handleUpload(e) {
        document.getElementById("isLoading"+num).style.display = "block"
        const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image1.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        //setUrl({...urlImage,url});
                        setUrl((prevState)=>[...prevState,url]);
                        console.log(urlImage);
                        document.getElementById("image-new"+num).value=url;
                       // document.getElementById("image-new").name = "image";
                        document.getElementById("my-image"+num).style.display = "block";
                        document.getElementById("isLoading"+num).style.display = "none";
                    });
            }
        );

    }
    // const [detail, setDetail] = useState("");
    // const [detail, setDetail] = useState("");
    // const [detail, setDetail] = useState("");
    // const [detail, setDetail] = useState("");
    var num = 0;
    

    function Themmausac() {
    var c=num;
        
        
        return (
           <div id="array">
               <h2>Lựa chọn màu sắc</h2>
            <h5 >Màu sắc</h5>
            <input type="text" className="form-control" id="color" name="color"></input>
            <div id={'my-image'+num} className='add-image'>
                            <input type="text" className="form-control mt-4 my-input-tag newImage" name="image"  placeholder='Nhập vào đường dẫn' id={"image-new"+num} />
                        </div>
                        <div id={'isLoading'+num} className='mt-4 add-info' >
                            <h3 className='text-center'>Đang tải...</h3>
                        </div>

                        <div className="mb-4 mt-4">
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="formFile" className="label_level_2">Thêm hình ảnh màu sản phẩm</label>
                                    <input className="form-control my-input-tag" type="file" onChange={handleChange} />
                                </div>
                                <div className="col">
                                    <a className="btn btn-primary upload-bnt" onClick={handleUpload}>Tải lên</a>
                                </div>
                            </div>
                        </div>
                    
            {/* <h5>Ảnh</h5>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="imagecolor" name="image" aria-describedby="inputGroupFileAddon01" accept="image/*" />
                <label className="custom-file-label" ></label>
            </div> */}
            
            <h5>Số lượng sản phẩm</h5>
            <input type="number" name="number" className="form-control textareafont" id="price"></input>
            <h5>Giá</h5>
            <input type="number" className="form-control textareafont" id="price" name="price"></input>
            <h5>Giảm giá</h5>
            <input type="number" className="form-control textareafont" id="discount" name="discount"></input>
        </div>
        )  

    }
    const [option1,setOption]=useState([<Themmausac key="0" ></Themmausac>]);
//    const c=[
//    <Themmausac key="0" ></Themmausac>

//    ]
   function Createoption()
   {
    num++;
    var c =<Themmausac key={num}></Themmausac>;
    setOption(option1=>[...option1,c]);
   }
   var c;
   if(item) c=item.slug;
  
    return item? (
         
        <div className='container'>
            <h1 className="control-label center "> Thêm Option</h1> 
            <form id="createOptioninfo" method="POST" action={"http://localhost:5000/api/options/" + params.id} >
                                    
            <h3>Tên thiết bị {item.name} </h3>
            <input className="form-control" name='slug' id="slug" value={item.slug}  hidden ></input>
            <h4>Tùy chọn</h4>
            <h5>Bộ nhớ</h5>
            <select className="form-select form-select-lg mb-3 textareafont" name='detail' id="type"  >
                <option defaultValue={"64GB"} >64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
                <option value="1TB">1TB</option>
            </select>
           
            {option1}
            <div className="stage">
            <button className='btnoption'  onClick={Createoption} type="button">Thêm option</button>
            </div>
            <button className="btn-primary btn-lg form-control custombtn" id="newoption" type="submit" >Thêm mới</button>
            </form>
        </div>):(
        <h1>Loading</h1>
      );

}
export default AddOptions;