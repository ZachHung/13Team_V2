import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Purchase.scss';
import { hostServer } from '../../utils/const';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default function Purchase() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    api.get(`/purchase/all`).then((res) => {
      console.log(res.data);
      setProductsList(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <section className="container_purchase">
        <div className="status_menu">
          <div className="statusAll">
            <a>Tất cả</a>
          </div>
          <div className="statusDelivering">
            <a>Đang giao </a>
          </div>
          <div className="statusDelivered">
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
                        <strong id="dateProduct">{product.createdAt}</strong>
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
                          {item.optionID.color[0].price}&nbsp;₫
                        </strong>{' '}
                      </p>
                    </div>
                  </a>
                  <hr />
                </div>
                <div class="price">
                  <p id="totalPrice">
                    Tổng số tiền:{' '}
                    <strong id="totalPriceProduct">
                      {item.optionID.color[0].price * item.quantity}&nbsp;₫
                    </strong>
                  </p>
                </div>

                <div class="action">
                  <form
                    class=" btn_form "
                    method="POST"
                    action="/purchase/repurchase?optionID=61a749feaf9aeae6a5bf6c3f&amp;num=1&amp;color=Đen"
                  >
                    <button class="btn  " type="submit">
                      Mua lại
                    </button>
                  </form>
                  <form
                    class="btn_form "
                    id="btnDelete"
                    method="POST"
                    action="/purchase/61a749feaf9aeae6a5bf6c3f?_method=DELETE"
                  >
                    <button class="btn ">Xóa</button>
                  </form>
                </div>
                <div class="remove-modal">
                  <div class="modal-container">
                    <div class="modal__content">
                      Xóa sản phẩm khỏi giỏ hàng?
                    </div>
                    <div class="modal__footer">
                      <button class="modal__button--confirm confirm-btn">
                        Xoá
                      </button>
                      <button class="modal__button--cancel cancel-btn">
                        Huỷ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
