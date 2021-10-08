import React from "react";
import "./Input.scss";

function Input(props) {
  console.log("from input");
  return (
    <div className={`control ${props.isValid === false ? "invalid" : ""}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={props.required}
      />
    </div>
  );
}

export default React.memo(Input);
