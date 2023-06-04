import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox";
import FormGroupDatePicker from "components/GeneralComponent/FormGroupDatePicker";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import ModalApplHistory from "components/modal/ModalApplHistory";
import useEditRole from "hooks/useEditRole";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";
import { getDate, updateDataGeneric } from "utils/CommonMethods";
import { ControllerName } from "utils/Constants";
import ContactDetails from "./ContactDetails";
//import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateFormat, dateFormatPlaceholder } from "utils/CommonMethods";
import moment from "moment";

const initialValues = {
  ApplicantCaseCode: null,
  ApplicantCase_InvestigationId: 0,
  CnicNo: "",
  FirstName: "",
  LastName: "",
  GenderId: "",
  FatherName: "",
  DateOfBirth: "",
  FamilyNumber: null,
  ReligionId: "",
  NoOf_HouseHold_Member: null,
  NoOf_Family_Members_Accompanying: null,
  IsJoinFamily: true,
  CountryId: "",
  ProvinceId: "",
  CityId: "",
  TemperoryAddresss: "",
  PermanentAddress: "",
  AcceptanceOfCharity_Ids: "",
  ArrayApplicantPersonalInformation: [],
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
  PrimaryFundCategoryId: "",
  FundAmount_Required: 0,

  DistrictId: "",
  UnionId: "",
  AreaId: "",
  MartialStatusId:"",

  // "OperationId": 2,
  // "ApplicantCase_InvestigationId": "3",
  // "CnicNo": "4210125601032",
  // "FirstName": "Usman Karbalai",
  // "LastName": "Ghani",
  // "GenderId": 14,
  // "FatherName": "Abdul Ghani",
  // "DateOfBirth": "",
  // "FamilyNumber": null,
  // "ReligionId": null,
  // "NoOf_HouseHold_Member": 4,
  // "NoOf_Family_Members_Accompanying": 45201,
  // "IsJoinFamily": true,
  // "CityId": 9,
  // "TemperoryAddresss": "",
  // "PermanentAddress": "Hno# 123, Nagan Chowrangi, Karachi",
  // "AcceptanceOfCharity_Ids": "323,322",
  // "ArrayApplicantPersonalInformation": [],
  // "UserId": "2",
  // "UserIP": "101.53.248.38"
};

const initialSelectionList = {
  GenderList: [],
  ReligionList: [],
  CountryList: [],
  ProvinceList: [],
  CityList: [],
  SupportList: [],

  DistrictList: [],
  UnionList: [],
  AreaList: [],
  MartialStatusList: [],
};

const PersonalInformation = (props) => {
  const [role, appId] = useEditRole();

  const [personalInformation, setPersonalInformation] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [acceptanceOfCharity, setAcceptanceOfCharity] = useState([]);
  const [additionalPersonalDetail, setAdditionalPersonalDetail] = useState([]);
  const [selectionList, setSelectionList] = useState(initialSelectionList);

  useEffect(() => {
    const fetchApplicantId = () => {
      fetchData(
        ControllerName.Applicant,
        "Crud_Applicant_Personal_Information_Detail",
        {
          OperationId: 1,
          ApplicantCase_InvestigationId:
            personalInformation.ApplicantCase_InvestigationId,
        }
      ).then((result) => {
        
        setSelectionList({
          ...selectionList,
          GenderList: result.DataSet.Table3,
          CountryList: result.DataSet.Table4,
          ProvinceList: result.DataSet.Table5,
          CityList: result.DataSet.Table6,
          ReligionList: result.DataSet.Table7,
          SupportList: result.DataSet.Table10,

          DistrictList: result.DataSet.Table11,
          UnionList: result.DataSet.Table12,
          AreaList: result.DataSet.Table13,

          MartialStatusList: result.DataSet.Table14,
        });

        setPersonalInformation({
          ...personalInformation,
          ...result.DataSet.Table[0],
        });

        setAcceptanceOfCharity([...result.DataSet.Table1]);
        setAdditionalPersonalDetail([...result.DataSet.Table2]);
      });
    };
    fetchApplicantId();
  }, [setSelectionList, setPersonalInformation]);

  const handleSubmit = (e) => {
  


    e.preventDefault();
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to edit the record?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed)
      {
    
    
    let listString = [];
    acceptanceOfCharity.forEach((item) => {
      if (item.IsChecked === true) {
        listString.push(item.AcceptanceOfCharityId);
      }
    });
    requestCall(2, listString.join(","));
  };
    })
  }

  /**
   * change the value of the object as per the form field changes
   * @param {{}} event
   */

  const AllDateSet = (event, type) => {
     if (type === "DateOfBirth") {
      setPersonalInformation({
        ...personalInformation,
        DateOfBirth: getDate(event, "/"),
        // familyDateOfBirth: event,
      });
    }
  };

  const handlePersonalInfoChange = (event) => {
    setPersonalInformation({
      ...personalInformation,
      [event.target.name]: event.target.value,
    });
  };

  const handleAcceptanceForCharity = (e, index) => {
    acceptanceOfCharity[index].IsChecked = e.target.checked;
    setAcceptanceOfCharity([...acceptanceOfCharity]);
  };

  const handleAdditionalInfo = (e, index) => {
    additionalPersonalDetail[index][e.target.name] = e.target.value;
    setAdditionalPersonalDetail([...additionalPersonalDetail]);
  };

  const requestCall = (OpId, string) => {
    setPersonalInformation({ ...personalInformation });
    fetchData(
      ControllerName.Applicant,
      "Crud_Applicant_Personal_Information_Detail",
      {
        ...personalInformation,
        OperationId: OpId,
        AcceptanceOfCharity_Ids: string,
        ArrayApplicantPersonalInformation: additionalPersonalDetail,
      }
    ).then((response) => {
    
      if (response?.DataSet?.Table[0]?.HasError === 0) {
        Swal.fire({
          title: "Success",
          text: response?.DataSet?.Table[0]?.Message,
          //text: response?.data?.Message,
          icon: "success",
        });
        return;
      }
      Swal.fire({
        title: "Error",
        text: response?.data?.Message,
        //text: response?.DataSet?.Table[0]?.Message,
        icon: "error",
      });
    });
  };

  const UpdateSupportDetail = async () => {

    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to edit the record?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed)
      {
       fetchData(ControllerName.Applicant, "UpdateSupportDetail", {
      ApplicantCase_InvestigationId: appId,
      SupportId: personalInformation.PrimaryFundCategoryId,
      FundRequired: personalInformation.FundAmount_Required,
    }).then((response) => {
      if (response?.DataSet?.Table[0]?.HasError === 1) {
        Swal.fire({
          title: "Error",
          text: response?.data?.Message,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Success",
        text: response?.DataSet?.Table[0]?.Message,
        icon: "success",
      });
    });
  }
})
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Personal Information</h6>
          </CardHeader>
          <CardBody>
            <Row form>
              <Col md={3}>
                <FormGroupInput
                  label="Case Code"
                  name="ApplicantCaseCode"
                  value={personalInformation.ApplicantCaseCode}
                  disabled={true}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="First Name"
                  name="FirstName"
                  value={personalInformation.FirstName}
                  onChange={handlePersonalInfoChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Last Name"
                  name="LastName"
                  value={personalInformation.LastName}
                  onChange={handlePersonalInfoChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Father Name/Husband Name*"
                  name="FatherName"
                  value={personalInformation.FatherName}
                  onChange={handlePersonalInfoChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="CNIC Number*"
                  name="CnicNo"
                  value={personalInformation.CnicNo}
                  onChange={handlePersonalInfoChange}
                  disabled={true}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Gender"
                  name="GenderId"
                  value={personalInformation.GenderId}
                  onChange={handlePersonalInfoChange}
                  list={selectionList.GenderList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Marital Status"
                  name="MartialStatusId"
                  value={personalInformation.MartialStatusId}
                  onChange={handlePersonalInfoChange}
                  list={selectionList.MartialStatusList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Family Number"
                  name="FamilyNumber"
                  value={personalInformation.FamilyNumber}
                  onChange={handlePersonalInfoChange}
                  // isNumber="true"
                  maxLength="6"
                  disabled={role}
                />
              </Col>

              {/* <Col md={3}>
                <FormGroupDatePicker>
                  <Label for="InputDate">Date of Birth</Label>
                  <Input
                    //type="date"
                    //className="form-control"
                    //id="InputDate"
                    name="DateOfBirth"
                    value={personalInformation.DateOfBirth}
                    onChange={handlePersonalInfoChange}
                    disabled={role}
                    data-date-format="dd/mm/yyyy"
                  />
                </FormGroupDatePicker>
              </Col> */}

              <Col md={3}>
                <Label for="InputDate">Date of Birth</Label>
                <DatePicker
                  value={personalInformation.DateOfBirth}
                 // value={getDate(personalInformation.DateOfBirth, "/")}
                  // selected={personalInformation.DateOfBirth}
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "DateOfBirth")}
                  className="form-control"
                  name="DateOfBirth"
                  placeholderText={dateFormatPlaceholder}
                  showYearDropdown
                  disabled={role}
                />
              </Col>

              <Col md={3}>
                <FormGroupSelect
                  label="Religion"
                  name="ReligionId"
                  value={personalInformation.ReligionId}
                  onChange={handlePersonalInfoChange}
                  list={selectionList.ReligionList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Household members </Label>
                  <Input
                    type="text"
                    className="form-control"
                    name="NoOf_HouseHold_Member"
                    value={personalInformation.NoOf_HouseHold_Member}
                    onChange={handlePersonalInfoChange}
                    disabled={role}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Accompanying Family Member</Label>
                  <Input
                    type="text"
                    className="form-control"
                    name="NoOf_Family_Members_Accompanying"
                    value={personalInformation.NoOf_Family_Members_Accompanying}
                    onChange={handlePersonalInfoChange}
                    disabled={role}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="Is Joint Family*"
                  name="IsJoinFamily"
                  value={personalInformation.IsJoinFamily}
                  onChange={handlePersonalInfoChange}
                  disabled={role}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Residential Details</h6>
          </CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroupSelect
                    label="Country"
                    name="CountryId"
                    value={personalInformation.CountryId}
                    onChange={handlePersonalInfoChange}
                    list={selectionList.CountryList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={role}
                  />
                </Col>
                <Col md={4}>
                  <FormGroupSelect
                    label="Province"
                    name="ProvinceId"
                    value={personalInformation.ProvinceId}
                    onChange={handlePersonalInfoChange}
                    list={selectionList?.ProvinceList?.filter(
                      (x) => x.ParentId == personalInformation.CountryId
                    )}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={role}
                  />
                </Col>

                <Col md={4}>
                  <FormGroupSelect
                    label="City"
                    name="CityId"
                    value={personalInformation.CityId}
                    onChange={handlePersonalInfoChange}
                    list={selectionList?.CityList?.filter(
                      (x) => x.ParentId == personalInformation.ProvinceId
                    )}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={role}
                  />
                </Col>

                <Col md={4}>
                  <FormGroupSelect
                    label="District"
                    name="DistrictId"
                    value={personalInformation.DistrictId}
                    onChange={handlePersonalInfoChange}
                    list={selectionList?.DistrictList?.filter(
                      (x) => x.ParentId == personalInformation.CityId
                    )}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={role}
                  />
                </Col>

                <Col md={4} style={{ display: "none" }}>
                  <FormGroupSelect
                    label="Union"
                    name="UnionId"
                    value={personalInformation.UnionId}
                    onChange={handlePersonalInfoChange}
                    list={selectionList?.UnionList?.filter(
                      (x) => x.ParentId == personalInformation.DistrictId
                    )}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={role}
                  />
                </Col>

                <Col md={4}>
                  <FormGroupSelect
                    label="Area"
                    name="AreaId"
                    value={personalInformation.AreaId}
                    onChange={handlePersonalInfoChange}
                    list={selectionList?.AreaList?.filter(
                      (x) => x.ParentId == personalInformation.DistrictId
                    )}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={role}
                  />
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="">Temporary Address</Label>
                    <Input
                      type="text"
                      className="form-control"
                      name="TemperoryAddresss"
                      value={personalInformation.TemperoryAddresss}
                      onChange={handlePersonalInfoChange}
                      disabled={role}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="">Permanent Address</Label>
                    <Input
                      type="text"
                      className="form-control"
                      name="PermanentAddress"
                      value={personalInformation.PermanentAddress}
                      onChange={handlePersonalInfoChange}
                      disabled={role}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <ContactDetails />
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Acceptance of Charity</h6>
          </CardHeader>
          <CardBody>
            <Row form>
              {acceptanceOfCharity.map((item, index) => (
                <Col md={3} key={index}>
                  <FormGroup>
                    <div className="form-check-inline mt-3">
                      <label className="form-check-Label">
                        <input
                          type="checkbox"
                          name="IsChecked"
                          checked={item.IsChecked}
                          onChange={(e) => handleAcceptanceForCharity(e, index)}
                          disabled={role}
                        />
                        {" " + item.AcceptanceOfCharity}
                      </label>
                    </div>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Additional Details</h6>
          </CardHeader>
          <CardBody>
            {additionalPersonalDetail.map((item, index) => (
              <Row form key={index}>
                <Col md={5}>
                  <FormGroup>
                    <div className="form-check-inline mt-3">
                      <label className="form-check-Label">
                        <input
                          type="checkbox"
                          name="IsChecked"
                          checked={item.IsChecked}
                          disabled={role}
                          onChange={(e) =>
                            handleAdditionalInfo(
                              {
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              },
                              index
                            )
                          }
                        />
                        {" " + item.AdditionalPersonalDetail}
                      </label>
                    </div>
                  </FormGroup>
                </Col>
                {item.Flex1 === "Has_TextBox" && (
                  <Col md={3}>
                    <FormGroupInput
                      label={item.Flex2}
                      name="TextBox_Value"
                      value={item.TextBox_Value}
                      onChange={(e) => handleAdditionalInfo(e, index)}
                      disabled={role}
                    />
                  </Col>
                )}
              </Row>
            ))}
            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                  {role ? null : (
                    <Button color="primary" size="sm" type="submit">
                      Save Personal Information
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </form>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Support Details</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroupSelect
                  label="Primary Support"
                  name="PrimaryFundCategoryId"
                  value={personalInformation.PrimaryFundCategoryId}
                  onChange={handlePersonalInfoChange}
                  list={selectionList.SupportList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={personalInformation.SupportCount > 0 ? true : role}
                />
              </Col>

              <Col md={3}>
                <FormGroup>
                  <FormGroupInput
                    label="Fund Amount"
                    name="FundAmount_Required"
                    value={personalInformation.FundAmount_Required}
                    onChange={handlePersonalInfoChange}
                    required={true}
                    disabled={
                      personalInformation.SupportCount > 0 ? true : role
                    }
                    isNumber="true"
                  />
                </FormGroup>
              </Col>
            </Row>
            {personalInformation.SupportCount > 0 ? null : (
              <Row form className="text-right">
                <Col md={12}>
                  <FormGroup>
                    {role ? null : (
                      <Button
                        color="primary"
                        size="sm"
                        type="button"
                        onClick={() => {
                          UpdateSupportDetail();
                        }}
                      >
                        Update Support Details
                      </Button>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonalInformation;
