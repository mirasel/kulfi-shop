import React, { useRef, useImperativeHandle } from "react";
import "./TextArea.scss";

const TextArea = React.forwardRef((props, ref) => {
  const textareaRef = useRef();

  const currenValue = () => {
    return textareaRef.current.value;
  };

  const setValue = (data) => {
    textareaRef.current.value = data;
  };

  useImperativeHandle(ref, () => {
    return { value: currenValue, setValue: setValue };
  });
  return (
    <div className={`control ${props.isValid === false ? "invalid" : ""}`}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <textarea
        type={props.type}
        id={props.id}
        required={props.required}
        ref={textareaRef}
        rows={props.rows}
      />
    </div>
  );
});

export default React.memo(TextArea);
