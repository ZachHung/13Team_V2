import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) return setVisible(true);
    return setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div title="Go to top" className="scrollToTopBtn" onClick={scrollToTop}>
      <FontAwesomeIcon
        className="icon"
        style={{
          transform: !visible ? "translate(150px, 0px)" : "translate(0px, 0px)",
        }}
        icon={faChevronUp}
      />
    </div>
  );
};

export default ScrollButton;
