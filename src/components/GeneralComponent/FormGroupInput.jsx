import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { number, bool, func, string, objectOf } from "prop-types";

const FormGroupInput = (props) => {
  let {
    label,
    type,
    name,
    value,
    onChange,
    disabled,
    required,
    maxLength,
    isNumber,
    placeholder,
    onBlur,
    onKeyPress,
  } = props;

  const handleChange = (e) => { 
    if (e.target.getAttribute("isnumber") === "true") {
      e.target.value = e.target.value.replace(/\D/g, "");
    }
    onChange(e);
  };
  return (
    <FormGroup>
      {label && (
        <Label
          style={{
            fontSize: 13,
            marginBottom: 2,
            color: "rgb(214, 11, 17)",
            fontWeight: "500",
          }}
        >
          {label}
        </Label>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        className="form-control"
        name={name}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        isnumber={isNumber}
        onBlur={onBlur}
        style={props.inputStyle}
        onKeyPress={onKeyPress}
      />
    </FormGroup>
  );
};

FormGroupInput.propTypes = {
  label: string,
  type: string,
  name: string,
  value: string,
  onChange: func,
  disabled: bool,
  required: bool,
  maxLength: string,
  isNumber: string,
  placeholder: string,
  onKeyPress: func,
};

export default FormGroupInput;
