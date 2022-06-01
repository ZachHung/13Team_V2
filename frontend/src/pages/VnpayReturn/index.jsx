import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useEffect } from "react";
import { publicRequest, userRequest } from "../../utils/CallApi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setZero } from "../../redux/cart";
const VnpayReturn = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [returnData, setReturnData] = useState(null);
  const userID = useSelector((state) => state.user.current._id);
  useEffect(() => {
    publicRequest
      .get(`cart/vnpay_return?${searchParams}`)
      .then((res) => {
        setReturnData(res.data);
        return res.data;
      })
      .then(
        (data) =>
          data.code === "00" &&
          userRequest()
            .post(`cart/purchase/${userID}`)
            .then(() => {
              dispatch(setZero());
            })
            .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, [searchParams, userID]);

  return (
    <>
      <Header></Header>
      <div className="cartPage">
        <section className="content vnpay">
          <div className="empty-cart">
            {returnData !== null ? (
              returnData.code === "00" ? (
                <>
                  <h1>Thanh toán thành công</h1>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <Link to="/purchase" className="confirm-btn">
                    Tới lịch sử mua hàng
                  </Link>
                </>
              ) : (
                <>
                  <h1>Đã có lỗi xảy ra</h1>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  <Link to="/cart" className="confirm-btn">
                    Về giỏ hàng của bạn
                  </Link>
                </>
              )
            ) : null}
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default VnpayReturn;
