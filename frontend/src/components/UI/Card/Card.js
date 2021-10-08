import React from "react";

import "./Card.scss";

const Card = (props) => {
  console.log("from card");
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default React.memo(Card);