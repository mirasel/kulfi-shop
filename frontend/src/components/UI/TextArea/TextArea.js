import React from "react";
import "./TextArea.scss";

function TextArea(props) {
  console.log("from input");
  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={props.required}
        ref={props.ref}
        rows="5"
      />
    </div>
  );
}

export default React.memo(TextArea);
