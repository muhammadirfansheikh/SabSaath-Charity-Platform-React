import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";
import { any, bool, func, string } from "prop-types";

const FormGroupButton = (props) => {
  let { loading, color, type, onClick, title, disabled, className } = props;
  return props.hide === true ? null : (
    <FormGroup>
      <Button
        type={type}
        color={color ? color : "primary"}
        size="sm"
        onClick={onClick}
        disabled={loading || disabled}
        className={className}
      >
        {loading === true && (
          <Spinner
            size="sm"
            animation="border"
            variant="light"
            style={{ marginRight: 10 }}
          />
        )}
        {title}
      </Button>
    </FormGroup>
  );
};

FormGroupButton.propTypes = {
  onClick: func,
  color: string,
  title: string,
  loading: bool,
  disabled: bool,
  type: string,
  className: string,
};

export default FormGroupButton;
