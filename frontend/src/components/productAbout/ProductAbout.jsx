import React from "react";
import "./ProductAbout.scss";
import TechInfo from "../techInfo/TechInfo";
import ProductBtn from "../productBtn/ProductBtn";

const ProductAbout = () => {
  return (
    <div className="ProductAbout__container">
      <div className="ProductAbout__title">Thông Số Kĩ Thuật</div>
      <TechInfo></TechInfo>
      <ProductBtn text="Xem Thông Tin Chi Tiết"></ProductBtn>
    </div>
  );
};

export default ProductAbout;
