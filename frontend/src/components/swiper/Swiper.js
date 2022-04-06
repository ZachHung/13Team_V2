import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Swiper.scss';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default ({ updateBrand, updatePrice }) => {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    api.get('/phone/brand').then((res) => {
      setBrand(res.data);
    });
  }, []);

  return (
    <div className="filter-product">
      <Swiper className="brand-swiper" spaceBetween={10} slidesPerView={4}>
        {brand.map((brand) => (
          <SwiperSlide
            key={brand.name}
            className="slide"
            onClick={() => updateBrand(brand.name)}
          >
            <img
              src={`http://localhost:5000/${brand.brandImage}`}
              alt={`logo ${brand.name}`}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper className="price-swiper" spaceBetween={10} slidesPerView={4}>
        <SwiperSlide onClick={() => updatePrice('duoi-2-trieu')}>
          Dưới 2 triệu
        </SwiperSlide>
        <SwiperSlide onClick={() => updatePrice('tu-2-5-trieu')}>
          Từ 2 đến 5 triệu
        </SwiperSlide>
        <SwiperSlide onClick={() => updatePrice('tu-5-14-trieu')}>
          Từ 5 đến 14 triệu
        </SwiperSlide>
        <SwiperSlide onClick={() => updatePrice('tren-14-trieu')}>
          Trên 14 triệu
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
