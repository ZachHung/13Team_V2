import React from "react";
import "./OptionItem.scss";
import { Link } from "react-router-dom";
const OptionItem = ({
  name,
  newPrice,
  oldPrice,
  img,
  alt,
  active,
  link,
  style,
  index,
  clickColor,
  number,
  disable,
}) => {
  const handleColor = (e) => {
    if (number !== 0) clickColor(index, newPrice, oldPrice, name);
  };

  return (
    <>
      {img ? (
        <div
          className={`item ${active && "active"} ${disable && "disable"}`}
          style={style && style}
          onClick={(e) => handleColor(e)}
          num={number}
        >
          <img src={img} alt={alt} />

          <div className="item__info">
            <p className="item__name">{name}</p>
            <p className="item__price">{newPrice}</p>
          </div>
        </div>
      ) : (
        <Link to={link} style={{ color: "inherit" }}>
          <div
            className={active ? "item active" : "item"}
            style={style && style}
          >
            <div className="item__info ">
              <p className="item__name">{name}</p>
              <p className="item__price">{newPrice}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default OptionItem;
