import React from 'react';
import './PhonePage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMobile,
  faMicrochip,
  faMemory,
  faHardDrive,
} from '@fortawesome/free-solid-svg-icons';

import Swiper from '../../components/swiper/Swiper';
import SwiperPromotion from '../../components/swiperPromotion/SwiperPromotion';
import Header from '../../components/header';
import Footer from '../../components/footer';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function PhonePage() {
  const [phoneList, setPhoneList] = useState([]);
  useEffect(() => {
    api.get('/phone').then((res) => {
      console.log(res.data);
      setPhoneList(res.data.items);
    });
  }, []);
  // console.log('phoneList', phoneList[0].techInfo[0].infoType);
  return (
    <>
      <Header />
      <div className="products-container">
        <section className="section products">
          <SwiperPromotion className="swiper-promotion"></SwiperPromotion>
          <Swiper></Swiper>
          <div className="filter-box">
            <div className="asc-price" id="sort-asc-phone">
              <Link to={`/`}>
                {' '}
                <i className="fas fa-sort-amount-up"></i>Giá thấp
              </Link>
            </div>
            <div className="desc-price" id="sort-desc-phone">
              <Link to={`/`}>
                <i className="fas fa-sort-amount-up-alt"></i>Giá cao
              </Link>
            </div>
          </div>
          <div className="products-layout container">
            <div className="filter">
              <div>
                <div className="block-title">
                  <h3>Thương hiệu</h3>
                </div>
                <ul className="block-content filter-brand">
                  <li>
                    <input type="checkbox" id="checkAllBrand" checked />
                    <label htmlFor="checkAllbrand">
                      <span>Tất cả</span>
                    </label>
                  </li>

                  <li>
                    <input type="checkbox" name="Brandids[]" value="apple" />
                    <label htmlFor="">
                      <span>Apple</span>
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="Brandids[]" value="samsung" />
                    <label htmlFor="">
                      <span>Samsung</span>
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="Brandids[]" value="asus" />
                    <label htmlFor="">
                      <span>Asus</span>
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="Brandids[]" value="oppo" />
                    <label htmlFor="">
                      <span>Oppo</span>
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="Brandids[]" value="xiaomi" />
                    <label htmlFor="">
                      <span>Xiaomi</span>
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="Brandids[]" value="realme" />
                    <label htmlFor="">
                      <span>Realme</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div>
                <div className="block-title">
                  <h3>Mức giá</h3>
                </div>
                <ul className="block-content">
                  <li>
                    <input type="checkbox" id="checkAllPrice" />
                    <label htmlFor="checkAllPrice">
                      <span>Tất cả</span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Priceids[]"
                      value="duoi-2-trieu"
                    />
                    <label htmlFor="">
                      <span>Dưới 2 triệu</span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Priceids[]"
                      value="tu-2-5-trieu"
                    />
                    <label htmlFor="">
                      <span>Từ 2 đến 5 triệu</span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Priceids[]"
                      value="tu-5-14-trieu"
                    />
                    <label htmlFor="">
                      <span>Từ 5 đến 14 triệu</span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="Priceids[]"
                      value="tren-14-trieu"
                    />
                    <label htmlFor="">
                      <span>Trên 14 triệu</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="list-products">
              {/* {phoneList.map((phone) => (
            <div key={phone._id}>
              <h3>Name: {phone.name}</h3>
              <h3>Description: {phone.techInfo[0].infoType}</h3>
            </div>
          ))} */}

              {phoneList.map((phone) => (
                <div key={phone._id} className="product-layout">
                  <div className="product">
                    <div className="img-container">
                      <Link to={`/`}>
                        <img
                          //   src="https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2021/04/22/image-removebg-preview_637547045799326930.png"
                          src={`http://localhost:5000/${phone.image[0]}`}
                          //   src="http://localhost:5000/image/realme/c11/c11-2021_blue.jpg"
                          alt={phone.name}
                        />
                      </Link>
                    </div>
                    <div className="info-product">
                      <div className="product-name">
                        <Link to={`/`}>
                          <h3>{phone.name}</h3>
                        </Link>
                      </div>

                      <div className="price">
                        <span>{phone.slug[0].color[0].price}</span>
                      </div>
                      <div className="config">
                        <div className="config-param">
                          <span data-title="CPU">
                            <p>
                              <FontAwesomeIcon
                                icon={faMicrochip}
                                style={{ paddingRight: '5px' }}
                              />
                              {phone.techInfo[2].infoDetail[0].infoNum}
                            </p>
                          </span>
                          <span data-title="Màn hình">
                            <p>
                              <FontAwesomeIcon
                                icon={faMobile}
                                style={{ paddingRight: '5px' }}
                              />
                              {phone.techInfo[0].infoDetail[0].infoNum}
                            </p>
                          </span>
                          <span data-title="RAM">
                            <p>
                              <FontAwesomeIcon
                                icon={faMemory}
                                style={{ paddingRight: '5px' }}
                              />
                              {phone.techInfo[3].infoDetail[0].infoNum}
                            </p>
                          </span>

                          <span data-title="ROM">
                            <p>
                              <FontAwesomeIcon
                                icon={faHardDrive}
                                style={{ paddingRight: '5px' }}
                              />
                              {phone.slug[0].detail}
                            </p>
                          </span>
                        </div>
                      </div>
                      <div className="product-btn">
                        <form
                          className="buy-btn"
                          method="POST"
                          action="phone/cart?itemID={{phone._id}}"
                          data="{{phone._id}}"
                        >
                          <button className="btn btn-buy btn-sm" type="submit">
                            <p>MUA</p>
                          </button>
                        </form>
                        <form
                          className="add-btn"
                          method="POST"
                          action="phone/addcart?itemID={{phone._id}}"
                          data="{{phone._id}}"
                        >
                          <button
                            className="btn btn-addCart btn-sm"
                            type="submit"
                          >
                            <p>THÊM VÀO GIỎ</p>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ul className="pagination">
            <span id="page1">1</span>
            <span id="page2">2</span>
            <span id="page3">3</span>
            <span id="page4">4</span>

            <span className="icon">...</span>
            <span className="last" id="pageLast">
              Last
            </span>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PhonePage;
