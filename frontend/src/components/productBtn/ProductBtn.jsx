import React from "react";
import "./ProductBtn.scss";
const ProductBtn = ({ style, text }) => {
  return (
    <button className="Product__button" style={style && style}>
      {text}
    </button>
  );
};

export default ProductBtn;
