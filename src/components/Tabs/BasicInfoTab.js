import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import useEditRole from "hooks/useEditRole";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row, Label, FormGroup, Button } from "reactstrap";
import * as api from "utils/Api";
import { ApiMethods, ControllerName } from "../../utils/Constants.js";
import { useParams } from "react-router-dom";
import SabSathDefault from "../../assets/img/SabSathDefault.png";
import Swal from "sweetalert2";

const initialSelectLists = {
  ReferrerList: [],
  ApplicantCompanyList: [],
  RelationList: [],
};
const initiaFormlValues = {
  ApplicantPhoto: "",
  ApplicantThumbPrint: "",
  ApplicantCNICFront: "",
  ApplicantCNICBack: "",
  ApplicationDocument: "",
  Referral_TypeId: 0,
  Referral_CompanyId: 0,
  ReferralName: "",
  Referral_RelationId: 0,
  ReferralContactNumber: "",
  IsHod_Hr_Signature: 0,
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
  InvestigatorId : 0,
  Remarks: "",
};

const BasicInfoTab = (props) => {
  const { id } = useParams();
  const [role, appId] = useEditRole();
  const [selectionLists, setSelectionLists] = useState(initialSelectLists);
  const [formFields, setFormFields] = useState(initiaFormlValues);
  const [appCompanyList, setAppCompanyList] = useState([]);


  React.useEffect(() => {
  
    const fetchApplicantId = () => {
      api
        .fetchData(
          ControllerName.Applicant,
          "Crud_Applicant_Personal_Information_Detail",
          {
            OperationId: 1,
            ApplicantCase_InvestigationId: id,
          }
        )
        .then((result) => {
          setFormFields({ ...formFields, ...result.DataSet.Table[0] });
          GetReferelCompany(result?.DataSet?.Table[0]?.Referral_TypeId)
          setSelectionLists({
            ...selectionLists,
          
            ReferrerList: result.DataSet.Table8,
            // ApplicantCompanyList: result.DataSet.Table10,
            // ApplicantCompanyList: result.DataSet.Table11,
            RelationList: result.DataSet.Table9,
          
          });
        });
    };

    fetchApplicantId();
  
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const GetReferelCompany = async (data) =>{
    let result = await api.fetchData(
      ControllerName.Applicant,
      ApiMethods.Get_Data_According_To_ReferrerType,
      [data]
    );
    setAppCompanyList(result.data)
    // setSelectionLists({
    //   ...selectionLists,
    //   ApplicantCompanyList: result.data,
    // });
  }
  const onReferrerChange = async (e) => {
     const { name, value } = e.target;
      if (e.target.name === "Referral_TypeId") {
      let result = await api.fetchData(
        ControllerName.Applicant,
        ApiMethods.Get_Data_According_To_ReferrerType,
        [e.target.value]
      );
      setAppCompanyList(result.data)
      // setSelectionLists({
      //   ...selectionLists,
      //   ApplicantCompanyList: result.data,
      // });

      setFormFields({
        ...formFields,
        [name]: value,
        ["ReferralName"]: "",
      });
    } else if (e.target.name === "Referral_CompanyId") {
      setFormFields({
        ...formFields,
        [name]: value,
        ["ReferralName"]: e.target.options[e.target.selectedIndex].text,
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
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
      
 
    
    api
    .fetchData(
      ControllerName.Applicant,
      "Update_Refrel",   {
        Referral_TypeId: formFields.Referral_TypeId == "" ? "0" : formFields.Referral_TypeId,
        Referral_CompanyId: formFields.Referral_CompanyId == "" ? "0" : formFields.Referral_CompanyId,
        ReferralName: formFields.ReferralName ,
        Referral_RelationId : formFields.Referral_RelationId == "" ? "0" : formFields.Referral_RelationId,
        ReferralContactNumber : formFields.ReferralContactNumber,
        IsHOD_HR_Signature : formFields.IsHod_Hr_Signature,
        UserId: formFields.UserId,
        UserIP: formFields.UserIP,
        Remarks:formFields.Remarks,
        InvestigatorId: id,
      }
    )
    .then((result) => {
      //
    
      if (result?.DataSet?.Table[0].haserror > 0) 
      {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table[0].Error_Message,
          icon: "error",
        });
        //setIsFormLoading(false);
        return;
      }
      Swal.fire({
             title: "Success",
             text: result?.DataSet?.Table[0].Message,
             icon: "success",
           });
    })
  }
})
 };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Identification</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={3}>
                <img
                  name="imgApplicant"
                  src={
                    formFields.ApplicantPhoto === null ||
                    formFields.ApplicantPhoto === ""
                      ? SabSathDefault
                      : api.baseImageUrl + formFields.ApplicantPhoto
                  }
                  style={{
                    height: "180px",
                    width: "100%",
                    objectFit: "contain",
                    overflow: "hidden",
                    //marginLeft: "-55px",
                  }}
                />
              </Col>
              <Col md={3}>
                <img
                  name="imgThumb"
                  src={
                    formFields.ApplicantThumbPrint === null ||
                    formFields.ApplicantThumbPrint === ""
                      ? SabSathDefault
                      : api.baseImageUrl + formFields.ApplicantThumbPrint
                  }
                  style={{
                    height: "180px",
                    width: "100%",
                    objectFit: "contain",
                    overflow: "hidden",
                    //marginLeft: "-55px",
                  }}
                />
              </Col>
              <Col md={4}>
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Applicant Name : "}
                </Label>
                <strong>
                  {" " + formFields.FirstName + " " + formFields.LastName}
                </strong>
                <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Applicant Code : "}
                </Label>
                <strong>{" " + formFields.ApplicantCode}</strong> <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Applicant Case Code : "}
                </Label>
                <strong>{" " + formFields.ApplicantCaseCode}</strong> <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"CNIC : "}
                </Label>
                <strong>{" " + formFields.CnicNo}</strong> <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Primary Contact # : "}
                </Label>
                <strong>
                  {" " + formFields.ApplicantPrimaryContactNumber}
                </strong>{" "}
                <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Alternate Contact # : "}
                </Label>
                <strong>
                  {" " + formFields.ApplicantAlternateContactNumber}
                </strong>{" "}
                <br />
              </Col>
            </Row>
          </CardBody>
        </Card>

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
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Applicant / Company"
                  name="Referral_CompanyId"
                  value={formFields.Referral_CompanyId}
                  onChange={onReferrerChange}
                  list={appCompanyList}
                  fieldId="FeildValue"
                  fieldName="FeildName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Referral Name"
                  placeholder="Referral Name"
                  name="ReferralName"
                  value={formFields.ReferralName}
                  onChange={handleInputChange}
                  disabled={role}
                />
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
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Contact No."
                  placeholder="Contact No."
                  name="ReferralContactNumber"
                  value={formFields.ReferralContactNumber}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Remarks"
                  placeholder="Remarks"
                  name="Remarks"
                  value={formFields.Remarks}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupCheckbox
                  label="HOD/ HR Signature"
                  name="IsHod_Hr_Signature"
                  value={formFields.IsHod_Hr_Signature}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                   {role ? null : ( 
                    <Button color="primary" size="sm" type="submit">
                      Update Referral
                    </Button>
                   )} 
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </form>
    </div>
  );
};

export default BasicInfoTab;
