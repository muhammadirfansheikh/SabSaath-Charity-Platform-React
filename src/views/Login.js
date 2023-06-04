import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchData, fetchIp } from "../utils/Api.js";
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
} from "../utils/Constants.js";

import "assets/css/login.css";

import ModalComp from "../components/modal/ModalComp.js";
import ForgotModal from "../components/modal/ForgotModal.js";
import simagel from "../assets/img/sabsaath-logo.png";
import Swal from "sweetalert2";

import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { CountryWithCode } from "utils/CommonMethods.js";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import { event } from "jquery";
import JustInput from "components/GeneralComponent/JustInput.jsx";
import HomeFooter from "components/Footer/HomeFooter.js";
import LoginHeader from "components/Header/LoginHeader.js";
import "../assets/css/homestyles.css";
import HomeHeader from "components/Header/HomeHeader.js";
import { routesnew } from "../routesnew.js";


const Login = (props) => {
  const history = useHistory();



  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpenForgotModal, setIsOpenForgotModal] = useState(false);
  const [countryddl, setCountryddl] = useState([]);
  const [Country, setCountry] = useState("");
  const [EmailOrPhone, setEmailOrPhone] = useState(0);
  const [countrcodeName, setcountrcodeName] = useState("");




  React.useEffect(() => {
    GetCountry();
    const load = async () => {
      var result = await fetchIp();
      //
      if (result !== undefined && result !== null) {
        /*localStorage.setItem('UserIP', result.IPv4+",CountryCode:"+result.country_code+",country_name:"+result.country_name+",latitude:"+result.latitude+",longitude:"+result.longitude);*/
        localStorage.setItem("UserIP", result.IPv4);
      } else {
        localStorage.setItem("UserIP", "No Ip");
      }
    };
    load();
  }, []);

  const GetCountry = async () => {
    try {
      var data = await CountryWithCode(2);
      if (data?.Response === true) {
        setCountryddl(data?.DataSet?.Table);
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  async function handleLoginClick(e) {
    e.preventDefault();
    //setLoading(true);
    //

    if (EmailOrPhone === "0") {
      if (username === "") {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Please enter Email",
          icon: "error",
        });
        return
      }

    }

    if (EmailOrPhone === "1") {
      if (username === "") {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Please enter Phone",
          icon: "error",
        });
        return
      }
      else if (countrcodeName === "") {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Please enter Country Code",
          icon: "error",
        });
        return
      }

    }


    if (password === "") {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Please enter Password",
        icon: "error",
      });
      return
    }


    // {
    var data = {
      OperationTypeId: OperationTypeId.Authenticate,
      EmailAddress: username,
      Password: password,
      EmailOrPhone: EmailOrPhone,
      CountryCode: countrcodeName,
    };

    var result = await fetchData(
      ControllerName.User,
      ApiMethods.VerifyLogin,
      data
    );
    setLoading(false);
    if (result.DataSet.Table != null) { 
      if (parseInt(result.DataSet.Table[0].HasError) > 0) {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Email or Password is incorrect",
          icon: "error",
        });
      } else {
        if (result.Response === true && result.DataSet.Table.length > 0) {
          localStorage.setItem("UserId", result.DataSet.Table[0].UserId);
          localStorage.setItem("RoleId", result.DataSet.Table[0].RoleId);
          localStorage.setItem("Name", result.DataSet.Table[0].Name);
          try {
            var routesData = await routesnew();
            localStorage.setItem('routes', JSON.stringify(routesData.routes)) 
          } catch (error) {
            //    
          } 
          if (result.DataSet.Table[0].RoleId === 37) {
            history.push("/DonorDashboard");

          }
          else {
            history.push("/admin/Dashboard");
          }

        } else {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: result.ResponseMessage,
            icon: "error",
          }); 
        }
      }
    } else {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Some Thing Went Wrong",
        icon: "error",
      }); 
    } 
  }


  async function handleSignup(e) {
    e.preventDefault();
    history.push("/register");
  }


  async function handleForgotPasswordClick(e) {
    e.preventDefault();
    openForgotmodal();
  }

  const openNewmodal = () => {
    setOpenModal(true);
  };
  const closeNewmodal = () => {
    setOpenModal(false);
  };
  const openForgotmodal = () => {
    setIsOpenForgotModal(true);
  };
  const closeForgotmodal = () => {
    setIsOpenForgotModal(false);
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
    setpassword(evnt.target.value)
  }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      //  setpassword("text")
      return;
    }
    setPasswordType("password")
    //setpassword("password")
  }

  const handleInputChange = (e) => {

    setCountry(e.target.value)
    // let va = e.target.options[e.target.selectedIndex].text;
    setcountrcodeName(e.target.options[e.target.selectedIndex].text);


    //       setCountry(va)
  }; 

  const handleInputChange_r = (e) => {
    let val = e.target.value;
    setEmailOrPhone(val);
    setusername("");
    setCountry();
    setcountrcodeName("");
  };

  return (
    <>
  <HomeHeader hide />
      {/* <LoginHeader /> */}
      <form onSubmit={handleLoginClick}>
        <div className="auth-page">
          <div className="container">
            <div className="form-signin">
              <div className="signin-image">
                <img src={simagel} className="logo" alt="..." />
              </div>
              <div className="signin-field">
                <Row>
                  <Col md="12">
                    <div onChange={handleInputChange_r} className="d-flex justify-content-between mb-3" >
                      <div>

                        <Label className="phone-email" style={{ display: "none" }}>Email</Label>

                        <Input className="form-check-Input email" type="radio" value={0} name="Email" defaultChecked style={{ display: "none" }} />
                      </div>
                      <div>
                        <Input className="form-check-Input phone" type="radio" value={1} name="Email" style={{ display: "none" }} />
                        <Label className="phone-label" style={{ display: "none" }}>Phone</Label>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Col>
                  <Row>
                    <Col>
                      <Row>

                      </Row>
                    </Col>
                  </Row>

                </Col>
                <Row>

                  {/* <div> */}

                  {EmailOrPhone === "1" ? (
                    <Col md="4">
                      <FormGroupSelect
                        label="Code*"
                        name="Country"
                        value={Country}
                        onChange={handleInputChange}
                        list={countryddl}
                        fieldId="Countryid"
                        fieldName="Country"
                        required={true}
                      />
                    </Col>
                  ) : (
                    ""
                  )}
                  {/* </FormGroup> */}

                  {EmailOrPhone == "1" ? (
                    <Col md="8">
                      <Label>Phone*</Label>
                      <JustInput
                        name="user_phone"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        maxLength="15"
                        isNumber="true"
                        placeholder="Please ener phone no"
                        className="form-control"
                      // className="form-control"
                      //required={true}
                      />


                    </Col>
                  ) : (
                    <Col md="12">
                      <Label>Email*</Label>
                      <Input
                        // type="text"
                        name="user_id"
                        onChange={(e) => setusername(e.target.value)}
                        placeholder="Please enter email"
                        className="form-control"
                        required={true}
                        type="email"
                      />


                    </Col>
                  )}
                  {/* </div> */}
                </Row>
                <FormGroup>
                  <div className="input-group-btn">
                    <label>Password*</label>
                    <Input
                      //type="password"
                      name="user_password"
                      // onChange={(e) =>handlePasswordChange()
                      onChange={handlePasswordChange}
                      placeholder="Enter Password"
                      className="form-control"
                      type={passwordType}
                      value={passwordInput}
                      required={true}
                    />
                    <span className=" btn_eye_icon" onClick={togglePassword}>
                      {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                    </span>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Row className="mb-4">
                    <Col md={7}>
                      <a className="forget" href="#" onClick={handleForgotPasswordClick}>
                        Forgot Password?
                      </a>
                    </Col>
                    <Col md={5} className="text-right">

                      {/* <FormGroup className="text-right"> */}
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        value={loading ? "Loading..." : "Login"}
                        disabled={loading}
                      >Login
                      </Button>
                      {/* // onClick={handleLoginClick} */}

                      {/* </FormGroup> */}
                    </Col>
                  </Row>
                </FormGroup>
                No account?
                <a href="#" onClick={handleSignup}>
                  &nbsp;Create Now?
                </a>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </form>
      {error && (
        <ModalComp
          {...props}
          HeaderText="Error"
          ModalBodyMessage={error.ResponseMessage}
          Ismodalshow={openModal}
          closeNewmodal={closeNewmodal}
        />
      )}

      {isOpenForgotModal && (
        <ForgotModal
          {...props}
          HeaderText="Forgot Password"
          Ismodalshow={isOpenForgotModal}
          closeForgotmodal={closeForgotmodal}
        />
      )}
      <HomeFooter />
    </>
  );
};

export default Login;









