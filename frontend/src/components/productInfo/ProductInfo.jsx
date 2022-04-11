import React from "react";
import TechInfo from "../techInfo/TechInfo";
import "./ProductInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const ProductInfo = ({ infoArray, handleCloseInfo }) => {
  const handleClose = () => {
    handleCloseInfo();
  };
  return (
    <div className="productInfo__container">
      <div className="productInfo">
        <div className="productInfo__head">
          <p className="productInfo__title">Thông Tin Chi Tiết</p>
          <button className="productInfo__close--head" onClick={handleClose}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ margin: "0 5px 0 0" }}
            ></FontAwesomeIcon>
            Đóng
          </button>
        </div>
        <div className="productInfo__body">
          {infoArray.map((item, index) => (
            <div key={index}>
              <p className="productInfo__type">{item.infoType}</p>

              <TechInfo demoArray={item.infoDetail}></TechInfo>
            </div>
          ))}
        </div>
        <div className="productInfo__footer">
          <button className="productInfo__close--footer" onClick={handleClose}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ margin: "0 5px 0 0" }}
            ></FontAwesomeIcon>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
