import React, { useEffect } from "react";
import "./style.scss";
import Glide from "@glidejs/glide";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/header";
import Footer from "../../components/footer";

const HomePage = () => {
  useEffect(() => {
    // Mount slide1
    new Glide("#glide_1", {
      focusAt: "center",
      type: "carousel",
      startAt: 0,
      autoplay: 5000,
      hoverpause: true,
      perView: 1,
      animationDuration: 500,
      animationTimingFunc: "linear",
    }).mount();

    // Mount slide2
    new Glide("#glide_2", {
      focusAt: "center",
      type: "carousel",
      startAt: 0,
      perView: 1,
      animationDuration: 500,
      animationTimingFunc: "linear",
    }).mount();

    // Initialize AOS when page load
    AOS.init({
      offset: 50, //trigger offset in px
      duration: 350, // values from 0 to 3000, with step 50ms
      easing: "ease-in-back", // default easing for AOS animations
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="homePage">
      <Header color="#f5f5f5" />{" "}
      <div className="landing-page">
        <section className="hero">
          <div className="glide" id="glide_1">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide slide_1">
                  <div className="hero__center">
                    <div className="hero__left">
                      <span className="">Sản phẩm mới</span>
                      <h1 className="">Iphone 13 Pro/Pro Max</h1>
                      <p>Thiết kế đặc trưng với màu sắc thời thượng</p>
                      <Link to="/phone/iphone13-128GB">
                        <button className="hero__btn txt-white">
                          Mua Ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="glide__slide slide_2">
                  <div className="hero__center">
                    <div className="hero__left">
                      <span className="">Sản phẩm mới</span>
                      <h1>Galaxy Z Fold 3</h1>
                      <p>Sẵn sàng mở ra tiềm năng công nghệ mới</p>
                      <Link to="/phone/zfold3-256GB">
                        <button className="hero__btn txt-white">
                          Mua Ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="glide__slide slide_3">
                  <div className="hero__center">
                    <div className="hero__left">
                      <span className="">Sản phẩm mới</span>
                      <h1>Macbook Pro 2021</h1>
                      <p>Thiết kế vượt trội cho người dùng chuyên nghiệp</p>
                      <Link to="/laptop/macbook_pro_m1_2021-512GB">
                        <button className="hero__btn txt-white">
                          Mua Ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="glide__arrows" data-glide-el="controls">
                <button
                  className="glide__arrow glide__arrow--left"
                  data-glide-dir="<"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  className="glide__arrow glide__arrow--right"
                  data-glide-dir=">"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
              <button className="glide__bullet" data-glide-dir="=2"></button>
            </div>
          </div>
        </section>
        <section data-aos="fade-up" data-aos-anchor-placement="top-center">
          <h1 className="section-title">Sản phẩm nổi bật</h1>
          <div className="glide" id="glide_2">
            <div className="glide__nav" data-glide-el="controls[nav]">
              <div className="title" data-glide-dir="=0">
                Điện thoại
              </div>
              <div className="title" data-glide-dir="=1">
                Laptop
              </div>
              <div className="title" data-glide-dir="=2">
                Tablet
              </div>
              <div className="title" data-glide-dir="=3">
                Phụ kiện
              </div>
            </div>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide">
                  <div className="spotlight grid-col-1-2-1">
                    <div className="grid-col-1">
                      <div className="spotlight__item">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Frog_black.jpg?alt=media&token=95fb8541-a302-45a3-813c-a332cd32c52c"
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">Asus Rog Phone 5s</p>
                        <Link to="/phone/rogphone5s-64GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className="spotlight__item">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fmi-11%2Fmi11_blue.webp?alt=media&token=e3cc6e9a-fb1d-48ef-a3ac-5cdd4c2fccb1`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">Xiaomi Mi 11</p>
                        <Link to="/phone/mi11-128GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                    <div className="spotlight__item">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fs21-ultra%2Fs21_silver.jpg?alt=media&token=001db6f0-d961-4cfb-9dcc-263ff324687d`}
                        alt="Samsung Week"
                      />
                      <p className="name">Galaxy S21 Ultra</p>
                      <Link to="/phone/s21ultra-128GB">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className="grid-col-1">
                      <div className="spotlight__item">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fredmi-k40%2Fredmi-k40_white.jpg?alt=media&token=70f13b7e-b8f5-45d3-8b32-19799a6040d9`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">Redmi K40</p>
                        <Link to="/phone/redmi_k40-128GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className="spotlight__item">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fiphone-11%2Fiphone11_black.jpg?alt=media&token=b920079b-5f87-4c05-8ddd-b743f1bb51af`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">iPhone 11 Pro Max</p>
                        <Link to="/phone/iphone11-256GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="spotlight grid-col-1-1-2">
                    <div className="grid-col-1">
                      <div className="spotlight__item">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Faspire-7%2Facer-aspire-7.jpg?alt=media&token=166ae905-2c43-4ac9-a3e5-727949711b19`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">Acer Aspire 7 A715</p>
                        <Link to="/laptop/aspire7-256GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className="spotlight__item">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fa315-56-308n%2Fa315_0.jpg?alt=media&token=4cb1167d-2815-4878-bd20-6ac1833ef808`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">Acer Aspire A315</p>
                        <Link to="/laptop/a315_56_308n-256GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                    <div className="grid-col-1">
                      <div className="spotlight__item">
                        <img
                          src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/hp-pavilion-15-eg0505tx.jpg`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">HP Pavilion 15</p>
                        <Link to="/laptop/pavilion_15-512GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className="spotlight__item">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fpavilion_15%2Fpavilion15_0.jpg?alt=media&token=37c39943-af67-441a-ac53-3975bf01575b`}
                          alt="Ảnh sản phẩm"
                        />
                        <p className="name">Macbook Air M1 2020</p>
                        <Link to="/laptop/macbook_air_m1_2020-256GB">
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                    <div className="spotlight__item">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fnitro-5%2Fnitro5.jpg?alt=media&token=15c3117e-aa02-4eed-95fc-3bb9ddfa1f47`}
                        alt="Ảnh sản phẩm"
                      />
                      <p className="name">Acer Nitro 5 AN515 57</p>
                      <Link to="/laptop/nitro5-512GB">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="spotlight grid-col-1-1-1">
                    <div className="spotlight__item">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fipad-mini-6%2Fgrey.jpg?alt=media&token=c2bc3d1d-e737-4b6d-85ea-f7c87911963e`}
                        alt="Ảnh sản phẩm"
                      />
                      <p className="name">iPad Mini 6</p>
                      <Link to="/tablet/ipad_mini_6-64GB">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className="spotlight__item mobile-hiden">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fipad-pro-11-2021%2Fgrey.jpg?alt=media&token=03b8e54f-803e-4b53-9e66-19d11a12b875`}
                        alt="Ảnh sản phẩm"
                      />
                      <p className="name"> iPad Pro 2021</p>
                      <Link to="/tablet/ipad_pro_m1_2021-128GB">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className="spotlight__item mobile-hiden">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fgalaxy-tab-s7%2Fbronze.jpg?alt=media&token=0926ed09-2a1c-42b6-b0a5-9df2c92ce41d`}
                        alt="Ảnh sản phẩm"
                      />
                      <p className="name">Galaxy Tab S7</p>
                      <Link to="/tablet/galaxy_tab_s7-128GB">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="spotlight grid-col-1-1">
                    <div className="spotlight__item">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2Fjbl_t450%2Fwhite.png?alt=media&token=6a5e0066-01d2-46cc-896a-eb987219edeb`}
                        alt="Ảnh sản phẩm"
                      />
                      <p className="name">Tai nghe JBL T450</p>
                      <Link to="/accessory/jbl_t450-Default">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className="spotlight__item">
                      <img
                        src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/Remax-Proda-10000-mAh.jpg`}
                        alt="Ảnh sản phẩm"
                      />
                      <p className="name">Sạc dự phòng Remax Proda 10000mAh</p>
                      <Link to="/accessory/proda-10000mAh">
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section data-aos="fade-up" data-aos-anchor-placement="top-center">
          <h1 className="section-title">ưu đãi</h1>
          <div className="spotlight grid-col-2-1-1">
            <div className="spotlight__item">
              <img
                src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/promotion2.webp`}
                alt="Samsung Week"
              />
              <Link to="/phone?brand=samsung">
                <button>Mua Ngay</button>
              </Link>
            </div>
            <div className="grid-col-1">
              <div className="spotlight__item">
                <img
                  src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/promotion1.webp`}
                  alt="Ảnh sản phẩm"
                />
                <Link to="/phone/s21ultra-128GB">
                  <button>Mua Ngay</button>
                </Link>
              </div>
              <div className="spotlight__item">
                <img
                  src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/promotion.webp`}
                  alt="Ảnh sản phẩm"
                />
                <Link to="/phone?brand=samsung">
                  <button>Mua Ngay</button>
                </Link>
              </div>
            </div>
            <div className="grid-col-1">
              <div className="spotlight__item">
                <img
                  src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/promotion1.webp`}
                  alt="Ảnh sản phẩm"
                />
                <Link to="/phone/s21ultra-128GB">
                  <button>Mua Ngay</button>
                </Link>
              </div>
              <div className="spotlight__item">
                <img
                  src={`${process.env.REACT_APP_SERVER_PATH}/image/landing_page/slide2/promotion1.webp`}
                  alt="Ảnh sản phẩm"
                />
                <Link to="/phone/s21ultra-128GB">
                  <button>Mua Ngay</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer color="#f5f5f5" />
    </div>
  );
};

export default HomePage;
