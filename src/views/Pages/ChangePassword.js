import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import PasswordStrengthMeter from "functions/PasswordStrengthMeter";
import React, { useState, state } from "react";
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Row } from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";

const initialValues = {
  OldPassword: "",
  Password: "",
  UserId: localStorage.getItem("UserId"),
};
const ChangePassword = () => {

  // console.log(localStorage.getItem("UserId"))
  const [passwordType, setPasswordType] = useState("password");
  const [NewPassword_Type, setNewPassword_Type] = useState("password");
  const [formFields, setFormFields] = useState(initialValues);
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,

      [event.target.name]: event.target.value,
      UserId: localStorage.getItem("UserId")
    });
  };

  const strongRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)

  const [value, setvalue] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (strongRegex.test(formFields.Password)) {
      if (formFields.Password.length < 8) {
        Swal.fire({
          title: "Error",
          text: "Password must have at least 8 characters, including 1 Capital letter, 1 Small letter, and 1 Numeric character.",
          icon: "error",
        });
        return;
      }

      requestCall(formFields);
    }
    else {
      Swal.fire({
        title: "Error",
        text: "Password must have at least 8 characters, including 1 Capital letter, 1 Small letter, and 1 Numeric character.",//result?.DataSet?.Table[0]?.Msg,
        icon: "error",
      });
      return;
    }

  };
  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (payload) => {

    fetchData("User", "User_Change_Password", {
      ...payload,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.HasError > 0) {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table[0]?.Msg,
          icon: "error",
        });
        return;
      } else {
        Swal.fire({
          title: "Success",
          text: result?.DataSet?.Table[0]?.Msg,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            setFormFields({ ...initialValues });
          }
        });
      }
    });
  }

  const toggl_OldPassword = () => {

    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const toggl_NewPassword = () => {

    if (NewPassword_Type === "password") {
      setNewPassword_Type("text")
      return;
    }
    setNewPassword_Type("password")
  }




  return (
    <div className="content">
      <Row>
        <Col lg={12} md={12}>
          <Card className="card-user">
            <CardHeader>
              <Row>
                <Col lg={6} md={6}>
                  Update Password
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Row>
                  <Col md={12}>
                    <div className="input-group-btn">
                      <label>Note: Password must have at least 8 characters, including 1 Capital letter, 1 Small letter, and 1 Numeric character.</label>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <div className="input-group-btn">
                      <FormGroupInput
                        //type="password"
                        label="Old Password*"
                        name="OldPassword"
                        value={formFields.OldPassword}
                        onChange={handleInputChange}
                        required={true}
                        type={passwordType}
                      />
                      <span className=" btn_eye_icon" onClick={toggl_OldPassword}>
                        {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <div className="input-group-btn">
                      <FormGroupInput
                        // type="password"
                        label="New Password*"
                        name="Password"
                        value={formFields.Password}
                        onChange={handleInputChange}
                        required={true}
                        type={NewPassword_Type}
                      />
                      <span className=" btn_eye_icon" onClick={toggl_NewPassword}>
                        {NewPassword_Type === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                      </span>
                      {formFields.Password > 0 ? (
                        <PasswordStrengthMeter
                          Password={formFields.Password}
                        />
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Button
                  color="primary"
                  size="sm"
                  className="mb-2"
                >
                  Update Password
                </Button>

              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
