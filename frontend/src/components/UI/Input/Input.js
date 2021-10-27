import React, { useRef, useImperativeHandle } from "react";
import "./Input.scss";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const currenValue = () => {
    return inputRef.current.value;
  };

  const setValue = (data) => {
    inputRef.current.value = data;
  };

  useImperativeHandle(ref, () => {
    return { value: currenValue, setValue: setValue };
  });
  return (
    <div className={`control ${props.isValid === false ? "invalid" : ""}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {props.type === "number" ? (
        <input
          type={props.type}
          min={props.min}
          step={props.step}
          id={props.id}
          ref={inputRef}
          required={props.required}
        />
      ) : (
        <input
          type={props.type}
          id={props.id}
          ref={inputRef}
          required={props.required}
        />
      )}
    </div>
  );
});

export default React.memo(Input);
