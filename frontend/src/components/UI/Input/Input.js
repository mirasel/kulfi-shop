import React, { useRef, useImperativeHandle } from "react";
import "./Input.scss";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const currenValue = () => {
    return inputRef.current.value;
  };

  useImperativeHandle(ref, () => {
    return { value: currenValue };
  });
  return (
    <div className={`control ${props.isValid === false ? "invalid" : ""}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        // value={props.value}
        // onChange={props.onChange}
        onBlur={props.onBlur}
        ref={inputRef}
        required={props.required}
      />
    </div>
  );
});

export default React.memo(Input);
