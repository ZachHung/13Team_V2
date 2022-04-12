import { useEffect, useRef } from "react";
import "./index.scss";

function ModalPopUp({
  name,
  modalState,
  handelClickConfirm,
  handelClickCancel,
}) {
  const modalContainerRef = useRef();
  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target) &&
        modalState != undefined
      )
        modalState = false;
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div
      className={`remove-modal${modalState == undefined ? "" : " opened"}${
        modalState === false ? " out" : ""
      }`}
    >
      <div className="modal-background">
        <div className="modal-container" ref={modalContainerRef}>
          <div className="modal__content">Xóa sản phẩm khỏi {name}?</div>
          <div className="modal__footer">
            <button
              className="modal__button--confirm confirm-btn"
              onClick={() => handelClickConfirm()}
            >
              Xoá
            </button>
            <button
              className="modal__button--cancel cancel-btn"
              onClick={() => handelClickCancel()}
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
