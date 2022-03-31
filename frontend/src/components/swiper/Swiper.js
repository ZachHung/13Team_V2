import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default () => {
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    api.get('/phone/brand').then((res) => {
      console.log(res.data);
      setBrand(res.data.items);
    });
  }, []);
  const handleOnClickSwiper = () => {
    console.log('clicked: ');
  };
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide onClick={handleOnClickSwiper}>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide onClick={handleOnClickSwiper}>Dưới 2 triệu</SwiperSlide>
        <SwiperSlide>Từ 2 đến 5 triệu</SwiperSlide>
        <SwiperSlide>Từ 5 đến 14 triệu</SwiperSlide>
        <SwiperSlide>Trên 14 triệu</SwiperSlide>
      </Swiper>
    </>
  );
};
