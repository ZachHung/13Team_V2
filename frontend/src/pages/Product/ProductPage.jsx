import React, { useRef } from "react";
import { useLocation, useParams, useRoutes } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Path from "../../components/Path/Path";
import ProductSwiper from "../../components/productSwiper/ProductSwiper";
import ProductOption from "../../components/productOption/ProductOption";
import ProductSame from "../../components/productSame/ProductSame";
import ProductAbout from "../../components/productAbout/ProductAbout";
import ProductInfo from "../../components/productInfo/ProductInfo";
import { publicRequest } from "../../utils/CallApi";
import { useEffect, useState } from "react";
import "./ProductPage.scss";

const ProductPage = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const [openInfo, setOpenInfo] = useState(false);
  const SwiperChild = useRef();
  let route = location.pathname;
  route = route.slice(1, route.length);
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
  const handleOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
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
            <div className="product__swiper col-md-4" ref={SwiperChild}>
              <ProductSwiper swiperArray={data.color}></ProductSwiper>
            </div>
            <div className="product__options col-md-4">
              <ProductOption
                capacityOptions={data.options}
                colorOptions={data.color}
                type={data.item.type}
                idOption={data.idOption}
                changeSlide={changeSlide}
              ></ProductOption>
            </div>
            <div className="product__about col-md-4">
              <ProductAbout
                demoArray={data.demoinfo}
                handleOpenInfo={handleOpenInfo}
              ></ProductAbout>
            </div>
          </div>
        </div>
      </div>
      <ProductSame sameArray={data.sameItem}></ProductSame>
      {openInfo && (
        <ProductInfo
          infoArray={data.item.techInfo}
          handleCloseInfo={handleCloseInfo}
        ></ProductInfo>
      )}

      <Footer color="#f5f5f5" />
    </>
  );
};

export default ProductPage;
