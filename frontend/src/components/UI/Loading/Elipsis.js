import React from "react";
import "./Elipsis.scss";

function Elipsis(props) {
  return (
    <div className="elipsis" style={props.style}>
      <div className="bubble">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Elipsis;
