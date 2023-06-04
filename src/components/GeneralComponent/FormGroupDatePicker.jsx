import moment from "moment";
import React, { useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormGroupDatePicker = (props) => {
  const handleChange = (e) => {
    let data = {
      target: {
        name: e.target.name,
        value: e.target.value,
      },
    };
    props.onChange(data);
  };

  return (
    <FormGroup>
      <Label for="InputDate">{props.label}</Label>
      <Input
        id="datePicker"
        type="date"
        className="form-control"
        name={props.name}
        value={props.value}
        onChange={handleChange}
        required={props.required}
        disabled={props.disabled}
        min={props.min}
        data-date-format="dd/mm/yyyy"
      />
    </FormGroup>
  );
};


export default FormGroupDatePicker;
