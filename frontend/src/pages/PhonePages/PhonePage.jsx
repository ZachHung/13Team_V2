import React from 'react';
import { orderBy } from 'lodash';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { userRequest } from '../../utils/CallApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuantity } from '../../redux/cart';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMobile,
  faMicrochip,
  faMemory,
  faHardDrive,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import Swiper from '../../components/swiper/Swiper';
import SwiperPromotion from '../../components/swiperPromotion/SwiperPromotion';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Pagination from '../../components/pagination';
import SortProduct from '../../components/sortProduct';
import './PhonePage.scss';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function PhonePage() {
  const user = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const [phoneList, setPhoneList] = useState([]);
  // add cart
  const handleAddCart = (optionParam, colorParam) => {
    // if user is guest
    if (user == null || user == undefined) {
      navigateCart('../login');
    }
    // if user is costumer
    else {
      userRequest()
        .post(`cart/add/${user._id}`, {
          optionID: optionParam,
          color: colorParam,
        })
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  };
  // buy product
  const navigateCart = useNavigate();
  const handleBuyProduct = (optionParam, colorParam) => {
    // if user is guest
    if (user == null || user == undefined) {
      navigateCart('../login');
    }
    // if user is costumer
    else {
      userRequest()
        .post(`cart/add/${user._id}`, {
          optionID: optionParam,
          color: colorParam,
        })
        .then((res) => {})
        .catch((err) => console.log(err));
      navigateCart('../cart');
    }
  };
  // filter
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState([]);
  // retrive name brand array
  useEffect(() => {
    api.get('/phone/brand/name').then((res) => {
      setBrandName(res.data);
    });
  }, []);

  const [checkedBrand, setCheckedBrand] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);
  useEffect(() => {
    api.get('/phone/brand').then((res) => {
      setBrand(res.data);
    });
  }, []);

  var urlString = '';
  if (checkedBrand.length != 0 && checkedPrice.length != 0) {
    let paramStringBrand = checkedBrand.join(',');
    let paramStringPrice = checkedPrice.join(',');
    urlString = `?brand=${paramStringBrand}&price=${paramStringPrice}`;
  }
  if (checkedBrand.length == 0 && checkedPrice.length != 0) {
    let paramStringPrice = checkedPrice.join(',');
    urlString = `?price=${paramStringPrice}`;
  }
  if (checkedBrand.length != 0 && checkedPrice.length == 0) {
    let paramStringBrand = checkedBrand.join(',');
    urlString = `?brand=${paramStringBrand}`;
  }

  // call api

  useEffect(() => {
    api.get(`/phone${urlString}`).then((res) => {
      setPhoneList(res.data.items);
    });
  }, [urlString]);

  const handleCheckBrand = (name) => {
    setCheckedBrand((prev) => {
      const isExist = checkedBrand.includes(name);
      if (isExist) {
        return checkedBrand.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };
  const handleCheckPrice = (name) => {
    setCheckedPrice((prev) => {
      const isExist = checkedPrice.includes(name);
      if (isExist) {
        return checkedPrice.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };
  const handleCheckAllBrand = () => {
    setCheckedBrand(brandName);
  };
  const handleCheckAllPrice = () => {
    setCheckedPrice([
      'tren-14-trieu',
      'duoi-2-trieu',
      'tu-2-5-trieu',
      'tu-5-14-trieu',
    ]);
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = phoneList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // sort
  // const [sortedProducts, setSortedProducts] = useState([]);
  // // var temp = orderBy(currentProduct, 'name', 'desc');
  // // setSortedProducts(temp);
  // const [type, setType] = useState((prev) => 'asc');

  // const handleSortAsc = (newType) => {
  //   setType(newType);
  //   console.log('clicked asc', type);
  // };
  // const handleSortDesc = (newType) => {
  //   setType(newType);
  //   console.log('clicked desc', type);
  // };
  // useEffect(() => {
  //   setSortedProducts(orderBy(currentProduct, 'name', type));
  // }, [type]);

  return (
    <>
      <Header />
      <div className="products-container">
        <section className="section products">
          <SwiperPromotion className="swiper-promotion"></SwiperPromotion>
          <Swiper
            updateBrand={handleCheckBrand}
            updatePrice={handleCheckPrice}
          ></Swiper>
          <div className="filter-checkbox">
            <span style={{ fontWeight: 500, paddingRight: '1rem' }}>
              Lọc theo:
            </span>
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
          </div>
          {/* <SortProduct
            handleSortAsc={handleSortAsc}
            handleSortDesc={handleSortDesc}
          /> */}
          <div className="products-layout container">
            <div className="filter">
              <div>
                <div className="block-title">
                  <h3>Thương hiệu</h3>
                </div>
                <ul className="block-content filter-brand">
                  <li onClick={() => handleCheckAllBrand()}>
                    <input
                      type="checkbox"
                      checked={
                        checkedBrand.length == 6 || checkedBrand.length == 0
                      }
                      onChange={() => console.log('fix checked warning')}
                    />
                    <label>
                      <span>Tất cả</span>
                    </label>
                  </li>
                  {brand.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => handleCheckBrand(item.name)}
                    >
                      <input
                        type="checkbox"
                        checked={checkedBrand.includes(item.name)}
                        onChange={() => console.log('fix checked warning')}
                      />
                      <label>
                        <span>{item.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="block-title">
                  <h3>Mức giá</h3>
                </div>
                <ul className="block-content">
                  <li onClick={() => handleCheckAllPrice()}>
                    <input
                      type="checkbox"
                      checked={
                        checkedPrice.length == 4 || checkedPrice.length == 0
                      }
                      onChange={() => console.log('fix checked warning')}
                    />
                    <label>
                      <span>Tất cả</span>
                    </label>
                  </li>
                  <li onClick={() => handleCheckPrice('duoi-2-trieu')}>
                    <input
                      type="checkbox"
                      checked={checkedPrice.includes('duoi-2-trieu')}
                      onChange={() => console.log('fix checked warning')}
                    />
                    <label>
                      <span>Dưới 2 triệu</span>
                    </label>
                  </li>
                  <li onClick={() => handleCheckPrice('tu-2-5-trieu')}>
                    <input
                      type="checkbox"
                      checked={checkedPrice.includes('tu-2-5-trieu')}
                      onChange={() => console.log('fix checked warning')}
                    />
                    <label>
                      <span>Từ 2 đến 5 triệu</span>
                    </label>
                  </li>
                  <li onClick={() => handleCheckPrice('tu-5-14-trieu')}>
                    <input
                      checked={checkedPrice.includes('tu-5-14-trieu')}
                      type="checkbox"
                      onChange={() => console.log('fix checked warning')}
                    />
                    <label>
                      <span>Từ 5 đến 14 triệu</span>
                    </label>
                  </li>
                  <li onClick={() => handleCheckPrice('tren-14-trieu')}>
                    <input
                      type="checkbox"
                      checked={checkedPrice.includes('tren-14-trieu')}
                      onChange={() => console.log('fix checked warning')}
                    />
                    <label>
                      <span>Trên 14 triệu</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="list-products">
              {currentProduct.map((phone) => (
                <div key={phone._id} className="product-layout">
                  <div className="product">
                    <div className="img-container">
                      <Link to={`/`}>
                        <img
                          src={`http://localhost:5000/${phone.image[0]}`}
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
                        <form className="buy-btn">
                          <button
                            className="btn btn-buy btn-sm"
                            type="submit"
                            onClick={() =>
                              handleBuyProduct(
                                phone.slug[0]._id,
                                phone.slug[0].color[0].name
                              )
                            }
                          >
                            <p>MUA</p>
                          </button>
                        </form>
                        <form className="add-btn">
                          <button
                            className="btn btn-addCart btn-sm"
                            type="submit"
                            onClick={() =>
                              handleAddCart(
                                phone.slug[0]._id,
                                phone.slug[0].color[0].name
                              )
                            }
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
          <Pagination
            productPerpage={productsPerPage}
            totalProducts={phoneList.length}
            paginate={paginate}
          />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PhonePage;