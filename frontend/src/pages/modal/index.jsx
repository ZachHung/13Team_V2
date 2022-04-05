import React from 'react';

function ModalPopUp({
  name,
  modalState,
  handelClickConfirm,
  handelClickCancel,
}) {
  return (
    <div
      className="remove-modal"
      style={{ display: `${modalState ? 'flex' : 'none'}` }}
    >
      <div className="modal-container">
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
  );
}

export default ModalPopUp;
