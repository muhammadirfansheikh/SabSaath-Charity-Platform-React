import React, { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Card,
  Col,
  Row,
  CardHeader,
  Button,
  FormGroup,

} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
import FormGroupInput from 'components/GeneralComponent/FormGroupInput.jsx';
import Swal from 'sweetalert2';
import { Link, useParams } from "react-router-dom";
import { fetchData } from 'utils/Api.js';
import * as api from "../../utils/Api.js";
import { useLocation } from "react-router-dom";
import { Alignment } from 'react-data-table-component';
import PasswordStrengthMeter from 'functions/PasswordStrengthMeter.js';

const ResetPassword = (props) => {

  const { id } = useParams()

  const initialValues = {
    NewPassword: "",
    ConfirmPassword: "",
    UserIP: localStorage.getItem('UserIP'),
  };

  const [formFields, setFormFields] = useState(initialValues);

  const handleInputChange = (event) => {
    if (event.target.name == "NewPassword") {
      setPasswordInput(event.target.value);
    }
    else {
      setPasswordInput_Con(event.target.value);
    }
  };
  //const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
  const strongRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (strongRegex.test(passwordInput)) {
      if (passwordInput.length < 8) {
        Swal.fire({
          title: "Error",
          text: "Password must have at least 8 characters, including 1 Capital letter, 1 Small letter, and 1 Numeric character.",
          icon: "error",
        });
        return;
      }
      requestCall();
    }
    else {
      Swal.fire({
        title: "Error",
        text: "Password must have at least 8 characters, including 1 Capital letter, 1 Small letter, and 1 Numeric character.",
        icon: "error",
      });
      return;
    }
  };


  const requestCall = async (e) => {
    if (passwordInput !== passwordInput_Con) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }



  
    // Swal.fire({
    //   customClass: {
    //     container: "my-swal",
    //   },
    //   text: "Are you sure to save the record?",
    //   icon: "success",
    //   showCancelButton: true,
    //   cancelButtonText: `Cancel`,
    //   cancelButtonColor: "#2f4050",
    //   confirmButtonText: `Confirm`,
    //   confirmButtonColor: "#bf1e2e",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    api
      .fetchData("WebSite", "Donor_WebSite_Register", {
        OperationID: "4", //reset password 
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNo: "",
        Address: "",
        CityId: "0",
        CountryId: "0",
        NewPassword: passwordInput,
        DonorId: id,
        UserIP: localStorage.getItem('UserIP'),
        URL: "",

      })
      .then((result) => {
        if (result?.DataSet?.Table[0]?.haserror > 0) {
          Swal.fire({
            title: "Error",
            text: result?.DataSet?.Table[0]?.ERRORMESSAGE,
            icon: "error",
          });
          return;
        }
        else {
          Swal.fire({
            title: "Success",
            text: result.DataSet.Table[0].Message,
            icon: "success",
          });
          props.history.push("/login");
        }
      });
    // }
    //});
  };


  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const [passwordType_Con, setPasswordType_Con] = useState("password");
  const [passwordInput_Con, setPasswordInput_Con] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      //  setpassword("text")
      return;
    }
    setPasswordType("password")
    //setpassword("password")
  }

  const togglePassword_Confirm = () => {
    if (passwordType_Con === "password") {
      setPasswordType_Con("text")
      return;
    }
    setPasswordType_Con("password")
  }

  return (
    <div className="maincontent">
      <HomeHeader />
      <div className='content'>
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0">Reset Password</h1>
         
          </div>
        </section>
        <section className="section p-0 mt-5 mb-4">
        </section>

        <section className="section pt-0">
          <div className="container">
          
          <div className="content">
            <Row>
              <Col lg={12} md={12}>
                <Card  >

                  <CardBody className="d-flex justify-content-center"   >
                    <form onSubmit={handleSubmit} style={{width:"300px"}}>

                      <div>
                      <FormGroup>
                          <Row>
                            <Col md={12}>
                              <div className="input-group-btn">
                               <label>Note: Password must have at least 8 characters, including 1 Capital letter, 1 Small letter, and 1 Numeric character.</label>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          <Row>
                            <Col md={12}>
                              <div className="input-group-btn">
                                <FormGroupInput
                                  label="New Password*"
                                  name="NewPassword"
                                  // onChange={(e) =>handlePasswordChange()
                                  onChange={handleInputChange}
                                  placeholder="Enter New Password"
                                  className="form-control"
                                  type={passwordType}
                                  value={passwordInput}
                                  required={true}
                                />
                                <span className=" btn_eye_icon" onClick={togglePassword}>
                                  {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                </span>
                                {passwordInput.length > 0 ? (
                                  <PasswordStrengthMeter
                                    Password={passwordInput}
                                  />
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup>
                          <Row>
                            <Col md={12}>
                              <div className="input-group-btn">
                                <FormGroupInput
                                  label="Confirm Password*"
                                  name="ConfirmPassword"
                                  // onChange={(e) =>handlePasswordChange()
                                  onChange={handleInputChange}
                                  placeholder="Enter Confirm Password"
                                  className="form-control"
                                  type={passwordType_Con}
                                  value={passwordInput_Con}
                                  required={true}
                                />
                                <span className=" btn_eye_icon" onClick={togglePassword_Confirm}>
                                  {passwordType_Con === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                        <Col md={12} className="text-right">
                          <Button
                            color="primary"
                            size="sm"
                            className="mb-2"
                          >
                            Reset Password
                          </Button>
                        </Col>
                      </div>
                      {/* </FormGroup> */}
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          </div>
        </section>
      </div>
      <HomeFooter />
    </div>
  )
}

export default ResetPassword



