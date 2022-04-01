import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SwiperPromotion.scss";
import { Autoplay, Pagination, Navigation } from "swiper";
export default () => {
  
  return (
    <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="Swiper-Promotion-Cpn"
      >
        <SwiperSlide className="Slide">
        <img
              src={`https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/2/637818488442484997_F-C1_1200x300.png`}
              alt={`slide promotion 1`}
            ></img>
        </SwiperSlide>
        <SwiperSlide className="Slide">
            <img
              src={`https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/1/637817045731786784_F-C1_1200x300.png`}
              alt={`slide promotion 1`}
            ></img>
        </SwiperSlide>
            {/* https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/20/637834160186186738_F-C1_1200x300.png */}
        <SwiperSlide className="Slide">
            <img
              src={`https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/20/637834160186186738_F-C1_1200x300.png`}
              alt={`slide promotion 1`}
            ></img>
        </SwiperSlide>
        <SwiperSlide className="Slide">
            <img
              src={`https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/9/637824030001794397_F-C1_1200x300.png`}
              alt={`slide promotion 1`}
            ></img>
        </SwiperSlide>
        <SwiperSlide className="Slide">
            <img
              src={`https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/10/637825189083142302_F-C1_1200x300.png`}
              alt={`slide promotion 1`}
            ></img>
        </SwiperSlide>
        <SwiperSlide className="Slide">
        <img
              src={`https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/3/23/637836268516068119_F-C1_1200x300.png`}
              alt={`slide promotion 1`}
            ></img>
        
        </SwiperSlide>
        
      </Swiper>
  );
};
