import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { currentChange } from "../../utils/const";
import "./ProductSame.scss";
const ProductSame = ({ sameArray }) => {
  const pathImage = process.env.REACT_APP_SERVER_PATH;
  const Price = (item) => {
    let price = ((100 - item.discount) * item.price) / 100;
    price = currentChange(price);
    return price;
  };
  return (
    <div className='productSame__container'>
      <p className='productSame__title'>Sản Phẩm Tương tự</p>
      <div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className='mySwiper'
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}>
          {sameArray.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/${item.type}/${item.slug}-${item.options[0].detail}`}>
                <img src={pathImage + item.options[0].color[0].image} />
              </Link>

              <div className='product__info'>
                <Link
                  to='/'
                  style={{ color: "inherit", textDecoration: "none" }}>
                  <p className='product__name'>{item.name}</p>
                </Link>
                <p>
                  <span className='product__newPrice'>
                    {Price(item.options[0].color[0])}
                  </span>
                  <span className='product__oldPrice'>
                    {currentChange(item.options[0].color[0].price)}
                  </span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSame;
