import './modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function ModalCompare() {
  return (
    <div className="modalCompare-container">
      <h1>Sản phẩm cần so sánh(tối đa 3 sản phẩm khác nhau)</h1>
      <div className="products-compare">
        <div className="product-compare">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="icon-circleXmark"
          ></FontAwesomeIcon>
          <img src="https://team-13.herokuapp.com/image/apple/ipad-mini-6/grey.jpg"></img>
        </div>
        <div className="product-compare">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="icon-circleXmark"
          ></FontAwesomeIcon>
          <img src="https://team-13.herokuapp.com/image/samsung/galaxy-tab-s7/bronze.jpg"></img>
        </div>
      </div>
      <div className="wrap-btn">
        <button className="btn btn-compare">
          <p>So sánh lựa chọn</p>
        </button>
        <button className="btn btn-cancel">
          <p>Hủy</p>
        </button>
      </div>
    </div>
  );
}

export default ModalCompare;
