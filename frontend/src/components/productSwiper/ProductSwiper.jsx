import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProductSwiper.scss";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ProductSwiper({ swiperArray }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const controlSwiper = useRef();
  const pathImage = "";

  return (
    <div className='swiper__container'>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        navigation={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
        ref={controlSwiper}
      >
        {swiperArray.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='swiper__img'>
              <img src={item.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {swiperArray.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
