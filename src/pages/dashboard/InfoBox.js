import React from "react";
import Card from "../../component/Card";
import '../../styles/Pages/Dashboard/InfoBox.css'

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={"info-box"}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};

export default InfoBox;