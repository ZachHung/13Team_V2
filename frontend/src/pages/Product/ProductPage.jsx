import React, { useRef } from "react";
import { useLocation, useParams, useRoutes } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Path from "../../components/Path/Path";
import ProductSwiper from "../../components/productSwiper/ProductSwiper";
import ProductOption from "../../components/productOption/ProductOption";
import ProductSame from "../../components/productSame/ProductSame";
import ProductAbout from "../../components/productAbout/ProductAbout";
import { publicRequest } from "../../utils/CallApi";
import { useEffect, useState } from "react";
import "./ProductPage.scss";

const ProductPage = () => {
  const location = useLocation();
  const [data, setData] = useState();
  let route = location.pathname;
  route = route.slice(1, route.length);
  const SwiperChild = useRef();
  const changeSlide = (index) => {
    SwiperChild.current
      .getElementsByClassName("swiper")[0]
      .swiper.slideTo(index, 1000);
  };
  useEffect(() => {
    publicRequest.get(`${route}`).then((res) => {
      setData(res.data);
    });
  }, [route]);

  return !data ? (
    <></>
  ) : (
    <>
      <Header color="#f5f5f5" />
      <Path path={data.path}></Path>
      <div className="product__container">
        <div className="product">
          <div className="product__name">
            <h1>{data.item.name}</h1>
          </div>
          <div className="product__detail">
            <div className="product__swiper" ref={SwiperChild}>
              <ProductSwiper swiperArray={data.color}></ProductSwiper>
            </div>
            <div className="product__options">
              <ProductOption
                capacityOptions={data.options}
                colorOptions={data.color}
                type={data.item.type}
                idOption={data.idOption}
                changeSlide={changeSlide}
              ></ProductOption>
            </div>
            <div className="product__about">
              <ProductAbout></ProductAbout>
            </div>
          </div>
        </div>
      </div>
      <ProductSame></ProductSame>
      <Footer color="#f5f5f5" />
    </>
  );
};

export default ProductPage;
