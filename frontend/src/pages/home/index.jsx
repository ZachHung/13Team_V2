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
    <div className='homePage'>
      <Header color='#f5f5f5' />{" "}
      <div className='landing-page'>
        <section className='hero'>
          <div className='glide' id='glide_1'>
            <div className='glide__track' data-glide-el='track'>
              <ul className='glide__slides'>
                <li className='glide__slide slide_1'>
                  <div className='hero__center'>
                    <div className='hero__left'>
                      <span className=''>Sản phẩm mới</span>
                      <h1 className=''>Iphone 13 Pro/Pro Max</h1>
                      <p>Thiết kế đặc trưng với màu sắc thời thượng</p>
                      <Link to='/phone/iphone13-128GB'>
                        <button className='hero__btn txt-white'>
                          Mua Ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className='glide__slide slide_2'>
                  <div className='hero__center'>
                    <div className='hero__left'>
                      <span className=''>Sản phẩm mới</span>
                      <h1>Galaxy Z Fold 3</h1>
                      <p>Sẵn sàng mở ra tiềm năng công nghệ mới</p>
                      <Link to='/phone/zfold3-256GB'>
                        <button className='hero__btn txt-white'>
                          Mua Ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className='glide__slide slide_3'>
                  <div className='hero__center'>
                    <div className='hero__left'>
                      <span className=''>Sản phẩm mới</span>
                      <h1>Macbook Pro 2021</h1>
                      <p>Thiết kế vượt trội cho người dùng chuyên nghiệp</p>
                      <Link to='/laptop/macbook_pro_m1_2021-512GB'>
                        <button className='hero__btn txt-white'>
                          Mua Ngay
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
              <div className='glide__arrows' data-glide-el='controls'>
                <button
                  className='glide__arrow glide__arrow--left'
                  data-glide-dir='<'
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  className='glide__arrow glide__arrow--right'
                  data-glide-dir='>'
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            <div className='glide__bullets' data-glide-el='controls[nav]'>
              <button className='glide__bullet' data-glide-dir='=0'></button>
              <button className='glide__bullet' data-glide-dir='=1'></button>
              <button className='glide__bullet' data-glide-dir='=2'></button>
            </div>
          </div>
        </section>
        <section data-aos='fade-up' data-aos-anchor-placement='top-center'>
          <h1 className='section-title'>Sản phẩm nổi bật</h1>
          <div className='glide' id='glide_2'>
            <div className='glide__nav' data-glide-el='controls[nav]'>
              <div className='title' data-glide-dir='=0'>
                Điện thoại
              </div>
              <div className='title' data-glide-dir='=1'>
                Laptop
              </div>
              <div className='title' data-glide-dir='=2'>
                Tablet
              </div>
              <div className='title' data-glide-dir='=3'>
                Phụ kiện
              </div>
            </div>
            <div className='glide__track' data-glide-el='track'>
              <ul className='glide__slides'>
                <li className='glide__slide'>
                  <div className='spotlight grid-col-1-2-1'>
                    <div className='grid-col-1'>
                      <div className='spotlight__item'>
                        <img
                          src='https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fasus-rog-phone-5s.jpg?alt=media&token=3305cda1-a091-4d76-b963-fcb6f6520712'
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>Asus Rog Phone 5s</p>
                        <Link to='/phone/rogphone5s-64GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fxiaomi-mi-11.png?alt=media&token=ef944fcc-e810-45ae-9e25-09a9fbd6611a`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>Xiaomi Mi 11</p>
                        <Link to='/phone/mi11-128GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                    <div className='spotlight__item'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fsamsung-galaxy-s21-ultra.jpg?alt=media&token=6db1c7d6-0edb-470b-af24-b52f36f0ae29`}
                        alt='Samsung Week'
                      />
                      <p className='name'>Galaxy S21 Ultra</p>
                      <Link to='/phone/s21ultra-128GB'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className='grid-col-1'>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fredmi-k40.jpg?alt=media&token=3532dd29-f45b-4abe-96d9-f754c631355e`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>Redmi K40</p>
                        <Link to='/phone/redmi_k40-128GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fiphone-11-pro-max-trang.jpg?alt=media&token=7181f19f-f146-428a-8365-4ed98f2105bb`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>iPhone 11 Pro Max</p>
                        <Link to='/phone/iphone11-256GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='glide__slide'>
                  <div className='spotlight grid-col-1-1-2'>
                    <div className='grid-col-1'>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Facer-aspire-7-a715.jpg?alt=media&token=1e603050-282e-4b94-ba3d-179b21b0df73`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>Acer Aspire 7 A715</p>
                        <Link to='/laptop/aspire7-256GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Facer-aspire-a315.jpg?alt=media&token=7a011039-adae-4a85-b82a-7219bc5c8693`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>Acer Aspire A315</p>
                        <Link to='/laptop/a315_56_308n-256GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                    <div className='grid-col-1'>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fhp-pavilion-15-eg0505tx.jpg?alt=media&token=82be4279-1e0c-4cd2-809f-d4f398638b01`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>HP Pavilion 15</p>
                        <Link to='/laptop/pavilion_15-512GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                      <div className='spotlight__item'>
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fmacbook-air-m1-2020.jpg?alt=media&token=b09b6b40-c884-4af4-bbc1-2dd82b2954c8`}
                          alt='Ảnh sản phẩm'
                        />
                        <p className='name'>Macbook Air M1 2020</p>
                        <Link to='/laptop/macbook_air_m1_2020-256GB'>
                          <button>Mua Ngay</button>
                        </Link>
                      </div>
                    </div>
                    <div className='spotlight__item'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Facer-nitro-5.jpg?alt=media&token=eb98fbca-e903-49b8-b647-abef48c14a30`}
                        alt='Ảnh sản phẩm'
                      />
                      <p className='name'>Acer Nitro 5 AN515 57</p>
                      <Link to='/laptop/nitro5-512GB'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className='glide__slide'>
                  <div className='spotlight grid-col-1-1-1'>
                    <div className='spotlight__item'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fipad-mini-6.png?alt=media&token=29cf2326-2c82-43e0-8d32-ddf01365f88a`}
                        alt='Ảnh sản phẩm'
                      />
                      <p className='name'>iPad Mini 6</p>
                      <Link to='/tablet/ipad_mini_6-64GB'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className='spotlight__item mobile-hiden'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fipad-pro-2021.png?alt=media&token=4b34dbbd-9d3d-4f99-baf1-f3540bc9796c`}
                        alt='Ảnh sản phẩm'
                      />
                      <p className='name'> iPad Pro 2021</p>
                      <Link to='/tablet/ipad_pro_m1_2021-128GB'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className='spotlight__item mobile-hiden'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fsamsung-galaxy-tab-s7.png?alt=media&token=d09f28fe-1e72-4850-b4fe-c8cd2cf5853e`}
                        alt='Ảnh sản phẩm'
                      />
                      <p className='name'>Galaxy Tab S7</p>
                      <Link to='/tablet/galaxy_tab_s7-128GB'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className='glide__slide'>
                  <div className='spotlight grid-col-1-1'>
                    <div className='spotlight__item'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fjbl_450_black.webp?alt=media&token=e6309073-586b-4439-91c0-954a17d44f52`}
                        alt='Ảnh sản phẩm'
                      />
                      <p className='name'>Tai nghe JBL T450</p>
                      <Link to='/accessory/jbl_t450-Default'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                    <div className='spotlight__item'>
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2FRemax-Proda-10000-mAh.jpg?alt=media&token=b3ff5905-fceb-4d46-b21d-7ba5d4098624`}
                        alt='Ảnh sản phẩm'
                      />
                      <p className='name'>Sạc dự phòng Remax Proda 10000mAh</p>
                      <Link to='/accessory/proda-10000mAh'>
                        <button>Mua Ngay</button>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section data-aos='fade-up' data-aos-anchor-placement='top-center'>
          <h1 className='section-title'>ưu đãi</h1>
          <div className='spotlight grid-col-2-1-1'>
            <div className='spotlight__item'>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fpromotion2.webp?alt=media&token=e798c15a-843d-4469-8e90-65bb6696f237`}
                alt='Samsung Week'
              />
              <Link to='/phone?brand=samsung'>
                <button>Mua Ngay</button>
              </Link>
            </div>
            <div className='grid-col-1'>
              <div className='spotlight__item'>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fpromotion1.webp?alt=media&token=2bd16606-2d10-4d52-b259-aeef4b09c4be`}
                  alt='Ảnh sản phẩm'
                />
                <Link to='/phone/s21ultra-128GB'>
                  <button>Mua Ngay</button>
                </Link>
              </div>
              <div className='spotlight__item'>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fpromotion.webp?alt=media&token=f356988e-fb48-454d-a75f-4f9989b2813a`}
                  alt='Ảnh sản phẩm'
                />
                <Link to='/phone?brand=samsung'>
                  <button>Mua Ngay</button>
                </Link>
              </div>
            </div>
            <div className='grid-col-1'>
              <div className='spotlight__item'>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fpromotion1.webp?alt=media&token=2bd16606-2d10-4d52-b259-aeef4b09c4be`}
                  alt='Ảnh sản phẩm'
                />
                <Link to='/phone/s21ultra-128GB'>
                  <button>Mua Ngay</button>
                </Link>
              </div>
              <div className='spotlight__item'>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/fir-upload-images-912bd.appspot.com/o/images%2FlandingPage%2Fslide2%2Fpromotion1.webp?alt=media&token=2bd16606-2d10-4d52-b259-aeef4b09c4be`}
                  alt='Ảnh sản phẩm'
                />
                <Link to='/phone/s21ultra-128GB'>
                  <button>Mua Ngay</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer color='#f5f5f5' />
    </div>
  );
};

export default HomePage;
