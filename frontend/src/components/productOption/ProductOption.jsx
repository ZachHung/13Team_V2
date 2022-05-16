import React, { useEffect, useState } from "react";
import "./ProductOption.scss";
import OptionItem from "../optionItem/OptionItem";
import ProductBtn from "../productBtn/ProductBtn";
import { currentChange } from "../../utils/const";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../utils/CallApi";
import { addQuantity } from "../../redux/cart";
import { toast } from "react-toastify";
const ProductOption = ({
  capacityOptions,
  colorOptions,
  type,
  idOption,
  changeSlide,
}) => {
  const pathImage = process.env.REACT_APP_SERVER_PATH;
  const user = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Price = (item) => {
    let price = ((100 - item.discount) * item.price) / 100;
    price = currentChange(price);
    return price;
  };
  const [color, setColor] = useState(colorOptions.length);
  const [colorValue, setColorValue] = useState(colorOptions[0].name);
  const [newPrice, setNewPrice] = useState(Price(colorOptions[0]));
  const [oldPrice, setOldPrice] = useState(
    currentChange(colorOptions[0].price)
  );

  const handleColor = (index, newPrice, oldPrice, colorValue) => {
    setColor(index);
    changeSlide(index);
    setNewPrice(newPrice);
    setOldPrice(oldPrice);
    setColorValue(colorValue);
  };
  const handleCapcity = (index) => {
    setColorValue(colorOptions[index].name);
    setColor(index);
    changeSlide(index);
  };
  useEffect(() => {
    setColor(colorOptions.length);
    for (let i = 0; i < colorOptions.length; i++) {
      if (colorOptions[i].number !== 0) {
        handleCapcity(i);

        break;
      }
    }
  }, [idOption]);

  const handleAddCart = () => {
    user
      ? userRequest()
          .post(`cart/add/${user._id}`, {
            optionID: idOption,
            color: colorValue,
          })
          .then((res) => {
            toast.success("Thêm Vào Giỏ Hàng Thành Công", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(addQuantity());
          })
          .catch((err) => {
            console.log(err);
          })
      : navigate("/login");
  };
  const handleBuy = () => {
    user
      ? userRequest()
          .post(`cart/add/${user._id}`, {
            optionID: idOption,
            color: colorValue,
          })
          .then((res) => {
            navigate("/cart");
          })
          .catch((err) => {
            console.log(err);
          })
      : navigate("/login");
  };
  return (
    <div className="productOption__container">
      <p>
        <span className="product__newPrice">{newPrice}</span>
        <span className="product__oldPrice">{oldPrice}</span>
      </p>
      <div className="capacityOption">
        {capacityOptions.map((item, index) => (
          <OptionItem
            name={item.detail}
            newPrice={Price(item.color[0])}
            link={`/${type}/${item.slug}-${item.detail}`}
            key={index}
            style={{ margin: "10px 0 0 0 " }}
            active={item._id === idOption ? true : false}
          ></OptionItem>
        ))}
      </div>
      <div className="colorOption__container">
        <p className="colorOption__title">Chọn Màu</p>
        <div className="colorOption">
          {colorOptions.map((item, index) => (
            <OptionItem
              name={item.name}
              newPrice={Price(item)}
              oldPrice={currentChange(item.price)}
              img={pathImage + item.image}
              alt={`ảnh màu ${item.name}`}
              style={{ margin: "10px 0 0 0" }}
              key={index}
              index={index}
              number={item.number}
              active={index === color ? true : false}
              disable={item.number === 0 ? true : false}
              clickColor={handleColor}
            ></OptionItem>
          ))}
        </div>
        <div className="productOption__btn row">
          <div className="col-6">
            <ProductBtn text="Mua Ngay" clickEvent={handleBuy}></ProductBtn>
          </div>
          <div className="col-6">
            <ProductBtn
              text="Thêm Vào Giỏ"
              clickEvent={handleAddCart}
            ></ProductBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOption;
