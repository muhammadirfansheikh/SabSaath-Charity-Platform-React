import React from "react"
import { FormGroup, Input, Label } from "reactstrap"
import { array, bool, element, func, number, string } from "prop-types"

const FormGroupSelect = (props) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      props.onKeyPress(event)
    }
  }
  return (
    <FormGroup>
      <Label>{props.label}</Label> {props.tooltip && props.tooltip}
      <Input
        id={props.id}
        name={props.name}
        type="select"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
        className={props.className}
        onKeyDown={handleKeyPress}
      >
        <option key="abc" value="">
          Select
        </option>
        {props?.list &&
          props?.list?.length &&
          props.list.map((item, index) => (
            <option key={index} value={item[props.fieldId]}>
              {item[props.fieldName]}
            </option>
          ))}
      </Input>
    </FormGroup>
  )
}

FormGroupSelect.propTypes = {
  label: string,
  id: number,
  name: string,
  value: string,
  onChange: func,
  disabled: bool,
  required: bool,
  list: array,
  fieldId: string,
  fieldName: string,
  className: string,
  tooltip: element,
}

export default FormGroupSelect
