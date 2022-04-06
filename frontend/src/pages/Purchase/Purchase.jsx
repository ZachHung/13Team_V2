import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { userRequest } from '../../utils/CallApi';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Purchase.scss';
import { hostServer, currentChange, formatDate } from '../../utils/const';
import ModalPopUp from '../modal';

export default function Purchase() {
  const [productsList, setProductsList] = useState([]);
  const [activeStatus, setActiveStatus] = useState({
    all: true,
    delivering: false,
    delivered: false,
  });
  const [modalState, setModalState] = useState(false);
  const user = useSelector((state) => state.user);

  // get all purchase
  const getPurchase = () => {
    userRequest()
      .get(`purchase/all/${user.current._id}`)
      .then((res) => {
        setProductsList(res.data);
      });
  };
  const getDeliveringPurchase = () => {
    userRequest()
      .get(`purchase/delivering/${user.current._id}`)
      .then((res) => {
        setProductsList(res.data);
      });
  };
  const getDeliveredPurchase = () => {
    userRequest()
      .get(`purchase/delivered/${user.current._id}`)
      .then((res) => {
        setProductsList(res.data);
      });
  };

  useEffect(() => {
    getPurchase();
  }, []);
  const handelClickConfirm = () => {
    setModalState(false);
  };
  const handelClickCancel = () => {
    setModalState(false);
  };
  const handleClickAllProduct = () => {
    console.log('all');
    getPurchase();
    setActiveStatus({
      all: true,
      delivering: false,
      delivered: false,
    });
  };
  const handleClickDelivering = () => {
    console.log('delivering');

    getDeliveringPurchase();
    setActiveStatus({
      all: false,
      delivering: true,
      delivered: false,
    });
  };
  const handleClickDelivered = () => {
    console.log('delovered');

    getDeliveredPurchase();
    setActiveStatus({
      all: false,
      delivering: false,
      delivered: true,
    });
  };

  return (
    <>
      <Header />
      <section className="container_purchase">
        <div className="status_menu">
          <div
            className={activeStatus.all ? 'statusAll active' : 'statusAll'}
            onClick={() => handleClickAllProduct()}
          >
            <a>Tất cả</a>
          </div>
          <div
            className={
              activeStatus.delivering
                ? 'statusDelivering active'
                : 'statusDelivering'
            }
            onClick={() => handleClickDelivering()}
          >
            <a>Đang giao </a>
          </div>
          <div
            className={
              activeStatus.delivered
                ? 'statusDelivered active'
                : 'statusDelivered'
            }
            onClick={() => handleClickDelivered()}
          >
            <a>Đã giao</a>
          </div>
        </div>

        <div className="search">
          <input
            type="text"
            className="searchTerm"
            id="searchBoxPurchase"
            placeholder=" Tìm kiếm lịch sử mua hàng theo tên, thương hiệu... của sản phẩm "
          />
          <button type="submit" className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {productsList.map((product) => (
          <div class="products" key={product._id}>
            {product.list.map((item) => (
              <div class="single_product">
                <div class="info">
                  <div class="brand_status">
                    <div class="brand">
                      <p>
                        Thương hiệu:
                        <strong id="brandProduct">
                          {' '}
                          {item.optionID.item.brand.name}{' '}
                        </strong>{' '}
                        | Ngày mua:{' '}
                        <strong id="dateProduct">
                          {moment(product.createAt).format('LLLL')}
                        </strong>
                      </p>
                    </div>
                    <div class="status">
                      <p>
                        Trạng thái:{' '}
                        <strong id="statusProduct">{product.status}</strong>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <a href="/phone/iphone11-256GB" class="name_price">
                    <div class="img_name">
                      <script>var bool = true</script>
                      <img
                        id="imgProduct"
                        src={`${hostServer}/${item.optionID.color[0].image}`}
                        alt=""
                      />
                      <div class="name_num">
                        <p class="name" id="nameProduct">
                          {item.optionID.item.name}{' '}
                        </p>
                        <p class="num">
                          x<strong id="numProduct">{item.quantity} </strong>
                        </p>
                        <p class="num">
                          Màu: <strong id="colorProduct">{item.color}</strong>
                        </p>
                      </div>
                    </div>

                    <div class="price_one_product">
                      <p>
                        <strong id="priceProduct">
                          {currentChange(item.optionID.color[0].price)}
                        </strong>{' '}
                      </p>
                    </div>
                  </a>
                  <hr />
                </div>
                <div class="price">
                  <div class="action" style={{ marginBottom: '3rem' }}>
                    <button
                      class="btn  "
                      type="submit"
                      onClick={() => setModalState(true)}
                    >
                      Mua lại
                    </button>
                    <button class="btn " onClick={() => setModalState(true)}>
                      Xóa
                    </button>
                  </div>
                  <p id="totalPrice">
                    Tổng số tiền:{' '}
                    <strong>
                      {currentChange(
                        item.optionID.color[0].price * item.quantity
                      )}
                    </strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <ModalPopUp
          name={'lịch sử mua hàng'}
          modalState={modalState}
          handelClickConfirm={handelClickConfirm}
          handelClickCancel={handelClickCancel}
        />
      </section>
      <Footer />
    </>
  );
}
