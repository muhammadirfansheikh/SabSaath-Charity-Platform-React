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
import { useHistory } from "react-router-dom";
const initialValues = {
 FirstName: "",
 LastName:  "",
  EmailAddress: "",
  PhoneNo: "",
  Address:"",
  City:0,
  CountryId:0,
  termsValue_IsChecked:0,

  UserId: 0,
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectList = {
  InvestigatorList: [],
};



const SubscriptionDetail = (props) => {
  initialValues.UserId = localStorage?.getItem("UserId") == null ? 0 : localStorage?.getItem("UserId")
  const history = useHistory();

  const [formFields, setFormFields] = useState({ ...initialValues});
  const [countryddl, setCountryddl] = useState([]);
  const [cityddl, setcityddl] = useState([]);


  useEffect(() => {
 
   GetCountry();
   GetCity();
   Get_DonorProfile_Data()
  }, []);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };


  const GetCountry = async () => {
    try {
      var data = await CountryWithCode(1);
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

  const GetCity = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.City, 0,"",  0   );
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
          var  data =  {
            OperationID: "1",
            UserId: localStorage.getItem('UserId'),
            FirstName : "",
            LastName : "",
            Address : "",
            CountryId : 0,
            UserIP : "",
            PhoneNo: "",
            EmailAddress : "",
            URL:"",
          }
            var result = await fetchData(
            "WebSite", "Get_Profile_Data",
            data
          );
          if (result?.Response === true) 
          {
          
            setFormFields({
              ...formFields,
              FirstName: result?.DataSet?.Table[0]?.FirstName,
              LastName: result.DataSet.Table[0].LastName,
              Address : result.DataSet.Table[0].Address,
              CountryId : result.DataSet.Table[0].CountryId,
              EmailAddress : result.DataSet.Table[0].EmailAddress,
              PhoneNo : result.DataSet.Table[0].ContactNumber,
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

    if(localStorage.getItem("Name") === null)
    {
        ApiMethodName = "Donor_WebSite_Register";
        URL =  api.baseApplicationUrl +"/DonorCreatePassword";
        OperationIds = "1";
    }
    else
    {
       ApiMethodName = "Get_Profile_Data";
       URL =  "";
       OperationIds = "2";
    }

    if(localStorage.getItem("Name") === null)
    {
      if(!formFields.termsValue_IsChecked)
        {
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
             FirstName:    formFields.FirstName,
             LastName:     formFields.LastName,
             EmailAddress: formFields.EmailAddress == "" ? "0" : formFields.EmailAddress,
             PhoneNo: formFields.PhoneNo == "" ? "0" : formFields.PhoneNo,
             Address: formFields.Address,
             CityId : formFields.City,
             CountryId : formFields.CountryId,
             UserIP: localStorage.getItem('UserIP') === null ? "" : localStorage.getItem('UserIP'),
             DonorId : "0",
             NewPassword: "",
             URL: URL,
             UserId: localStorage.getItem('UserId'),
             //URL: "http://localhost:3000/DonorCreatePassword" r,
        })
        .then((result) => {
         //
           if (result?.DataSet?.Table[0]?.haserror > 0) {
          
             Swal.fire({
              title: "Error",
              text: result.DataSet.Table[0].Message,
              icon: "error",
            });
            return;
          }
          else
          {
                  Swal.fire({
                  title: "Success",
                  text: result.DataSet.Table[0].Message,
                  icon: "success",
                });

                if(localStorage.getItem("Name") === null)
                  {
                  history.push("/login")
                  }
                   else{
                    history.push("/DonorDashboard")
                 }
          }
       });
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
                          />
              </Col>
             

              <Col md={6}>
              <Label>Phone No</Label>
                             <JustInput
                                  name="PhoneNo"
                                  value={formFields.PhoneNo}
                                  onChange={handleInputChange}
                                  maxLength="15"
                                  isNumber="true"
                                  placeholder="Phone No"
                                  //required={true}
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
             <Col md={6}>
              <FormGroupCheckbox
                label="I agree to terms of use and privacy policy"
                name="termsValue_IsChecked"
                value={formFields.termsValue_IsChecked}
                onChange={handleInputChange}
                //disabled={role}
              />
            </Col>
            <Col md={2} className="pt-3">
                  <FormGroupButton
                    title="Create Account"
                    type="submit"
                    className="p-2"
                />
              </Col>
            </>
          ):(
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
   

    </div>
  );
};

export default SubscriptionDetail;
