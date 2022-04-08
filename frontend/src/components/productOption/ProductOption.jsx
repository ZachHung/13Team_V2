import React, { useState } from "react";
import "./ProductOption.scss";
import OptionItem from "../optionItem/OptionItem";
import ProductBtn from "../productBtn/ProductBtn";

const ProductOption = ({
  capacityOptions,
  colorOptions,
  type,
  idOption,
  changeSlide,
}) => {
  const pathImage = "http://localhost:5000";

  const [color, setColor] = useState(0);

  const handleColor = (index) => {
    setColor(index);
    changeSlide(index);
  };
  return (
    <div className="productOption__container">
      <p>
        <span className="product__newPrice">1.000.000</span>
        <span className="product__oldPrice">1.000.000</span>
      </p>
      <div className="capacityOption">
        {capacityOptions.map((item, index) => (
          <OptionItem
            name={item.detail}
            price="2.000.000đ"
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
              price={item.price}
              img={pathImage + item.image}
              alt={`ảnh màu ${item.name}`}
              style={{ margin: "10px 0 0 0" }}
              key={index}
              index={index}
              active={index === color ? true : false}
              clickColor={handleColor}
            ></OptionItem>
          ))}
        </div>
        <div className="productOption__btn row">
          <div className="col-6">
            <ProductBtn text="Mua Ngay"></ProductBtn>
          </div>
          <div className="col-6">
            <ProductBtn text="Thêm Vào Giỏ"></ProductBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOption;
