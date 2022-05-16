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
import { useSelector } from "react-redux";

const VnpayReturn = () => {
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
          data.message === "Success" &&
          userRequest()
            .post(`cart/purchase/${userID}`)
            .then()
            .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, [searchParams, userID]);

  return (
    <>
      <Header></Header>
      <div className='cartPage'>
        <section className='content vnpay'>
          <div className='empty-cart'>
            {returnData !== null ? (
              returnData.message === "Success" ? (
                <>
                  <h1>Thanh toán thành công</h1>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <Link to='/purchase' className='confirm-btn'>
                    Tới lịch sử mua hàng
                  </Link>
                </>
              ) : (
                <>
                  <h1>Đã có lỗi xảy ra</h1>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  <Link to='/cart' className='confirm-btn'>
                    Về giỏ hàng của bạn
                  </Link>
                </>
              )
            ) : (
              <>
                <h1>Đã có lỗi xảy ra</h1>
                <FontAwesomeIcon icon={faExclamationCircle} />
                <Link to='/cart' className='confirm-btn'>
                  Về giỏ hàng của bạn
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default VnpayReturn;
