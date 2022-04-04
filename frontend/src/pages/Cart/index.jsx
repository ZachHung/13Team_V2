import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style.scss";
import { userRequest } from "../../utils/CallApi";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faMinus,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { setQuantity } from "../../redux/cart";

const currentChange = (price) => {
  price = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return price;
};
const getTotal = (cart) => {
  var total = 0;
  for (let item of cart) {
    total += item.optionID.color[0].price * item.quantity;
  }
  return total;
};
function isValid(str) {
  if (!str) {
    return false;
  }
  str = str.replace(/^0+/, "") || "0";
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
}

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState([]);
  const [deviveryFee, setDeviveryFee] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [ReItem, setReItem] = useState({ optionID: "", color: "" });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCart = () => {
    userRequest
      .get(`cart/${user.current._id}`)
      .then((res) => {
        setCart(res.data.list);
        dispatch(setQuantity(res.data.list));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const changeQuantity = (optionID, color, quantity) => {
    userRequest
      .put(`cart/${user.current._id}`, {
        optionID: optionID,
        quantity: quantity,
        color: color,
      })
      .then(() => setIsChanged(!isChanged));
  };

  const deleteItem = (item) => {
    userRequest
      .delete(`cart/${user.current._id}`, {
        data: item,
      })
      .then(() => {
        setIsChanged(!isChanged);
        setModalState(false);
      });
  };

  const handleQuantity = (target, optionID, color) => {
    if (isValid(target.value) && target.value <= 99)
      changeQuantity(optionID, color, target.value);
  };
  const handleRemoveItem = (optionID, color) => {
    setModalState(true);
    setReItem({ optionID, color });
  };
  const handlePurchase = () => {
    userRequest
      .post(`cart/purchase/${user.current._id}`)
      .then()
      .catch((err) => console.log(err));
    return navigate("/purchase");
  };

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => getCart(), [isChanged]);
  if (isLoading)
    return (
      <>
        <Header></Header>
        <div className="cartPage">
          <section className="checkout-page">
            <p>Đang tải...</p>
          </section>
        </div>
        <Footer></Footer>
      </>
    );
  return (
    <>
      <Header />
      <div className="cartPage">
        <section className="checkout-page">
          <aside className="box cart-container">
            <div className="box__heading">
              <span>1</span>
              <h2>giỏ hàng</h2>
            </div>
            {!cart.length ? (
              <div className="empty-cart">
                <FontAwesomeIcon icon={faSadTear} className="faSadTear" />
                <h2 className="error__title">Giỏ hàng của bạn đang trống</h2>
                <h3 className="error__subtitle">
                  Hãy tiếp tục mua sắm để có thể thanh toán
                </h3>
                <Link to="/phone" className="cancel-btn">
                  Mua sắm ngay
                </Link>
              </div>
            ) : (
              <>
                <ul className="cart">
                  {cart.map((item, index) => (
                    <li className="cart__item" key={index}>
                      <div className="item__image">
                        <Link
                          to={`/${item.optionID.item.type}/${item.optionID.slug}-${item.optionID.detail}`}
                        >
                          <img
                            src={
                              "http://localhost:5000/" +
                              item.optionID.color[0].image
                            }
                          />
                        </Link>
                      </div>
                      <div className="item__detail">
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={"fa-times"}
                          onClick={() =>
                            handleRemoveItem(item.optionID._id, item.color)
                          }
                        />
                        <h2 className="detail__product-name">
                          {item.optionID.item.name}
                        </h2>
                        <div className="detail__item-price">
                          {currentChange(item.optionID.color[0].price)}
                        </div>
                        <ul className="detail__product-options">
                          <li className="RAM">
                            Tùy chọn: {item.optionID.detail}
                          </li>
                          <li className="color">Màu: {item.color}</li>
                        </ul>
                        <div className="detail__quantity">
                          <button
                            className="decrease-item"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              changeQuantity(
                                item.optionID._id,
                                item.color,
                                item.quantity - 1
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <input
                            className="quantity"
                            type="number"
                            size="4"
                            maxLength="12"
                            min="1"
                            max="99"
                            step="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantity(
                                e.target,
                                item.optionID._id,
                                item.color
                              )
                            }
                          />
                          <button
                            className="increase-item"
                            onClick={() =>
                              changeQuantity(
                                item.optionID._id,
                                item.color,
                                item.quantity + 1
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="order ">
                  <dl className="order__summary sub-total">
                    <dt className="order__summary--label">Giỏ hàng</dt>
                    <dd className="order__summary--decription">
                      {currentChange(getTotal(cart))}
                    </dd>
                  </dl>
                  <dl className="order__summary shipping-fee">
                    <dt className="order__summary--label">Phí vận chuyển</dt>
                    <dd className="order__summary--decription">
                      {currentChange(deviveryFee)}
                    </dd>
                  </dl>
                </div>
                <div className="total">
                  <dl className="order__summary">
                    <dt className="order__summary--label">Tổng cộng</dt>
                    <dd className="order__summary--decription">
                      {currentChange(getTotal(cart) + deviveryFee)}
                    </dd>
                  </dl>
                </div>
              </>
            )}
          </aside>
          {cart.length ? (
            <div className="box delivery-info">
              <div className="box__heading">
                <span>2</span>
                <h2>Thông tin vận chuyển</h2>
              </div>
              <div className="user-information">
                <h2 className="greeting">
                  Xin chào, {user.current.name.split(" ").slice(-1).join(" ")}
                </h2>
                <h3 className="sub-heading">
                  Hãy chắc chắn rằng thông tin vận chuyển của bạn là chính xác
                </h3>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      id="fullName"
                      value={user.current.name}
                      placeholder=""
                      readOnly
                    />
                    <label htmlFor="fullName">Họ và tên</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={user.current.phone}
                      placeholder=""
                      readOnly
                    />
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                  </div>
                  <div className=" form-group">
                    <input
                      type="text"
                      id="provice/city"
                      value={user.current.address.province}
                      placeholder=""
                      readOnly
                    />
                    <label htmlFor="provice/city">Tỉnh/thành phố</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="district"
                      value={user.current.address.district}
                      placeholder=""
                      readOnly
                    />
                    <label htmlFor="district">Quận/huyện</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="sub-district"
                      value={user.current.address.ward}
                      placeholder=""
                      readOnly
                    />
                    <label htmlFor="sub-district">Phường/xã</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="house-number"
                      value={user.current.address.addressdetail}
                      placeholder=""
                      aria-describedby="home-number-help"
                      readOnly
                    />
                    <label htmlFor="house-number">
                      Số nhà, toà nhà, tên đường
                    </label>
                    <small id="home-number-help">
                      VD: 24 Toà nhà 3 Dương Kỳ Hiệp
                    </small>
                  </div>
                  <div className="formBtn">
                    <button
                      type="submit"
                      className="confirm-btn"
                      onClick={handlePurchase}
                    >
                      Thanh toán
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => navigate("/")}
                    >
                      Cập nhật thông tin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            className="remove-modal"
            style={{ display: `${modalState ? "flex" : "none"}` }}
          >
            <div className="modal-container">
              <div className="modal__content">Xóa sản phẩm khỏi giỏ hàng?</div>
              <div className="modal__footer">
                <button
                  className="modal__button--confirm confirm-btn"
                  onClick={() => deleteItem(ReItem)}
                >
                  Xoá
                </button>
                <button
                  className="modal__button--cancel cancel-btn"
                  onClick={() => setModalState(false)}
                >
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
