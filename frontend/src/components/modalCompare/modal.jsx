import { useNavigate } from 'react-router-dom';

import './modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function ModalCompare({
  handleClickCompare,
  infoProducts,
  type,
  urlImages,
  disableCompareModal,
  handleClickCancelCompare,
}) {
  console.log('infoProducts: ', infoProducts, type);
  const navigateCompare = useNavigate();
  var convertToStr;
  if (infoProducts.length >= 2) {
    convertToStr = infoProducts.join(',');
  }
  const handleOnclickCompare = () => {
    if (infoProducts.length < 2) {
      alert('hãy chọn đủ 2 sản phẩm');
    } else {
      window.history.pushState(
        {},
        'So sánh',
        `http://localhost:3000/compare?${type}=${convertToStr}`
      );
      navigateCompare(`../compare?${type}=${convertToStr}`);
    }
  };
  return (
    <div
      className={`${
        disableCompareModal == true
          ? 'modalCompare-container disableCompareModal '
          : 'modalCompare-container '
      }`}
    >
      <h1>Sản phẩm cần so sánh(chọn tối đa 2 sản phẩm)</h1>
      <div className="products-compare">
        {urlImages.map((item, i) => (
          <div className="product-compare" key={i}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="icon-circleXmark"
              onClick={() => handleClickCompare(infoProducts[i], item)}
              // onClick={() =>
              //   console.log('clicked icon: ', infoProducts[i], item)
              // }
            ></FontAwesomeIcon>
            <img src={item}></img>
          </div>
        ))}
      </div>
      <div className="wrap-btn">
        <button
          className="btn btn-compare"
          onClick={() => handleOnclickCompare()}
        >
          <p>So sánh lựa chọn</p>
        </button>
        <button className="btn btn-cancel" handleClickCancelCompare>
          <p>Hủy</p>
        </button>
      </div>
    </div>
  );
}

export default ModalCompare;
