import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './style.scss';
import { userRequest } from '../../utils/CallApi';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { currentChange } from '../../utils/const';
import {
  faXmark,
  faPlus,
  faMinus,
  faSadTear,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { setQuantity } from '../../redux/cart';
import ModalPopUp from '../../components/modal';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  str = str.replace(/^0+/, '') || '0';
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
}

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState([]);
  const [modalState, setModalState] = useState();
  const [deliveryFee, setDeliveryFee] = useState(25000);
  const [isChanged, setIsChanged] = useState(false);
  const [ReItem, setReItem] = useState({ optionID: '', color: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState();
  const payments = [
    { name: 'zalo', img: 'zaloPay-icon.png', message: 'Zalo Pay' },
    { name: 'cod', fontAwsome: faTruck, message: 'Thanh toán khi nhận hàng' },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCart = () => {
    userRequest()
      .get(`cart/${user.current._id}`)
      .then((res) => {
        setCart(res.data.list);
        dispatch(setQuantity(res.data.list));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const changeQuantity = (optionID, color, quantity) => {
    userRequest()
      .put(`cart/${user.current._id}`, {
        optionID: optionID,
        quantity: quantity,
        color: color,
      })
      .then(() => setIsChanged(!isChanged));
  };

  const deleteItem = (item) => {
    userRequest()
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
    setReItem({ optionID, color });
    setModalState(true);
  };
  const handlePurchase = () => {
    userRequest()
      .post(`cart/purchase/${user.current._id}`)
      .then()
      .catch((err) => console.log(err));
    navigate('/purchase');
  };

  useEffect(() => {
    getCart();
    AOS.init({
      offset: 50, //trigger offset in px
      duration: 350, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-back', // default easing for AOS animations
      once: true,
    });
    AOS.refresh();
  }, []);
  useEffect(() => getCart(), [isChanged]);
  if (isLoading)
    return (
      <>
        <Header></Header>
        <div className="cartPage">
          <section className="content">
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
        <ModalPopUp
          name="giỏ hàng"
          modalState={modalState}
          handelClickConfirm={() => deleteItem(ReItem)}
          toogleState={setModalState}
        />
        <section className="content">
          <aside className="box cart-container" data-aos="fade-up">
            <div className="box__heading">
              <span>1</span>
              <h2>Giỏ hàng</h2>
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
                              process.env.REACT_APP_SERVER_PATH +
                              item.optionID.color[0].image
                            }
                            alt={item.optionID.item.name}
                          />
                        </Link>
                      </div>
                      <div className="item__detail">
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={'fa-times'}
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
                      {currentChange(deliveryFee)}
                    </dd>
                  </dl>
                </div>
                <div className="total">
                  <dl className="order__summary">
                    <dt className="order__summary--label">Tổng cộng</dt>
                    <dd className="order__summary--decription">
                      {currentChange(getTotal(cart) + deliveryFee)}
                    </dd>
                  </dl>
                </div>
              </>
            )}
          </aside>
          {cart.length ? (
            <div className="right">
              <div className="box delivery-info" data-aos="fade-up">
                <div className="box__heading">
                  <span>2</span>
                  <h2>Thông tin vận chuyển</h2>
                </div>
                <div className="user-information">
                  <h2 className="greeting">
                    Xin chào, {user.current.name.split(' ').slice(-1).join(' ')}
                  </h2>
                  <h3 className="sub-heading">
                    Hãy chắc chắn rằng thông tin vận chuyển của bạn là chính xác
                  </h3>
                  <form className="row">
                    <div className="form-group col-6">
                      <input
                        type="text"
                        id="fullName"
                        value={user.current.name}
                        placeholder=""
                        readOnly
                      />
                      <label htmlFor="fullName">Họ và tên</label>
                    </div>
                    <div className="form-group col-6">
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={user.current.phone}
                        placeholder=""
                        readOnly
                      />
                      <label htmlFor="phoneNumber">Số điện thoại</label>
                    </div>
                    <div className="form-group col-12">
                      <input
                        type="text"
                        id="provice/city"
                        value={user.current.address.province}
                        placeholder=""
                        readOnly
                      />
                      <label htmlFor="provice/city">Tỉnh/thành phố</label>
                    </div>
                    <div className="form-group col-6">
                      <input
                        type="text"
                        id="district"
                        value={user.current.address.district}
                        placeholder=""
                        readOnly
                      />
                      <label htmlFor="district">Quận/huyện</label>
                    </div>
                    <div className="form-group col-6">
                      <input
                        type="text"
                        id="sub-district"
                        value={user.current.address.ward}
                        placeholder=""
                        readOnly
                      />
                      <label htmlFor="sub-district">Phường/xã</label>
                    </div>
                    <div className="form-group col-12">
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
                    </div>

                    <div className="formBtn">
                      <button
                        className="confirm-btn"
                        onClick={() => navigate('/')}
                      >
                        Cập nhật thông tin
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="box payment-method" data-aos="fade-up">
                <div className="box__heading">
                  <span>3</span>
                  <h2>Phương thức thanh toán</h2>
                </div>
                <form className="methods">
                  {payments.map((item, index) => (
                    <label
                      key={index}
                      className={`${
                        payment !== item.name ? 'disabled' : 'checked'
                      }`}
                    >
                      <span className="methods__custom-radio">
                        <input
                          type="radio"
                          autoComplete="off"
                          value={item.name}
                          checked={payment === item.name}
                          onChange={(e) => setPayment(e.target.value)}
                        />
                      </span>
                      <span className={'methods__icon'}>
                        {item.img ? (
                          <img src={`/images/${item.img}`} />
                        ) : (
                          <FontAwesomeIcon icon={item.fontAwsome} />
                        )}
                      </span>
                      <span className="methods__name">{item.message}</span>
                    </label>
                  ))}
                  <div className="formBtn">
                    <button
                      className="confirm-btn"
                      disabled={payment == undefined}
                      onClick={() => handlePurchase()}
                    >
                      Thanh toán
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
