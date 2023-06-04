import { bool, element, func, string } from "prop-types"
import React from "react"
import { FormGroup, Input, Label } from "reactstrap"

const FormGroupCheckbox = (props) => {
  const handleChange = (event) => {
    props.onChange({
      target: { name: event.target.name, value: event.target.checked },
    })
  }

  return (
    <FormGroup style={{ padding: 10 }}>
      <div className="form-check-inline mt-3">
        <Label className="form-check-Label" id={props.id}>
          <Input
            type="checkbox"
            className="form-check-Input"
            name={props.name}
            checked={props.value}
            onChange={handleChange}
            disabled={props.disabled}
            id={props.id}
          />
          {props.label}
        </Label>
        {props.tooltip}
      </div>
    </FormGroup>
  )
}

FormGroupCheckbox.propTypes = {
  id: string,
  onChange: func,
  name: string,
  value: bool,
  label: string,
  tooltip: element,
}

export default FormGroupCheckbox
