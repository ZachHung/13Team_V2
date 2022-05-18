import React from 'react';
import './addItemDetail.scss';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { storage } from '../../firebase';
import { toast, ToastClassName, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRequest } from "../../utils/CallApi";

const color=[];
const price=[];
const number=[];
const discount=[];
const urlImage=[];
    
var num = 0;
var errorText={};
errorText.errorNumber=[];
var validFlag=true;
var validColor=false,validNumber=false,validPrice=false,validDiscount=false,validImage=false;
function AddOptions() {
    const [formData, setFormData] = useState({});
    const params = useParams();
    const [item, setPhone] = useState(null);
    const [type,setType]=useState("64GB");
    const [slug,setSlug]=useState("");
    const [image,setImage]=useState("");
    // const handleValidColor=(value1)=>{
    //     console.log(value1);
    //     if(value1==null||value1=="")
    //     {
    //         setMsgColor("Màu sắc của thiết bị không được để trống");
    //     }
    // }
    var image1;
  
    useEffect(() => {
        
        userRequest()
        .get("options/" + params.id)
         .then((res) => {
            setSlug(res.data.item.slug);
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

    function handleUpload(c) {
        document.getElementById("isLoading"+c).style.display = "block"
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
        
                        urlImage[c]=url;
                        document.getElementById("image-new"+c).value=url;
                       // document.getElementById("image-new").name = "image";
                        document.getElementById("my-image"+c).style.display = "block";
                        document.getElementById("isLoading"+c).style.display = "none";
                        document.getElementById("imageError"+c).innerText="";
                        validImage=true;
                    });
            }
        );

    }
    
   
   
    const handleInput = (name, value) => {
        console.log(name,value);
        setFormData({ ...formData, [name]: `${value}` });
        console.log(formData);
        console.log(Object.keys(formData));
        //alert(formData);
      };
    
    function Themmausac() {
       
    const c=num;
    validImage=false;
        return (
            
           <div id="array">
               
               <h2>Lựa chọn màu sắc</h2>
            <h5 >Màu sắc</h5>
            <input type="text" className="form-control my-input-tag" id="color" name="color" defaultValue={color[c]}   onBlur={((e)=>{handleChangeColor(e.target.value,c)})}   onChange={(e)=>{handleChangeColor(e.target.value,c)}}  ></input>
            <p className='text-danger thongbaoloi' id={"colorError"+num}></p>
            <div id={'my-image'+num} className='add-image'>
                            <input type="text" className="form-control mt-4 my-input-tag newImage" name="image"  placeholder='Nhập vào đường dẫn' id={"image-new"+num}   defaultValue={urlImage} disabled onBlur={((e)=>{handleChangeimage(e.target.value,c)})}   onChange={(e)=>{handleChangeimage(e.target.value,c)}}  />
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
                                    <a className="btn btn-primary upload-bnt" onClick={(e)=>handleUpload(c)}>Tải lên</a>
                                </div>
                            </div>
                            <p className='text-danger thongbaoloi' id={"imageError"+num}>Vui lòng upload ảnh của sản phẩm</p>
                        </div>
                    
           
            
            <h5>Số lượng sản phẩm</h5>
            
            <input type="number" name="number" className="form-control textareafont" value={number[c]} onBlur={((e)=>{handleChangeNumber(e.target.value,c)})}   onChange={(e)=>{handleChangeNumber(e.target.value,c)}} ></input>
            <p className='text-danger thongbaoloi' id={"numberError"+num}></p>
            <h5>Giá</h5>
            <input type="number" className="form-control textareafont" id="price" name="price" value={price[c]}   onBlur={((e)=>{handleChangePrice(e.target.value,c)})}   onChange={(e)=>{handleChangePrice(e.target.value,c)}} ></input>
            <p className='text-danger thongbaoloi' id={"priceError"+num}></p>
            <h5>Giảm giá(%)</h5>
            <input type="number" className="form-control textareafont" id="discount" name="discount" value={discount[c]}   onBlur={((e)=>{handleChangeDiscount(e.target.value,c)})}   onChange={(e)=>{handleChangeDiscount(e.target.value,c)}}></input>
            <p className='text-danger thongbaoloi' id={"discountError"+num}></p>
        </div>
        )  
         
    }
    const [option1,setOption]=useState([<Themmausac key="0" ></Themmausac>]);

    const handleChangeType=(e)=>{
        setType(e.target.value);
    }
    function handleChangeNumber(e,c){
       // console.log(e);
        if(e==""||e==null)
        {
            number[c]=e;
        document.getElementById("numberError"+c).innerText="Vui lòng điền thông tin số lượng sản phẩm";
        validNumber=false;
        }
        else
        {
        if( parseInt(e)<=0)
        {
            number[c]=e;
            document.getElementById("numberError"+c).innerText="Số lượng sản phẩm phải lớn hơn 0";
            validNumber=false;
        }
        else
        {
            number[c]=e;
        document.getElementById("numberError"+c).innerText="";
        validNumber=true;
        }
         }
    }
    function handleChangeColor(e,c){
       // console.log(e);
        if(e==""||e==null)
        {
            color[c]=e;
       
        document.getElementById("colorError"+c).innerText="Vui lòng điền màu sắc của sản phẩm";
        validColor=false;
        }
        else
        {
            color[c]=e;
        document.getElementById("colorError"+c).innerText="";
        validColor=true;
         }
    }
    function handleChangePrice(e,c){
       // console.log(e);
        if(e==""||e==null)
        {
            price[c]=e;
        document.getElementById("priceError"+c).innerText="Vui lòng điền thông tin số lượng sản phẩm";
        validPrice=false;
        }
        else
        {
        if( parseInt(e)<=0)
        {
            price[c]=e;
            document.getElementById("priceError"+c).innerText="Số tiền sản phẩm phải lớn hơn 0";
            validPrice=false;
        }
        else
        {
            price[c]=e;
        document.getElementById("priceError"+c).innerText="";
        validPrice=true;
        }
         }
    }
    function handleChangeDiscount(e,c){
        //console.log(e);
        if(e==""||e==null)
        {
            discount[c]=e;
        
        document.getElementById("discountError"+c).innerText="Vui lòng điền thông tin giảm giá sản phẩm";
        validDiscount=false;
        }
        else
        {
        if( parseInt(e)<=0||(parseInt(e)>=100))
        {
            discount[c]=e;
            document.getElementById("discountError"+c).innerText="Giảm giá sản phẩm phải lớn hơn 0% và nhỏn hơn 100%";
            validDiscount=false;
        }
        else
        {
            discount[c]=e;
        document.getElementById("discountError"+c).innerText="";
        validDiscount=true;
        }
         }
    }
    function handleChangeimage(e,c){
        //console.log(e);
        if(e==""||e==null)
        {
        document.getElementById("imageError"+c).innerText="Vui lòng upload ảnh của sản phẩm";
        validImage=false;
        }
        else
        {
        document.getElementById("imageError"+c).innerText="";
        validImage=true;
        }    
    }
     function handleSubmit(){
       
     const isValid=validColor&&validDiscount&&validNumber&&validPrice&&validImage;
          if(!isValid) 
          {
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
              return ;
          }
          else
          {
        

        //console.log(color,number,discount,type,urlImage,price);
          userRequest()
          .post("options/"+params.id,{
              slug:slug,color:color,number:number,discount:discount,detail:type,image:urlImage,price:price
          }).then((res) => {
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
        }

        
    }
    
   function Createoption()
   {
    num++;
    var c =<Themmausac key={num}></Themmausac>;
    setOption(option1=>[...option1,c]);
   }
   var e;
   if(item) e=item.slug;
  
    return item? (
         
        <div className='container'>
           
            <h1 className="control-label center "> Thêm Option</h1> 
           
            <form id="createOptioninfo"  >          
            <h3>Tên thiết bị {item.name} </h3>
            <input className="form-control" name='slug' id="slug" defaultValue={item.slug}  hidden ></input>
            <h4>Tùy chọn</h4>
            <h5>Bộ nhớ</h5>
            <select className="form-select form-select-lg mb-3 textareafont" value={type}  name='detail' id="type" onChange={handleChangeType }  >
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
            <button className="btn-primary btn-lg form-control custombtn" id="newoption" type="button" onClick={handleSubmit} >Thêm mới</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>):(
            <div>
        <h1>Loading</h1>
        <ToastContainer></ToastContainer>
        </div>
        
      );

}
export default AddOptions;