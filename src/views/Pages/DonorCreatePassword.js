import React, { useEffect, useState } from 'react'
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
import PasswordStrengthMeter from 'functions/PasswordStrengthMeter.js';

const DonorCreatePassword = (props) => {
  const { id } = useParams()
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordType_Con, setPasswordType_Con] = useState("password");
  const [passwordInput_Con, setPasswordInput_Con] = useState("");

  useEffect(() => {
    UserExpiry_Check();
  }, []);


  const handleInputChange = (event) => {
    if (event.target.name == "NewPassword") {
      setPasswordInput(event.target.value);
    }
    else {
      setPasswordInput_Con(event.target.value);
    }
  };

  // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
  //"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
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
      requestCall(passwordInput);
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
  const requestCall = async (e) => { 
    if (passwordInput !== passwordInput_Con) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }
    api
      .fetchData("WebSite", "Donor_WebSite_Register", {
        OperationID: "2", //update password 
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
        if (result?.DataSet != null) {
          if (result?.DataSet?.Table[0].haserror > 0) {
            Swal.fire({
              title: "Error",
              text: result?.DataSet?.Table[0]?.ERRORMESSAGE,
              icon: "error",
            });
            props.history.push("/login");
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
        }
        else
        { 
          Swal.fire({
            title: "Error",
            text: "Error",
            icon: "error",
          });
          return;
        }

      }); 
  };

  const UserExpiry_Check = async (e) => {
    
    api
      .fetchData("WebSite", "Donor_WebSite_Register", {
        OperationID: "5", //Expiry Check 
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNo: "",
        Address: "",
        CityId: "0",
        CountryId: "0",
        NewPassword: "",
        DonorId: id,
        UserIP: localStorage.getItem('UserIP'),
        URL: "",

      })
      .then((result) => {
        if (result?.DataSet?.Table[0]?.haserror == 2) {
          Swal.fire({
            icon: "info",
            showCancelButton: true,
            cancelButtonText: `Cancel`,
            cancelButtonColor: "#2f4050",
            confirmButtonText: `Resend Acctivation Link`,
            confirmButtonColor: "#bf1e2e",
            text: result?.DataSet?.Table[0]?.ERRORMESSAGE,
            //html: result?.DataSet?.Table[0]?.ERRORMESSAGE+"</br><a href='#'>Resend Acctivation Link</a>", 
            icon: "error",
          }).then(async (result2) => {
            if (result2.isConfirmed) {
              await EmailSent();
              props.history.push("/login");
            }
            else {
              props.history.push("/login");
            }
          }
          );
        } 
        else {
          if ((result?.DataSet?.Table[0]?.haserror == 1)) {
            Swal.fire({
              title: "Error",
              text: result?.DataSet?.Table[0]?.ERRORMESSAGE,
              icon: "error",
            });
            props.history.push("/login");
            return
          }
        }
      });
  };


  const EmailSent = async (e) => {
    api
      .fetchData("WebSite", "Donor_WebSite_Register", {
        OperationID: "6", //Resent Activation Link 
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        PhoneNo: "",
        Address: "",
        CityId: "0",
        CountryId: "0",
        NewPassword: "",
        DonorId: id,
        UserIP: localStorage.getItem('UserIP'),
        URL: api.baseApplicationUrl + "/DonorCreatePassword",
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

        }
      });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
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
            <h1 className="mb-0">Create Password</h1>
     
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

export default DonorCreatePassword



