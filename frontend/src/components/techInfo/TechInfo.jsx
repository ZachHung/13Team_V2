import React from "react";
import "./TechInfo.scss";
const TechInfo = ({ demoArray }) => {
  return (
    <ul className="techInfo__container">
      {demoArray.map((item, index) => {
        if (index < 5) {
          return (
            <li className="techInfo__item row" key={index}>
              <p className="techInfo__name col-4"> {item.infoName} </p>
              <p className="techInfo__value col-8"> {item.infoNum}</p>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default TechInfo;
