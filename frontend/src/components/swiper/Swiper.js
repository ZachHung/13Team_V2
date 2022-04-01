import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Swiper.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default ({ updateBrand, updatePrice }) => {
  const [brand, setBrand] = useState([]);
  // const [checkedBrand, setCheckedBrand] = useState([]);
  // const [checkedPrice, setCheckedPrice] = useState([]);
  useEffect(() => {
    api.get('/phone/brand').then((res) => {
      console.log(res.data);
      setBrand(res.data);
    });
  }, []);

  // const handleCheckBrand = (name) => {
  //   setCheckedBrand((prev) => {
  //     const isExist = checkedBrand.includes(name);
  //     if (isExist) {
  //       return checkedBrand.filter((item) => item !== name);
  //     } else {
  //       return [...prev, name];
  //     }
  //   });
  // };
  // console.log(checkedBrand);
  // const handleCheckPrice = (name) => {
  //   setCheckedPrice((prev) => {
  //     const isExist = checkedPrice.includes(name);
  //     if (isExist) {
  //       return checkedPrice.filter((item) => item !== name);
  //     } else {
  //       return [...prev, name];
  //     }
  //   });
  // };
  // console.log(checkedPrice);
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
      <Swiper
        className="price-swiper"
        spaceBetween={10}
        slidesPerView={4}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
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
      {/* <div>
        <span style={{ fontWeight: 500, paddingRight: '1rem' }}>Lọc theo:</span>
        {checkedBrand.map((item) => (
          <span key={item} className="filter-span">
            {item}
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                paddingRight: '5px',
                paddingLeft: '5px',
                fontWeight: '300',
              }}
            />
          </span>
        ))}
        {checkedPrice.map((item) => (
          <span key={item} className="filter-span">
            {item}
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                paddingRight: '5px',
                paddingLeft: '5px',
                fontWeight: '300',
              }}
            />
          </span>
        ))}
      </div> */}
    </div>
  );
};
