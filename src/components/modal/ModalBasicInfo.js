import React, { useState } from "react";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import { fetchData, baseUrl } from "../../utils/Api.js";
import { ApiMethods, ControllerName } from "../../utils/Constants.js";
import { AllowAlphabatic } from "../../utils/CommonMethods";
import Swal from "sweetalert2";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";
import { CaseStatuses } from "utils/Constants.js";


const initiaFormlValues = {
  CnicNo: "",
  ApplicantId: 0,
  FirstName: "",
  LastName: "",
  DateOfBirth: null,
  GenderId: null,
  FatherName: "",
  PrimaryContactNumber: "",
  AlternateContactNumber: "",
  PrimaryFundCategoryId: -1,
  FundAmount_Required: 0,
  CountryId: null,
  ProvinceId: null,
  CityId: null,
  PermanentAddress: "",
  CaseNatureId: null,
  OperationId: 2,
  NoOf_HouseHold_Member: null,
  FamilyNo: null,
  Referral_TypeId: null,
  referral_CompanyId: null,
  ReferralName: "",
  ReferralContactNumber: "",
  Referral_RelationId: null,
  CaseExpiry: null,
  IsJoinFamily: false,
  IsHOD_HR_Signature: false,
  InvestigatorId: null,
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
  IsBlackList: false,
  DistrictId: null,
  UnionId: null, 
  AreaId:null,

  CaseStatusId:null,
  Remarks:"",
};

const initialSelectLists = {
  GenderList: [],
  CountryList: [],
  ProvinceList: [],
  CityList: [],
  FundCategoryList: [],
  InvestigatorList: [],
  NatureOfCaseList: [],
  ReferrerList: [],
  ApplicantCompanyList: [],
  RelationList: [],
  DistrictList: [],
  UnionList:[],
  AreaList: [],
};

export const ModalBasicInfo = (props) => {
  const [formFields, setFormFields] = useState(initiaFormlValues);
  const [selectionLists, setSelectionLists] = useState(initialSelectLists);
  const [displayForm, setDisplayForm] = useState(false);
  const [disabledField, setDisabledField] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [disableSearch, setDisableSearch] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [nicFrontFile, setnicFrontFile] = useState(null);
  const [nicBackFile, setnicBackFile] = useState(null);
  const [applicationAttachment, setapplicationAttachment] = useState(null);
  const [applicationPhotoAttachement, setapplicationPhotoAttachement] =
    useState(null);
  const [thumbAttachement, setthumbAttachement] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let values = e.target.value;

    if (e.target.type === "checkbox") values = e.target.checked;
    else if (e.target.getAttribute("isnumber") == "true")
      values = e.target.value.replace(/\D/g, "");
    else if (e.target.getAttribute("isalphabetic") === "true") {
      values = AllowAlphabatic(e.target.value);
    }

    if (e.target.type === "select-one") {
      if (name == "referral_CompanyId") {
        setFormFields({
          ...formFields,
          [name]: values,
          ["ReferralName"]: e.target.options[e.target.selectedIndex].text,
        });
      } else {
        setFormFields({
          ...formFields,
          [name]: values,
        });
      }
    } else {
      setFormFields({
        ...formFields,
        [name]: values,
      });
    }
  };

  function toggle() {
    props.closeNewmodal();
  }

  const searchCnicForApplicant = async (e) => {
    e.preventDefault();
    if (formFields.CnicNo.length == 13 && formFields.CnicNo != "") {
      setIsSearchLoading(true);

      fetchData("Applicant", "Register_Applicant_Case", {
        OperationId: 1,
        CnicNo: formFields.CnicNo,
      }).then((result) => {
        setIsSearchLoading(false);
        if (result?.ResponseMessage !== "Success") {
          Swal.fire({
            title: "Error",
            text: result?.Table[0].Message,
            icon: "error",
          });
         return;
        }
       
        setDisplayForm(true);
        setDisableSearch(true);
        if (result?.DataSet?.Table?.length > 0) {
          setDisabledField(true);
          setFormFields({ ...formFields, ...result?.DataSet?.Table[0] }); 
          if(result?.DataSet?.Table[0].CaseStatusId === CaseStatuses.Rejected)
          {
            Swal.fire({
              customClass: {
                container: "my-swal",
              },
              text: "This Applicant Case Already is Rejected. Do you want to create new case for this Applicant?",
              icon: "success",
              showCancelButton: true,
              cancelButtonText: `Cancel`,
              cancelButtonColor: "#2f4050",
              confirmButtonText: `Confirm`,
              confirmButtonColor: "#bf1e2e",
            }).then(async (result) => {
              if (result.isConfirmed)  
              {

              }
              else
              {
                return;
              }
            })
            // Swal.fire({
            //   title: "Error",
            //   text: "This Applicant Case Already is Rejected do you want to create new case for this Applicant?",
            //   icon: "error",
            // });
           // return;
          }

          // if(result?.DataSet?.Table[0].CaseStatusId === CaseStatuses.Case_Hold_Trustee)
          // {
          //   Swal.fire({
          //     title: "Error",
          //     text: "Case Already Freeze Trustee",
          //     icon: "error",
          //   });
          //   return;
          // }

          if(result?.DataSet?.Table[0].IsBlackList === true)
          {
            Swal.fire({
              title: "Error",
              text: "Case Already BlackList",
              icon: "error",
            });
            return;
          }
          

        }
        setSelectionLists({
    
          ...selectionLists,
          GenderList: result?.DataSet?.Table1,
          CountryList: result?.DataSet?.Table2,
          ProvinceList: result?.DataSet?.Table3,
          CityList: result?.DataSet?.Table4,
          FundCategoryList: result?.DataSet?.Table5,
          NatureOfCaseList: result?.DataSet?.Table6,
          ReferrerList: result?.DataSet?.Table7,
          RelationList: result?.DataSet?.Table8,
          InvestigatorList: result?.DataSet?.Table9,
          
          
    
          DistrictList: result?.DataSet?.Table10,
         // UnionList: result?.DataSet?.Table11,
          AreaList: result?.DataSet?.Table12,
    
         
    
        });
            
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "NIC No Must Equal To 13 Character Or Not Be Empty.",
        icon: "error",
      });
    }
  };

  const onReferrerChange = async (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
    let result = await fetchData(
      ControllerName.Applicant,
      ApiMethods.Get_Data_According_To_ReferrerType,
      [e.target.value]
    );
    setSelectionLists({ ...selectionLists, ApplicantCompanyList: result.data });
  };

  const resetForm = (e) => {
    e.preventDefault();
    setDisableSearch(false);
    setIsSearchLoading(false);
    setDisplayForm(false);
    setFormFields(initiaFormlValues);
    selectionLists(initialSelectLists);
    setDisabledField(false);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();


    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to add the record?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then(async (result) => {
      if (result.isConfirmed)  
      {
       
    if (formFields.FundAmount_Required > 0) {
        setFormFields({ ...formFields, OperationId: 2 });


        let _userId = localStorage.getItem("UserId");
        let _userIp = localStorage.getItem("UserIP");

        setFormFields({ ...formFields, OperationId: 2, UserId: _userId, UserIP: _userIp  });


      const formData = new FormData();

      if (nicFrontFile != null && nicFrontFile !== undefined)
        formData.append("AttachedFiles", nicFrontFile);
      else formData.append("AttachedFiles", new File([""], "NoFile.txt"));

      if (nicBackFile != null && nicBackFile !== undefined)
        formData.append("AttachedFiles", nicBackFile);
      else formData.append("AttachedFiles", new File([""], "NoFile.txt"));

      if (applicationAttachment != null && applicationAttachment !== undefined)
        formData.append("AttachedFiles", applicationAttachment);
      else formData.append("AttachedFiles", new File([""], "NoFile.txt"));

      if (
        applicationPhotoAttachement != null &&
        applicationPhotoAttachement !== undefined
      )
        formData.append("AttachedFiles", applicationPhotoAttachement);
      else formData.append("AttachedFiles", new File([""], "NoFile.txt"));

      if (thumbAttachement != null && thumbAttachement !== undefined)
        formData.append("AttachedFiles", thumbAttachement);
      else formData.append("AttachedFiles", new File([""], "NoFile.txt"));

      //for (var i = 0; i < attachment.length; i++) {
      //    formData.append("AttachedFiles", attachment[i][0]);
      //}
      //formData.append("attachement", attachment);

      formData.append("Data", JSON.stringify(formFields));

      setIsFormLoading(true);
      var baseurl =
        baseUrl +
        "/" +
        ControllerName.Applicant +
        "/" +
        ApiMethods.Register_Applicant_Case_With_Document;

      return await axios
        .post(baseurl, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (result?.data.DataSet === null && result?.data.Data === null) {
            Swal.fire({
              title: "Error",
              text: result?.data.ResponseMessage,
              icon: "error",
            });
            setIsFormLoading(false);
            return;
          } else {
            if (result?.data.DataSet?.Table[0].haserror > 0) {
              Swal.fire({
                title: "Error",
                text: result?.data.Table[0].Message,
                icon: "error",
              });
              setIsFormLoading(false);
              return;
            }
            Swal.fire({
              title: "Success",
              text: result?.data.DataSet?.Table[0].Message,
              icon: "success",
            });
            toggle();
          }

          setIsFormLoading(false);
          // toggle();
        })
        .catch(function (error) {
          setIsFormLoading(false); 
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Amount must be greater than 0",
        icon: "error",
      });
      setIsFormLoading(false);
      //return;
    }
  }
})
  };

  return (
    <Modal
      isOpen={props.Ismodalshow}
      toggle={toggle}
      size="lg"
      backdrop="static"
    >
      <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
        <form onSubmit={searchCnicForApplicant}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>CNIC Number</Label>
                <Input
                  label="CNIC Number"
                  placeholder="xxxxxxxxxxxxx"
                  type="text"
                  name="CnicNo"
                  autoComplete="off"
                  value={formFields.CnicNo}
                  onChange={handleInputChange}
                  maxLength="13"
                  isNumber="true"
                  required={true}
                  disabled={disableSearch}
                />
              </FormGroup>

              {formFields.IsBlackList === true ? (
                <FormGroup>
                  <Label>
                    <strong>Applicant is blacklisted by Trustee</strong>
                  </Label>
                </FormGroup>
              ) : null}

             
           
           {parseInt(formFields.CaseStatusid === CaseStatuses.Rejected) ? (
                 <FormGroup>
                  <Label>
                    <strong>Applicant Case Rejected</strong>
                  </Label>
                </FormGroup>
              ) : null}

           




            </Col>

            <Col
              md={6}
              align="right"
              style={{
                display: "flex",
                paddingTop: 16,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <FormGroupButton
                title="Search"
                type="submit"
                loading={isSearchLoading}
                disabled={disableSearch}
              />
              <FormGroupButton
                title="Reset"
                color="secondary"
                onClick={resetForm}
              />
            </Col>
          </Row>
        </form>
        {displayForm && (
          <form onSubmit={handleSubmit}>
            <div>
              <Card className="mb-3">
                <CardHeader>
                  <h6 className="font-weight-bold mb-0">Basic Details</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>First Name</Label>
                        <Input
                          label="First Name"
                          placeholder="Applicant First Name"
                          type="text"
                          name="FirstName"
                          autoComplete="off"
                          isalphabetic="true"
                          value={formFields.FirstName}
                          onChange={handleInputChange}
                          maxLength="25"
                          disabled={disabledField}
                          required={true}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                          label="Last Name"
                          placeholder="Applicant Last Name"
                          type="text"
                          autoComplete="off"
                          isalphabetic="true"
                          name="LastName"
                          value={formFields.LastName}
                          onChange={handleInputChange}
                          maxLength="25"
                          disabled={disabledField}
                          required={true}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Father / Husband Name</Label>
                        <Input
                          label="Father / Husband Name"
                          placeholder="Father / Husband Name"
                          type="text"
                          name="FatherName"
                          autoComplete="off"
                          isalphabetic="true"
                          value={formFields.FatherName}
                          onChange={handleInputChange}
                          maxLength="25"
                          disabled={disabledField}
                          required={true}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Primary Contact No</Label>
                        <Input
                          label="Primary Contact No"
                          placeholder="Primary Contact No"
                          type="text"
                          autoComplete="off"
                          isNumber="true"
                          name="PrimaryContactNumber"
                          value={formFields.PrimaryContactNumber}
                          onChange={handleInputChange}
                          maxLength="11"
                          disabled={disabledField}
                          required={true}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Alternate Contact No</Label>
                        <Input
                          label="Alternate Contact No"
                          placeholder="Alternate Contact No"
                          type="text"
                          isNumber="true"
                          autoComplete="off"
                          name="AlternateContactNumber"
                          value={formFields.AlternateContactNumber}
                          onChange={handleInputChange}
                          maxLength="11"
                          disabled={disabledField}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroupSelect
                        label="Gender"
                        name="GenderId"
                        value={formFields.GenderId}
                        onChange={handleInputChange}
                        list={selectionLists.GenderList}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        disabled={disabledField}
                        required={true}
                      />
                    </Col>

                    <Col md={4}>
                      <FormGroupSelect
                        label="Country"
                        name="CountryId"
                        value={formFields.CountryId}
                        onChange={handleInputChange}
                        list={selectionLists.CountryList}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col>

                    <Col md={4}>
                      <FormGroupSelect
                        label="Province"
                        name="ProvinceId"
                        value={formFields.ProvinceId}
                        onChange={handleInputChange}
                        list={selectionLists.ProvinceList.filter(
                          (x) => x.ParentId == formFields.CountryId
                        )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col>

                    <Col md={4}>
                      <FormGroupSelect
                        label="City"
                        name="CityId"
                        value={formFields.CityId}
                        onChange={handleInputChange}
                        list={selectionLists.CityList.filter(
                          (x) => x.ParentId == formFields.ProvinceId
                        )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col>
                    {/* //////////Manzoor/working///////////// */}


                    <Col md={4}>
                      <FormGroupSelect
                        label="District"
                        name="DistrictId"
                        value={formFields.DistrictId}
                        onChange={handleInputChange}
                          list={selectionLists.DistrictList.filter(
                            (x) => x.ParentId == formFields.CityId
                          )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        //required={true}
                      />
                    </Col>

                    <Col md={4} style={{display:"none"}}>
                      <FormGroupSelect
                        label="Union"
                        name="UnionId"
                        value={formFields.UnionId}
                        onChange={handleInputChange}
                          list={selectionLists.UnionList.filter(
                            (x) => x.ParentId == formFields.DistrictId
                          )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        //required={true}
                      />
                    </Col>

                    <Col md={4}>
                      <FormGroupSelect
                        label="Area"
                        name="AreaId"
                        value={formFields.AreaId}
                        onChange={handleInputChange}
                          list={selectionLists.AreaList.filter(
                            (x) => x.ParentId == formFields.DistrictId
                          )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        //required={true}
                      />
                    </Col>

{/* 
                    <Col md={4}>
                      <FormGroupSelect
                        label="Union"
                        name="UnionId"
                        value={formFields.UnionId}
                        onChange={handleInputChange}
                        list={selectionLists.AreaList.filter(
                          (x) => x.ParentId == formFields.DistrictID
                        )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col>

                    <Col md={4}>
                      <FormGroupSelect
                        label="Area"
                        name="AreaId"
                        value={formFields.AreaId}
                        onChange={handleInputChange}
                        list={selectionLists.AreaList.filter(
                          (x) => x.ParentId == formFields.UnionId
                        )}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col> */}
                   {/* //////////////////////  */}


                    <Col md={4}>
                      <FormGroupSelect
                        label="Fund Category"
                        name="PrimaryFundCategoryId"
                        value={formFields.PrimaryFundCategoryId}
                        onChange={handleInputChange}
                        list={selectionLists.FundCategoryList}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Funds Required</Label>
                        <Input
                          label="Funds Required"
                          placeholder="Funds Required"
                          name="FundAmount_Required"
                          autoComplete="off"
                          value={formFields.FundAmount_Required}
                          onChange={handleInputChange}
                          maxLength="25"
                          isNumber="true"
                          required={true}
                        />
                      </FormGroup>
                    </Col>

                    {/* <Col md={4}>
                      <FormGroupSelect
                        label="Investigator"
                        name="InvestigatorId"
                        value={formFields.InvestigatorId}
                        onChange={handleInputChange}
                        list={selectionLists.InvestigatorList}
                        fieldId="UserId"
                        fieldName="Name"
                      />
                    </Col> */}
                    <Col md={4}>
                      <FormGroupSelect
                        label="Nature Of Case"
                        name="CaseNatureId"
                        value={formFields.CaseNatureId}
                        onChange={handleInputChange}
                        list={selectionLists.NatureOfCaseList}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                        required={true}
                      />
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>House Hold Members</Label>
                        <Input
                          label="House Hold Members"
                          placeholder="House Hold Members"
                          name="NoOf_HouseHold_Member"
                          autoComplete="off"
                          value={formFields.NoOf_HouseHold_Member}
                          onChange={handleInputChange}
                          isNumber="true"
                          required={true}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>National Family No</Label>
                        <Input
                          label="National Family No"
                          placeholder="National Family No"
                          autoComplete="off"
                          name="FamilyNo"
                          value={formFields.FamilyNo}
                          onChange={handleInputChange}
                          // isNumber="true"
                          maxLength="6"
                         
                        />
                      </FormGroup>
                    </Col>

                    <Col md={8}>
                      <FormGroup>
                        <Label>Permanant Address</Label>
                        <Input
                          label="Permanant Address"
                          placeholder="Permanant Address"
                          name="PermanentAddress"
                          autoComplete="off"
                          value={formFields.PermanentAddress}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <div className="form-check-inline mt-3">
                          <Label className="form-check-Label">
                            <Input
                              type="checkbox"
                              className="form-check-Input"
                              name="IsJoinFamily"
                              checked={formFields.IsJoinFamily}
                              onChange={handleInputChange}
                            />
                            Is Joint Family ?
                          </Label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <div>
              <Card className="mb-3">
                <CardHeader>
                  <h6 className="font-weight-bold mb-0">Referral Details</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={3}>
                      <FormGroupSelect
                        label="Referrer Type"
                        name="Referral_TypeId"
                        value={formFields.Referral_TypeId}
                        onChange={onReferrerChange}
                        list={selectionLists.ReferrerList}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroupSelect
                        label="Applicant / Company"
                        name="referral_CompanyId"
                        value={formFields.referral_CompanyId}
                        onChange={handleInputChange}
                        list={selectionLists.ApplicantCompanyList}
                        fieldId="FeildValue"
                        fieldName="FeildName"
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label>Referral Name</Label>
                        <Input
                          label="Referral Name"
                          placeholder="Referral Name"
                          name="ReferralName"
                          autoComplete="off"
                          isalphabetic="true"
                          value={formFields.ReferralName}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroupSelect
                        label="Relation"
                        name="Referral_RelationId"
                        value={formFields.Referral_RelationId}
                        onChange={handleInputChange}
                        list={selectionLists.RelationList}
                        fieldId="SetupDetailId"
                        fieldName="SetupDetailName"
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroupInput
                        label="Contact No"
                        placeholder="Contact No"
                        type="text"
                        isNumber="true"
                        autoComplete="off"
                        name="ReferralContactNumber"
                        value={formFields.ReferralContactNumber}
                        onChange={handleInputChange}
                        maxLength="11"
                        disabled={disabledField}
                        required={false}
                      />
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <div className="form-check-inline mt-3">
                          <Label className="form-check-Label">
                            <Input
                              type="checkbox"
                              className="form-check-Input"
                              name="IsHOD_HR_Signature"
                              checked={formFields.IsHOD_HR_Signature}
                              onChange={handleInputChange}
                            />
                            HOD/ HR Signature
                          </Label>
                        </div>
                      </FormGroup>
                    </Col>

                    <Col md={7}>
                      <FormGroup>
                        <Label>Remarks</Label>
                        <Input
                          label="Remarks"
                          placeholder="Remarks"
                          name="Remarks"
                          autoComplete="off"
                          value={formFields.Remarks}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                </CardBody>
              </Card>
            </div>

            <div>
              <Card className="mb-3">
                <CardHeader>
                  <h6 className="font-weight-bold mb-0">Attachments</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>NIC Front Attachment</Label>
                        <Input
                          name="Attachement1"
                          type="file"
                          onChange={(e) => setnicFrontFile(e.target.files[0])}
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>NIC Back Attachment</Label>
                        <Input
                          name="Attachement2"
                          type="file"
                          onChange={(e) => setnicBackFile(e.target.files[0])}
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Application Attachment</Label>
                        <Input
                          name="Attachement3"
                          type="file"
                          onChange={(e) =>
                            setapplicationAttachment(e.target.files[0])
                          }
                          accept="image/png, image/gif, image/jpeg,application/pdf"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Applicant Photo Attachment</Label>
                        <Input
                          name="Attachement4"
                          type="file"
                          onChange={(e) =>
                            setapplicationPhotoAttachement(e.target.files[0])
                          }
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label>Applicant Thumb Attachment</Label>
                        <Input
                          name="Attachement5"
                          type="file"
                          onChange={(e) =>
                            setthumbAttachement(e.target.files[0])
                          }
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
            <Row>
              <Col
                md={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {formFields.IsBlackList === false ? (
                  <FormGroupButton
                    title="Save"
                    type="submit"
                    loading={isFormLoading}
                  />
                ) : null}

                <FormGroupButton
                  title="Close"
                  color="secondary"
                  onClick={toggle}
                />
              </Col>
            </Row>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ModalBasicInfo;
