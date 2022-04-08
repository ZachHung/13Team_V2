import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "./ProductSame.scss";
const ProductSame = () => {
  return (
    <div className="productSame__container">
      <p className="productSame__title">Sản Phẩm Tương tự</p>
      <div>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
              <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
            </Link>

            <div className="product__info">
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <p className="product__name">Realme C11(2021)</p>
              </Link>
              <p>
                <span className="product__newPrice">10.000.000đ</span>
                <span className="product__oldPrice">10.000.000đ</span>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="http://localhost:5000/image/apple/iphone11/iphone11_purple.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSame;
