import React from 'react';
import { useState } from 'react';
import './modalLimit.scss';
export default function ModalLimitCompare() {
  const [active, setActive] = useState(false);
  const hanldeOnclick = () => {
    if (active == true) {
      setActive(false);
    } else {
      setActive(false);
    }
  };
  return (
    <>
      <div
        id="modal-container"
        onClick={hanldeOnclick}
        className={`${active == true ? 'modal-active' : ''}`}
      >
        <div className="modal-background">
          <div className="modal">
            <h2>I'm a Modal</h2>
            <p>Hear me roar.</p>
            <svg
              class="modal-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <rect
                x="0"
                y="0"
                fill="none"
                width="226"
                height="162"
                rx="3"
                ry="3"
              ></rect>
            </svg>
          </div>
        </div>
      </div>
      <div class="content">
        <h1>Modal Animations</h1>
        <div class="buttons">
          <div id="five" class="button">
            Meep Meep
          </div>
        </div>
      </div>
    </>
  );
}
