import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style.scss";
import { userRequest } from "../../utils/CallApi";
import { useSelector } from "react-redux";
const CartPage = () => {
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    userRequest.get(`cart/${user.current._id}`).then((res) => {
      setCart(res.data.list);
      setTotal(res.data.total);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="cartPage">
        <section className="checkout-page">
          {/* {{#if error}}
  <div className="error">
    <i className="fal fa-shopping-cart "></i>
    <i className="fas fa-exclamation-triangle"></i>
    <h2 className="error__title">có vẻ giỏ hàng của bạn đang gặp vấn đề</h2>
    <h3 className="error__subtitle">hãy liên hệ các admin để nhận hỗ trợ</h3>
    <a href="/" className="cancel-btn">quay về trang chủ</a>
  </div>

  {{else}} */}
          <aside className="box cart-container">
            <div className="box__heading">
              <span>1</span>
              <h2>giỏ hàng</h2>
            </div>
            {/* {{#if emptyCart}}
    <div className="empty-cart">
      <i className="fal fa-shopping-cart "></i>
      <i className="fas fa-sad-tear "></i>
      <h2 className="error__title">giỏ hàng của bạn đang trống</h2>
      <h3 className="error__subtitle">hãy tiếp tục mua sắm để có thể thanh toán</h3>
      <a href="/phone" className="cancel-btn">mua sắm ngay</a>
    </div>
    {{else}} */}
            <ul className="cart">
              {cart.map((item) => (
                <li className="cart__item">
                  <div className="item__image">
                    <a href="/{{this.optionID.item.type}}/{{this.optionID.slug}}-{{this.optionID.detail}}">
                      <img src={item.optionID.color[0].image} />
                    </a>
                  </div>
                  <div className="item__detail" id="{{this.optionID._id}}">
                    <i
                      title="Xóa sản phầm"
                      className="far fa-times remove-item"
                    ></i>
                    <h2 className="detail__product-name"></h2>
                    <div className="detail__item-price"></div>
                    <ul className="detail__product-options">
                      <li className="RAM">Tùy chọn:</li>
                      <li className="color">Màu:</li>
                    </ul>

                    <div className="detail__quantity">
                      <button className="decrease-item">
                        <i className="fal fa-minus"></i>
                      </button>
                      <input
                        className="quantity"
                        type="number"
                        size="4"
                        required
                        maxLength="12"
                        min="0"
                        max="99"
                        step="1"
                        value="{{this.num}}"
                      />
                      <button className="increase-item">
                        <i className=" fal fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="order ">
              <dl className="order__summary sub-total">
                <dt className="order__summary--label">giỏ hàng</dt>
                <dd className="order__summary--decription"></dd>
              </dl>
              <dl className="order__summary shipping-fee">
                <dt className="order__summary--label">phí vận chuyển</dt>
                <dd className="order__summary--decription"></dd>
              </dl>
            </div>
            <div className="total">
              <dl className="order__summary">
                <dt className="order__summary--label">tổng cộng</dt>
                <dd className="order__summary--decription"></dd>
              </dl>
            </div>
            <form name="delete-form" method="POST" action=""></form>
          </aside>
          <div className="box delivery-info">
            <div className="box__heading">
              <span>2</span>
              <h2>thông tin vận chuyển</h2>
            </div>
            <div className="user-information">
              <h2 className="greeting">xin chào </h2>
              <h3 className="sub-heading">
                hãy chắc chắn rằng thông tin vận chuyển của bạn là chính xác
              </h3>
              <form method="POST" action="/checkout/purchase">
                <div className="form-group">
                  <input
                    type="text"
                    id="fullName"
                    value="{{userInfo.name}}"
                    placeholder=" "
                    readOnly
                  />
                  <label htmlFor="fullName">họ và tên</label>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    id="phoneNumber"
                    value="{{userInfo.phone}}"
                    placeholder=" "
                    readOnly
                  />
                  <label htmlFor="phoneNumber">số điện thoại</label>
                </div>
                <div className=" form-group">
                  <input
                    type="text"
                    id="provice/city"
                    value="{{userInfo.address.province}}"
                    placeholder=" "
                    readOnly
                  />
                  <label htmlFor="provice/city">tỉnh/thành phố</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="district"
                    value="{{userInfo.address.district}}"
                    placeholder=" "
                    readOnly
                  />
                  <label htmlFor="district">quận/huyện</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="sub-district"
                    value="{{userInfo.address.ward}}"
                    placeholder=" "
                    readOnly
                  />
                  <label htmlFor="sub-district">phường/xã</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="house-number"
                    value="{{userInfo.address.addressdetail}}"
                    placeholder="Nhập số nhà, toà nhà, tên đường"
                    aria-describedby="home-number-help"
                    readOnly
                  />
                  <label htmlFor="house-number">
                    số nhà, toà nhà, tên đường
                  </label>
                  <small id="home-number-help">
                    VD: 24 Toà nhà 3 Dương Kỳ Hiệp
                  </small>
                </div>
                <button type="submit" className="confirm-btn">
                  Thanh toán
                </button>
                <button className="cancel-btn">Cập nhật thông tin</button>
              </form>
            </div>
          </div>
          <div className="remove-modal">
            <div className="modal-container">
              <div className="modal__content">Xóa sản phẩm khỏi giỏ hàng?</div>
              <div className="modal__footer">
                <button className="modal__button--confirm confirm-btn">
                  Xoá
                </button>
                <button className="modal__button--cancel cancel-btn">
                  Huỷ
                </button>
              </div>
            </div>
          </div>
          {/* {{/if}} */}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
