import { useEffect, useRef } from 'react';
import './index.scss';

function ModalPopUp({ name, modalState, toogleState, handelClickConfirm }) {
  const modalContainerRef = useRef();
  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target) &&
        modalState != undefined
      )
        toogleState(false);
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  });
  const content = `Xóa sản phẩm khỏi ${name}?`;
  return (
    <div
      className={`remove-modal${modalState == undefined ? '' : ' opened'}${
        modalState === false ? ' out' : ''
      }`}
    >
      <div className="modal-background">
        <div className="modal-container" ref={modalContainerRef}>
          <div className="modal__content">{content}</div>
          <div className="modal__footer">
            <button
              className="modal__button--confirm confirm-btn"
              onClick={() => handelClickConfirm()}
            >
              Xoá
            </button>
            <button
              className="modal__button--cancel cancel-btn"
              onClick={() => toogleState(false)}
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPopUp;
