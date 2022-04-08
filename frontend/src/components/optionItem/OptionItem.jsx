import React from "react";
import "./OptionItem.scss";
import { Link } from "react-router-dom";
const OptionItem = ({
  name,
  price,
  img,
  alt,
  active,
  link,
  style,
  index,
  clickColor,
}) => {
  const handle = (e) => {
    clickColor(index);
  };
  return (
    <>
      {img ? (
        <div
          className={active ? "item active" : "item"}
          style={style && style}
          onClick={(e) => handle(e)}
        >
          <img src={img} alt={alt} />

          <div className="item__info">
            <p className="item__name">{name}</p>
            <p className="item__price">{price}</p>
          </div>
        </div>
      ) : (
        <Link to={link} style={{ color: "inherit" }}>
          <div
            className={active ? "item active" : "item"}
            style={style && style}
          >
            <div className="item__info">
              <p className="item__name">{name}</p>
              <p className="item__price">{price}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default OptionItem;
