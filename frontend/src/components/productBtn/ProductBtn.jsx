import React from "react";
import "./ProductBtn.scss";
const ProductBtn = ({ style, text, clickEvent }) => {
  const handleClick = () => {
    clickEvent();
  };
  return (
    <button
      className="Product__button"
      style={style && style}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ProductBtn;
