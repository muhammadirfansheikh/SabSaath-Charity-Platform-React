import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  Button,
  Modal,
} from "reactstrap";
import { fetchData } from "utils/Api";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import Swal from "sweetalert2";
import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import useEditRole from "hooks/useEditRole";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CountryWithCode,
  dateFormat,
  dateFormatPlaceholder,
  getCurrentDate,
  getDate,
  getDatefrom,
  GetSetupMaster,
} from "utils/CommonMethods";
import FollowUpModalEdit from "components/modal/FollowUpModalEdit";
import JustInput from "components/GeneralComponent/JustInput";
import { SetupMasterIds } from "utils/Constants";
import * as api from "../../utils/Api.js";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";
import { Link, useHistory } from "react-router-dom";
const initialValues = {
  FirstName: "",
  LastName: "",
  EmailAddress: "",
  PhoneNo: "",
  Address: "",
  City: 0,
  CountryId: 0,
  termsValue_IsChecked: false,

  UserId: 0,
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectList = {
  InvestigatorList: [],
};



const SignUpPanel = (props) => {
  initialValues.UserId = localStorage?.getItem("UserId") == null ? 0 : localStorage?.getItem("UserId")
  const history = useHistory();

  const [formFields, setFormFields] = useState({ ...initialValues });
  const [countryddl, setCountryddl] = useState([]);
  const [cityddl, setcityddl] = useState([]);
  const [disclamirModal, setDisclamirModal] = useState(false)


  useEffect(() => {

    GetCountry();
    GetCity();
    Get_DonorProfile_Data()
  }, []);

  const handleInputChange = (event) => {
    //console.log(event)
    // if (event.target.name == "termsValue_IsChecked") {
    //   if (event.target.value == true) {
    //     setFormFields({
    //       ...formFields,
    //       [event.target.name]: event.target.value,
    //     });
    //setDisclamirModal(true)
    if (event.target.name == "termsValue_IsChecked") {
      let val = event.target.checked;
      setFormFields({
        ...formFields,
        [event.target.name]: val,
      });
      // else {
      //   setFormFields({
      //     ...formFields,
      //     [event.target.name]: event.target.value,
      //   });
      // }

    } else {
      setFormFields({
        ...formFields,
        [event.target.name]: event.target.value,
      });
    }

  };


  const GetCountry = async () => {
    try {
      var data = await CountryWithCode(1);
      if (data?.Response === true) {
        // setCountryddl(data?.DataSet?.Table);
        setCountryddl(data?.DataSet?.Table?.map((item, ind) => ({
          ...item,
          Country: item.Country.split('_')[0]
        })));
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const GetCity = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.City, 0, "", 0);
      if (data != null) {
        if (data.response === true && data.data != null) {
          setcityddl(data.data);
          return data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };


  async function Get_DonorProfile_Data(e) {
    var data = {
      OperationID: "1",
      UserId: localStorage.getItem('UserId'),
      FirstName: "",
      LastName: "",
      Address: "",
      CountryId: 0,
      UserIP: "",
      PhoneNo: "",
      EmailAddress: "",
      URL: "",
    }
    var result = await fetchData(
      "WebSite", "Get_Profile_Data",
      data
    );
    if (result?.Response === true) {
      setFormFields({
        ...formFields,
        FirstName: result?.DataSet?.Table[0]?.FirstName,
        LastName: result.DataSet.Table[0].LastName,
        Address: result.DataSet.Table[0].Address,
        CountryId: result.DataSet.Table[0].CountryId,
        EmailAddress: result.DataSet.Table[0].EmailAddress,
        PhoneNo: result.DataSet.Table[0].ContactNumber,
      })
    }
    else {
      Swal.fire({
        title: "Error",
        text: result.data[0].ERRORMESSAGE,
        icon: "error",
      });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    let ApiMethodName = "";
    let URL = "";
    let OperationIds = "";
    if (formFields.PhoneNo != "") {
      if (formFields.PhoneNo.length < 7 || formFields.PhoneNo.length > 16) {

        Swal.fire({
          title: "Error",
          text: "Phone number length must be from 7 to 15 digits",
          icon: "error",
        });
        return
      }
    }
    if (localStorage.getItem("Name") === null) {
      ApiMethodName = "Donor_WebSite_Register";
      URL = api.baseApplicationUrl + "/DonorCreatePassword";
      OperationIds = "1";
    }
    else {
      ApiMethodName = "Get_Profile_Data";
      URL = "";
      OperationIds = "2";
    }

    if (localStorage.getItem("Name") === null) {
      if (!formFields.termsValue_IsChecked) {
        Swal.fire({
          title: "Error",
          text: "Please agree to terms and policies",
          icon: "error",
        });
        return
      }
    }


    api
      .fetchData("WebSite", ApiMethodName, {
        OperationID: OperationIds,
        FirstName: formFields.FirstName,
        LastName: formFields.LastName,
        EmailAddress: formFields.EmailAddress == "" ? "0" : formFields.EmailAddress,
        PhoneNo: formFields.PhoneNo == null ? "0" : formFields.PhoneNo,
        Address: formFields.Address,
        CityId: formFields.City,
        CountryId: formFields.CountryId,
        UserIP: localStorage.getItem('UserIP') === null ? "" : localStorage.getItem('UserIP'),
        DonorId: "0",
        NewPassword: "",
        URL: URL,
        UserId: localStorage.getItem('UserId'), 
      })
      .then((result) => { 
        if (result?.DataSet?.Table?.[0]?.haserror > 0) { 

          if (result?.DataSet?.Table?.[0]?.haserror === 1) {
            Swal.fire({
              title: "Error",
              text: result.DataSet.Table[0].Message,
              icon: "error",
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/login");
              }
              else {

              }
            });
          }
          else if (result?.DataSet?.Table?.[0]?.haserror === 2) {
            Swal.fire({
              title: "Error",
              text: result.DataSet.Table[0].Message,
              icon: "error",
              showCancelButton: true,
              confirmButtonText: 'Resend Activation Email',
            }).then((result) => {
              if (result.isConfirmed) {
                ApiMethodName = "Donor_WebSite_Register";
                URL = api.baseApplicationUrl + "/DonorCreatePassword";
                OperationIds = "7";
              }
              else {

                return
              }

              api
                .fetchData("WebSite", ApiMethodName, {
                  OperationID: OperationIds,
                  FirstName: formFields.FirstName,
                  LastName: formFields.LastName,
                  EmailAddress: formFields.EmailAddress == "" ? "0" : formFields.EmailAddress,
                  PhoneNo: formFields.PhoneNo == null ? "0" : formFields.PhoneNo,
                  Address: formFields.Address,
                  CityId: formFields.City,
                  CountryId: formFields.CountryId,
                  UserIP: localStorage.getItem('UserIP') === null ? "" : localStorage.getItem('UserIP'),
                  DonorId: "0",
                  NewPassword: "",
                  URL: URL,
                  UserId: localStorage.getItem('UserId'),
                })
                .then((result1) => {
                  
                  if (result1?.DataSet?.Table?.[0]?.haserror > 0) { 

                    Swal.fire({
                      title: "Error",
                      text: result1.DataSet.Table[0].ERRORMESSAGE,
                      icon: "error",
                    }).then((result1) => {
                      if (result1.isConfirmed) {
                        history.push("/login");
                      }
                      else {
                        return
                      }
                    });
                  }
                  else {
                    Swal.fire({
                      title: "Success",
                      //text: result1.DataSet.Table[0].MESSAGE,
                      //html: "<p>" + result1.DataSet.Table[0].MESSAGE + "</p><p>Please activate your account.</p>" ,
                      html: "<p>" + result1.DataSet.Table[0].MESSAGE + "</p>",
                      icon: "success",
                    }).then((result1) => {
                      if (result1.isConfirmed) {
                        history.push("/login");
                      }
                      else { return }
                    });
                  }
                });

            });
          } 
        }
        else {
          Swal.fire({
            title: "Success",
            //text: result.DataSet.Table[0].Message,
            //html: "<p>" + result.DataSet.Table[0].Message + "</p><p>Please activate your account.</p>" ,
            html: "<p>" + result.DataSet.Table[0].Message + "</p>",
            icon: "success",
          });

          if (localStorage.getItem("Name") === null) {
            history.push("/login")
          }
          else {
            history.push("/DonorDashboard")
          }
        }
      });
  }

  const handleVerifyCode = () => {
    setDisclamirModal(false)
  }

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Profile</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroupInput
                  label="First Name*"
                  name="FirstName"
                  placeholder="First Name"
                  value={formFields.FirstName}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="100"

                />
              </Col>

              <Col md={6}>
                <FormGroupInput
                  label="Last Name*"
                  name="LastName"
                  placeholder="Last Name"
                  value={formFields.LastName}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="100"
                />
              </Col>

              <Col md={6}>
                <FormGroupInput
                  label="Email Address*"
                  name="EmailAddress"
                  placeholder="Email Address"
                  value={formFields.EmailAddress}
                  onChange={handleInputChange}
                  required={true}
                  type="email"
                  disabled={localStorage?.getItem("UserId") === null ? false : true}
                />
              </Col>


              <Col md={6}>
                <Label>Phone No*</Label>
                <JustInput
                  name="PhoneNo"
                  value={formFields.PhoneNo}
                  onChange={handleInputChange}
                  maxLength="15"
                  isNumber="true"
                  placeholder="Phone No"
                  required={true}
                  disabled={localStorage?.getItem("UserId") === null ? false : true}
                />

              </Col>
              {/* <Col md={12}>
              <Label>Either email address or contact number is mandatory as login id</Label>
              </Col> */}

              <Col md={12}>
                <FormGroupInput
                  label="Address"
                  name="Address"
                  placeholder="Address"
                  value={formFields.Address}
                  onChange={handleInputChange}
                  maxLength="200"
                />
              </Col>
              {/* <Col md={6}>
                <FormGroupSelect
                  label="City/State"
                  name="City"
                  value={formFields.City}
                  onChange={handleInputChange}
                  list={cityddl}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                
                />
              </Col> */}

              <Col md={6}>
                <FormGroupSelect
                  label="Country*"
                  name="CountryId"
                  value={formFields.CountryId}
                  onChange={handleInputChange}
                  list={countryddl}
                  fieldId="Countryid"
                  fieldName="Country"
                  required={true}
                />
              </Col>

            </Row>
            <Row>

              {localStorage.getItem("Name") === null ? (
                <>
                  <Col md="6">
                    <div className="form-group">
                      <div className="form-check-inline mt-3">
                        <label className="form-check-Label" style={{ alignItems: 'center', display: 'flex' }}>
                          <input
                            className="form-check-Input form-check-input"
                            name="termsValue_IsChecked"
                            value={formFields.termsValue_IsChecked}
                            onChange={handleInputChange}
                            type="checkbox"
                          />
                          I agree to&nbsp;<Link to='/TermsAndConditions'>terms of use and privacy policy</Link>
                        </label>
                      </div>
                    </div>
                  </Col>
                  {/* <Col md={6}>
                  <Link to='/TermsAndConditions'>I agree to terms of use and privacy policy</Link>
                    <FormGroupCheckbox
                    
                      //label="I agree to terms of use and privacy policy"
                       name="termsValue_IsChecked"
                       value={formFields.termsValue_IsChecked}
                       onChange={handleInputChange}
                     
                    //disabled={role}
                    />
                     
                  </Col> */}
                  <Col md={2} className="pt-3">
                    <FormGroupButton
                      title="Create Account"
                      type="submit"
                      className="p-2"
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col md={6} className="pt-3">
                    <FormGroupButton
                      title="Update Profile"
                      type="submit"
                      className="p-2"
                    />
                  </Col>
                </>
              )}
            </Row>
          </form>
        </CardBody>
      </Card>

      {disclamirModal == true ? (
        <Modal
          isOpen={disclamirModal}
          centered
        // toggle={toggle}
        >

          <ModalHeader>
            Disclamir
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Col>
            </Row>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button color="primary" onClick={handleVerifyCode}>
                Close
              </Button>
            </div>

          </ModalBody>
        </Modal>
      ) : null}


    </div>
  );
};

export default SignUpPanel;
