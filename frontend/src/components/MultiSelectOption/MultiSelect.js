import React from "react";
import { default as ReactSelect, components } from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";
import "./MultiSelect.scss";

function Option(props) {
  return (
    <React.Fragment>
      <components.Option {...props}>
        <div className="option">
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />
          <label>{props.label}</label>
        </div>
      </components.Option>
    </React.Fragment>
  );
}

const animatedComponents = makeAnimated();

function MultiSelect(props) {
  const handleOnChange = (selected) => {
    if (
      selected !== null &&
      selected.length > 0 &&
      selected[selected.length - 1].value === props.allOption.value
    ) {
      return props.onChange(props.options);
    }
    return props.onChange(selected);
  };

  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ ...animatedComponents, Option }}
        options={[props.allOption, ...props.options]}
        onChange={handleOnChange}
      />
    );
  }

  return (
    <ReactSelect
      {...props}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ ...animatedComponents, Option }}
    />
  );
}

MultiSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

MultiSelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
};

export default MultiSelect;
