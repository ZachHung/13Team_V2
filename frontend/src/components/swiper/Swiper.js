import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import "./Swiper.scss";
import { publicRequest } from "../../utils/CallApi";

export default ({ updateBrand, updatePrice, type }) => {
  const [brand, setBrand] = useState([]);
  var urlAPI = `/${type}/brand`;
  if (type == "all") {
    urlAPI = `/search/brand`;
  }

  useEffect(() => {
    publicRequest.get(urlAPI).then((res) => {
      setBrand(res.data);
    });
  }, [type]);

  return (
    <div className='filter-product-swiper'>
      <Swiper className='brand-swiper' spaceBetween={10} slidesPerView={4}>
        {brand.map((brand) => (
          <SwiperSlide
            key={brand.name}
            className='slide'
            onClick={() => updateBrand(brand.name)}
          >
            <img src={`${brand.brandImage}`} alt={`logo ${brand.name}`}></img>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper className='price-swiper' spaceBetween={10} slidesPerView={4}>
        <SwiperSlide onClick={() => updatePrice("duoi-2-trieu")}>
          Dưới 2 triệu
        </SwiperSlide>
        <SwiperSlide onClick={() => updatePrice("tu-2-5-trieu")}>
          Từ 2 đến 5 triệu
        </SwiperSlide>
        <SwiperSlide onClick={() => updatePrice("tu-5-14-trieu")}>
          Từ 5 đến 14 triệu
        </SwiperSlide>
        <SwiperSlide onClick={() => updatePrice("tren-14-trieu")}>
          Trên 14 triệu
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
